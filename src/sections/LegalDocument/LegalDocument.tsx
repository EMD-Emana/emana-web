import { Card, Container, Heading } from '@/components/ui';

import type { LegalDocumentProps } from './LegalDocument.types';

/**
 * Renderer for the three legal routes.
 *
 * Server component: it is a document, so nothing here needs the browser and
 * nothing ships to it. No <Reveal> either — a legal text must be readable the
 * instant it paints, and a scroll-in on a policy buys nothing.
 *
 * Outline: the page's only <h1> is the document title; every clause is an <h2>
 * with a stable id, so a clause can be linked to directly.
 */
export function LegalDocument({ content }: LegalDocumentProps) {
  return (
    <Container width="prose" className="py-28 sm:py-32">
      <article>
        <header>
          <p className="font-display text-xs font-semibold tracking-[0.2em] text-accent-link uppercase">
            Documento legal
          </p>

          <Heading level={1} size="xl" className="mt-4">
            {content.title}
          </Heading>

          <p className="mt-5 text-lg text-muted">{content.description}</p>

          <p className="mt-4 text-sm text-muted">
            Última revisión:{' '}
            <time dateTime={content.updatedAt}>{content.updatedLabel}</time>
          </p>
        </header>

        <Card tone="elevated" className="mt-10 border-l-2 border-l-accent">
          <p className="text-sm text-text">{content.notice}</p>
        </Card>

        {content.sections.map((section) => (
          <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="mt-12 scroll-mt-24">
            <Heading level={2} id={`${section.id}-title`} size="sm">
              {section.title}
            </Heading>

            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="mt-4 text-muted">
                {paragraph}
              </p>
            ))}

            {section.bullets === undefined ? null : (
              <ul className="mt-5 flex flex-col gap-2.5">
                {section.bullets.map((bullet) => (
                  <li key={bullet.slice(0, 48)} className="flex gap-3 text-muted">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-pill bg-accent" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <section
          id="contacto-legal"
          aria-labelledby="contacto-legal-title"
          className="mt-12 scroll-mt-24 border-t border-border pt-10"
        >
          <Heading level={2} id="contacto-legal-title" size="sm">
            {content.contactTitle}
          </Heading>

          <p className="mt-4 text-muted">{content.contactBody}</p>

          <a
            href={`mailto:${content.contactEmail}`}
            className="mt-2 inline-block rounded-pill text-accent-link underline underline-offset-4 transition-colors hover:text-teal"
          >
            {content.contactEmail}
          </a>
        </section>
      </article>
    </Container>
  );
}
