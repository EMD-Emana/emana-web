import { NextResponse } from 'next/server';
import { z } from 'zod';

import { env } from '@/lib/env';
import { checkRateLimit, clientKeyFromHeaders } from '@/lib/rate-limit';

/**
 * POST /api/contact
 *
 * OWASP notes, in order of the checks performed below:
 *  A01 — no client-supplied identity is trusted; there is nothing to authorize,
 *        and the route never reads a role, id or flag from the body.
 *  A04 — fixed-window rate limit plus a honeypot field before any work is done.
 *  A03 — the body is parsed by Zod in strict mode: unknown keys are rejected and
 *        every field is length-bounded. Nothing is interpolated anywhere.
 *  A09 — failures are logged server-side with field NAMES only, and the response
 *        never echoes user input back.
 *  A10 — no URL from the payload is ever fetched. Links, if any, are only stored.
 *
 * Only POST is exported, so every other method answers 405 automatically.
 */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Hard ceiling on the request body. Anything larger is rejected unparsed. */
const MAX_BODY_BYTES = 8 * 1024;

const contactSchema = z
  .object({
    name: z.string().trim().min(2).max(80),
    email: z.string().trim().email().max(160),
    company: z.string().trim().max(120).optional(),
    message: z.string().trim().min(20).max(2000),
    budget: z.enum(['under-5k', '5k-15k', '15k-50k', 'over-50k']).optional(),
    consent: z.literal(true),
    /**
     * Honeypot. A real person never sees this field, so any value means a bot.
     * It is optional and unbounded on purpose: the check happens after parsing
     * so that bots get the same generic success answer as everyone else.
     */
    website: z.string().max(200).optional(),
  })
  .strict();

const GENERIC_HEADERS: Readonly<Record<string, string>> = {
  'Cache-Control': 'no-store',
};

function jsonError(code: string, status: number, extraHeaders: Readonly<Record<string, string>> = {}) {
  return NextResponse.json(
    { ok: false, error: code },
    { status, headers: { ...GENERIC_HEADERS, ...extraHeaders } },
  );
}

export async function POST(request: Request) {
  const rateKey = clientKeyFromHeaders(request.headers, 'contact');
  const verdict = checkRateLimit(rateKey, {
    max: env.CONTACT_RATE_LIMIT_MAX,
    windowMs: env.CONTACT_RATE_LIMIT_WINDOW_MS,
  });

  if (!verdict.allowed) {
    console.error('[contact] rate limit exceeded for one client bucket');

    return jsonError('RATE_LIMITED', 429, {
      'Retry-After': String(verdict.retryAfterSeconds),
      'X-RateLimit-Limit': String(verdict.limit),
      'X-RateLimit-Remaining': '0',
    });
  }

  const contentType = request.headers.get('content-type') ?? '';

  if (!contentType.toLowerCase().includes('application/json')) {
    return jsonError('UNSUPPORTED_MEDIA_TYPE', 415);
  }

  let rawBody: string;

  try {
    rawBody = await request.text();
  } catch {
    return jsonError('INVALID_REQUEST', 400);
  }

  if (Buffer.byteLength(rawBody, 'utf8') > MAX_BODY_BYTES) {
    console.error('[contact] rejected oversized payload');

    return jsonError('PAYLOAD_TOO_LARGE', 413);
  }

  let payload: unknown;

  try {
    payload = JSON.parse(rawBody);
  } catch {
    console.error('[contact] rejected malformed JSON payload');

    return jsonError('INVALID_REQUEST', 400);
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    // Field names come from our own schema, never from the request body.
    const invalidFields = parsed.error.issues
      .map((issue) => issue.path.join('.'))
      .filter((field, index, all) => all.indexOf(field) === index);

    console.error(`[contact] validation failed for fields: ${invalidFields.join(', ')}`);

    return jsonError('INVALID_REQUEST', 400);
  }

  const submission = parsed.data;

  if (submission.website !== undefined && submission.website.trim() !== '') {
    // Honeypot tripped: answer exactly like a success so the bot learns nothing,
    // and drop the message.
    console.error('[contact] honeypot triggered, submission discarded');

    return NextResponse.json({ ok: true }, { status: 200, headers: GENERIC_HEADERS });
  }

  try {
    // TODO(delivery): forward `submission` to the inbox in env.CONTACT_INBOX
    // through a server-side provider SDK (Resend, Postmark, a CRM...). Keep the
    // credential in a server-only env var and never fetch a URL taken from the
    // payload (OWASP A10).
    void env.CONTACT_INBOX;

    return NextResponse.json({ ok: true }, { status: 200, headers: GENERIC_HEADERS });
  } catch {
    console.error('[contact] delivery failed');

    return jsonError('INTERNAL_ERROR', 500);
  }
}
