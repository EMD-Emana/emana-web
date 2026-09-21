import { Card, Heading } from '@/components/ui';

import { ServiceArrowIcon, ServiceIcon } from './ServiceIcon';
import type { ServiceCardProps } from './Services.types';

/**
 * One service tile.
 *
 * Interaction notes
 *  - The whole card is clickable, but the only focusable element is the real
 *    <a> around the title: `after:absolute after:inset-0` stretches its hit area
 *    over the card without inventing a fake button or trapping the keyboard.
 *  - The hover treatment moves `transform` and changes colours only. There is no
 *    `opacity: 0` in CSS anywhere here: the arrow is always present in the DOM
 *    and visible, and hover simply promotes it from hairline grey to accent and
 *    slides it 4px. That keeps the card fully readable with JS or CSS hover
 *    unavailable, and keeps the animation on the compositor (60fps budget).
 */
export function ServiceCard({ item, deliverablesLabel }: ServiceCardProps) {
  return (
    <Card
      as="li"
      tone="surface"
      interactive
      className="group relative flex h-full flex-col focus-within:border-border-strong"
    >
      <div className="flex items-start justify-between gap-4">
        <span
          aria-hidden="true"
          className="inline-flex size-12 shrink-0 items-center justify-center rounded-card border border-border bg-elevated text-accent-link transition-colors duration-300 group-hover:border-border-strong group-hover:text-teal"
        >
          <ServiceIcon name={item.icon} />
        </span>

        <span
          aria-hidden="true"
          className="font-display text-sm tabular-nums tracking-[0.25em] text-border-strong transition-colors duration-300 group-hover:text-accent-link"
        >
          {item.number}
        </span>
      </div>

      <Heading level={3} size="xs" className="mt-6">
        <a
          href={item.href}
          className="transition-colors duration-300 after:absolute after:inset-0 after:content-[''] group-hover:text-accent-link"
        >
          {item.title}
        </a>
      </Heading>

      <p className="mt-3 text-sm text-muted">{item.description}</p>

      <ul aria-label={deliverablesLabel} className="mt-5 space-y-2 border-t border-border pt-5">
        {item.deliverables.map((deliverable) => (
          <li key={deliverable} className="flex gap-2.5 text-sm text-muted">
            <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 rounded-pill bg-teal" />
            <span>{deliverable}</span>
          </li>
        ))}
      </ul>

      <span aria-hidden="true" className="mt-auto flex items-center gap-3 pt-6">
        <span className="h-px w-8 origin-left bg-border transition-transform duration-300 group-hover:scale-x-150 motion-reduce:transform-none motion-reduce:transition-none" />
        <ServiceArrowIcon className="text-border-strong transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-accent-link motion-reduce:transform-none motion-reduce:transition-none" />
      </span>
    </Card>
  );
}
