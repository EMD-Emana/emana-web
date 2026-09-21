'use client';

import type { ElementType } from 'react';

import { useGsapContext } from '@/hooks/useGsapContext';
import { cn } from '@/lib/cn';

import type { RevealProps } from './types';

/**
 * The one scroll-in primitive. Every section uses it instead of re-implementing
 * GSAP, which keeps the motion language consistent and the cleanup correct.
 *
 * Guarantees:
 *  - The "from" state (opacity 0 + Y offset) is applied by JavaScript at runtime.
 *    There is no `opacity: 0` in CSS, so with JS disabled the content is visible.
 *  - Only `opacity` and `transform` are animated: compositor-only, 60fps budget.
 *  - `prefers-reduced-motion: reduce` gets no tween at all (handled by the hook).
 *  - With `stagger`, the DIRECT CHILDREN animate in sequence, so a grid or list
 *    can be revealed without wrapping each item.
 */
export function Reveal({
  children,
  className,
  as = 'div',
  y = 24,
  delay = 0,
  duration = 0.7,
  stagger,
  start = 'top 85%',
  once = true,
}: RevealProps) {
  const ref = useGsapContext<HTMLElement>(
    ({ root, gsap }) => {
      const targets: readonly Element[] = stagger === undefined ? [root] : Array.from(root.children);

      if (targets.length === 0) {
        return;
      }

      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        delay,
        ease: 'power2.out',
        ...(stagger === undefined ? {} : { stagger }),
        scrollTrigger: {
          trigger: root,
          start,
          once,
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        },
      });
    },
    [y, delay, duration, stagger, start, once],
  );

  const Component = as as ElementType;

  return (
    <Component ref={ref} className={cn(className)}>
      {children}
    </Component>
  );
}
