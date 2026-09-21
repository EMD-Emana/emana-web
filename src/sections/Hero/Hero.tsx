'use client';

import { Badge, Button, Container, Heading, Section } from '@/components/ui';
import { useGsapContext } from '@/hooks/useGsapContext';
import { cn } from '@/lib/cn';

import { HeroVisual } from './HeroVisual';
import type { HeroHeadlineTone, HeroProps } from './Hero.types';

/**
 * Hero: the page's ONLY h1.
 *
 * Presentational by contract — no data fetching, no literal copy. Everything it
 * paints arrives through `content` (see Hero.content.ts / Hero.types.ts).
 *
 * Motion: one intro timeline on mount (this block is above the fold, so a
 * ScrollTrigger would be pointless) plus the visual's own scrubbed parallax. The
 * "from" states are written by GSAP at runtime, so with JavaScript disabled the
 * headline, subhead and both CTAs render at their final position.
 */

/** Empty string on purpose: the default tone inherits <h1>'s own colour. */
const HEADLINE_TONES: Readonly<Record<HeroHeadlineTone, string>> = {
  default: '',
  accent: 'text-accent-link',
  teal: 'text-teal',
};

export function Hero({ content, className }: HeroProps) {
  const ref = useGsapContext<HTMLDivElement>(({ root, gsap }) => {
    const kicker = root.querySelector<HTMLElement>('[data-hero-kicker]');
    const lines = Array.from(root.querySelectorAll<HTMLElement>('[data-hero-line]'));
    const blocks = Array.from(root.querySelectorAll<HTMLElement>('[data-hero-fade]'));

    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (kicker !== null) {
      timeline.from(kicker, { y: 14, opacity: 0, duration: 0.6 }, 0);
    }

    if (lines.length > 0) {
      // Masked line reveal: each line sits in an overflow-hidden wrapper, so a
      // full-height Y shift is enough — no clip-path, no layout properties.
      timeline.from(lines, { yPercent: 115, opacity: 0, duration: 0.95, stagger: 0.09 }, 0.08);
    }

    if (blocks.length > 0) {
      timeline.from(blocks, { y: 20, opacity: 0, duration: 0.7, stagger: 0.12 }, 0.55);
    }
  }, []);

  return (
    <Section
      id={content.sectionId}
      headingId={content.headingId}
      contained={false}
      className={cn('overflow-hidden pt-28 sm:pt-32 lg:pt-36', className)}
    >
      {/* Decorative backdrop. Never announced, never interactive. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="surface-grid absolute inset-0 opacity-40"
          style={{
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 0%, transparent 72%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 0%, transparent 72%)',
          }}
        />
        <div
          className="absolute -top-48 left-1/2 h-[44rem] w-[44rem] -translate-x-1/2 rounded-pill"
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklab, var(--color-accent) 24%, transparent) 0%, transparent 66%)',
          }}
        />
      </div>

      <Container>
        <div
          ref={ref}
          className="relative grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16"
        >
          <div>
            <span data-hero-kicker="true" className="inline-block">
              <Badge tone={content.badge.tone} dot>
                {content.badge.label}
              </Badge>
            </span>

            <Heading level={1} id={content.headingId} size="display" className="mt-6">
              {content.headline.map((line) => (
                <span key={line.id} className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
                  <span
                    data-hero-line="true"
                    className={cn('block', HEADLINE_TONES[line.tone ?? 'default'])}
                  >
                    {line.text}
                  </span>
                </span>
              ))}
            </Heading>

            <p data-hero-fade="true" className="mt-7 max-w-readable text-lg text-muted">
              {content.subhead}
            </p>

            <div
              data-hero-fade="true"
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              {content.actions.map((action) => (
                <Button key={action.id} href={action.href} variant={action.variant} size="lg">
                  {action.label}
                </Button>
              ))}
            </div>

            <p data-hero-fade="true" className="mt-6 text-sm text-muted">
              {content.footnote}
            </p>
          </div>

          <HeroVisual content={content.visual} className="lg:justify-self-end" />
        </div>
      </Container>
    </Section>
  );
}
