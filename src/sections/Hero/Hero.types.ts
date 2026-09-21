import type { BadgeTone, ButtonVariant } from '@/components/ui';

/**
 * The Hero module's contract.
 *
 * Hero.tsx depends on THESE interfaces, never on Hero.content.ts. That is the
 * dependency inversion that lets a non-developer rewrite every string in
 * Hero.content.ts without opening a single component.
 */

/* --- headline ------------------------------------------------------------ */

export type HeroHeadlineTone = 'default' | 'accent' | 'teal';

/**
 * One rendered line of the h1. The copy is pre-split into lines instead of being
 * cut up at runtime, so the staggered reveal never has to touch text nodes and
 * the heading reads as a single sentence to assistive technology.
 */
export interface HeroHeadlineLine {
  readonly id: string;
  readonly text: string;
  /** Defaults to `default`. Only the violet/teal link tones are AA on #0A0A0F. */
  readonly tone?: HeroHeadlineTone;
}

/* --- calls to action ----------------------------------------------------- */

/** The hero only offers a real primary/secondary pair, never a text link. */
export type HeroActionVariant = Extract<ButtonVariant, 'primary' | 'ghost'>;

export interface HeroAction {
  readonly id: string;
  readonly label: string;
  /** In-page anchor (e.g. `#contacto`) or a route. Never a user-supplied URL. */
  readonly href: string;
  readonly variant: HeroActionVariant;
}

/* --- badge --------------------------------------------------------------- */

export interface HeroBadgeContent {
  readonly label: string;
  readonly tone: BadgeTone;
}

/* --- visual -------------------------------------------------------------- */

export type HeroVisualTone = 'accent' | 'teal' | 'muted';

export interface HeroVisualLegendItem {
  readonly id: string;
  readonly label: string;
  readonly tone: HeroVisualTone;
}

/**
 * The inline SVG is a meaningful illustration, not decoration, so it carries a
 * real accessible name (`title`) and long description (`description`) instead of
 * `aria-hidden`.
 */
export interface HeroVisualContent {
  readonly title: string;
  readonly description: string;
  readonly legendTitle: string;
  readonly legend: readonly HeroVisualLegendItem[];
}

/* --- section ------------------------------------------------------------- */

export interface HeroContent {
  /** Anchor id of the <section>. */
  readonly sectionId: string;
  /** Id of the h1; the section's aria-labelledby points here. */
  readonly headingId: string;
  readonly badge: HeroBadgeContent;
  readonly headline: readonly HeroHeadlineLine[];
  readonly subhead: string;
  readonly actions: readonly HeroAction[];
  readonly footnote: string;
  readonly visual: HeroVisualContent;
}

export interface HeroProps {
  readonly content: HeroContent;
  readonly className?: string;
}

/* --- structured data ----------------------------------------------------- */

/**
 * Schema-only data. Kept apart from HeroContent so the visible copy stays free
 * of SEO plumbing and Hero.tsx never has to import any of it.
 */
export interface HeroSchemaContent {
  readonly serviceType: string;
  readonly category: string;
  readonly description: string;
  readonly areaServed: readonly string[];
  readonly audience: string;
}
