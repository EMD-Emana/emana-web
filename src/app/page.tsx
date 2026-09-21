import { JsonLd, buildJsonLdGraph } from '@/lib/jsonld';
import { absoluteUrl, site } from '@/lib/seo';

import { Capabilities, capabilitiesContent } from '@/sections/Capabilities';
import { CaseStudies, buildCaseStudiesSchema, caseStudiesContent } from '@/sections/CaseStudies';
import { Cta } from '@/sections/Cta';
import { Faq, buildFaqSchema, faqContent } from '@/sections/Faq';
import { Hero, buildHeroServiceSchema, heroContent, heroSchemaContent } from '@/sections/Hero';
import { Insights, buildInsightsSchema, insightsContent } from '@/sections/Insights';
import { LogoMarquee, logoMarqueeContent } from '@/sections/LogoMarquee';
import { Pricing, buildPricingOfferSchema, pricingContent } from '@/sections/Pricing';
import { Process, buildProcessSchema, processContent } from '@/sections/Process';
import { Services, buildServicesSchemaFromContent, servicesContent } from '@/sections/Services';
import { Stats } from '@/sections/Stats';
import { Team } from '@/sections/Team';
import {
  Testimonials,
  buildTestimonialsRatingSchema,
  testimonialsContent,
} from '@/sections/Testimonials';

/**
 * Home page — the composition root.
 *
 * This file does three things and nothing else: it orders the sections, it
 * assigns the anchor ids the navigation points at, and it emits the structured
 * data. It holds no copy: every string lives in the matching
 * `<Section>.content.ts`, which is the one file a non-developer edits.
 *
 * SERVER COMPONENT. It reads `@/lib/seo` (server-only env) to build absolute
 * JSON-LD ids, so it must never gain a `'use client'` directive. The sections
 * that need the browser — Hero, LogoMarquee, Capabilities and the small
 * interactive leaves inside the other sections — declare that boundary
 * themselves, as deep in the tree as possible.
 *
 * ANCHOR CONTRACT. The ids below are the ones Header, MobileNav and Footer link
 * to. Renaming one here without renaming it there produces a dead link, so the
 * three sections whose default id differs from the navigation are pinned
 * explicitly via the `id` prop rather than by editing their content module.
 */

/** Anchor ids for the sections that accept one as a prop. */
const ANCHORS = {
  caseStudies: 'casos',
  process: 'proceso',
  stats: 'resultados',
} as const;

/**
 * Every schema.org node the home page stands behind, merged into ONE `@graph`.
 *
 * Why a graph instead of the per-section script tags the modules can emit on
 * their own: the nodes reference each other by `@id` (each Service points at
 * the Organization from layout.tsx, each BlogPosting at its Blog). In one graph
 * those references resolve as a single document. Each section is therefore
 * rendered with `withSchema={false}` so nothing is emitted twice.
 *
 * Stats, Team, Capabilities and LogoMarquee contribute no node on purpose. The
 * only schema.org types that would fit them are trust claims — AggregateRating,
 * Offer, client relationships — and the figures and brands in this case study
 * are illustrative. Asserting them as structured data would be false markup.
 */
function buildHomeSchema() {
  const baseUrl = absoluteUrl('/');

  return buildJsonLdGraph([
    buildHeroServiceSchema({
      siteUrl: site.url,
      content: heroContent,
      schema: heroSchemaContent,
    }),
    ...buildServicesSchemaFromContent(servicesContent, {
      siteUrl: site.url,
      providerName: site.name,
    }),
    buildCaseStudiesSchema({
      content: caseStudiesContent,
      baseUrl,
      sectionId: ANCHORS.caseStudies,
      inLanguage: site.language,
    }),
    buildProcessSchema({
      content: processContent,
      baseUrl,
      sectionId: ANCHORS.process,
      inLanguage: site.language,
    }),
    buildTestimonialsRatingSchema({ content: testimonialsContent, siteUrl: baseUrl }),
    buildPricingOfferSchema({ content: pricingContent, siteUrl: baseUrl }),
    buildFaqSchema(faqContent.items),
    buildInsightsSchema({ content: insightsContent, absolute: absoluteUrl }),
  ]);
}

export default function HomePage() {
  return (
    <>
      <JsonLd id="schema-home" data={buildHomeSchema()} />

      <main id="main">
        <Hero content={heroContent} />
        <LogoMarquee content={logoMarqueeContent} />
        <Services content={servicesContent} withSchema={false} />
        <Capabilities content={capabilitiesContent} />
        <CaseStudies
          content={caseStudiesContent}
          id={ANCHORS.caseStudies}
          withSchema={false}
        />
        <Process content={processContent} id={ANCHORS.process} withSchema={false} />
        <Stats id={ANCHORS.stats} />
        <Team />
        <Testimonials content={testimonialsContent} withSchema={false} />
        <Pricing content={pricingContent} withSchema={false} />
        <Faq content={faqContent} withSchema={false} />
        <Insights content={insightsContent} withSchema={false} />
        <Cta />
      </main>
    </>
  );
}
