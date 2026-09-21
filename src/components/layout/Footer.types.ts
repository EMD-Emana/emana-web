/**
 * Footer module contract.
 *
 * `Footer.tsx` depends only on these interfaces; `Footer.content.ts` provides the
 * one concrete instance the site ships with, and `Footer.schema.ts` derives the
 * structured-data link map from the very same object — so navigation, copy and
 * JSON-LD can never drift apart.
 */
export interface FooterLink {
  readonly label: string;
  /** Root-relative (`/#anchor`, `/ruta`) or absolute (`https://…`). */
  readonly href: string;
  /** Absolute links only. Adds target=_blank plus rel=noopener noreferrer. */
  readonly external?: boolean;
}

export interface FooterLinkColumn {
  readonly id: string;
  readonly title: string;
  readonly links: readonly FooterLink[];
}

/**
 * Original, generic glyph names. They are NOT platform logos: the visible brand
 * of each channel is carried by the link's text label, and the shipped icons are
 * neutral placeholders to be swapped for properly licensed brand assets.
 */
export type SocialIconName = 'network' | 'feed' | 'code' | 'video';

export interface SocialLink extends FooterLink {
  readonly icon: SocialIconName;
}

export interface FooterBrandContent {
  readonly name: string;
  readonly href: string;
  readonly blurb: string;
}

export interface FooterContactContent {
  readonly id: string;
  readonly title: string;
  readonly email: string;
  readonly location: string;
  readonly hours: string;
  readonly cta: FooterLink;
}

export interface NewsletterContent {
  /** Anchor id of the newsletter landmark. Its heading id is `${id}-title`. */
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly emailLabel: string;
  readonly emailPlaceholder: string;
  readonly consentLabel: string;
  readonly submitLabel: string;
  readonly submittingLabel: string;
  /** Label of the honeypot field. Visually hidden and hidden from AT. */
  readonly honeypotLabel: string;
  readonly successMessage: string;
  readonly invalidEmailMessage: string;
  readonly consentMessage: string;
  readonly rateLimitMessage: string;
  readonly errorMessage: string;
  /** Body sent to /api/contact, whose schema requires at least 20 characters. */
  readonly submissionMessage: string;
  /** Used when the address local part is too short for that schema (min. 2). */
  readonly fallbackName: string;
}

export interface FooterLegalContent {
  readonly rights: string;
  readonly links: readonly FooterLink[];
  readonly note: string;
}

export interface FooterContent {
  readonly brand: FooterBrandContent;
  /** The two link columns between the brand blurb and the contact column. */
  readonly columns: readonly FooterLinkColumn[];
  readonly contact: FooterContactContent;
  readonly newsletter: NewsletterContent;
  readonly socialTitle: string;
  readonly social: readonly SocialLink[];
  readonly legal: FooterLegalContent;
  readonly backToTopLabel: string;
}

export interface FooterProps {
  readonly content?: FooterContent;
  readonly className?: string;
}

export interface NewsletterFormProps {
  readonly content: NewsletterContent;
  readonly className?: string;
  /** Endpoint override. Defaults to the site's own /api/contact route. */
  readonly action?: string;
}

export interface SocialIconProps {
  readonly name: SocialIconName;
  readonly className?: string;
}

export interface FooterNavLinkProps {
  readonly link: FooterLink;
  readonly className?: string;
}
