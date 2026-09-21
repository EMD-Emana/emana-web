import { Badge, Button, Card, Heading } from '@/components/ui';
import { cn } from '@/lib/cn';

import type { PricingCardProps } from './Pricing.types';

/** Original check glyph. Decorative: the feature text carries the meaning. */
const CHECK_PATH = 'm4 10.4 3.6 3.6L16 5.4';

/**
 * Deterministic thousands separator. Intl.NumberFormat is avoided on purpose:
 * its output depends on the runtime locale, which makes the server and client
 * markup drift and triggers a hydration mismatch.
 */
function formatAmount(value: number): string {
  return value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/** Replaces {token} placeholders so no Spanish is ever concatenated in code. */
function fill(
  template: string,
  values: Readonly<Record<string, string | number | undefined>>,
): string {
  return template.replace(/\{(\w+)\}/g, (match: string, key: string) =>
    values[key] === undefined ? match : String(values[key]),
  );
}

export function PricingCard({ tier, cycle, labels }: PricingCardProps) {
  const isAnnual = cycle === 'annual';
  const amount = isAnnual ? tier.annualMonthlyPrice : tier.monthlyPrice;
  const note = isAnnual
    ? fill(labels.billedAnnually, {
        total: `${labels.currencySymbol}${formatAmount(tier.annualTotalPrice)}`,
      })
    : labels.billedMonthly;

  return (
    <Card
      as="li"
      tone={tier.featured ? 'elevated' : 'surface'}
      className={cn(
        'flex h-full flex-col gap-6',
        tier.featured ? 'ring-2 ring-accent lg:p-9' : null,
      )}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <Heading level={3} size="xs">
            {tier.name}
          </Heading>
          {tier.badge === undefined ? null : <Badge tone="accent">{tier.badge}</Badge>}
        </div>
        <p className="text-sm text-muted">{tier.description}</p>
      </div>

      <div className="flex flex-col gap-2 border-y border-border py-6">
        <p className="flex items-baseline gap-1">
          <span className="sr-only">{labels.currencyCode}</span>
          <span aria-hidden="true" className="font-display text-2xl text-muted">
            {labels.currencySymbol}
          </span>
          <span className="font-display text-5xl font-semibold text-text">
            {formatAmount(amount)}
          </span>
          <span className="text-sm text-muted">{labels.perMonth}</span>
        </p>
        <p className="text-xs text-muted">{note}</p>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-wide text-muted uppercase">
          {labels.featuresTitle}
        </p>
        <ul className="flex flex-col gap-3">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm text-text">
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="mt-0.5 size-5 shrink-0 text-teal"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={CHECK_PATH} />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <Button
        href={tier.ctaHref}
        variant={tier.featured ? 'primary' : 'ghost'}
        size="lg"
        fullWidth
        className="mt-auto"
      >
        {tier.ctaLabel}
      </Button>
    </Card>
  );
}
