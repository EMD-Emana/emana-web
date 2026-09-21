import type { JsonLdObject } from '@/lib/jsonld';

import type { ProcessContent } from './Process.types';

/**
 * JSON-LD for the engagement flow.
 *
 * HowTo + HowToStep is the schema.org type that actually matches an ordered set
 * of named steps, and every field below is text the page already renders. No
 * `totalTime` is emitted: the durations are ranges, and inventing an ISO 8601
 * duration would be a claim the page does not make.
 *
 * Pure function: the base URL is injected, so this module stays free of
 * server-only imports.
 */
export interface ProcessSchemaInput {
  readonly content: ProcessContent;
  /** Absolute origin of the page, e.g. "https://example.com". */
  readonly baseUrl: string;
  /** Anchor id of the section, used to build per-step deep links. */
  readonly sectionId: string;
  readonly inLanguage: string;
}

export function buildProcessSchema({
  content,
  baseUrl,
  sectionId,
  inLanguage,
}: ProcessSchemaInput): JsonLdObject {
  const root = baseUrl.replace(/\/+$/, '');

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${root}/#${sectionId}`,
    name: content.title,
    description: content.description,
    inLanguage,
    step: content.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title,
      text: step.description,
      url: `${root}/#${step.id}`,
    })),
  };
}
