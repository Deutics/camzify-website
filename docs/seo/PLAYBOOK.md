# SEO, AEO and GEO playbook for camzify.com

The operating manual for anyone, human or AI, working on how this site is found. It says
what "good" means for each of the three disciplines, how to measure it, what the data
files in this folder are, and what must never be done. Read it before touching a page;
read [`AUDIT-2026-09-18.md`](AUDIT-2026-09-18.md) for where the site stands today and
what to do next. The technical architecture (schema graph, metadata, crawl directives)
is in [`../SEO-GEO.md`](../SEO-GEO.md) and is not repeated here.

Three disciplines, one site:

| Discipline | Optimizes for | The unit that wins | Measured with |
|---|---|---|---|
| **SEO** | A ranked list of links in Google (US first, then Singapore and the UAE) | A page that owns one query phrase and earns links | DataForSEO ranked keywords, `scripts/seo-audit.py`, Search Console |
| **AEO** (answer engine optimization) | Featured snippets, People Also Ask, Google AI Overviews | A question heading with a direct two-sentence answer beneath it, plus FAQ schema | SERP pulls (`serp_organic_live_advanced`), the audit's `aeo_score` |
| **GEO** (generative engine optimization) | Being cited inside ChatGPT, Perplexity, Gemini and Claude answers | A standalone, attributable sentence: a definition, a compatibility statement, a price, a sourced comparison | `ai_optimization/llm_responses` live checks, `05-ai-visibility.*` |

---

## 1. The non-negotiables

These come from `CLAUDE.md` and `site-brief.md` and override any optimization idea.

1. **No unverified facts.** No invented prices (only "from $5 per camera per month"),
   counts, uptime, response times, savings percentages or certifications (PDPA, GDPR,
   SOC 2 Type II, ISO 27001 are in progress and not held). A page that ranks on a false
   number is worse than a page that does not rank.
2. **Competitor facts only from the competitor's own site**, opened in the same run and
   listed in the page's Sources section with the date. Never characterize competitor
   pricing beyond what their pricing page says. Applies to `/compare/camzify-vs-*`,
   `/alternatives/*` and `/guides/best-cloud-vms`.
3. **Identity from `lib/site-config.ts` only.** Address, phone, legal name, service
   areas, social profiles. Two addresses on one site breaks entity resolution.
4. **One page per query phrase.** Two pages targeting the same phrase split the signal;
   the thin one redirects to the deep one (see `next.config.js` `redirects()`).
5. **Hidden content stays in the DOM** (`inert`, not unmounted). AI crawlers read
   rendered text.
6. **US English, no em-dashes, no banned words** (`site-brief.md`). Voice is a
   practitioner explaining, not a vendor selling.

---

## 2. The page contract

Every content page must pass all of these. `scripts/seo-audit.py` checks them on the
rendered HTML; `scripts/check-pages.py` checks the source.

### SEO

- Title 50 source characters or fewer (site name appended at render, 62 rendered).
  Leads with the buyer's phrase, not the product name: "Retail Store Security Cameras"
  beats "AI Security for Retail".
- Description 70 to 150 characters, states the answer, carries the phrase once.
- Exactly one H1 carrying the title phrase. At least three H2s.
- 600 words or more of body for guides, comparisons, industries and use cases (glossary
  entries 250 to 450). The pages answer engines cited in the audit were 1,000 or more.
- At least three inbound internal links from other pages (hub plus two contextual), and
  five or more outbound internal links. A page with only a hub link is invisible.
- Listed in `app/sitemap.ts`. Canonical set by `generatePageMeta`.
- Every image through `SiteImage`/`PhotoFigure` with real `alt`; decorative logos carry
  `alt=""`.

### AEO

- **Definition-first lede.** The first paragraph defines the subject in one or two plain
  sentences that could stand alone: "A cloud VMS is the software that records, stores
  and searches camera video in the cloud instead of on a recorder." Then the detail.
- **Question headings.** H2s are the questions a buyer types ("Is a VMS a device or
  software?"), each answered in its first two sentences, then expanded.
- **FAQ block** of at least three (guides and pillars six) two-to-four-sentence answers,
  fed to `PageShell` so it also renders as `FAQPage` schema. Glossary entries carry two.
- **Lists and tables** for anything enumerable (steps, detections, comparisons). The
  `ComparisonTable` component's first column heading is `'Aspect'`.
- **Breadcrumbs** on every page (they render `BreadcrumbList`).

### GEO

- **One quotable fact per sentence** in the sections that matter: what it is, what it
  works with (ONVIF, RTSP, RTMP, HTTPS), what it costs (the $5 floor), what it does not
  do (no hardware, no monitoring center, no access control). Engines lift sentences,
  not paragraphs.
- **Author and dates.** Guides carry `AuthorByline` with `updated={modifiedTime}`
  (visible date) and `articleSchema` plus `personSchema`. Update `modifiedTime` when the
  content changes, never for cosmetics.
- **Sources section** on any page that names a vendor, with the URL and the date read.
- **Honest limits stated on the page.** The audit showed engines cite pages that say
  what a product does not do; it reads as trustworthy and it is required anyway.
- **`/llms.txt` current.** Add a line when a silo is added. It is the summary an LLM
  reads first.
- **Robots allowlist** (`app/robots.ts`) names every AI crawler explicitly. Do not
  block any of them.

---

## 3. What ranks and what gets cited (learned from the 18 September 2026 pulls)

Google, United States, for the cloud cluster:

- Organic top results for "cloud video surveillance" are vendor home pages and one
  vendor guide with the definition in the first sentence. The AI Overview cites the
  same definition sentence and two "how it works" bullets.
- "cloud vms" is partly a virtual-machine query. The AI Overview and the top result are
  multi-vendor buyer's guides ("9 Best Cloud-Based VMS"). A product page cannot rank
  there; a fair listicle can. That is why `/guides/best-cloud-vms` exists.
- "remote video monitoring" returns monitoring-service providers plus two cost guides
  with published per-camera ranges. Google also shows shopping results, so the query
  is partly consumer.

ChatGPT, Perplexity and Gemini (live responses, 18 queries):

- Cited pages did one of four things: defined the term in the first sentence; listed
  vendors with a "best for" line each; stated camera compatibility as "ONVIF or RTSP"
  in one sentence; or published a per-camera price. Camzify was cited only where it did
  the first (virtual patrolling: the pillar and the guide were lifted verbatim).
- Perplexity favors recently dated pages and glossary entries. Visible "Updated" dates
  now render on guides for this reason.
- Vendor documentation (Axis object analytics manual, Genetec glossary) was cited for
  "what detections are typical". A one-table catalog of all 23 detections is the
  equivalent unit for this site.

---

## 4. Markets

The site is written in US English for the United States. Singapore is the company's
home market and the UAE is a target. The data (see `03-keyword-volumes.csv` and the
audit) says:

| Phrase | US | UAE | Singapore |
|---|---|---|---|
| video management system | 880 | 30 | 70 |
| vms software | 1,300 | 70 | 40 |
| video analytics | not pulled for the US | 30 | 140 |
| intrusion detection | 6,600 | 210 | 320 |
| cloud video surveillance | 260 | below threshold | 10 |
| remote video monitoring | 210 | below threshold | 10 |
| virtual guard | 480 | 10 | below threshold |

Consequences:

- US volume is 10 to 50 times the other two markets. Content is written once, for the
  US, and ranks in Singapore and the UAE on the same English pages; do not fork the
  site per country.
- Both smaller markets use **CCTV** vocabulary ("cctv cloud storage", "cloud cctv",
  "cctv monitoring software"). Carry those phrases as secondary terms on the cloud
  pillar, the backup page and the glossary rather than as new pages.
- Regional landing pages (`/singapore`, `/uae`) are worth building only with facts the
  business must supply: where video is stored for that market, support hours, local
  contact, currency, any local partner. Without those facts a regional page is thin
  and will not rank; do not write one from adjectives. The groundwork is in place:
  `areaServed` names both countries (`lib/site-config.ts`) and the ROI calculator
  already offers AED and SGD.
- Entity signals for Singapore: the Organization node's address is the Singapore HQ.
  A Google Business Profile for that address is the single highest-leverage local
  action and is outside the codebase.

---

## 5. Tools and data files

| File | What it is | Produced by |
|---|---|---|
| `01-keyword-map.csv` / `.html` | The original intent-clustered keyword map (US) | `keyword-fanout-map` skill |
| `01-keyword-coverage.csv` | Each keyword against the page that owns it | hand-maintained |
| `02-competitor-keywords.csv` | Phrases seen on competitor sites, mapped to pages, with volumes | competitor crawl + DataForSEO |
| `03-keyword-volumes.csv` | Volume, difficulty, CPC and intent for 145 phrases (US) | `dataforseo_labs_google_keyword_overview` |
| `04-site-audit.csv` | One row per route: title, description, H1, words, FAQs, schema, links, SEO/AEO/GEO scores, flags | `scripts/seo-audit.py` |
| `05-ai-visibility.csv` / `.html` | Which engines cited which domains for 18 queries, the gaps, the wins | live `llm_responses` pulls, `ai-visibility-checker` skill |
| `README.md` | The dated log of every research pass and what was changed on the back of it | append per pass |

Scripts:

```bash
# Source-level checks: title and description lengths, duplicates, inbound links, title phrase in body
python3 scripts/check-pages.py --static

# Rendered checks against the dev server on :3411 (start it through the preview tooling first)
python3 scripts/check-pages.py

# Full crawl with SEO / AEO / GEO scores per route, writes docs/seo/04-site-audit.csv
python3 scripts/seo-audit.py
SITE=https://www.camzify.com python3 scripts/seo-audit.py   # against production

# Glossary integrity
python3 scripts/check-glossary.py

# Whole-site verification against the live host: every sitemap route 200 with a matching
# canonical, one H1, title, description, valid JSON-LD, no image without alt text, and
# every internal link resolving. Exits non-zero on any failure; run after every deploy.
python3 scripts/verify-site.py
SITE=http://localhost:3412 python3 scripts/verify-site.py   # against a local production start
```

DataForSEO (MCP connector "dfs-mcp"). The calls that matter, by API path:

- `dataforseo_labs/google/ranked_keywords` for camzify.com: what ranks, where, through
  which URL. Run monthly; it is how the 404ed blog posts were found.
- `dataforseo_labs/google/keyword_overview` for a list of phrases: volume, difficulty,
  intent. Always pass `location_name` and `language_code`; run US, then Singapore and
  the UAE.
- `serp/google/organic` for a phrase: who ranks, whether an AI Overview appears and
  what it cites, People Also Ask (the fan-out questions to answer as H2s).
- `ai_optimization/llm_responses` (ChatGPT gpt-5.5 with web search, Perplexity
  sonar-pro, Gemini 2.5 Flash): the live citation check. Costs about $0.10 per ChatGPT
  query; 15 to 20 queries a month is enough. The aggregate `llm_mentions` endpoints
  returned nothing for this domain set in September 2026; rely on live responses.
- `backlinks/domain_pages_summary` for camzify.com: 39 backlinks, all to the homepage.
- `on_page/lighthouse`: performance 0.89, SEO 1.0, accessibility 0.83 on the homepage
  (desktop, 18 September 2026).

The SEO skills installed in this workspace (`keyword-fanout-map`, `seo-content-writer`,
`onpage-optimizer`, `internal-link-architect`, `ai-visibility-checker`) all read
`site-brief.md`; keep it current and they stay on-brand.

---

## 6. Cadence

**Monthly** (first week):

1. `ranked_keywords` for camzify.com. Record position changes for the owned phrases in
   `README.md`. Any URL that ranks and 404s gets a redirect the same day.
2. `scripts/seo-audit.py` against production. Any page whose score dropped, or any new
   flag, is a task.
3. Live `llm_responses` for the 18 tracked queries (`05-ai-visibility.csv`). Update the
   citations column; a query where a competitor is cited and this site is not is a gap.
4. Search Console: impressions and clicks per owned phrase; pages with impressions and
   no clicks need a better title or description.

**Per new page**: the five-step checklist in `../ADDING-PAGES.md`, then
`check-pages.py --static`, then the rendered pass.

**Quarterly**: re-pull `keyword_overview` for `03-keyword-volumes.csv`, re-check the
competitor comparisons against the vendors' live pages (the Sources dates on each page
say when they were last read), and re-read `site-brief.md`.

---

## 7. How an AI SEO tool should use this folder

1. Read `CLAUDE.md`, `site-brief.md` and section 1 above before proposing any change.
2. Take the current state from `04-site-audit.csv` (flags column) and `05-ai-visibility.csv`
   (gaps), not from a fresh guess. Re-run the scripts if the files are older than a month.
3. Pick work from the backlog in `AUDIT-2026-09-18.md` (or its successor) in priority
   order. Each item names the page, the change and the evidence.
4. Make the change under the page contract in section 2. Never add a fact that is not in
   `llms.txt`, the platform page or a listed Source.
5. Verify: `npx tsc --noEmit`, `NEXT_DIST_DIR=.next-probe npx next build`,
   `npx eslint -c eslint.ssr.config.mjs .`, `python3 scripts/check-pages.py`,
   `python3 scripts/seo-audit.py`.
6. Log what was done and why in `README.md` under a dated heading, and update the
   backlog. The next tool starts from that log.

What an AI tool must not do: invent statistics to make a page "more authoritative";
add a vendor claim from a review site or from memory; publish a price beyond the $5
floor; create a second page for a phrase that already has an owner; describe the
certifications as held; remove the maintenance notice, the legal-draft dates or the
"not held" language; or weaken `eslint.ssr.config.mjs`.
