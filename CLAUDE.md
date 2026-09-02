# CLAUDE.md — agent operating rules for the Camzify website

Read this before touching anything. It is the short list of things that are easy to get
wrong here and expensive to get wrong. Full detail lives in [`docs/`](docs/).

---

## What this project is

A 121-page statically prerendered Next.js 14 marketing site whose entire purpose is
discoverability — organic search, AI answer engines (ChatGPT, Claude, Perplexity, Google
AI Overviews), and conversion to demo requests. There is no application, no auth, no
authenticated area. Treat every change as a change to a publication.

---

## Hard rules

**1. Never hardcode company identity.**
Address, phone, email, legal name, canonical URL all come from `lib/site-config.ts`. The
Organization schema, the footer and `/llms.txt` all derive from it. Two different
addresses on one site breaks entity resolution for search engines and gets the business
wrong answers cited about it in AI search. If you need the address as a string, import
`formattedAddress`.

**2. Never publish a fact the business has not verified.**
No invented prices, customer counts, uptime figures, response times, case studies, or
certifications. Pricing is deliberately quote-based. All four compliance frameworks
(PDPA, GDPR, SOC 2 Type II, ISO 27001) are **in progress and not held** — never render
them as current. If you need a number you do not have, write around it honestly; do not
estimate. `/trust` and `/llms.txt` both state this policy publicly, so violating it makes
the site self-contradictory.

**3. Never run `next build` while the dev server is running.**
They share `.next/` and the build strips the dev server's CSS. Use
`NEXT_DIST_DIR=.next-probe npx next build`.

**4. Never weaken `eslint.ssr.config.mjs`.**
It is a hand-written hydration-safety lint that runs after every build. If it flags your
code, fix the code. `new Date()`, `Math.random()`, `window`, and unlocalised
`toLocaleString` in render are all real hydration bugs. Use `ClientOnly`, `useMounted`,
`SafeDate`, `SafeNumber` from `components/system/`, or hoist the value to module scope
with a comment explaining why it is safe.

**5. Never use literal Tailwind palette colours.**
No `text-emerald-400`, `bg-red-500`, `text-gray-900`. Use the semantic tokens:
`primary`, `muted`, `border`, `card`, `foreground`, and the status tokens `live`, `warn`,
`critical`. Literal palette classes are tuned for one theme and fail contrast in the
other.

**6. Never leave a page out of the sitemap.**
`app/sitemap.ts` must list every route. A page with no sitemap entry and no internal
links is invisible. See `docs/ADDING-PAGES.md` for the checklist.

**7. Never unmount content to hide it.**
Collapsed FAQ answers and closed nav menus stay in the DOM with `inert`. AI crawlers read
rendered text, not just JSON-LD — unmounting content makes it invisible to them.

---

## Where things live

```
app/                    Routes. One folder per URL segment, each with page.tsx
  _components/          Homepage-only sections
  api/                  Four lead-capture POST routes (the only dynamic routes)
components/
  layout/               Header, footer, PageShell, breadcrumbs, CTA band
  content/              Reusable content blocks — most new work goes here
  motion/               Animated / interactive presentation pieces
  mockups/              Faux product UI (GSAP-driven), used instead of screenshots
  system/               Theming, SSR-safety primitives, JSON-LD, form wrapper
  ui/                   shadcn primitives. Re-add more with `npx shadcn@latest add <x>`
lib/
  site-config.ts        Identity + navigation. Single source of truth
  seo.ts                All schema.org builders
  page-utils.tsx        generatePageMeta — every page's <head> metadata
docs/                   The documentation set. Keep it current
```

---

## Voice and positioning

`site-brief.md` at the repo root is the authoritative brief for tone, banned words,
reader, competitors and hard content rules. Read it before writing any copy. It is also
the file the six SEO skills (`keyword-fanout-map`, `seo-content-writer`,
`onpage-optimizer`, `internal-link-architect`, `ai-visibility-checker`) read, so keeping
it accurate keeps their output on-brand.

Target search market is the **United States**. Note the open conflict recorded in the
brief: the copy is written in Commonwealth English while the search target is US.

---

## Adding a page

Do not freehand it. `docs/ADDING-PAGES.md` has a copy-paste template per category and the
five-step checklist (create → wire nav → wire sitemap → cross-link → verify). Every page
must have: a `pageMeta` const, `generatePageMeta`, a `PageShell` with `{...pageMeta}`,
breadcrumbs, at least one FAQ block, and inbound links from at least two existing pages.

---

## Running it

`npm install && npm run dev` — that is all. **No database and no `.env` are required** to
run or build the site; all 121 pages are static and `prisma generate` needs no live
connection. Only the four `/api/*` form endpoints need `.env`. Do not stall trying to
provision a database you do not need.

Port 3000 is often occupied on this machine; the preview config uses 3411.

---

## Verification loop

Run all three before declaring anything done:

```bash
npx tsc --noEmit && NEXT_DIST_DIR=.next-probe npx next build && npx eslint -c eslint.ssr.config.mjs .
```

For visual changes, start the dev server through the preview tooling and check the
rendered result — do not ask the user to look for you.

---

## Things that are already true — do not "fix" them

- **`prisma generate` is in both `build` and `postinstall`.** Not a duplicate — Vercel
  restores `node_modules` from cache and skips `postinstall`. See `docs/DEPLOYMENT.md`.
- **`DATABASE_URL` is the only environment variable.** The Abacus.AI notification
  integration and its five vars were removed; leads are read from the database and
  nothing is emailed. Do not add a notification step back without asking.
- **`images.unoptimized: true` in `next.config.js`** is deliberate for the deploy target.
  Images still use `next/image` with explicit `width`/`height` to prevent layout shift.
- **Opacity stops `15` and `25` are declared in `tailwind.config.ts`.** They are not
  Tailwind defaults; without them `bg-live/15` silently generates no CSS at all.
- **`app/opengraph-image.tsx` generates the social card at build time.** Do not add an
  `images` key to `openGraph` in metadata — it would override the generated card.
- **The homepage has no `export const metadata`.** It inherits the root layout's, which is
  correct. Every other page must define its own.
- **`components/system/safe-format.tsx` and `client-only.tsx` are currently unused.** They
  are kept deliberately — the SSR lint's error message points developers at them by name.

---

## Images

Photos are served as responsive WebP through `components/content/site-image.tsx`, not
`next/image` directly — `images.unoptimized` means `next/image` emits no `srcset`, so
`sizes` on those call sites did nothing and every device downloaded the desktop file.
Add a photo, run `python3 scripts/optimise-images.py`, use `<SiteImage>` with a real
`sizes`, and commit the generated `.webp` files with `lib/image-manifest.ts`. In a
mapped list, `priority={i === 0}` — not on every card.

## Author identity

Guides carry a named byline: Muhammad Talha, from `siteConfig.author`. The visible
byline, the author page and the `Person` node in `lib/seo.ts` all read from that one
object, so never restate the name, role or credential anywhere else.

## Known gaps worth flagging, not silently fixing

- There is **no test suite**. The gates are `tsc`, the build, and the SSR lint.
- `/api/newsletter` exists with no UI posting to it.
