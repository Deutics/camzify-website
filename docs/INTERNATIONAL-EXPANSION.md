# International expansion research — UK, Germany, Australia, Saudi Arabia

> Researched 2026-09-22 against the request to rank Camzify in the UK, Europe (Germany
> specifically), Australia and Saudi Arabia. Real Google search volumes are from
> DataForSEO (Google Ads keyword data, location- and language-scoped); qualitative
> findings are from live web research, each claim sourced. Anything below that reads
> "unverified" or "flag before using" should be checked again before it goes into copy —
> that follows the same rule as `docs/AUDIENCE-STRATEGY.md` and the hard rule in
> `CLAUDE.md` against publishing an unverified fact.
>
> Read alongside `site-brief.md` (Service area section) and `docs/AUDIENCE-STRATEGY.md`
> (Phase 2, which already proposed US/UK/Germany country pages before this research
> existed) and `docs/design/IMAGE-REQUESTS.md` §2 (the five declared markets awaiting
> pages).

## The one-paragraph summary

Two of these four markets were already on the business's own roadmap: `site-brief.md`
lists Europe and the Middle East as priority markets 2 and 3, and
`docs/AUDIENCE-STRATEGY.md` found Germany is 30% of the outreach list (bigger than the
UK's 14%) and proposed a German pilot in Phase 2 — never funded. Australia and Saudi
Arabia are genuinely new ground with no prior research. Across all four, head category
terms ("video management system," "cloud VMS," "virtual guard") have very low search
volume everywhere, including the US — this is a low-volume, high-value B2B niche
globally, not a market-specific weakness. What differs by market is which long-tail,
buyer-language and compliance terms actually get searched, and Germany is the one market
where the category itself ("remote/virtual guarding") has no settled name yet — a real
opportunity to define it rather than compete inside an existing one.

---

## Cross-market findings

**Search volume for this category is small everywhere.** "Video management system,"
"cloud VMS," "virtual guard," "AI video analytics" all sit in the 10–90/month range in
the UK, Australia and Saudi Arabia alike (see per-market tables below) — the same order
of magnitude as the US data already in `docs/seo/`. Ranking will come from long-tail
buyer-language terms (UK: "manned guarding" 320/mo, "remote CCTV monitoring" 390/mo;
Germany: "Werkschutz" 1,300/mo, "Objektschutz" 1,300/mo) and competitor-alternative
searches, not head terms. Don't judge any market as "too small" from category-term
volume alone.

**AI-search (LLM query) volume for this category is currently negligible everywhere
checked.** Spot-checked in the UK: "virtual guarding," "remote video monitoring" and "AI
video analytics" each return low-single-digit monthly AI-search volume. This is
consistent with the `keyword-fanout-map` skill's own honesty rule that AI search volume
is "newer and thinner than Google volume" — it means nothing yet, not that AI-answer-engine
visibility isn't worth pursuing; the site's whole AEO/GEO strategy is a bet on where this
is going, not where it already is.

**None of the four markets currently have any site infrastructure.** There is no
hreflang, no locale routing, and `lib/site-config.ts` declares a single `locale: 'en_US'`
and a single `areaServed` array. This is greenfield — see "Technical changes" below.

**One existing internal document has two factual errors, now corrected by this
research:** `docs/AUDIENCE-STRATEGY.md` told a UK content brief to use "local terms (ARC,
NSL, Werkschutz)." Of those three: ARC is correct; **NSL is a specific UK
parking-enforcement company (NSL Services Group), not a generic industry term**; and
**Werkschutz is German, not English** — it has no UK usage. The correct UK terms are ARC,
NSI (National Security Inspectorate) and SSAIB (Security Systems and Alarms Inspection
Board). Werkschutz belongs in the Germany section, where it's a real, confirmed term for
an in-house/industrial security department — see below.

---

## United Kingdom

**Priority signal:** 14% of the outreach list (vs. 35% US, 30% Germany) — smaller than
Germany, real, English-language, no translation cost.

### Real search volume (Google Ads, UK, English)

| Keyword | Vol/mo | Competition | Note |
|---|---|---|---|
| remote CCTV monitoring | 390 | High (CPC £9.86) | Highest-volume relevant term found |
| manned guarding | 320 | Low | The thing your partner-track buyer already sells |
| CCTV monitoring company | 110 | High | |
| video management system | 90 | Low | |
| cloud VMS | 90 | High (CPC £33.69) | Expensive if ever run as paid |
| remote video monitoring | 40 | High | |
| AI video analytics | 30 | Medium | |
| cloud video surveillance | 30 | Low | |
| video surveillance software | 30 | Low | |
| virtual guard / virtual guarding | 10 each | Low | |
| remote guarding | 10 | Low | |
| Verkada alternative | 10 | High (CPC £26.23) | Low volume, high buyer intent |
| mobile patrol software / guard tour software / monitoring station software | 10 each | — | |

### What UK buyers actually call this

**"CCTV" is still the dominant everyday term**, not "video surveillance" — the ICO's own
guidance page is titled "CCTV and video surveillance." **"Remote guarding" and "virtual
guarding" are used interchangeably**, no strong searcher preference either way. The
formally-recognized industry term is **RVR (Remote Video Response)**, delivered by an
accredited **RVRC (Remote Video Response/Receiving Centre)** — SSAIB runs a named
accreditation scheme for this, and it reads as more credible to a compliance-minded UK
buyer than "virtual guarding" alone. **ARC (Alarm Receiving Centre)** is standard,
confirmed terminology.

British spelling for any UK-facing copy: organise, behaviour, centre, colour, licence
(noun) / license (verb) — e.g. "SIA licence," "to license a contractor." The current
US-spelled site would read as foreign to a UK buyer.

### Compliance and regulatory hooks

- **UK GDPR + Data Protection Act 2018**, enforced by the **ICO**, which publishes
  CCTV-specific guidance directly.
- **Data (Use and Access) Act 2025** (in force 19 June 2025) amends UK GDPR with new
  automated-decision-making safeguards — relevant to any claim about AI-driven alerts.
- The **Surveillance Camera Commissioner and Code of Practice are being folded into ICO
  oversight** under the Data Protection and Digital Information Bill — cite ICO guidance
  directly rather than the disappearing standalone Code.
- **SIA licensing** (CCTV Operator/PSS licence, Approved Contractor Scheme) applies to
  the guarding/monitoring *companies* Camzify sells to, not to Camzify as a software
  vendor — good context for partner-track copy, not a compliance claim to make about
  Camzify itself.
- **Data residency:** AWS operates a London region. "Footage in the AWS region nearest
  your sites" maps cleanly to London for UK customers — no new policy needed, just the
  existing one stated for this market.
- A real, independently-verifiable UK business case for the partner-track pitch: the
  April 2025 National Living Wage rise to £12.21/hour pushed fully-loaded guarding costs
  to £15–£18/hour, and first-time SIA licence applications fell 16% year-on-year (94,332
  to 79,455) — a labor-cost-and-shortage story, not a guessed market-size figure.

### Competitive landscape (verified from each vendor's own material)

Verkada is actively hiring UK enterprise sales (a London-based role). Eagle Eye Networks
has confirmed UK channel partners (Fuse Systems, Reflex Systems) and an Actuate.ai
integration. Milestone's and Genetec's UK-specific marketing was **not confirmed** in
this pass — check their own `/en-gb` pages before making any claim either way.
UK-native/strong players: Reliance High-Tech, Synectics.

### Recommendations

1. Don't fork the site into a UK version — 14% doesn't justify 210 duplicate pages. Add
   UK-terminology touchpoints to existing high-traffic pages instead.
2. Add glossary entries: CCTV, ARC, RVR/RVRC, SIA licence, NSI, SSAIB, BS 7858 — each a
   real, searched term and a legitimate `/glossary/<slug>` candidate under the existing
   content model.
3. Reposition "virtual patrolling" copy for UK guarding/installer buyers around **RVR /
   RVRC** language alongside "remote guarding."
4. Target IFSEC Insider, Professional Security Magazine, Security Journal UK, and the
   SIA's Approved Contractor Scheme register for citations.
5. Correct the internal strategy doc's NSL/Werkschutz error (done in this doc; still
   present uncorrected in `docs/AUDIENCE-STRATEGY.md` line ~53 — worth a follow-up edit).

---

## Germany (highest-priority market)

**Priority signal:** 30% of the outreach list — the single largest country, ahead of the
US. `docs/AUDIENCE-STRATEGY.md` already proposed a German pilot in Phase 2 and left it as
an unfunded decision. This research is the case for funding it.

### Real search volume (Google Ads, Germany, German)

| Keyword | Vol/mo | Competition | Intent |
|---|---|---|---|
| Sicherheitsdienst (security service, broad) | 8,100 | Low | 94% informational |
| Videoüberwachung (video surveillance, broad) | 6,600 | High | 89% informational |
| **Werkschutz** (confirmed real term, in-house/industrial security) | 1,300 | Low | 99.6% informational |
| Objektschutz (facility protection) | 1,300 | Low | 98% informational |
| Fernüberwachung (remote monitoring) | 170 | Low | 94% informational |
| Videomanagementsystem | 90 | Medium | 43% informational / 41% navigational — the one term with real buying signal |
| Sicherheitsdienst Software | 50 | High | |
| KI-Videoanalyse (AI video analytics) | 50 | Medium | |
| Videoüberwachungssoftware | 40 | Medium | |
| Videoanalyse Software | 40 | Low | |
| Videomanagement | 40 | Low | |
| "virtueller Wachdienst" (literal translation of "virtual guard") | **no data** | — | Confirms the category has no settled German name — see below |

The broad head terms (Sicherheitsdienst, Videoüberwachung, Werkschutz, Objektschutz)
carry huge volume but are overwhelmingly informational — people looking up a concept or a
job title, not buying software. They're glossary/top-of-funnel content targets, not money-page
targets. Videomanagementsystem is the one term worth treating as a real conversion
keyword.

### The core finding: nobody has named this category in German yet

Only **Protection One** brands a comparable offering: "Virtual Guard" / "**virtueller
Wächterrundgang**," from €75/month, sold as an alternative to a physical round. The
broader market instead uses **"Videofernüberwachung"** or **"Fernüberwachung mit
Live-Aufschaltung"** — both skew toward alarm-triggered response rather than Camzify's
scheduled, proactive-check model. No dedicated commercial page for "virtuelle
Wachdienste" or "ferngesteuerte Bewachung" was found. This matches the internal finding
that 0% of German guarding companies' own service descriptions mention "remote" or
"virtual" guarding — **the category is real and growing (below) but structurally
unclaimed in German**, which is a genuine opening to define it rather than fight for
share inside "Fernüberwachung."

Working term cluster to build pages around: **virtueller Wächterrundgang**,
**KI-gestützter Wächterrundgang**, **Videofernüberwachung**, **Fernüberwachung mit
Live-Aufschaltung** for the category; **cloud-basierte Videoüberwachung** and
**KI-Videoanalyse** as standard product terms; **Werkschutz** reserved as a buyer-persona
term (in-house industrial security), not a category label. A patrol is "Streifendienst"
or "Rundgang/Kontrollgang"; a compliance report maps to "digitales Wachbuch" or
"Kontrollprotokoll." Treat this cluster as a testable hypothesis, not a settled keyword
map — a proper German-market keyword-fanout-map run should confirm relative volume
between these terms before final page titles are locked.

### Market trends

German electronic security technology grew 3.9% to €5.74B in 2025, with **video
surveillance the fastest-growing segment at +6.1% to €870M** (BHE, the industry
association's own 2025 figures). A Lünendonk/BDSW October 2025 study of Germany's top 25
security providers found half already use robotics/digital solutions, with AI-supported
video monitoring named as part of a labor-shortage-driven digitalization wave, alongside
7.5% revenue and 2.2% headcount growth in 2024 — a real tailwind for "sell virtual
patrolling as a new billable service." No authoritative cloud-vs-on-prem split exists for
Germany specifically (flagged as a gap); vendor behavior corroborates growth regardless —
Verkada launched in DACH in June 2024 and claims 360%+ European bookings growth with
~650 channel partners; Eagle Eye Networks opened a Frankfurt data center in 2018
specifically for GDPR reasons.

**Watch item, not yet resolved:** the EU AI Act's high-risk classification deadline is 2
August 2026. Dallmeier (a German competitor) is already telling the market that
non-biometric video analytics likely falls under "high-risk" — whether any of Camzify's
features would qualify is unverified and should be checked before finalizing German
compliance claims.

### Compliance and data residency — already well-aligned, no new claim needed

GDPR covers CCTV as personal-data processing; Germany's Datenschutzkonferenz (DSK)
published a detailed "Orientierungshilfe Videoüberwachung" (2020) and BDSG §4 governs
surveillance of publicly-accessible spaces (entrances, car parks, retail floors — exactly
what Camzify's customers monitor), requiring signage and timely deletion. None of this
legally mandates German/EU hosting — but market *preference* is unambiguous: Bitkom's
2026 Cloud Report (603 companies) found 97% say server location matters and **100% would
prefer Germany**, 68% would accept elsewhere in the EU. Camzify's existing policy —
footage in the AWS region nearest the customer — already satisfies this: **AWS's
Frankfurt region has run since 2014**. No new commitment is needed, just stating the
existing policy in this market. BSI's C5 cloud-security catalogue is the credential
German enterprise buyers may ask about; AWS already holds it at the infrastructure level,
citable while Camzify's own PDPA/GDPR/SOC 2/ISO 27001 stay described as in progress.

### Competitive landscape

Milestone (Düsseldorf/Munich, ~10,000 global resellers, on-prem/hybrid/Arcules-cloud),
Genetec (Frankfurt entity, named DACH country manager, Vienna R&D hub, cloud-forward),
Verkada (most aggressive recent entrant — DACH launch June 2024, ~650 partners, 1,000+
regional customers, joined TD Synnex Germany in 2026), and Eagle Eye Networks (longest
cloud track record, Frankfurt data center since 2018) are all confirmed present.
**Irisity has no verified German presence.** Actuate.ai's presence is one channel deal
(April 2026), not a market entry. German-native competition: **Dallmeier** (Regensburg,
GDPR-branded, integrates into Milestone rather than running cloud-only), **Mobotix**
(has an actual subscription cloud VMS product plus embedded Irisity AI analytics),
**SeeTec/Qognify** (on-prem), and **isarsoft** (Munich, GDPR/ISO 27001-branded AI
video-analytics SaaS — a newly-surfaced, closer-shaped competitor worth a proper look).
NSL-based providers (KÖTTER, Securitas Deutschland, Protectas, Protection One, BauWatch)
sell a different thing — bundled alarm response — not a VMS purchase.

### Recommendations

1. **Ship native German pages with proper hreflang, not English pages targeting German
   queries.** The terminology differs meaningfully from literal translation.
2. Build the term cluster above as the category-defining content, not a single keyword.
3. Cite DIN EN IEC 62676 (video systems), DIN EN 50518 (monitoring-centre operation),
   DIN 77200 (guarding quality — increasingly tender-required), and VdS certification
   (2366 installers / 3138 monitoring centres / 2172 intervention) as industry context —
   Camzify holds none of these and should reference them only as context, not claim them.
4. State the AWS-Frankfurt / BSI-C5 story plainly; it already answers the "prefer
   Germany" preference without a new commitment.
5. Target GIT-Sicherheit and PROTECTOR first for citations/PR — both actively cover
   cloud VMS and AI video. Security-Insider.de is a secondary fit.
6. **Fund the pilot.** A 6–8 page German pilot split by persona — guarding companies via
   DIN 77200/Streifendienst language, installers via VdS 2366/Videomanagementsystem
   language — tests the term-cluster hypothesis directly, against the largest single
   country in the outreach list.

---

## Australia (new market, no prior research)

### Real search volume (Google Ads, Australia, English)

| Keyword | Vol/mo | Competition |
|---|---|---|
| video management system | 70 | Low |
| cloud VMS | 50 | Medium |
| video surveillance software | 40 | Low |
| AI video analytics | 20 | Medium |
| cloud video surveillance | 10 | — |
| remote video monitoring | 10 | High |
| remote guarding | 10 | Low |
| virtual guard / virtual guarding | 10 each | Low |
| remote CCTV monitoring | 10 | High (CPC A$32.95 — expensive) |

Same low-volume pattern as the UK; Australia's category-term volumes sit in the same
10–70/month range.

### What's different about Australia: the category is already named and sold

Unlike Germany, **"remote guarding" and "virtual guarding" are already established,
actively-marketed categories in Australia** — Securus ("Virtual Guard Patrols"), Exec
Security ("Remote Security Monitoring | Virtual Guarding"), Wilson Security (a major
national provider, "Virtual Patrol & Monitoring Surveillance"), and vsguard.com.au all
sell exactly this, under exactly this language. There is no category-naming opportunity
here the way there is in Germany — the job is to compete for an existing search
vocabulary, not define a new one.

The defining Australian trust marker is the **ASIAL Monitoring Centre Grading Scheme
under AS 2201.2:2022** (cutover to the current standard: 25 March 2024). Monitoring
centres are graded A–C (construction) and 1–3 (operations/equipment/staff, 1 highest) —
Australian guarding companies advertise their grade directly (e.g. "ASIAL Grade A1
Security Monitoring Centre") as a credibility marker with no direct US equivalent.
Positioning virtual patrolling as compatible with a client's existing grading, rather
than as a replacement for it, is the credible angle.

### Spelling and regulatory landscape

Australian English: organise, behaviour, colour, centre, licence (noun) / license
(verb) — but **"program" stays as in US usage**, not "programme" (a real AU/UK
divergence, don't blanket-apply UK spelling).

Security licensing is **state-based, not federal** — NSW's Security Industry Act 1997
(administered by SLED), Victoria's Private Security Act 2004, and separate equivalents
per state/territory. Firms need a **Master Licence** to employ licensed personnel; roles
are separately licensed (e.g. NSW Class 1/Class 2). **ASIAL** is the national industry
association, the closest Australian counterpart to a US body.

**Privacy Act 1988** and the **Australian Privacy Principles (APPs)** apply to
organisations with annual turnover ≥ AUD $3M; the **Notifiable Data Breaches scheme**
(since 2018) requires notification on a breach likely to cause serious harm. CCTV/video
surveillance-specific regulation sits at **state level** — separate Surveillance Devices
Acts in NSW, WA, SA and others — so a compliance page for Australia should acknowledge
this patchwork honestly rather than claim one national framework. **AWS operates both a
Sydney region (since 2012) and a newer Melbourne region** — directly supports the
existing "AWS region nearest the customer" policy for Australian customers.

### Competitive landscape

Milestone (Dicker Data is the confirmed Australian distributor), Genetec (named ANZ
country manager, a public Sydney Trains case study, JD Security as an ANZ partner),
Verkada (a physical Sydney office, 140+ JAPAC staff, a dedicated `/au/pricing/` page),
and Eagle Eye Networks (distributor deals with Integrated Products and Panasonic
Australia) all have **confirmed, real local presence**. Actuate.ai and Irisity: no
confirmed Australian presence found. Notably, **no Australia-native software competitor**
surfaced — the visible Australian "virtual guarding" players (Securus, Wilson Security,
StateGuard, Exec Security) are guarding/monitoring *service* companies reselling other
vendors' technology, which is closer to Camzify's own buyer type than to its software
competitor type.

### Recommendations

1. Build a real ANZ content cluster, not a spelling-only pass — ASIAL/AS 2201.2 grading
   language, state licensing, and AWS Sydney/Melbourne residency are all substantive,
   correct claims the current site doesn't make.
2. Position virtual patrolling as compatible with a client's existing ASIAL grade.
3. State AWS Sydney/Melbourne residency directly for Australian prospects.
4. Target SEN.news (Security Electronics & Networks, ANZ's longest-running security
   trade title), ASIAL's *Security Insider* magazine, and Australian Security Magazine
   for citations.
5. Before any `/compare` or `/alternatives` page naming Genetec, Milestone, Verkada or
   Eagle Eye for this market, open each vendor's own AU/ANZ pages directly per the
   existing competitor-sourcing rule — this research did not open their pricing pages.

---

## Saudi Arabia (emerging market, no prior research)

### Real search volume — English (Google Ads, Saudi Arabia, English)

| Keyword | Vol/mo |
|---|---|
| CCTV monitoring | 90 |
| video management system | 40 |
| cloud video surveillance | 10 |
| remote video monitoring | 10 |
| remote guarding | 10 |
| virtual guard | 10 |
| AI video analytics | 10 |
| video surveillance software | 10 |
| smart city surveillance | 10 |

### Real search volume — Arabic (Google Ads, Saudi Arabia, Arabic)

| Keyword | Vol/mo | Note |
|---|---|---|
| كاميرات مراقبة (surveillance cameras) | 60,500 | Almost certainly consumer/residential intent |
| شركة حراسات (security guarding company) | 1,000 | B2B-adjacent — people looking for guarding companies |
| نظام مراقبة (monitoring system) | 70 | Modest, generic |
| مراقبة عن بعد (remote monitoring) | 10 | Very low |
| Precise terms — نظام إدارة الفيديو (VMS), مراقبة فيديو سحابية (cloud video surveillance), حراسة عن بعد (remote guarding), تحليلات الفيديو بالذكاء الاصطناعي (AI video analytics) | **no data** | No established Arabic technical vocabulary for this category yet |

**This directly answers the English-vs-Arabic question the qualitative research could
only infer:** precise B2B VMS/AI-analytics terminology has essentially zero measured
Arabic search volume, while the same precise terms return real (if modest) English
volume in Saudi Arabia specifically. **Saudi B2B buyers for this category appear to be
searching in English, not Arabic — do not build Arabic pages on the strength of this
research; the data argues against it, at least for now.** Arabic volume that does exist
sits in broad consumer/generic terms (residential cameras, "a guarding company"), which
are the wrong pages to build for a software vendor.

### Market trends

Genetec's own **2026 State of Physical Security Report** found Saudi Arabia has the
**highest share of cloud-based physical-security deployments in EMEA — 13%, versus a 7%
EMEA average** — a concrete, vendor-sourced signal (not a market-size guess) that cloud
VMS is gaining real, measurable ground here. Vision 2030 giga-projects (NEOM, Red Sea,
Qiddiya) are the standard demand narrative every competitor already uses — treat it as
table stakes, not a differentiator. Two concrete, recent developments matter more:
**Eagle Eye Networks opened a purpose-built Riyadh data center in 2024**, explicitly
positioned around local cybersecurity/data-privacy requirements — direct evidence that
data residency is a deal-relevant concern here, not a nice-to-have. **In January 2025,
Saudi Arabia's Ministry of Interior introduced a Security Surveillance Cameras Law**
with real penalties (up to SAR 10,000 for tampering, SAR 20,000 for unauthorized footage
release) — a regulatory tightening around camera systems specifically, worth monitoring.

### Compliance and the data-residency race — resolved by direct verification

**Saudi PDPL (Personal Data Protection Law)** has been fully enforced since **14
September 2024** (not "in progress" — this is a live, actively-enforced law, with
**48 enforcement decisions by SDAIA by mid-January 2026** per IAPP reporting). It's
regulated by **SDAIA** (Saudi Data & AI Authority) and the **National Data Management
Office**, not SAGIA. This is a **different, distinct law from the "PDPA" already listed
on Camzify's compliance page** — the existing PDPA is presumably Singapore's (given the
Singapore HQ) and must not be conflated with Saudi PDPL if this market is pursued; PDPL
would need to be added as its own line item. **NCA Essential Cybersecurity Controls
(ECC-2:2024)** are mandatory only for government entities and critical national
infrastructure — relevant only if Camzify pursues government-adjacent accounts, not the
core small-guarding-company/installer buyer.

**AWS data residency — verified directly against AWS's own announcement page as of this
research, since the sourcing agent flagged conflicting dates:** the dedicated **Saudi
Arabia region (me-central-2, Riyadh) is confirmed on track for December 2026** — about
three months from today's date — with a **$5.3 billion investment**. Bahrain (me-south-1,
live since 2019) and the UAE region (live since 2022) are the currently-operating Middle
East regions. **This means the Saudi AWS region is close enough to launch that "a
dedicated Saudi region is on the way" is a truthful, dated claim right now, and will be
outdated (in the good direction) within the quarter** — a genuinely strong data-residency
narrative once it ships, worth planning content around now.

### A structural finding that shapes go-to-market, not just content

Saudi private security guarding companies must be **Saudi-owned with Saudi-national
guards**, licensed through the **Ministry of Interior**. Camzify's core "sell virtual
patrolling to small guarding companies" playbook works in this market **only as a
channel through existing MOI-licensed Saudi firms, not as a way around them** — this
should shape any Saudi go-to-market plan more than content or keyword choices will.

### Competitive landscape

Eagle Eye Networks is the most concretely Saudi-committed (its own Riyadh data center).
Milestone has a named KSA country manager and exhibited at Intersec Saudi Arabia 2024
with 12 partners. Genetec has a dedicated GCC/Africa regional office and published
Saudi-specific findings in its own 2026 report. Verkada opened a Dubai office in 2025 —
**not Saudi-specific**. Irisity covers the region via an Abu Dhabi-based GCC sales
director. Actuate.ai: **no verifiable Middle East presence found.**

### Recommendations

1. **Lead with data residency, not Vision 2030 alone** — every competitor already uses
   Vision 2030 messaging; "footage in the AWS region nearest your sites, with a dedicated
   Saudi region on the way" is sharper and directly answers what Eagle Eye is already
   selling against.
2. Add **Saudi PDPL** to the compliance/trust page as its own line item, in the same
   honest "in progress" framing the site already uses for the other four frameworks —
   don't conflate it with the existing PDPA entry.
3. Do not build Arabic pages on current evidence; the keyword data argues for English
   pages with Saudi-market framing instead. Revisit if/when real Arabic B2B demand shows
   up in a future check.
4. Route go-to-market through MOI-licensed Saudi guarding firms as channel partners, not
   around them.
5. Target Intersec Saudi Arabia and Security Middle East Magazine for citations, plus
   Security Buyer Magazine / ZAWYA syndication, where every named competitor's Saudi news
   actually runs.
6. Re-verify the AWS Saudi region date at the time any copy is written — December 2026 is
   confirmed as of this research (22 September 2026) but is a moving target until it
   actually ships.

---

## Technical changes needed on the site

1. **No i18n framework is required for the English markets (UK, Australia).** The site
   has no hreflang or locale routing today, and none is needed to add UK/AU-facing
   content under the existing flat route structure — this matches what
   `docs/AUDIENCE-STRATEGY.md` Phase 2 already proposed (individual country pages, not a
   parallel site tree).
2. **Germany needs actual translated pages with hreflang**, per the German research
   agent's recommendation — English pages targeting German search terms would miss the
   terminology nuance this research surfaced (literal translation ≠ what a German buyer
   types). This is the one market that's a genuine engineering/content lift, not just new
   copy.
3. **`lib/site-config.ts`'s `areaServed`** currently reads `['United States', 'Singapore',
   'United Arab Emirates', 'Middle East', 'Europe', 'Pakistan']`. The UK is covered only
   implicitly under "Europe"; Australia isn't present at all; Saudi Arabia is covered only
   implicitly under "Middle East." If these become real target markets, this list (and
   the matching `areaServed` schema.org node) should name them explicitly — a business
   decision, not made in this pass.
4. **The ROI calculator's currency list** (`app/roi-calculator/_components/roi-calculator.tsx`)
   currently supports USD, EUR, GBP, AED, SGD, PKR. EUR and GBP already cover Germany and
   the UK. **AUD and SAR are not yet supported** — a small, low-risk addition if Australia
   or Saudi Arabia are confirmed as targets.
5. **`site-brief.md`'s "Country for search data: United States"** is the single value every
   SEO skill (`keyword-fanout-map`, `seo-content-writer`, `onpage-optimizer`,
   `internal-link-architect`, `ai-visibility-checker`) reads by default. It stays US for
   the core site; a market-specific skill run (as this research did manually) needs
   country/language passed explicitly until — or unless — the business decides a market
   deserves its own dedicated content track.

## Decisions for the business

Mirroring how `docs/AUDIENCE-STRATEGY.md` left its own Phase 2 as open decisions rather
than executing unilaterally:

1. **Fund the German pilot?** This is the strongest case of the four — largest outreach
   share, a real category-naming opportunity, and prior internal buy-in already on
   record. The blocker was always funding a translation-quality 6–8 page build, not a
   research gap.
2. **UK and Australia: light-touch additions to the existing site, or dedicated
   sections?** Both are English-language and technically cheap; the question is content
   investment, not engineering.
3. **Saudi Arabia: pursue now, or wait for the AWS Saudi region to actually ship
   (~December 2026)?** The data-residency story gets meaningfully stronger once that
   region is live; PDPL compliance work could start now independent of that timing.
4. **Update `site-brief.md`'s declared market list and `lib/site-config.ts`'s
   `areaServed`** once the above are decided — both are load-bearing for every future SEO
   skill run and content decision, so they should reflect the real priority list, not stay
   frozen at the 2026-09-08 version.
