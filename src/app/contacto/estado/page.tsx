import type { Metadata } from 'next';

import { Button, Container, Heading } from '@/components/ui';
import {
  CONTACT_STATUS_PARAM,
  CONTACT_STATUS_PATH,
  isContactStatusCode,
  type ContactStatusCode,
} from '@/lib/contact-status';
import { buildMetadata } from '@/lib/seo';

/**
 * Landing page for a form submitted WITHOUT JavaScript.
 *
 * With JavaScript the forms never navigate: they fetch, stay put and write the
 * outcome into their own `role="status"` region. This page exists for the other
 * case, where the browser performs a real POST and something has to be rendered
 * afterwards. `/api/contact` answers that POST with a 303 to here.
 *
 * The `estado` parameter is validated against the closed union in
 * `@/lib/contact-status` and then THROWN AWAY: every word below is ours, so a
 * hand-crafted URL cannot put text of its own on the page (OWASP A03/A09).
 * Anything unrecognised degrades to the generic failure, never to a blank page.
 *
 * `noIndex` because this URL only makes sense as the tail of a submission.
 */
export const metadata: Metadata = buildMetadata({
  title: 'Estado de tu mensaje',
  description: 'Resultado del envío del formulario de contacto del estudio.',
  path: CONTACT_STATUS_PATH,
  noIndex: true,
});

interface StatusCopy {
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly tone: 'success' | 'error';
}

const STATUS_COPY: Record<ContactStatusCode, StatusCopy> = {
  ok: {
    eyebrow: 'Mensaje recibido',
    title: 'Gracias, ya lo tenemos',
    body: 'Una persona del equipo lo revisa y te responde en menos de 24 horas hábiles. No hace falta que vuelvas a enviarlo.',
    tone: 'success',
  },
  invalid: {
    eyebrow: 'Revisión necesaria',
    title: 'Faltan datos para poder responderte',
    body: 'Algún campo quedó incompleto o con un formato que no pudimos leer. Vuelve al formulario, revisa el nombre, el correo y el mensaje, y envíalo otra vez.',
    tone: 'error',
  },
  'rate-limited': {
    eyebrow: 'Demasiados envíos',
    title: 'Recibimos varios intentos seguidos',
    body: 'Espera un minuto y vuelve a enviar el formulario. Si ya nos escribiste antes, es probable que el mensaje haya llegado.',
    tone: 'error',
  },
  error: {
    eyebrow: 'Error del servidor',
    title: 'No pudimos procesar el envío',
    body: 'Falló algo de nuestro lado. Inténtalo de nuevo en unos minutos o escríbenos directamente por correo.',
    tone: 'error',
  },
};

interface ContactStatusPageProps {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ContactStatusPage({ searchParams }: ContactStatusPageProps) {
  const params = await searchParams;
  const raw = params[CONTACT_STATUS_PARAM];
  const value = Array.isArray(raw) ? raw[0] : raw;
  const code: ContactStatusCode = isContactStatusCode(value) ? value : 'error';
  const copy = STATUS_COPY[code];

  return (
    <main id="main" className="flex min-h-svh items-center py-24">
      <Container width="prose">
        <p
          className={`font-display text-sm tracking-widest uppercase ${
            copy.tone === 'success' ? 'text-teal' : 'text-accent-link'
          }`}
        >
          {copy.eyebrow}
        </p>

        <Heading level={1} size="xl" className="mt-4">
          {copy.title}
        </Heading>

        <p className="mt-5 text-lg text-muted">{copy.body}</p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/">Volver a la portada</Button>
          {code === 'ok' ? null : (
            <Button href="/#contacto" variant="ghost">
              Volver al formulario
            </Button>
          )}
        </div>
      </Container>
    </main>
  );
}
