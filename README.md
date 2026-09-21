# AI Agency Studio

Sitio de una agencia de inteligencia artificial. **Case study original**: el código,
el copy, los tokens y la arquitectura de este repositorio son obra propia. No
contiene markup, CSS, clases, bundles, imágenes, tipografías, iconos ni textos de
ningún tema de WordPress/Elementor, plantilla de Framer ni de ningún otro producto
comercial. Sólo se usan las convenciones genéricas del género "agencia de IA".
No redistribuyas este build como si fuera una plantilla de terceros.

---

## Stack

| Pieza | Versión / nota |
| --- | --- |
| Next.js | 15, App Router, React 19 |
| TypeScript | `strict: true`, cero `any` |
| Tailwind CSS | v4, CSS-first (`@theme` en `globals.css`, **sin** `tailwind.config.js`) |
| GSAP | 3 + ScrollTrigger |
| Zod | validación de entorno y de la API |
| Gestor de paquetes | npm |

## Cómo se ejecuta

```bash
npm install
cp .env.example .env.local   # Windows: copy .env.example .env.local
npm run dev                  # http://localhost:3000
npm run build && npm run start
npm run lint
```

Node 22 (ver `.nvmrc`).

---

## Contrato de carpetas

```
src/
  app/                    SOLO capa de rutas: layout, page, api/, sitemap, robots, not-found
  components/ui/          primitivas tontas y reutilizables (Button, Card, Section, Reveal...)
  components/layout/      Header, Footer, MobileNav
  sections/<Nombre>/      un modulo autocontenido por seccion de la pagina
    index.ts                  barrel
    <Nombre>.tsx              componente presentacional (sin fetch, sin strings)
    <Nombre>.content.ts       TODO el copy y los datos  <-- se edita aqui
    <Nombre>.types.ts         interfaces de props y de contenido
    <Nombre>.schema.ts        (opcional) JSON-LD de la seccion
  lib/                    helpers puros (env, cn, seo, jsonld, rate-limit)
  hooks/                  useGsapContext
  styles/globals.css      tokens + base + utilidades
```

Por qué esta forma:

- **SRP** — cada sección hace una cosa y vive en una carpeta.
- **Inversión de dependencias** — el componente depende de la interfaz de
  `.types.ts`, no del objeto concreto de `.content.ts`.
- **OCP** — añadir una sección no obliga a tocar las existentes.
- **Screaming architecture** — el árbol de carpetas dice qué es el producto,
  no qué framework usa.

### Cómo cambiar textos

Todo el copy vive en `src/sections/<Nombre>/<Nombre>.content.ts`, como un objeto
plano y tipado. No hay strings dentro del JSX. Para cambiar un título, un botón o
un ítem de FAQ se edita ese único archivo; TypeScript avisa si falta un campo.

### Cómo añadir una sección

1. Crear `src/sections/MiSeccion/` con los cuatro archivos del contrato.
2. Envolver el contenido en `<Section id="mi-seccion">` y titular con
   `<Heading level={2} id="mi-seccion-title">`.
3. Exportar desde `index.ts` y montarla en `src/app/page.tsx`.

---

## Tokens de diseño y contraste

Tema oscuro único. Todos los ratios están medidos sobre `--color-base` (#0A0A0F)
salvo donde se indica, y cumplen WCAG AA.

| Token | Hex | Uso | Contraste |
| --- | --- | --- | --- |
| `--color-base` | `#0A0A0F` | fondo de página | — |
| `--color-surface` | `#121218` | tarjetas | — |
| `--color-elevated` | `#1B1B26` | tarjetas elevadas, popovers | — |
| `--color-text` | `#F4F4F7` | texto principal | 17.99:1 |
| `--color-muted` | `#A0A0B2` | texto secundario | 7.68:1 |
| `--color-accent` | `#8B6CFF` | **relleno** violeta | — |
| `--color-accent-ink` | `#0A0A0F` | texto **sobre** el relleno violeta | 5.35:1 |
| `--color-accent-link` | `#A88FFF` | texto/enlaces violeta pequeños | 7.56:1 |
| `--color-teal` | `#00D4B8` | acento secundario en texto | 10.45:1 |
| `--color-teal-ink` | `#04110F` | texto **sobre** relleno teal | 10.17:1 |
| `--color-border` | `#26263A` | hairlines **decorativas** | — |
| `--color-border-strong` | `#6A6A85` | bordes **interactivos** (inputs, foco) | 3.77:1 |

Reglas duras:

- Nunca texto blanco sobre el relleno `--color-accent`: se usa `--color-accent-ink`.
- El anillo de foco es `--color-accent-link`, mínimo 2px y con `outline-offset`.
- `--color-border` no delimita nada interactivo; para eso está `--color-border-strong`.

**Nota de utilidades (Tailwind v4):** los tokens generan utilidades por nombre
(`bg-base`, `bg-surface`, `text-muted`, `text-accent-link`, `border-border`...).
`text-base` sigue siendo el tamaño de fuente, no el color: para pintar con el
token de fondo usa `bg-base`.

## Tipografía

`Space Grotesk` (display) e `Inter` (texto/UI), ambas SIL OFL y **auto-alojadas**
por `next/font/google`, expuestas como `--font-display` y `--font-sans`. No se
pide nada a un dominio de Google en tiempo de ejecución, por eso el CSP puede
mantener `font-src 'self'`. La escala es fluida con `clamp()`.

---

## Reglas de movimiento

- Todo GSAP vive dentro de `gsap.matchMedia('(prefers-reduced-motion: no-preference)')`
  y se limpia con `mm.revert()` — ver `src/hooks/useGsapContext.ts`.
- **No hay `opacity: 0` en CSS.** El estado inicial lo aplica GSAP en runtime, así
  que la página se lee completa con JavaScript desactivado.
- La primitiva compartida es `<Reveal>`; ninguna sección reimplementa el scroll-in.
- Sólo se animan `transform` y `opacity` (presupuesto de 60fps).

## SEO

- Un único `<h1>` en toda la página (vive en Hero). El resto empieza en `<h2>`,
  sin saltos de nivel: `<Heading level={n}>` obliga a declararlo.
- Cada `<section>` tiene `id` y `aria-labelledby` apuntando al id de su título.
- Iconos y SVG decorativos con `aria-hidden="true"`; imágenes con significado,
  con `alt` real.
- `next/image` con `width`/`height` explícitos y `priority` sólo en el hero.
- JSON-LD: `src/lib/jsonld.tsx` expone `<JsonLd>` (serializa y escapa) más los
  builders de sitio (Organization, WebSite, BreadcrumbList). Cada sección con
  tipo schema.org propio exporta el suyo en `<Nombre>.schema.ts`.

## Seguridad (OWASP Top 10)

| Riesgo | Medida en este repo |
| --- | --- |
| A01 Control de acceso | la API no confía en nada del cliente; valida todo en servidor |
| A02 Fallos criptográficos | ningún secreto en `NEXT_PUBLIC_*`; `src/lib/env.ts` parsea con Zod y es server-only |
| A03 Inyección | Zod `.strict()` en la frontera de la API; `dangerouslySetInnerHTML` sólo en `<JsonLd>`, con `<`, `>` y `&` escapados |
| A04 Diseño inseguro | `/api/contact` con rate limit de ventana fija y honeypot |
| A05 Mala configuración | cabeceras estrictas en `next.config.ts` (CSP, HSTS, nosniff, Referrer-Policy, X-Frame-Options, Permissions-Policy) |
| A07 Autenticación | no aplica: no se añade auth falsa |
| A08 Integridad | cero scripts de terceros, cero `<script>` de CDN, fuentes auto-alojadas |
| A09 Logging | `console.error` en servidor sin devolver jamás el input del usuario |
| A10 SSRF | ninguna URL enviada por el usuario se descarga en servidor |

`src/lib/rate-limit.ts` es **en memoria**: sirve para un proceso Node único. En
serverless o multi-instancia hay que sustituir el store por Redis/Upstash
manteniendo la misma firma de `checkRateLimit`.

Endurecimiento pendiente para producción: emitir un `nonce` por petición desde
`middleware.ts` y sustituir `'unsafe-inline'` en `script-src` por
`'nonce-<valor>'` mas `'strict-dynamic'`.

## Idioma

Copy del sitio: **español neutro profesional** (audiencia LatAm), sin regionalismos.
Código, identificadores, nombres de archivo, comentarios y mensajes de commit:
**inglés**, siempre.

## Pendientes del esqueleto

- `public/og/default.png` (1200x630) y `public/logo.svg` están referenciados por
  los metadatos y el JSON-LD: hay que añadir los archivos.
- `src/components/layout/` (Header, Footer, MobileNav) y `src/sections/*` los
  entregan los siguientes agentes.
- `src/app/page.tsx` es un placeholder; el integrador lo reemplaza.
