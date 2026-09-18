# Keyword research (7 September 2026)

Files in this folder are the output of the `keyword-fanout-map` skill, run against
DataForSEO Labs for **United States, English**, 12-month average volumes.

- `01-keyword-map.csv` — the map the `seo-content-writer` skill reads. Columns are fixed.
- `01-keyword-map.html` — the same map as a dashboard, with the primary-keyword rationale.
- `01-keyword-coverage.csv` — each keyword against the page that carries it today
  (`(none)` marks a gap) and a note on why it was placed where it was.

## What the data says

The niche is small in search terms. The product's own name for the category,
"virtual patrolling", has almost no volume (10/mo for "virtual patrol"). Buyers search
the category as **cloud VMS / video management software** (590 to 1,300/mo each),
**virtual guard** (480/mo), **remote video monitoring** (260/mo), **remote guarding**
(110 to 320/mo) and **guard tour system** (720/mo). The largest relevant term,
**intelligent video analytics** (12,100/mo), is a definition query.

Hardware-intent terms ("fire detection camera", "construction site security cameras",
"onvif camera") carry the most volume but only partly fit a software vendor; they are
kept as `support` and should never become an H1 that implies we sell cameras.

## What was changed on the back of it

Seven pages were retitled so that the title, H1 and description carry the phrase people
search rather than an internal name: `/platform`, `/ai-features`,
`/partners/for-security-agencies`, `/partners/for-monitoring-centers`,
`/industries/construction-sites`, `/industries/warehouses`,
`/use-cases/parking-lot-surveillance`. The virtual-patrolling hub now says "virtual guard"
once in its definition.

## Gaps closed the same day

Each term family now has a page of its own, wired into the nav, the sitemap, the footer,
llms.txt and at least two existing pages:

| Term family | Volume | Page |
|---|---|---|
| virtual guard, virtual security guard, virtual guard service | 480 + 210 + 50 | `/virtual-guard` |
| cloud based video surveillance, cloud video surveillance, cloud cctv, cloud nvr, nvr alternative | 720 + 320 + 50 + 90 + 10 | `/cloud-video-surveillance` |
| intelligent video analytics | 12,100 | `/guides/what-is-intelligent-video-analytics` |
| remote video monitoring, remote security solutions, proactive video monitoring | 260 + 260 + 30 | `/use-cases/remote-video-monitoring` |

## What could not be pulled

AI search volume, keyword difficulty, intent scoring, the live SERP and the fan-out
(People Also Ask, LLM mentions) endpoints all returned HTTP 402 from DataForSEO, so those
columns read "no data". Re-run the skill once the account has credit to fill them in.

## Cloud VMS cluster (16 September 2026)

The site ranked for the virtual patrolling terms, which nobody else competes for, and
not for the cloud VMS terms, which established vendors do. Three things were changed,
all on-site; link building is the business's side and is not covered here.

1. **One owner per phrase.** `/platform` keeps "cloud VMS". The cloud video surveillance
   pillar was retitled to "Cloud CCTV, No NVR" so the two pages stop competing for one
   query; it owns "cloud video surveillance", "cloud CCTV" and "cloud NVR".
2. **Internal links to the pillar** went from 6 files to 61: a sentence in the shared
   use-case component (35 pages), the licensing sentence on all 16 industry pages, the
   patrol-round paragraph or Related row on all 23 feature pages, and hand-placed
   sentences on the backup, integrator, RTSP, ONVIF and retention pages.
3. **Seven supporting guides**, each linking the pillar and `/platform` in its first
   200 words and cross-linked in a Related block: what a cloud VMS is, cloud NVR
   explained, cloud VMS cost, bandwidth requirements, using existing cameras, cloud VMS
   for multiple sites, and cloud VMS for security agencies. None publishes a price or a
   bandwidth figure. Search volumes for their long-tail phrases read "no data" because
   DataForSEO was still returning 402; rerun the map when credit is back.

Resolved the same day: four older pages (the Connector page, remote sites, the virtual
patrolling cost guide and the sites-and-cameras how-to) used to state a per-camera upload
figure while newer pages say no such figure is published. The figure was removed and all
four now describe the method (sum of the cameras' stream bitrates) and point at the
bandwidth guide.

## Pricing disclosure (17 September 2026)

For one day the site showed approximate list rates and an estimator. After checking how
the comparable vendors handle it (Verkada and Rhombus list MSRP because they sell
hardware; Solink, Spot AI, Coram, Pro-Vigil and Eagle Eye publish no rate card and ask
for contact), the business withdrew the public figures. What remains: one floor
statement, "from $5 per camera per month", on the pricing page, the FAQs, llms.txt and
the SoftwareApplication schema (an AggregateOffer with only a lowPrice); a quote request
on the pricing page and the demo form that collects camera and feature counts without
showing a figure; and list rates kept in `lib/pricing-estimates.ts` for the server to add
an estimate to the team's lead email. The ROI calculator shows the reader's own figures.

## Competitor keyword map (17 September 2026)

`02-competitor-keywords.csv` lists the phrases the comparable vendors build pages for,
taken from the sitemaps of Eagle Eye Networks, Solink, Spot AI, Coram AI, Rhombus,
Verkada, Pro-Vigil, Cloudastructure and 3dEYE, and maps each to the Camzify page that
carries it today or marks it as a gap with the action to take. Search volumes are
"pending" because DataForSEO returned 402 again; rerun `keyword-fanout-map` on the
`high` rows when credit is back, before writing anything.

The patterns worth copying, in order: named comparison and "alternative" pages (Spot AI
has more than forty, Solink and Rhombus have their own); a glossary of short
definitional pages (Pro-Vigil, Solink and Coram all run one); industry pages for the
segments three or more competitors target (auto dealerships, logistics, utilities and
solar, cannabis, hospitality); and a construction site security checklist. Hardware,
plate recognition, facial recognition, POS integration and white label are marked
`skip` because Camzify does not sell them.

## Competitor map, acted on (17 September 2026)

From `02-competitor-keywords.csv`, three groups shipped the same day. Twenty existing pages
took the phrases competitors rank for (titles where there was room, a FAQ that answers the
phrase otherwise) and the automotive page was rewritten around repair shops and
multi-branch groups after an inbound lead. Three guides were added (VSaaS, hybrid cloud
video surveillance, construction site security checklist). Six sourced comparison pages
were added (Verkada, Rhombus, Solink, Spot AI, Coram AI, Avigilon Alta), each with a
Sources section of the competitor's own pages. A glossary silo of thirty short
definitional pages with DefinedTerm schema was added at `/glossary`, driven by
`lib/glossary-terms.ts`. Volumes for all of it are still pending DataForSEO credit.

## Site-wide on-page audit (18 September 2026)

A rendered pass over all 180 non-glossary routes found one H1, a canonical and FAQ schema
on every content page (only the form and utility pages carry no FAQ, by design), and every
title under 62 rendered characters. Fixed the same day: ten source titles that ran to 51
or 52 characters, the seven industry titles still in the generic "AI Security for X" form
(now the buyer's phrase, e.g. "Retail Store Security Cameras"), the glossary description,
and 38 pages whose title phrase never appeared in their own opening paragraph (the lede
now carries it once). The Eagle Eye comparison, written before the competitor-sourcing
rule, was rewritten to the sourced format. Rerun `python3 scripts/check-pages.py` after
any batch of new pages (static checks) and `--rendered` against the dev server on :3411.

## Ranking check and keyword volumes (18 September 2026)

With the DataForSEO account connected, the first ranked-keywords pull for camzify.com
explained the gap between "we rank for virtual patrolling" and "we do not rank for cloud
VMS". The domain ranks for 15 keywords, every one of them through two URLs from the old
site: `/blog/what-is-video-management-software-vms/` ("vms system" 1,600 a month at
position 34, "vms video management software" 480 at 19, plus "what is vms in cctv",
"vms recording", "vms device") and
`/blog/revolutionizing-security-how-ai-surveillance-is-changing-the-game/`. Both had
returned 404 since the rebuild, so the only equity the domain had was draining. Fixed the
same day: permanent redirects in `next.config.js` (the VMS post to the new
`/guides/what-is-a-video-management-system`, the AI post to
`/guides/what-is-intelligent-video-analytics`, any other `/blog/<slug>` to `/guides`),
and the VMS guide itself, written to answer the queries the old post ranked for.

The site has 39 backlinks from 36 referring domains, all to the homepage; nothing deep.
The historical view shows the domain barely ranked before the rebuild either, so the
baseline is close to zero and every page is a first attempt, not a recovery.

Volumes and difficulty for 130 phrases are in `03-keyword-volumes.csv` (Google, United
States, English, 12-month average; "no data" means the phrase is below Google's
reporting threshold, which is also true of "virtual patrolling" itself). What matters:

- **Head terms the site now owns a page for, with low difficulty:** "cloud based video
  surveillance" 720 (KD 3), "business security camera system" 590 (KD 2), "retail
  security cameras" 590 (KD 1), "warehouse security cameras" 1,000 (KD 7), "ai camera
  system" 880 (KD 4), "ai security camera" 1,300 (KD 7), "apartment security" 1,300
  (KD 6), "remote video monitoring" 210 (KD 1), "cloud nvr" 90 (KD 1), "video
  surveillance software" 720 (KD 13). These are winnable with the pages that exist
  and a handful of links.
- **The VMS cluster is the largest informational demand the site can credibly answer:**
  "vms" 60,500 (mixed with other meanings), "vms system" 1,600, "vms software" 1,300,
  "video management system software" 1,000, "video management software" 1,000, "video
  management system" 880, "cloud vms" 590 (KD 50, the hardest phrase in the set),
  "cloud based vms" 480 (KD 12). The new VMS guide, the glossary entry and the cloud
  VMS guide split this by intent: category definition, bare term, cloud form.
- **Competitor-switch demand is small but expensive:** "verkada competitors" 260 and
  "verkada alternative" 70 (CPC $71 to $79), "adt competitors" 390 and "adt
  alternatives" 260. The other vendor "alternative" phrases return no volume, which
  argues for one ADT alternative page and one Verkada alternative page before any other.
- **Not worth a page:** "virtual patrol" 10 (KD 43), "remote patrol" 10, "security agency
  software" 10, "guard company software" 10, "multi site video surveillance" 10,
  "car dealership security cameras" 30. Keep these as phrases inside existing pages.
- **"cloud vms" is partly a virtual-machine query.** The SERP mixes video and
  virtualization results and the AI Overview cites a "best cloud VMS" listicle. A
  buyer's-guide page that lists several vendors fairly is the format that ranks there;
  a product page will not.

## Alternative pages and the cloud VMS buyer's guide (18 September 2026)

Three pages built on the volume data above. `/alternatives/adt` and `/alternatives/verkada`
are the switch-intent counterparts to the `/compare` "vs" pages: the reader already has
the other product and is asking what a move means (cameras kept, services that stay with
the incumbent, what is given up, who should not switch). They follow rule 8 exactly like
the comparisons: every vendor statement from a vendor page opened that day and listed in
the page's Sources section, pricing never characterized beyond the vendor's own pricing
page. `/alternatives` is the hub, in the Resources menu and the sitemap's
`alternatives` group. One caveat on the ADT page: adt.com serves US visitors only and
returned 403 to every request from this machine, so its pages were read from the Internet
Archive's most recent capture of each URL (March to August 2026), and the page says so in
its Sources section with the capture date per source. Nothing rests on the one old (2024)
capture. Re-check the rows against the live pages from a US connection when one is
available. The other vendor "alternative" phrases returned no volume, so no
more alternative pages are planned until the data says otherwise.

`/guides/best-cloud-vms` is the buyer's guide format that ranks for "cloud vms": eight
platforms, Camzify first with a disclosure, the other seven alphabetically, each described
only from its own pages, with a side-by-side table and a "which for which buyer" list.
It links every one-to-one comparison and is linked from the cloud pillar, both VMS guides
and llms.txt.
