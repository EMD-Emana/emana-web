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

  /** Fixed-window rate limit for POST /api/contact. */
  CONTACT_RATE_LIMIT_MAX: z.coerce.number().int().positive().max(1000).default(5),
  CONTACT_RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().max(3_600_000).default(60_000),
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
