import type { PricingContent } from './Pricing.types';

/**
 * EVERY string and datum of the Pricing section lives here.
 *
 * CASE-STUDY DATA: the amounts below are fictional placeholders in USD, written
 * for this exercise. Replace them with the real commercial terms before
 * shipping, and keep the annual figures consistent with the discount you
 * actually offer (here: 20% off, so annualMonthlyPrice = monthlyPrice * 0.8 and
 * annualTotalPrice = annualMonthlyPrice * 12).
 */
export const pricingContent: PricingContent = {
  id: 'precios',
  eyebrow: 'Planes',
  title: 'Planes claros, sin costos ocultos',
  intro:
    'Cada plan incluye diagnóstico, implementación y transferencia de conocimiento a tu equipo. Sin licencias intermedias ni cobros por usuario.',
  footnote:
    'Cifras de referencia para este caso de estudio, expresadas en dólares estadounidenses. El alcance definitivo se acuerda en la sesión de diagnóstico.',
  labels: {
    toggleGroup: 'Ciclo de facturación',
    currencySymbol: '$',
    currencyCode: 'USD',
    perMonth: '/mes',
    billedMonthly: 'Facturación mensual, cancelable en cualquier momento.',
    billedAnnually: 'Facturado {total} al año.',
    featuresTitle: 'Incluye',
  },
  billingOptions: [
    { value: 'monthly', label: 'Mensual' },
    { value: 'annual', label: 'Anual', hint: '-20%' },
  ],
  defaultCycle: 'monthly',
  serviceName: 'Programas de inteligencia artificial aplicada',
  serviceDescription:
    'Tres niveles de acompañamiento para diagnosticar, implementar y escalar procesos asistidos por inteligencia artificial.',
  tiers: [
    {
      id: 'diagnostico',
      name: 'Diagnóstico',
      description:
        'Para equipos que necesitan validar dónde aporta valor la IA antes de invertir en desarrollo.',
      monthlyPrice: 1800,
      annualMonthlyPrice: 1440,
      annualTotalPrice: 17280,
      features: [
        'Auditoría de procesos y calidad de datos',
        'Mapa de casos de uso priorizados por impacto',
        'Prototipo funcional de un flujo',
        'Informe de riesgos y cumplimiento',
        'Sesión de cierre con tu equipo',
      ],
      ctaLabel: 'Agendar diagnóstico',
      ctaHref: '#contacto',
      featured: false,
    },
    {
      id: 'implementacion',
      name: 'Implementación',
      description:
        'Para organizaciones listas para llevar dos o tres flujos a producción con acompañamiento continuo.',
      monthlyPrice: 4500,
      annualMonthlyPrice: 3600,
      annualTotalPrice: 43200,
      features: [
        'Todo lo del plan Diagnóstico',
        'Hasta tres flujos en producción',
        'Integración con tus sistemas actuales',
        'Panel de métricas y evaluaciones',
        'Ciclos de mejora quincenales',
        'Canal directo con el equipo técnico',
      ],
      ctaLabel: 'Empezar implementación',
      ctaHref: '#contacto',
      featured: true,
      badge: 'Más elegido',
    },
    {
      id: 'escalamiento',
      name: 'Escalamiento',
      description:
        'Para equipos que ya operan con IA y necesitan gobierno, volumen y soporte dedicado.',
      monthlyPrice: 8900,
      annualMonthlyPrice: 7120,
      annualTotalPrice: 85440,
      features: [
        'Todo lo del plan Implementación',
        'Flujos sin límite por trimestre',
        'Arquitectura y gobierno de datos',
        'Revisiones de seguridad trimestrales',
        'Capacitación para tu equipo interno',
        'Acuerdo de nivel de servicio',
      ],
      ctaLabel: 'Hablar con el equipo',
      ctaHref: '#contacto',
      featured: false,
    },
  ],
};
