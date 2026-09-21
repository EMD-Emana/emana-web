import { Badge, Heading, Reveal, Section } from '@/components/ui';
import { JsonLd } from '@/lib/jsonld';
import { absoluteUrl } from '@/lib/seo';

import { testimonialsContent } from './Testimonials.content';
import { buildTestimonialsRatingSchema } from './Testimonials.schema';
import type { TestimonialsProps } from './Testimonials.types';
import { TestimonialsCarousel } from './TestimonialsCarousel';

/**
 * Testimonials section.
 *
 * SERVER COMPONENT: it reads the validated site URL through @/lib/seo to emit
 * absolute JSON-LD ids, so it must stay on the server. Only the carousel below
 * is a client component.
 *
 * SEO/a11y: heading starts at <h2>, <Section> wires aria-labelledby, and the
 * AggregateRating travels with the reviews it summarises.
 */
export function Testimonials({
  content = testimonialsContent,
  withSchema = true,
}: TestimonialsProps) {
  const headingId = `${content.id}-title`;
  const schema = buildTestimonialsRatingSchema({ content, siteUrl: absoluteUrl('/') });

  return (
    <Section id={content.id}>
      {withSchema ? <JsonLd id="testimonials-aggregate-rating" data={schema} /> : null}

      <Reveal className="flex max-w-readable flex-col items-start gap-4">
        <Badge tone="teal" dot>
          {content.eyebrow}
        </Badge>
        <Heading level={2} id={headingId}>
          {content.title}
        </Heading>
        <p className="text-lg text-muted">{content.intro}</p>
        <p className="text-sm text-teal">{content.aggregate.summary}</p>
      </Reveal>

      <TestimonialsCarousel
        items={content.items}
        labels={content.labels}
        best={content.aggregate.best}
        autoAdvanceMs={content.autoAdvanceMs}
      />
    </Section>
  );
}
