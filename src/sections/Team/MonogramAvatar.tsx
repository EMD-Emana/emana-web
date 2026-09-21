import { cn } from '@/lib/cn';

import type { MonogramAvatarProps, TeamAvatarVariant } from './Team.types';

/**
 * Original, fully generated avatar: an inline SVG monogram built from the
 * person's initials plus a gradient ring. There is no photograph, no stock
 * asset and no external request — the whole mark is drawn from the design
 * tokens declared in src/styles/globals.css.
 *
 * It is decorative: the name and role sit next to it as real text, so the SVG
 * is aria-hidden and contributes nothing to the accessibility tree.
 */

/** Circumference of the r=34 ring, used to cut each variant's arc. */
const RING_LENGTH = 213.63;

interface VariantSpec {
  readonly from: string;
  readonly to: string;
  /** Visible arc length in user units; the rest of the ring stays empty. */
  readonly arc: number;
  /** Rotation of the arc around the centre, in degrees. */
  readonly rotate: number;
}

const VARIANTS: Readonly<Record<TeamAvatarVariant, VariantSpec>> = {
  violet: { from: 'var(--color-accent)', to: 'var(--color-accent-link)', arc: 96, rotate: -24 },
  teal: { from: 'var(--color-teal)', to: 'var(--color-accent-link)', arc: 132, rotate: 58 },
  duo: { from: 'var(--color-accent)', to: 'var(--color-teal)', arc: 74, rotate: 140 },
  aurora: { from: 'var(--color-teal)', to: 'var(--color-accent)', arc: 160, rotate: -96 },
};

export function MonogramAvatar({ initials, variant, seed, className }: MonogramAvatarProps) {
  const spec = VARIANTS[variant];
  const gradientId = `team-monogram-${seed}`;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 96 96"
      width={72}
      height={72}
      className={cn('shrink-0', className)}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={spec.from} />
          <stop offset="100%" stopColor={spec.to} />
        </linearGradient>
      </defs>

      {/* Plate: keeps the initials on a solid, high-contrast surface. */}
      <rect x="0" y="0" width="96" height="96" rx="28" fill="var(--color-elevated)" />
      <rect
        x="0.75"
        y="0.75"
        width="94.5"
        height="94.5"
        rx="27.25"
        fill="none"
        stroke="var(--color-border)"
        strokeWidth="1.5"
      />

      {/* Gradient arc: the only element that changes between members. */}
      <circle
        cx="48"
        cy="48"
        r="34"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={`${spec.arc} ${RING_LENGTH - spec.arc}`}
        transform={`rotate(${spec.rotate} 48 48)`}
      />
      <circle
        cx="48"
        cy="14"
        r="3.5"
        fill={spec.to}
        transform={`rotate(${spec.rotate + 8} 48 48)`}
      />

      <text
        x="48"
        y="48"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-display)"
        fontSize="28"
        fontWeight="600"
        letterSpacing="0.5"
        fill="var(--color-text)"
      >
        {initials}
      </text>
    </svg>
  );
}
