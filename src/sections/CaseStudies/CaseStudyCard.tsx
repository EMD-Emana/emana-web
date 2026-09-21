import { Badge, Button, Card, Heading } from '@/components/ui';

import type { CaseStudyCardProps } from './CaseStudies.types';
import { CaseStudyVisual } from './CaseStudyVisual';

/**
 * One project card. Presentational only: everything it shows arrives as props.
 *
 * Heading level is 3 because the section owns the single h2 — the outline stays
 * h1 (Hero) > h2 (section) > h3 (card) with no skipped level.
 */
export function CaseStudyCard({ study, headingId, clientLabel, tagsLabel }: CaseStudyCardProps) {
  const tagsLabelId = `${study.id}-tags-label`;

  return (
    <Card
      as="li"
      tone="surface"
      interactive
      id={study.id}
      className="flex h-full scroll-mt-28 flex-col gap-5"
    >
      <div className="overflow-hidden rounded-xl border border-border">
        <CaseStudyVisual variant={study.visual} idPrefix={study.id} />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Badge tone="teal" dot>
          {study.sector}
        </Badge>
        <p className="text-xs tracking-wide text-muted uppercase">
          <span className="sr-only">{clientLabel} </span>
          {study.client}
        </p>
      </div>

      <Heading level={3} size="xs" id={headingId}>
        {study.title}
      </Heading>

      <p className="text-sm text-muted">{study.summary}</p>

      <div>
        <p id={tagsLabelId} className="sr-only">
          {tagsLabel}
        </p>
        <ul aria-labelledby={tagsLabelId} className="flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-pill border border-border bg-elevated px-3 py-1 text-xs text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-auto border-t border-border pt-5">
        <span className="block font-display text-3xl text-teal">{study.metric.value}</span>
        <span className="mt-1 block text-sm text-muted">{study.metric.label}</span>
      </p>

      <Button variant="link" size="sm" href={study.link.href} aria-label={study.link.ariaLabel}>
        {study.link.label}
      </Button>
    </Card>
  );
}
