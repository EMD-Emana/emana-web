import type { FooterContent } from './Footer.types';

/**
 * Every string and datum the footer renders. Edit here, never in the JSX.
 *
 * ANCHOR CONTRACT — in-page hrefs assume these section ids, and every one of
 * them is rendered by src/app/page.tsx:
 *   #sectores #servicios #capacidades #casos #proceso #resultados
 *   #equipo #testimonios #precios #faq #insights #contacto
 *
 * Adding a link here means adding the matching section, not the other way
 * round: a footer entry pointing at an id nobody renders is a dead link.
 *
 * TODO(brand): the social hrefs point at the reserved documentation domain
 * `example.com` on purpose — this is a case study and must not claim profiles it
 * does not own. Footer.schema.ts filters those hosts out of `sameAs` so no
 * fabricated profile ever reaches structured data.
 */
export const footerContent: FooterContent = {
  brand: {
    name: 'AI Agency Studio',
    href: '/',
    blurb:
      'Diseñamos, construimos y operamos sistemas de inteligencia artificial dentro de procesos reales de negocio. Menos pilotos eternos y más software en producción, con métricas que el equipo puede defender.',
  },
  columns: [
    {
      id: 'servicios',
      title: 'Servicios',
      links: [
        { label: 'Qué hacemos', href: '/#servicios' },
        { label: 'Cómo trabajamos', href: '/#proceso' },
        { label: 'Capacidades técnicas', href: '/#capacidades' },
        { label: 'Sectores que atendemos', href: '/#sectores' },
      ],
    },
    {
      id: 'estudio',
      title: 'Estudio',
      links: [
        { label: 'Casos de trabajo', href: '/#casos' },
        { label: 'Resultados', href: '/#resultados' },
        { label: 'Lo que dicen los equipos', href: '/#testimonios' },
        { label: 'Equipo', href: '/#equipo' },
        { label: 'Modelos de colaboración', href: '/#precios' },
        { label: 'Notas y artículos', href: '/#insights' },
        { label: 'Preguntas frecuentes', href: '/#faq' },
      ],
    },
  ],
  contact: {
    id: 'contacto',
    title: 'Contacto',
    email: 'hola@aiagencystudio.example',
    location: 'Lima, Perú. Equipo distribuido en América Latina.',
    hours: 'Lunes a viernes, de 9:00 a 18:00 (GMT-5).',
    cta: { label: 'Agendar un diagnóstico', href: '/#contacto' },
  },
  newsletter: {
    id: 'boletin',
    title: 'Carta mensual del estudio',
    description:
      'Una vez al mes: qué construimos, qué falló y qué aprendimos al llevar inteligencia artificial a producción. Sin relleno y sin promesas de resultados.',
    emailLabel: 'Correo electrónico',
    emailPlaceholder: 'nombre@empresa.com',
    consentLabel: 'Acepto recibir la carta mensual y el tratamiento de mis datos con ese fin.',
    submitLabel: 'Suscribirme',
    submittingLabel: 'Enviando…',
    honeypotLabel: 'No completes este campo',
    successMessage: 'Listo. Revisa tu correo para confirmar la suscripción.',
    invalidEmailMessage: 'Revisa la dirección de correo: parece que falta algo.',
    consentMessage: 'Necesitamos tu consentimiento para poder escribirte.',
    rateLimitMessage: 'Demasiados intentos seguidos. Espera un minuto y vuelve a intentarlo.',
    errorMessage: 'No pudimos registrar la suscripción. Inténtalo de nuevo en unos minutos.',
    submissionMessage:
      'Solicitud de suscripción a la carta mensual enviada desde el pie de página del sitio.',
    fallbackName: 'Suscriptor',
  },
  socialTitle: 'Canales del estudio',
  social: [
    { label: 'LinkedIn', icon: 'network', href: 'https://example.com/', external: true },
    { label: 'GitHub', icon: 'code', href: 'https://example.com/', external: true },
    { label: 'YouTube', icon: 'video', href: 'https://example.com/', external: true },
    { label: 'Notas del estudio', icon: 'feed', href: '/#insights' },
  ],
  legal: {
    rights: 'Todos los derechos reservados.',
    links: [
      { label: 'Privacidad', href: '/privacidad' },
      { label: 'Términos', href: '/terminos' },
      { label: 'Cookies', href: '/cookies' },
    ],
    note: 'Proyecto de estudio: los textos, las cifras y los enlaces son material original de demostración.',
  },
  backToTopLabel: 'Volver arriba',
};
