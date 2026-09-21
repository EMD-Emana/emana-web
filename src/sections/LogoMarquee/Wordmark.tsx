import type { ReactElement } from 'react';

import type { WordmarkGlyph } from './LogoMarquee.types';

/**
 * Eight ORIGINAL abstract marks, authored here as plain SVG geometry.
 *
 * They are drawn in a 32x32 box with `currentColor`, so a single text colour on
 * the list item drives both the mark and the name — that is what makes the
 * hover state a one-line change instead of eight.
 *
 * The name is rendered as HTML text rather than <text> inside the SVG on
 * purpose: real text stays selectable, reflows, inherits the self-hosted display
 * font, and needs no measured layout. The lockup is still a wordmark.
 */
const GLYPHS: Readonly<Record<WordmarkGlyph, ReactElement>> = {
  orbit: (
    <>
      <circle cx="16" cy="16" r="4.5" />
      <ellipse cx="16" cy="16" rx="13" ry="6.5" transform="rotate(-28 16 16)" />
    </>
  ),
  prism: (
    <>
      <path d="M16 4 28 26H4Z" />
      <path d="M16 4v22" />
    </>
  ),
  pulse: <path d="M2 17h6l3.5-9.5L16.5 25l4-11 2.4 3H30" />,
  lattice: (
    <>
      <rect x="4" y="4" width="10" height="10" rx="2.5" />
      <rect x="18" y="4" width="10" height="10" rx="2.5" />
      <rect x="4" y="18" width="10" height="10" rx="2.5" />
      <rect x="18" y="18" width="10" height="10" rx="2.5" fill="currentColor" stroke="none" />
    </>
  ),
  arc: (
    <>
      <path d="M3 25a13 13 0 0 1 26 0" />
      <path d="M10 25a6 6 0 0 1 12 0" />
      <circle cx="16" cy="25" r="1.8" fill="currentColor" stroke="none" />
    </>
  ),
  nova: (
    <path d="M16 3c1.5 7.1 5.4 11 12.5 12.5C21.4 17 17.5 20.9 16 28c-1.5-7.1-5.4-11-12.5-12.5C10.6 14 14.5 10.1 16 3Z" />
  ),
  delta: (
    <>
      <path d="M5 11.5 16 18l11-6.5" />
      <path d="M5 20 16 26.5 27 20" />
    </>
  ),
  loop: (
    <path d="M10.5 10.5a5.5 5.5 0 1 0 0 11c4.5 0 6.5-11 11-11a5.5 5.5 0 1 1 0 11c-4.5 0-6.5-11-11-11Z" />
  ),
};

export interface WordmarkProps {
  readonly name: string;
  readonly sector: string;
  readonly glyph: WordmarkGlyph;
}

export function Wordmark({ name, sector, glyph }: WordmarkProps) {
  return (
    <span className="flex items-center gap-3.5">
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        focusable="false"
        className="size-9 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {GLYPHS[glyph]}
      </svg>
      <span className="flex flex-col">
        {/* Explicit token, never an opacity fade: 17.99:1 on the page background. */}
        <span className="font-display text-text text-xl font-semibold tracking-tight whitespace-nowrap">
          {name}
        </span>
        {/* Inherits the list item's colour (--color-muted, 7.68:1). */}
        <span className="text-xs tracking-[0.14em] whitespace-nowrap uppercase">{sector}</span>
      </span>
    </span>
  );
}
