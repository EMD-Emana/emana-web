import type { Metadata } from 'next';

import { Container, Heading } from '@/components/ui';
import { buildMetadata } from '@/lib/seo';
import { InsightCard, insightsContent } from '@/sections/Insights';

/**
 * Index of the studio notes.
 *
 * This route exists because the Blog JSON-LD emitted on the home page names it
 * as the blog's URL: structured data must not point at a 404. It renders the
 * same teaser cards as the home section, from the same content object.
 *
 * The Blog node itself is NOT re-emitted here — it already lives in the home
 * page's graph, and the same `@id` twice on two URLs is a conflicting claim.
 */
export const metadata: Metadata = buildMetadata({
  title: insightsContent.blog.name,
  description: insightsContent.blog.description,
  path: insightsContent.blog.path,
});

export default function IdeasPage() {
  return (
    <main id="main">
      <Container className="py-28 sm:py-32">
        <header className="max-w-readable">
          <p className="font-display text-xs font-semibold tracking-[0.2em] text-teal uppercase">
            {insightsContent.eyebrow}
          </p>

          <Heading level={1} size="xl" className="mt-4">
            {insightsContent.blog.name}
          </Heading>

          <p className="mt-5 text-lg text-muted">{insightsContent.blog.description}</p>
        </header>

        <ul className="mt-14 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {insightsContent.articles.map((article) => (
            <li key={article.id} className="h-full">
              <InsightCard article={article} headingLevel={2} />
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}
