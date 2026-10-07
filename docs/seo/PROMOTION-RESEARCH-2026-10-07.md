# What to promote: research of 7 October 2026

Market: United States, English. Sources: DataForSEO (endpoints named per figure), Google
Search Console, Bing Webmaster Tools, Google Analytics, Vercel Analytics and Microsoft
Clarity, all read on 6–7 October 2026. Every number below is what a tool returned; "no data"
means it returned nothing. Volumes are 12-month averages of US monthly Google searches; "AI
SV" is DataForSEO's AI search volume.

Endpoints: **KO** `dataforseo_labs_google_keyword_overview` · **SV** `keywords_data/google_ads/search_volume`
· **AIV** `ai_optimization_keyword_data_search_volume` · **DI** `dataforseo_labs_google_domain_intersection`
· **RK** `dataforseo_labs_google_ranked_keywords` · **LLM** `ai_optimization/llm_mentions/*`.

---

## Where the site stands (dashboards)

- Google impressions per week rose from ~240 (July) to 4,400–5,000 (late September); clicks
  from 3 to 36 a week. Click-through is 0.6%.
- 137 canonical pages are "Discovered – currently not indexed" while Google still ranks the
  old `www.` and WordPress URLs; the redirects are correct and Google is consolidating.
- Copilot cited the site 27 times in two weeks, half of them `/supported-cameras`.
- Bing sees 4 referring domains (deutics.com, techdirectory.sg, linkedin.com,
  findglocal.com). Its top recommendation is more inbound links from quality domains.
- Clarity: 65% of desktop homepage visitors never scroll past the top 5%; the most-clicked
  homepage elements are dismiss buttons; visitors click the brand logos on
  `/supported-cameras` (they were not links until 7 October 2026).
- GA4 and Clarity also record Vercel preview deployments, which inflates their numbers.

---

## Top 10 things to promote

| # | What | Evidence |
|---|---|---|
| 1 | **License plate recognition** | KO: "license plate reader" 60,500 ($3.25), "alpr" 9,900 ($9.96, +236% YoY), "lpr camera" 3,600, "lpr software" 480 ($21.50). AIV: "license plate reader" 974, the highest of any product term. DI: Avigilon #5–19 and Verkada #4–20 on LPR terms; Camzify ranks for none. Promote `/ai-features/license-plate-recognition` with its honest scope (US and Singapore plates, watchlist alerts). |
| 2 | **Cloud VMS / VMS cluster** | KO: "vms system" 1,600 ($44.02), "vms software" 1,300, "video management software" 1,000, "video management system" 880, "cloud based video surveillance" 720 (+60% YoY), "cloud vms" 590 ($46.55). RK: Camzify already #19–34 on the VMS terms. |
| 3 | **Business / commercial security cameras** | KO: "business security cameras" 2,900 ($43.25), "commercial security cameras" 1,900, "commercial security camera systems" 880 ($56.25). No Camzify page targets these. Angle: AI for the cameras a business already owns. |
| 4 | **AI security cameras** | KO: "ai security cameras" 1,300 ($14.96), "ai video surveillance" 170 ($32.24). DI: "artificial intelligence cameras" 5,400 (Solink #3, Avigilon #6). |
| 5 | **Retail loss prevention** | KO: "retail loss prevention" 6,600 ($15.11), "retail security cameras" 590 ($33.47). Push `/industries/retail`, `/use-cases/theft-prevention`. |
| 6 | **Parking lots** | KO: "parking lot security cameras" 880 ($78.14, AIV 69), "parking lot security" 480 ($87.70), the highest CPCs in the study. Push the parking use cases. |
| 7 | **Construction sites** | KO: "construction site security cameras" 880 ($67.48), "construction site security" 720 ($74.03). |
| 8 | **Apartments / multifamily** | KO: "apartment security cameras" 1,600 (AIV 165), "apartment security" 1,300. DI: "apartment security system" 2,900. The site never uses the word "apartment"; nearest are `/industries/residential` and `/industries/property-management`. |
| 9 | **Lead the flagship with "guard tour" and "virtual guard"** | KO: "virtual patrolling" no Google data (AIV 16). "guard tour system" 720 ($30.98, +120% YoY), "virtual guard" 480 (AIV 64), "virtual security guard" 210. Keep the product name; put the searched terms in titles. |
| 10 | **People counting; weapons / gun detection** | KO: "people counting" 2,400 (AIV 647), "people counter" 2,400; "gun detection" 720 (AIV 514), "weapons detection" 480 (AIV 215). |

Detections with little demand (good long-tail pages, not lead messages): PPE detection 260,
perimeter intrusion detection 210, fall detection camera 90, loitering, camera tampering,
tailgating and line crossing 40–50 each (KO).

Data cautions: KO's 12,100 for "intelligent video analytics" has no trend data and looks
anomalous; several terms carry a September 2025 spike that inflates the yearly average.

---

## Camera brands (SV, US monthly)

People rarely search "AI for my <brand> cameras" ("hikvision ai" 20; "add ai to existing
cameras" no data), but they do search how to connect a brand to other software:

| Search | Volume | | Search | Volume |
|---|---|---|---|---|
| reolink rtsp | 210 | | dahua rtsp url | 50 |
| reolink onvif | 170 | | unifi protect rtsp | 50 |
| reolink ai | 140 | | amcrest onvif | 50 |
| hikvision rtsp url | 90 | | hikvision cloud storage | 50 |
| hikvision onvif | 70 | | lorex onvif | 40 |
| axis camera onvif | 70 | | hikvision vms | 40 |

"lorex cloud" (1,900) and "reolink cloud" (720) are mostly owners looking for the brand's own
app. Built on this: `/supported-cameras/<brand>` setup guides (lib/camera-brand-guides.ts)
for Hikvision, Dahua, Axis, Reolink and Amcrest. UniFi was held back: Ubiquiti's help
center does not document the per-camera RTSP switch, and only that is what people search for.

---

## Competitor gaps (DI; a competitor ranks top 20, camzify.com does not)

| Keyword | SV | CPC | Ranking |
|---|---|---|---|
| license plate reader | 60,500 | $3.25 | Avigilon #11 |
| retail loss prevention | 6,600 | $15.11 | Avigilon #6 |
| automatic license plate recognition cameras | 6,600 | $12.61 | Verkada #13, Avigilon #19 |
| artificial intelligence cameras | 5,400 | $6.30 | Solink #3, Avigilon #6, Coram #17 |
| what is a vms | 5,400 | $3.68 | Verkada #12 |
| lpr camera | 3,600 | $9.07 | Verkada #4 |
| security cameras for business | 2,900 | $43.25 | Avigilon #6–13 |
| apartment security system | 2,900 | $25.29 | Avigilon #11 |
| commercial security systems | 2,400 | $71.39 | Avigilon #2 |
| corporate security cameras | 1,900 | $29.99 | Avigilon #2 |
| commercial security cameras | 1,900 | $37.50 | Avigilon #4–5 |
| security cameras for apartment complex | 1,600 | $9.65 | Avigilon #3 |
| vms systems | 1,600 | $44.02 | Verkada #8 |
| vms software | 1,300 | $22.24 | Verkada #7, Avigilon #8 |
| ai security cameras | 1,300 | $14.96 | Avigilon #3, Coram #14 |
| video management software | 1,000 | $20.13 | Verkada #7, Coram #15 |
| ai powered security camera | 1,000 | $23.42 | Coram #20 |
| parking lot cctv | 880 | $78.14 | Verkada #4, Coram #13, Solink #12 |
| video management system | 880 | $22.00 | Verkada #6, Coram #13 |
| cloud based video surveillance | 720 | $23.11 | Rhombus #5, Spot #12 |
| cloud-based vms | 480 | $44.50 | Coram #1, Rhombus #14 |
| parking lot security | 480 | $87.70 | Verkada #3 |

---

## Almost there (RK, camzify.com positions 4–34)

Strongest lever: the VMS cluster, which still ranks the old WordPress URL (redirected to
`/guides/what-is-a-video-management-system`): "vms video management software" #19 and
"vms video management system" #21 (480 each), "vms system" #34 (1,600, $44.02). Search
Console shows the VMS-cost queries (340 impressions) also land there, so that guide needs a
"What does a VMS cost?" section. Others: loitering detection #9, patrolling report #9,
tampering detection #16, guard tour #22, video retention #23, cloud-based video management
system #32–33 (170 each, `/cloud-video-surveillance`).

---

## AI visibility (LLM)

| Domain | Google AI Overview mentions | ChatGPT mentions |
|---|---|---|
| avigilon.com | 3,950 | 154 |
| verkada.com | 1,437 | 84 |
| coram.ai | 1,250 | 104 |
| solink.com | 1,198 | 145 |
| rhombus.com | 365 | 50 |
| spot.ai | 137 | 27 |
| camzify.com | 2 | 1 |

- For VMS and video analytics topics, the most-cited sources in Google AI Overviews are
  YouTube, Reddit and LinkedIn, so off-site presence is the fastest route into AI answers.
- No vendor owns "virtual patrolling" in ChatGPT answers: it is open ground.
- ChatGPT reads "cloud VMS" as cloud virtual machines; in copy aimed at AI answers say
  "cloud video management system" or "cloud video surveillance".

---

## Regions (added the same day)

Search Console, last 90 days, impressions by country: United States 13,537 (59%), United
Kingdom 1,936, India 1,075, Australia 672, Canada 515, Germany 430, Singapore 308, UAE
225. Vercel's large Singapore and Pakistan visitor shares are mostly the team's own
offices, not buyers.

Wording by market (DataForSEO keyword overview, monthly):
- **US:** "security cameras", "license plate reader / LPR / ALPR" (60,500 / 9,900),
  "virtual guard", "remote video monitoring", "video management software".
- **UK:** "CCTV" throughout: "commercial CCTV" 720, "remote CCTV monitoring" 390, "CCTV
  monitoring" 1,600. Plates are "ANPR camera" (9,900); Camzify reads only US and
  Singapore plates, so UK plate demand is not one to court until UK plates are built.
- **Australia:** "security cameras" for products, "ANPR" for plates.
- **Singapore and India:** "CCTV" and "CCTV camera". Singapore searches are local-service
  ("cctv singapore" 1,900, "cctv installation singapore" 880, "security company
  singapore" 1,600); plate and AI searches tied to Singapore are near zero.

Camera brands by market ("<brand> camera", monthly): US Reolink 40,500, Lorex 18,100,
UniFi 14,800, Hikvision 12,100, Axis 9,900; UK Hikvision and Reolink 9,900 each, then EZVIZ
2,900; Australia Reolink 8,100, Dahua 5,400, Swann 4,400; Canada Lorex 6,600; India
Hikvision 49,500, Imou 18,100, EZVIZ 12,100; Germany "reolink kamera" 33,100.

Done from this: setup guides added for Lorex, Hanwha Vision, Swann and EZVIZ (nine
in all); Swann, EZVIZ and Imou added to the brand list; "commercial CCTV" and "remote
CCTV monitoring" wording on the business and remote monitoring pages. Held back: UniFi
(Ubiquiti's help center does not document the per-camera RTSP switch) and Imou (no RTSP
URL documented). Open questions for the business: whether to build a Singapore page (the
company is there, but the searches are for local installers), and whether German brand
guides are wanted (Reolink's German demand is large).
