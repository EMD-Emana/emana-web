import type { JsonLdObject } from '@/lib/jsonld';

import { footerContent } from './Footer.content';
import type { FooterContent, FooterLink } from './Footer.types';

/**
 * The footer's link map, derived from the SAME content object the footer renders.
 *
 * This is the module's SEO surface: the integrator can feed `buildSiteNavigationSchema`
 * to <JsonLd> and `selectOrganizationSameAs` to the Organization builder in
 * src/lib/jsonld.tsx without re-typing a single URL.
 *
 * This file is dependency-free on purpose: it never imports `@/lib/seo`, so it
 * cannot drag the server-only env module into a client bundle. The caller passes
 * the site origin in.
 */
export type SiteLinkGroup = 'navigation' | 'contact' | 'legal' | 'social';

export interface SiteLinkMapEntry {
  readonly label: string;
  /** Absolute URL, resolved against the origin given to the builder. */
  readonly url: string;
  readonly group: SiteLinkGroup;
  readonly isExternal: boolean;
}

/**
 * Hosts reserved for documentation (RFC 2606 / RFC 6761). A placeholder must
 * never be published as a real profile of the organisation.
 */
const PLACEHOLDER_HOSTS: readonly string[] = ['example.com', 'example.org', 'example.net'];

function isPlaceholderHost(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/^www\./, '');

  return PLACEHOLDER_HOSTS.includes(host) || host.endsWith('.example');
}

function toAbsoluteUrl(siteUrl: string, href: string): string | null {
  try {
    return new URL(href, `${siteUrl.replace(/\/+$/, '')}/`).toString();
  } catch {
    // A malformed origin or href is dropped rather than emitted as broken data.
    return null;
  }
}

function mapLinks(
  siteUrl: string,
  links: readonly FooterLink[],
  group: SiteLinkGroup,
): readonly SiteLinkMapEntry[] {
  const entries: SiteLinkMapEntry[] = [];

  for (const link of links) {
    const url = toAbsoluteUrl(siteUrl, link.href);

    if (url === null) {
      continue;
    }

    entries.push({ label: link.label, url, group, isExternal: link.external === true });
  }

  return entries;
}

/** Every footer link, flattened and absolutised. Safe to render or to index. */
export function buildFooterLinkMap(
  siteUrl: string,
  content: FooterContent = footerContent,
): readonly SiteLinkMapEntry[] {
  const navigation = content.columns.flatMap((column) => column.links);

  return [
    ...mapLinks(siteUrl, navigation, 'navigation'),
    ...mapLinks(siteUrl, [content.contact.cta], 'contact'),
    ...mapLinks(siteUrl, content.legal.links, 'legal'),
    ...mapLinks(siteUrl, content.social, 'social'),
  ];
}

/**
 * `SiteNavigationElement` list for the footer navigation. Only in-site links are
 * included: schema.org site navigation describes THIS site, not outbound links.
 */
export function buildSiteNavigationSchema(
  siteUrl: string,
  content: FooterContent = footerContent,
): JsonLdObject {
  const entries = buildFooterLinkMap(siteUrl, content).filter(
    (entry) => !entry.isExternal && entry.group !== 'social',
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${siteUrl.replace(/\/+$/, '')}/#footer-navigation`,
    name: content.brand.name,
    itemListElement: entries.map((entry, index) => ({
      '@type': 'SiteNavigationElement',
      position: index + 1,
      name: entry.label,
      url: entry.url,
    })),
  };
}

/**
 * Profiles fit for `Organization.sameAs`: absolute, https, and never a
 * documentation placeholder. With the shipped case-study content this returns an
 * empty list — by design, because the studio owns no real profile yet.
 */
export function selectOrganizationSameAs(
  content: FooterContent = footerContent,
): readonly string[] {
  const profiles: string[] = [];

  for (const link of content.social) {
    if (link.external !== true) {
      continue;
    }

    try {
      const url = new URL(link.href);

      if (url.protocol === 'https:' && !isPlaceholderHost(url.hostname)) {
        profiles.push(url.toString());
      }
    } catch {
      continue;
    }
  }

  return profiles;
}
