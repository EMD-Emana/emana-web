import type { ProcessContent } from './Process.types';

/**
 * EDIT COPY HERE. Changing how the studio describes its engagement is a one
 * file change: nothing below is duplicated in the JSX.
 *
 * Timeframes are ranges on purpose — they are referential, and `footnote` says
 * so on the page.
 */
export const processContent: ProcessContent = {
  eyebrow: 'Cómo trabajamos',
  title: 'Cuatro etapas con entregables que se pueden revisar',
  description:
    'Cada etapa termina en algo concreto que tu equipo puede evaluar. Si una etapa no justifica la siguiente, el proyecto se detiene ahí y lo decimos.',
  deliverableLabel: 'Entregable',
  durationLabel: 'Duración',
  steps: [
    {
      id: 'proceso-diagnostico',
      index: '01',
      title: 'Diagnóstico',
      description:
        'Revisamos procesos, datos disponibles y restricciones legales para separar lo que conviene automatizar de lo que no.',
      deliverable: 'Mapa de oportunidades priorizado por impacto y esfuerzo',
      duration: '1 semana',
    },
    {
      id: 'proceso-prototipo',
      index: '02',
      title: 'Prototipo evaluado',
      description:
        'Construimos la versión más pequeña que responde la pregunta de negocio y la medimos contra un conjunto de casos reales.',
      deliverable: 'Prototipo funcional con su informe de evaluación',
      duration: '2 a 3 semanas',
    },
    {
      id: 'proceso-produccion',
      index: '03',
      title: 'Puesta en producción',
      description:
        'Integramos el sistema con tus herramientas, definimos límites de uso y dejamos trazabilidad de cada decisión automática.',
      deliverable: 'Servicio desplegado con monitoreo y plan de reversión',
      duration: '4 a 8 semanas',
    },
    {
      id: 'proceso-evolucion',
      index: '04',
      title: 'Evolución',
      description:
        'Revisamos métricas, corregimos desvíos y decidimos con datos qué se amplía, qué se ajusta y qué se retira.',
      deliverable: 'Ciclo mensual de métricas y ajustes acordados',
      duration: 'Acompañamiento continuo',
    },
  ],
  footnote: 'Los plazos son referenciales y se ajustan al alcance de cada proyecto.',
};
