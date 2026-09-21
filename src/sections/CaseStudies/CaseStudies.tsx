import { Badge, Button, Heading, Reveal, Section } from '@/components/ui';
import { JsonLd } from '@/lib/jsonld';
import { absoluteUrl, site } from '@/lib/seo';

import { caseStudiesContent } from './CaseStudies.content';
import { buildCaseStudiesSchema } from './CaseStudies.schema';
import type { CaseStudiesProps } from './CaseStudies.types';
import { CaseStudyCard } from './CaseStudyCard';

/**
 * Selected work. Server component: it renders markup and its own JSON-LD, and
 * delegates every animation to <Reveal>, the shared scroll-in primitive.
 *
 * Motion: the cards animate with a stagger applied to the <li> children at
 * runtime. Nothing is hidden in CSS, so with JavaScript disabled the whole list
 * is visible and readable.
 */
export function CaseStudies({
  content = caseStudiesContent,
  id = 'case-studies',
  withSchema = true,
}: CaseStudiesProps) {
  const headingId = `${id}-title`;

  const schema = buildCaseStudiesSchema({
    content,
    baseUrl: absoluteUrl('/'),
    sectionId: id,
    inLanguage: site.language,
  });

  return (
    <Section id={id} headingId={headingId}>
      {withSchema ? <JsonLd id={`${id}-jsonld`} data={schema} /> : null}

      <Reveal className="max-w-readable">
        <Badge tone="accent" dot>
          {content.eyebrow}
        </Badge>
        <Heading level={2} id={headingId} className="mt-5">
          {content.title}
        </Heading>
        <p className="mt-4 text-lg text-muted">{content.description}</p>
      </Reveal>

      <Reveal as="ul" stagger={0.12} start="top 80%" className="mt-12 grid gap-6 md:grid-cols-3">
        {content.items.map((study) => (
          <CaseStudyCard
            key={study.id}
            study={study}
            headingId={`${study.id}-title`}
            clientLabel={content.clientLabel}
            tagsLabel={content.tagsLabel}
          />
        ))}
      </Reveal>

      <Reveal className="mt-10 flex flex-col items-start gap-5 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-readable text-sm text-muted">{content.footnote}</p>
        <Button variant="ghost" href={content.cta.href} aria-label={content.cta.ariaLabel}>
          {content.cta.label}
        </Button>
      </Reveal>
    </Section>
  );
}
