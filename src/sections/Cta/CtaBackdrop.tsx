'use client';

import { useGsapContext } from '@/hooks/useGsapContext';

/**
 * Decorative backdrop for the closing panel: the shared hairline grid plus two
 * slow-drifting colour fields.
 *
 * Motion contract:
 *  - the gradients are painted in CSS, so with JS disabled (or with reduced
 *    motion) the panel still looks finished — the tween only adds drift;
 *  - only `transform` is animated (xPercent / yPercent / scale), never a layout
 *    property, so the loop stays on the compositor;
 *  - useGsapContext wraps everything in matchMedia('no-preference') and reverts
 *    on unmount, so nothing keeps running after the section leaves the tree.
 */
export function CtaBackdrop() {
  const ref = useGsapContext<HTMLDivElement>(({ root, gsap }) => {
    const orbs = root.querySelectorAll<HTMLElement>('[data-orb]');

    if (orbs.length < 2) {
      return;
    }

    gsap.to(orbs[0], {
      xPercent: 10,
      yPercent: -8,
      scale: 1.1,
      duration: 9,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    gsap.to(orbs[1], {
      xPercent: -12,
      yPercent: 6,
      scale: 0.92,
      duration: 11,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 0.8,
    });
  });

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <span className="surface-grid absolute inset-0 opacity-20" />
      <span
        data-orb="true"
        className="absolute -top-32 -left-24 size-80 rounded-pill bg-accent/25 blur-3xl"
      />
      <span
        data-orb="true"
        className="absolute -right-28 -bottom-36 size-96 rounded-pill bg-teal/20 blur-3xl"
      />
      <span className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-base to-transparent" />
    </div>
  );
}
