'use client';

import { cn } from '@/lib/cn';

import type { MobileNavTriggerProps } from './MobileNav.types';

const BAR = 'absolute left-0 h-0.5 w-full rounded-pill bg-current';

/**
 * The drawer's trigger.
 *
 * It is a real <button> that reports its state through `aria-expanded` and names
 * the panel it controls through `aria-controls`. The glyph is decorative, so it
 * is hidden from assistive technology and the button carries a text label.
 *
 * The open/close morph only animates `transform` and `opacity` on three bars, so
 * it never touches layout. `prefers-reduced-motion: reduce` flattens the
 * transition globally in the base layer.
 */
export function MobileNavTrigger({
  open,
  panelId,
  openLabel,
  closeLabel,
  onToggle,
  className,
  buttonRef,
}: MobileNavTriggerProps) {
  return (
    <button
      ref={buttonRef}
      type="button"
      aria-expanded={open}
      aria-controls={panelId}
      aria-label={open ? closeLabel : openLabel}
      onClick={onToggle}
      className={cn(
        'inline-flex size-11 items-center justify-center rounded-pill border border-border-strong text-text transition-colors hover:bg-elevated',
        className,
      )}
    >
      <span aria-hidden="true" className="relative block h-3.5 w-5">
        <span
          className={cn(
            BAR,
            'top-0 transition-transform duration-300',
            open ? 'translate-y-[6px] rotate-45' : null,
          )}
        />
        <span
          className={cn(BAR, 'top-[6px] transition-opacity duration-200', open ? 'opacity-0' : null)}
        />
        <span
          className={cn(
            BAR,
            'bottom-0 transition-transform duration-300',
            open ? '-translate-y-[6px] -rotate-45' : null,
          )}
        />
      </span>
    </button>
  );
}
