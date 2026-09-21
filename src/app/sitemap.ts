import type { MetadataRoute } from 'next';

import { absoluteUrl } from '@/lib/seo';
import { insightsContent } from '@/sections/Insights';
import { cookiesContent, privacyContent, termsContent } from '@/sections/LegalDocument';

interface SitemapRoute {
  readonly path: string;
  readonly changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  readonly priority: number;
}

/**
 * Only real routes belong here. In-page anchors (#servicios, #faq, ...) are not
 * separate URLs and must never be listed.
 *
 * The article and legal paths are read from the same content modules the pages
 * render, so a route can never be listed here and be missing from the site, or
 * the other way round.
 */
const ARTICLE_ROUTES: readonly SitemapRoute[] = insightsContent.articles.map((article) => ({
  path: article.href,
  changeFrequency: 'yearly',
  priority: 0.5,
}));

const ROUTES: readonly SitemapRoute[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: insightsContent.blog.path, changeFrequency: 'monthly', priority: 0.7 },
  ...ARTICLE_ROUTES,
  { path: privacyContent.path, changeFrequency: 'yearly', priority: 0.3 },
  { path: termsContent.path, changeFrequency: 'yearly', priority: 0.3 },
  { path: cookiesContent.path, changeFrequency: 'yearly', priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
