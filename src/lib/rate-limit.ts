/**
 * In-memory fixed-window rate limiter (OWASP A04 — Insecure Design).
 *
 * PRODUCTION WARNING
 * ------------------
 * This store lives in the memory of a single server process. On a serverless or
 * multi-instance deployment each instance keeps its own counters, so the real
 * limit becomes `max * instances`, and every cold start resets it. For anything
 * beyond a single long-lived Node process, replace `WINDOWS` with a shared store
 * (Redis / Upstash / Vercel KV) using the exact same key and verdict shape —
 * `checkRateLimit` is the only function callers depend on.
 */

export interface RateLimitOptions {
  /** Maximum number of accepted requests inside one window. */
  readonly max: number;
  /** Window length in milliseconds. */
  readonly windowMs: number;
}

export interface RateLimitVerdict {
  readonly allowed: boolean;
  readonly limit: number;
  readonly remaining: number;
  /** Epoch milliseconds at which the current window expires. */
  readonly resetAt: number;
  /** Seconds to put in a Retry-After header. Zero when allowed. */
  readonly retryAfterSeconds: number;
}

interface Window {
  count: number;
  resetAt: number;
}

const WINDOWS = new Map<string, Window>();

/** Safety valve so a flood of unique keys cannot grow the map without bound. */
const MAX_TRACKED_KEYS = 10_000;

function prune(now: number): void {
  for (const [key, window] of WINDOWS) {
    if (window.resetAt <= now) {
      WINDOWS.delete(key);
    }
  }
}

export function checkRateLimit(key: string, options: RateLimitOptions): RateLimitVerdict {
  const now = Date.now();

  if (WINDOWS.size >= MAX_TRACKED_KEYS) {
    prune(now);
  }

  const current = WINDOWS.get(key);

  if (current === undefined || current.resetAt <= now) {
    const resetAt = now + options.windowMs;
    WINDOWS.set(key, { count: 1, resetAt });

    return {
      allowed: true,
      limit: options.max,
      remaining: Math.max(0, options.max - 1),
      resetAt,
      retryAfterSeconds: 0,
    };
  }

  current.count += 1;
  const allowed = current.count <= options.max;

  return {
    allowed,
    limit: options.max,
    remaining: Math.max(0, options.max - current.count),
    resetAt: current.resetAt,
    retryAfterSeconds: allowed ? 0 : Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
  };
}

/**
 * Derives a rate-limit key from request headers.
 *
 * `x-forwarded-for` is only trustworthy behind a proxy you control (Vercel,
 * Cloudflare, your own ingress). Direct-to-Node deployments must NOT trust it;
 * use the socket address instead. Falls back to a constant bucket so an
 * unidentifiable client is still limited rather than unlimited.
 */
export function clientKeyFromHeaders(headers: Headers, scope: string): string {
  const forwardedFor = headers.get('x-forwarded-for');
  const firstHop = forwardedFor?.split(',')[0]?.trim();
  const realIp = headers.get('x-real-ip')?.trim();
  const ip = firstHop !== undefined && firstHop !== '' ? firstHop : (realIp ?? '');

  return `${scope}:${ip === '' ? 'unknown' : ip}`;
}
