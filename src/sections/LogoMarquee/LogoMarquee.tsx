'use client';

import { useCallback, useRef, useState } from 'react';

import { Button, Container, Heading, Reveal, Section } from '@/components/ui';
import { useGsapContext } from '@/hooks/useGsapContext';
import { cn } from '@/lib/cn';

import { Wordmark } from './Wordmark';
import type { LogoMarqueeProps } from './LogoMarquee.types';

/**
 * Infinite horizontal marquee of original wordmarks.
 *
 * Motion: the track holds TWO identical copies of the list, so a single
 * `xPercent: -50` loop lands exactly on the seam and never jumps. Transform
 * only. Under `prefers-reduced-motion: reduce` the tween is never created (see
 * useGsapContext) and the strip is simply a static row — which is why the
 * spacing lives on each item, not as a gap on the track.
 *
 * Accessibility: the second copy is `aria-hidden`, the strip pauses on hover and
 * focus, and WCAG 2.2.2 gets a real pause control that only appears once motion
 * actually started.
 */

/** Minimal surface the component needs from the tween (dependency inversion). */
interface PausableAnimation {
  pause(): void;
  resume(): void;
}

const EDGE_MASK = 'linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)';

const COPIES = [0, 1] as const;

export function LogoMarquee({ content, className }: LogoMarqueeProps) {
  const animationRef = useRef<PausableAnimation | null>(null);
  const pausedRef = useRef(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const ref = useGsapContext<HTMLDivElement>(
    ({ root, gsap }) => {
      const track = root.querySelector<HTMLElement>('[data-marquee-track]');

      if (track === null) {
        return;
      }

      animationRef.current = gsap.to(track, {
        xPercent: -50,
        duration: content.durationSeconds,
        ease: 'none',
        repeat: -1,
      });

      setIsAnimated(true);
    },
    [content.durationSeconds],
  );

  const holdStart = useCallback(() => {
    animationRef.current?.pause();
  }, []);

  const holdEnd = useCallback(() => {
    if (!pausedRef.current) {
      animationRef.current?.resume();
    }
  }, []);

  const togglePaused = useCallback(() => {
    const next = !pausedRef.current;
    pausedRef.current = next;
    setIsPaused(next);

    if (next) {
      animationRef.current?.pause();
    } else {
      animationRef.current?.resume();
    }
  }, []);

  return (
    <Section
      id={content.sectionId}
      headingId={content.headingId}
      contained={false}
      /* No `py-*` override here: Section already owns the vertical rhythm, and a
         second utility from the same family would not reliably win the cascade. */
      className={cn(className)}
    >
      <Container>
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Heading level={2} id={content.headingId} size="xs">
              {content.title}
            </Heading>
            <p className="mt-3 max-w-readable text-sm text-muted">{content.description}</p>
          </div>

          {isAnimated ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePaused}
              aria-pressed={isPaused}
              className="shrink-0 self-start sm:self-auto"
            >
              {isPaused ? content.playLabel : content.pauseLabel}
            </Button>
          ) : null}
        </Reveal>
      </Container>

      <div
        ref={ref}
        onMouseEnter={holdStart}
        onMouseLeave={holdEnd}
        onFocus={holdStart}
        onBlur={holdEnd}
        className="relative mt-10 overflow-hidden border-y border-border py-7"
        style={{ maskImage: EDGE_MASK, WebkitMaskImage: EDGE_MASK }}
      >
        <div data-marquee-track="true" className="flex w-max items-center">
          {COPIES.map((copy) => (
            <ul
              key={copy}
              aria-label={copy === 0 ? content.listLabel : undefined}
              aria-hidden={copy === 1 || undefined}
              className="flex w-max items-center"
            >
              {content.brands.map((brand) => (
                <li
                  key={brand.id}
                  className="px-7 text-muted transition-colors duration-300 hover:text-text sm:px-10"
                >
                  <Wordmark name={brand.name} sector={brand.sector} glyph={brand.glyph} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <Container>
        <p className="mt-6 text-xs text-muted">{content.disclaimer}</p>
      </Container>
    </Section>
  );
}
