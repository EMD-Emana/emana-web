import type { ServicesContent } from './Services.types';

/**
 * EDIT THE SITE COPY HERE.
 *
 * This is the only file in the Services module that a non-developer needs to
 * touch. Nothing below is rendered from a string literal inside JSX, so changing
 * a headline never requires reading a component.
 *
 * Copy is neutral professional Spanish for a LatAm audience; identifiers,
 * comments and file names stay in English.
 */
export const servicesContent: ServicesContent = {
  sectionId: 'servicios',
  headingId: 'servicios-title',

  badge: 'Servicios',
  title: 'Seis formas de poner la inteligencia artificial a trabajar',
  description:
    'No vendemos pilotos que mueren en una presentación. Cada servicio se entrega instalado sobre tus procesos reales, con documentación, métricas de calidad y un plan de mantenimiento que tu equipo puede sostener.',

  deliverablesLabel: 'Qué recibes',

  items: [
    {
      id: 'estrategia',
      number: '01',
      icon: 'strategy',
      title: 'Estrategia y diagnóstico',
      description:
        'Recorremos tus procesos, identificamos dónde la automatización deja margen real y ordenamos las iniciativas por impacto, riesgo y esfuerzo de implementación.',
      deliverables: [
        'Mapa de procesos con oportunidades priorizadas',
        'Estimación de costo y retorno por iniciativa',
        'Hoja de ruta a doce meses',
      ],
      href: '#contacto',
      serviceType: 'Consultoría en inteligencia artificial',
    },
    {
      id: 'automatizacion',
      number: '02',
      icon: 'automation',
      title: 'Automatización de procesos',
      description:
        'Conectamos los sistemas que ya usas y reemplazamos el trabajo repetitivo por flujos supervisados, con trazabilidad completa y puntos de control humanos donde el error cuesta caro.',
      deliverables: [
        'Flujos conectados a tus sistemas actuales',
        'Puntos de aprobación configurables',
        'Registro auditable de cada ejecución',
      ],
      href: '#contacto',
      serviceType: 'Automatización de procesos de negocio',
    },
    {
      id: 'asistentes',
      number: '03',
      icon: 'assistant',
      title: 'Asistentes conversacionales',
      description:
        'Agentes de atención y soporte entrenados con tu propia documentación, con límites claros de alcance y derivación a una persona en cuanto la conversación se sale de lo que pueden resolver.',
      deliverables: [
        'Asistente conectado a tus canales',
        'Reglas de derivación a un agente humano',
        'Panel de conversaciones y calidad',
      ],
      href: '#contacto',
      serviceType: 'Desarrollo de asistentes conversacionales',
    },
    {
      id: 'datos',
      number: '04',
      icon: 'data',
      title: 'Datos listos para IA',
      description:
        'Ordenamos, limpiamos y versionamos la información que alimenta a los modelos. Sin esta capa, cualquier respuesta automática hereda los errores que ya viven en tus planillas.',
      deliverables: [
        'Fuentes unificadas y versionadas',
        'Controles de calidad automáticos',
        'Permisos de lectura por perfil',
      ],
      href: '#contacto',
      serviceType: 'Ingeniería de datos',
    },
    {
      id: 'integracion',
      number: '05',
      icon: 'integration',
      title: 'Integración y despliegue',
      description:
        'Llevamos los prototipos a producción: interfaces de programación documentadas, monitoreo activo, control de costo por consumo y un plan de reversión para el día en que algo falle.',
      deliverables: [
        'Despliegue con monitoreo y alertas',
        'Control de costo por consumo',
        'Plan de reversión probado',
      ],
      href: '#contacto',
      serviceType: 'Integración de software',
    },
    {
      id: 'habilitacion',
      number: '06',
      icon: 'enablement',
      title: 'Habilitación de equipos',
      description:
        'Formamos a las personas que van a operar el sistema todos los días y dejamos guías internas escritas, para que la continuidad del proyecto no dependa de que sigamos contratados.',
      deliverables: [
        'Talleres prácticos por área',
        'Guías internas de uso responsable',
        'Acompañamiento durante el primer trimestre',
      ],
      href: '#contacto',
      serviceType: 'Capacitación corporativa en inteligencia artificial',
    },
  ],

  footnote: {
    text: '¿Tu caso no encaja en ninguna de estas seis casillas? Suele pasar. Cuéntanos qué proceso te está costando tiempo y te decimos con franqueza si la IA ayuda o si el problema es otro.',
    ctaLabel: 'Agendar una conversación',
    ctaHref: '#contacto',
  },

  areaServed: ['América Latina', 'España', 'Estados Unidos'],
};
