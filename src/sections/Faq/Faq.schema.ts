import type { JsonLdObject, JsonValue } from '@/lib/jsonld';

import type { FaqItem } from './Faq.types';

/**
 * FAQPage JSON-LD for this section.
 *
 * Pure function: it receives the same items the DOM renders, so the structured
 * data can never drift from the visible answers (which is exactly what Google's
 * FAQ guidelines require). Serialization and escaping happen once, in
 * lib/jsonld.tsx — the only place allowed to touch dangerouslySetInnerHTML.
 */
export function buildFaqSchema(items: readonly FaqItem[]): JsonLdObject {
  const mainEntity: readonly JsonValue[] = items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer.join(' '),
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  };
}
