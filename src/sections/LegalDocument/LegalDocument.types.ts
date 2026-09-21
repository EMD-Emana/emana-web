/**
 * LegalDocument — content contract.
 *
 * One renderer serves the three legal routes. Each route owns a content object
 * of this shape and nothing else, so adding a fourth document is a new entry in
 * `LegalDocument.content.ts` plus a four-line route file.
 */

export interface LegalSection {
  readonly id: string;
  readonly title: string;
  /** One entry per paragraph. Keeps the renderer free of markdown parsing. */
  readonly paragraphs: readonly string[];
  /** Optional bullet list rendered after the paragraphs. */
  readonly bullets?: readonly string[];
}

export interface LegalDocumentContent {
  /** Route path, used for the canonical URL and the breadcrumb. */
  readonly path: string;
  readonly title: string;
  /** Meta description. Also the standfirst under the h1. */
  readonly description: string;
  /** ISO 8601 date of the last revision. */
  readonly updatedAt: string;
  /** Human label for the same date, already written in Spanish. */
  readonly updatedLabel: string;
  /**
   * Shown in a prominent callout above the body. These documents are structural
   * placeholders for a case study, and the page has to say so where a reader
   * cannot miss it.
   */
  readonly notice: string;
  readonly sections: readonly LegalSection[];
  readonly contactTitle: string;
  readonly contactBody: string;
  readonly contactEmail: string;
}

export interface LegalDocumentProps {
  readonly content: LegalDocumentContent;
}
