import type { TestimonialsContent } from './Testimonials.types';

/**
 * EVERY string and datum of the Testimonials section lives here.
 *
 * CASE-STUDY DATA: the quotes, names and companies below are fictional and
 * written for this exercise. Before shipping, replace them with real, verifiable
 * reviews — publishing invented review markup is both a search-engine penalty
 * and a deceptive practice.
 */
export const testimonialsContent: TestimonialsContent = {
  id: 'testimonios',
  eyebrow: 'Testimonios',
  title: 'Lo que dicen los equipos con los que trabajamos',
  intro:
    'Una muestra de la retroalimentación que recibimos al cerrar cada etapa de implementación, recogida directamente de quienes operan los procesos todos los días.',
  labels: {
    carousel: 'Testimonios de clientes',
    roleDescription: 'carrusel',
    previous: 'Ver el testimonio anterior',
    next: 'Ver el testimonio siguiente',
    pause: 'Pausar el avance automático de los testimonios',
    play: 'Reanudar el avance automático de los testimonios',
    goTo: 'Ir al testimonio {n} de {total}',
    position: 'Testimonio {n} de {total}',
    rating: 'Calificación: {value} de {best} estrellas',
  },
  aggregate: {
    value: 4.8,
    count: 5,
    best: 5,
    worst: 1,
    summary: '4.8 de 5 según los cinco equipos que evaluaron el cierre de su proyecto',
  },
  itemName: 'Implementación de inteligencia artificial aplicada',
  itemDescription:
    'Diagnóstico, implementación y acompañamiento de procesos asistidos por inteligencia artificial para equipos de operaciones, servicio y datos.',
  autoAdvanceMs: 7000,
  items: [
    {
      id: 'grupo-meridian',
      quote:
        'Llegamos con una lista de ideas sueltas y salimos con tres procesos en producción. La diferencia estuvo en que priorizaron por impacto y no por novedad.',
      authorName: 'Camila Duarte',
      authorRole: 'Directora de Operaciones',
      company: 'Grupo Meridian',
      initials: 'CD',
      rating: 5,
    },
    {
      id: 'nubla-logistica',
      quote:
        'Documentaron cada decisión técnica mientras avanzaban. Cuando nuestro equipo tomó el mantenimiento, no quedaron zonas grises ni dependencias ocultas.',
      authorName: 'Rodrigo Alcázar',
      authorRole: 'Director de Tecnología',
      company: 'Nubla Logística',
      initials: 'RA',
      rating: 5,
    },
    {
      id: 'alvera-retail',
      quote:
        'Nos advirtieron qué no valía la pena automatizar todavía y por qué. Esa honestidad nos ahorró un trimestre entero de trabajo mal dirigido.',
      authorName: 'Paula Ferreira',
      authorRole: 'Gerenta de Servicio al Cliente',
      company: 'Alvera Retail',
      initials: 'PF',
      rating: 4,
    },
    {
      id: 'cordillera-seguros',
      quote:
        'Pasamos de reportes manuales semanales a un tablero que el equipo consulta a diario. La adopción fue inmediata porque partieron de nuestro flujo real.',
      authorName: 'Esteban Ríos',
      authorRole: 'Director Comercial',
      company: 'Cordillera Seguros',
      initials: 'ER',
      rating: 5,
    },
    {
      id: 'banco-aurelia',
      quote:
        'Trabajaron con nuestras restricciones de seguridad desde el primer día, no como un ajuste al final. Eso hizo que el comité aprobara el proyecto sin observaciones.',
      authorName: 'Mariana Solís',
      authorRole: 'Líder de Cumplimiento',
      company: 'Banco Aurelia',
      initials: 'MS',
      rating: 5,
    },
  ],
};
