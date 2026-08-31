# Camzify Website

Marketing and SEO site for **Camzify** — an AI virtual-patrolling and video-analytics platform by Deutics Global Pte Ltd (Singapore).

This is a **content site, not an application**. There is no login, no dashboard, no authenticated area. The product app lives separately at `app.camzify.live`. Everything here exists to be found — by search engines, by AI answer engines, and by buyers — and to convert that traffic into demo requests.

---

## Prerequisites

| Requirement | Version | Notes |
|---|---|---|
| Node.js | **≥ 18.17** | Enforced by `engines`. `.nvmrc` pins 20 LTS — run `nvm use` if you have nvm. |
| npm | ≥ 9 | `.npmrc` sets `legacy-peer-deps=true`, so plain `npm install` is correct. Do not add the flag manually. |
| PostgreSQL | any recent | **Optional.** Only needed for the four contact/demo forms — see below. |

---

## Quick start

```bash
npm install
```

```bash
npm run dev
```

Open **http://localhost:3000**. That is the whole setup.

> **You do not need a database, an `.env` file, or any credentials to run or build this
> site.** All 121 pages are statically prerendered from source with no per-request data,
> and `npx prisma generate` (which runs automatically on install) does not require a live
> connection. A full production build succeeds with zero environment configuration.
>
> You only need `.env` if you are working on the four lead-capture form endpoints
> (`/api/book-demo`, `/api/contact`, `/api/free-trial`, `/api/newsletter`). Without it,
> every page renders normally; submitting a form returns
> `{"success": false, "message": "Failed to send message"}` because the database write
> has nowhere to go. That is expected, not a broken checkout.

### If you are working on the forms

```bash
cp .env.example .env
```

Fill in `.env` — every variable is documented inline in [`.env.example`](.env.example).
Then push the schema to your database:

```bash
npx prisma db push
```

### Confirm it works

You should see the dark homepage with the crimson Camzify logo, a nav bar, and a hero
reading *"Your site. Patrolled 24/7."* with an animating 12-camera patrol grid on the
right. If the page renders as unstyled black-on-white text, see **Troubleshooting** below.

---

## Running a production build

```bash
npm run build
npm start
```

The build prerenders 129 routes. In the output, every page should be marked `○ (Static)`
— only the four `/api/*` routes should be `ƒ (Dynamic)`. If a content page shows as
`ƒ`, something has opted it out of static generation (usually `headers()`, `cookies()`,
or `export const dynamic`), and that is a bug worth fixing.

> **Never run `next build` while `next dev` is running.** Both write to `.next/`, and the
> build strips the dev server's CSS — leaving a site that looks catastrophically broken
> but is only a clobbered build directory. Build to a separate directory instead:
>
> ```bash
> NEXT_DIST_DIR=.next-probe npx next build
> ```

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Site renders with **no styling at all** — plain text on white | `next build` was run while `next dev` was running; they share `.next/` | Stop the dev server, `rm -rf .next`, restart it |
| `Port 3000 is already in use` | Another project is on 3000 | `npm run dev -- -p 3411` |
| `ChunkLoadError` in the browser console | Known Next dev race — a dynamic chunk was requested before it compiled | Handled automatically by `ChunkLoadErrorHandler`; the page self-reloads. If it loops, `rm -rf .next` |
| A Tailwind class has no effect | The value is outside the configured scale — e.g. an opacity stop other than the defaults plus our `15`/`25` | Add the stop to `tailwind.config.ts`, or use a configured one |
| Form returns `"Failed to send message"` | No `DATABASE_URL` — the Prisma write fails, so the whole request fails. Server log shows `Environment variable not found: DATABASE_URL` | Expected with no `.env`. Set `DATABASE_URL` and run `npx prisma db push` if you need the forms to work |
| Build fails on a type error | `typescript.ignoreBuildErrors` is `false` by design | Run `npx tsc --noEmit` to see it directly |
| Prisma client errors after editing the schema | Generated client is stale | `npx prisma generate` |

---

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | `prisma generate` then production build. Prerenders all 121 pages as static HTML |
| `npm start` | Serve the production build |
| `npm run lint` | Next.js ESLint |
| `npx tsc --noEmit` | Type check. **Run before every commit** |
| `npx eslint -c eslint.ssr.config.mjs .` | SSR/hydration safety lint. **Runs after every build in CI — do not skip** |
| `npx prisma generate` | Regenerate the Prisma client (also runs on `postinstall`) |
| `npx prisma db push` | Push `prisma/schema.prisma` to the database |
| `npx shadcn@latest add <name>` | Add a shadcn/ui primitive back into `components/ui/` |

---

## The 60-second mental model

- **Next.js 14, App Router, TypeScript, Tailwind.** 121 pages, all statically prerendered at build time. Only the four `/api/*` routes are dynamic.
- **No CMS.** Page copy lives as TypeScript objects inside each `page.tsx`. Editing content means editing React.
- **Content is organised into silos** — `ai-features`, `industries`, `use-cases`, `guides`, `platform`, `virtual-patrolling`, `compare`, `partners`, `camera-connectivity` — each a hub page plus spokes, densely cross-linked.
- **The database only captures leads.** Four write-only tables behind four API routes. Nothing is read back by the site, and **no notification is sent** — someone must check the tables.
- **`lib/site-config.ts` is the single source of truth** for company identity, address, phone, email and canonical URL. Never hardcode those anywhere else.
- **`lib/seo.ts` generates all structured data.** Every page emits one schema.org `@graph` that links back to shared Organization and WebSite nodes.

---

## Documentation

Read these in order. If you only read one, read **Adding Pages**.

| Doc | Read it when |
|---|---|
| [`CLAUDE.md`](CLAUDE.md) | You are an AI agent working in this repo — non-negotiable rules and gotchas |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | You need to know where things live and why |
| [`docs/ADDING-PAGES.md`](docs/ADDING-PAGES.md) | **You are adding or editing any page.** Per-category recipes and copy-paste templates |
| [`docs/SEO-GEO.md`](docs/SEO-GEO.md) | You are writing content, or touching metadata, schema, sitemap or robots |
| [`docs/DESIGN-SYSTEM.md`](docs/DESIGN-SYSTEM.md) | You are writing UI — tokens, typography, components, motion |
| [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md) | Before your first change — the pre-flight checklist |
| [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) | You are deploying, or configuring environment variables on Vercel |

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14.2 (App Router) |
| Language | TypeScript 5.2 |
| Styling | Tailwind CSS 3.3 + CSS-variable design tokens |
| UI primitives | shadcn/ui (Radix) — only what is actually used is kept in the repo |
| Motion | `framer-motion` for reveals and nav; `gsap` + ScrollTrigger for product mockups |
| Icons | `lucide-react` |
| Database | PostgreSQL via Prisma 6 — lead capture only |
| Lead notifications | Abacus.AI notification API |
| Deploy | Vercel-compatible static output |

---

## Project status and known gaps

- **No remote yet.** The repository exists locally on `main` but has no origin. Add one and push so the history is not confined to a single machine.
- **No test suite.** There is no unit, integration or E2E testing. The de facto gates are `tsc --noEmit`, the production build, and `eslint.ssr.config.mjs`.
- **Awaiting real content from the business:** customer case studies for the 16 industry pages, verified operating statistics for `/trust`, and public pricing if rate-card figures are ever to be indexed. Placeholder blocks have been replaced with honest substitute content rather than left visible — see `docs/SEO-GEO.md` § Honesty rules.
- **`/api/newsletter` has no UI.** The endpoint and table exist; nothing on the site posts to it.
- **`public/` is 134MB** — seven industry hero images are 9–10MB PNGs served unoptimised as LCP elements. Compressing these is the single largest available performance win.
