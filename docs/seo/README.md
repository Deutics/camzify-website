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
