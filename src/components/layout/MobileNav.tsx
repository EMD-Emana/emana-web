'use client';

import { useCallback, useId, useRef, useState } from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui';
import { useGsapContext } from '@/hooks/useGsapContext';

import { useDrawerA11y } from './MobileNav.a11y';
import { mobileNavContent } from './MobileNav.content';
import type { MobileNavProps } from './MobileNav.types';
import { MobileNavTrigger } from './MobileNavTrigger';

/**
 * Accessible navigation drawer.
 *
 * Structure: a real <button> (MobileNavTrigger) plus a `role="dialog"` panel that
 * STAYS in the DOM and is toggled with the `hidden` attribute. Keeping it mounted
 * is what makes `aria-controls` resolve at all times, and `hidden` is what takes
 * its links out of the tab order while closed — no manual `tabindex` juggling.
 *
 * Behaviour (focus trap, Escape, scroll lock, breakpoint exit) lives in
 * `useDrawerA11y`. The drawer is chrome, not content: with JavaScript disabled
 * it simply never opens, and every link it holds is also in the footer.
 *
 * Motion: the tweens are created inside `useGsapContext`, so they exist only
 * under `prefers-reduced-motion: no-preference` and are reverted on close. Only
 * `transform` and `opacity` are animated.
 */
export function MobileNav({ links, cta, content = mobileNavContent, className }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  const closeSilently = useCallback(() => {
    setOpen(false);
  }, []);

  const toggle = useCallback(() => {
    if (open) {
      close();
      return;
    }

    setOpen(true);
  }, [open, close]);

  useDrawerA11y({ open, panelRef, onClose: close, onViewportExit: closeSilently });

  const overlayRef = useGsapContext<HTMLDivElement>(
    ({ root, gsap }) => {
      if (!open) {
        return;
      }

      const backdrop = root.querySelector('[data-drawer-backdrop]');
      const panel = root.querySelector('[data-drawer-panel]');

      if (backdrop === null || panel === null) {
        return;
      }

      gsap.from(backdrop, { opacity: 0, duration: 0.25, ease: 'power1.out' });
      gsap.from(panel, { xPercent: 100, duration: 0.4, ease: 'power3.out' });
      gsap.from(panel.querySelectorAll('[data-drawer-item]'), {
        opacity: 0,
        y: 14,
        duration: 0.4,
        delay: 0.12,
        stagger: 0.05,
        ease: 'power2.out',
      });
    },
    [open],
  );

  return (
    <>
      <MobileNavTrigger
        open={open}
        panelId={panelId}
        openLabel={content.openLabel}
        closeLabel={content.closeLabel}
        onToggle={toggle}
        className={className}
        buttonRef={triggerRef}
      />

      <div ref={overlayRef} hidden={!open} className="fixed inset-0 z-50 lg:hidden">
        <div
          data-drawer-backdrop
          aria-hidden="true"
          onClick={close}
          className="absolute inset-0 bg-base/85 backdrop-blur-sm"
        />

        <div
          ref={panelRef}
          id={panelId}
          data-drawer-panel
          role="dialog"
          aria-modal="true"
          aria-label={content.dialogLabel}
          className="absolute inset-y-0 right-0 flex h-full w-full max-w-sm flex-col overflow-y-auto border-l border-border bg-surface"
        >
          <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
            <p
              data-drawer-item
              className="font-display text-xs font-semibold tracking-[0.16em] text-muted uppercase"
            >
              {content.panelTitle}
            </p>

            <button
              type="button"
              onClick={close}
              className="inline-flex size-10 items-center justify-center rounded-pill border border-border-strong text-text transition-colors hover:bg-elevated"
            >
              <span className="sr-only">{content.closeLabel}</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M4 4 14 14M14 4 4 14" />
              </svg>
            </button>
          </div>

          <nav aria-label={content.navLabel} className="flex-1 px-5 py-6">
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.href} data-drawer-item>
                  <Link
                    href={link.href}
                    onClick={close}
                    className="block rounded-card px-3 py-3 font-display text-xl text-text transition-colors hover:bg-elevated"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div data-drawer-item className="border-t border-border px-5 py-5">
            <Button href={cta.href} size="lg" fullWidth onClick={close}>
              {cta.label}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
