/**
 * Contracts for the Services module.
 *
 * The component depends on THESE interfaces, never on the concrete object in
 * Services.content.ts (dependency inversion). Swapping the copy — or feeding the
 * section from a CMS later — means passing a different object that satisfies
 * `ServicesContent`; no JSX changes.
 */

/** Keys of the original inline SVGs drawn in ServiceIcon.tsx. */
export type ServiceIconName =
  | 'strategy'
  | 'automation'
  | 'assistant'
  | 'data'
  | 'integration'
  | 'enablement';

export interface ServiceItem {
  /** Stable slug. Used for React keys and for the JSON-LD `@id`. */
  readonly id: string;
  /** Two-digit ordinal shown on the card, e.g. "01". Data, not a derived index. */
  readonly number: string;
  readonly icon: ServiceIconName;
  readonly title: string;
  readonly description: string;
  /** Short, concrete outputs of the engagement. Rendered as a list. */
  readonly deliverables: readonly string[];
  /** Where the card's title link points. */
  readonly href: string;
  /** schema.org `serviceType`. Kept next to the copy so both stay in sync. */
  readonly serviceType: string;
}

export interface ServicesFootnote {
  readonly text: string;
  readonly ctaLabel: string;
  readonly ctaHref: string;
}

export interface ServicesContent {
  /** Anchor id of the <section> landmark. */
  readonly sectionId: string;
  /** Id of the <h2>. Section uses it for aria-labelledby. */
  readonly headingId: string;
  readonly badge: string;
  readonly title: string;
  readonly description: string;
  /** Accessible name for each card's deliverables list. */
  readonly deliverablesLabel: string;
  readonly items: readonly ServiceItem[];
  readonly footnote: ServicesFootnote;
  /** schema.org `areaServed` for every Service emitted by this section. */
  readonly areaServed: readonly string[];
}

export interface ServicesProps {
  /** Defaults to `servicesContent`; override to render different copy. */
  readonly content?: ServicesContent;
  /**
   * Set to false when the route layer emits this section's nodes inside a
   * combined `@graph` (see src/app/page.tsx), so the page never ships the
   * same entity twice.
   */
  readonly withSchema?: boolean;
}

export interface ServiceCardProps {
  readonly item: ServiceItem;
  readonly deliverablesLabel: string;
}

export interface ServiceIconProps {
  readonly name: ServiceIconName;
  readonly className?: string;
}

export interface ServiceArrowIconProps {
  readonly className?: string;
}
