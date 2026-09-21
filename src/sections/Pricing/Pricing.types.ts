/**
 * Pricing module contract.
 *
 * Amounts are plain numbers in the currency named by `labels.currencyCode`, so
 * the copy layer never stores a pre-formatted string like "$4,500". Labels that
 * need a value carry a {total} placeholder.
 */

export type BillingCycle = 'monthly' | 'annual';

export interface PricingTier {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  /** Per month when billed monthly. */
  readonly monthlyPrice: number;
  /** Per month when billed annually (the figure shown on the annual tab). */
  readonly annualMonthlyPrice: number;
  /** Charged once per year on the annual cycle. */
  readonly annualTotalPrice: number;
  readonly features: readonly string[];
  readonly ctaLabel: string;
  readonly ctaHref: string;
  /** Exactly one tier should be featured: it gets the accent ring. */
  readonly featured: boolean;
  /** Short label shown above a featured tier, e.g. "Más elegido". */
  readonly badge?: string;
}

export interface BillingOption {
  readonly value: BillingCycle;
  readonly label: string;
  /** Optional savings hint rendered inside the option, e.g. "-20%". */
  readonly hint?: string;
}

export interface PricingLabels {
  /** Accessible name of the billing radiogroup. */
  readonly toggleGroup: string;
  /** Symbol drawn next to the amount; hidden from assistive tech. */
  readonly currencySymbol: string;
  /** ISO 4217 code, announced to assistive tech and used by the JSON-LD. */
  readonly currencyCode: string;
  readonly perMonth: string;
  readonly billedMonthly: string;
  /** "Facturado {total} al año". */
  readonly billedAnnually: string;
  readonly featuresTitle: string;
}

export interface PricingContent {
  /** Anchor id of the <section>. The heading id is `${id}-title`. */
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  readonly footnote: string;
  readonly labels: PricingLabels;
  readonly billingOptions: readonly BillingOption[];
  readonly defaultCycle: BillingCycle;
  /** Name/description of the offering the Offer JSON-LD points at. */
  readonly serviceName: string;
  readonly serviceDescription: string;
  readonly tiers: readonly PricingTier[];
}

export interface PricingProps {
  readonly content?: PricingContent;
  /**
   * Set to false when the route layer emits this section's nodes inside a
   * combined `@graph` (see src/app/page.tsx), so the page never ships the
   * same entity twice.
   */
  readonly withSchema?: boolean;
}

export interface PricingPlansProps {
  readonly content: PricingContent;
}

export interface PricingCardProps {
  readonly tier: PricingTier;
  readonly cycle: BillingCycle;
  readonly labels: PricingLabels;
}

export interface BillingToggleProps {
  readonly options: readonly BillingOption[];
  readonly value: BillingCycle;
  readonly groupLabel: string;
  readonly onChange: (value: BillingCycle) => void;
}
