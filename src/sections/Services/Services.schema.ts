import type { JsonLdObject, JsonValue } from '@/lib/jsonld';

import type { ServiceItem, ServicesContent } from './Services.types';

/**
 * schema.org builders for the Services section.
 *
 * The module carries its own structured data (SEO rule: every section that maps
 * to a schema.org type exports its builder). These functions are pure: they take
 * the site origin instead of importing it, so the file stays free of the
 * server-only env module and is trivially unit-testable.
 *
 * Injection note (OWASP A03): nothing here is serialised. The rendering is done
 * by <JsonLd>, the single place allowed to use dangerouslySetInnerHTML, which
 * escapes `<`, `>`, `&` and the JS line terminators first.
 */
export interface ServicesSchemaInput {
  /** Absolute origin without a trailing slash, e.g. `https://example.com`. */
  readonly siteUrl: string;
  /** Legal/brand name of the provider. Must match the Organization node. */
  readonly providerName: string;
  /** Anchor of the rendered section, used to build a linkable URL. */
  readonly sectionId: string;
  readonly areaServed: readonly string[];
}

function normalizeOrigin(siteUrl: string): string {
  return siteUrl.replace(/\/+$/, '');
}

/** One schema.org `Service` node for a single offering. */
export function buildServiceSchema(item: ServiceItem, input: ServicesSchemaInput): JsonLdObject {
  const origin = normalizeOrigin(input.siteUrl);
  const sectionUrl = `${origin}/#${input.sectionId}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${origin}/#service-${item.id}`,
    name: item.title,
    serviceType: item.serviceType,
    description: item.description,
    url: sectionUrl,
    provider: {
      '@type': 'Organization',
      // Matches the Organization node emitted in src/app/layout.tsx.
      '@id': `${origin}#organization`,
      name: input.providerName,
    },
    areaServed: [...input.areaServed],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: item.title,
      itemListElement: item.deliverables.map(
        (deliverable): JsonValue => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: deliverable,
          },
        }),
      ),
    },
  };
}

/** One `Service` node per offering, in the order they are rendered. */
export function buildServicesSchema(
  items: readonly ServiceItem[],
  input: ServicesSchemaInput,
): readonly JsonLdObject[] {
  return items.map((item) => buildServiceSchema(item, input));
}

/** Convenience overload used by the section: derives the input from the content. */
export function buildServicesSchemaFromContent(
  content: ServicesContent,
  options: { readonly siteUrl: string; readonly providerName: string },
): readonly JsonLdObject[] {
  return buildServicesSchema(content.items, {
    siteUrl: options.siteUrl,
    providerName: options.providerName,
    sectionId: content.sectionId,
    areaServed: content.areaServed,
  });
}
