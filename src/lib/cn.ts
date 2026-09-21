/**
 * Dependency-free class-name joiner.
 *
 * Deliberately NOT clsx + tailwind-merge: this project keeps its dependency
 * surface minimal (OWASP A06/A08). Conflicting Tailwind classes are avoided by
 * composing variants in one place per component instead of merging at runtime.
 */
export type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | readonly ClassValue[]
  | Readonly<Record<string, boolean | null | undefined>>;

export function cn(...values: readonly ClassValue[]): string {
  const out: string[] = [];

  for (const value of values) {
    if (value === null || value === undefined || value === false || value === '') {
      continue;
    }

    if (typeof value === 'string' || typeof value === 'number') {
      out.push(String(value));
      continue;
    }

    if (Array.isArray(value)) {
      const nested = cn(...value);
      if (nested !== '') {
        out.push(nested);
      }
      continue;
    }

    for (const [key, enabled] of Object.entries(value as Record<string, boolean | null | undefined>)) {
      if (enabled === true) {
        out.push(key);
      }
    }
  }

  return out.join(' ');
}
