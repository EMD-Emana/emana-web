import type { TeamContent } from './Team.types';

/**
 * EVERY string and datum of the Team section lives here.
 *
 * To change the copy, edit this flat object — no JSX, no components. The URLs
 * use the IANA-reserved example.com domain because this is a case study; swap
 * them for the real profiles before shipping.
 */
export const teamContent: TeamContent = {
  id: 'equipo',
  eyebrow: 'Equipo',
  title: 'Las personas detrás de cada implementación',
  intro:
    'Un equipo pequeño y multidisciplinario: estrategia, datos, diseño y automatización trabajando sobre un mismo backlog. Sin intermediarios ni capas de gestión entre quien decide y quien construye.',
  members: [
    {
      id: 'valeria-cordero',
      name: 'Valeria Cordero',
      role: 'Directora de estrategia de IA',
      initials: 'VC',
      focus:
        'Traduce objetivos de negocio en casos de uso medibles y define qué conviene automatizar primero.',
      avatarVariant: 'violet',
      links: [
        {
          kind: 'profile',
          label: 'Perfil profesional de Valeria Cordero',
          href: 'https://example.com/equipo/valeria-cordero',
          external: true,
        },
        {
          kind: 'email',
          label: 'Escribir a Valeria Cordero por correo',
          href: 'mailto:valeria@example.com',
          external: false,
        },
      ],
    },
    {
      id: 'mateo-rivas',
      name: 'Mateo Rivas',
      role: 'Líder de ingeniería de datos',
      initials: 'MR',
      focus:
        'Diseña los canales de datos y las evaluaciones que mantienen cada modelo bajo control en producción.',
      avatarVariant: 'teal',
      links: [
        {
          kind: 'profile',
          label: 'Perfil profesional de Mateo Rivas',
          href: 'https://example.com/equipo/mateo-rivas',
          external: true,
        },
        {
          kind: 'writing',
          label: 'Artículos técnicos de Mateo Rivas',
          href: 'https://example.com/notas/mateo-rivas',
          external: true,
        },
      ],
    },
    {
      id: 'ana-lucia-pena',
      name: 'Ana Lucía Peña',
      role: 'Directora de diseño de producto',
      initials: 'AP',
      focus:
        'Convierte flujos complejos en interfaces que el equipo del cliente adopta sin capacitación extensa.',
      avatarVariant: 'duo',
      links: [
        {
          kind: 'portfolio',
          label: 'Portafolio de Ana Lucía Peña',
          href: 'https://example.com/portafolio/ana-lucia-pena',
          external: true,
        },
        {
          kind: 'email',
          label: 'Escribir a Ana Lucía Peña por correo',
          href: 'mailto:ana@example.com',
          external: false,
        },
      ],
    },
    {
      id: 'diego-santoro',
      name: 'Diego Santoro',
      role: 'Arquitecto de automatización',
      initials: 'DS',
      focus:
        'Integra los agentes con los sistemas existentes y define los límites de permisos de cada uno.',
      avatarVariant: 'aurora',
      links: [
        {
          kind: 'profile',
          label: 'Perfil profesional de Diego Santoro',
          href: 'https://example.com/equipo/diego-santoro',
          external: true,
        },
        {
          kind: 'writing',
          label: 'Artículos técnicos de Diego Santoro',
          href: 'https://example.com/notas/diego-santoro',
          external: true,
        },
      ],
    },
  ],
};
