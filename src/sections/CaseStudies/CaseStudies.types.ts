/**
 * Contracts for the CaseStudies module.
 *
 * The component depends on THESE interfaces, never on the concrete copy in
 * CaseStudies.content.ts (dependency inversion): any object that satisfies
 * `CaseStudiesContent` renders correctly.
 */

/** A link rendered as a real anchor. `ariaLabel` disambiguates repeated labels. */
export interface CaseStudyLink {
  readonly href: string;
  readonly label: string;
  /** Full sentence for assistive tech, e.g. "Conversemos sobre el caso X". */
  readonly ariaLabel: string;
}

/** The single headline number of a project. Both halves are plain strings, */
/** because the value may carry a sign, a unit or a multiplier. */
export interface CaseStudyMetric {
  readonly value: string;
  readonly label: string;
}

/** Which original SVG motif backs the card. No photography is used anywhere. */
export type CaseStudyVisualVariant = 'mesh' | 'orbit' | 'flow';

export interface CaseStudy {
  /** Unique slug. Feeds the card anchor, the heading id and the SVG gradient ids. */
  readonly id: string;
  readonly client: string;
  readonly sector: string;
  readonly title: string;
  readonly summary: string;
  readonly tags: readonly string[];
  readonly metric: CaseStudyMetric;
  readonly link: CaseStudyLink;
  readonly visual: CaseStudyVisualVariant;
}

export interface CaseStudiesContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  /** Screen-reader prefix before the client name, e.g. "Cliente:". */
  readonly clientLabel: string;
  /** Screen-reader prefix before the tag list, e.g. "Capacidades aplicadas:". */
  readonly tagsLabel: string;
  readonly items: readonly CaseStudy[];
  readonly footnote: string;
  readonly cta: CaseStudyLink;
}

export interface CaseStudiesProps {
  /** Copy injection point. Defaults to the module's own content object. */
  readonly content?: CaseStudiesContent;
  /** Anchor id of the landmark. The heading id is `${id}-title`. */
  readonly id?: string;
  /**
   * Set to false when the route layer emits this section's nodes inside a
   * combined `@graph` (see src/app/page.tsx), so the page never ships the
   * same entity twice.
   */
  readonly withSchema?: boolean;
}

export interface CaseStudyCardProps {
  readonly study: CaseStudy;
  readonly headingId: string;
  readonly clientLabel: string;
  readonly tagsLabel: string;
}

export interface CaseStudyVisualProps {
  readonly variant: CaseStudyVisualVariant;
  /** Namespace for the SVG `defs` ids so three cards never collide. */
  readonly idPrefix: string;
  readonly className?: string;
}
