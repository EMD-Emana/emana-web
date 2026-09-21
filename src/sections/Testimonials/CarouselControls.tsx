import { cn } from '@/lib/cn';

import { CarouselIcon } from './CarouselIcons';
import { fillTemplate } from './fillTemplate';
import type { CarouselControlsProps } from './Testimonials.types';

const CONTROL =
  'inline-flex size-10 items-center justify-center rounded-pill border border-border-strong text-text transition-colors duration-200 hover:bg-elevated';

/**
 * Carousel control row. Every affordance is a real <button> carrying an
 * aria-label from content; the glyphs themselves are decorative.
 */
export function CarouselControls({
  items,
  index,
  labels,
  showPlayToggle,
  stopped,
  onStep,
  onSelect,
  onTogglePlay,
}: CarouselControlsProps) {
  const total = items.length;

  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={labels.previous}
          className={CONTROL}
          onClick={() => onStep(-1)}
        >
          <CarouselIcon kind="previous" />
        </button>
        <button type="button" aria-label={labels.next} className={CONTROL} onClick={() => onStep(1)}>
          <CarouselIcon kind="next" />
        </button>
        {showPlayToggle ? (
          <button
            type="button"
            aria-label={stopped ? labels.play : labels.pause}
            className={CONTROL}
            onClick={onTogglePlay}
          >
            <CarouselIcon kind={stopped ? 'play' : 'pause'} />
          </button>
        ) : null}
      </div>

      <p className="text-sm text-muted">
        {fillTemplate(labels.position, { n: index + 1, total })}
      </p>

      <ul className="flex items-center gap-1">
        {items.map((item, position) => (
          <li key={item.id}>
            <button
              type="button"
              aria-label={fillTemplate(labels.goTo, { n: position + 1, total })}
              aria-current={position === index}
              className="inline-flex size-8 items-center justify-center rounded-pill"
              onClick={() => onSelect(position)}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'block size-2.5 rounded-pill transition-colors duration-200',
                  position === index ? 'bg-accent' : 'bg-border-strong',
                )}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
