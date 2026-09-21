import { Badge, Heading, Reveal, Section } from '@/components/ui';
import { JsonLd } from '@/lib/jsonld';
import { absoluteUrl } from '@/lib/seo';

import { pricingContent } from './Pricing.content';
import { buildPricingOfferSchema } from './Pricing.schema';
import type { PricingProps } from './Pricing.types';
import { PricingPlans } from './PricingPlans';

/**
 * Pricing section.
 *
 * SERVER COMPONENT: it reads the validated site URL through @/lib/seo to emit
 * absolute JSON-LD ids, so it must stay on the server. Only PricingPlans (the
 * billing toggle and the grid it drives) ships to the browser.
 *
 * SEO/a11y: heading starts at <h2>, <Section> wires aria-labelledby, and the
 * published Offer prices match the section's default billing cycle.
 */
export function Pricing({ content = pricingContent, withSchema = true }: PricingProps) {
  const headingId = `${content.id}-title`;
  const schema = buildPricingOfferSchema({ content, siteUrl: absoluteUrl('/') });

  return (
    <Section id={content.id}>
      {withSchema ? <JsonLd id="pricing-offer-catalog" data={schema} /> : null}

      <Reveal className="mx-auto flex max-w-readable flex-col items-center gap-4 text-center">
        <Badge tone="accent" dot>
          {content.eyebrow}
        </Badge>
        <Heading level={2} id={headingId}>
          {content.title}
        </Heading>
        <p className="text-lg text-muted">{content.intro}</p>
      </Reveal>

      <PricingPlans content={content} />

      <Reveal className="mt-8">
        <p className="mx-auto max-w-readable text-center text-xs text-muted">{content.footnote}</p>
      </Reveal>
    </Section>
  );
}
