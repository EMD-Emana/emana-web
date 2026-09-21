import Link from 'next/link';

import { Container, Heading, Reveal } from '@/components/ui';
import { cn } from '@/lib/cn';

import { footerContent } from './Footer.content';
import type { FooterProps } from './Footer.types';
import { FooterNavLink } from './FooterNavLink';
import { NewsletterForm } from './NewsletterForm';
import { SocialIcon } from './SocialIcon';
import { Wordmark } from './Wordmark';

/**
 * Column titles are plain <h2> elements rather than the Heading primitive: the
 * primitive's smallest visual size (text-xl) is a section title, and overriding
 * a font-size utility from the outside would be a CSS coin toss. The semantics
 * are what matter here and they are explicit — h1 lives in the hero, every
 * footer title is a level 2, no level is skipped.
 */
const COLUMN_TITLE = 'font-display text-xs font-semibold tracking-[0.16em] text-text uppercase';

const CONTACT_LINE = 'text-sm text-muted';

/** Site footer: brand, two link columns, contact, newsletter and the legal row. */
export function Footer({ content = footerContent, className }: FooterProps) {
  const year = new Date().getFullYear();
  const newsletterTitleId = `${content.newsletter.id}-title`;

  return (
    <footer className={cn('border-t border-border bg-base', className)}>
      <Container className="py-16 sm:py-20">
        <Reveal stagger={0.08} className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <Wordmark name={content.brand.name} href={content.brand.href} />
            <p className="mt-4 max-w-xs text-sm text-muted">{content.brand.blurb}</p>

            <h2 className="sr-only">{content.socialTitle}</h2>
            <ul className="mt-6 flex flex-wrap items-center gap-2">
              {content.social.map((social) => (
                <li key={`${social.icon}-${social.label}`}>
                  <a
                    href={social.href}
                    className="inline-flex size-10 items-center justify-center rounded-pill border border-border text-muted transition-colors hover:border-border-strong hover:text-text"
                    {...(social.external === true
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    <span className="sr-only">{social.label}</span>
                    <SocialIcon name={social.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {content.columns.map((column) => (
            <div key={column.id}>
              <h2 id={`footer-${column.id}`} className={COLUMN_TITLE}>
                {column.title}
              </h2>
              <ul aria-labelledby={`footer-${column.id}`} className="mt-4 flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <FooterNavLink link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 id={`footer-${content.contact.id}`} className={COLUMN_TITLE}>
              {content.contact.title}
            </h2>
            <ul
              aria-labelledby={`footer-${content.contact.id}`}
              className="mt-4 flex flex-col gap-2.5"
            >
              <li>
                <a
                  href={`mailto:${content.contact.email}`}
                  className="rounded-pill text-sm text-accent-link transition-colors hover:text-teal"
                >
                  {content.contact.email}
                </a>
              </li>
              <li className={CONTACT_LINE}>{content.contact.location}</li>
              <li className={CONTACT_LINE}>{content.contact.hours}</li>
            </ul>

            <FooterNavLink
              link={content.contact.cta}
              className="mt-5 inline-flex text-text underline underline-offset-4 hover:text-accent-link"
            />
          </div>
        </Reveal>

        <section
          id={content.newsletter.id}
          aria-labelledby={newsletterTitleId}
          className="mt-14 scroll-mt-24"
        >
          <Reveal className="rounded-card border border-border bg-surface p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-10">
              <div>
                <Heading level={2} size="xs" id={newsletterTitleId}>
                  {content.newsletter.title}
                </Heading>
                <p className="mt-2 text-sm text-muted">{content.newsletter.description}</p>
              </div>

              <NewsletterForm content={content.newsletter} />
            </div>
          </Reveal>
        </section>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            © {year} {content.brand.name}. {content.legal.rights}
          </p>

          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {content.legal.links.map((link) => (
              <li key={link.href}>
                <FooterNavLink link={link} className="text-xs" />
              </li>
            ))}
            <li>
              <Link
                href="#main"
                className="rounded-pill text-xs text-muted transition-colors hover:text-text"
              >
                {content.backToTopLabel}
              </Link>
            </li>
          </ul>
        </div>

        <p className="mt-6 text-xs text-muted">{content.legal.note}</p>
      </Container>
    </footer>
  );
}
