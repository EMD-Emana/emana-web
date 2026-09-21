import type { HeroContent, HeroSchemaContent } from './Hero.types';

/**
 * EDIT COPY HERE.
 *
 * Every visible string of the Hero lives in this file. Nothing below is imported
 * by Hero.tsx: the page passes it in, so this object can be replaced by a CMS
 * payload later without touching a component.
 *
 * `actions[].href` are in-page anchors. If the integrator renames a section id,
 * change it here — not in the JSX.
 *
 * Copy language: neutral professional Spanish (LatAm). Code stays in English.
 */
export const heroContent: HeroContent = {
  sectionId: 'hero',
  headingId: 'hero-title',

  badge: {
    label: 'Estudio de IA aplicada',
    tone: 'accent',
  },

  headline: [
    { id: 'line-1', text: 'Diseñamos sistemas de IA' },
    { id: 'line-2', text: 'que tu operación' },
    { id: 'line-3', text: 'puede sostener', tone: 'accent' },
  ],

  subhead:
    'Conectamos modelos, datos y procesos en flujos que tu equipo entiende, audita y opera todos los días. Sin dependencias ocultas y sin proyectos que se detienen cuando terminamos.',

  actions: [
    {
      id: 'primary',
      label: 'Agenda un diagnóstico',
      href: '#contacto',
      variant: 'primary',
    },
    {
      id: 'secondary',
      label: 'Conoce el método',
      href: '#proceso',
      variant: 'ghost',
    },
  ],

  footnote: 'Diagnóstico inicial sin costo. Respondemos en menos de 24 horas hábiles.',

  visual: {
    title: 'Esquema de una red de automatización',
    description:
      'Tres fuentes de datos entran por la izquierda, se distribuyen en nodos de procesamiento y decisión, y convergen en una única salida entregada a la operación.',
    legendTitle: 'Etapas del flujo',
    legend: [
      { id: 'sources', label: 'Fuentes y datos internos', tone: 'muted' },
      { id: 'agents', label: 'Agentes y reglas de negocio', tone: 'accent' },
      { id: 'delivery', label: 'Entrega auditable a tu equipo', tone: 'teal' },
    ],
  },
};

/**
 * Structured-data values for Hero.schema.ts. Separate from the visible copy on
 * purpose: changing marketing wording should never silently change the schema.
 */
export const heroSchemaContent: HeroSchemaContent = {
  serviceType: 'Consultoría e implementación de inteligencia artificial',
  category: 'Automatización de procesos con inteligencia artificial',
  description:
    'Diseño, implementación y puesta en operación de sistemas de inteligencia artificial para equipos que necesitan mantener y auditar sus propios procesos.',
  areaServed: ['AR', 'CL', 'CO', 'MX', 'PE', 'UY'],
  audience: 'Equipos de operaciones y tecnología en empresas medianas',
};
