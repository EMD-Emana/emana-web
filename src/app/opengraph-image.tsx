import { ImageResponse } from 'next/og';

import { site } from '@/lib/seo';

/**
 * The site's share card, generated at build time.
 *
 * Next's file convention beats a hand-made binary here: the previous metadata
 * advertised `/og/default.png`, a file that did not exist, so every share of
 * this site resolved a 404. Generating it means the card can never drift from
 * the copy and the palette it is supposed to represent.
 *
 * No font is loaded on purpose: `next/og` falls back to its bundled sans, which
 * keeps the build free of a network fetch and of a second copy of the webfonts.
 * Swap in Space Grotesk here (read as an ArrayBuffer from the file system) when
 * the brand needs the display face on the card as well.
 */
export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const COLORS = {
  base: '#0A0A0F',
  surface: '#121218',
  text: '#F4F4F7',
  muted: '#A0A0B2',
  accent: '#8B6CFF',
  accentLink: '#A88FFF',
  teal: '#00D4B8',
  border: '#26263A',
} as const;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          backgroundColor: COLORS.base,
          backgroundImage: `radial-gradient(circle at 78% 8%, ${COLORS.accent}38 0%, transparent 52%)`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div
            style={{
              width: '18px',
              height: '18px',
              borderRadius: '9999px',
              backgroundColor: COLORS.teal,
            }}
          />
          <div
            style={{
              fontSize: '26px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: COLORS.muted,
            }}
          >
            {site.name}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '28px',
            maxWidth: '900px',
          }}
        >
          <div style={{ fontSize: '68px', lineHeight: 1.1, color: COLORS.text }}>
            Inteligencia artificial que llega a producción
          </div>
          <div style={{ fontSize: '30px', lineHeight: 1.4, color: COLORS.muted }}>
            {site.tagline}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            borderTop: `2px solid ${COLORS.border}`,
            paddingTop: '32px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: '9999px',
              backgroundColor: COLORS.accent,
              color: COLORS.base,
              padding: '12px 28px',
              fontSize: '24px',
            }}
          >
            Diagnóstico sin costo
          </div>
          <div style={{ fontSize: '24px', color: COLORS.accentLink }}>
            {site.url.replace(/^https?:\/\//, '')}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
