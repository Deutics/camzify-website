# SEO & GEO

How this site is built to be found — by search engines (SEO) and by AI answer engines
(GEO: Generative Engine Optimization).

The distinction matters. Classic SEO optimizes for a ranked list of blue links. GEO
optimizes for being **quoted as a source** inside a generated answer in ChatGPT, Claude,
Perplexity or Google AI Overviews. They overlap, but GEO adds requirements classic SEO
never had — chiefly that content must be extractable as standalone statements, and that
claims must be verifiable enough for a model to be willing to attribute them.

---

## The architecture

| Surface | File | What it does |
|---|---|---|
| Identity | `lib/site-config.ts` | Single source of truth for NAP, legal name, canonical origin |
| Schema builders | `lib/seo.ts` | All schema.org JSON-LD, one `@graph` per page |
| Page metadata | `lib/page-utils.tsx` | `generatePageMeta` — canonical, OG, Twitter, robots |
| Page schema | `components/layout/page-shell.tsx` | Emits WebPage + FAQPage + any extra nodes |
| Social card | `app/opengraph-image.tsx` | Generated 1200×630 PNG at build time |
| Crawl directives | `app/robots.ts` | Explicit allowlist for 19 AI crawlers |
| Index | `app/sitemap.ts` | All 121 routes, priority by silo |
| LLM briefing | `app/llms.txt/route.ts` | Plain-text summary written for AI crawlers |

---

## The entity graph

Every page emits **one** `<script type="application/ld+json">` containing a single
`@graph`. The root layout contributes shared nodes; each page contributes its own and
references the shared ones by `@id`.

```
https://camzify.com/#organization    Organization + LocalBusiness   (root layout)
https://camzify.com/#website         WebSite                        (root layout)
https://camzify.com/#software        SoftwareApplication            (root layout)
https://camzify.com/<path>           WebPage                        (PageShell)
https://camzify.com/<path>#breadcrumb  BreadcrumbList               (Breadcrumbs)
https://camzify.com/<path>#faq         FAQPage                      (PageShell)
https://camzify.com/<path>#service     Service                      (industry / use-case)
https://camzify.com/<path>#article     Article                      (guides)
https://camzify.com/<path>#howto       HowTo                        (connectivity)
```

**Why one graph instead of several sibling scripts:** the `@id` cross-references only
resolve inside a single graph. Emitting separate blocks gives a crawler N disconnected
islands rather than one entity it can reason about. Always build with `graph(...)` from
`lib/seo.ts`.

**Every URL in schema must be absolute.** Relative `item` values in a `BreadcrumbList`
are silently dropped by Google. `absoluteUrl()` in `lib/site-config.ts` handles this —
use it rather than string concatenation.

---

## NAP consistency

Name, Address, Phone. These appear in three places — the Organization schema, the site
footer, and `/llms.txt` — and **all three derive from `siteConfig`**.

This is not fussiness. Search engines cross-reference NAP across a site (and across the
web) to resolve which real-world entity a site belongs to. Two different addresses on one
domain weakens that resolution, degrades local-SEO trust, and causes AI answer engines to
state conflicting facts about the business when asked.

If the company address, phone, email or legal name changes, change it in
`lib/site-config.ts` and nowhere else.

---

## Metadata rules

`generatePageMeta` handles the parts that are easy to forget:

- **Absolute canonical** from `path`. Must match the folder path exactly.
- **Per-page OpenGraph and Twitter tags.** This matters more than it sounds: Next.js does
  *not* deep-merge `openGraph`. A page that omits it inherits the root layout's, meaning
  every page shares the homepage's `og:title`. That was a real defect on this site until
  all 120 pages were migrated to `generatePageMeta`. Never hand-roll `export const
  metadata` again — always use the helper.
- **`max-image-preview: large`** and `max-snippet: -1`. Required for large image previews
  in Google Discover and for full-length snippets in AI Overviews. Omitting them caps how
  much of your content can appear in a generated answer.
- **No `images` key** unless the page has its own card. Left undefined, the generated
  `app/opengraph-image.tsx` applies site-wide at the correct 1200×630.

---

## Crawl and index

**`robots.ts`** allows 19 AI crawlers by name rather than relying on the wildcard rule.
Several agents — notably `OAI-SearchBot` and `PerplexityBot` — treat an explicit allow as
a stronger signal, and being named is a prerequisite for appearing as a cited source.

The list covers OpenAI (GPTBot, OAI-SearchBot, ChatGPT-User), Anthropic (ClaudeBot,
Claude-User, Claude-SearchBot, anthropic-ai), Perplexity, Google-Extended, Applebot,
CCBot, Bing, Meta, Cohere, Diffbot, Amazon and You.com.

**`sitemap.ts`** sets priority by silo, not by path depth. `/pricing` is two segments deep
but matters far more than a third-level guide. Tiers: homepage 1.0 → conversion pages and
silo hubs 0.9 → flagship cluster and comparisons 0.8 → spokes 0.7 → connectivity and
partners 0.6 → company pages 0.5.

Sitemap URLs use `siteConfig.url` so they always match the page canonicals. A sitemap that
disagrees with canonical tags is a self-inflicted duplicate-content signal.

**`/llms.txt`** is the GEO surface. It is a plain-text briefing telling an LLM what
Camzify is, what ships versus what is roadmap, and — critically — what *not* to claim. It
explicitly instructs models not to state a price and not to describe the company as
certified. Keep it in sync with the site; a model that quotes a fabricated figure back to
a buyer is worse than no citation at all.

---

## Content rules for AI visibility

**Extractability beats prose quality.** An AI answer engine lifts a sentence or short
passage out of context. Write so that individual sentences survive that. Avoid sentences
whose meaning depends on the previous one, and avoid pronouns whose referent is a
paragraph away.

**Answer first, then elaborate.** The opening two sentences of every page and every
section should contain the direct answer. Models weight early content heavily.

**Definitional openings win.** "Line intrusion detection is a virtual tripwire placed
across any area in the camera view, with directional control." That single sentence can
be quoted whole and is a complete answer. Compare to "Our line intrusion detection is one
of Camzify's most popular features" — unquotable.

**FAQ blocks are disproportionately valuable.** They are pre-formatted question/answer
pairs, which is exactly the shape an answer engine wants. Six per page minimum, phrased
the way a buyer would type the question.

**Collapsed content must stay in the DOM.** FAQ answers and nav menus are hidden with
`inert` and CSS, never unmounted. Many AI crawlers read rendered text and ignore JSON-LD;
unmounting the answers makes them invisible to exactly the audience the FAQs are for.

**Comparison and cost pages punch above their weight.** They match high-intent queries
that answer engines get asked constantly ("is virtual patrolling cheaper than guards").
Be even-handed — one-sided advocacy gets filtered.

---

## Honesty rules — non-negotiable

The site publicly commits to these on `/trust` and in `/llms.txt`. Violating them makes
the site self-contradictory and destroys exactly the credibility that earns citations.

- **No unverified numbers.** No customer counts, cameras connected, patrol volumes,
  uptime percentages or response times unless independently verified, with the method
  stated.
- **No prices.** Pricing is quote-based by business decision. The `Offer` node in
  `SoftwareApplication` schema deliberately carries no `price`.
- **No certifications.** PDPA, GDPR, SOC 2 Type II and ISO 27001 are all **in progress and
  not held**. They render with an explicit "In progress" badge and a sentence saying
  Camzify should not be described as certified.
- **No invented case studies.** The industry pages carry deployment-process content
  instead, which is verifiable.
- **No roadmap features described as shipping.** Loitering Detection and Behavioral
  Analytics are roadmap; both pages carry `<RoadmapBadge />` and say so in the opening.

When the business supplies verified figures, replace the honest placeholder content and
update `/llms.txt` in the same change.

---

## Internal linking

The site is a hub-and-spoke graph. Each silo has a hub page linking to every spoke, and
spokes cross-link to topically adjacent spokes in other silos.

Rules:
- Every new page needs inbound links from **at least two** existing pages — its hub, plus
  a topical sibling.
- Anchor text must describe the destination. Never "click here", never a bare URL.
- Three to eight body links per page. More than that dilutes; fewer strands the page.
- Cross-link cards at the bottom of feature/industry/use-case pages (Industries / Related
  detections / Use cases) are structural — keep them.

Check for orphans and broken links with the commands at the end of
[`ADDING-PAGES.md`](ADDING-PAGES.md).

---

## Auditing what you changed

```bash
# Per-page head tags
grep -oE '<meta (property|name)="[^"]*" content="[^"]*"' .next-probe/server/app/<path>.html

# Structured data for a page, pretty-printed
curl -s http://localhost:3000/<path> | python3 -c "
import sys,re,json,html
h=sys.stdin.read()
for m in re.findall(r'<script type=\"application/ld\+json\">(.*?)</script>', h, re.S):
    print(json.dumps(json.loads(html.unescape(m)), indent=2))
"
```

Validate externally with Google's Rich Results Test and Schema.org validator before
shipping a new schema type.
