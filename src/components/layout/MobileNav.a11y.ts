'use client';

import { useEffect } from 'react';

import type { DrawerA11yOptions } from './MobileNav.types';

/** Everything that can hold focus inside the panel. Order follows the DOM. */
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Breakpoint at which the drawer is hidden by CSS (`lg` = 64rem). */
const DESKTOP_QUERY = '(min-width: 64rem)';

/**
 * The behavioural half of the drawer: focus trap, initial focus, Escape, body
 * scroll lock and breakpoint exit. Kept out of the component so the JSX stays
 * readable and so the behaviour can be reasoned about (and reused) on its own.
 *
 * It deliberately does NOT own the open state: the component does, which keeps
 * a single source of truth for what the markup renders.
 */
export function useDrawerA11y({ open, panelRef, onClose, onViewportExit }: DrawerA11yOptions): void {
  useEffect(() => {
    const panel = panelRef.current;

    if (!open || panel === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusables = () => Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const items = focusables();

      if (items.length === 0) {
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const inside = active instanceof Node && panel.contains(active);

      if (event.shiftKey && (!inside || active === first)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (!inside || active === last)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, panelRef, onClose]);

  // Growing past `lg` hides the drawer in CSS: close it first, so neither the
  // scroll lock nor a focused link that is no longer on screen survives the
  // resize.
  //
  // (Wording matters here: Tailwind v4 scans source files as plain text, so a
  // bare utility name written in a comment is enough to emit that rule into the
  // production stylesheet.)
  useEffect(() => {
    if (!open) {
      return;
    }

    const query = window.matchMedia(DESKTOP_QUERY);

    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        onViewportExit();
      }
    };

    query.addEventListener('change', onChange);

    return () => {
      query.removeEventListener('change', onChange);
    };
  }, [open, onViewportExit]);
}
