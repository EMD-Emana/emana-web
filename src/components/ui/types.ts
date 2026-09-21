import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
} from 'react';

/* --- Container ----------------------------------------------------------- */

export type ContainerWidth = 'page' | 'prose';

export interface ContainerProps {
  readonly children: ReactNode;
  readonly className?: string;
  /** `page` = full content column, `prose` = narrow long-form column. */
  readonly width?: ContainerWidth;
}

/* --- Section ------------------------------------------------------------- */

export interface SectionProps {
  /** Anchor target. Also the prefix of the default heading id: `${id}-title`. */
  readonly id: string;
  /** Id of the heading that names this landmark. Defaults to `${id}-title`. */
  readonly headingId?: string;
  readonly children: ReactNode;
  readonly className?: string;
  readonly innerClassName?: string;
  /** Set to false when the section paints edge-to-edge and centres its own content. */
  readonly contained?: boolean;
  readonly width?: ContainerWidth;
}

/* --- Heading ------------------------------------------------------------- */

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/** Visual size, decoupled from the semantic level so outlines stay correct. */
export type HeadingSize = 'display' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export interface HeadingProps {
  /** Semantic level. Exactly one level-1 heading may exist per page. */
  readonly level: HeadingLevel;
  readonly children: ReactNode;
  readonly id?: string;
  readonly size?: HeadingSize;
  readonly className?: string;
  readonly balance?: boolean;
}

/* --- Button -------------------------------------------------------------- */

export type ButtonVariant = 'primary' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonSharedProps {
  readonly children: ReactNode;
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly className?: string;
  readonly fullWidth?: boolean;
}

type ButtonAsButton = ButtonSharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'>;

type ButtonAsAnchor = ButtonSharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className' | 'href'> & {
    readonly href: string;
    /** Adds target=_blank plus rel=noopener noreferrer (tabnabbing protection). */
    readonly external?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

/* --- Card ---------------------------------------------------------------- */

export type CardTone = 'surface' | 'elevated' | 'outline';

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'className'> {
  readonly children: ReactNode;
  readonly className?: string;
  readonly tone?: CardTone;
  /** Adds a hover lift. Only use on cards that are actually interactive. */
  readonly interactive?: boolean;
  readonly as?: 'div' | 'article' | 'li' | 'figure';
}

/* --- Badge --------------------------------------------------------------- */

export type BadgeTone = 'neutral' | 'accent' | 'teal';

export interface BadgeProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly tone?: BadgeTone;
  /** Optional decorative dot rendered before the label. */
  readonly dot?: boolean;
}

/* --- Reveal -------------------------------------------------------------- */

export type RevealTag = 'div' | 'section' | 'article' | 'ul' | 'ol' | 'li' | 'span' | 'header';

export interface RevealProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly as?: RevealTag;
  /** Pixels travelled on the Y axis. Transform only — never top/height. */
  readonly y?: number;
  readonly delay?: number;
  readonly duration?: number;
  /** When set, the direct children animate in sequence instead of the wrapper. */
  readonly stagger?: number;
  /** ScrollTrigger start string, e.g. "top 85%". */
  readonly start?: string;
  /** Play once (default) or replay when scrolling back up. */
  readonly once?: boolean;
}
