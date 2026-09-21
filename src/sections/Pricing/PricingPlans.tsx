'use client';

import { useState } from 'react';

import { Reveal } from '@/components/ui';

import { BillingToggle } from './BillingToggle';
import { PricingCard } from './PricingCard';
import type { BillingCycle, PricingPlansProps } from './Pricing.types';

/**
 * Container for the pricing grid: owns the only piece of state in the section
 * (the billing cycle) and passes plain data down to the presentational cards.
 * Switching the cycle re-renders text only — no layout property is animated.
 */
export function PricingPlans({ content }: PricingPlansProps) {
  const [cycle, setCycle] = useState<BillingCycle>(content.defaultCycle);

  const handleChange = (next: BillingCycle) => {
    setCycle(next);
  };

  return (
    <div className="mt-10">
      <div className="flex justify-center">
        <BillingToggle
          options={content.billingOptions}
          value={cycle}
          groupLabel={content.labels.toggleGroup}
          onChange={handleChange}
        />
      </div>

      <Reveal
        as="ul"
        stagger={0.1}
        className="mt-10 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3"
      >
        {content.tiers.map((tier) => (
          <PricingCard key={tier.id} tier={tier} cycle={cycle} labels={content.labels} />
        ))}
      </Reveal>
    </div>
  );
}
