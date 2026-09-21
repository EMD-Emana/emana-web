import { Card, Heading } from '@/components/ui';

import { MonogramAvatar } from './MonogramAvatar';
import type { TeamLinkKind, TeamMemberCardProps, TeamSocialLink } from './Team.types';

/**
 * Original glyphs drawn from primitives (no icon library, no brand marks).
 * Every glyph is decorative: the surrounding <a> carries the accessible name.
 */
const GLYPH_PATHS: Readonly<Record<TeamLinkKind, readonly string[]>> = {
  profile: ['M12 11.4a3.3 3.3 0 1 0 0-6.6 3.3 3.3 0 0 0 0 6.6Z', 'M5.4 19.4a6.6 6.6 0 0 1 13.2 0'],
  portfolio: ['M4 8.5h16v11H4z', 'M9 8.5V6.2a1.2 1.2 0 0 1 1.2-1.2h3.6A1.2 1.2 0 0 1 15 6.2v2.3', 'M4 13h16'],
  writing: ['m4.5 19.5.9-3.6L15.7 5.6l2.7 2.7L8.1 18.6l-3.6.9Z', 'm13.8 7.5 2.7 2.7'],
  email: ['M3.5 6h17v12h-17z', 'm3.5 7 8.5 5.8L20.5 7'],
};

function LinkGlyph({ kind }: { readonly kind: TeamLinkKind }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {GLYPH_PATHS[kind].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

function MemberLink({ link }: { readonly link: TeamSocialLink }) {
  return (
    <a
      href={link.href}
      aria-label={link.label}
      title={link.label}
      className="inline-flex size-9 items-center justify-center rounded-pill border border-border-strong text-muted transition-colors duration-200 hover:bg-elevated hover:text-text"
      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <LinkGlyph kind={link.kind} />
    </a>
  );
}

/** One member. Presentational: every string arrives through `member`. */
export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <Card as="li" tone="surface" interactive className="flex h-full flex-col gap-5">
      <MonogramAvatar initials={member.initials} variant={member.avatarVariant} seed={member.id} />

      <div className="flex flex-col gap-1">
        <Heading level={3} size="xs">
          {member.name}
        </Heading>
        <p className="text-sm text-accent-link">{member.role}</p>
      </div>

      <p className="text-sm text-muted">{member.focus}</p>

      <ul className="mt-auto flex items-center gap-2 pt-1">
        {member.links.map((link) => (
          <li key={link.href}>
            <MemberLink link={link} />
          </li>
        ))}
      </ul>
    </Card>
  );
}
