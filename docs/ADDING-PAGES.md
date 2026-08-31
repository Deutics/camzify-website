# Adding Pages

The single most common task in this repo. Read this before creating any route.

Every page on this site exists to win a specific search intent and to be quotable by an
AI answer engine. A page that renders correctly but skips the wiring below is invisible,
which is the same as not existing.

---

## The five steps — none are optional

| # | Step | Where |
|---|---|---|
| 1 | Create the route with the category template | `app/<silo>/<slug>/page.tsx` |
| 2 | Add it to the navigation | `lib/site-config.ts` → `navItems` |
| 3 | Add it to the sitemap | `app/sitemap.ts` → the matching group |
| 4 | Link to it from **at least two** existing pages | the relevant hub + a sibling |
| 5 | Verify | `tsc` → build → SSR lint → check the rendered `<head>` |

Step 4 is the one people skip. A page reachable only from the nav has almost no internal
link equity. The hub page for its silo must link to it, and at least one topically
adjacent page must link to it in body copy with descriptive anchor text.

---

## Anatomy of every page

Every `page.tsx` follows this skeleton regardless of category:

```tsx
import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { FAQAccordion } from '@/components/content/faq-accordion';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data.
 */
const pageMeta = {
  title: 'Primary Keyword | Secondary Qualifier',
  description: 'One sentence, 140–160 chars, leading with the answer.',
  path: '/silo/slug',
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: '...', answer: '...' },
];

export default function ExamplePage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Silo', href: '/silo' },
      { label: 'This Page' },
    ]}>
      {/* sections */}
    </PageShell>
  );
}
```

**Rules that apply to all of them:**

- `pageMeta.path` must exactly match the folder path. It drives the canonical URL, the
  `og:url`, and every schema `@id`. A mismatch silently produces a wrong canonical.
- `faqs` is passed to `PageShell`, **not** to a separate schema block. `PageShell` emits
  the `FAQPage` node from the same array `FAQAccordion` renders, so the structured data
  and the visible answers cannot drift apart. Google penalises FAQ schema that does not
  match visible content.
- Exactly one `<h1>`, matching the primary keyword. Section headings are `<h2>`,
  sub-points `<h3>`. Never skip a level for styling — use classes.
- `PageShell` renders the closing CTA band automatically. Pass `showCTA={false}` only on
  pages that already end in a form (`/contact`).

---

## Category recipes

### AI Feature — `/ai-features/<slug>`

The largest silo (23 pages). One detection capability per page.

**Schema:** none extra — `PageShell` handles WebPage + FAQPage.
**Nav:** `lib/site-config.ts` → `AI Features` → the right `groups[].items[]`.
**Sitemap:** `aiFeatures` group.

**Required sections, in order:**
1. `<h1>` + a definition paragraph that answers "what is X" in the first two sentences
2. "This capability detects and alerts on:" — a bulleted list of concrete triggers
3. "Why X matters" — the problem framing, 3 paragraphs
4. "How it works" — `<h3>` per mechanism, linking to related detections
5. "Configuration" — what the operator can actually set
6. "Common scenarios" — 5 realistic situations
7. "In a patrol round" — how it contributes to a patrol (ties into the flagship product)
8. Three cross-link cards: Industries / Related detections / Use cases
9. FAQ section (6 questions minimum)

If the feature is not shipping, add `<RoadmapBadge />` from
`@/components/content/roadmap-badge` and say so plainly in the opening paragraph. Two
existing pages do this — copy `app/ai-features/loitering-detection/page.tsx`.

---

### Industry — `/industries/<slug>`

**Schema:** add `serviceSchema` with an `audience`.
**Nav:** `Industries` → the right `groups[].items[]`.
**Sitemap:** `industries` group.

```tsx
import { serviceSchema } from '@/lib/seo';
import { DeploymentPlan } from '@/components/content/deployment-plan';

<PageShell
  {...pageMeta}
  schema={[serviceSchema({
    name: 'AI Security for Warehouses',
    description: pageMeta.description,
    path: pageMeta.path,
    audience: 'Warehouses',
  })]}
  faqs={faqs}
  breadcrumbs={[{ label: 'Industries', href: '/industries' }, { label: 'Warehouses' }]}
>
```

**Required sections:** gaps this industry has → why continuous monitoring → how Camzify
works here → what to configure → common scenarios → deployment notes →
`<DeploymentPlan phases={deploymentPhases} />` → cross-link cards → FAQ.

**`deploymentPhases` must be written specifically for that industry.** Sixteen pages
sharing one generic block reads as boilerplate to both buyers and search engines. Three
phases, each naming real equipment, zones and schedules for that vertical.

---

### Use case — `/use-cases/<slug>`

Same shape as Industry, but `serviceSchema` **without** `audience` (a use case is a
scenario, not an audience). Sitemap group `useCases`.

---

### Guide — `/guides/<slug>`

Top-of-funnel editorial. These are the pages most likely to be cited by AI answer
engines, so they carry the strictest content rules.

**Schema:** `articleSchema`. **Metadata:** must pass `type: 'article'` plus dates.

```tsx
import { articleSchema } from '@/lib/seo';

const pageMeta = { title: '...', description: '...', path: '/guides/slug' };
const published = '2026-08-31';

export const metadata = generatePageMeta({
  ...pageMeta,
  type: 'article',
  publishedTime: published,
  modifiedTime: published,
});

<PageShell
  {...pageMeta}
  schema={[articleSchema({
    headline: 'Guide Title Without The Suffix',
    description: pageMeta.description,
    path: pageMeta.path,
    datePublished: published,
    dateModified: published,
  })]}
  breadcrumbs={[{ label: 'Guides', href: '/guides' }, { label: 'Guide Title' }]}
>
```

**Update `modifiedTime` and `dateModified` whenever you materially edit a guide.**
Freshness is a ranking input and a stale date on revised content is a wasted signal.

**Never put a year in a guide title** (`| 2024 Rates`). It ages into a liability and
tanks click-through the moment the year turns.

---

### Comparison — `/compare/<slug>`

Bottom-funnel. Use `ComparisonTable` from `@/components/content/comparison-table`.

Be genuinely even-handed. Comparison pages that read as pure advocacy get filtered by AI
answer engines, which is the exact traffic these pages exist to capture. Where a
competitor or the traditional approach is better, say so — the site already does this on
`/virtual-patrolling/vs-security-guards` ("Physical response capability: requires guard on
call").

---

### Platform module — `/platform/<slug>`

Product-surface pages. These are the only pages with real product screenshots.

```tsx
import Image from 'next/image';

<Image
  src="/screenshot.png"
  alt="Specific description of what the screen shows and what data is visible"
  width={1229}
  height={692}
  priority
  sizes="(max-width: 1024px) 100vw, 60vw"
  className="w-full"
/>
```

`width`/`height` must be the file's **real** dimensions — check with
`sips -g pixelWidth -g pixelHeight public/<file>.png`. The hero image is the LCP element,
so it gets `priority`; every other image gets `loading="lazy"`.

Most platform pages also render a GSAP mockup from `components/mockups/`.

---

### Camera connectivity — `/camera-connectivity/<slug>`

Protocol setup walkthroughs. These should carry `howToSchema`:

```tsx
import { howToSchema } from '@/lib/seo';

schema={[howToSchema({
  name: 'How to connect an RTSP camera to Camzify',
  description: pageMeta.description,
  path: pageMeta.path,
  steps: [
    { name: 'Find the RTSP URL', text: '...' },
    { name: 'Install the Connector', text: '...' },
  ],
})]}
```

The `steps` array must match the visible numbered steps on the page, one for one.

---

### Partner — `/partners/<slug>`

Channel pages. Describe how partnering works structurally. **Do not publish margins,
discount tiers or commercial terms** — those are negotiated per partner and are not
public.

---

## Content rules that decide whether the page ranks

These are the ones that matter most. Full reasoning in [`SEO-GEO.md`](SEO-GEO.md).

**Answer in the first two sentences.** AI answer engines extract the opening. Lead with
the direct definition or answer, then expand. Never open with a preamble.

**Write extractable units.** Short declarative sentences that stand alone when quoted out
of context. A sentence that only makes sense after reading the previous paragraph cannot
be cited.

**One page, one intent.** If a page targets two different searches, it will rank for
neither. Split it.

**Title tag:** primary keyword first, 50–60 characters, pipe-separated qualifier. The
site name is appended automatically by the layout template — do not add "| Camzify".

**Meta description:** 140–160 characters, contains the primary keyword, describes the
answer rather than the page ("Camzify line intrusion detection places a virtual tripwire
across any area" — not "Learn about our line intrusion detection feature").

**FAQs must be real questions** buyers ask, phrased how they would type them. Six
minimum. Answers 40–90 words — long enough to be a complete answer, short enough to be
quoted whole.

**Internal links must use descriptive anchor text.** `virtual patrolling`, not
`click here` and not a bare URL. Three to eight body links per page, pointing at pages
that genuinely help the reader.

**Never invent a fact.** See `CLAUDE.md` § Hard rules. No prices, no customer counts, no
uptime figures, no certifications.

---

## Verification

```bash
npx tsc --noEmit && NEXT_DIST_DIR=.next-probe npx next build && npx eslint -c eslint.ssr.config.mjs .
```

Then confirm the page's own output:

```bash
grep -oE '<meta property="og:(title|url)" content="[^"]*"' .next-probe/server/app/<silo>/<slug>.html
```

`og:title` must be this page's title, not the homepage's. `og:url` must be the canonical
absolute URL. If either is wrong, `pageMeta` is wrong.

Finally, confirm the link graph has no orphans:

```bash
find app -name 'page.tsx' | sed 's|^app||; s|/page.tsx$||; s|^$|/|' | sort -u > /tmp/routes.txt
grep -rhoE "href: '(/[a-zA-Z0-9_/-]*)'|href=\"(/[a-zA-Z0-9_/-]*)\"" app components lib \
  | sed "s/href[:=] *//; s/[\"']//g" | sort -u > /tmp/hrefs.txt
comm -23 /tmp/hrefs.txt /tmp/routes.txt   # broken links — must be empty
comm -13 /tmp/hrefs.txt /tmp/routes.txt   # orphan pages — investigate each
```
