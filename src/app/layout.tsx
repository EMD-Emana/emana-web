import type { ReactNode } from 'react';

import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';

import '@/styles/globals.css';

import { Footer, Header, buildSiteNavigationSchema, selectOrganizationSameAs } from '@/components/layout';
import { JsonLd, buildJsonLdGraph, buildOrganizationSchema, buildWebSiteSchema } from '@/lib/jsonld';
import { buildMetadata, site } from '@/lib/seo';

/**
 * Both families are SIL Open Font License, and next/font/google downloads and
 * self-hosts them at build time. Nothing is requested from a Google domain at
 * runtime, which is why the CSP can keep `font-src 'self'` (OWASP A08).
 */
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600', '700'],
  variable: '--font-space-grotesk',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = buildMetadata({
  title: 'AI Agency Studio | Inteligencia artificial aplicada a producto',
  description:
    'Diseñamos, construimos y operamos sistemas de inteligencia artificial que se integran con tus procesos y se miden en resultados de negocio.',
  path: '/',
});

export const viewport: Viewport = {
  themeColor: '#0A0A0F',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

/**
 * Site-wide structured data, emitted once for every route.
 *
 * `sameAs` is fed from the footer's own social list rather than retyped, and
 * `selectOrganizationSameAs` drops the reserved `example.*` documentation hosts
 * — so with the shipped case-study content it is an empty list and no invented
 * profile is ever published. Section-level nodes live in the route that renders
 * them (see src/app/page.tsx).
 */
const shellSchema = buildJsonLdGraph([
  buildOrganizationSchema({
    name: site.name,
    url: site.url,
    logoUrl: `${site.url}/logo.svg`,
    description: site.tagline,
    areaServed: ['LatAm', 'ES', 'US'],
    sameAs: selectOrganizationSameAs(),
  }),
  buildWebSiteSchema({
    name: site.name,
    url: site.url,
    description: site.tagline,
    inLanguage: site.language,
  }),
  buildSiteNavigationSchema(site.url),
]);

export default function RootLayout({ children }: { readonly children: ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased">
        <a className="skip-link" href="#main">
          Saltar al contenido principal
        </a>

        {/*
          The shell lives in the layout, not in page.tsx, so every route gets it:
          the 404 page needs the same header and footer, and keeping it here means
          the header is not re-mounted on navigation.
        */}
        <Header />
        {children}
        <Footer />

        <JsonLd id="schema-shell" data={shellSchema} />
      </body>
    </html>
  );
}
