/**
 * Shared brand lockup contract.
 *
 * The wordmark is used by both Header and Footer, so it owns its own interface
 * instead of borrowing one of theirs: neither layout module depends on the other.
 */
export interface WordmarkProps {
  /** Visible brand name. It is also the accessible name of the link. */
  readonly name: string;
  /** Where the lockup navigates. Usually the site root. */
  readonly href: string;
  readonly className?: string;
  readonly textClassName?: string;
  /** Square size of the inline mark in pixels. */
  readonly markSize?: number;
}
