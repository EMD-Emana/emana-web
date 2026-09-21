import type { CapabilitiesContent } from './Capabilities.types';

/**
 * EDIT THE SITE COPY HERE.
 *
 * Every visible string of the Capabilities section lives in this object. The
 * component reads it through the `CapabilitiesContent` interface and renders no
 * literal of its own.
 *
 * Copy is neutral professional Spanish for a LatAm audience; identifiers,
 * comments and file names stay in English.
 */
export const capabilitiesContent: CapabilitiesContent = {
  sectionId: 'capacidades',
  headingId: 'capacidades-title',

  intro: {
    badge: 'Capacidades técnicas',
    title: 'La ingeniería que sostiene cada entrega',
    lead: 'Un asistente que responde bien en una demostración no es lo mismo que un sistema que responde bien todos los días, con carga real y datos desordenados. Estas son las capas que construimos para que la diferencia no la descubra tu cliente.',
    body: 'Cada capa se entrega documentada, medida y con un responsable asignado de tu lado. No dejamos cajas negras que solo nosotros podamos abrir, ni dependencias que te obliguen a seguir contratándonos para cambiar un texto.',
    ctaLabel: 'Revisar tu caso con el equipo',
    ctaHref: '#contacto',
  },

  listLabel: 'Capas técnicas incluidas en cada proyecto',

  items: [
    {
      id: 'evaluacion',
      number: '01',
      title: 'Evaluación de modelos',
      description:
        'Comparamos los modelos candidatos contra un conjunto de casos tomados de tu operación, no contra pruebas genéricas de laboratorio. El resultado es una tabla honesta de precisión, costo y tiempo de respuesta con la que se decide.',
      tags: ['Casos de prueba propios', 'Comparativa de costo', 'Medición de latencia'],
    },
    {
      id: 'recuperacion',
      number: '02',
      title: 'Recuperación sobre tu documentación',
      description:
        'Indexamos manuales, políticas y catálogos para que cada respuesta cite la fuente exacta de donde salió. Cuando el sistema no encuentra respaldo, lo dice con claridad en lugar de improvisar una respuesta plausible.',
      tags: ['Indexación incremental', 'Citas verificables', 'Control de versiones'],
    },
    {
      id: 'orquestacion',
      number: '03',
      title: 'Orquestación de agentes',
      description:
        'Definimos qué puede hacer cada agente, qué herramientas tiene permitidas y en qué punto exacto se detiene para pedir autorización a una persona. El alcance es una decisión de diseño, no un accidente.',
      tags: ['Permisos por herramienta', 'Puntos de aprobación', 'Registro de decisiones'],
    },
    {
      id: 'observabilidad',
      number: '04',
      title: 'Observabilidad y control de costo',
      description:
        'Cada ejecución queda registrada con su consumo, su duración y su resultado. Los límites de gasto se configuran por equipo y avisan antes de superarse, no en la factura del mes siguiente.',
      tags: ['Trazas por ejecución', 'Alertas de consumo', 'Tableros por equipo'],
    },
    {
      id: 'seguridad',
      number: '05',
      title: 'Seguridad y gobierno del dato',
      description:
        'Separamos la información sensible del contexto que llega al modelo, aplicamos permisos por perfil y dejamos registro de quién consultó qué. La auditoría deja de ser un proyecto aparte.',
      tags: ['Enmascarado de datos', 'Accesos por perfil', 'Auditoría de consultas'],
    },
  ],
};
