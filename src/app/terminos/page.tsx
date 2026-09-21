import type { Metadata } from 'next';

import { LegalDocument, termsContent } from '@/sections/LegalDocument';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: termsContent.title,
  description: termsContent.description,
  path: termsContent.path,
});

export default function TermsPage() {
  return (
    <main id="main">
      <LegalDocument content={termsContent} />
    </main>
  );
}
