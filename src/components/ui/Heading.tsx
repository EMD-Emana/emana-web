import { cn } from '@/lib/cn';

import type { HeadingProps, HeadingSize } from './types';

const SIZES: Readonly<Record<HeadingSize, string>> = {
  display: 'text-6xl sm:text-7xl',
  xl: 'text-5xl',
  lg: 'text-4xl',
  md: 'text-3xl',
  sm: 'text-2xl',
  xs: 'text-xl',
};

/** Default visual size per semantic level, so callers rarely pass `size`. */
const DEFAULT_SIZE_BY_LEVEL: Readonly<Record<HeadingProps['level'], HeadingSize>> = {
  1: 'display',
  2: 'lg',
  3: 'md',
  4: 'sm',
  5: 'xs',
  6: 'xs',
};

/**
 * Polymorphic h1-h6.
 *
 * The semantic level is a required prop and is never inferred from the visual
 * size: that is what keeps the document outline correct (one h1 in Hero, every
 * other section starting at h2, no skipped levels).
 */
export function Heading({ level, children, id, size, className, balance = true }: HeadingProps) {
  const Tag = `h${level}` as const;
  const resolvedSize = size ?? DEFAULT_SIZE_BY_LEVEL[level];

  return (
    <Tag
      id={id}
      className={cn(
        'font-display text-text',
        SIZES[resolvedSize],
        balance ? 'text-balance' : 'text-wrap',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
