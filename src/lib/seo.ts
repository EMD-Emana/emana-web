import type { Metadata } from 'next';

import { env } from '@/lib/env';

/**
 * Site-wide SEO constants.
 *
 * `name` is a neutral placeholder for this case study. Replace it (and the OG
 * image in /public/og/default.png) with the real brand before shipping.
 * This module is server-only because it reads the validated env.
 */
export interface SiteImage {
  readonly url: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
}

export interface SiteConfig {
  readonly name: string;
  readonly url: string;
  readonly locale: string;
  readonly language: string;
  readonly tagline: string;
  readonly defaultImage: SiteImage;
}

export const site: SiteConfig = {
  name: 'AI Agency Studio',
  url: env.SITE_URL,
  locale: 'es_419',
  language: 'es',
  tagline: 'Estudio de producto e inteligencia artificial aplicada',
  defaultImage: {
    url: '/og/default.png',
    width: 1200,
    height: 630,
    alt: 'AI Agency Studio: estudio de producto e inteligencia artificial aplicada',
  },
};

export interface BuildMetadataInput {
  /** Page title without the site suffix. */
  readonly title: string;
  readonly description: string;
  /** Route path starting with "/". Used for the canonical URL. */
  readonly path?: string;
  readonly image?: SiteImage;
  readonly type?: 'website' | 'article';
  readonly noIndex?: boolean;
  readonly publishedTime?: string;
  readonly keywords?: readonly string[];
}

export function absoluteUrl(path = '/'): string {
  return new URL(path, `${site.url}/`).toString().replace(/\/$/, '') || site.url;
}

export function buildMetadata({
  title,
  description,
  path = '/',
  image = site.defaultImage,
  type = 'website',
  noIndex = false,
  publishedTime,
  keywords,
}: BuildMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const isHome = path === '/';
  const fullTitle = isHome ? title : `${title} | ${site.name}`;

  return {
    metadataBase: new URL(site.url),
    title: fullTitle,
    description,
    applicationName: site.name,
    keywords: keywords === undefined ? undefined : [...keywords],
    authors: [{ name: site.name }],
    creator: site.name,
    publisher: site.name,
    alternates: {
      canonical,
    },
    openGraph: {
      type,
      url: canonical,
      siteName: site.name,
      title: fullTitle,
      description,
      locale: site.locale,
      images: [{ url: image.url, width: image.width, height: image.height, alt: image.alt }],
      ...(type === 'article' && publishedTime !== undefined ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image.url],
    },
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    formatDetection: {
      telephone: false,
      address: false,
      email: false,
    },
  };
}
