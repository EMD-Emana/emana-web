/**
 * Cta — content contract.
 *
 * The form is described as DATA (fields, labels, hints, messages) instead of
 * being hard-coded in JSX: that is what lets a non-developer reorder a field or
 * rewrite an error message without opening a component.
 */

/** Field names accepted by POST /api/contact. Keep in sync with the route. */
export type ContactFieldName = 'name' | 'email' | 'company' | 'message' | 'budget';

/** Every key that can carry an inline error, including the consent checkbox. */
export type ContactErrorKey = ContactFieldName | 'consent';

export type ContactFieldKind = 'text' | 'email' | 'textarea' | 'select';

export type ContactFieldSpan = 'full' | 'half';

export interface ContactSelectOption {
  /** Empty string renders the non-selectable placeholder option. */
  readonly value: string;
  readonly label: string;
}

export interface ContactFieldContent {
  readonly name: ContactFieldName;
  readonly kind: ContactFieldKind;
  readonly label: string;
  readonly placeholder?: string;
  /** Short help text, wired to the control through aria-describedby. */
  readonly hint?: string;
  readonly required: boolean;
  /** Standard autocomplete token. Improves usability, never pre-fills secrets. */
  readonly autoComplete?: string;
  readonly rows?: number;
  /** Only for `kind: 'select'`. */
  readonly options?: readonly ContactSelectOption[];
  readonly span?: ContactFieldSpan;
}

/** Messages injected into the Zod schema, so validation copy stays editable. */
export interface ContactValidationMessages {
  readonly nameMin: string;
  readonly nameMax: string;
  readonly emailInvalid: string;
  readonly companyMax: string;
  readonly messageMin: string;
  readonly messageMax: string;
  readonly budgetInvalid: string;
  readonly consentRequired: string;
}

/** Copy for the role="status" region. Server responses are mapped onto these. */
export interface ContactStatusMessages {
  readonly success: string;
  readonly invalid: string;
  readonly rateLimited: string;
  readonly network: string;
  readonly server: string;
}

export interface ContactHoneypot {
  /** Must match the field the API route treats as the honeypot. */
  readonly name: 'website';
  readonly label: string;
}

export interface ContactFormContent {
  /** Same-origin API route. Never a user-supplied or external URL (A08/A10). */
  readonly endpoint: string;
  readonly title: string;
  readonly description: string;
  readonly fields: readonly ContactFieldContent[];
  readonly optionalLabel: string;
  readonly consentLabel: string;
  readonly submitLabel: string;
  readonly pendingLabel: string;
  readonly privacyNote: string;
  readonly honeypot: ContactHoneypot;
  readonly messages: ContactStatusMessages;
  readonly validation: ContactValidationMessages;
}

export interface CtaHighlight {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

export interface CtaContent {
  readonly sectionId: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly highlights: readonly CtaHighlight[];
  readonly form: ContactFormContent;
}

export interface CtaProps {
  /** Defaults to `ctaContent`. */
  readonly content?: CtaContent;
}

export interface ContactFormProps {
  readonly content: ContactFormContent;
  /** Id of the heading that names the form, for aria-labelledby. */
  readonly labelledById?: string;
}

export interface ContactFieldProps {
  readonly field: ContactFieldContent;
  readonly error?: string;
  /** Suffix appended to the label of every optional field. */
  readonly optionalLabel: string;
  readonly disabled: boolean;
}
