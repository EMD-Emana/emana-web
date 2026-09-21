import type { StatNumberFormat } from './Stats.types';

const MAX_DECIMALS = 4;
const GROUPING = /\B(?=(\d{3})+(?!\d))/g;

/**
 * Deterministic number formatting shared by the server render and the count-up.
 *
 * Deliberately not Intl.NumberFormat: the same input must produce the exact same
 * string on the server and in the browser, or React reports a hydration
 * mismatch on the very first paint. Separators arrive from the content object.
 */
export function formatStatNumber(value: number, decimals: number, format: StatNumberFormat): string {
  const safeDecimals = Math.min(Math.max(Math.trunc(decimals), 0), MAX_DECIMALS);
  const safeValue = Number.isFinite(value) ? value : 0;

  const fixed = Math.abs(safeValue).toFixed(safeDecimals);
  const separatorIndex = fixed.indexOf('.');
  const whole = separatorIndex === -1 ? fixed : fixed.slice(0, separatorIndex);
  const fraction = separatorIndex === -1 ? '' : fixed.slice(separatorIndex + 1);

  const grouped = whole.replace(GROUPING, format.groupSeparator);
  const sign = safeValue < 0 ? '-' : '';

  return fraction === ''
    ? `${sign}${grouped}`
    : `${sign}${grouped}${format.decimalSeparator}${fraction}`;
}

/** The complete figure as one string: what a screen reader announces. */
export function formatStatValue(
  value: number,
  decimals: number,
  prefix: string,
  suffix: string,
  format: StatNumberFormat,
): string {
  return `${prefix}${formatStatNumber(value, decimals, format)}${suffix}`;
}
