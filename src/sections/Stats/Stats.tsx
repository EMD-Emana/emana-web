import { Badge, Heading, Reveal, Section } from '@/components/ui';

import { StatCard } from './StatCard';
import { statsContent } from './Stats.content';
import type { StatsProps } from './Stats.types';

/**
 * Headline figures.
 *
 * No JSON-LD here on purpose. The schema.org types that fit a numbers strip are
 * AggregateRating and Offer, and both are trust claims search engines surface as
 * rich results. The figures in this case study are illustrative, so emitting
 * them as structured data would assert something the page does not stand behind.
 * The section stays semantic HTML: a labelled landmark and a list of figures.
 */
export function Stats({ content = statsContent, id = 'stats' }: StatsProps) {
  const headingId = `${id}-title`;

  return (
    <Section id={id} headingId={headingId}>
      <Reveal className="max-w-readable">
        <Badge tone="teal" dot>
          {content.eyebrow}
        </Badge>
        <Heading level={2} id={headingId} className="mt-5">
          {content.title}
        </Heading>
        <p className="mt-4 text-lg text-muted">{content.description}</p>
      </Reveal>

      <Reveal
        as="ul"
        stagger={0.1}
        start="top 80%"
        className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {content.items.map((stat) => (
          <StatCard key={stat.id} stat={stat} format={content.format} />
        ))}
      </Reveal>

      <p className="mt-10 max-w-readable text-sm text-muted">{content.footnote}</p>
    </Section>
  );
}
