'use client';

import { useCallback, useEffect, useState, type KeyboardEvent } from 'react';

import { CarouselControls } from './CarouselControls';
import { fillTemplate } from './fillTemplate';
import { TestimonialCard } from './TestimonialCard';
import type { TestimonialsCarouselProps } from './Testimonials.types';

/**
 * Accessible testimonial carousel.
 *
 *  - Every control is a real <button> with an aria-label taken from content.
 *  - ArrowLeft / ArrowRight move between slides whenever focus is inside.
 *  - The viewport is an aria-live="polite" region, so the new quote is
 *    announced without stealing focus.
 *  - Auto-advance NEVER runs under prefers-reduced-motion, pauses on hover and
 *    on focus, and always offers an explicit pause control (WCAG 2.2.2).
 *  - All slides stay in the DOM and nothing is hidden by CSS: the track moves
 *    with a transform only, so the content survives without JavaScript.
 */
export function TestimonialsCarousel({
  items,
  labels,
  best,
  autoAdvanceMs,
}: TestimonialsCarouselProps) {
  const total = items.length;
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const step = useCallback(
    (delta: number) => {
      setIndex((current) => (((current + delta) % total) + total) % total);
    },
    [total],
  );

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      setReducedMotion(media.matches);
    };

    sync();
    media.addEventListener('change', sync);

    return () => {
      media.removeEventListener('change', sync);
    };
  }, []);

  const canAutoAdvance = total > 1 && !reducedMotion;
  const running = canAutoAdvance && !stopped && !hovered && !focused;

  useEffect(() => {
    if (!running) {
      return;
    }

    const timer = window.setInterval(() => {
      step(1);
    }, autoAdvanceMs);

    return () => {
      window.clearInterval(timer);
    };
  }, [running, autoAdvanceMs, step]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      step(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      step(1);
    }
  };

  return (
    <div
      role="group"
      aria-roledescription={labels.roleDescription}
      aria-label={labels.carousel}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className="mt-12"
    >
      <div className="overflow-hidden" aria-live="polite" aria-atomic="true">
        <div
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
        >
          {items.map((item, position) => (
            <TestimonialCard
              key={item.id}
              testimonial={item}
              best={best}
              active={position === index}
              ratingLabel={fillTemplate(labels.rating, { value: item.rating, best })}
            />
          ))}
        </div>
      </div>

      <CarouselControls
        items={items}
        index={index}
        labels={labels}
        showPlayToggle={canAutoAdvance}
        stopped={stopped}
        onStep={step}
        onSelect={setIndex}
        onTogglePlay={() => setStopped((current) => !current)}
      />
    </div>
  );
}
