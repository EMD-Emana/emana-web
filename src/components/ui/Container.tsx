import { cn } from '@/lib/cn';

import type { ContainerProps } from './types';

const WIDTHS: Readonly<Record<NonNullable<ContainerProps['width']>, string>> = {
  page: 'max-w-page',
  prose: 'max-w-readable',
};

/** Horizontal rhythm for the whole site. One place to change the gutter. */
export function Container({ children, className, width = 'page' }: ContainerProps) {
  return <div className={cn('mx-auto w-full px-5 sm:px-8', WIDTHS[width], className)}>{children}</div>;
}
