import type { Metadata } from 'next';

import { LegalDocument, cookiesContent } from '@/sections/LegalDocument';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: cookiesContent.title,
  description: cookiesContent.description,
  path: cookiesContent.path,
});

export default function CookiesPage() {
  return (
    <main id="main">
      <LegalDocument content={cookiesContent} />
    </main>
  );
}
