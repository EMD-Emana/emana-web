import type { NextConfig } from 'next';

const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Content Security Policy.
 *
 * OWASP A05 (Security Misconfiguration) + A08 (Software and Data Integrity).
 * The site loads ZERO third-party scripts, fonts or styles: next/font self-hosts
 * Space Grotesk and Inter, so `font-src 'self'` is enough and no CDN is allowed.
 *
 * `'unsafe-inline'` on script-src is required by the Next.js App Router bootstrap
 * payload. Hardening step for production: emit a per-request nonce from
 * middleware.ts and replace `'unsafe-inline'` with `'nonce-<value>' 'strict-dynamic'`.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ''}`,
  `connect-src 'self'${isDevelopment ? ' ws: wss:' : ''}`,
  "manifest-src 'self'",
  "media-src 'self'",
  "worker-src 'self' blob:",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  { key: 'X-DNS-Prefetch-Control', value: 'off' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // No remote patterns on purpose: every image is local (OWASP A10, no SSRF surface).
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
