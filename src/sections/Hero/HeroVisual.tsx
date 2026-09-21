'use client';

import { useGsapContext } from '@/hooks/useGsapContext';
import { cn } from '@/lib/cn';

import type { HeroVisualContent, HeroVisualTone } from './Hero.types';

/**
 * The hero illustration: an ORIGINAL inline SVG of an automation network.
 *
 * Why the geometry lives here and not in Hero.content.ts: node coordinates are
 * drawing, not copy. A non-developer editing Hero.content.ts must never meet a
 * bezier. Every STRING the SVG exposes still arrives through props.
 *
 * Motion contract:
 *  - Edges draw themselves with stroke-dashoffset (paint-level, not layout).
 *  - Nodes pulse with scale + opacity only.
 *  - Parallax is a scrubbed `yPercent`, so the compositor does all the work.
 *  - Everything runs inside the reduced-motion matchMedia of useGsapContext and
 *    is reverted on unmount. With JS off, the SVG renders fully drawn.
 */

interface NetworkNode {
  readonly id: string;
  readonly x: number;
  readonly y: number;
  readonly r: number;
  readonly tone: HeroVisualTone;
}

const VIEWBOX_WIDTH = 520;
const VIEWBOX_HEIGHT = 520;

const NODES: readonly NetworkNode[] = [
  { id: 'in-1', x: 58, y: 132, r: 6, tone: 'muted' },
  { id: 'in-2', x: 58, y: 260, r: 6, tone: 'muted' },
  { id: 'in-3', x: 58, y: 388, r: 6, tone: 'muted' },
  { id: 'mid-1', x: 206, y: 96, r: 9, tone: 'accent' },
  { id: 'mid-2', x: 206, y: 216, r: 9, tone: 'accent' },
  { id: 'mid-3', x: 206, y: 336, r: 9, tone: 'accent' },
  { id: 'mid-4', x: 206, y: 442, r: 9, tone: 'accent' },
  { id: 'hub-1', x: 352, y: 162, r: 11, tone: 'teal' },
  { id: 'hub-2', x: 352, y: 300, r: 11, tone: 'teal' },
  { id: 'hub-3', x: 352, y: 420, r: 11, tone: 'accent' },
  { id: 'out', x: 468, y: 268, r: 15, tone: 'teal' },
];

const NODE_BY_ID: ReadonlyMap<string, NetworkNode> = new Map(
  NODES.map((node) => [node.id, node] as const),
);

const EDGE_PAIRS: readonly (readonly [string, string])[] = [
  ['in-1', 'mid-1'],
  ['in-1', 'mid-2'],
  ['in-2', 'mid-2'],
  ['in-2', 'mid-3'],
  ['in-3', 'mid-3'],
  ['in-3', 'mid-4'],
  ['mid-1', 'hub-1'],
  ['mid-2', 'hub-1'],
  ['mid-2', 'hub-2'],
  ['mid-3', 'hub-2'],
  ['mid-3', 'hub-3'],
  ['mid-4', 'hub-3'],
  ['hub-1', 'out'],
  ['hub-2', 'out'],
  ['hub-3', 'out'],
];

/** Horizontal cubic bezier: control points sit on the midpoint of the span. */
function edgePath(from: NetworkNode, to: NetworkNode): string {
  const midX = Math.round((from.x + to.x) / 2);
  return `M${from.x} ${from.y}C${midX} ${from.y} ${midX} ${to.y} ${to.x} ${to.y}`;
}

interface NetworkEdge {
  readonly id: string;
  readonly d: string;
  /** Edges that also carry a travelling dash, suggesting work moving through. */
  readonly flow: boolean;
}

const EDGES: readonly NetworkEdge[] = EDGE_PAIRS.flatMap(([fromId, toId], index) => {
  const from = NODE_BY_ID.get(fromId);
  const to = NODE_BY_ID.get(toId);

  if (from === undefined || to === undefined) {
    return [];
  }

  return [{ id: `${fromId}--${toId}`, d: edgePath(from, to), flow: index % 4 === 1 }];
});

const FILLS: Readonly<Record<HeroVisualTone, string>> = {
  accent: 'fill-accent',
  teal: 'fill-teal',
  muted: 'fill-border-strong',
};

const DOTS: Readonly<Record<HeroVisualTone, string>> = {
  accent: 'bg-accent',
  teal: 'bg-teal',
  muted: 'bg-border-strong',
};

export interface HeroVisualProps {
  readonly content: HeroVisualContent;
  readonly className?: string;
}

export function HeroVisual({ content, className }: HeroVisualProps) {
  const titleId = 'hero-visual-title';
  const descriptionId = 'hero-visual-desc';

  const ref = useGsapContext<HTMLDivElement>(({ root, gsap }) => {
    const svg = root.querySelector<SVGSVGElement>('[data-hero-svg]');
    const edges = Array.from(root.querySelectorAll<SVGPathElement>('[data-hero-edge]'));
    const flows = Array.from(root.querySelectorAll<SVGPathElement>('[data-hero-flow]'));
    const cores = Array.from(root.querySelectorAll<SVGCircleElement>('[data-hero-core]'));
    const halos = Array.from(root.querySelectorAll<SVGCircleElement>('[data-hero-halo]'));

    // Draw-in: the "from" state is written at runtime, never in CSS.
    edges.forEach((edge) => {
      const length = edge.getTotalLength();
      gsap.set(edge, { strokeDasharray: length, strokeDashoffset: length });
    });

    gsap
      .timeline({ defaults: { ease: 'power2.out' } })
      .to(edges, { strokeDashoffset: 0, duration: 1.5, stagger: 0.05 }, 0.1)
      .from(
        cores,
        { scale: 0, opacity: 0, transformOrigin: 'center center', duration: 0.5, stagger: 0.04 },
        0.45,
      );

    // Soft pulse. Transform + opacity only.
    gsap.set(halos, { transformOrigin: 'center center' });
    gsap.to(halos, {
      scale: 2.1,
      opacity: 0,
      duration: 2.6,
      ease: 'sine.out',
      repeat: -1,
      stagger: 0.3,
    });

    // Travelling dash along a few edges.
    flows.forEach((flow, index) => {
      const length = flow.getTotalLength();
      gsap.fromTo(
        flow,
        { strokeDashoffset: length },
        {
          strokeDashoffset: -18,
          duration: 3.2,
          ease: 'none',
          repeat: -1,
          delay: 0.6 + index * 0.45,
        },
      );
    });

    if (svg !== null) {
      gsap.to(svg, {
        yPercent: -7,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top 25%', end: 'bottom top', scrub: 0.5 },
      });
    }
  }, []);

  return (
    <div ref={ref} className={cn('relative', className)}>
      <svg
        data-hero-svg="true"
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        role="img"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="h-auto w-full max-w-[34rem]"
      >
        <title id={titleId}>{content.title}</title>
        <desc id={descriptionId}>{content.description}</desc>

        <g fill="none" strokeLinecap="round">
          {EDGES.map((edge) => (
            <path
              key={edge.id}
              d={edge.d}
              data-hero-edge="true"
              className="stroke-border-strong"
              strokeWidth={1.25}
              strokeOpacity={0.55}
            />
          ))}
          {EDGES.filter((edge) => edge.flow).map((edge) => (
            <path
              key={`flow-${edge.id}`}
              d={edge.d}
              data-hero-flow="true"
              className="stroke-teal"
              strokeWidth={2.25}
              strokeDasharray="18 1200"
            />
          ))}
        </g>

        <g>
          {NODES.map((node) => (
            <circle
              key={`halo-${node.id}`}
              cx={node.x}
              cy={node.y}
              r={node.r}
              data-hero-halo="true"
              className={FILLS[node.tone]}
              opacity={0.16}
            />
          ))}
          {NODES.map((node) => (
            <circle
              key={node.id}
              cx={node.x}
              cy={node.y}
              r={node.r}
              data-hero-core="true"
              className={FILLS[node.tone]}
            />
          ))}
        </g>
      </svg>

      <ul aria-label={content.legendTitle} className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
        {content.legend.map((item) => (
          <li key={item.id} className="flex items-center gap-2 text-sm text-muted">
            <span aria-hidden="true" className={cn('size-2 rounded-pill', DOTS[item.tone])} />
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
