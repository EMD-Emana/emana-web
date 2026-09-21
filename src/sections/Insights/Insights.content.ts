import type { InsightsContent } from './Insights.types';

/**
 * Every string and datum of the Insights section.
 *
 * Adding a fourth teaser is just another entry in `articles`: the grid, the
 * covers and the JSON-LD all read from this array.
 */
export const insightsContent: InsightsContent = {
  sectionId: 'insights',
  eyebrow: 'Ideas y notas',
  title: 'Lo que aprendemos construyendo',
  description:
    'Apuntes de trabajo sobre adopción de IA en equipos reales: qué funcionó, qué costó más de lo previsto y qué mediríamos distinto la próxima vez.',
  articles: [
    {
      id: 'insight-piloto-a-produccion',
      href: '/ideas/del-piloto-a-produccion',
      category: 'Operación',
      title: 'Del piloto a producción sin romper el proceso',
      excerpt:
        'La distancia entre una demo que convence y un sistema que aguanta el lunes por la mañana se mide en tres cosas: datos, permisos y quién responde cuando falla.',
      publishedAt: '2026-08-14',
      publishedLabel: '14 de agosto de 2026',
      readTimeMinutes: 7,
      readTimeLabel: '7 min de lectura',
      author: { name: 'Equipo de estudio', role: 'Ingeniería de producto' },
      cover: 'violet',
    },
    {
      id: 'insight-costo-por-consulta',
      href: '/ideas/costo-por-consulta',
      category: 'Arquitectura',
      title: 'Costo por consulta: la métrica que nadie revisa a tiempo',
      excerpt:
        'Un asistente puede ser excelente y aun así insostenible. Cómo presupuestar por caso atendido y qué decisiones de diseño mueven la aguja antes de escalar.',
      publishedAt: '2026-07-29',
      publishedLabel: '29 de julio de 2026',
      readTimeMinutes: 9,
      readTimeLabel: '9 min de lectura',
      author: { name: 'Equipo de estudio', role: 'Arquitectura de soluciones' },
      cover: 'dual',
    },
    {
      id: 'insight-evaluacion-continua',
      href: '/ideas/evaluacion-continua',
      category: 'Calidad',
      title: 'Evaluación continua: pruebas para respuestas que cambian',
      excerpt:
        'Cuando la salida no es determinista, las pruebas tradicionales no alcanzan. Así armamos un conjunto de evaluación que detecta regresiones antes que el cliente.',
      publishedAt: '2026-07-08',
      publishedLabel: '8 de julio de 2026',
      readTimeMinutes: 6,
      readTimeLabel: '6 min de lectura',
      author: { name: 'Equipo de estudio', role: 'Calidad y evaluación' },
      cover: 'teal',
    },
  ],
  action: {
    label: 'Ver todas las notas',
    href: '/ideas',
    ariaLabel: 'Ver todas las notas del estudio',
  },
  blog: {
    path: '/ideas',
    name: 'Ideas del estudio',
    description:
      'Notas de trabajo sobre diseño, arquitectura y operación de productos con inteligencia artificial aplicada.',
    inLanguage: 'es',
  },
};
