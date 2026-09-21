import { Card } from '@/components/ui';

import type { TestimonialCardProps } from './Testimonials.types';

/** Original star glyph. Decorative: the rating is also stated in text. */
const STAR_PATH = 'M12 3.1l2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.6l6.1-.9z';

function Stars({ value, best, label }: { readonly value: number; readonly best: number; readonly label: string }) {
  const slots = Array.from({ length: best }, (_unused, index) => index);

  return (
    <p className="flex items-center gap-1">
      <span className="sr-only">{label}</span>
      {slots.map((index) => (
        <svg
          key={index}
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={index < value ? 'size-4 text-teal' : 'size-4 text-border-strong'}
          fill={index < value ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        >
          <path d={STAR_PATH} />
        </svg>
      ))}
    </p>
  );
}

/**
 * One slide. Purely presentational and fully rendered on the server: every
 * testimonial stays in the DOM, so the content is readable (and indexable)
 * even before the carousel hydrates.
 */
export function TestimonialCard({ testimonial, best, ratingLabel, active }: TestimonialCardProps) {
  return (
    <div className="w-full shrink-0 px-1" aria-hidden={!active}>
      <Card as="figure" tone="surface" className="flex h-full flex-col gap-6 sm:p-9">
        <Stars value={testimonial.rating} best={best} label={ratingLabel} />

        <blockquote className="font-display text-2xl leading-snug text-text sm:text-3xl">
          <p>{testimonial.quote}</p>
        </blockquote>

        <figcaption className="mt-auto flex items-center gap-4 border-t border-border pt-6">
          <span
            aria-hidden="true"
            className="flex size-12 shrink-0 items-center justify-center rounded-pill border border-border bg-elevated font-display text-sm font-semibold tracking-wide text-accent-link"
          >
            {testimonial.initials}
          </span>
          <span className="flex flex-col">
            <span className="text-sm font-semibold text-text">{testimonial.authorName}</span>
            <span className="text-sm text-muted">
              {testimonial.authorRole} · {testimonial.company}
            </span>
          </span>
        </figcaption>
      </Card>
    </div>
  );
}
