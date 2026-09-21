import type { JsonLdObject } from '@/lib/jsonld';

import type { HeroContent, HeroSchemaContent } from './Hero.types';

/**
 * JSON-LD for the Hero.
 *
 * This module is intentionally PURE: it takes the site URL as an argument
 * instead of importing `@/lib/seo` (which reads the server-only env). That keeps
 * it importable from a server component without dragging secrets anywhere near
 * the client bundle, and keeps it unit-testable.
 *
 * Google requires structured data to match what the page actually renders, so
 * every field below is derived from the same content object the Hero paints.
 */
export interface HeroSchemaInput {
  /** Site origin WITHOUT a trailing slash, e.g. `site.url` from `@/lib/seo`. */
  readonly siteUrl: string;
  readonly content: HeroContent;
  readonly schema: HeroSchemaContent;
}

/** The h1 as one plain sentence, rebuilt from the rendered lines. */
export function heroHeadlineText(content: HeroContent): string {
  return content.headline.map((line) => line.text.trim()).join(' ');
}

export function buildHeroServiceSchema({ siteUrl, content, schema }: HeroSchemaInput): JsonLdObject {
  // `.at()` returns `HeroAction | undefined`, so the empty-actions case is typed
  // rather than assumed.
  const offer = content.actions.at(0);

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteUrl}#hero-service`,
    name: heroHeadlineText(content),
    serviceType: schema.serviceType,
    category: schema.category,
    description: schema.description,
    url: `${siteUrl}/#${content.sectionId}`,
    provider: { '@id': `${siteUrl}#organization` },
    areaServed: schema.areaServed.map((code) => ({
      '@type': 'Country',
      identifier: code,
    })),
    audience: {
      '@type': 'Audience',
      audienceType: schema.audience,
    },
    ...(offer === undefined
      ? {}
      : {
          offers: {
            '@type': 'Offer',
            name: offer.label,
            description: content.footnote,
            price: '0',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            url: `${siteUrl}/${offer.href}`,
          },
        }),
  };
}
