import { z } from 'zod';

import type { ContactValidationMessages } from './Cta.types';

/**
 * Client-side mirror of the schema in src/app/api/contact/route.ts.
 *
 * "Mirror", not "replacement": this only exists to give immediate, readable
 * feedback. The server re-validates every field on its own (OWASP A01/A03) and
 * nothing here is ever trusted. If the two drift, the server wins and the user
 * sees the generic error message.
 *
 * The messages are injected instead of hard-coded so all copy stays in
 * Cta.content.ts.
 */
export const CONTACT_BUDGET_VALUES = ['under-5k', '5k-15k', '15k-50k', 'over-50k'] as const;

export function createContactFormSchema(messages: ContactValidationMessages) {
  return z
    .object({
      name: z.string().trim().min(2, messages.nameMin).max(80, messages.nameMax),
      email: z
        .string()
        .trim()
        .min(1, messages.emailInvalid)
        .max(160, messages.emailInvalid)
        .email(messages.emailInvalid),
      company: z.string().trim().max(120, messages.companyMax).optional(),
      message: z.string().trim().min(20, messages.messageMin).max(2000, messages.messageMax),
      budget: z
        .enum(CONTACT_BUDGET_VALUES, {
          errorMap: () => ({ message: messages.budgetInvalid }),
        })
        .optional(),
      consent: z.literal(true, {
        errorMap: () => ({ message: messages.consentRequired }),
      }),
      /**
       * Honeypot. Always sent (usually empty) so the payload shape is constant
       * and a bot cannot tell the difference between a pass and a rejection.
       */
      website: z.string().max(200).optional(),
    })
    .strict();
}

export type ContactFormPayload = z.infer<ReturnType<typeof createContactFormSchema>>;
