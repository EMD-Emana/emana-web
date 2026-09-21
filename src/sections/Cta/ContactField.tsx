import { cn } from '@/lib/cn';

import type { ContactFieldProps } from './Cta.types';

/**
 * One labelled form control.
 *
 * Accessibility contract:
 *  - a real <label for> — never a placeholder standing in for a label;
 *  - hint and error are linked with aria-describedby, so a screen reader hears
 *    the problem when it lands on the field, not only in the status region;
 *  - aria-invalid is set only while the field is actually invalid;
 *  - the boundary uses --color-border-strong (3.77:1), the token reserved for
 *    interactive edges, so the control is visible without relying on the label.
 */
const CONTROL =
  'w-full rounded-card border border-border-strong bg-base px-4 py-3 text-sm text-text transition-colors duration-200 placeholder:text-muted hover:border-accent-link disabled:cursor-not-allowed disabled:opacity-60';

export function ContactField({ field, error, optionalLabel, disabled }: ContactFieldProps) {
  const id = `contact-${field.name}`;
  const hintId = field.hint === undefined ? undefined : `${id}-hint`;
  const errorId = error === undefined ? undefined : `${id}-error`;
  const describedBy = [hintId, errorId].filter((value): value is string => value !== undefined);

  const shared = {
    id,
    name: field.name,
    disabled,
    required: field.required,
    'aria-describedby': describedBy.length === 0 ? undefined : describedBy.join(' '),
    'aria-invalid': error === undefined ? undefined : (true as const),
  };

  return (
    <div className={cn('flex flex-col gap-2', field.span === 'full' ? 'sm:col-span-2' : null)}>
      <label htmlFor={id} className="text-sm font-medium text-text">
        {field.label}
        {field.required ? null : <span className="ml-1 text-muted">{optionalLabel}</span>}
      </label>

      {field.kind === 'textarea' ? (
        <textarea
          {...shared}
          rows={field.rows ?? 4}
          placeholder={field.placeholder}
          className={cn(CONTROL, 'resize-y')}
        />
      ) : null}

      {field.kind === 'select' ? (
        <select {...shared} defaultValue="" className={CONTROL}>
          {(field.options ?? []).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : null}

      {field.kind === 'text' || field.kind === 'email' ? (
        <input
          {...shared}
          type={field.kind}
          placeholder={field.placeholder}
          autoComplete={field.autoComplete}
          className={CONTROL}
        />
      ) : null}

      {field.hint === undefined ? null : (
        <p id={hintId} className="text-xs text-muted">
          {field.hint}
        </p>
      )}

      {error === undefined ? null : (
        <p id={errorId} className="text-xs font-medium text-accent-link">
          {error}
        </p>
      )}
    </div>
  );
}
