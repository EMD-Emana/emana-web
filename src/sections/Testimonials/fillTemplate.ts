/**
 * Replaces {token} placeholders in a content string.
 *
 * It exists so no component ever concatenates Spanish by hand: the full
 * sentence, including word order, stays editable in Testimonials.content.ts.
 */
export type TemplateValues = Readonly<Record<string, string | number | undefined>>;

export function fillTemplate(template: string, values: TemplateValues): string {
  return template.replace(/\{(\w+)\}/g, (match: string, key: string) =>
    values[key] === undefined ? match : String(values[key]),
  );
}
