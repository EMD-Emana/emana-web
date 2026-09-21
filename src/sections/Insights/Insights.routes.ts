import { insightsContent } from './Insights.content';
import type { InsightArticle, InsightsContent } from './Insights.types';

/**
 * Route helpers derived from the SAME content object the section renders.
 *
 * The article hrefs in `Insights.content.ts` are the single source of truth for
 * the `/ideas/<slug>` routes, so the slug is read back out of the href instead
 * of being stored twice and drifting. A route that stops matching a card is a
 * dead link the Blog JSON-LD would still be advertising.
 */

/** Trailing path segment of an internal article href, or null if it has none. */
export function articleSlug(article: InsightArticle): string | null {
  const segments = article.href.split('/').filter((segment) => segment !== '');

  if (segments.length < 2 || segments[0] !== 'ideas') {
    return null;
  }

  return segments[segments.length - 1] ?? null;
}

/** Every slug the dynamic route must prerender. */
export function articleSlugs(content: InsightsContent = insightsContent): readonly string[] {
  const slugs: string[] = [];

  for (const article of content.articles) {
    const slug = articleSlug(article);

    if (slug !== null) {
      slugs.push(slug);
    }
  }

  return slugs;
}

/** The article a slug belongs to, or undefined when nothing matches. */
export function findArticleBySlug(
  slug: string,
  content: InsightsContent = insightsContent,
): InsightArticle | undefined {
  return content.articles.find((article) => articleSlug(article) === slug);
}
