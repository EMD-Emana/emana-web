import { cn } from '@/lib/cn';

import { Container } from './Container';
import type { SectionProps } from './types';

/**
 * Landmark wrapper for every page section.
 *
 * Accessibility contract: a <section> only becomes a named landmark when it is
 * labelled, so `aria-labelledby` always points at the id of the heading the
 * section renders. Sections must pass that same id to <Heading id=... />.
 */
export function Section({
  id,
  headingId,
  children,
  className,
  innerClassName,
  contained = true,
  width = 'page',
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={headingId ?? `${id}-title`}
      className={cn('relative scroll-mt-24 py-20 sm:py-24 lg:py-28', className)}
    >
      {contained ? (
        <Container width={width} className={innerClassName}>
          {children}
        </Container>
      ) : (
        children
      )}
    </section>
  );
}
