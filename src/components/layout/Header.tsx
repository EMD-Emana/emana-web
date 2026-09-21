'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { Button, Container } from '@/components/ui';
import { cn } from '@/lib/cn';

import { headerContent } from './Header.content';
import type { HeaderProps } from './Header.types';
import { MobileNav } from './MobileNav';
import { Wordmark } from './Wordmark';

/**
 * Sticky site header.
 *
 * Layout: the bar is `sticky` and pulls the following content up by exactly its
 * own height (`-mb-16`), so it floats transparently over the hero instead of
 * pushing it down. Sections already carry `scroll-mt-24` for that offset.
 *
 * Motion: the solid state is a STATE change, not an animation, so it is not a
 * GSAP tween — it crossfades a decorative background layer with `opacity`, the
 * cheapest property there is. The blur lives on that inner layer and never on
 * the <header>, because `backdrop-filter` would otherwise turn the header into
 * the containing block of the fixed mobile drawer inside it.
 *
 * The scroll listener is passive and coalesced into one rAF per frame.
 */
export function Header({ content = headerContent, className, solidAfter = 24 }: HeaderProps) {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      setSolid(window.scrollY > solidAfter);
    };

    const onScroll = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(read);
      }
    };

    read();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);

      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [solidAfter]);

  return (
    <header className={cn('sticky top-0 z-50 -mb-16 sm:-mb-18', className)}>
      <div
        aria-hidden="true"
        className={cn(
          'absolute inset-0 -z-10 border-b bg-base/80 backdrop-blur-md transition-opacity duration-300',
          solid ? 'border-border opacity-100' : 'border-transparent opacity-0',
        )}
      />

      <Container className="flex h-16 items-center justify-between gap-4 sm:h-18">
        <Wordmark name={content.brand.name} href={content.brand.href} />

        <nav aria-label={content.navLabel} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {content.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex items-center rounded-pill px-3 py-2 text-sm text-muted transition-colors hover:text-text"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button href={content.cta.href} size="sm" className="hidden lg:inline-flex">
            {content.cta.label}
          </Button>

          <MobileNav links={content.links} cta={content.cta} className="lg:hidden" />
        </div>
      </Container>
    </header>
  );
}
