import Link from 'next/link';

import { cn } from '@/lib/cn';

import type { FooterNavLinkProps } from './Footer.types';

const BASE = 'rounded-pill text-sm text-muted transition-colors hover:text-text';

/**
 * One footer link.
 *
 * Internal routes and in-page anchors go through next/link; anything marked
 * `external` renders a plain anchor with `rel="noopener noreferrer"`, which is
 * what keeps the opened tab from reaching back into this window.
 */
export function FooterNavLink({ link, className }: FooterNavLinkProps) {
  if (link.external === true) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(BASE, className)}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={cn(BASE, className)}>
      {link.label}
    </Link>
  );
}
