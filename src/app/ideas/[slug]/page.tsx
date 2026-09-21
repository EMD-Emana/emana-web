import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Badge, Button, Card, Container, Heading } from '@/components/ui';
import { buildMetadata } from '@/lib/seo';
import { articleSlugs, findArticleBySlug } from '@/sections/Insights';

/**
 * One studio note.
 *
 * Why this route exists: the home page emits a BlogPosting node for each teaser,
 * and structured data that resolves to a 404 is worse than none. Every slug is
 * prerendered from the content module, and anything else 404s through
 * `notFound()` rather than rendering an empty shell.
 *
 * HONEST STATE: `Insights.content.ts` carries the teaser metadata but no body,
 * so the page publishes exactly what exists — headline, dateline and standfirst
 * — and says plainly that the full note is not written yet. Authoring the bodies
 * (or dropping the BlogPosting nodes) is a prerequisite for shipping; see the
 * README.
 */

/**
 * A dynamic route with an exhaustive param list prerenders as static HTML.
 *
 * The return type is a MUTABLE array on purpose: Next.js validates this export
 * against `any[] | Promise<any[]>` in its generated route types, and a
 * `readonly` array fails that check. The content stays immutable — `.map()`
 * produces a fresh array from the readonly slug list.
 */
export function generateStaticParams(): { slug: string }[] {
  return articleSlugs().map((slug) => ({ slug }));
}

/** Next 15 hands route params to the page as a promise. */
interface ArticlePageProps {
  readonly params: Promise<{ readonly slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticleBySlug(slug);

  if (article === undefined) {
    return buildMetadata({
      title: 'Nota no encontrada',
      description: 'La nota que buscas no existe o cambió de dirección.',
      path: `/ideas/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: article.href,
    type: 'article',
    publishedTime: article.publishedAt,
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = findArticleBySlug(slug);

  if (article === undefined) {
    notFound();
  }

  return (
    <main id="main">
      <Container width="prose" className="py-28 sm:py-32">
        <article>
          <header>
            <Badge tone="teal">{article.category}</Badge>

            <Heading level={1} size="xl" className="mt-5">
              {article.title}
            </Heading>

            <p className="mt-5 text-lg text-muted">{article.excerpt}</p>

            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-border pt-5 text-sm text-muted">
              <time dateTime={article.publishedAt}>{article.publishedLabel}</time>
              <span aria-hidden="true" className="size-1 rounded-pill bg-border-strong" />
              <span>{article.readTimeLabel}</span>
              <span aria-hidden="true" className="size-1 rounded-pill bg-border-strong" />
              <span>
                {article.author.name} · {article.author.role}
              </span>
            </p>
          </header>

          <Card tone="elevated" className="mt-10 border-l-2 border-l-accent">
            <Heading level={2} size="xs">
              Nota en preparación
            </Heading>
            <p className="mt-3 text-sm text-muted">
              Este sitio es un caso de estudio y el cuerpo de esta nota todavía no está escrito. Lo
              que lees arriba es el resumen real que acompaña al título; no hay texto adicional
              oculto ni generado automáticamente.
            </p>
            <Button href="/ideas" variant="ghost" size="sm" className="mt-6">
              Ver las demás notas
            </Button>
          </Card>
        </article>
      </Container>
    </main>
  );
}
