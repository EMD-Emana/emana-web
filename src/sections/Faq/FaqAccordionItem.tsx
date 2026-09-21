'use client';

import { useEffect, useRef } from 'react';

import gsap from 'gsap';

import type { FaqAccordionItemProps } from './Faq.types';

const OPEN_DURATION = 0.42;
const CLOSE_DURATION = 0.32;

/**
 * One accordion row.
 *
 * Progressive enhancement, in this order:
 *  1. Zero JS: this is a plain <details>/<summary>. It opens, closes, is
 *     keyboard operable and is announced correctly with no script at all.
 *     Nothing is hidden by CSS, so the answer is always in the accessible tree
 *     and always indexable.
 *  2. With JS and `prefers-reduced-motion: no-preference`: the native toggle is
 *     intercepted and replaced by a tween, so the panel slides instead of
 *     snapping. The listener is registered INSIDE gsap.matchMedia, which means a
 *     visitor who asks for reduced motion keeps the instant native behaviour.
 *
 * Motion note: `height` is the single deliberate exception to the
 * transform/opacity-only budget. A collapse has to change layout — no transform
 * can remove a box from the flow — so the tween is scoped to one short,
 * user-initiated toggle on a small subtree, hints the browser with `will-change`
 * for its duration and clears every inline style when it ends.
 */
export function FaqAccordionItem({ item }: FaqAccordionItemProps) {
  const detailsRef = useRef<HTMLDetailsElement | null>(null);
  const summaryRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const details = detailsRef.current;
    const summary = summaryRef.current;
    const panel = panelRef.current;

    if (details === null || summary === null || panel === null) {
      return;
    }

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      let tween: ReturnType<typeof gsap.to> | null = null;

      const settle = () => {
        gsap.set(panel, { clearProps: 'height,opacity,willChange' });
      };

      const handleToggle = (event: Event) => {
        // The tween owns the state change from here on.
        event.preventDefault();
        tween?.kill();
        gsap.set(panel, { willChange: 'height' });

        if (details.open) {
          tween = gsap.to(panel, {
            height: 0,
            opacity: 0,
            duration: CLOSE_DURATION,
            ease: 'power2.in',
            onComplete: () => {
              details.open = false;
              settle();
            },
          });

          return;
        }

        details.open = true;
        tween = gsap.fromTo(
          panel,
          { height: 0, opacity: 0 },
          {
            height: 'auto',
            opacity: 1,
            duration: OPEN_DURATION,
            ease: 'power2.out',
            onComplete: settle,
          },
        );
      };

      summary.addEventListener('click', handleToggle);

      return () => {
        summary.removeEventListener('click', handleToggle);
        tween?.kill();
        settle();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <details ref={detailsRef} className="group border-b border-border last:border-b-0">
      <summary
        ref={summaryRef}
        className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg font-medium text-text transition-colors duration-200 hover:text-accent-link [&::-webkit-details-marker]:hidden"
      >
        {item.question}
        <span
          aria-hidden="true"
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-pill border border-border-strong text-accent-link transition-transform duration-300 group-open:rotate-45"
        >
          <svg viewBox="0 0 16 16" className="size-3.5" fill="none" focusable="false">
            <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
      </summary>

      <div ref={panelRef} className="overflow-hidden">
        <div className="max-w-readable space-y-3 pb-6 text-sm text-muted sm:pr-12">
          {item.answer.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </details>
  );
}
