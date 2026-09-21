import { Card, Heading } from '@/components/ui';

import type { ProcessStepCardProps } from './Process.types';

/**
 * One step of the engagement.
 *
 * The <li> is a two column grid: the numbered marker sits over the animated rail
 * (its opaque background is what makes the rail look interrupted), and the card
 * holds the copy. The numeral is aria-hidden because the parent <ol> already
 * tells assistive tech which step this is.
 */
export function ProcessStepCard({
  step,
  headingId,
  deliverableLabel,
  durationLabel,
}: ProcessStepCardProps) {
  return (
    <li id={step.id} className="relative grid scroll-mt-28 grid-cols-[3rem_1fr] gap-x-5 sm:gap-x-8">
      <span
        aria-hidden="true"
        className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-pill border border-border-strong bg-elevated font-display text-sm text-accent-link"
      >
        {step.index}
      </span>

      <Card tone="surface" className="min-w-0">
        <Heading level={3} size="xs" id={headingId}>
          {step.title}
        </Heading>

        <p className="mt-3 text-sm text-muted">{step.description}</p>

        <dl className="mt-5 grid gap-4 border-t border-border pt-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs tracking-wide text-muted uppercase">{deliverableLabel}</dt>
            <dd className="mt-1 text-sm text-text">{step.deliverable}</dd>
          </div>
          <div>
            <dt className="text-xs tracking-wide text-muted uppercase">{durationLabel}</dt>
            <dd className="mt-1 text-sm text-teal">{step.duration}</dd>
          </div>
        </dl>
      </Card>
    </li>
  );
}
