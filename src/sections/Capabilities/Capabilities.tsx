'use client';

import { useState } from 'react';

import { Badge, Button, Heading, Reveal, Section } from '@/components/ui';
import { useGsapContext } from '@/hooks/useGsapContext';

import { capabilitiesContent } from './Capabilities.content';
import type { CapabilitiesProps } from './Capabilities.types';
import { CapabilityRow } from './CapabilityRow';

/**
 * Capabilities — sticky narrative on the left, scroll-driven list on the right.
 *
 * Motion contract
 *  - All GSAP runs through `useGsapContext`, which wraps everything in
 *    gsap.matchMedia('(prefers-reduced-motion: no-preference)') and reverts both
 *    the context and the media query on cleanup. A reduced-motion visitor gets
 *    no tween and no ScrollTrigger at all.
 *  - The only animated property is `scaleY` on the progress bar: transform only,
 *    straight to the compositor. Nothing animates layout.
 *  - The bar's "from" state (scaleY: 0) is set at runtime by gsap.fromTo, never
 *    in CSS. Without JavaScript the bar simply renders full and the row reads
 *    normally — no content is hidden.
 *  - Row entrance reuses the shared <Reveal> primitive instead of a second,
 *    slightly different implementation.
 *
 * Highlight state lives in React rather than in a class toggled from GSAP, so
 * the rendered markup always matches what the components declare.
 */
export function Capabilities({ content = capabilitiesContent }: CapabilitiesProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const listRef = useGsapContext<HTMLDivElement>(
    ({ root, gsap, ScrollTrigger }) => {
      const rows = gsap.utils.toArray<HTMLElement>('[data-capability-row]', root);

      rows.forEach((row) => {
        const id = row.dataset.capabilityId;

        ScrollTrigger.create({
          trigger: row,
          start: 'top 70%',
          end: 'bottom 45%',
          onToggle: (self) => {
            if (self.isActive && id !== undefined) {
              setActiveId(id);
            }
          },
        });

        const progress = row.querySelector<HTMLElement>('[data-capability-progress]');

        if (progress !== null) {
          gsap.fromTo(
            progress,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: row,
                start: 'top 75%',
                end: 'bottom 45%',
                scrub: 0.35,
              },
            },
          );
        }
      });
    },
    [content.items],
  );

  const firstNumber = content.items.length > 0 ? content.items[0].number : '00';
  const activeNumber = content.items.find((item) => item.id === activeId)?.number ?? firstNumber;
  const totalNumber = String(content.items.length).padStart(2, '0');

  return (
    <Section id={content.sectionId} headingId={content.headingId}>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Badge tone="teal" dot>
              {content.intro.badge}
            </Badge>

            <Heading level={2} id={content.headingId} className="mt-5">
              {content.intro.title}
            </Heading>

            <p className="mt-5 text-lg text-muted">{content.intro.lead}</p>
            <p className="mt-4 text-muted">{content.intro.body}</p>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Button href={content.intro.ctaHref} variant="ghost">
                {content.intro.ctaLabel}
              </Button>

              {/* Decorative read-out of how far the list has been scrolled. */}
              <p aria-hidden="true" className="font-display text-sm tabular-nums text-muted">
                <span className="text-accent-link">{activeNumber}</span>
                <span className="px-1.5 text-border-strong">/</span>
                {totalNumber}
              </p>
            </div>
          </Reveal>
        </div>

        <div ref={listRef}>
          <p className="text-xs font-medium tracking-[0.2em] text-muted uppercase">
            {content.listLabel}
          </p>

          <Reveal as="ol" stagger={0.09} start="top 80%" className="mt-8">
            {content.items.map((item) => (
              <CapabilityRow key={item.id} item={item} active={activeId === item.id} />
            ))}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
