/**
 * Outcome vocabulary shared by POST /api/contact and the page a no-JavaScript
 * submission lands on.
 *
 * WHY IT LIVES IN lib/ — the route writes these codes into a `Location` header
 * and `/contacto/estado` reads them back out of the query string. Two files
 * agreeing on the same four strings by eye is how a redirect quietly starts
 * pointing at a message nobody wrote, so both import the union from here.
 *
 * The codes are opaque machine values, exactly like the HTTP status they stand
 * for: the page maps them onto its own Spanish copy and NEVER renders the raw
 * parameter, so a hand-edited URL cannot put attacker text on the page (A03/A09).
 *
 * The path is Spanish because it is a visible route, like `/privacidad`; the
 * codes are English because they are identifiers.
 */

export const CONTACT_STATUS_CODES = ['ok', 'invalid', 'rate-limited', 'error'] as const;

export type ContactStatusCode = (typeof CONTACT_STATUS_CODES)[number];

/** Page that renders the outcome with the full site chrome. */
export const CONTACT_STATUS_PATH = '/contacto/estado';

/** Query parameter carrying the code. */
export const CONTACT_STATUS_PARAM = 'estado';

export function isContactStatusCode(value: unknown): value is ContactStatusCode {
  return typeof value === 'string' && CONTACT_STATUS_CODES.some((code) => code === value);
}

/**
 * Root-relative on purpose. A relative `Location` can never leave this origin,
 * so neither a spoofed Host header nor a payload field can turn the redirect
 * into an open redirect (OWASP A01/A10).
 */
export function contactStatusLocation(code: ContactStatusCode): string {
  return `${CONTACT_STATUS_PATH}?${CONTACT_STATUS_PARAM}=${code}`;
}
