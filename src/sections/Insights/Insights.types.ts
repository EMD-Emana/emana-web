/**
 * Insights — content contract.
 *
 * Note the split between machine values and human labels: `publishedAt` /
 * `readTimeMinutes` feed the JSON-LD and the <time> attribute, while
 * `publishedLabel` / `readTimeLabel` are the strings a person reads. Formatting
 * is done here, not at runtime, so server and client always render the same
 * characters (no Intl/ICU hydration drift).
 */

/** Decides which original gradient the cover paints. Purely visual. */
export type InsightCoverVariant = 'violet' | 'teal' | 'dual';

export interface InsightAuthor {
  readonly name: string;
  readonly role: string;
}

export interface InsightArticle {
  readonly id: string;
  /** Internal route. Relative on purpose: nothing external is ever fetched. */
  readonly href: string;
  readonly category: string;
  readonly title: string;
  readonly excerpt: string;
  /** ISO 8601 date, e.g. "2026-08-14". Machine readable only. */
  readonly publishedAt: string;
  /** Human label for the same date, already written in Spanish. */
  readonly publishedLabel: string;
  readonly readTimeMinutes: number;
  readonly readTimeLabel: string;
  readonly author: InsightAuthor;
  readonly cover: InsightCoverVariant;
}

export interface InsightsAction {
  readonly label: string;
  readonly href: string;
  /** Accessible name when the visible label is short ("Ver todo"). */
  readonly ariaLabel?: string;
}

export interface InsightsBlogMeta {
  /** Route of the index that lists every article. Used by the Blog JSON-LD. */
  readonly path: string;
  readonly name: string;
  readonly description: string;
  /** BCP-47 tag for the articles, e.g. "es". */
  readonly inLanguage: string;
}

export interface InsightsContent {
  readonly sectionId: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly articles: readonly InsightArticle[];
  readonly action: InsightsAction;
  readonly blog: InsightsBlogMeta;
}

export interface InsightsProps {
  /** Defaults to `insightsContent`. */
  readonly content?: InsightsContent;
  /** Set to false to let the route layer emit the Blog JSON-LD instead. */
  readonly withSchema?: boolean;
}

export interface InsightCardProps {
  readonly article: InsightArticle;
  /**
   * Heading level of the card title, so the outline stays correct in context:
   * 3 under the home section's h2, 2 on the /ideas index where the page title
   * is the h1 and each card is a top-level entry.
   */
  readonly headingLevel?: 2 | 3 | 4;
}

export interface InsightCoverProps {
  readonly variant: InsightCoverVariant;
}
