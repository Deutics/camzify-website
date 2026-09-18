import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { ComparisonTable } from '@/components/content/comparison-table';
import { PointList } from '@/components/content/point-list';
import { ProductShot } from '@/components/content/product-shot';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 *
 * Every statement about Eagle Eye Networks on this page comes from a page opened on
 * 18 September 2026 and listed in the Sources section. Eagle Eye and Brivo merged in
 * January 2026, and most product pages on een.com now redirect to brivo.com, where the
 * product is named Brivo Eagle Eye Video. A source reached by such a redirect is listed
 * with the een.com address it was opened from. Nothing about their pricing is
 * characterized beyond what their pages state, and no figure is quoted.
 */
const pageMeta = {
  title: "Camzify vs Eagle Eye Networks | An Alternative?",
  description: "Camzify runs AI detections and patrol rounds on cameras you own, nothing on site. Eagle Eye Networks is a bridge-based cloud VMS sold via partners.",
  path: "/compare/camzify-vs-eagle-eye-networks",
};

export const metadata = generatePageMeta({ ...pageMeta });

const sides = ['Camzify', 'Eagle Eye Networks'];

/** Eagle Eye pages opened for this comparison. Rendered at the bottom of the page. */
const sources = [
  { label: 'Eagle Eye Networks home page', href: 'https://www.een.com/' },
  { label: 'Eagle Eye company page', href: 'https://www.een.com/company/' },
  { label: 'Eagle Eye and Brivo, one organization (January 2026)', href: 'https://www.een.com/blog/eagle-eye-networks-and-brivo-integration-at-every-level/' },
  { label: 'Eagle Eye Cloud VMS FAQ', href: 'https://www.een.com/support/cloud-vms-faq/' },
  { label: 'Eagle Eye camera compatibility', href: 'https://www.een.com/support/camera-compatibility-digital-ip/' },
  { label: 'Eagle Eye hardware', href: 'https://www.een.com/hardware/' },
  { label: 'Eagle Eye bridges', href: 'https://www.een.com/hardware/bridges/' },
  { label: 'Eagle Eye CMVRs', href: 'https://www.een.com/hardware/cmvrs/' },
  { label: 'Eagle Eye security cameras', href: 'https://www.een.com/hardware/security-cameras/' },
  { label: 'Eagle Eye technology partners', href: 'https://www.een.com/partners/' },
  { label: 'Eagle Eye Video API Platform', href: 'https://www.een.com/product/api-categories/' },
  { label: 'Cloud VMS (een.com/product/vms-video-management-system/ redirects here)', href: 'https://www.brivo.com/platform/video-management-system/' },
  { label: 'Video editions: Standard, Professional, Enterprise, Multifamily', href: 'https://www.brivo.com/platform/video-management-system-editions/' },
  { label: 'Camera Direct (een.com/product/camera-direct/ redirects here)', href: 'https://www.brivo.com/platform/video-management-system/camera-direct/' },
  { label: 'Eagle Eye Complete (een.com/product/complete/ redirects here)', href: 'https://www.brivo.com/products/video-surveillance/complete/' },
  { label: 'Remote video monitoring (een.com/remote-video-monitoring/ redirects here)', href: 'https://www.brivo.com/products/remote-video-monitoring/' },
  { label: 'Gun detection (een.com/gun-detection/ redirects here)', href: 'https://www.brivo.com/products/video-analytics/ai-gun-detection/' },
  { label: 'Face Match (een.com/face-match/ redirects here)', href: 'https://www.brivo.com/products/video-analytics/face-matching-software' },
  { label: 'License plate recognition (een.com/product/license-plate-recognition/ redirects here)', href: 'https://www.brivo.com/products/video-analytics/license-plate-recognition/' },
  { label: 'Person and vehicle detection (een.com/precision-person-vehicle-detection/ redirects here)', href: 'https://www.brivo.com/products/video-analytics/person-vehicle-detection/' },
  { label: 'Reseller program (een.com/reseller/reseller-program-overview/ redirects here)', href: 'https://explore.brivo.com/partners/why-partner-with-brivo/' },
];

const rows = [
  { label: 'What you buy', values: ['Software only: a monthly subscription that runs on the cameras a site already has. No hardware is sold.', 'A cloud VMS subscription plus on-site hardware: a bridge or CMVR that connects cameras to its data centers, and its own cameras, switches, sensors and cabinets. Eagle Eye Complete bundles the hardware into the subscription.'] },
  { label: 'Cameras', values: ['Any ONVIF or RTSP camera, plus RTMP and HTTPS streams. Private-network cameras connect through the Camzify Connector, an application on a PC.', 'ONVIF Profile-S cameras, and analog cameras through analog-ready bridges. Its pages give several compatibility figures, from more than 4,000 to more than 10,000 models, and it sells more than twenty cameras of its own.'] },
  { label: 'On-site hardware', values: ['None. The optional Connector is software on a Windows, macOS or Linux machine.', 'A bridge that buffers video if the internet drops and encrypts it to the cloud, or a CMVR that also stores video locally. Camera Direct removes the bridge for factory-configured Eagle Eye cameras, Axis and some other recent models.'] },
  { label: 'Recording and retention', values: ['Cloud recording, continuous or scheduled. Retention set per camera in days or as a storage cap, from a storage pool sold per terabyte.', 'Cloud retention set by edition: the editions page lists 30 days on Standard and 90 days on Professional. A CMVR adds local storage from 1 TB to 192 TB.'] },
  { label: 'AI detections', values: ['23 detection models on confirmed object tracks, licensed per feature per camera. Motion and camera tampering included with every camera.', 'Person and vehicle detection with zones and schedules, natural-language smart video search, license plate recognition on any ONVIF camera, gun detection confirmed by a trained specialist, and Face Match through a bridge-connected unit. Analytics are add-ons by edition.'] },
  { label: 'Patrol rounds and compliance reporting', values: ['Scheduled virtual patrol rounds with a checklist per camera, a guard notified on any failure, and a timestamped report with a compliance percentage per round.', 'Not described on the pages checked. Its remote video monitoring page describes 24/7 AI-filtered monitoring by trained professionals with audio talk-down and dispatch, not a scheduled round with a report each.'] },
  { label: 'Multi-site and users', values: ['Every site on one account. Sub-users scoped to their own sites, permission groups per user, license quota allocated from the parent.', 'Built for multiple locations with no stated limit, and its FAQ states no maximum number of users. Administrators are set by edition: one on Standard, up to five on Professional, unlimited on Enterprise.'] },
  { label: 'Integrations', values: ['Alerts by email, SMS, WhatsApp and push to a named person. Alarm panels, access control and monitoring centers stay with whoever provides them today.', 'A Video API Platform with integrations for access control, sensors, alarm management, point of sale, AI and analytics, LPR, smart parking and building management, plus a directory of technology partners by category and region.'] },
  { label: 'Pricing model', values: ['Per instance per month, quoted per site, from $5 per camera per month.', 'No price is shown on the pages checked. Its FAQ states it does not sell direct and puts you in contact with a channel partner. Editions are Standard, Professional, Enterprise and Multifamily.'] },
  { label: 'Best fit', values: ['A site or portfolio that keeps its cameras, wants nothing installed on site, and needs a verified, reported round.', 'A site that wants cameras, recording hardware, analytics and a local installer from one channel, with local buffering when the internet drops.'] },
];

const eagleEyeBetter = [
  'You want the hardware and the software from one vendor. Eagle Eye sells its own cameras, bridges, CMVRs, switches, sensors and cabinets, and Complete bundles them into one monthly subscription with lifetime repair and replace.',
  'The internet at the site is unreliable. An Eagle Eye bridge buffers video locally when the connection drops and a CMVR stores it on site; a Camzify camera that loses its connection is shown offline until it returns.',
  'You have analog cameras. Its analog-ready bridges and CMVRs digitize them and manage them like IP cameras. Camzify connects IP streams only.',
  'You want a monitored response from the vendor. Its remote video monitoring is staffed by trained professionals with audio talk-down and dispatch, and its gun detection has a specialist confirm the alert. Camzify notifies your own guard or monitoring center and runs none of its own.',
  'You want a local installer, a broad integration catalog and native apps. Eagle Eye sells through a global network of channel partners, its API platform covers access control, alarms, point of sale and parking, its FAQ describes dedicated mobile apps, and its home page offers 24/7 support from a real person. Camzify\'s native apps are in development.',
];

const camzifyBetter = [
  <>Nothing goes on site. There is no bridge or CMVR to buy, mount or power; a camera on a private network needs only the Connector running on a PC. The <Link href="/supported-cameras" className="text-primary hover:underline">supported cameras</Link> page lists what connects.</>,
  <>You need proof that a round happened. A scheduled round checks a list at every camera, messages the guard on a failure and files a report with the frame behind each result and a compliance percentage. No Eagle Eye page we checked describes this. <Link href="/virtual-patrolling" className="text-primary hover:underline">Virtual patrolling</Link> explains the round.</>,
  <>You license detections camera by camera rather than by edition. Each of the 23 <Link href="/ai-features" className="text-primary hover:underline">AI features</Link> is an instance on one camera, so a corridor can record and nothing more while the gate runs intrusion and weapons detection.</>,
  <>Retention is a per-camera decision. Storage is one pool the account spends as it chooses, ninety days on a gate and seven on a corridor, rather than a retention period fixed by edition.</>,
  <>You are a security agency or monitoring company covering other people&apos;s sites. Each client is a sub-user scoped to its own cameras, with quota allocated from your account and a report per round for that client.</>,
  <>You want a floor price and a quote from the vendor. Camzify is quoted per site from $5 per camera per month on the <Link href="/pricing" className="text-primary hover:underline">pricing</Link> page; Eagle Eye&apos;s FAQ says it does not sell direct.</>,
];

const faqs = [
  { question: 'Is Camzify an Eagle Eye Networks alternative?', answer: 'For the video part, yes. Both are cloud video management systems with AI analytics and multi-site management. Camzify does it with no bridge or recorder on site and adds a scheduled patrol round with a compliance report, which is what makes it an alternative for a site that wants to keep its cameras and prove its rounds. It is not an alternative for access control, alarm monitoring or vendor-run monitoring, which Eagle Eye and Brivo offer and Camzify does not.' },
  { question: 'Do I need a bridge with Camzify?', answer: 'No. A camera reachable from the internet is added by its RTSP address; a camera on a private network is relayed by the Camzify Connector, an application on a Windows, macOS or Linux machine inside that network, without port forwarding. Eagle Eye\'s FAQ describes the bridge as an on-premise appliance that connects cameras to its data center and buffers video if the internet goes down, and Camera Direct removes it for certain Eagle Eye, Axis and recent third-party cameras.' },
  { question: 'Does Eagle Eye Networks run virtual patrol rounds?', answer: 'The Eagle Eye pages we read do not describe a scheduled round that checks a list at each camera and files a report per round. They describe smart video search, real-time alerts, person and vehicle detection, and a remote video monitoring service staffed by trained professionals. A Camzify round is an ordered list of camera stops, a checklist at each, a guard notified on a failure, and a timestamped report with a compliance percentage.' },
  { question: 'How do the prices compare?', answer: 'We do not characterize Eagle Eye\'s pricing here. No price appears on the pages we checked; its FAQ says it does not sell direct and refers you to a channel partner, its editions are Standard, Professional, Enterprise and Multifamily, and Complete puts hardware into the monthly subscription. Camzify starts from $5 per camera per month and is quoted per site, so compare a quote for your camera count against the partner quote you receive for the same cameras.' },
  { question: 'Why do the sources point to brivo.com?', answer: 'Because Eagle Eye Networks and Brivo merged and, from January 2026, operate as one organization under the Brivo name. Most product pages on een.com now redirect to brivo.com, where the product is called Brivo Eagle Eye Video. Each source reached that way is listed with the een.com address it was opened from, so you can check the redirect yourself.' },
];

export default function CamzifyVsEagleEyeNetworksPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Compare', href: '/compare' },
      { label: 'Camzify vs Eagle Eye Networks' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Camzify vs Eagle Eye Networks</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Camzify is software that runs on the cameras a site already owns: a <Link href="/cloud-video-surveillance" className="text-primary hover:underline">cloud VMS</Link> with 23 AI detections and scheduled <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrol rounds</Link>, sold as a monthly subscription with no hardware. Eagle Eye Networks is a cloud VMS built around an on-site bridge or CMVR for most cameras, sold with its own cameras and hardware through a global network of channel partners. A buyer looking for an Eagle Eye Networks alternative that puts nothing on site and adds a verified patrol round is the buyer this page is written for.
          </p>
          <p className="mt-4 max-w-2xl text-body text-muted-foreground">
            Every statement about Eagle Eye here comes from a page opened on 18 September 2026 and listed at the bottom. One thing to know before reading them: Eagle Eye Networks and Brivo merged and, from January 2026, operate as one organization under the Brivo name, so most product pages on een.com now redirect to brivo.com, where the product is called Brivo Eagle Eye Video. Where their pages did not describe something, the row says so rather than scoring it absent.
          </p>

          <div className="mt-10 max-w-3xl">
            <ProductShot src="/product-live-streaming" alt="The live streaming wall in the Camzify console, cameras grouped by site with their online state" label="Live streaming" sizes="(max-width: 1024px) 100vw, 768px" />
          </div>

          <div className="mt-12">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Side by side</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Both are cloud systems with AI detections, alerts and every site on one console, so the table concentrates on where they differ: what goes on site, how detections and retention are licensed, and whether a round is verified.
              </p>
              <div className="mt-6">
                <ComparisonTable columns={['Aspect', sides[0], sides[1]]} rows={rows} />
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where Eagle Eye Networks is the better choice</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Eagle Eye is the stronger option when the hardware, the installer and the integrations are part of what you want to buy, and when the site needs video buffered locally through an internet outage.
              </p>
              <PointList items={eagleEyeBetter} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where Camzify is the better choice</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Camzify is the stronger option when the cameras stay, nothing may be installed on site, and what is missing is proof that the routine round was done.
              </p>
              <PointList items={camzifyBetter} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">The bottom line</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                If you want cameras, a recorder that keeps working through an outage, analytics and a local installer from one channel, Eagle Eye is built for exactly that and has been selling it through partners since 2012. If your cameras work, you do not want an appliance on site, and the gap is that nobody can prove the rounds were done, Camzify puts detections and scheduled patrol rounds on those cameras from the cloud alone. Both record and alert; only one of them files a checked, timestamped round.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Two things to settle first. Whether the site can carry its cameras to the cloud at all: <Link href="/compare/cloud-vms-vs-on-premise" className="text-primary hover:underline">cloud VMS vs on-premise</Link> covers bandwidth and the cases where a recorder still wins, which is also where an Eagle Eye CMVR earns its place. And the cost basis: the <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link> turns your own guard hours into the figure any quote is measured against, and the <Link href="/pricing" className="text-primary hover:underline">pricing</Link> page turns your camera and feature counts into a quote within one business day.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Sources, checked 18 September 2026</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Every statement about Eagle Eye Networks above comes from one of these pages, read on that date. Pages reached by a redirect from een.com are listed with the address they were opened from. If a row here disagrees with what their site says today, their site is current and this page is not.
              </p>
              <ul className="mt-4 max-w-prose space-y-2 text-sm text-muted-foreground">
                {sources.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{s.label}</a>
                    <span className="ml-2 break-all font-mono text-xs text-muted-foreground">{s.href}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>
      <FaqSection items={faqs} />
    </PageShell>
  );
}
