import { Heading } from '@/components/ui';
import { cn } from '@/lib/cn';

import type { CapabilityRowProps } from './Capabilities.types';

/**
 * One capability row.
 *
 * The `data-capability-*` attributes are the contract with the ScrollTrigger
 * setup in Capabilities.tsx: the parent queries them instead of holding an array
 * of refs, which keeps this component free of hooks and renderable on the server
 * side of the client boundary.
 *
 * Contrast contract: the inactive state is NOT a dimmed state. Title stays
 * `text-text` (17.99:1) and body stays `text-muted` (7.68:1) at all times, so a
 * visitor who never triggers the highlight — reduced motion, no JS, printing —
 * loses nothing. Activation only promotes the index, the progress bar and the
 * chip borders.
 */
export function CapabilityRow({ item, active }: CapabilityRowProps) {
  return (
    <li
      data-capability-row=""
      data-capability-id={item.id}
      className="flex gap-5 border-t border-border py-7 first:border-t-0 first:pt-0 sm:gap-7"
    >
      {/* Progress indicator. Decorative: the row's own text carries the meaning. */}
      <span
        aria-hidden="true"
        className="relative w-[3px] shrink-0 overflow-hidden rounded-pill bg-border"
      >
        <span
          data-capability-progress=""
          className={cn(
            'absolute inset-0 origin-top rounded-pill transition-colors duration-500',
            active ? 'bg-accent' : 'bg-border-strong',
          )}
        />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-3">
          <span
            aria-hidden="true"
            className={cn(
              'font-display text-xs tabular-nums tracking-[0.25em] transition-colors duration-500',
              active ? 'text-accent-link' : 'text-muted',
            )}
          >
            {item.number}
          </span>

          <Heading level={3} size="xs">
            {item.title}
          </Heading>
        </div>

        <p className="mt-3 text-muted">{item.description}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <li key={tag}>
              <span
                className={cn(
                  'inline-flex rounded-pill border px-3 py-1 text-xs transition-colors duration-500',
                  active ? 'border-border-strong text-text' : 'border-border text-muted',
                )}
              >
                {tag}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
