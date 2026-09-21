'use client';

import { useMemo, useState, type FormEvent } from 'react';

import { Button } from '@/components/ui';
import { cn } from '@/lib/cn';

import { ContactField } from './ContactField';
import type { ContactErrorKey, ContactFormProps, ContactStatusMessages } from './Cta.types';
import { createContactFormSchema } from './Cta.validation';

type FieldErrors = Partial<Record<ContactErrorKey, string>>;

interface FormStatus {
  readonly tone: 'success' | 'error';
  readonly message: string;
}

/** Declaration order, so focus lands on the FIRST invalid control on the page. */
const ERROR_KEYS: readonly ContactErrorKey[] = [
  'name',
  'email',
  'company',
  'budget',
  'message',
  'consent',
];

function isErrorKey(value: unknown): value is ContactErrorKey {
  return typeof value === 'string' && ERROR_KEYS.some((key) => key === value);
}

/**
 * Maps an HTTP status onto OUR copy. The response body is never read or shown:
 * the API answers with opaque codes on purpose (OWASP A09) and echoing anything
 * back would undo that.
 */
function messageForResponse(status: number, messages: ContactStatusMessages): string {
  if (status === 429) {
    return messages.rateLimited;
  }

  return status >= 400 && status < 500 ? messages.invalid : messages.server;
}

function focusFirstInvalid(form: HTMLFormElement, errors: FieldErrors): void {
  const firstKey = ERROR_KEYS.find((key) => errors[key] !== undefined);

  if (firstKey === undefined) {
    return;
  }

  // The selector name comes from our own union type, never from user input.
  const control = form.elements.namedItem(firstKey);

  if (control instanceof HTMLElement) {
    control.focus();
  }
}

export function ContactForm({ content, labelledById }: ContactFormProps) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus | null>(null);
  const [pending, setPending] = useState(false);

  const schema = useMemo(() => createContactFormSchema(content.validation), [content.validation]);

  async function submit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (pending) {
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);
    const read = (key: string): string => String(data.get(key) ?? '').trim();
    const company = read('company');
    const budget = read('budget');

    const parsed = schema.safeParse({
      name: read('name'),
      email: read('email'),
      ...(company === '' ? {} : { company }),
      message: read('message'),
      ...(budget === '' ? {} : { budget }),
      consent: data.get('consent') !== null,
      website: read(content.honeypot.name),
    });

    if (!parsed.success) {
      const nextErrors: FieldErrors = {};

      for (const issue of parsed.error.issues) {
        const key = issue.path[0];

        if (isErrorKey(key) && nextErrors[key] === undefined) {
          nextErrors[key] = issue.message;
        }
      }

      setErrors(nextErrors);
      setStatus({ tone: 'error', message: content.messages.invalid });
      focusFirstInvalid(form, nextErrors);

      return;
    }

    setErrors({});
    setStatus(null);
    setPending(true);

    try {
      const response = await fetch(content.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(parsed.data),
      });

      if (response.ok) {
        form.reset();
        setStatus({ tone: 'success', message: content.messages.success });
      } else {
        setStatus({
          tone: 'error',
          message: messageForResponse(response.status, content.messages),
        });
      }
    } catch {
      setStatus({ tone: 'error', message: content.messages.network });
    } finally {
      setPending(false);
    }
  }

  const statusTone =
    status === null ? 'text-muted' : status.tone === 'success' ? 'text-teal' : 'text-accent-link';

  return (
    <form
      noValidate
      aria-labelledby={labelledById}
      aria-busy={pending}
      onSubmit={(event) => {
        void submit(event);
      }}
      className="relative mt-6 flex flex-col gap-6"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {content.fields.map((field) => (
          <ContactField
            key={field.name}
            field={field}
            error={errors[field.name]}
            optionalLabel={content.optionalLabel}
            disabled={pending}
          />
        ))}
      </div>

      {/* Honeypot: off-screen, untabbable and hidden from assistive tech, so only
          a script fills it. The API answers a filled honeypot with a success. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 -left-[9999px] size-px overflow-hidden"
      >
        <label htmlFor="contact-website">{content.honeypot.label}</label>
        <input
          id="contact-website"
          name={content.honeypot.name}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <div>
        <label htmlFor="contact-consent" className="flex items-start gap-3 text-sm text-muted">
          <input
            id="contact-consent"
            name="consent"
            type="checkbox"
            disabled={pending}
            aria-invalid={errors.consent === undefined ? undefined : true}
            aria-describedby={errors.consent === undefined ? undefined : 'contact-consent-error'}
            className="mt-0.5 size-4 shrink-0 rounded-[4px] border border-border-strong bg-base accent-accent"
          />
          <span>{content.consentLabel}</span>
        </label>

        {errors.consent === undefined ? null : (
          <p id="contact-consent-error" className="mt-2 text-xs font-medium text-accent-link">
            {errors.consent}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <Button type="submit" size="lg" fullWidth disabled={pending}>
          {pending ? content.pendingLabel : content.submitLabel}
        </Button>
        <p className="text-xs text-muted">{content.privacyNote}</p>
      </div>

      {/* Always in the DOM so the live region exists before the first message. */}
      <p role="status" className={cn('min-h-5 text-sm font-medium', statusTone)}>
        {status === null ? '' : status.message}
      </p>
    </form>
  );
}
