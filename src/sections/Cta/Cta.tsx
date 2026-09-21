import { Badge, Card, Container, Heading, Reveal, Section } from '@/components/ui';

import { ContactForm } from './ContactForm';
import { ctaContent } from './Cta.content';
import type { CtaProps } from './Cta.types';
import { CtaBackdrop } from './CtaBackdrop';

const FORM_TITLE_ID = 'contact-form-title';

/**
 * Closing panel.
 *
 * The section paints edge to edge (`contained={false}`) and centres its own
 * Container, which is why the backdrop can bleed past the content column while
 * the copy stays on the site grid.
 */
export function Cta({ content = ctaContent }: CtaProps) {
  const headingId = `${content.sectionId}-title`;

  // `py-0!` neutralises the default Section rhythm: this band is flush against
  // its neighbours and the panel below owns its own vertical padding.
  return (
    <Section id={content.sectionId} contained={false} className="py-0!">
      <div className="relative isolate overflow-hidden border-y border-border bg-surface">
        <CtaBackdrop />

        <Container className="relative py-20 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <Badge tone="accent" dot>
                {content.eyebrow}
              </Badge>

              <Heading level={2} id={headingId} size="xl" className="mt-5">
                {content.title}
              </Heading>

              <p className="mt-5 max-w-readable text-lg text-muted">{content.description}</p>

              <ul className="mt-10 grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
                {content.highlights.map((highlight) => (
                  <li key={highlight.id} className="border-l-2 border-accent pl-4">
                    <p className="font-display font-medium text-text">{highlight.title}</p>
                    <p className="mt-1 text-sm text-muted">{highlight.description}</p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal y={32} delay={0.1}>
              <Card tone="elevated">
                <Heading level={3} id={FORM_TITLE_ID} size="xs">
                  {content.form.title}
                </Heading>
                <p className="mt-2 text-sm text-muted">{content.form.description}</p>

                <ContactForm content={content.form} labelledById={FORM_TITLE_ID} />
              </Card>
            </Reveal>
          </div>
        </Container>
      </div>
    </Section>
  );
}
