import { cn } from '@/lib/cn';

import type { InsightCoverProps, InsightCoverVariant } from './Insights.types';

/**
 * Original, fully decorative article cover.
 *
 * Drawn with the project's own tokens (gradient + the shared `.surface-grid`
 * hairlines + an inline SVG) instead of a bitmap: nothing to download, nothing
 * to license, and it stays crisp at any density. It carries no information, so
 * it is hidden from assistive technology rather than given fake alt text.
 */
const GRADIENTS: Readonly<Record<InsightCoverVariant, string>> = {
  violet: 'bg-linear-to-br from-accent/35 via-elevated to-base',
  teal: 'bg-linear-to-br from-teal/30 via-elevated to-base',
  dual: 'bg-linear-to-br from-accent/30 via-elevated to-teal/25',
};

const STROKES: Readonly<Record<InsightCoverVariant, string>> = {
  violet: 'text-accent-link',
  teal: 'text-teal',
  dual: 'text-accent-link',
};

export function InsightCover({ variant }: InsightCoverProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative h-36 w-full overflow-hidden rounded-card border border-border',
        GRADIENTS[variant],
      )}
    >
      <span className="surface-grid absolute inset-0 opacity-25" />

      <svg
        viewBox="0 0 160 160"
        fill="none"
        focusable="false"
        className={cn('absolute -right-8 -bottom-12 size-48', STROKES[variant])}
      >
        <circle cx="80" cy="80" r="30" stroke="currentColor" strokeWidth="1" opacity="0.85" />
        <circle cx="80" cy="80" r="52" stroke="currentColor" strokeWidth="1" opacity="0.55" />
        <circle cx="80" cy="80" r="74" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <path
          d="M6 120 L48 88 L90 106 L154 40"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />
      </svg>
    </div>
  );
}
