/**
 * Contracts for the Stats module.
 */

/**
 * Separators are content, not code: Spanish uses a comma for decimals and a dot
 * for thousands. They are passed explicitly instead of calling Intl at render
 * time, because a locale database that differs between Node and the browser is
 * a classic hydration mismatch.
 */
export interface StatNumberFormat {
  readonly decimalSeparator: string;
  readonly groupSeparator: string;
}

export interface Stat {
  /** Unique slug. Feeds the figure id and the label association. */
  readonly id: string;
  /** The final value. It is what renders server-side and without JavaScript. */
  readonly value: number;
  /** Decimal places, 0 to 4. */
  readonly decimals: number;
  /** Rendered before the number, e.g. "+". Use "" for none. */
  readonly prefix: string;
  /** Rendered after the number, e.g. "\u00a0%" or "x". Use "" for none. */
  readonly suffix: string;
  readonly label: string;
  readonly description: string;
}

export interface StatsContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly format: StatNumberFormat;
  readonly items: readonly Stat[];
  readonly footnote: string;
}

export interface StatsProps {
  /** Copy injection point. Defaults to the module's own content object. */
  readonly content?: StatsContent;
  /** Anchor id of the landmark. The heading id is `${id}-title`. */
  readonly id?: string;
}

export interface StatCounterProps {
  readonly value: number;
  readonly decimals: number;
  readonly prefix: string;
  readonly suffix: string;
  readonly format: StatNumberFormat;
  /** Count-up length in seconds. Ignored under reduced motion. */
  readonly durationSeconds?: number;
  readonly className?: string;
}

export interface StatCardProps {
  readonly stat: Stat;
  readonly format: StatNumberFormat;
}
