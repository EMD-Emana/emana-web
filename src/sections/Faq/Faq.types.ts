/**
 * Faq — content contract.
 *
 * The component depends on these interfaces, never on the concrete object in
 * Faq.content.ts (dependency inversion). Anyone can pass a different `content`
 * object — a CMS payload, a test fixture — as long as it satisfies FaqContent.
 */

export interface FaqItem {
  /** Stable, URL-safe id. Used for the panel id and as the React key. */
  readonly id: string;
  readonly question: string;
  /** Plain paragraphs. Rendered as <p> nodes — never as HTML. */
  readonly answer: readonly string[];
}

export interface FaqAction {
  readonly label: string;
  /** Same-page anchor or route. No external URL is fetched anywhere. */
  readonly href: string;
}

export interface FaqAside {
  readonly title: string;
  readonly description: string;
  readonly action: FaqAction;
}

export interface FaqContent {
  /** Landmark id. The heading id is derived as `${sectionId}-title`. */
  readonly sectionId: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly items: readonly FaqItem[];
  readonly aside: FaqAside;
}

export interface FaqProps {
  /** Defaults to `faqContent`, so `<Faq />` renders the shipped copy. */
  readonly content?: FaqContent;
  /**
   * Set to false when the page renders the FAQPage JSON-LD itself (for example
   * hoisted into the route layer) to avoid emitting the graph twice.
   */
  readonly withSchema?: boolean;
}

export interface FaqAccordionItemProps {
  readonly item: FaqItem;
}
