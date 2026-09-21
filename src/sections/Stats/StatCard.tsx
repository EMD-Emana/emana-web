import { Card } from '@/components/ui';

import { StatCounter } from './StatCounter';
import type { StatCardProps } from './Stats.types';

/**
 * One figure. The counter is the only client component in the module; the card
 * itself renders on the server, so a stat is readable before any JS arrives.
 */
export function StatCard({ stat, format }: StatCardProps) {
  return (
    <Card as="li" tone="elevated" className="flex h-full flex-col gap-3">
      <StatCounter
        value={stat.value}
        decimals={stat.decimals}
        prefix={stat.prefix}
        suffix={stat.suffix}
        format={format}
        className="text-4xl text-teal sm:text-5xl"
      />
      <p className="text-sm font-medium text-text">{stat.label}</p>
      <p className="text-sm text-muted">{stat.description}</p>
    </Card>
  );
}
