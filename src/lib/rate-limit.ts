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

export interface ClientBucketOptions {
  /**
   * True ONLY when a proxy you control overwrites `x-forwarded-for` and
   * `x-real-ip` on every request. Comes from `env.TRUST_PROXY_HEADERS`.
   */
  readonly trustProxyHeaders: boolean;
}

export interface ClientBucket {
  readonly key: string;
  /**
   * False when the key identifies no one in particular, i.e. it is the shared
   * endpoint-wide bucket. Callers must then apply the SHARED ceiling, never the
   * per-client one.
   */
  readonly identified: boolean;
}

/** Longest forwarding value we will turn into a key (an IPv6 address plus zone). */
const MAX_ADDRESS_LENGTH = 64;

/** Hex, dots, colons and dashes cover IPv4, IPv6 and their mapped forms. */
const ADDRESS_PATTERN = /^[0-9a-fA-F.:%-]+$/;

/**
 * The bucket every request falls into when no client can be told apart.
 *
 * Exported so the caller can charge this bucket on EVERY request, including the
 * ones that also get a per-client bucket: it is the endpoint's own ceiling.
 */
export function sharedBucketKey(scope: string): string {
  return `${scope}:shared`;
}

/**
 * Derives the rate-limit bucket for one request.
 *
 * THE TRUST PROBLEM. `x-forwarded-for` and `x-real-ip` are plain request
 * headers: anyone can send any value. Behind a proxy that rewrites them they
 * identify the client; in front of one they are attacker input, and keying the
 * limiter on attacker input means the attacker picks a fresh empty bucket on
 * every request — the limiter allows all of them and the control is gone.
 *
 * So the headers are read only when the DEPLOYMENT declares the proxy exists
 * (`trustProxyHeaders`). Otherwise this fails closed to the shared bucket: the
 * endpoint keeps a ceiling nobody can dodge, instead of a per-client limit
 * anybody can reset. A malformed or oversized value is treated the same way.
 */
export function clientBucketFromHeaders(
  headers: Headers,
  scope: string,
  options: ClientBucketOptions,
): ClientBucket {
  if (!options.trustProxyHeaders) {
    return { key: sharedBucketKey(scope), identified: false };
  }

  const firstHop = headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const address =
    firstHop !== undefined && firstHop !== '' ? firstHop : (headers.get('x-real-ip')?.trim() ?? '');

  if (address === '' || address.length > MAX_ADDRESS_LENGTH || !ADDRESS_PATTERN.test(address)) {
    return { key: sharedBucketKey(scope), identified: false };
  }

  return { key: `${scope}:ip:${address.toLowerCase()}`, identified: true };
}
