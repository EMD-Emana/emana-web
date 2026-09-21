/**
 * Safe JSON-LD rendering.
 *
 * OWASP A03 (Injection): this is the ONLY place in the codebase allowed to use
 * dangerouslySetInnerHTML, and the value it receives is always
 * JSON.stringify(object) with `<`, `>`, `&` and the JS line terminators escaped,
 * so a payload can never break out of the <script> element.
 */
export type JsonPrimitive = string | number | boolean | null;

export type JsonValue = JsonPrimitive | readonly JsonValue[] | { readonly [key: string]: JsonValue };

export interface JsonLdObject {
  readonly '@context'?: string;
  readonly '@type': string;
  readonly [key: string]: JsonValue | undefined;
}

/**
 * Characters that must never appear literally inside a <script> body.
 *
 * Each maps to its JSON `\uXXXX` ESCAPE SEQUENCE (a real backslash + "u" + four
 * hex digits), not back to the character itself. JSON.parse turns the sequence
 * into the original character, so the structured data a crawler reads is
 * unchanged, while the raw bytes in the HTML can no longer close the element
 * or open a new tag.
 *
 * U+2028 / U+2029 are included because they are legal inside a JSON string but
 * are line terminators in JavaScript source, which breaks any consumer that
 * evaluates the payload. Both sides are written as escape sequences so this
 * file itself never contains a literal line terminator.
 */
const ESCAPES: Readonly<Record<string, string>> = {
  '<': '\\u003c',
  '>': '\\u003e',
  '&': '\\u0026',
  '\u2028': '\\u2028',
  '\u2029': '\\u2029',
};

const UNSAFE_CHARACTERS = /[<>&\u2028\u2029]/g;

export function serializeJsonLd(data: JsonLdPayload): string {
  return JSON.stringify(data).replace(
    UNSAFE_CHARACTERS,
    (character) => ESCAPES[character] ?? character,
  );
}

/**
 * A `@graph` document: one script tag holding every node of a page.
 *
 * Preferred over several sibling <script> tags because the nodes cross-reference
 * each other by `@id` (a Service points at the Organization, a BlogPosting at
 * its Blog). Inside one graph those references resolve without the consumer
 * having to stitch documents together.
 */
export interface JsonLdGraph {
  readonly '@context': string;
  readonly '@graph': readonly JsonLdObject[];
}

const SCHEMA_CONTEXT = 'https://schema.org';

/**
 * Merges nodes into a single graph.
 *
 * Each node's own `@context` is dropped: the graph carries it once, and a
 * repeated context on every member is redundant noise in the payload. Nodes are
 * de-duplicated by `@id` (first one wins) so two sections describing the same
 * entity cannot emit it twice.
 */
export function buildJsonLdGraph(nodes: readonly JsonLdObject[]): JsonLdGraph {
  const seenIds = new Set<string>();
  const graph: JsonLdObject[] = [];

  for (const node of nodes) {
    const id = node['@id'];

    if (typeof id === 'string') {
      if (seenIds.has(id)) {
        continue;
      }

      seenIds.add(id);
    }

    const member: Record<string, JsonValue | undefined> = {};

    for (const [key, value] of Object.entries(node)) {
      if (key !== '@context') {
        member[key] = value;
      }
    }

    graph.push(member as JsonLdObject);
  }

  return { '@context': SCHEMA_CONTEXT, '@graph': graph };
}

export type JsonLdPayload = JsonLdObject | readonly JsonLdObject[] | JsonLdGraph;

export interface JsonLdProps {
  readonly data: JsonLdPayload;
  /** Stable id so React does not re-create the node between navigations. */
  readonly id?: string;
}

export function JsonLd({ data, id }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

/* ---------------------------------------------------------------------------
   Site-level schema builders. Section-level builders live next to their section
   in src/sections/<Name>/<Name>.schema.ts.
--------------------------------------------------------------------------- */

export interface OrganizationSchemaInput {
  readonly name: string;
  readonly url: string;
  readonly logoUrl: string;
  readonly description: string;
  readonly email?: string;
  readonly sameAs?: readonly string[];
  readonly areaServed?: readonly string[];
}

export function buildOrganizationSchema({
  name,
  url,
  logoUrl,
  description,
  email,
  sameAs,
  areaServed,
}: OrganizationSchemaInput): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${url}#organization`,
    name,
    url,
    description,
    logo: logoUrl,
    ...(email === undefined ? {} : { email }),
    ...(sameAs === undefined ? {} : { sameAs: [...sameAs] }),
    ...(areaServed === undefined ? {} : { areaServed: [...areaServed] }),
  };
}

export interface WebSiteSchemaInput {
  readonly name: string;
  readonly url: string;
  readonly description: string;
  readonly inLanguage: string;
}

export function buildWebSiteSchema({
  name,
  url,
  description,
  inLanguage,
}: WebSiteSchemaInput): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${url}#website`,
    name,
    url,
    description,
    inLanguage,
    publisher: { '@id': `${url}#organization` },
  };
}

export interface BreadcrumbItem {
  readonly name: string;
  readonly url: string;
}

export function buildBreadcrumbSchema(items: readonly BreadcrumbItem[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
