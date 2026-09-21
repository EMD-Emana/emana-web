import type { FaqContent } from './Faq.types';

/**
 * Every string rendered by the FAQ section lives here.
 *
 * To change the copy, edit this flat object: no JSX, no logic, no classes.
 * Keep the questions phrased the way a prospect would ask them out loud —
 * that is also what makes them eligible for the FAQ rich result.
 */
export const faqContent: FaqContent = {
  sectionId: 'faq',
  eyebrow: 'Preguntas frecuentes',
  title: 'Lo que suelen preguntarnos antes de empezar',
  description:
    'Respuestas directas sobre alcance, tiempos, datos y costos. Si falta algo, escríbenos y lo resolvemos en la primera llamada.',
  items: [
    {
      id: 'faq-como-empezamos',
      question: '¿Cómo empieza un proyecto con el estudio?',
      answer: [
        'Empezamos con una sesión de diagnóstico de 45 minutos donde revisamos el proceso que quieres mejorar, los datos disponibles y la métrica que define el éxito.',
        'De ahí sale un plan de trabajo con alcance, hitos y presupuesto cerrado. Si el caso no justifica la inversión, te lo decimos en esa misma sesión.',
      ],
    },
    {
      id: 'faq-primer-entregable',
      question: '¿Cuánto tarda el primer entregable?',
      answer: [
        'Entre dos y cuatro semanas según la complejidad de la integración. El primer hito siempre es un prototipo funcional con datos reales, no una maqueta.',
        'Trabajamos en ciclos de una semana con una demo al cierre, así que nunca pasas más de siete días sin ver avance.',
      ],
    },
    {
      id: 'faq-modelos',
      question: '¿Usan modelos propios o de terceros?',
      answer: [
        'Elegimos el modelo según el caso: proveedores comerciales cuando la calidad y el tiempo mandan, y modelos abiertos autoalojados cuando el costo por consulta o la residencia de datos son críticos.',
        'La arquitectura queda desacoplada del proveedor, de modo que cambiar de modelo sea una decisión de negocio y no una reescritura.',
      ],
    },
    {
      id: 'faq-datos',
      question: '¿Qué pasa con nuestros datos y los de nuestros clientes?',
      answer: [
        'Tus datos son tuyos. Trabajamos sobre tu infraestructura o sobre una cuenta a tu nombre, con acceso mínimo necesario y registro de cada operación.',
        'No entrenamos modelos con información de un cliente para otro, y firmamos acuerdo de confidencialidad antes de ver el primer archivo.',
      ],
    },
    {
      id: 'faq-equipo-tecnico',
      question: '¿Necesitamos un equipo técnico interno?',
      answer: [
        'No para arrancar. Sí necesitamos a una persona del negocio que conozca el proceso a fondo y pueda validar resultados una vez por semana.',
        'Al cerrar el proyecto dejamos documentación, pruebas y una sesión de traspaso para que tu equipo pueda operar y extender lo construido.',
      ],
    },
    {
      id: 'faq-medicion',
      question: '¿Cómo se mide el retorno de la inversión?',
      answer: [
        'Antes de escribir código definimos la línea base: horas dedicadas, costo por caso atendido o tasa de conversión actual.',
        'Cada entrega se compara contra esa línea base con la misma medición, y el tablero de resultados queda disponible para tu equipo desde el primer hito.',
      ],
    },
    {
      id: 'faq-soporte',
      question: '¿Qué incluye el acompañamiento después del lanzamiento?',
      answer: [
        'Treinta días de garantía sobre lo entregado y, si lo prefieres, un plan mensual de evolución con horas reservadas para mejoras y monitoreo.',
        'El plan mensual no es obligatorio: el proyecto se entrega funcionando y documentado, sin dependencias ocultas con nosotros.',
      ],
    },
  ],
  aside: {
    title: '¿Tu caso no aparece aquí?',
    description:
      'Cuéntanos el proceso que quieres mejorar y te respondemos con un diagnóstico honesto en menos de 24 horas hábiles.',
    action: {
      label: 'Hablar con el estudio',
      href: '#contacto',
    },
  },
};
