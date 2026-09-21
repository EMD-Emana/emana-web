/**
 * The LogoMarquee module's contract.
 *
 * LogoMarquee.tsx depends only on these interfaces, so the strip can be re-fed
 * from a CMS later without touching a component.
 */

/**
 * Identifier of one of the eight ORIGINAL abstract marks drawn in Wordmark.tsx.
 * Adding a brand means picking a glyph from this union; the compiler rejects a
 * name that points at a mark nobody drew.
 */
export type WordmarkGlyph =
  | 'orbit'
  | 'prism'
  | 'pulse'
  | 'lattice'
  | 'arc'
  | 'nova'
  | 'delta'
  | 'loop';

export interface LogoMarqueeBrand {
  readonly id: string;
  readonly name: string;
  /** Short sector label rendered under the name. */
  readonly sector: string;
  readonly glyph: WordmarkGlyph;
}

export interface LogoMarqueeContent {
  /** Anchor id of the <section>. */
  readonly sectionId: string;
  /** Id of the h2; the section's aria-labelledby points here. */
  readonly headingId: string;
  readonly title: string;
  readonly description: string;
  /** Visible note that the names are invented. Do not remove it. */
  readonly disclaimer: string;
  /** Accessible name of the list of marks. */
  readonly listLabel: string;
  readonly pauseLabel: string;
  readonly playLabel: string;
  readonly brands: readonly LogoMarqueeBrand[];
  /** Seconds for one full pass of the track. Higher is slower. */
  readonly durationSeconds: number;
}

export interface LogoMarqueeProps {
  readonly content: LogoMarqueeContent;
  readonly className?: string;
}
