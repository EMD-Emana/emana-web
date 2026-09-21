import type { JsonLdObject, JsonValue } from '@/lib/jsonld';

import type { BillingCycle, PricingContent, PricingTier } from './Pricing.types';

/**
 * Offer JSON-LD for the Pricing section.
 *
 * Every tier becomes a schema.org Offer inside an OfferCatalog, with a
 * UnitPriceSpecification that states the billing period explicitly — otherwise
 * "1800" is ambiguous between a monthly fee and a one-off payment.
 *
 * Keep the emitted cycle aligned with the prices the page shows by default, and
 * only publish amounts that are genuinely available.
 */
export interface PricingSchemaInput {
  readonly content: PricingContent;
  /** Absolute origin without a trailing slash, e.g. absoluteUrl('/'). */
  readonly siteUrl: string;
  /** Which price to publish. Defaults to the section's own default cycle. */
  readonly cycle?: BillingCycle;
}

function buildOffer(
  tier: PricingTier,
  position: number,
  cycle: BillingCycle,
  currency: string,
  url: string,
): JsonValue {
  const isAnnual = cycle === 'annual';
  const price = isAnnual ? tier.annualTotalPrice : tier.monthlyPrice;

  return {
    '@type': 'Offer',
    position: position + 1,
    name: tier.name,
    description: tier.description,
    url,
    price,
    priceCurrency: currency,
    availability: 'https://schema.org/InStock',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price,
      priceCurrency: currency,
      billingDuration: isAnnual ? 12 : 1,
      billingIncrement: 1,
      unitCode: 'MON',
    },
    itemOffered: {
      '@type': 'Service',
      name: tier.name,
      description: tier.description,
      serviceType: 'Inteligencia artificial aplicada',
    },
  };
}

export function buildPricingOfferSchema({
  content,
  siteUrl,
  cycle = content.defaultCycle,
}: PricingSchemaInput): JsonLdObject {
  const url = `${siteUrl}/#${content.id}`;
  const currency = content.labels.currencyCode;

  const offers: readonly JsonValue[] = content.tiers.map((tier, position) =>
    buildOffer(tier, position, cycle, currency, url),
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    '@id': `${siteUrl}#${content.id}`,
    name: content.serviceName,
    description: content.serviceDescription,
    url,
    provider: { '@id': `${siteUrl}#organization` },
    itemListElement: offers,
  };
}
