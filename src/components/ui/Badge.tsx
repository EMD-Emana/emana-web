import { cn } from '@/lib/cn';

import type { BadgeProps, BadgeTone } from './types';

const TONES: Readonly<Record<BadgeTone, string>> = {
  neutral: 'border-border text-muted',
  accent: 'border-border text-accent-link',
  teal: 'border-border text-teal',
};

const DOTS: Readonly<Record<BadgeTone, string>> = {
  neutral: 'bg-muted',
  accent: 'bg-accent',
  teal: 'bg-teal',
};

/** Small eyebrow label. Decorative dot is hidden from assistive tech. */
export function Badge({ children, className, tone = 'neutral', dot = false }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-pill border bg-elevated px-3 py-1 text-xs font-medium tracking-wide uppercase',
        TONES[tone],
        className,
      )}
    >
      {dot ? <span aria-hidden="true" className={cn('size-1.5 rounded-pill', DOTS[tone])} /> : null}
      {children}
    </span>
  );
}
