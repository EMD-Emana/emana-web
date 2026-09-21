import { cn } from '@/lib/cn';

import type { CaseStudyVisualProps, CaseStudyVisualVariant } from './CaseStudies.types';

/**
 * Original, hand-authored SVG artwork. No photography, no stock asset, no raster
 * file: the whole visual is vector geometry painted with the design tokens, so
 * it costs no network request and can never be a licensing problem.
 *
 * It is purely decorative — the card's heading, summary and metric carry all the
 * meaning — so the <svg> is aria-hidden and has no accessible name.
 */

const VIEWBOX_WIDTH = 640;
const VIEWBOX_HEIGHT = 360;

/** Network motif: nodes wired into a small graph. */
function MeshMotif({ fillId }: { readonly fillId: string }) {
  const nodes: readonly (readonly [number, number, number])[] = [
    [140, 96, 7],
    [300, 60, 5],
    [232, 196, 10],
    [420, 140, 6],
    [372, 268, 8],
    [516, 216, 5],
  ];

  return (
    <g>
      <path
        d="M140 96 L232 196 L300 60 L420 140 L232 196 M420 140 L372 268 L516 216 L420 140"
        fill="none"
        stroke={`url(#${fillId})`}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {nodes.map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={`url(#${fillId})`} />
      ))}
    </g>
  );
}

/** Orbit motif: concentric rings with markers, for the retrieval case. */
function OrbitMotif({ fillId }: { readonly fillId: string }) {
  const rings: readonly (readonly [number, number])[] = [
    [70, 34],
    [130, 64],
    [196, 96],
  ];

  return (
    <g transform="translate(320 180)">
      {rings.map(([rx, ry]) => (
        <ellipse
          key={rx}
          rx={rx}
          ry={ry}
          fill="none"
          stroke={`url(#${fillId})`}
          strokeWidth="1.25"
          transform="rotate(-18)"
        />
      ))}
      <circle r="18" fill={`url(#${fillId})`} />
      <circle cx="-186" cy="30" r="6" fill="var(--color-teal)" />
      <circle cx="124" cy="-58" r="8" fill="var(--color-accent)" />
      <circle cx="64" cy="62" r="4.5" fill="var(--color-teal)" />
    </g>
  );
}

/** Flow motif: routed lanes with a throughput bar, for the logistics case. */
function FlowMotif({ fillId }: { readonly fillId: string }) {
  const lanes: readonly (readonly [string, number])[] = [
    ['M40 120 C 180 120, 200 60, 340 60 S 500 150, 600 150', 1],
    ['M40 176 C 200 176, 220 210, 360 210 S 520 120, 600 120', 0.7],
    ['M40 232 C 190 232, 230 300, 380 300 S 510 246, 600 246', 0.45],
  ];
  const bars: readonly (readonly [number, number])[] = [
    [92, 26],
    [128, 44],
    [164, 68],
    [200, 38],
  ];

  return (
    <g>
      {lanes.map(([d, opacity]) => (
        <path key={d} d={d} fill="none" stroke={`url(#${fillId})`} strokeWidth="2" opacity={opacity} />
      ))}
      {bars.map(([x, height]) => (
        <rect
          key={x}
          x={x}
          y={320 - height}
          width="18"
          height={height}
          rx="4"
          fill="var(--color-accent)"
          opacity="0.75"
        />
      ))}
      <circle cx="600" cy="150" r="9" fill="var(--color-teal)" />
    </g>
  );
}

function renderMotif(variant: CaseStudyVisualVariant, fillId: string) {
  switch (variant) {
    case 'mesh':
      return <MeshMotif fillId={fillId} />;
    case 'orbit':
      return <OrbitMotif fillId={fillId} />;
    case 'flow':
      return <FlowMotif fillId={fillId} />;
  }
}

export function CaseStudyVisual({ variant, idPrefix, className }: CaseStudyVisualProps) {
  const fillId = `${idPrefix}-fill`;
  const glowId = `${idPrefix}-glow`;
  const gridId = `${idPrefix}-grid`;

  return (
    <svg
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      width={VIEWBOX_WIDTH}
      height={VIEWBOX_HEIGHT}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={cn('block h-auto w-full', className)}
    >
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-accent)" />
          <stop offset="100%" stopColor="var(--color-teal)" />
        </linearGradient>
        <radialGradient id={glowId} cx="50%" cy="8%" r="78%">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.38" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
        </radialGradient>
        <pattern id={gridId} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0 H0 V40" fill="none" stroke="var(--color-border)" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width={VIEWBOX_WIDTH} height={VIEWBOX_HEIGHT} fill="var(--color-base)" />
      <rect width={VIEWBOX_WIDTH} height={VIEWBOX_HEIGHT} fill={`url(#${gridId})`} />
      <rect width={VIEWBOX_WIDTH} height={VIEWBOX_HEIGHT} fill={`url(#${glowId})`} />
      {renderMotif(variant, fillId)}
    </svg>
  );
}
