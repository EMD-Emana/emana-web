'use client';

import { useGsapContext } from '@/hooks/useGsapContext';
import { cn } from '@/lib/cn';

import { formatStatNumber, formatStatValue } from './Stats.format';
import type { StatCounterProps } from './Stats.types';

const DEFAULT_DURATION_SECONDS = 1.6;

/**
 * Accessible count-up.
 *
 * The final value is rendered on the server and never removed from the DOM, so:
 *  - with JavaScript disabled the figure is already correct;
 *  - a screen reader reads the static `.sr-only` copy and never hears a stream
 *    of intermediate numbers, because the animated copy is aria-hidden;
 *  - under `prefers-reduced-motion: reduce` useGsapContext runs no animation at
 *    all, so the figure simply stays frozen at its final value.
 *
 * The tween is created paused and started once by a ScrollTrigger `onEnter`.
 * Nothing writes to the DOM before that, so the number never flashes back to
 * zero. Both the tween and the trigger are created inside the gsap.context the
 * hook owns, which reverts them on unmount.
 */
export function StatCounter({
  value,
  decimals,
  prefix,
  suffix,
  format,
  durationSeconds = DEFAULT_DURATION_SECONDS,
  className,
}: StatCounterProps) {
  const finalValue = formatStatValue(value, decimals, prefix, suffix, format);
  const finalNumber = formatStatNumber(value, decimals, format);

  const ref = useGsapContext<HTMLSpanElement>(
    ({ root, gsap, ScrollTrigger }) => {
      const target = root.querySelector<HTMLElement>('[data-stat-number]');

      if (target === null) {
        return;
      }

      const counter = { current: 0 };

      const tween = gsap.fromTo(
        counter,
        { current: 0 },
        {
          current: value,
          duration: durationSeconds,
          ease: 'power2.out',
          paused: true,
          immediateRender: false,
          onUpdate: () => {
            target.textContent = formatStatNumber(counter.current, decimals, format);
          },
          onComplete: () => {
            target.textContent = finalNumber;
          },
        },
      );

      ScrollTrigger.create({
        trigger: root,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          tween.play();
        },
      });
    },
    [value, decimals, durationSeconds, format.decimalSeparator, format.groupSeparator],
  );

  return (
    <span ref={ref} className={cn('block font-display tabular-nums', className)}>
      <span className="sr-only">{finalValue}</span>
      <span aria-hidden="true">
        {prefix}
        <span data-stat-number>{finalNumber}</span>
        {suffix}
      </span>
    </span>
  );
}
