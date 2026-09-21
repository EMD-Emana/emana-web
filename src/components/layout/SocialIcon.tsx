import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

import type { SocialIconName, SocialIconProps } from './Footer.types';

/**
 * Original, generic channel glyphs — a node graph, a broadcast feed, code
 * brackets and a play frame. They are drawn from scratch for this project and
 * are deliberately NOT anyone's logo: the platform name is carried by the link's
 * visually hidden text label, which is what assistive technology announces.
 *
 * Replace them with properly licensed brand assets before shipping a real site.
 */
const GLYPHS: Readonly<Record<SocialIconName, ReactNode>> = {
  network: (
    <>
      <circle cx="6" cy="12" r="2.4" />
      <circle cx="18" cy="6.5" r="2.4" />
      <circle cx="18" cy="17.5" r="2.4" />
      <path d="M8.2 10.9 15.8 7.4" />
      <path d="M8.2 13.1 15.8 16.6" />
    </>
  ),
  feed: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <path d="M8 12.6a3.6 3.6 0 0 1 3.6 3.6" />
      <path d="M8 9a7.2 7.2 0 0 1 7.2 7.2" />
      <circle cx="8" cy="16.2" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  code: (
    <>
      <path d="M9 7.6 4.6 12 9 16.4" />
      <path d="M15 7.6 19.4 12 15 16.4" />
      <path d="M13.3 5.4 10.7 18.6" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="4" />
      <path d="M10.6 9.4v5.2L15.2 12z" fill="currentColor" stroke="none" />
    </>
  ),
};

/** Decorative by contract: the accessible name always comes from sibling text. */
export function SocialIcon({ name, className }: SocialIconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn('shrink-0', className)}
    >
      {GLYPHS[name]}
    </svg>
  );
}
