import type { CarouselIconKind, CarouselIconProps } from './Testimonials.types';

/**
 * Original control glyphs, drawn from primitives. Each one is decorative: the
 * surrounding <button> always carries a real aria-label, so the icon itself is
 * hidden from assistive technology.
 */
const PATHS: Readonly<Record<CarouselIconKind, string>> = {
  previous: 'm14 5.5-6.5 6.5 6.5 6.5',
  next: 'm10 5.5 6.5 6.5-6.5 6.5',
  pause: 'M9.5 5.5v13M14.5 5.5v13',
  play: 'M8.5 5.5 18 12l-9.5 6.5z',
};

export function CarouselIcon({ kind }: CarouselIconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4.5"
      fill={kind === 'play' ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={PATHS[kind]} />
    </svg>
  );
}
