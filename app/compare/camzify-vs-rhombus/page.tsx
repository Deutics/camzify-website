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
 * Every statement about Rhombus on this page was read from a Rhombus page on the date
 * in the Sources section. If Rhombus changes its offer, update the cell and the date
 * together rather than leaving a stale claim under a fresh date.
 */
const pageMeta = {
  title: "Camzify vs Rhombus | Keep Your Cameras or Replace",
  description: "Rhombus sells its own cameras and licenses. Camzify is software for the ONVIF and RTSP cameras you already own, from $5 a camera a month.",
  path: "/compare/camzify-vs-rhombus",
};

export const metadata = generatePageMeta({ ...pageMeta });

const sides = ['Camzify', 'Rhombus'];

/** Rhombus pages read for this comparison. Every competitor cell above traces to one of these. */
const sources = [
  { href: 'https://www.rhombus.com/', label: 'Rhombus homepage: product categories, integrations, open API' },
  { href: 'https://www.rhombus.com/cameras/', label: 'Rhombus cameras: in-house hardware, onboard storage, warranty' },
  { href: 'https://www.rhombus.com/cameras/relay-connector/n100/', label: 'Relay Core N100: third-party ONVIF and RTSP cameras' },
  { href: 'https://www.rhombus.com/console/', label: 'Rhombus Console: unlimited locations, users, alerts, mobile apps' },
  { href: 'https://www.rhombus.com/ai-analytics/', label: 'Rhombus AI analytics: search, recognition, occupancy, deterrence' },
  { href: 'https://www.rhombus.com/access-control/', label: 'Rhombus access control: controllers, readers, credentials' },
  { href: 'https://www.rhombus.com/alarm-monitoring/', label: 'Rhombus alarm monitoring: live agents, verification, dispatch' },
  { href: 'https://www.rhombus.com/integrations/', label: 'Rhombus integrations: categories and API reference' },
  { href: 'https://www.rhombus.com/pricing/', label: 'Rhombus pricing: hardware and license prices, license terms' },
  { href: 'https://www.rhombus.com/license-comparison/', label: 'Rhombus license comparison: Professional vs Enterprise' },
];

const faqs = [
  { question: 'Can I keep my existing cameras with Camzify or with Rhombus?', answer: 'With Camzify, yes: any ONVIF or RTSP camera connects, directly or through the Camzify Connector, with nothing bought or mounted. Rhombus is built around its own cameras, and its route for existing cameras is the Relay Core N100, an appliance that ingests third-party ONVIF and RTSP cameras and needs a Rhombus Professional or Enterprise license. Cameras can move to either; on Rhombus they move through a device you buy and license.' },
  { question: 'Does Rhombus run virtual patrol rounds?', answer: 'The Rhombus pages we read do not describe a scheduled round that checks a list at each camera and files a report per round. They describe smart alerts, AI video search, video walls and automated workflows from AI detections. A Camzify round is a different thing: an ordered list of camera stops, a checklist at each, a guard notified on a failure, and a timestamped report with a compliance percentage.' },
  { question: 'How do the prices compare?', answer: 'We do not characterize Rhombus pricing here beyond what its own pricing page states: it publishes hardware prices and per-camera license prices, in Professional and Enterprise tiers, on one, three, five or ten year terms. Camzify publishes one figure, from $5 per camera per month, and quotes everything else per site.' },
  { question: 'Does Camzify do access control, sensors or alarm monitoring?', answer: 'No. Camzify is video software only: live view, cloud recording, AI detections and patrol rounds on the cameras you own. Doors, sensors and alarm panels stay with whoever provides them today, and a guard or monitoring center is notified from the round rather than replaced by it. Rhombus sells door controllers, readers, IoT sensors and live-agent monitoring under one console, an advantage if you want all of it from one vendor.' },
  { question: 'How does recording and retention differ?', answer: 'Rhombus cameras record to onboard storage and keep recording through an internet outage; retention days are listed per camera model, and cloud archiving is bought separately on the Professional license or included for thirty days on Enterprise. Camzify records to the cloud, continuously or on a schedule, with retention set per camera in days or as a storage cap and storage sold per terabyte. A camera that loses its connection to Camzify is shown offline until it returns.' },
];

export default function CamzifyVsRhombusPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Compare', href: '/compare' },
      { label: 'Camzify vs Rhombus' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Camzify vs Rhombus</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Camzify and Rhombus answer the same question from opposite ends: Rhombus replaces the camera, Camzify keeps it. Rhombus is a cloud-managed physical security system that sells its own dome, fisheye, bullet and multisensor cameras, plus access control, IoT sensors and alarm monitoring, each on a published license. Camzify is software only: a <Link href="/cloud-video-surveillance" className="text-primary hover:underline">cloud VMS</Link> that connects to the ONVIF and RTSP cameras a site already owns, adds AI detections and scheduled <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrol rounds</Link> with a report per round, and is quoted per site from $5 per camera per month.
          </p>
          <p className="mt-4 max-w-2xl text-body text-muted-foreground">
            If you are looking for a Rhombus alternative because you do not want to take working cameras off the wall, this page sets out that case. If you are replacing cameras anyway, or you want doors, sensors and a monitoring center from one vendor, Rhombus is the fuller system and the sections below say so. Both are cloud video management systems run from one console across any number of sites; the difference is what each asks you to buy. Every statement about Rhombus here was read from its own pages, listed at the end.
          </p>

          <div className="mt-10 max-w-3xl">
            <ProductShot src="/product-live-streaming" alt="The live streaming wall in the Camzify console, cameras grouped by site with their online state" label="Live streaming" sizes="(max-width: 1024px) 100vw, 768px" />
          </div>

          <div className="mt-12">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Side by side</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                The Rhombus column describes what its pages state. Where a capability depends on the license tier, the tier is named. Where a Rhombus page does not describe something, the cell says that rather than scoring it absent.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Two differences do not fit a row and cut in opposite directions. Rhombus has native iOS and Android apps, and its cameras keep recording to onboard storage when the internet drops. Camzify is used from the browser on a phone or desktop, with native apps in development and not yet released, and a camera that loses its connection is shown offline until it returns. If either of those is a deciding factor, it decides before the table does.
              </p>
              <div className="mt-6">
                <ComparisonTable
                  columns={['Aspect', sides[0] ?? 'Camzify', sides[1] ?? 'Rhombus']}
                  rows={[
                    { label: 'What you buy', values: ['A software subscription. No hardware is sold; the only on-site software is the optional Camzify Connector on a PC', 'Cameras, door controllers, readers, intercoms and sensors engineered in-house, each with a Professional or Enterprise license'] },
                    { label: 'Cameras', values: ['The ONVIF, RTSP, RTMP or HTTPS cameras you already own, connected directly or through the Connector', 'Rhombus dome, fisheye, bullet and multisensor cameras with a ten-year warranty; existing ONVIF and RTSP cameras through the Relay Core N100 appliance'] },
                    { label: 'Recording and retention', values: ['Cloud recording, continuous or scheduled, with retention per camera in days or a storage cap; storage sold per terabyte', 'Onboard camera storage that keeps recording through an internet outage, retention listed per model; cloud archiving purchased on Professional, thirty days included on Enterprise'] },
                    { label: 'AI detections', values: ['23 detections on confirmed object tracks, licensed per camera: intrusion, loitering, weapons, fire and smoke, PPE, tailgating, behavior described in plain language, and more', 'Smart alerts for motion, people and vehicles on both tiers; facial recognition, license plate recognition, AI video search and line crossing on Enterprise; occupancy, heat maps, audio and visual deterrence'] },
                    { label: 'Patrol rounds and compliance reporting', values: ['Scheduled rounds with a checklist per camera, a guard notified on a failure, and a timestamped report with a compliance percentage for every round', 'Not described on the Rhombus pages we read; alerts, AI search and automated workflows are the review tools it describes'] },
                    { label: 'Multi-site and users', values: ['Every site on one account; sub-users scoped to their own sites with quota allocated from the parent and permission groups per user', 'Unlimited locations and unlimited users on both tiers, with granular access and permissions in one console'] },
                    { label: 'Access control and alarms', values: ['None. Doors, sensors and alarm panels stay with their current provider; a guard or monitoring center is notified from the round', 'Door controllers, readers and a video intercom; audio, environmental, entry and panic sensors; alarm monitoring by live agents with video-verified response or automatic dispatch, in all U.S. states'] },
                    { label: 'Pricing model', values: ['Per instance per month, quoted per site: a stream instance per camera from $5, a detection instance per AI feature per camera, storage per terabyte', 'Published list prices for hardware and per-camera licenses, on one, three, five or ten year terms, in Professional and Enterprise tiers'] },
                    { label: 'Best fit', values: ['A site keeping working cameras that wants detections and a verified, reported round without new hardware', 'A site replacing or adding cameras, or that wants cameras, doors, sensors and monitoring from one vendor'] },
                  ]}
                />
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where Rhombus is the better choice</h2>
              <PointList items={[
                'You are replacing cameras anyway. Rhombus designs its own hardware, backs it with a ten-year warranty and same-day RMA, and records to the camera during an internet outage, none of which a software-only product can offer.',
                'You want doors and video from one console. Rhombus sells door controllers, readers, a video intercom and card, fob and mobile credentials that tie access events to live video. Camzify has no access control.',
                'You want a monitoring center included. Rhombus alarm monitoring uses live agents who verify on video and dispatch, applied as a license to the devices you choose. Camzify notifies your guard or monitoring center; it does not supply one.',
                'You want sensors in the same system. Audio, environmental, entry and panic sensors are part of the Rhombus range, and environmental readings feed the same alerts as video.',
                'You want a published price and a broad integration catalog. Rhombus lists hardware and license prices on its site, offers native iOS and Android apps, and describes more than fifty integrations and an open API on Enterprise.',
              ]} />
            </ScrollReveal>
          </div>

          <div className="mt-12">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where Camzify is the better choice</h2>
              <PointList items={[
                <>The cameras already work. Camzify connects the ONVIF and RTSP cameras on the wall, through the Connector where they sit on a private network, with no appliance to buy or license. The <Link href="/supported-cameras" className="text-primary hover:underline">supported cameras</Link> page covers what connects.</>,
                <>You need proof that a round happened. A Camzify round checks a defined list at each camera, notifies the guard on a failure, and files a report with the frame behind every result and an overall compliance percentage. The Rhombus pages we read describe alerts and search, not a round with a report.</>,
                <>You license detections camera by camera. Each of the 23 <Link href="/ai-features" className="text-primary hover:underline">AI features</Link> is an instance on one camera, so a corridor can record and nothing more while the gate runs intrusion and weapons detection, instead of a tier applied to every device.</>,
                <>You run several clients, not just several sites. Sub-users can create their own sub-users, each scoped to their sites, with license quota allocated from the parent account, which is the shape a security agency or monitoring center needs.</>,
                <>Retention is a per-camera decision. Storage is one pool the account spends as it chooses, ninety days on a gate and seven on a corridor, rather than a per-model figure and a per-tier archiving rule.</>,
              ]} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">The bottom line</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                The decision is mostly made before the feature comparison starts. If the cameras are being replaced, Rhombus is a complete system with its own hardware, doors, sensors, monitoring and published prices, and Camzify would be asking you to buy cameras elsewhere and then add software. If the cameras are staying, Rhombus needs an appliance and a license to bring them in, and Camzify needs a stream instance and, where the site is private, a PC running the Connector.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                The second question is what you want the video to prove. Both products detect and alert. Only Camzify runs a scheduled round with a checklist and a report, which is the record a client, an auditor or an insurer asks for after the fact. Model the round against the guard hours it replaces on the <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link>, then <Link href="/pricing" className="text-primary hover:underline">request a quote</Link> for your camera count. If the choice is really between the cloud and a recorder on site, <Link href="/compare/cloud-vms-vs-on-premise" className="text-primary hover:underline">cloud VMS vs on-premise</Link> is the comparison to read first.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Sources, checked 17 September 2026</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Every statement about Rhombus on this page was read from one of these pages on that date. Check the page before relying on a cell.
              </p>
              <ul className="mt-4 max-w-prose space-y-2 text-sm text-muted-foreground">
                {sources.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{s.label}</a>
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
