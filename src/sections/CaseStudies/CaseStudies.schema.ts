import type { JsonLdObject } from '@/lib/jsonld';

import type { CaseStudiesContent } from './CaseStudies.types';

/**
 * JSON-LD for the selected-work list.
 *
 * Deliberately an ItemList of CreativeWork: it only describes the projects the
 * page already shows. No AggregateRating, no Review and no Offer is emitted
 * here — those are trust signals search engines treat as claims, and the
 * figures in this case study are illustrative.
 *
 * Pure function: it receives the base URL instead of reading the environment,
 * so it can be unit-tested and never drags server-only modules into a bundle.
 */
export interface CaseStudiesSchemaInput {
  readonly content: CaseStudiesContent;
  /** Absolute origin of the page, e.g. "https://example.com". */
  readonly baseUrl: string;
  /** Anchor id of the section, used to build per-item deep links. */
  readonly sectionId: string;
  readonly inLanguage: string;
}

export function buildCaseStudiesSchema({
  content,
  baseUrl,
  sectionId,
  inLanguage,
}: CaseStudiesSchemaInput): JsonLdObject {
  const root = baseUrl.replace(/\/+$/, '');

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${root}/#${sectionId}`,
    name: content.title,
    description: content.description,
    inLanguage,
    numberOfItems: content.items.length,
    itemListOrder: 'https://schema.org/ItemListUnordered',
    itemListElement: content.items.map((study, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        '@id': `${root}/#${study.id}`,
        url: `${root}/#${study.id}`,
        name: study.title,
        headline: study.title,
        abstract: study.summary,
        about: study.sector,
        keywords: study.tags.join(', '),
        inLanguage,
      },
    })),
  };
}
