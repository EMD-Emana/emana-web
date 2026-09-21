import { Badge, Button, Heading, Reveal, Section } from '@/components/ui';
import { JsonLd } from '@/lib/jsonld';
import { absoluteUrl } from '@/lib/seo';

import { insightsContent } from './Insights.content';
import { buildInsightsSchema } from './Insights.schema';
import type { InsightsProps } from './Insights.types';
import { InsightCard } from './InsightCard';

/**
 * Insights section: three article teasers.
 *
 * Server component — it reads `absoluteUrl` (server-only, env-backed) to build
 * the Blog JSON-LD. The cards are a real <ul>/<li> list so the count is
 * announced, and the covers are drawn, not downloaded.
 */
export function Insights({ content = insightsContent, withSchema = true }: InsightsProps) {
  const headingId = `${content.sectionId}-title`;

  return (
    <Section id={content.sectionId}>
      {withSchema ? (
        <JsonLd id="insights-schema" data={buildInsightsSchema({ content, absolute: absoluteUrl })} />
      ) : null}

      <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-readable">
          <Badge tone="teal" dot>
            {content.eyebrow}
          </Badge>

          <Heading level={2} id={headingId} className="mt-5">
            {content.title}
          </Heading>

          <p className="mt-4 text-muted">{content.description}</p>
        </div>

        <Button
          href={content.action.href}
          variant="ghost"
          size="sm"
          className="self-start md:self-auto"
          aria-label={content.action.ariaLabel}
        >
          {content.action.label}
        </Button>
      </Reveal>

      <Reveal
        as="ul"
        stagger={0.12}
        y={28}
        className="mt-12 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {content.articles.map((article) => (
          <li key={article.id} className="h-full">
            <InsightCard article={article} />
          </li>
        ))}
      </Reveal>
    </Section>
  );
}
