import { Badge, Heading, Reveal, Section } from '@/components/ui';
import { JsonLd } from '@/lib/jsonld';
import { absoluteUrl, site } from '@/lib/seo';

import { processContent } from './Process.content';
import { buildProcessSchema } from './Process.schema';
import type { ProcessProps } from './Process.types';
import { ProcessLine } from './ProcessLine';
import { ProcessStepCard } from './ProcessStepCard';

/**
 * How an engagement runs, step by step.
 *
 * Server component. Two pieces of motion, both opt-in and both reverted on
 * unmount: <Reveal> staggers the steps in, and <ProcessLine> scrubs the rail's
 * scaleY against scroll position. Neither is required to read the section.
 */
export function Process({
  content = processContent,
  id = 'process',
  withSchema = true,
}: ProcessProps) {
  const headingId = `${id}-title`;

  const schema = buildProcessSchema({
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

      <div className="relative mt-12">
        <ProcessLine />

        <Reveal as="ol" stagger={0.14} start="top 80%" className="flex flex-col gap-8">
          {content.steps.map((step) => (
            <ProcessStepCard
              key={step.id}
              step={step}
              headingId={`${step.id}-title`}
              deliverableLabel={content.deliverableLabel}
              durationLabel={content.durationLabel}
            />
          ))}
        </Reveal>
      </div>

      <p className="mt-10 max-w-readable text-sm text-muted">{content.footnote}</p>
    </Section>
  );
}
