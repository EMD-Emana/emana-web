import { Badge, Card, Heading, type BadgeTone } from '@/components/ui';

import type { InsightCardProps, InsightCoverVariant } from './Insights.types';
import { InsightCover } from './InsightCover';

const BADGE_TONE: Readonly<Record<InsightCoverVariant, BadgeTone>> = {
  violet: 'accent',
  teal: 'teal',
  dual: 'accent',
};

/**
 * One article teaser.
 *
 * The whole card is clickable through the title link plus an `::after` overlay,
 * so there is exactly ONE link per card: screen-reader users are not forced to
 * skip a duplicated "leer más" target, and the accessible name of the link is
 * the article title.
 */
export function InsightCard({ article, headingLevel = 3 }: InsightCardProps) {
  return (
    <Card as="article" interactive className="relative flex h-full flex-col gap-4">
      <InsightCover variant={article.cover} />

      <Badge tone={BADGE_TONE[article.cover]} className="self-start">
        {article.category}
      </Badge>

      <Heading level={headingLevel} size="xs">
        <a
          href={article.href}
          className="transition-colors duration-200 hover:text-accent-link after:absolute after:inset-0"
        >
          {article.title}
        </a>
      </Heading>

      <p className="text-sm text-muted">{article.excerpt}</p>

      <footer className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-border pt-4 text-xs text-muted">
        <time dateTime={article.publishedAt}>{article.publishedLabel}</time>
        <span aria-hidden="true" className="size-1 rounded-pill bg-border-strong" />
        <span>{article.readTimeLabel}</span>
        <span aria-hidden="true" className="size-1 rounded-pill bg-border-strong" />
        <span>{article.author.role}</span>
      </footer>
    </Card>
  );
}
