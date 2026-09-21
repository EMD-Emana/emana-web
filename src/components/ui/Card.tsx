import type { ElementType } from 'react';

import { cn } from '@/lib/cn';

import type { CardProps, CardTone } from './types';

const TONES: Readonly<Record<CardTone, string>> = {
  surface: 'bg-surface border border-border',
  elevated: 'bg-elevated border border-border',
  outline: 'bg-transparent border border-border',
};

/**
 * Neutral content box. It only animates `transform` on hover, and only when the
 * card is actually interactive, so nothing moves under a static block of text.
 */
export function Card({
  children,
  className,
  tone = 'surface',
  interactive = false,
  as = 'div',
  ...rest
}: CardProps) {
  // Cast keeps the JSX element type open; the allowed tags are fixed in types.ts.
  const Component = as as ElementType;

  return (
    <Component
      className={cn(
        'rounded-card p-6 sm:p-7',
        TONES[tone],
        interactive
          ? 'transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-border-strong motion-reduce:transform-none motion-reduce:transition-none'
          : null,
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
