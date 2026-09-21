import { Badge, Button, Card, Heading, Reveal, Section } from '@/components/ui';
import { JsonLd } from '@/lib/jsonld';

import { faqContent } from './Faq.content';
import { buildFaqSchema } from './Faq.schema';
import type { FaqProps } from './Faq.types';
import { FaqAccordionItem } from './FaqAccordionItem';

/**
 * FAQ section.
 *
 * Presentational only: every string arrives through `content`. The accordion is
 * a list of native <details> elements (see FaqAccordionItem), so the section
 * works — and is fully indexable — with JavaScript disabled.
 */
export function Faq({ content = faqContent, withSchema = true }: FaqProps) {
  const headingId = `${content.sectionId}-title`;

  return (
    <Section id={content.sectionId}>
      {withSchema ? <JsonLd id="faq-schema" data={buildFaqSchema(content.items)} /> : null}

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Badge tone="accent" dot>
              {content.eyebrow}
            </Badge>

            <Heading level={2} id={headingId} className="mt-5">
              {content.title}
            </Heading>

            <p className="mt-4 max-w-readable text-muted">{content.description}</p>

            <Card tone="elevated" className="mt-8">
              <Heading level={3} size="xs">
                {content.aside.title}
              </Heading>
              <p className="mt-2 text-sm text-muted">{content.aside.description}</p>
              <Button href={content.aside.action.href} variant="ghost" size="sm" className="mt-5">
                {content.aside.action.label}
              </Button>
            </Card>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7" stagger={0.08} y={18}>
          {content.items.map((item) => (
            <FaqAccordionItem key={item.id} item={item} />
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
