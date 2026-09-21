import { Badge, Button, Heading, Reveal, Section } from '@/components/ui';
import { JsonLd } from '@/lib/jsonld';
import { site } from '@/lib/seo';

import { ServiceCard } from './ServiceCard';
import { servicesContent } from './Services.content';
import { buildServicesSchemaFromContent } from './Services.schema';
import type { ServicesProps } from './Services.types';

/**
 * Services — the core offering grid.
 *
 * Server component on purpose: it emits JSON-LD and reads the validated site
 * origin, and the only interactive behaviour it needs (hover, focus) is CSS.
 * The scroll-in comes from the shared <Reveal> primitive, so this file contains
 * no GSAP of its own.
 *
 * Accessibility / SEO contract
 *  - <Section> renders `aria-labelledby` pointing at the <h2> id below.
 *  - Starts at level 2 (the page's only <h1> lives in Hero); cards use <h3>.
 *  - The grid is a real <ul>, so assistive tech announces "list, 6 items".
 */
export function Services({ content = servicesContent, withSchema = true }: ServicesProps) {
  const schema = buildServicesSchemaFromContent(content, {
    siteUrl: site.url,
    providerName: site.name,
  });

  return (
    <Section id={content.sectionId} headingId={content.headingId}>
      {withSchema ? <JsonLd id={`${content.sectionId}-jsonld`} data={schema} /> : null}

      <Reveal className="max-w-readable">
        <Badge tone="accent" dot>
          {content.badge}
        </Badge>

        <Heading level={2} id={content.headingId} className="mt-5">
          {content.title}
        </Heading>

        <p className="mt-5 text-lg text-muted">{content.description}</p>
      </Reveal>

      <Reveal
        as="ul"
        stagger={0.08}
        start="top 80%"
        className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3"
      >
        {content.items.map((item) => (
          <ServiceCard key={item.id} item={item} deliverablesLabel={content.deliverablesLabel} />
        ))}
      </Reveal>

      <Reveal className="mt-10 flex flex-col gap-5 rounded-card border border-border bg-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-7">
        <p className="max-w-readable text-sm text-muted">{content.footnote.text}</p>
        <Button href={content.footnote.ctaHref} size="md" className="shrink-0 self-start sm:self-auto">
          {content.footnote.ctaLabel}
        </Button>
      </Reveal>
    </Section>
  );
}
