import type { LogoMarqueeContent } from './LogoMarquee.types';

/**
 * EDIT COPY HERE.
 *
 * The eight brand names below are INVENTED for this case study. They are not
 * real companies and must never be presented as clients: `disclaimer` is
 * rendered on the page for exactly that reason, and this module deliberately
 * ships no JSON-LD, because structured data asserting fictional client
 * relationships would be false markup.
 *
 * Copy language: neutral professional Spanish (LatAm). Code stays in English.
 */
export const logoMarqueeContent: LogoMarqueeContent = {
  sectionId: 'sectores',
  headingId: 'sectores-title',

  title: 'Sectores donde aplicamos el método',
  description:
    'Ocho perfiles de empresa representativos del tipo de operación que acompañamos: volumen alto de procesos, datos repartidos en varios sistemas y equipos que necesitan auditar cada decisión.',
  disclaimer:
    'Nombres y marcas creados para este caso de estudio. No representan empresas ni clientes reales.',

  listLabel: 'Perfiles de empresa representados',
  pauseLabel: 'Pausar desplazamiento',
  playLabel: 'Reanudar desplazamiento',

  durationSeconds: 46,

  brands: [
    { id: 'nordvela', name: 'Nordvela', sector: 'Logística', glyph: 'arc' },
    { id: 'quantara', name: 'Quantara', sector: 'Servicios financieros', glyph: 'orbit' },
    { id: 'velmara', name: 'Velmara Salud', sector: 'Salud', glyph: 'pulse' },
    { id: 'cobalto', name: 'Cobalto Retail', sector: 'Retail', glyph: 'lattice' },
    { id: 'andarel', name: 'Andarel Energía', sector: 'Energía', glyph: 'nova' },
    { id: 'hexaseguro', name: 'Hexaseguro', sector: 'Seguros', glyph: 'prism' },
    { id: 'altamar', name: 'Altamar Agro', sector: 'Agroindustria', glyph: 'loop' },
    { id: 'ferrox', name: 'Ferrox Industrial', sector: 'Manufactura', glyph: 'delta' },
  ],
};
