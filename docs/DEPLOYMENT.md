# Deployment

Target is Vercel. The site is a fully static build — 129 prerendered routes plus four
dynamic API routes — so deployment is close to the Next.js default. The things that are
*not* default are all documented below.

---

## Environment variables

**There is no `.env` file to import.** `.env` is gitignored and never committed. Add
values directly in **Vercel → Project → Settings → Environment Variables**.
[`.env.example`](../.env.example) documents each one inline.

**There is exactly one variable.**

| Variable | Required? | Environments | What breaks without it |
|---|---|---|---|
| `DATABASE_URL` | **Yes, for forms only** | Production, Preview | All four forms return `{"success": false}`. Every page still renders normally. |

That is the entire list. The site has no other runtime configuration.

### Leads are read from the database — nothing is emailed

The four form endpoints write to Postgres and return. **No notification is sent.** The
Abacus.AI notification integration that previously ran here was removed, along with its
five environment variables (`ABACUSAI_API_KEY`, `WEB_APP_ID`, and three `NOTIF_ID_*`),
when the project moved to Vercel.

Read leads directly from `DemoRequest`, `ContactSubmission`, `FreeTrialRequest` and
`NewsletterSubscription`. **Someone has to actually check those tables** — there is no
alert. If a notification channel is added later, keep it non-fatal: a failed notification
must never lose a lead that has already been written.

### Variables that must NOT be set

`next.config.js` reads two switches that exist for a non-Vercel deploy path. Setting
either on Vercel will break the deployment:

| Variable | Why it must stay unset |
|---|---|
| `NEXT_OUTPUT_MODE` | No longer read by `next.config.js` (the standalone branch was removed), but setting it would still change Next's output format away from what Vercel expects |
| `NEXT_DIST_DIR` | Moves build output away from `.next`, where Vercel looks for it |

Do not set `NODE_ENV` either — Vercel manages it.

---

## Project settings

| Setting | Value |
|---|---|
| Framework preset | Next.js |
| Build command | *(leave default — uses `npm run build`)* |
| Output directory | *(leave default)* |
| Install command | *(leave default — `.npmrc` supplies `legacy-peer-deps`)* |
| Node version | 20.x (matches `.nvmrc`; `engines` requires ≥ 18.17) |

No `vercel.json` is needed and none exists. Do not add one unless you need redirects or
headers — the defaults are correct for this project.

---

## Why `prisma generate` is in the build script

```json
"build": "prisma generate && next build",
"postinstall": "prisma generate"
```

It is in **both** deliberately. `postinstall` covers local development. The build script
covers Vercel, which restores `node_modules` from its build cache on subsequent
deployments and **skips `postinstall`** when it does. Without the build-script copy, a
schema change could deploy against a stale generated client — a confusing class of bug
that surfaces only in production and only sometimes.

Running it twice locally is harmless; it takes ~30ms.

---

## What the build needs — and does not

**The build requires no environment variables at all.** Verified on a clean clone: all
129 routes prerender with no `.env` present. `prisma generate` reads the schema, not a
live database.

The practical consequence: **a missing `DATABASE_URL` will not fail your build.** It fails
silently at runtime, on form submission only. Do not treat a green build as proof the
forms work — submit one after deploying.

---

## Database scoping

If Preview and Production share a `DATABASE_URL`, test submissions from preview
deployments land in your real leads table alongside genuine ones. Either point Preview at
a separate database, or accept the mixing and filter by `createdAt` when exporting.

The four tables (`DemoRequest`, `ContactSubmission`, `FreeTrialRequest`,
`NewsletterSubscription`) are write-only — nothing on the site reads them back — so there
is no read-path risk from a shared database, only data hygiene.

After changing `prisma/schema.prisma`, push it before deploying:

```bash
npx prisma db push
```

---

## Preview deployments and SEO

`siteConfig.url` is hardcoded to `https://camzify.com`, so **every preview deployment
emits production canonical URLs**, production `og:url` values, and a sitemap pointing at
production.

This is correct and intentional — you do not want preview URLs indexed or
self-canonicalising. But it means:

- Auditing SEO output on a preview URL shows production URLs. That is expected.
- Vercel preview deployments are `noindex` by default via `x-robots-tag`. Leave that on.
- If you ever need a genuinely indexable staging environment, change `siteConfig.url` —
  not the metadata helpers, which all derive from it.

---

## Post-deploy checklist

Run these against the production URL after the first deploy:

- [ ] Homepage renders styled, with the patrol-grid animation
- [ ] `https://camzify.com/sitemap.xml` returns 121 `<loc>` entries, all absolute and
      pointing at the production domain
- [ ] `https://camzify.com/robots.txt` lists the AI crawler allowlist and the sitemap URL
- [ ] `https://camzify.com/llms.txt` returns plain text with the correct HQ address
- [ ] `https://camzify.com/opengraph-image` renders a 1200×630 card
- [ ] A deep page's `og:title` is its own, not the homepage's:
      ```bash
      curl -s https://camzify.com/pricing | grep -o '<meta property="og:title"[^>]*>'
      ```
- [ ] Submit the contact form and confirm the row lands in `ContactSubmission` (there is no email to wait for)
- [ ] Submit Google Search Console verification and the sitemap

---

## Rollback

Vercel keeps every deployment. Promote a previous one from the dashboard
(**Deployments → ⋯ → Promote to Production**). Because the site is fully static with no
migrations tied to a release, rollback is safe and instant — the only stateful surface is
the leads database, which is append-only.

---

## Git-based deploys (recommended setup)

With the repository connected to Vercel, every push to `main` deploys to production and
every branch or PR gets its own preview URL. Vercel clones server-side, so nothing is
uploaded from a developer machine — which also sidesteps the CLI upload stall documented
at the end of this file.

### Step 1 — Authenticate to GitHub

The remote is already set to `github.com/talha3khan222/camzify-website`, but no credential
is configured. Pick one:

**SSH (no tokens to rotate):**

```bash
cat ~/.ssh/id_ed25519.pub
```

Paste that into GitHub → Settings → SSH and GPG keys → New SSH key. Then:

```bash
git remote set-url origin git@github.com:talha3khan222/camzify-website.git
ssh -T git@github.com
```

**Or the GitHub CLI:**

```bash
brew install gh && gh auth login
```

### Step 2 — Create the repository and push

The repo does not exist yet (or is private and unreachable). With `gh`:

```bash
gh repo create talha3khan222/camzify-website --private --source=. --remote=origin --push
```

Or create it in the GitHub UI, then:

```bash
git push -u origin main
```

### Step 3 — Connect Vercel

1. vercel.com → **Add New → Project → Import Git Repository**
2. Authorize the Vercel GitHub app for the account, then pick the repository
3. Framework preset: **Next.js** (auto-detected). Leave build, output and install commands
   at their defaults — `npm run build` already runs `prisma generate`
4. Root directory: `./`
5. Add `DATABASE_URL` under Environment Variables if the forms need to work
6. Deploy

### Step 4 — Confirm the automation

```bash
git commit --allow-empty -m "Test git-based deploy" && git push
```

A deployment should appear in Vercel within seconds. After the first deploy, check
**Settings → Deployment Protection** — if the production URL redirects instead of serving,
Vercel Authentication is on and needs disabling for a public site.

### What changes afterwards

- Push to `main` → production deploy, automatically
- Push any other branch, or open a PR → preview deploy with its own URL
- `scripts/deploy.sh` becomes a fallback rather than the normal path
- `.vercelignore` still matters for what gets built, but no longer gates a local upload
