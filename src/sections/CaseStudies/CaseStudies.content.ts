import type { CaseStudiesContent } from './CaseStudies.types';

/**
 * EDIT COPY HERE. This is the only file a non-developer needs to touch to
 * change what the CaseStudies section says. No string lives inside the JSX.
 *
 * Clients, figures and outcomes below are illustrative: this project is an
 * original case study of architecture and design, not a real client roster.
 * `footnote` states that on the page itself, so the claim is never implied.
 *
 * `link.href` points at the contact anchor on purpose: there are no detail
 * routes yet. When real pages exist, change each href to `/casos/<id>` and add
 * those routes to src/app/sitemap.ts.
 */
export const caseStudiesContent: CaseStudiesContent = {
  eyebrow: 'Casos de estudio',
  title: 'Sistemas de IA que ya trabajan todos los días',
  description:
    'Tres proyectos donde pasamos de una idea suelta a un sistema en producción, con las métricas acordadas antes de escribir la primera línea de código.',
  clientLabel: 'Cliente:',
  tagsLabel: 'Capacidades aplicadas:',
  items: [
    {
      id: 'atlas-retail',
      client: 'Atlas Retail',
      sector: 'Retail omnicanal',
      title: 'Previsión de demanda por tienda y por producto',
      summary:
        'Reemplazamos una planificación hecha en hojas de cálculo por un modelo conectado al ERP, con reentrenamiento semanal y alertas de desvío para el equipo de compras.',
      tags: ['Previsión de demanda', 'MLOps', 'Integración con ERP'],
      metric: {
        value: '-38\u00a0%',
        label: 'quiebres de stock en seis meses',
      },
      link: {
        href: '#contacto',
        label: 'Conversemos sobre este caso',
        ariaLabel: 'Conversemos sobre el caso de Atlas Retail',
      },
      visual: 'mesh',
    },
    {
      id: 'vera-salud',
      client: 'Vera Salud',
      sector: 'Red de clínicas',
      title: 'Asistente documental para equipos clínicos',
      summary:
        'Búsqueda sobre protocolos internos con cita obligatoria a la fuente, permisos por rol y registro de cada consulta para auditoría posterior.',
      tags: ['Recuperación aumentada', 'Control de acceso', 'Auditoría'],
      metric: {
        value: '4,5\u00a0h',
        label: 'recuperadas por profesional cada semana',
      },
      link: {
        href: '#contacto',
        label: 'Conversemos sobre este caso',
        ariaLabel: 'Conversemos sobre el caso de Vera Salud',
      },
      visual: 'orbit',
    },
    {
      id: 'nodo-logistica',
      client: 'Nodo Logística',
      sector: 'Operador logístico',
      title: 'Torre de control conversacional para flotas',
      summary:
        'Agentes que resuelven consultas de estado, reprograman entregas y escalan a una persona apenas la confianza del modelo baja del umbral definido.',
      tags: ['Agentes', 'Automatización', 'Observabilidad'],
      metric: {
        value: 'x3',
        label: 'consultas atendidas sin ampliar el equipo',
      },
      link: {
        href: '#contacto',
        label: 'Conversemos sobre este caso',
        ariaLabel: 'Conversemos sobre el caso de Nodo Logística',
      },
      visual: 'flow',
    },
  ],
  footnote:
    'Nombres y cifras son ilustrativos: este sitio es un caso de estudio de arquitectura y diseño, no una lista de clientes reales.',
  cta: {
    href: '#contacto',
    label: 'Revisar si tu caso encaja',
    ariaLabel: 'Escribir al estudio para revisar si tu caso encaja',
  },
};
