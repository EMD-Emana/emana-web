import type { JsonLdObject, JsonValue } from '@/lib/jsonld';

import type { InsightsContent } from './Insights.types';

export interface InsightsSchemaInput {
  readonly content: InsightsContent;
  /**
   * Turns an internal route into an absolute URL. The section passes
   * `absoluteUrl` from lib/seo; a test can pass a stub. Keeping it a parameter
   * is what makes this builder pure and free of any env dependency.
   */
  readonly absolute: (path: string) => string;
}

/**
 * Blog + BlogPosting JSON-LD for the teasers rendered by this section.
 *
 * Only fields that are actually visible on the page are emitted, which is the
 * rule that keeps structured data eligible instead of spammy.
 */
export function buildInsightsSchema({ content, absolute }: InsightsSchemaInput): JsonLdObject {
  const blogUrl = absolute(content.blog.path);
  const blogId = `${blogUrl}#blog`;
  const organizationId = `${absolute('/')}#organization`;

  const blogPost: readonly JsonValue[] = content.articles.map((article) => {
    const articleUrl = absolute(article.href);

    return {
      '@type': 'BlogPosting',
      '@id': `${articleUrl}#article`,
      headline: article.title,
      description: article.excerpt,
      url: articleUrl,
      mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
      datePublished: article.publishedAt,
      articleSection: article.category,
      timeRequired: `PT${article.readTimeMinutes}M`,
      inLanguage: content.blog.inLanguage,
      author: { '@type': 'Organization', name: article.author.name },
      publisher: { '@id': organizationId },
      isPartOf: { '@id': blogId },
    };
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': blogId,
    name: content.blog.name,
    description: content.blog.description,
    url: blogUrl,
    inLanguage: content.blog.inLanguage,
    publisher: { '@id': organizationId },
    blogPost,
  };
}
