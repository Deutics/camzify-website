# Site Brief — Camzify

> Read by: keyword-fanout-map · seo-content-writer · onpage-optimizer ·
> internal-link-architect · ai-visibility-checker
>
> Anything marked ⚠️ verify was inferred from the website and needs a human to
> confirm it. Anything marked ⚠️ NEEDS INPUT could not be determined at all.
>
> Built from the site's own source (121 pages), not a crawl — so the service
> inventory, voice observations and content rules below are read from the real copy.
>
> Last updated: 2026-09-02 — competitors, years in business and team size supplied by the business. Still outstanding: customer value, and the author identity below.

---

## Part 1 — Business

- **Business name:** Camzify (trading name of Camzify Global Pte Ltd, Singapore)
- **Entity note:** Deutics Global LLP is a **separate** Pakistan-registered consulting and
  development firm led by the same person. It was previously credited on this site as
  Camzify's legal entity and in the footer as its engineering arm; both were wrong and
  have been removed. Naming two organizations behind one product is the same
  entity-resolution failure as publishing two addresses — a search engine cannot tell
  which entity the links, reviews and citations belong to. The relationship is stated
  only on `/about/muhammad-talha`, as a fact about a person, where it is unambiguous
  and adds to the author's track record.
- **Domain:** https://camzify.com
- **Industry / niche:** AI video analytics and virtual patrolling software for physical security (B2B SaaS)
- **What they actually sell (one sentence):** A per-camera, per-month subscription that runs scheduled AI patrol rounds on the IP cameras a business already owns — checking a defined checklist at each camera, flagging failures, notifying the assigned guard, and producing a timestamped PDF compliance report.
- **Price positioning:** Mid-to-premium, but deliberately benchmarked against **manned guarding cost, not competing software**. Pricing is quote-based; no rate card is published. ⚠️ verify

### Services or products

1. **Virtual Patrolling** — the flagship. Automated AI patrol rounds with configurable sequences, per-camera checklists, scheduling, guard notifications, compliance tracking and PDF reports.
2. **AI detection features** (23 pages) — line and zone intrusion, motion, camera tampering, multi-object tracking, AI attribute extraction, cross-camera journey map, AI suspect search, tailgating, weapons, aggression, PPE, fire and smoke, slip and fall, abandoned object, littering, illegal parking, wrong-way vehicle, vehicle damage, heatmap anomalies, occupancy trends.
3. **Platform** (12 pages) — dashboard, live streaming, video backup and retention, notifications and alerts, analytics and reporting, user management, permission groups, license and instance management, multi-site management, mobile access, AI architecture.
4. **Camera connectivity** — ONVIF/RTSP/RTMP/HLS/WebRTC ingest plus the Camzify Connector for local networks without port forwarding.

**Money pages** (internal links should be prioritized towards these):
- https://camzify.com/book-a-demo — the primary conversion target
- https://camzify.com/free-trial
- https://camzify.com/pricing
- https://camzify.com/roi-calculator — the highest-intent assist page; 44 inbound links already
- https://camzify.com/virtual-patrolling — the flagship category page

### Homepage positioning — decided 2026-09-03

**Category first, differentiator second.** The homepage now defines Camzify as an
*AI-powered cloud video management system* for the cameras a site already owns, with
virtual patrolling as the capability no other cloud VMS has. Previously it defined the
product as virtual patrolling only, and the H1 ("Without the guard") argued against the
security-agency buyer named as primary.

Why category first: every competitor read for this pass leads with the platform and
lists capabilities before anything else — Verkada ("One platform"), Eagle Eye ("Cloud
Video Management System (VMS)" as a named section), Actuate (a capability list directly
under the H1). Search demand and AI-search classification both key on the category term;
a page that never says "video management" cannot rank for it or be cited as one.

Why the differentiator stays prominent: it is the only thing on the page a Milestone or
Verkada buyer cannot get elsewhere, and the definition sentence names it.

**Implication for the Milestone / Genetec / Verkada comparison pages:** the honest angle
is no longer "we are not a VMS" but "a cloud VMS that runs on the cameras you already own
and adds a verification layer they do not have" — with the on-prem, integration-breadth
and hardware-ecosystem gaps stated plainly rather than papered over.

**Homepage patterns adopted from competitors (verified on their sites):** capability
inventory immediately after the problem statement; buyer-question FAQ covering
deployment model, camera lock-in, storage, security, search and mobile (the questions
the buyer-guide press asks of every VMS); a segment door for the agency buyer on the
cost section. **Deliberately not adopted:** customer counts, G2 badges, "trusted by N
organizations" — nothing on this site may carry a number the business has not verified.

### Service area

- **Primary location(s):** Singapore (headquarters)
- **Towns / suburbs / regions that matter:** Declared `areaServed` is Singapore, Southeast Asia, Middle East, United Kingdom, United States, Australia. The ROI calculator offers US, UK, Singapore, Australia, Europe, Other. ⚠️ verify — six regions is a very wide declared footprint for one site; the real priority market needs confirming.
- **Country for search data:** **United States** (confirmed by the business)
- **Language for search data:** English (`en`), US variant for keyword matching.

> These last two are load-bearing. Wrong values return wrong search volumes in
> every skill, with no error message.

> ### Resolved: US spelling is the house style (2026-09-03)
>
> The target search market is the US, so the copy is written in US English and the
> site declares `locale: en_US`. This was a keyword-matching decision, not a style
> preference: US searchers type "monitoring center", "behavior", "license" and
> "organization", and a Commonwealth-spelled page matches none of them exactly.
>
> What that means when writing or editing copy:
>
> - -ize, -yze, -or, -er, single-l: organize, analyze, behavior, center, canceled,
>   license (noun and verb), catalog, gray, program, judgment, acknowledgment.
> - Proper nouns keep their own spelling. Customer and product names are never
>   respelled ("Carros Centre" stays).
> - Slugs follow the copy. `/partners/for-monitoring-centres` moved to
>   `/partners/for-monitoring-centers` with a permanent redirect in `next.config.js`;
>   do the same if another Commonwealth-spelled slug turns up.
> - Filenames and identifiers were left alone (`scripts/optimise-images.py`,
>   `eslint.ssr.config.mjs` messages). Prose only.
>
> Run `keyword-fanout-map` against US variants.

### Competitors

Two different jobs, and conflating them is why the first pass here was wrong.

**Tier 1 — named for search capture.** Big incumbents with real query volume behind
"<name> alternative" and "vs <name>". These are not who Camzify loses deals to; they are
who prospects have already heard of, and the terms are worth ranking for.

1. **Milestone Systems (XProtect)** — the biggest name in video management software. High
   volume on alternative/comparison queries.
2. **Genetec** — enterprise VMS, same shape of demand.
3. **Verkada** — cloud-native and heavily marketed in the US; the closest big name to
   Camzify's own delivery model, so the comparison is the most natural of the three.
4. **Eagle Eye Networks** — already has a page at `/compare/camzify-vs-eagle-eye-networks`.

The honest angle for all four is the one the site already makes at category level: a VMS
records and manages video, and Camzify verifies that specific things were checked and
produces the evidence. A page that pretends to match Milestone on device support, on-prem
deployment or integration breadth will lose, and would deserve to. A page that says "if
you need a VMS, buy a VMS — here is the different problem we solve" is credible, ranks for
the same term, and converts the subset who actually wanted verification rather than
storage.

**Tier 2 — positioning peers.** Who the product actually competes with on the merits, and
what messaging should be sharpened against. Lower search volume; not comparison-page
material yet.

- **Actuate.ai** — US-based, AI detection layered onto cameras the customer already owns.
  The closest match on the market to Camzify's own pitch.
- **Irisity** — established AI video analytics; the foil for the AI features side.

**Tier 3 — supplied by the business, not currently worth a page.** Digifort, Videonetics,
Camect, Umbo CV, Specter, Enview, IPTechView, Airship AI, PromptView, VisionFacts,
Hexatech, Bluedove, WeSight, Surveillant, CameraDX, FortixAI, Intelisenz, Torlin, Staqu,
Envision Labs. Real competitors commercially, but too little organic search presence for a
comparison page to earn its keep. Revisit if any starts ranking, or if sales reports one
of them coming up repeatedly in live deals — a name prospects raise themselves is worth a
page regardless of search volume.

### Who competitors target on their own websites

Researched 2026-09-03 by reading the sites themselves. This matters because the business
has named security agencies as its primary target, and the answer splits cleanly in two.

**The big VMS names do not sell to guarding companies as a buyer.** Milestone, Genetec,
Verkada and Eagle Eye all address (a) end-user organizations by industry — retail,
education, healthcare, manufacturing, government, hotels, logistics — and (b) a channel of
**installers, resellers, distributors, integrators and A&E consultants**. That channel is
people who *fit* systems, not people who *run monitoring as a service*. Eagle Eye's site
carries no mention of monitoring stations or guarding companies at all. Verkada names its
buyers as "security and IT leaders" from "small and midsize businesses to Fortune 500".

**The AI-analytics tier sells to exactly the segment Camzify has named.** Actuate.ai's
navigation is built around it: "Central Monitoring Stations (CMS)", "Alarm Receiving
Centers (ARC)", "Global Security Operations Centers (GSOC)", "Managed Service Providers
(MSP)" and "Remote Guarding", with end-user "Self-Monitoring" as the secondary track.
Irisity carries "Channel Partners", "Central Monitoring Stations" and "Integration
Partners", and names Securitas, G4S, Prosegur and Convergint — the largest guarding
companies in the world — as partners.

Beyond the supplied list, the same segment is served by Becklar (explicit white-label,
"promote your services under your own brand"), 3dEYE, Cloudastructure and Hakimo.

**What this means:**

1. The incumbents leave this buyer alone, so the segment is not crowded by big brands —
   but it is not empty either, and Actuate is the direct rival for it rather than Milestone.
2. Irisity naming Securitas and G4S is proof the segment buys this category. That is the
   strongest available evidence that the agency pitch works.
3. **Competitor tiering should follow the target.** If agencies are primary, the
   comparison pages that matter are Actuate, 3dEYE, Hakimo and Cloudastructure. Milestone
   and Verkada still capture end-user search, but an agency evaluating Camzify is not
   comparing it to a VMS.
4. **There is a vocabulary gap.** The segment searches in its own words and the site does
   not use them: "central monitoring station" (0 pages), "alarm receiving center" (0),
   "GSOC" (0), "security agency" / "guarding company" (0), "white label" (1 passing
   mention). "Remote guarding" appears on 4. Whatever is decided about positioning, these
   are the terms the buyer types.

**Category competitors the site positions against explicitly** (still the most important
group, because the site's whole argument is category-level):
- Manned guarding / security guard companies — **but see the positioning conflict in Part 2:
  security agencies are now the stated primary target, so this framing is aimed at the buyer**
- Guard tour systems (NFC/QR checkpoint verification)
- Traditional VMS and on-premise NVR systems
- Basic pixel-based motion detection
- Remote guarding / monitoring centers

### Goals

- **Primary goal:** Demo requests. Every page ends in a CTA band pointing at `/book-a-demo`, with `/roi-calculator` as the secondary "calculate your savings" path.
- **What a customer is worth, roughly:** Supplied 2026-09-02. Entry point is roughly **20 cameras at a floor of USD 300/month**, so about **USD 3,600/year at the very bottom**. Pricing scales on camera count and features. Some accounts run **100+ streams**, which at the entry ratio implies **five figures a year**. Security agencies covering several client sites sit at the top of that range rather than the bottom.
  **What this means for content strategy:** with an entry ACV in the thousands and a ceiling in five figures, a guide that produces two or three qualified demo requests a year has paid for itself many times over. The long tail is worth chasing much further down than a low-ACV business could justify — a page targeting 40 searches a month is viable here. It also means depth beats volume: one page that convinces a security agency with 200 cameras is worth more than fifty that attract single-site prospects.
  **Not published, and should not be.** Pricing stays quote-based, and these figures are internal.
- **What this business will NOT do:** Publish unverified numbers, publish a public rate card, claim certifications it does not hold, claim to replace all security guards, or claim zero false alarms. These are not preferences — they are published commitments on `/trust` and in `/llms.txt`.

### Proof and assets

Only things that are genuinely true and, ideally, already published. These feed
content and AI citations, so a fabricated claim here poisons everything downstream.

- **Real numbers the business can claim:** **None currently publishable.** The `/trust` page states explicitly that customer counts, cameras connected, patrol volumes, uptime percentages and response times are not published because they have not been through a verification process the business would defend.
- **Case studies / results that actually exist:** **None.** The 16 industry pages carry a "What a first deployment looks like" process block instead of case studies, precisely because no publishable customer results exist yet.
- **Certifications, awards, associations, memberships:** Singapore PDPA, GDPR, SOC 2 Type II and ISO 27001 are **all in progress and none are held**. The site renders each with an explicit "In progress" badge. **No skill may describe Camzify as certified under any of these.**
- **Years in business / team size:** Serving customers for three years as of 2026. Team of around 20. *(Supplied by the business 2026-09-02.)* The three-year figure is publishable and now appears on `/about`; the team size is recorded here for context but is deliberately not on the site — for an enterprise security buyer a headcount in the tens reads as a risk signal rather than a credential, and nothing on the site currently needs it.

### Report contents — read from two SUPERSEDED reports, 2026-09-03

Two reports were supplied, one manual and one automated. **The business subsequently
clarified that both come from a previous report design and do not necessarily reflect
current output.** They were shared as a source of material for the site, not as a
specification, so everything below is evidence of what the product did at some point —
not confirmation of what it does now. Treat any claim resting only on these as
provisional until checked against a current report.

**Manual round, per item:** serial number, site, time, checklist item, compliance answer,
remarks, rectification message, a BEFORE frame, and an AFTER frame (or "No Rectification
Required"). Header carries total checklist items covered, compliance count, non-compliance
count and pending count.

**Automated round, per camera:** checklist number, site, time, a plain-language scene
description, people count, estimated gender, the captured frame, emotions and expressions,
possible safety risks, possible security risks, objects detected, and each checklist item
with its answer **and the reasoning behind it** — e.g. "the room appears to be lit,
indicating lights might be on".

**Two fields are deliberately NOT promoted on the site: estimated gender and emotions
and expressions.** See the risk note below.

**Which live site claims rest on what.** Independently confirmed by the business or by the
application itself, so safe regardless of the report design: before/after frames on a fixed
item, the checklist states, guard notification, and the safety/security risk assessment on
automated rounds. Resting **only** on these superseded reports, and needing confirmation
against a current one: the plain-language reasoning attached to each automated answer, the
scene description, the people count, the objects-detected list, and the claim that risk
entries are filled in at every stop rather than only when something is found. All five are
currently live on `/virtual-patrolling/patrol-reports`,
`/virtual-patrolling/automated-patrol-scheduling`, `/virtual-patrolling/risk-detection`,
the homepage Auto-Patrol section and `/llms.txt`.

> **⚠️ LEGAL RISK — needs a decision, and probably legal advice.**
>
> The automated report performs **emotion inference** ("Emotions and Expressions") and
> **gender estimation** ("Estimated Gender") on people in frame, and these are written into
> a document customers receive.
>
> Under the **EU AI Act**, emotion recognition in the workplace is a prohibited practice,
> and inferring characteristics such as gender from biometric data is restricted
> biometric categorization. In the **US**, Illinois BIPA and comparable state laws create
> exposure around biometric identifiers, with a private right of action in Illinois.
>
> This is why neither field appears anywhere in the marketing copy. Marketing them would
> advertise the exposure; but the exposure exists in the product regardless of whether the
> site mentions it. Worth a conversation with counsel about whether these fields should be
> generated at all, especially for any EU or Illinois deployment.

### Issues observed in the superseded reports — may already be fixed

*Recorded from the superseded design. Re-check against a current report before acting on
any of them — the report design has changed since.*

- **Domain inconsistency.** The manual report footer reads `www.camzify.com`; the automated
  report reads `www.camzify.live`. One of the two is wrong on a document customers keep.
- **`Location: None`** on both reports — the field renders but is never populated.
- **Two of six stops returned `N/A` for every field** in the automated report, including the
  checklist response. A third of the round produced no assessment and the report does not
  say why.
- The automated report has no overall compliance count or percentage in its header, while
  the manual one does.

### Author identity (for author bios and E-E-A-T)

**Resolved 2026-09-02.** Guides carry a named byline.

- **Who is credited as author:** Muhammad Talha, Product Manager and CTO at Camzify
- **Their credentials, in one line:** Nine years building computer vision and automated surveillance systems
- **Author page URL:** `/about/muhammad-talha`
- **Contact on the byline:** talha@camzify.com · https://www.linkedin.com/in/its-talha/

Implemented: `siteConfig.author` holds the identity, `personSchema()` in `lib/seo.ts`
emits the Person node, `articleSchema` points its `author` at `PERSON_ID` instead of
`ORG_ID`, and `components/content/author-byline.tsx` renders the visible byline on all
11 article guides plus the guides index. The Person node is emitted on every page that
references it so the `@id` resolves rather than dangling.

Everything visible and everything in the schema reads from `siteConfig.author`, so a
byline and its structured data cannot disagree — which is the specific failure that
gets a rich result withheld.


### The call to action

- **Primary CTA:** "Book a Demo" (secondary: "Calculate Your Savings")
- **Where it points:** https://camzify.com/book-a-demo
- **What happens after the click:** A four-field form (name, work email, company, camera-count band). On submit the lead is stored and an internal notification email is sent. The user sees: *"Demo request submitted. We will contact you within one business day to schedule your session."* ⚠️ verify — is one business day the real SLA?
- **Phone:** +65 6901 8738
- **Address (exactly as it should appear everywhere):** `89 Kaki Bukit Avenue 1, #02-00, Shun Li Industrial Park, Singapore 417957` — **confirmed by the business.** The obsolete Tampines address has been removed from `/about`, `/faqs` and `/llms.txt`; every surface now derives from `lib/site-config.ts`.

---

## Part 2 — Voice

### Tone in three words

Plain. Technical. Unhyped.

### The reader

- **PRIMARY TARGET, stated by the business 2026-09-02: security agencies.** Guarding companies that cover many client sites and would use Camzify to deliver monitoring across all of them. This is a reseller-shaped buyer, not an end user: they care about coverage per guard-hour, per-client separation, and what they can show their own customers. **See the positioning conflict flagged at the end of this section.**
- **SECOND STATED SEGMENT, from the business 2026-09-03: monitoring companies.** Companies that work *behind* security agencies: they run the monitoring on the agency's behalf and notify the agency's guards when needed (CMS, ARC, GSOC shapes). Three-party relationship — end client owns the site, agency holds the contract and the guards, monitoring company operates the console. What they care about: operator load, being able to notify the agency's guard from the round, per-agency separation, and a per-round report the agency can show its client. Page: `/partners/for-monitoring-centers`. Not a reseller pitch — they are the account holder.
- **Who is reading (end-user segment):** A security manager, facilities manager, or operations director responsible for one or more physical sites. They already own cameras. They are evaluating whether to cut, supplement or justify guarding spend. Secondary reader: security integrators, MSPs and monitoring centers evaluating a channel partnership.
- **Reading level:** Professional/technical B2B. Comfortable with RTSP, ONVIF, NVR, false-positive rates. Does not need jargon explained, but does need claims substantiated.
- **What they are afraid of:** Paying for patrol rounds that are not actually happening. An incident occurring in an unwatched window and being asked afterwards why nobody saw it. Alert fatigue from a system that cries wolf. Buying software that turns out not to work with the cameras already installed. Being sold an AI product that is a demo, not a shipping capability.
- **What would make them trust this business:** Specificity and admitted limits. The site already earns trust by publishing what it does *not* claim, by marking roadmap features as roadmap, and by refusing to publish numbers it cannot verify. That posture is the differentiator — protect it.

> **⚠️ POSITIONING CONFLICT — needs a decision from the business.**
>
> The site's strongest argument is aimed at *replacing* manned guarding: `/virtual-patrolling/vs-security-guards`, the cost-versus-guards section on the homepage, the guard-cost guides, and the repeated line that it "replaces the routine patrol round". That argument is written for an end user who is currently paying a guarding company.
>
> If security agencies are the primary target, the site is arguing against its own buyer. A guarding company reading "here is what you would save by not hiring guards" is being told its business model is the problem.
>
> The same product supports the opposite pitch without a single false claim: an agency that adds virtual patrolling covers more client sites per guard-hour, offers overnight coverage it could not staff, and hands each client a compliance report with its own name on it. Camzify becomes margin rather than a threat.
>
> Both audiences can be served, but not by the same page. The likely shape is: keep the replacement argument for end users, and build an agency track — `/partners/for-security-agencies`, with the multi-tenant sub-user model, per-client reporting and coverage-per-guard-hour economics — then decide which one the homepage leads with. That is a business decision, not a copy edit.

### Say / don't say

| Always | Never |
|--------|-------|
| "virtual patrolling" (the category term this site is trying to own) | "revolutionary", "cutting-edge", "game-changing", "seamless" |
| "the cameras you already own" / "existing cameras" | Any specific price, discount or margin |
| "confirmed object track" (vs "pixel motion") | "certified" in relation to PDPA, GDPR, SOC 2 or ISO 27001 |
| "replaces the routine patrol round, not the security function" | "replaces your security guards" (unqualified) |
| "timestamped", "auditable", "compliance record" | Invented customer counts, uptime %, response times |
| Name the capability, not the category | "AI-powered" as a modifier — say what it actually does |
| Operational, procedural language | Military/combat framing: "threat neutralized", "war room", "mission-critical", "defend your perimeter" |
| "virtual patrolling", "the patrol report", "line intrusion detection" | "solution" and "platform" as standalone nouns |
| Plain verbs | revolutionary, cutting-edge, game-changing, seamless, unlock, leverage, elevate, robust, best-in-class |

### Sentence style

- **Person:** First person plural for the company ("we build", "we do not claim"); second person for the reader ("your site", "the cameras you already own"). Feature and guide pages are largely impersonal and descriptive.
- **Contractions:** Rare. The copy consistently prefers expanded forms — "cannot", "does not", "is not". Match this.
- **Humour:** None. Not one joke across 121 pages. Do not introduce any.
- **Sentence length:** Medium, varied. Em-dash asides sparingly (2026-09-03: cut from ~100 to ~20 across the revamped pages; a dash-heavy page reads as machine-written). Prefer a full stop, a colon or a comma. Paragraphs run 2–4 sentences. Opening sentences are definitional and self-contained.
- **Anything structural to always do or never do:** Answer in the first two sentences, then expand. Write sentences that survive being quoted out of context. Never open with a preamble or a rhetorical question. Never use a heading that does not describe what follows.

### Words from the business's own mouth

> "Your site. Patrolled 24/7. Without the guard."

> "Camzify runs scheduled AI patrol rounds across the cameras you already own — checking every point on the route, flagging what fails, and notifying the guard responsible."

> "We do not claim to replace all security guards at all facilities. We do not claim zero false alarms. We do not claim compliance with certifications we have not obtained."

> "The real comparison is not Camzify vs another platform. It is the cost of running AI patrol rounds vs the cost of hiring guards to walk the same route."

> "Line intrusion detection … fires when a confirmed object track crosses the line — not when a shadow moves or a light flickers."

> "We list certification work honestly, including where it is unfinished."

---

## Hard content rules

Things no skill may ever do on this site:

- **Never publish a price, rate, discount or margin.** Pricing is quote-based by explicit business decision. The `SoftwareApplication` schema deliberately carries an `Offer` with no `price`.
- **Never describe Camzify as certified** under PDPA, GDPR, SOC 2 Type II or ISO 27001. All four are in progress and none are held.
- **Never invent a customer, case study, deployment size, uptime figure, response time or camera count.** None are currently publishable.
- **Never describe a roadmap feature as shipping.** Loitering Detection and Behavioral Analytics are roadmap only.
- **Never put a year in a page title** (e.g. "| 2024 Rates"). It ages into a liability.
- **Never state the company address, phone or legal name from memory** — it comes from `lib/site-config.ts`, and the address is currently unconfirmed (see above).
- Never invent statistics, results, reviews or credentials.
- Never cite a source that was not fetched and confirmed in that run.
