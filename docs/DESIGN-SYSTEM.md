# Design System

Replaces the old `STYLE_GUIDE.md`, which documented components that no longer exist.

The visual identity is **dark-first, crimson on near-black, with uppercase monospace
microcopy** used as eyebrows and captions — the CCTV/on-screen-display register. That
mono treatment is the single most recognisable thing about the design; keep using it.

---

## Design tokens

All values are CSS variables in `app/globals.css`, surfaced to Tailwind in
`tailwind.config.ts`. **Never hardcode a colour.**

### Colour

| Token | Tailwind | Use |
|---|---|---|
| `background` / `foreground` | `bg-background`, `text-foreground` | Page surface and body text |
| `card` / `card-foreground` | `bg-card` | Raised surfaces |
| `primary` / `primary-foreground` | `bg-primary`, `text-primary` | Brand crimson. CTAs, links, accents |
| `secondary`, `muted`, `accent` | `bg-muted`, `text-muted-foreground` | Subdued surfaces, helper text |
| `destructive` | `text-destructive` | Destructive actions |
| `border`, `input`, `ring` | `border-border`, `focus-visible:ring-ring` | Edges and focus |

**Status tokens** — semantics, not decoration:

| Token | Meaning | Example |
|---|---|---|
| `live` | Healthy, online, compliant, a saving | Camera online dot, checklist pass, net saving |
| `warn` | Roadmap, degraded, needs attention | "In progress" badge, capacity warning |
| `critical` | Failure, cost, non-compliant | Failed check, guard cost bar, form error |

Use `text-live`, `bg-warn/15`, `border-critical/30`. **Never** `text-emerald-400`,
`bg-amber-400`, `text-red-500` — literal palette classes are tuned for one theme and fail
contrast in the other. Verified contrast: light 5.40 / 5.66 / 5.56, dark 10.58 / 10.40 /
6.55, all clearing WCAG AA.

> **Gotcha:** opacity stops `15` and `25` are declared explicitly in `tailwind.config.ts`
> because they are not Tailwind defaults. If you use a stop outside the default scale
> (0, 5, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 95, 100 — plus our 15), add it there
> or the class generates no CSS at all and the element renders transparent.

### Typography

| Role | Font | Class |
|---|---|---|
| Body | Inter | `font-sans` (default) |
| Display | Plus Jakarta Sans | `font-display` — headings only |
| Mono | JetBrains Mono | `font-mono` — eyebrows, captions, numeric data, timestamps |

Custom sizes: `text-body` (17px/1.65 — the standard body size, not `text-base`),
`text-mono-sm` (11px, 0.1em tracking), `text-mono-md` (13px).

Headings use `font-display` + `tracking-tight`. `h1` is
`text-4xl font-extrabold sm:text-5xl`. Section `h2` is `text-2xl font-bold sm:text-3xl`.

The signature eyebrow:
```tsx
<span className="font-mono text-mono-sm uppercase text-primary">Central Operations Screen</span>
```

### Layout

`max-w-site` (1280px) for page containers, `max-w-prose` (720px) for body copy. The
standard container is `mx-auto max-w-site px-6`.

Spacing follows an 8px grid. Vary the rhythm — hero → large gap → content → medium gap.
Section padding is typically `py-16 sm:py-20`, inter-section `mt-16`.

### Motion

`duration-fast` (150ms) hovers, `duration-normal` (250ms) transitions, `duration-slow`
(350ms) modals.

Named keyframes in `tailwind.config.ts`: `patrol-sweep`, `hero-scan-sweep`,
`hero-glow-drift-a/b`, `hero-grid-pan`, `pulse-dot`, `fade-in`, `slide-in-right`.

`globals.css` disables animation globally under `prefers-reduced-motion`. Components that
animate meaningfully should *also* check `useReducedMotion()` and render the final state
rather than nothing — see `components/motion/patrol-sweep-hero.tsx`.

---

## Components

### `layout/`

| Component | Notes |
|---|---|
| `PageShell` | The page scaffold. Props: `path`, `title`, `description`, `breadcrumbs`, `faqs`, `schema`, `showCTA`, `ctaProps`. Emits page structured data. |
| `SiteHeader` | Fixed nav. Hover **and** focus **and** click operable; submenus stay mounted with `inert`. |
| `SiteFooter` | Link columns + NAP block derived from `siteConfig`. |
| `Breadcrumbs` | Trail + `BreadcrumbList` schema with absolute URLs. |
| `CTABand` | Closing CTA. Rendered automatically by `PageShell`. |
| `StickyCTABar` | Appears past 60% scroll. Available, currently unused. |
| `ExitIntentModal` | Desktop exit intent, once per session. Mounted in the root layout. |

### `content/`

| Component | Use |
|---|---|
| `FAQAccordion` | FAQ list. Pass the **same array** to `PageShell`'s `faqs` prop. Answers stay in the DOM when collapsed. |
| `DeploymentPlan` | Three-phase "what a first deployment looks like" block (industry pages). |
| `ComparisonTable` | Feature-by-feature comparison rows. |
| `FeatureCard`, `DetectionCard` | Grid cards. `DetectionCard` takes a `live \| warn \| critical` status. |
| `PlaceholderVisual` | Stand-in for a real screenshot. `type`: `camera-feed`, `dashboard`, `diagram`, `config-ui`, `checklist`, `report`, `patrol-route`, `industry`. Replace with real imagery when available. |
| `RoadmapBadge` | "On the roadmap" pill. Required on any not-yet-shipping feature page. |
| `PatrolChecklistCard` | Checklist item card. Available, currently unused. |

### `motion/`

`ScrollReveal` (the standard section reveal — wrap most sections in it),
`HeroBgAnimation`, `PatrolSweepHero`, `InteractiveChecklistDemo`, `CounterAnimation`.

### `mockups/`

Eleven faux product screens plus `AiPipelineDiagram`. All GSAP + ScrollTrigger driven
through `hooks/use-deferred-gsap.ts`.

**Always use `useDeferredGsap`, never `useGSAP` directly.** The hook works around a real
race: when a scoped element is already in the viewport at mount, ScrollTrigger fires
`onEnter` synchronously while the tween is still being constructed, and the animation
sticks at its start state forever (opacity 0). The hook defers setup by one frame to
avoid it.

### `system/`

| Component | Use |
|---|---|
| `ClientOnly` / `useMounted` | Gate anything browser-only or non-deterministic. Pass a `fallback` sized like the content. |
| `SafeDate` / `SafeTime` / `SafeNumber` | Hydration-safe formatting with explicit locale + timezone. |
| `JsonLd` | Renders a schema graph. Always pass output of `graph(...)` from `lib/seo.ts`. |
| `FormWrapper` | Handles submit, loading, error and success for the lead forms. |
| `ThemeProvider` / `ThemeToggle` | `next-themes`. Default is dark. |
| `ChunkLoadErrorHandler` | **Do not remove.** Works around a known ChunkLoadError race. |

### `ui/`

Only `button` and `sonner` remain — the rest were unused and were removed. Re-add any
shadcn primitive on demand:

```bash
npx shadcn@latest add dialog
```

`Button` sizes: `default`, `xs`, `sm`, `lg`, `icon`, `icon-sm`.

---

## Accessibility requirements

These are not aspirational — the current code meets them and regressions are bugs.

- **Every interactive element is keyboard reachable.** Nav submenus open on hover, focus
  *and* click; Escape closes and returns focus to the trigger.
- **Hidden ≠ unmounted.** Collapsed panels use `inert` + `opacity`/`visibility`, keeping
  content in the DOM for crawlers while removing it from the tab order.
- **Visible focus everywhere.** `focus-visible:ring-2 focus-visible:ring-ring` on every
  link and button.
- **Correct ARIA on disclosures.** `aria-expanded` + `aria-controls` on the trigger,
  matching `id` on the panel.
- **Decorative icons are `aria-hidden="true"`.** Meaningful ones get a label.
- **One `h1` per page**, no skipped heading levels.
- **A skip-to-content link** is the first focusable element (root layout).
- **Colour is never the only signal** — pair status colour with an icon or text.

---

## Adding a new component

1. Pick the right folder — `content/` for most work.
2. Server component by default. Add `'use client'` only if you need state, effects or
   browser APIs, and keep the client boundary as small as possible.
3. Use design tokens for every colour, size and duration.
4. Support both themes. Check light mode explicitly — dark is the default, so light is
   where regressions hide.
5. Respect `prefers-reduced-motion` if it animates.
6. Match the surrounding defensive style (`item?.label ?? ''`).
7. Run the verification loop in [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Images

Photographic assets are served as responsive WebP through
`components/content/site-image.tsx`, not `next/image` directly.

The reason is `images: { unoptimized: true }` in `next.config.js`, which is deliberate
for the deploy target. It means `next/image` emits a single `src` and no `srcset`, so
the `sizes` attribute on those call sites did nothing and every device downloaded the
desktop file — 544KB to a phone that needed 58KB.

**To add or replace a photo:**

1. Put the source JPEG in `public/`.
2. Run `python3 scripts/optimise-images.py`. It generates the WebP ladder and rewrites
   `lib/image-manifest.ts`.
3. Use `<SiteImage>` with a `sizes` value that reflects how wide the image actually
   renders. `sizes` is what decides which variant the browser takes; getting it wrong
   is the difference between 58KB and 241KB.
4. Commit the generated `.webp` files and the manifest alongside the source.

`SiteImage` falls back to `next/image` for anything with no manifest entry, so icons and
one-off images keep working without special handling.

**`priority` marks the LCP element only.** In a mapped list that means `priority={i === 0}`.
Marking every card in a grid high priority makes the browser fetch a dozen images eagerly
in competition with the real LCP element, which is the same as prioritising nothing.
