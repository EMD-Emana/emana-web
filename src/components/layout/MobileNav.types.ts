import type { RefObject } from 'react';

import type { NavLink } from './Header.types';

/**
 * Mobile drawer contract.
 *
 * The drawer belongs to the header system, so it reuses the header's `NavLink`
 * shape instead of declaring a near-identical twin. Its own copy — the strings
 * that only exist because the drawer exists — is declared here.
 */
export interface MobileNavContent {
  /** Accessible name of the trigger while the drawer is closed. */
  readonly openLabel: string;
  /** Accessible name of the trigger while the drawer is open, and of the close button. */
  readonly closeLabel: string;
  /** Accessible name of the dialog. */
  readonly dialogLabel: string;
  /** Accessible name of the <nav> inside the dialog. */
  readonly navLabel: string;
  /** Visible eyebrow at the top of the panel. */
  readonly panelTitle: string;
}

export interface MobileNavProps {
  readonly links: readonly NavLink[];
  readonly cta: NavLink;
  readonly content?: MobileNavContent;
  /** Applied to the trigger button, so the header can hide it at `lg`. */
  readonly className?: string;
}

export interface MobileNavTriggerProps {
  readonly open: boolean;
  /** Id of the panel this button controls. Drives `aria-controls`. */
  readonly panelId: string;
  readonly openLabel: string;
  readonly closeLabel: string;
  readonly onToggle: () => void;
  readonly className?: string;
  readonly buttonRef: RefObject<HTMLButtonElement | null>;
}

export interface DrawerA11yOptions {
  readonly open: boolean;
  readonly panelRef: RefObject<HTMLElement | null>;
  /** Closes the drawer AND returns focus to the trigger (Escape, link, button). */
  readonly onClose: () => void;
  /** Closes the drawer without moving focus (viewport grew past the breakpoint). */
  readonly onViewportExit: () => void;
}
