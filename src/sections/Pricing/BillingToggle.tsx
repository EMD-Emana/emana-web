'use client';

import { useRef, type KeyboardEvent } from 'react';

import { cn } from '@/lib/cn';

import type { BillingToggleProps } from './Pricing.types';

/**
 * Monthly / annual switch.
 *
 * Built as a real radiogroup: one tab stop for the whole control, arrow keys
 * (and Home/End) move between options and select as they go, which is the
 * pattern screen-reader users expect from a segmented control.
 */
export function BillingToggle({ options, value, groupLabel, onChange }: BillingToggleProps) {
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (index: number) => {
    // `.at()` is typed as possibly undefined; plain indexing is not.
    const option = options.at(index);

    if (option === undefined) {
      return;
    }

    onChange(option.value);
    buttons.current[index]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const current = options.findIndex((option) => option.value === value);

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      select((current + 1) % options.length);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      select((current - 1 + options.length) % options.length);
    } else if (event.key === 'Home') {
      event.preventDefault();
      select(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      select(options.length - 1);
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label={groupLabel}
      onKeyDown={handleKeyDown}
      className="inline-flex items-center gap-1 rounded-pill border border-border-strong bg-surface p-1"
    >
      {options.map((option, index) => {
        const checked = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            ref={(node) => {
              buttons.current[index] = node;
            }}
            onClick={() => onChange(option.value)}
            className={cn(
              'inline-flex h-9 items-center gap-2 rounded-pill px-4 text-sm font-medium transition-colors duration-200',
              checked ? 'bg-accent text-accent-ink' : 'text-muted hover:text-text',
            )}
          >
            {option.label}
            {option.hint === undefined ? null : (
              <span
                className={cn(
                  'text-xs font-semibold',
                  checked ? 'text-accent-ink' : 'text-teal',
                )}
              >
                {option.hint}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
