/**
 * Contracts for the Capabilities module.
 *
 * As in every section here, the component is written against these interfaces
 * and receives the concrete object as a prop, so the copy in
 * Capabilities.content.ts can be replaced without touching the JSX.
 */

export interface CapabilityItem {
  /** Stable slug. React key, and the value read back from the DOM dataset. */
  readonly id: string;
  /** Two-digit ordinal shown beside the title, e.g. "01". */
  readonly number: string;
  readonly title: string;
  readonly description: string;
  /** Short supporting chips. Kept to three so the row stays scannable. */
  readonly tags: readonly string[];
}

export interface CapabilitiesIntro {
  readonly badge: string;
  readonly title: string;
  /** First paragraph, set at a larger size. */
  readonly lead: string;
  /** Supporting paragraph. */
  readonly body: string;
  readonly ctaLabel: string;
  readonly ctaHref: string;
}

export interface CapabilitiesContent {
  /** Anchor id of the <section> landmark. */
  readonly sectionId: string;
  /** Id of the <h2>. Section uses it for aria-labelledby. */
  readonly headingId: string;
  readonly intro: CapabilitiesIntro;
  /**
   * Visible caption rendered above the ordered list. Kept visible rather than
   * pushed into an aria-label so sighted and screen-reader users read the same
   * sentence.
   */
  readonly listLabel: string;
  readonly items: readonly CapabilityItem[];
}

export interface CapabilitiesProps {
  /** Defaults to `capabilitiesContent`; override to render different copy. */
  readonly content?: CapabilitiesContent;
}

export interface CapabilityRowProps {
  readonly item: CapabilityItem;
  /**
   * True while this row owns the viewport. Driven by ScrollTrigger at runtime;
   * false for everyone before hydration, which is the neutral resting state —
   * it only ever ADDS emphasis, never removes contrast.
   */
  readonly active: boolean;
}
