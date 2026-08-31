/**
 * Renders a schema.org JSON-LD graph.
 *
 * Always pass a graph built by `graph(...)` from `@/lib/seo` rather than a bare node,
 * so the `@id` cross-references between Organization/WebSite/page nodes resolve.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
