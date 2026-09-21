/**
 * Testimonials module contract.
 *
 * Labels that need a number carry {n}, {total}, {value} or {best} placeholders
 * so the whole user-facing vocabulary stays in Testimonials.content.ts and the
 * components never concatenate Spanish by hand.
 */

export interface Testimonial {
  readonly id: string;
  readonly quote: string;
  readonly authorName: string;
  readonly authorRole: string;
  readonly company: string;
  /** Rendered inside the generated monogram beside the attribution. */
  readonly initials: string;
  /** Whole stars, 1 to `aggregate.best`. */
  readonly rating: number;
}

export interface TestimonialsRating {
  readonly value: number;
  readonly count: number;
  readonly best: number;
  readonly worst: number;
  /** Visible summary, e.g. "4.8 de 5 en 5 proyectos entregados". */
  readonly summary: string;
}

export interface TestimonialsLabels {
  /** Accessible name of the carousel region. */
  readonly carousel: string;
  /** Value of aria-roledescription, e.g. "carrusel". */
  readonly roleDescription: string;
  readonly previous: string;
  readonly next: string;
  readonly pause: string;
  readonly play: string;
  /** "Ir al testimonio {n} de {total}" — dot buttons. */
  readonly goTo: string;
  /** "Testimonio {n} de {total}" — visible counter. */
  readonly position: string;
  /** "Calificación: {value} de {best} estrellas" — screen-reader only. */
  readonly rating: string;
}

export interface TestimonialsContent {
  /** Anchor id of the <section>. The heading id is `${id}-title`. */
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  readonly labels: TestimonialsLabels;
  readonly aggregate: TestimonialsRating;
  /** Name of the reviewed offering, used by the AggregateRating JSON-LD. */
  readonly itemName: string;
  readonly itemDescription: string;
  /** Milliseconds between slides. Ignored under prefers-reduced-motion. */
  readonly autoAdvanceMs: number;
  readonly items: readonly Testimonial[];
}

export interface TestimonialsProps {
  readonly content?: TestimonialsContent;
  /**
   * Set to false when the route layer emits this section's nodes inside a
   * combined `@graph` (see src/app/page.tsx), so the page never ships the
   * same entity twice.
   */
  readonly withSchema?: boolean;
}

export interface TestimonialCardProps {
  readonly testimonial: Testimonial;
  readonly best: number;
  /** Already-resolved sentence; the card never interpolates copy itself. */
  readonly ratingLabel: string;
  /** false marks the slide aria-hidden while it sits outside the viewport. */
  readonly active: boolean;
}

export interface TestimonialsCarouselProps {
  readonly items: readonly Testimonial[];
  readonly labels: TestimonialsLabels;
  readonly best: number;
  readonly autoAdvanceMs: number;
}

/* --- carousel control glyphs --------------------------------------------- */

export type CarouselIconKind = 'previous' | 'next' | 'pause' | 'play';

export interface CarouselIconProps {
  readonly kind: CarouselIconKind;
}

export interface CarouselControlsProps {
  /** Same list the track renders: one dot per slide, keyed by testimonial id. */
  readonly items: readonly Testimonial[];
  readonly index: number;
  readonly labels: TestimonialsLabels;
  /** false hides the pause control when there is nothing to auto-advance. */
  readonly showPlayToggle: boolean;
  readonly stopped: boolean;
  /** Relative move: -1 previous, +1 next. Wrapping is the carousel's job. */
  readonly onStep: (delta: number) => void;
  readonly onSelect: (index: number) => void;
  readonly onTogglePlay: () => void;
}
