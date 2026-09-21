import type { CtaContent } from './Cta.types';

/**
 * Every string of the closing panel and its form.
 *
 * The budget option VALUES are part of the API contract (they must match the
 * enum in src/app/api/contact/route.ts); only their labels are free copy.
 */
export const ctaContent: CtaContent = {
  sectionId: 'contacto',
  eyebrow: 'Siguiente paso',
  title: 'Cuéntanos qué proceso quieres mejorar',
  description:
    'Una conversación de 45 minutos basta para saber si tu caso tiene sentido. Salimos de ahí con un alcance claro o con una recomendación honesta de no hacerlo.',
  highlights: [
    {
      id: 'cta-highlight-diagnostico',
      title: 'Diagnóstico sin costo',
      description: 'Revisamos proceso, datos y métrica objetivo antes de proponer nada.',
    },
    {
      id: 'cta-highlight-respuesta',
      title: 'Respuesta en 24 horas hábiles',
      description: 'Una persona del equipo responde, no un formulario automático.',
    },
    {
      id: 'cta-highlight-alcance',
      title: 'Presupuesto cerrado',
      description: 'Alcance, hitos y precio por escrito antes de empezar a construir.',
    },
  ],
  form: {
    endpoint: '/api/contact',
    title: 'Escríbenos',
    description: 'Mientras más contexto nos des, más útil será la primera respuesta.',
    optionalLabel: '(opcional)',
    consentLabel:
      'Autorizo que el estudio use estos datos únicamente para responder a esta consulta.',
    submitLabel: 'Enviar mensaje',
    pendingLabel: 'Enviando…',
    privacyNote: 'No compartimos tus datos con terceros ni te suscribimos a ninguna lista.',
    honeypot: {
      name: 'website',
      label: 'No completes este campo',
    },
    fields: [
      {
        name: 'name',
        kind: 'text',
        label: 'Nombre',
        placeholder: 'Ana Rivera',
        required: true,
        autoComplete: 'name',
        span: 'half',
      },
      {
        name: 'email',
        kind: 'email',
        label: 'Correo de trabajo',
        placeholder: 'ana@empresa.com',
        required: true,
        autoComplete: 'email',
        span: 'half',
      },
      {
        name: 'company',
        kind: 'text',
        label: 'Empresa',
        placeholder: 'Nombre de la empresa',
        required: false,
        autoComplete: 'organization',
        span: 'half',
      },
      {
        name: 'budget',
        kind: 'select',
        label: 'Presupuesto estimado',
        required: false,
        span: 'half',
        options: [
          { value: '', label: 'Prefiero conversarlo' },
          { value: 'under-5k', label: 'Menos de USD 5.000' },
          { value: '5k-15k', label: 'USD 5.000 a 15.000' },
          { value: '15k-50k', label: 'USD 15.000 a 50.000' },
          { value: 'over-50k', label: 'Más de USD 50.000' },
        ],
      },
      {
        name: 'message',
        kind: 'textarea',
        label: '¿Qué quieres resolver?',
        placeholder:
          'Describe el proceso actual, quién lo ejecuta hoy y qué resultado esperas obtener.',
        hint: 'Mínimo 20 caracteres. Un párrafo es suficiente para empezar.',
        required: true,
        rows: 5,
        span: 'full',
      },
    ],
    messages: {
      success: 'Mensaje recibido. Te respondemos en menos de 24 horas hábiles.',
      invalid: 'Revisa los campos marcados y vuelve a intentarlo.',
      rateLimited: 'Recibimos varios envíos desde tu conexión. Espera un momento y reintenta.',
      network: 'No pudimos conectar con el servidor. Revisa tu conexión e inténtalo otra vez.',
      server: 'Algo falló de nuestro lado. Inténtalo de nuevo en unos minutos.',
    },
    validation: {
      nameMin: 'Escribe tu nombre (al menos 2 caracteres).',
      nameMax: 'El nombre no puede superar los 80 caracteres.',
      emailInvalid: 'Escribe un correo válido, por ejemplo ana@empresa.com.',
      companyMax: 'El nombre de la empresa no puede superar los 120 caracteres.',
      messageMin: 'Cuéntanos un poco más: necesitamos al menos 20 caracteres.',
      messageMax: 'El mensaje no puede superar los 2.000 caracteres.',
      budgetInvalid: 'Elige una de las opciones de la lista.',
      consentRequired: 'Necesitamos tu autorización para responderte.',
    },
  },
};
