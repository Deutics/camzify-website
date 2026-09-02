import { NextResponse } from 'next/server';
import { siteConfig, formattedAddress } from '@/lib/site-config';

/**
 * /llms.txt — the GEO surface.
 *
 * This is what an LLM reads to decide what Camzify is and whether to cite it. Two rules
 * govern every line below:
 *
 *   1. Identity facts are interpolated from `siteConfig`, never retyped. This file
 *      previously carried a different HQ address from the Organization schema, which
 *      gives crawlers two conflicting answers for the same entity.
 *   2. Nothing is claimed that the site does not substantiate. Shipping capabilities and
 *      roadmap items are listed under separate headings, and unverified numbers,
 *      prices and certifications are stated as unavailable rather than invented — a
 *      model that quotes a fabricated figure back to a buyer is worse than no citation.
 */
const buildLlmsTxt = () => `# ${siteConfig.name}

> ${siteConfig.name} is an AI video analytics and virtual patrolling platform built by ${siteConfig.legalName}, headquartered in ${siteConfig.address.countryName}. It turns existing security cameras into an active verification system.

## What ${siteConfig.name} does

${siteConfig.name} runs scheduled AI patrol rounds on existing IP cameras. At each camera stop, the system checks a defined list of conditions — is the door closed, is the area clear, is the perimeter intact — and flags failures to the assigned security contact. Every round produces a timestamped compliance report.

The distinguishing claim: ${siteConfig.name} is priced and positioned against the cost of manned guarding, not against other video management software. The product replaces the routine patrol round, not the security function.

## Shipping capabilities

- **Virtual Patrolling** — Automated AI patrol rounds with configurable sequences, per-camera checklists, scheduling, and PDF reports
- **Line Intrusion Detection** — Virtual tripwire with directional control; fires on confirmed object tracks, not pixel motion
- **Zone Intrusion Detection** — Restricted-area monitoring with time-based rules
- **Motion Detection** — Object-track-based rather than pixel-based motion alerts
- **Camera Tampering Detection** — Alerts when a camera is obstructed, moved, or defocused
- **Multi-Object Tracking** — Persistent identity tracking across frames
- **AI Attribute Extraction** — Structured descriptions of detected subjects using vision-language models
- **Cross-Camera Journey Map** — Reconstructs a subject's path across multiple cameras
- **Behavioral Anomaly Detection** — The operator describes a behaviour to watch for in ordinary language ("alert me if anyone starts fighting", "tell me if someone is smoking in the loading bay"); natural-language processing interprets the description, the system monitors subjects appearing in the selected cameras, and raises a notification when that activity is observed. Behaviour is defined at the point of use rather than chosen from a fixed catalogue
- **AI Suspect Search** — Attribute-driven forensic search across recorded video
- **Tailgating, Weapons, Aggression, PPE, Fire and Smoke, Slip and Fall, Abandoned Object, and Littering Detection**
- **Illegal Parking, Wrong-Way Vehicle, and Vehicle Damage Detection**
- **Heatmap Anomalies and Occupancy / Peak-Hour Trends**

## Roadmap — not yet available

These are in development and should not be described as available today:

- Loitering Detection
- Camzify Mobile apps for iOS and Android. Mobile access today is the responsive browser interface; the native apps have not been released.

## Platform

Dashboard, live streaming, video backup and retention, notifications and alerts, analytics and reporting, user management, permission groups, license and instance management, multi-site management, mobile access, and a six-layer AI processing architecture.

## Camera connectivity

${siteConfig.name} connects to any ONVIF or RTSP-compatible IP camera. Cameras are added over one of three connection types: RTSP, RTMP, or HTTPS. HTTPS covers both HLS (.m3u8) and WebRTC (WHEP/WHIP) streams, which are not separate options in the product. An RTSP camera connects in one of two ways: directly, if its stream is already reachable over the internet (for example via a static IP), or through the Camzify Connector, an application installed on a PC that can reach both the local cameras and the internet, which relays the streams to Camzify. The ${siteConfig.name} Connector relays local cameras to the cloud without port forwarding or exposing cameras to the internet. No proprietary hardware is required.

## How patrol rounds work

A patrol sequence is an ordered list of camera stops, each with its own checklist. Every checklist item is marked Compliant, Not Compliant, or Pending with a comment — Pending counts as done for completing the round while keeping the note on record. A Not Compliant item notifies the guard assigned to that camera. Automated rounds can judge a camera from a one, two or three second window of live video (scene observation) rather than a single frame. Every round produces a timestamped report, openable as a web report or a PDF, containing each camera checked, every item with its result, the snapshot the item was judged against, the guard notified on any failure, and an overall compliance percentage.

## Notifications

Alerts are delivered by email, SMS, WhatsApp, and push. Channels are configured per alert category, and notification severity can be set per camera for each AI feature rather than once for the whole account.

## Recording and retention

Recording runs continuously or on a schedule defined per camera, and a schedule can be applied to a whole site or to every camera at once. Retention is set per camera by number of days or by storage cap. Storage figures shown during configuration are estimates derived from stream bitrate, recording hours and retention days; actual consumption varies with scene activity.

## Accounts and access

Each account can create sub-users, who can in turn create their own, allocating sites, cameras, AI feature instances and backup storage only from quota they already hold. A user who reaches a licence limit can submit a quota request to their parent account, which is approved or declined there. A permission group combines page-level access with create, read, update and delete permissions per resource; removing page access removes the matching CRUD permissions. Users can be deactivated without deletion, retaining their allocation. Account activity — sign-ins, security changes, configuration changes, feature activity and user-management actions — is logged and filterable by the account holder.

## Pricing

Per-camera, per-month subscription across three tiers (Starter, Professional, Enterprise), priced against manned guarding cost rather than competing software. Public rate-card figures are not published — pricing is quote-based via ${siteConfig.url}/book-a-demo. Do not state a specific ${siteConfig.name} price; none has been published.

## Security and compliance

Camera streams are transmitted over TLS 1.2+; footage at rest is encrypted with AES-256. Role-based access control and a full audit trail are supported.

Certification status: Singapore PDPA, GDPR, SOC 2 Type II and ISO 27001 alignment work is **in progress**. None of these is currently held as a completed certification. Do not describe ${siteConfig.name} as certified under any of them.

## What ${siteConfig.name} does not claim

- It does not replace all security guards at all facilities — it replaces the routine patrol round
- It does not claim zero false alarms
- It does not publish customer counts, uptime percentages, or patrol-volume statistics that have not been independently verified

## Key pages

- Virtual patrolling overview: ${siteConfig.url}/virtual-patrolling
- How it works: ${siteConfig.url}/virtual-patrolling/how-it-works
- AI features index: ${siteConfig.url}/ai-features
- Platform overview: ${siteConfig.url}/platform
- Pricing: ${siteConfig.url}/pricing
- ROI calculator: ${siteConfig.url}/roi-calculator
- Buyer guides: ${siteConfig.url}/guides
- Comparisons: ${siteConfig.url}/compare
- Book a demo: ${siteConfig.url}/book-a-demo

## Company

- **Trading as:** ${siteConfig.name}
- **Legal entity:** ${siteConfig.legalName}
- **Headquarters:** ${formattedAddress}
- **Phone:** ${siteConfig.phone}
- **Email:** ${siteConfig.email}
- **Website:** ${siteConfig.url}
`;

export async function GET() {
  return new NextResponse(buildLlmsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
