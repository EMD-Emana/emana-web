import Link from 'next/link';

import { cn } from '@/lib/cn';

import type { WordmarkProps } from './Wordmark.types';

/**
 * Brand lockup: an original inline SVG mark plus the brand name as real text.
 *
 * Why the name is HTML text and not part of the SVG:
 *  - it stays selectable, translatable and searchable;
 *  - the link gets its accessible name from the visible text, so no aria-label
 *    has to compete with what a voice-control user actually reads;
 *  - the mark itself is purely decorative and therefore aria-hidden.
 *
 * The geometry (rounded frame, apex node, A-frame stroke) is drawn from scratch
 * for this project.
 */
export function Wordmark({ name, href, className, textClassName, markSize = 28 }: WordmarkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-2.5 rounded-pill text-text transition-colors hover:text-accent-link',
        className,
      )}
    >
      <svg
        width={markSize}
        height={markSize}
        viewBox="0 0 28 28"
        aria-hidden="true"
        focusable="false"
        className="shrink-0"
      >
        <rect
          x="1.25"
          y="1.25"
          width="25.5"
          height="25.5"
          rx="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M7.6 20.2 14 8.4l6.4 11.8"
          fill="none"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-accent"
        />
        <path d="M10.4 16.4h7.2" strokeWidth="1.9" strokeLinecap="round" className="stroke-accent" />
        <circle cx="14" cy="8.4" r="2.5" className="fill-teal" />
      </svg>

      <span className={cn('font-display text-base font-semibold tracking-tight', textClassName)}>
        {name}
      </span>
    </Link>
  );
}
