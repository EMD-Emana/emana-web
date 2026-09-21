'use client';

import { useGsapContext } from '@/hooks/useGsapContext';
import { cn } from '@/lib/cn';

import type { ProcessLineProps } from './Process.types';

/**
 * The rail that connects the four steps, drawn as the page scrolls.
 *
 * Motion contract:
 *  - Only `transform` is animated (scaleY from its top edge): no layout property
 *    is touched, so the effect stays on the compositor inside the 60fps budget.
 *  - The scaleY(0) start state is written by GSAP at runtime, never in CSS, so
 *    without JavaScript the rail is simply drawn at full height.
 *  - useGsapContext already wraps this in
 *    gsap.matchMedia('(prefers-reduced-motion: no-preference)') and reverts both
 *    the context and the ScrollTrigger on unmount, so reduced motion gets the
 *    static full-height rail.
 *
 * Purely decorative: the ordered list carries the sequence for assistive tech.
 */
export function ProcessLine({ className }: ProcessLineProps) {
  const ref = useGsapContext<HTMLSpanElement>(({ root, gsap }) => {
    gsap.set(root, { scaleY: 0, transformOrigin: 'top center' });

    gsap.to(root, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: root,
        start: 'top 82%',
        end: 'bottom 62%',
        scrub: 0.4,
      },
    });
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute top-6 bottom-6 left-6 w-px rounded-pill',
        'bg-[linear-gradient(to_bottom,var(--color-accent),var(--color-teal))]',
        className,
      )}
    />
  );
}
