/**
 * Team module contract.
 *
 * The components in this folder depend on these interfaces, never on the
 * concrete data in Team.content.ts (dependency inversion). Swapping the content
 * object — or feeding one from a CMS later — requires no component change.
 */

/** Named avatar treatment. Content picks a name, never a raw colour value. */
export type TeamAvatarVariant = 'violet' | 'teal' | 'duo' | 'aurora';

/** Kind of destination a member link points at. Drives which glyph is drawn. */
export type TeamLinkKind = 'profile' | 'portfolio' | 'writing' | 'email';

export interface TeamSocialLink {
  readonly kind: TeamLinkKind;
  /**
   * Full accessible name for the link, e.g. "Perfil profesional de Ana Peña".
   * The glyph is decorative, so this label is the only name assistive tech gets.
   */
  readonly label: string;
  readonly href: string;
  /** true adds target=_blank plus rel="noopener noreferrer" (tabnabbing). */
  readonly external: boolean;
}

export interface TeamMember {
  /** Stable, unique: also seeds the SVG gradient id of the avatar. */
  readonly id: string;
  readonly name: string;
  readonly role: string;
  /** One or two letters rendered inside the generated monogram. */
  readonly initials: string;
  /** Single sentence describing what this person owns. */
  readonly focus: string;
  readonly avatarVariant: TeamAvatarVariant;
  readonly links: readonly TeamSocialLink[];
}

export interface TeamContent {
  /** Anchor id of the <section>. The heading id is `${id}-title`. */
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  readonly members: readonly TeamMember[];
}

export interface TeamProps {
  /** Defaults to teamContent; pass another object to reuse the layout. */
  readonly content?: TeamContent;
}

export interface MonogramAvatarProps {
  readonly initials: string;
  readonly variant: TeamAvatarVariant;
  /** Unique within the document: used to scope the SVG gradient id. */
  readonly seed: string;
  readonly className?: string;
}

export interface TeamMemberCardProps {
  readonly member: TeamMember;
}
