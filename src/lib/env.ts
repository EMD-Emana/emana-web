import { z } from 'zod';

/**
 * Server-only environment parsing (OWASP A02 — Cryptographic Failures).
 *
 * Rules enforced here:
 *  - No variable in this file is NEXT_PUBLIC_*, so nothing reaches the browser.
 *  - The module refuses to run in a browser context at all.
 *  - On failure we log the offending KEYS, never their VALUES (OWASP A09).
 */
if (typeof window !== 'undefined') {
  throw new Error('src/lib/env.ts is server-only and must not be imported from client code.');
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  /** Absolute origin, no trailing slash. Used for canonical URLs and sitemap. */
  SITE_URL: z
    .string()
    .url()
    .default('http://localhost:3000')
    .transform((value) => value.replace(/\/+$/, '')),

  /** Destination inbox for contact submissions. Optional until a provider is wired. */
  CONTACT_INBOX: z.string().email().optional(),

  /**
   * Does a proxy under YOUR control terminate every request and OVERWRITE
   * `x-forwarded-for` / `x-real-ip` before Node sees them (Vercel, Cloudflare,
   * your own ingress)?
   *
   * Only then is a per-client rate-limit bucket meaningful: on a direct-to-Node
   * deployment those headers are pure client input, and an attacker who varies
   * them lands in a brand-new empty bucket on every request, which silently
   * turns the limit off. Default `false` therefore fails CLOSED — see
   * `clientBucketFromHeaders` in src/lib/rate-limit.ts.
   *
   * Not a coerced boolean on purpose: `Boolean('false')` is `true`, and a typo
   * must not quietly enable trust.
   */
  TRUST_PROXY_HEADERS: z
    .enum(['true', 'false'])
    .default('false')
    .transform((value) => value === 'true'),

  /** Fixed-window rate limit for POST /api/contact, per identified client. */
  CONTACT_RATE_LIMIT_MAX: z.coerce.number().int().positive().max(1000).default(5),
  CONTACT_RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().max(3_600_000).default(60_000),

  /**
   * Ceiling for the whole endpoint inside the same window. It is the only limit
   * that still holds when clients cannot be told apart, so it must stay well
   * above CONTACT_RATE_LIMIT_MAX: too low and one visitor locks out the rest.
   */
  CONTACT_RATE_LIMIT_SHARED_MAX: z.coerce.number().int().positive().max(100_000).default(60),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const invalidKeys = parsed.error.issues
    .map((issue) => issue.path.join('.'))
    .filter((key, index, all) => all.indexOf(key) === index)
    .join(', ');

  // Keys only. Values may contain credentials and must never be logged.
  console.error(`[env] Invalid environment configuration. Offending keys: ${invalidKeys}`);
  throw new Error('Invalid environment configuration. See server logs for the offending keys.');
}

export const env = parsed.data;

export type Env = typeof env;
