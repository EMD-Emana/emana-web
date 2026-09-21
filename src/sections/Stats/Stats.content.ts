import type { StatsContent } from './Stats.types';

/**
 * EDIT COPY HERE.
 *
 * `value` is the number the animation ends on AND the number rendered on the
 * server, so it is also what a screen reader and a JavaScript-disabled browser
 * read. `suffix` carries the unit; "\u00a0%" is a non breaking space plus the
 * percent sign, which is the Spanish convention and avoids an ugly line break.
 *
 * Figures are illustrative — `footnote` says so on the page — and no monetary
 * or revenue claim is made anywhere in this section.
 */
export const statsContent: StatsContent = {
  eyebrow: 'En números',
  title: 'La forma más corta de explicar cómo trabajamos',
  description:
    'Cuatro indicadores que revisamos al cierre de cada trimestre y que usamos para decidir qué proyectos aceptamos.',
  format: {
    decimalSeparator: ',',
    groupSeparator: '.',
  },
  items: [
    {
      id: 'stat-projects',
      value: 48,
      decimals: 0,
      prefix: '',
      suffix: '',
      label: 'proyectos en producción',
      description: 'Sistemas entregados que siguen operando con el equipo del cliente.',
    },
    {
      id: 'stat-continuity',
      value: 96,
      decimals: 0,
      prefix: '',
      suffix: '\u00a0%',
      label: 'continúa con una segunda fase',
      description: 'Clientes que amplían el alcance después del primer despliegue.',
    },
    {
      id: 'stat-speed',
      value: 3.2,
      decimals: 1,
      prefix: '',
      suffix: 'x',
      label: 'más rápido de idea a producción',
      description: 'Comparado con el tiempo que tomaba el mismo equipo antes de trabajar con nosotros.',
    },
    {
      id: 'stat-countries',
      value: 11,
      decimals: 0,
      prefix: '',
      suffix: '',
      label: 'países con sistemas en operación',
      description: 'Equipos distribuidos en América Latina, España y Estados Unidos.',
    },
  ],
  footnote:
    'Cifras ilustrativas: este sitio es un caso de estudio de arquitectura y diseño, no un informe auditado.',
};
