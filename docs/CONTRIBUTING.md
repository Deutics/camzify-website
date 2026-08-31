# Contributing

Read [`../CLAUDE.md`](../CLAUDE.md) first — it is the short list of rules that are easy to
break and expensive to break. This document is the working procedure.

---

## Before your first change

1. **Check your Node version.** Next 14.2 requires ≥ 18.17 and `engines` enforces it.
   ```bash
   nvm use        # reads .nvmrc (20 LTS)
   node -v
   ```

2. **Install and run.**
   ```bash
   npm install
   npm run dev
   ```
   That is the whole setup — no database or `.env` is needed to run or build the site.
   `npx prisma generate` runs automatically on install and does not need a live
   connection. Only add `.env` (from `.env.example`) if you are working on the four
   `/api/*` form endpoints; without it those endpoints return a failure response while
   every page still renders normally.

3. **Confirm a clean baseline** before you touch anything, so you know any failure is
   yours:
   ```bash
   npx tsc --noEmit && npx eslint -c eslint.ssr.config.mjs .
   ```

4. **Branch.** `main` is the mainline; do not commit directly to it for anything
   non-trivial.
   ```bash
   git switch -c <short-descriptive-name>
   ```

---

## The verification loop

Run all three. They are the only gates this project has — there is no test suite.

```bash
npx tsc --noEmit
NEXT_DIST_DIR=.next-probe npx next build
npx eslint -c eslint.ssr.config.mjs .
```

> Build to `.next-probe`, never plain `next build`, if a dev server is running. They share
> `.next/` and the build strips the dev server's CSS, producing a completely unstyled site
> that looks like catastrophic breakage but is just a clobbered build directory. If it
> happens: stop the dev server, `rm -rf .next`, restart.

For anything visually observable, also start the dev server and look at the result. Do not
ship a visual change you have not seen rendered.

---

## Content changes

Use the templates and checklist in [`ADDING-PAGES.md`](ADDING-PAGES.md). The short version:

- Edit `pageMeta` — never `export const metadata` by hand.
- Keep the `faqs` array passed to `PageShell` identical to the one rendered by
  `FAQAccordion`.
- Update `dateModified` on guides you materially edit.
- Never publish an unverified number, price, certification or case study. See
  [`SEO-GEO.md`](SEO-GEO.md) § Honesty rules.

---

## Code changes

- **Colours:** design tokens only. No literal Tailwind palette classes outside
  `components/ui/`.
- **Images:** `next/image` with the file's real `width`/`height`
  (`sips -g pixelWidth -g pixelHeight public/x.png`). Above-the-fold hero gets `priority`;
  everything else `loading="lazy"`.
- **Identity:** import from `lib/site-config.ts`. Never hardcode address, phone, email,
  legal name or origin.
- **Animation:** `useDeferredGsap` for ScrollTrigger, never `useGSAP` directly.
- **Client boundaries:** keep `'use client'` as low in the tree as possible.
- **Style:** match the surrounding defensive optional chaining (`item?.label ?? ''`).

---

## Adding a dependency

Justify it. The dependency list was cut from 86 packages to 17 because the project had
accumulated plotly, maplibre, chart.js, recharts, aws-sdk, azure-blob, zustand, jotai,
formik, yup, zod, swr, react-query, lodash and more — **none of them imported anywhere**.

Before adding one, check whether an existing dependency covers it:
`framer-motion` and `gsap` for motion, `lucide-react` for icons, `tailwind-merge` +
`clsx` via `cn()` for class composition, `next/image` for images.

To confirm nothing has gone stale again:

```bash
node -e '
const fs=require("fs"),cp=require("child_process");
const pkg=JSON.parse(fs.readFileSync("package.json","utf8"));
const src=cp.execSync("find app components hooks lib scripts -type f \\( -name \"*.ts\" -o -name \"*.tsx\" \\)",{encoding:"utf8"}).trim().split("\n");
const blob=src.map(f=>fs.readFileSync(f,"utf8")).join("\n");
const KEEP=new Set(["autoprefixer","dotenv","react-dom"]);
console.log(Object.keys(pkg.dependencies).filter(d=>!KEEP.has(d)&&!blob.includes(`"${d}`)&&!blob.includes(`'"'"'${d}`)).join("\n")||"none unused");
'
```

---

## Removing code

The repository has history now, so deletion is recoverable — but still confirm before you
cut:

- shadcn primitives in `components/ui/` are safe to remove — `npx shadcn@latest add <name>`
  brings them back.
- Anything else: confirm it is genuinely unimported (there is a detector script in this
  file's dependency section), and say so explicitly in your summary so the change is
  auditable in review.

---

## Definition of done

- [ ] `tsc --noEmit` clean
- [ ] Production build succeeds; the new route shows as `○ (Static)`
- [ ] SSR lint clean
- [ ] New page is in `app/sitemap.ts` and `lib/site-config.ts` navigation
- [ ] New page has inbound links from at least two existing pages
- [ ] `og:title` on the new page is the page's own, not the homepage's
- [ ] No broken internal links (script at the end of `ADDING-PAGES.md`)
- [ ] Checked in both light and dark themes
- [ ] Keyboard reachable, visible focus ring
- [ ] No unverified claims, prices, or certifications introduced
