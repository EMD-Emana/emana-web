/**
 * Header module contract.
 *
 * The component depends on these interfaces, never on the concrete object in
 * Header.content.ts. Injecting a different content object (tests, another
 * locale, a landing variant) requires no change to the component.
 */
export interface NavLink {
  readonly label: string;
  /**
   * Root-relative URL. In-page targets are written as `/#anchor` so the link
   * also works from routes other than the home page (for example /404).
   */
  readonly href: string;
}

export interface HeaderBrandContent {
  readonly name: string;
  readonly href: string;
}

export interface HeaderContent {
  readonly brand: HeaderBrandContent;
  /** Accessible name of the primary <nav> landmark. */
  readonly navLabel: string;
  readonly links: readonly NavLink[];
  readonly cta: NavLink;
}

export interface HeaderProps {
  readonly content?: HeaderContent;
  readonly className?: string;
  /** Scroll offset in pixels after which the bar turns solid. */
  readonly solidAfter?: number;
}
