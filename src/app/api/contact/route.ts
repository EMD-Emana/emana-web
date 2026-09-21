import { NextResponse } from 'next/server';
import { z } from 'zod';

import { contactStatusLocation, type ContactStatusCode } from '@/lib/contact-status';
import { env } from '@/lib/env';
import {
  checkRateLimit,
  clientBucketFromHeaders,
  sharedBucketKey,
  type RateLimitVerdict,
} from '@/lib/rate-limit';

/**
 * POST /api/contact
 *
 * OWASP notes, in order of the checks performed below:
 *  A01 — no client-supplied identity is trusted; there is nothing to authorize,
 *        and the route never reads a role, id or flag from the body.
 *  A04 — rate limit plus a honeypot field before any work is done. The limit is
 *        keyed on forwarding headers ONLY where the deployment declares a proxy
 *        that overwrites them (env.TRUST_PROXY_HEADERS); everywhere else every
 *        request shares one bucket, because a header an attacker controls is a
 *        bucket an attacker can reset.
 *  A03 — one Zod schema in strict mode validates BOTH content types: unknown
 *        keys are rejected and every field is length-bounded.
 *  A09 — failures are logged server-side with field NAMES only, and neither the
 *        JSON response nor the redirect ever echoes user input back.
 *  A10 — no URL from the payload is ever fetched, and the redirect target is a
 *        fixed root-relative path, never anything read off the request.
 *
 * TWO CONTENT TYPES, ONE PIPELINE. `application/json` is the enhanced path used
 * by fetch(). `application/x-www-form-urlencoded` is what a browser sends when
 * JavaScript never ran: it is a full page navigation, so answering it with a
 * JSON body would paint raw `{"ok":false,...}` over the whole window. That
 * branch answers 303 to `/contacto/estado` instead, which is an ordinary page.
 *
 * Only POST is exported, so every other method answers 405 automatically.
 */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Hard ceiling on the request body. Anything larger is rejected unparsed. */
const MAX_BODY_BYTES = 8 * 1024;

/** Rate-limit namespace for this endpoint. */
const SCOPE = 'contact';

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

/**
 * Keys copied out of a urlencoded body, as an allowlist.
 *
 * Deliberately not "every entry": browsers add their own (a named submit
 * button, `utf8` sentinels from some stacks) and those would trip `.strict()`.
 * Narrowing the input can only reject data, never smuggle it in.
 */
const FORM_FIELDS = ['name', 'email', 'company', 'message', 'budget', 'website'] as const;

type RequestKind = 'json' | 'form';

const GENERIC_HEADERS: Readonly<Record<string, string>> = {
  'Cache-Control': 'no-store',
};

function requestKind(contentType: string): RequestKind | null {
  const type = contentType.toLowerCase();

  if (type.includes('application/json')) {
    return 'json';
  }

  return type.includes('application/x-www-form-urlencoded') ? 'form' : null;
}

/**
 * Shapes a urlencoded body like the JSON one so a SINGLE schema stays the only
 * validation authority. Browser quirks are absorbed here and nowhere else:
 *  - an unchecked checkbox is absent from the body, a checked one sends `on`;
 *  - an untouched optional control sends `""`, which must be dropped rather
 *    than fail a length or enum rule;
 *  - a repeated key collapses to its first value.
 */
function payloadFromForm(body: URLSearchParams): Record<string, unknown> {
  const payload: Record<string, unknown> = {};

  for (const field of FORM_FIELDS) {
    const raw = body.get(field);

    if (raw !== null && raw.trim() !== '') {
      payload[field] = raw;
    }
  }

  payload.consent = body.get('consent') !== null;

  return payload;
}

function jsonError(
  code: string,
  status: number,
  extraHeaders: Readonly<Record<string, string>> = {},
) {
  return NextResponse.json(
    { ok: false, error: code },
    { status, headers: { ...GENERIC_HEADERS, ...extraHeaders } },
  );
}

/** 303: the browser must follow it with GET, so a refresh cannot resubmit. */
function statusRedirect(
  code: ContactStatusCode,
  extraHeaders: Readonly<Record<string, string>> = {},
) {
  return new NextResponse(null, {
    status: 303,
    headers: { ...GENERIC_HEADERS, ...extraHeaders, Location: contactStatusLocation(code) },
  });
}

/** One outcome, rendered the way the caller can actually consume it. */
function outcome(
  kind: RequestKind,
  failure: { readonly code: string; readonly status: number; readonly statusCode: ContactStatusCode },
  extraHeaders: Readonly<Record<string, string>> = {},
) {
  return kind === 'form'
    ? statusRedirect(failure.statusCode, extraHeaders)
    : jsonError(failure.code, failure.status, extraHeaders);
}

const INVALID = { code: 'INVALID_REQUEST', status: 400, statusCode: 'invalid' } as const;
const TOO_LARGE = { code: 'PAYLOAD_TOO_LARGE', status: 413, statusCode: 'invalid' } as const;
const RATE_LIMITED = { code: 'RATE_LIMITED', status: 429, statusCode: 'rate-limited' } as const;
const FAILED = { code: 'INTERNAL_ERROR', status: 500, statusCode: 'error' } as const;

function accepted(kind: RequestKind) {
  return kind === 'form'
    ? statusRedirect('ok')
    : NextResponse.json({ ok: true }, { status: 200, headers: GENERIC_HEADERS });
}

/**
 * Charges the endpoint ceiling first, then the per-client bucket when — and
 * only when — the deployment can actually tell clients apart. Charging both
 * keys for an unidentified client would double-count the same bucket.
 */
function rateLimitVerdict(headers: Headers): RateLimitVerdict {
  const windowMs = env.CONTACT_RATE_LIMIT_WINDOW_MS;

  const shared = checkRateLimit(sharedBucketKey(SCOPE), {
    max: env.CONTACT_RATE_LIMIT_SHARED_MAX,
    windowMs,
  });

  if (!shared.allowed) {
    return shared;
  }

  const bucket = clientBucketFromHeaders(headers, SCOPE, {
    trustProxyHeaders: env.TRUST_PROXY_HEADERS,
  });

  return bucket.identified
    ? checkRateLimit(bucket.key, { max: env.CONTACT_RATE_LIMIT_MAX, windowMs })
    : shared;
}

export async function POST(request: Request) {
  // Read before any work, so the rejection below can already be shaped for the
  // caller. Reading one header costs nothing.
  const kind = requestKind(request.headers.get('content-type') ?? '');
  const verdict = rateLimitVerdict(request.headers);

  if (!verdict.allowed) {
    console.error('[contact] rate limit exceeded for one client bucket');

    return outcome(kind ?? 'json', RATE_LIMITED, {
      'Retry-After': String(verdict.retryAfterSeconds),
      'X-RateLimit-Limit': String(verdict.limit),
      'X-RateLimit-Remaining': '0',
    });
  }

  if (kind === null) {
    return jsonError('UNSUPPORTED_MEDIA_TYPE', 415);
  }

  let rawBody: string;

  try {
    rawBody = await request.text();
  } catch {
    return outcome(kind, INVALID);
  }

  if (Buffer.byteLength(rawBody, 'utf8') > MAX_BODY_BYTES) {
    console.error('[contact] rejected oversized payload');

    return outcome(kind, TOO_LARGE);
  }

  let payload: unknown;

  if (kind === 'json') {
    try {
      payload = JSON.parse(rawBody);
    } catch {
      console.error('[contact] rejected malformed JSON payload');

      return outcome(kind, INVALID);
    }
  } else {
    payload = payloadFromForm(new URLSearchParams(rawBody));
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    // Field names come from our own schema, never from the request body.
    const invalidFields = parsed.error.issues
      .map((issue) => issue.path.join('.'))
      .filter((field, index, all) => all.indexOf(field) === index);

    console.error(`[contact] validation failed for fields: ${invalidFields.join(', ')}`);

    return outcome(kind, INVALID);
  }

  const submission = parsed.data;

  if (submission.website !== undefined && submission.website.trim() !== '') {
    // Honeypot tripped: answer exactly like a success so the bot learns nothing,
    // and drop the message.
    console.error('[contact] honeypot triggered, submission discarded');

    return accepted(kind);
  }

  try {
    // TODO(delivery): forward `submission` to the inbox in env.CONTACT_INBOX
    // through a server-side provider SDK (Resend, Postmark, a CRM...). Keep the
    // credential in a server-only env var and never fetch a URL taken from the
    // payload (OWASP A10).
    void env.CONTACT_INBOX;

    return accepted(kind);
  } catch {
    console.error('[contact] delivery failed');

    return outcome(kind, FAILED);
  }
}
