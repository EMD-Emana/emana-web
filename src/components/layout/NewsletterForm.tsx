'use client';

import { useId, useState, type FormEvent } from 'react';

import { z } from 'zod';

import { Button } from '@/components/ui';
import { cn } from '@/lib/cn';

import type { NewsletterFormProps } from './Footer.types';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Client-side mirror of the server contract. It is a convenience for the person
 * filling the form, NEVER a security control: /api/contact re-validates every
 * field with its own Zod schema and is the only authority (OWASP A01/A03).
 */
const subscriberSchema = z.object({
  email: z.string().trim().email().max(160),
  consent: z.literal(true),
});

const FIELD =
  'h-11 w-full rounded-pill border border-border-strong bg-elevated px-4 text-sm text-text placeholder:text-muted';

/** /api/contact requires a name of 2..80 characters; derive one, never invent data. */
function deriveName(email: string, fallback: string): string {
  const [localPart = ''] = email.split('@');
  const cleaned = localPart.replace(/[^\p{L}\p{N} .'-]/gu, ' ').trim();

  return cleaned.length >= 2 ? cleaned.slice(0, 80) : fallback;
}

/**
 * Newsletter subscription, posted to the site's own contact endpoint.
 *
 * Security notes:
 *  - the honeypot is visually hidden, removed from the tab order and hidden from
 *    assistive technology, so only a bot can fill it (OWASP A04);
 *  - the response BODY is never read or displayed: every message shown here is
 *    one of our own strings, so the server can never echo user input back into
 *    the page (OWASP A09);
 *  - `connect-src 'self'` in the CSP keeps this fetch on our own origin.
 */
export function NewsletterForm({ content, className, action = '/api/contact' }: NewsletterFormProps) {
  const fieldId = useId();
  const emailId = `${fieldId}-email`;
  const consentId = `${fieldId}-consent`;
  const honeypotId = `${fieldId}-website`;
  const statusId = `${fieldId}-status`;

  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === 'submitting') {
      return;
    }

    const parsed = subscriberSchema.safeParse({ email, consent });

    if (!parsed.success) {
      setStatus('error');
      setMessage(consent ? content.invalidEmailMessage : content.consentMessage);
      return;
    }

    setStatus('submitting');
    setMessage('');

    try {
      const response = await fetch(action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: deriveName(parsed.data.email, content.fallbackName),
          email: parsed.data.email,
          message: content.submissionMessage,
          consent: true,
          website: honeypot,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage(content.successMessage);
        setEmail('');
        setConsent(false);
        return;
      }

      setStatus('error');
      setMessage(response.status === 429 ? content.rateLimitMessage : content.errorMessage);
    } catch {
      setStatus('error');
      setMessage(content.errorMessage);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={cn('flex flex-col gap-3', className)}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor={emailId} className="sr-only">
            {content.emailLabel}
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={content.emailPlaceholder}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-describedby={statusId}
            aria-invalid={status === 'error'}
            className={FIELD}
          />
        </div>

        <Button type="submit" size="md" disabled={status === 'submitting'}>
          {status === 'submitting' ? content.submittingLabel : content.submitLabel}
        </Button>
      </div>

      {/* Honeypot. Hidden from sight and from assistive technology, never focusable. */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor={honeypotId}>{content.honeypotLabel}</label>
        <input
          id={honeypotId}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <div className="flex items-start gap-2.5">
        <input
          id={consentId}
          name="consent"
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-1 size-4 shrink-0 accent-accent"
        />
        <label htmlFor={consentId} className="text-xs text-muted">
          {content.consentLabel}
        </label>
      </div>

      <p
        id={statusId}
        role="status"
        aria-live="polite"
        className={cn('min-h-5 text-xs', status === 'error' ? 'text-accent-link' : 'text-teal')}
      >
        {message}
      </p>
    </form>
  );
}
