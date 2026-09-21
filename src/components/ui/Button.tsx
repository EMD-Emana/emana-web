import { cn } from '@/lib/cn';

import type { ButtonProps, ButtonSize, ButtonVariant } from './types';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-pill font-medium transition-colors duration-200 select-none disabled:pointer-events-none disabled:opacity-60';

/**
 * Contrast rule: the accent fill NEVER carries white text. `text-accent-ink`
 * (#0A0A0F on #8B6CFF) is 5.35:1. The hover fill only gets lighter, so the
 * ratio only improves.
 */
const VARIANTS: Readonly<Record<ButtonVariant, string>> = {
  primary: 'bg-accent text-accent-ink hover:bg-accent-link',
  ghost: 'border border-border-strong text-text hover:bg-elevated',
  link: 'text-accent-link underline underline-offset-4 hover:text-teal',
};

const SIZES: Readonly<Record<ButtonSize, string>> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-12 px-8 text-base',
};

/** The `link` variant is text, so it takes the type scale but no box metrics. */
const LINK_SIZES: Readonly<Record<ButtonSize, string>> = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base',
};

function buttonClasses(
  variant: ButtonVariant,
  size: ButtonSize,
  fullWidth: boolean,
  className: string | undefined,
): string {
  return cn(
    BASE,
    VARIANTS[variant],
    variant === 'link' ? LINK_SIZES[size] : SIZES[size],
    fullWidth ? 'w-full' : null,
    className,
  );
}

/**
 * Renders a real <button> or a real <a> depending on whether `href` is given.
 * A link navigates, a button acts: never fake one with the other.
 *
 * Deliberately NOT a client component: it holds no state and calls no browser
 * API, so marking it `'use client'` would ship it (and every string it renders)
 * to the browser from the many server sections that only need a link. Imported
 * from a client component it still becomes part of that client module, which is
 * how the interactive callers — the marquee's pause control, the drawer CTA —
 * keep working with an `onClick`.
 */
export function Button(props: ButtonProps) {
  if ('href' in props) {
    const {
      children,
      href,
      external = false,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      className,
      ...anchorProps
    } = props;

    return (
      <a
        href={href}
        className={buttonClasses(variant, size, fullWidth, className)}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  const {
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className,
    type = 'button',
    ...buttonProps
  } = props;

  return (
    <button type={type} className={buttonClasses(variant, size, fullWidth, className)} {...buttonProps}>
      {children}
    </button>
  );
}
