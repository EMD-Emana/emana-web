import type { Metadata } from 'next';

import { Button, Container, Heading } from '@/components/ui';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Página no encontrada',
  description: 'La página que buscas no existe o cambió de dirección.',
  path: '/404',
  noIndex: true,
});

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-svh items-center py-24">
      <Container width="prose">
        <p className="font-display text-sm tracking-widest text-accent-link uppercase">Error 404</p>

        <Heading level={1} size="xl" className="mt-4">
          No encontramos esta página
        </Heading>

        <p className="mt-5 text-lg text-muted">
          Puede que el enlace haya cambiado o que la dirección esté incompleta. Desde la portada
          llegas a todo el contenido del sitio.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/">Volver a la portada</Button>
          <Button href="/#contacto" variant="ghost">
            Escribir al equipo
          </Button>
        </div>
      </Container>
    </main>
  );
}
