import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

import type { ServiceArrowIconProps, ServiceIconName, ServiceIconProps } from './Services.types';

/**
 * Original inline icon set for this section.
 *
 * Hand-authored geometry on a 24x24 grid, stroked with `currentColor` so the
 * icon inherits whatever text colour its container carries. Nothing is fetched,
 * imported from an icon package or copied from a template (OWASP A08: no
 * third-party assets at all).
 *
 * Every icon is purely decorative: the card's title already names the service,
 * so the <svg> is aria-hidden and removed from the accessibility tree.
 */
const PATHS: Readonly<Record<ServiceIconName, ReactNode>> = {
  /* Reticle: aiming at the right problem before building. */
  strategy: (
    <>
      <circle cx="12" cy="12" r="8.25" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3" />
    </>
  ),

  /* Two systems joined by a return arrow: a loop that runs by itself. */
  automation: (
    <>
      <rect x="2.75" y="2.75" width="7" height="7" rx="2" />
      <rect x="14.25" y="14.25" width="7" height="7" rx="2" />
      <path d="M9.75 6.25h5A2.5 2.5 0 0 1 17.25 8.75v5.5" />
      <path d="m14.75 11.75 2.5 2.5 2.5-2.5" />
    </>
  ),

  /* Speech bubble with a three-dot reply. */
  assistant: (
    <>
      <path d="M20.5 13.75A2.75 2.75 0 0 1 17.75 16.5H11.5L7 20v-3.5h-.75A2.75 2.75 0 0 1 3.5 13.75v-7A2.75 2.75 0 0 1 6.25 4h11.5a2.75 2.75 0 0 1 2.75 2.75Z" />
      <path d="M8.75 10.25h.01M12 10.25h.01M15.25 10.25h.01" />
    </>
  ),

  /* Stacked store: versioned layers of the same source. */
  data: (
    <>
      <ellipse cx="12" cy="5.75" rx="7.25" ry="3.25" />
      <path d="M4.75 5.75v5.5c0 1.8 3.25 3.25 7.25 3.25s7.25-1.45 7.25-3.25v-5.5" />
      <path d="M4.75 11.25v6.25c0 1.8 3.25 3.25 7.25 3.25s7.25-1.45 7.25-3.25v-6.25" />
    </>
  ),

  /* Hub with three satellites: everything wired to one core. */
  integration: (
    <>
      <circle cx="12" cy="12" r="2.75" />
      <circle cx="5" cy="5" r="2" />
      <circle cx="19" cy="5" r="2" />
      <circle cx="12" cy="20.25" r="2" />
      <path d="m6.55 6.55 3.5 3.5M17.45 6.55l-3.5 3.5M12 14.75v3.5" />
    </>
  ),

  /* Cap over a base: people leave the project knowing how to run it. */
  enablement: (
    <>
      <path d="M12 3.75 21.25 8.5 12 13.25 2.75 8.5Z" />
      <path d="M6.5 10.75v4.5c0 1.6 2.46 2.9 5.5 2.9s5.5-1.3 5.5-2.9v-4.5" />
      <path d="M21.25 8.5v5.25" />
    </>
  ),
};

export function ServiceIcon({ name, className }: ServiceIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn('size-6', className)}
    >
      {PATHS[name]}
    </svg>
  );
}

/** Decorative affordance rendered at the foot of every card. */
export function ServiceArrowIcon({ className }: ServiceArrowIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn('size-4', className)}
    >
      <path d="M4.5 12h14M13 6.5l5.5 5.5-5.5 5.5" />
    </svg>
  );
}
