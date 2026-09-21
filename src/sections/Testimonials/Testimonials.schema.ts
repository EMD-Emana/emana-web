import type { JsonLdObject, JsonValue } from '@/lib/jsonld';

import type { TestimonialsContent } from './Testimonials.types';

/**
 * AggregateRating JSON-LD for the Testimonials section.
 *
 * The rating is attached to a `Service`, because schema.org forbids a bare
 * AggregateRating: it must describe something. The individual reviews travel
 * with it so the aggregate can be audited against its own source.
 *
 * WARNING: emit this only while `content.items` are real, attributable reviews.
 * The case-study data shipped in Testimonials.content.ts is fictional; marking
 * invented reviews up as structured data is a manual-action risk and a
 * deceptive practice.
 */
export interface TestimonialsSchemaInput {
  readonly content: TestimonialsContent;
  /** Absolute origin without a trailing slash, e.g. absoluteUrl('/'). */
  readonly siteUrl: string;
}

export function buildTestimonialsRatingSchema({
  content,
  siteUrl,
}: TestimonialsSchemaInput): JsonLdObject {
  const { aggregate, items } = content;

  const reviews: readonly JsonValue[] = items.map((item) => ({
    '@type': 'Review',
    reviewBody: item.quote,
    author: {
      '@type': 'Person',
      name: item.authorName,
      jobTitle: item.authorRole,
      worksFor: { '@type': 'Organization', name: item.company },
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: item.rating,
      bestRating: aggregate.best,
      worstRating: aggregate.worst,
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteUrl}#${content.id}`,
    name: content.itemName,
    description: content.itemDescription,
    url: `${siteUrl}/#${content.id}`,
    provider: { '@id': `${siteUrl}#organization` },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: aggregate.value,
      reviewCount: aggregate.count,
      bestRating: aggregate.best,
      worstRating: aggregate.worst,
    },
    review: reviews,
  };
}
