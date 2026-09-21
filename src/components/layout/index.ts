/**
 * Layout shell barrel.
 *
 * Wiring in src/app/layout.tsx:
 *   import { Footer, Header } from '@/components/layout';
 *   ...
 *   <Header />
 *   {children}
 *   <Footer />
 *
 * Both components default to their own content module, so no props are required.
 * Inject a different content object to re-skin the shell (tests, another locale).
 */
export { Footer } from './Footer';
export { footerContent } from './Footer.content';
export {
  buildFooterLinkMap,
  buildSiteNavigationSchema,
  selectOrganizationSameAs,
} from './Footer.schema';
export { FooterNavLink } from './FooterNavLink';
export { Header } from './Header';
export { headerContent } from './Header.content';
export { MobileNav } from './MobileNav';
export { useDrawerA11y } from './MobileNav.a11y';
export { mobileNavContent } from './MobileNav.content';
export { MobileNavTrigger } from './MobileNavTrigger';
export { NewsletterForm } from './NewsletterForm';
export { SocialIcon } from './SocialIcon';
export { Wordmark } from './Wordmark';

export type {
  FooterBrandContent,
  FooterContactContent,
  FooterContent,
  FooterLegalContent,
  FooterLink,
  FooterLinkColumn,
  FooterNavLinkProps,
  FooterProps,
  NewsletterContent,
  NewsletterFormProps,
  SocialIconName,
  SocialIconProps,
  SocialLink,
} from './Footer.types';
export type { SiteLinkGroup, SiteLinkMapEntry } from './Footer.schema';
export type { HeaderBrandContent, HeaderContent, HeaderProps, NavLink } from './Header.types';
export type {
  DrawerA11yOptions,
  MobileNavContent,
  MobileNavProps,
  MobileNavTriggerProps,
} from './MobileNav.types';
export type { WordmarkProps } from './Wordmark.types';
