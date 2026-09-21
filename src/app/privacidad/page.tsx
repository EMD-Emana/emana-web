import type { Metadata } from 'next';

import { LegalDocument, privacyContent } from '@/sections/LegalDocument';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: privacyContent.title,
  description: privacyContent.description,
  path: privacyContent.path,
});

export default function PrivacyPage() {
  return (
    <main id="main">
      <LegalDocument content={privacyContent} />
    </main>
  );
}
