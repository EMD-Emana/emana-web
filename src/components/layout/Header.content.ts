import type { HeaderContent } from './Header.types';

/**
 * Every string rendered by the header lives here. A non-developer can edit this
 * file without opening a single line of JSX.
 *
 * ANCHOR CONTRACT — these hrefs point at the ids the page sections must expose:
 *   #servicios · #proceso · #casos · #precios · #faq · #contacto
 * If a section agent chooses a different id, change it here, not in the JSX.
 */
export const headerContent: HeaderContent = {
  brand: {
    name: 'AI Agency Studio',
    href: '/',
  },
  navLabel: 'Navegación principal',
  links: [
    { label: 'Servicios', href: '/#servicios' },
    { label: 'Proceso', href: '/#proceso' },
    { label: 'Casos', href: '/#casos' },
    { label: 'Precios', href: '/#precios' },
    { label: 'Preguntas', href: '/#faq' },
  ],
  cta: {
    label: 'Agendar diagnóstico',
    href: '/#contacto',
  },
};
