import { Badge, Heading, Reveal, Section } from '@/components/ui';

import { teamContent } from './Team.content';
import type { TeamProps } from './Team.types';
import { TeamMemberCard } from './TeamMemberCard';

/**
 * Team section.
 *
 * Presentational only: it renders whatever `content` it is given and holds no
 * strings of its own. Server component — the single interactive affordance is
 * a plain link, so nothing here needs to ship to the browser.
 *
 * SEO/a11y: starts at <h2> (the only <h1> lives in Hero), and <Section> wires
 * aria-labelledby to `${content.id}-title` automatically.
 */
export function Team({ content = teamContent }: TeamProps) {
  const headingId = `${content.id}-title`;

  return (
    <Section id={content.id}>
      <Reveal className="flex max-w-readable flex-col items-start gap-4">
        <Badge tone="accent" dot>
          {content.eyebrow}
        </Badge>
        <Heading level={2} id={headingId}>
          {content.title}
        </Heading>
        <p className="text-lg text-muted">{content.intro}</p>
      </Reveal>

      <Reveal
        as="ul"
        stagger={0.08}
        className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {content.members.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </Reveal>
    </Section>
  );
}
