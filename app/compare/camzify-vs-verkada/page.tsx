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
 * Every statement about Verkada on this page comes from a Verkada page that was opened
 * on 17 September 2026 and is listed in the Sources section at the bottom. Nothing about
 * their pricing is characterized beyond what their own pricing page shows: list prices
 * for hardware and licenses. If Verkada changes a page, re-check the row that cites it.
 */
const pageMeta = {
  title: "Camzify vs Verkada | Keep Your Cameras or Replace",
  description: "Camzify runs AI detections and patrol rounds on the cameras you already own. Verkada sells its own cameras with Command. An even-handed comparison.",
  path: "/compare/camzify-vs-verkada",
};

export const metadata = generatePageMeta({ ...pageMeta });

const sides = ['Camzify', 'Verkada'];

/** Verkada pages opened for this comparison. Rendered at the bottom of the page. */
const sources = [
  { label: 'Verkada home page', href: 'https://www.verkada.com/' },
  { label: 'Verkada Command', href: 'https://www.verkada.com/command/' },
  { label: 'Verkada security cameras', href: 'https://www.verkada.com/security-cameras/' },
  { label: 'Verkada Command Connector', href: 'https://www.verkada.com/security-cameras/command-connector/' },
  { label: 'Verkada access control', href: 'https://www.verkada.com/access-control/' },
  { label: 'Verkada alarms', href: 'https://www.verkada.com/alarms/' },
  { label: 'Verkada air quality sensors', href: 'https://www.verkada.com/sensors/' },
  { label: 'Verkada pricing', href: 'https://www.verkada.com/pricing/' },
  { label: 'Verkada trust', href: 'https://www.verkada.com/trust/' },
];

const rows = [
  { label: 'What you buy', values: ['Software only: a monthly subscription that runs on the cameras a site already has. No hardware.', 'Hardware plus a cloud license. Verkada sells its own cameras, controllers, sensors and intercoms, managed in its Command platform.'] },
  { label: 'Cameras', values: ['Any ONVIF or RTSP camera, plus RTMP and HTTPS streams. Private-network cameras connect through the Camzify Connector, an application on a PC.', 'Eight Verkada camera families. Third-party cameras can be brought into Command through a Command Connector appliance, with a reduced feature set listed on that page.'] },
  { label: 'Recording and retention', values: ['Continuous or scheduled cloud recording. Retention set per camera in days or as a storage cap, from a storage pool sold per terabyte.', 'Stored on the camera and in the cloud. Verkada states that all its cameras include onboard storage of 30 to 365 days.'] },
  { label: 'AI detections', values: ['23 detection models on confirmed object tracks, licensed per feature per camera. Motion and camera tampering included with every camera.', 'AI-based analytics included with every purchase: people and vehicle search, face search, and alerts for line crossing, motion, tampering and tailgating.'] },
  { label: 'Patrol rounds and compliance reporting', values: ['Scheduled virtual patrol rounds with a checklist per camera, a guard notified on any failure, and a timestamped report with a compliance percentage per round.', 'Not described on the pages checked. Verkada describes real-time alerts, AI search and investigations, not a scheduled round with a report each.'] },
  { label: 'Multi-site and users', values: ['Every site on one account. Sub-users scoped to their own sites, permission groups per user, license quota allocated from the parent.', 'All devices, users and sites on one platform, from five devices at one location to thousands across hundreds. Role-based access, unlimited users, Okta or Azure AD via SCIM.'] },
  { label: 'Access control and alarms', values: ['Not offered. Alarm panels, access control and guards stay with whoever provides them today.', 'Native. Door controllers, readers and wireless locks, intrusion sensors, and 24/7 professional monitoring with agents who video-verify and can dispatch police.'] },
  { label: 'Pricing model', values: ['Per instance per month, quoted per site, from $5 per camera per month.', 'Published list prices for hardware and for licenses, sold separately. Every purchase includes analytics, unlimited users, updates and 24/7 support.'] },
  { label: 'Best fit', values: ['A site or portfolio that keeps its cameras and adds detection, patrol rounds and a compliance record.', 'A site replacing its cameras that wants video, doors, alarms and sensors from one vendor.'] },
];

const verkadaBetter = [
  'You are replacing the cameras anyway. New Verkada cameras arrive with onboard storage, automatic updates and the analytics included, and nothing third-party to test.',
  'You want doors, alarms and sensors in the same console as video. Verkada builds all of these, and its access control page describes door events natively linked to video in Command.',
  'You want professionally monitored alarms. Verkada describes 24/7 agents who video-verify, talk down an intruder and dispatch police; Camzify notifies your own guard and runs no monitoring center.',
  'You want a published price before you talk to anyone. Verkada lists hardware and license prices; Camzify publishes one floor and quotes the rest.',
];

const camzifyBetter = [
  'You own working cameras and do not want new ones. Camzify connects any ONVIF or RTSP camera at full capability; the cameras are the product, not a migration path.',
  'You need proof that a round was done. A scheduled round checks a list at every camera, messages the guard on a failure and files a report with a compliance percentage, which no Verkada page we checked describes.',
  'You are a security agency or monitoring company covering other people\'s sites. Each client is a sub-user scoped to its own cameras, with a report per round for that client.',
  'You want retention set camera by camera from a storage pool you size yourself, rather than fixed to what each camera model ships with.',
];

const faqs = [
  { question: 'Is Camzify a Verkada alternative?', answer: 'For the video part, yes. Camzify is cloud video management with AI detections and scheduled patrol rounds on the ONVIF and RTSP cameras a site already owns, so a buyer who wants a Verkada alternative without replacing cameras is who this page is for. It is not an alternative for access control, alarms or sensors, which Camzify does not offer.' },
  { question: 'Can my existing cameras move to Camzify?', answer: 'Yes, if they produce an RTSP stream, and most IP cameras from the last decade do. RTMP and HTTPS streams also connect, and private-network cameras are relayed by the Camzify Connector without opening ports. The footage archive on the old system does not move.' },
  { question: 'Can I keep my existing cameras with Verkada?', answer: 'Verkada describes a Command Connector appliance that brings non-Verkada cameras into Command, with a compatibility list it keeps adding to. Its own page shows those cameras get a reduced feature set, with higher latency on AI search and some alerts not supported. Read that page against your camera models before deciding.' },
  { question: 'How do the prices compare?', answer: 'We do not characterize Verkada\'s pricing here. Verkada publishes list prices for its hardware and licenses on its own pricing page, and that is the place to read them. Camzify starts from $5 per camera per month and is quoted per site, so compare a quote for your camera count against the hardware, licenses and installation of a replacement system.' },
  { question: 'What is the single biggest difference?', answer: 'Whether the cameras change. Verkada is its own cameras and hardware managed in Command; Camzify is software on the cameras already on the wall. The second difference is the patrol round with a report each, which no Verkada page we checked describes.' },
];

export default function CamzifyVsVerkadaPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Compare', href: '/compare' },
      { label: 'Camzify vs Verkada' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Camzify vs Verkada</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Camzify is software that runs on the cameras a site already owns. Verkada is a hardware ecosystem, its own cameras, door controllers, alarms and sensors, managed in its Command cloud platform. The choice between them is mostly the choice between keeping your cameras and replacing them, and a buyer looking for a Verkada alternative that keeps existing cameras is the buyer this page is written for.
          </p>
          <p className="mt-4 max-w-2xl text-body text-muted-foreground">
            Both are cloud systems with AI detections, alerts and multi-site management, so the table concentrates on where they differ. Every Verkada statement comes from a Verkada page opened on 17 September 2026 and listed at the bottom. Where their pages did not describe something, the row says so.
          </p>

          <div className="mt-10 max-w-3xl">
            <ProductShot src="/product-patrol-sequence" alt="A patrol sequence in the Camzify console: ordered camera stops, the checklist at each stop and the schedule the round runs on" label="Patrol sequence" sizes="(max-width: 1024px) 100vw, 768px" />
          </div>

          <div className="mt-12">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Side by side</h2>
              <div className="mt-6">
                <ComparisonTable columns={['Aspect', sides[0], sides[1]]} rows={rows} />
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where Verkada is the better choice</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Verkada is the stronger option when the hardware is part of what you want to buy: one vendor for cameras, doors, alarms and sensors, a 10-year warranty stated on its access control, alarm and sensor hardware, and a pricing page that lists what each item costs.
              </p>
              <PointList items={verkadaBetter} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where Camzify is the better choice</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Camzify is the stronger option when the cameras stay and what is missing is verification. The <Link href="/supported-cameras" className="text-primary hover:underline">supported cameras</Link> page lists what connects, <Link href="/ai-features" className="text-primary hover:underline">AI features</Link> lists the 23 detections, and <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link> explains the round and its report.
              </p>
              <PointList items={camzifyBetter} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">The bottom line</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                If you are replacing your cameras and want doors and alarms on the same platform, Verkada is built for exactly that. If your cameras work and the gap is that nobody can prove the rounds were done, Camzify puts detections and scheduled patrol rounds on those cameras without a hardware purchase. The two answer different questions about the same building. If you already run Verkada and are weighing a move, <Link href="/alternatives/verkada" className="text-primary hover:underline">Camzify as a Verkada alternative</Link> takes the switcher's angle: what you keep, what you give up, and how the move works.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Two things to settle first. Whether footage may leave the building at all: <Link href="/cloud-video-surveillance" className="text-primary hover:underline">cloud video surveillance</Link> explains what the cloud model needs from a site, and <Link href="/compare/cloud-vms-vs-on-premise" className="text-primary hover:underline">cloud VMS vs on-premise</Link> covers where a recorder still wins. And the cost basis: Camzify is quoted from $5 per camera per month on the <Link href="/pricing" className="text-primary hover:underline">pricing</Link> page, and the <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link> turns your own guard hours into the figure a quote is measured against.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Sources, checked 17 September 2026</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Every statement about Verkada above comes from one of these pages, read on that date. If a row here disagrees with what Verkada&apos;s site says today, its site is current and this page is not.
              </p>
              <ul className="mt-4 max-w-prose space-y-2 text-muted-foreground">
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
