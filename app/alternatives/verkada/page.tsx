import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { ComparisonTable } from '@/components/content/comparison-table';
import { PhotoFigure } from '@/components/content/photo-figure';
import { PointList } from '@/components/content/point-list';
import { ProductShot } from '@/components/content/product-shot';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 *
 * This is the switch-intent counterpart of /compare/camzify-vs-verkada. That page is the
 * even-handed comparison; this one is written for a buyer who wants to keep the cameras
 * already on the wall, and it says plainly who should choose Verkada instead.
 *
 * Every statement about Verkada on this page comes from a Verkada page that was opened
 * on 18 September 2026 and is listed in the Sources section at the bottom. Nothing about
 * their pricing is characterized beyond what their own pricing page shows: list prices
 * for hardware and licenses. If Verkada changes a page, re-check the row that cites it.
 */
const pageMeta = {
  title: "Verkada Alternative That Keeps Your Cameras",
  description: "Camzify is a Verkada alternative for buyers who keep their cameras: cloud recording, 23 AI detections and patrol rounds. Who should choose which.",
  path: "/alternatives/verkada",
};

export const metadata = generatePageMeta({ ...pageMeta });

const sides = ['Camzify', 'Verkada'];

/** Verkada pages opened for this page. Rendered at the bottom. */
const sources = [
  { label: 'Verkada home page', href: 'https://www.verkada.com/' },
  { label: 'Verkada Command', href: 'https://www.verkada.com/command/' },
  { label: 'Verkada security cameras', href: 'https://www.verkada.com/security-cameras/' },
  { label: 'Verkada Command Connector', href: 'https://www.verkada.com/security-cameras/command-connector/' },
  { label: 'Verkada pricing', href: 'https://www.verkada.com/pricing/' },
  { label: 'Verkada trust', href: 'https://www.verkada.com/trust/' },
  { label: 'Verkada security and compliance', href: 'https://www.verkada.com/trust/security/' },
];

const keep = [
  'The cameras. Any ONVIF or RTSP camera connects directly, and RTMP and HTTPS streams connect too. Nothing is replaced to get cloud recording and detection on them.',
  'Retention per camera. Storage is a pool sold per terabyte per month, and each camera takes its own retention window in days or as a storage cap. A camera that matters keeps more; a camera that does not keeps less.',
  'Scheduled patrol rounds. A round runs on a schedule, checks a list at every camera, notifies the assigned guard when an item fails, and files a timestamped report with a compliance percentage.',
  'One account across every site. Each site is set up on its own and read from one console, with sub-users scoped to their own sites. Alerts go out by email, SMS, WhatsApp or push.',
];

const giveUp = [
  'Native access control. Verkada lists Access Control among its product lines, managed in Command. Camzify has none; your doors stay with whoever runs them now.',
  'Alarms. Verkada lists Alarms as a product line, and its pricing page shows an alarm license. Camzify sells no alarm panel and runs no monitoring center; it notifies your own guard.',
  'Sensors, intercoms and sound. Verkada lists air quality sensors, intercom and sound systems among its products. Camzify is video only.',
  'Onboard storage on the camera. Verkada states that all its cameras include onboard storage of 30 to 365 days. Camzify records to the cloud from the stream and puts nothing on the camera.',
  'A published list price. Verkada publishes list prices for hardware and licenses. Camzify publishes one floor, from $5 per camera per month, and quotes the rest per site.',
];

const rows = [
  { label: 'The cameras you own today', values: ['Stay on the wall. Any ONVIF or RTSP camera connects at full capability; RTMP and HTTPS streams connect too.', 'Verkada sells its own cameras in eight families. Other makers\' cameras enter Command through a Command Connector appliance, with the limits that page lists.'] },
  { label: 'Hardware to buy', values: ['None. The only on-site software is the optional Camzify Connector, an application on a PC.', 'Cameras are listed as hardware with an additional license required. The Command Connector is a separate appliance in three sizes: CC300, CC500 and CC700.'] },
  { label: 'How third-party cameras connect', values: ['By stream address, or through the Camzify Connector for a private network, with no port forwarding.', 'Through the Command Connector: up to 10, 25 or 50 channels at 5MP per unit. Verkada states it continues to test and add compatible third-party cameras. Protocols are not described on the pages checked.'] },
  { label: 'License and pricing model', values: ['Per instance per month, quoted per site, from $5 per camera per month. No hardware line on the quote.', 'Published list prices for hardware and licenses, sold separately; the license terms shown are one year. Every purchase includes AI-based analytics, unlimited users, automatic updates and 24/7 technical support.'] },
  { label: 'Retention control', values: ['Per camera, in days or as a storage cap, from a storage pool sold per terabyte per month.', 'Onboard storage on every Verkada camera, stated as 30 to 365 days, with data stored on the device and in the cloud.'] },
  { label: 'Patrol rounds and reports', values: ['Scheduled rounds with a checklist at each camera, a guard notified on a failure, and a timestamped report with a compliance percentage.', 'Not described on the pages checked. Command describes real-time alerts, footage search and audit logs.'] },
  { label: 'Doors, alarms and sensors', values: ['Not offered. Access control, alarm panels and the monitoring center stay with whoever provides them today.', 'Native. Product lines include Access Control, Alarms, Intercom and Air Quality Sensors, all managed in Command.'] },
  { label: 'Best fit for a switcher', values: ['A site whose cameras work and whose gap is detection, retention control and proof that rounds were done.', 'A site replacing its cameras that wants video, doors and alarms from one vendor.'] },
];

const steps = [
  { title: 'Inventory the cameras and confirm RTSP or ONVIF', body: 'List every camera with its make, model and firmware, and confirm each one publishes an RTSP stream or answers ONVIF. Most IP cameras from the last decade do.' },
  { title: 'Decide how each camera reaches the cloud', body: 'A camera with a reachable stream address connects directly. A camera on a private network connects through the Camzify Connector, an application on a Windows, macOS or Linux machine, with no port forwarding.' },
  { title: 'Set retention per camera', body: 'Size the storage pool, then give each camera a retention window in days or a storage cap. Cameras that matter for evidence keep more; corridor cameras keep less.' },
  { title: 'Choose detections per camera', body: 'Motion and camera tampering come with every stream instance. Each other detection is an instance on the camera it runs on, so a loading dock can carry line intrusion and PPE while the lobby carries loitering only.' },
  { title: 'Schedule the patrol rounds', body: 'Order the camera stops, write the checklist for each one, name the guard to notify and set the schedule. From the first run there is a report per round with a compliance percentage.' },
  { title: 'Run both in parallel while you check', body: 'Keep the current system until the recordings, alerts and reports have been checked over a period you decide. Export anything you will need from the old archive before it is switched off.' },
];

const verkadaBetter = [
  'You are replacing the cameras anyway. Verkada states that its cameras include onboard storage of 30 to 365 days and receive software and firmware updates over the air, and that every purchase includes AI-based analytics.',
  'You want doors, alarms, intercoms and sensors in the same console as video. Verkada lists all of these as product lines managed in Command; Camzify offers none of them.',
  'Completed certifications matter to your procurement today. Verkada\'s security page states annual SOC 2 Type 2 examinations and ISO 27001:2022 certification for Command. Camzify\'s SOC 2 Type II and ISO 27001 work is in progress and not held.',
  'You want a list price before you talk to anyone. Verkada publishes hardware and license prices on its pricing page; Camzify publishes one floor and quotes the rest.',
];

const camzifyBetter = [
  'Your cameras work and you do not want new ones. Camzify connects any ONVIF or RTSP camera at full capability, rather than through an appliance with a reduced feature set.',
  'You need proof that a round was done. A scheduled round checks a list at every camera, messages the guard on a failure and files a report with a compliance percentage, which no Verkada page we checked describes.',
  'You are a security agency or monitoring company covering other people\'s sites. Each client is a sub-user scoped to its own cameras, with a report per round for that client.',
  'You want retention decided camera by camera from a storage pool you size yourself, rather than by what each camera model ships with.',
];

const faqs = [
  { question: 'Can Camzify use Verkada cameras?', answer: 'Camzify connects cameras that publish an RTSP stream or answer ONVIF, plus RTMP and HTTPS streams. Whether a given Verkada camera publishes such a stream is not described on the Verkada pages we checked, so confirm it with Verkada for your models before planning on it. We do not claim it either way.' },
  { question: 'Is Camzify cheaper than Verkada?', answer: 'We do not compare the amounts. Camzify starts from $5 per camera per month and is quoted per site with no hardware line. Verkada publishes list prices for its hardware and licenses on its own pricing page, and that is where to read them. Put a Camzify quote for your camera count next to those figures for your site.' },
  { question: 'Does Camzify offer access control or alarms?', answer: 'No. Camzify is cloud video management with AI detections and patrol rounds. It sells no hardware, no alarm panels and no access control, and it runs no monitoring center. Those stay with whoever provides them today.' },
  { question: 'Do I need to buy any hardware to switch?', answer: 'No. Camzify sells no hardware. Cameras with a reachable stream address connect directly, and cameras on a private network connect through the Camzify Connector, a small application on a machine you already have. Nothing is installed on the camera.' },
  { question: 'What happens to the recordings on my current system?', answer: 'They stay where they are. Camzify records from the day a camera connects, and its retention window counts from that point. Export anything you will need from the old archive before that system is turned off.' },
  { question: 'Is Camzify certified the way Verkada is?', answer: 'Not yet. Verkada\'s security page states SOC 2 Type 2 examinations and ISO 27001:2022 certification for its Command platform. Camzify\'s PDPA, GDPR, SOC 2 Type II and ISO 27001 work is in progress and none is held, and we say so on our trust page rather than implying otherwise.' },
];

export default function VerkadaAlternativePage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Alternatives', href: '/alternatives' },
      { label: 'Verkada alternative' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">A Verkada alternative that keeps your cameras</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Camzify is a Verkada alternative for the buyer who does not want to replace the cameras already on the wall. It is <Link href="/cloud-video-surveillance" className="text-primary hover:underline">cloud video surveillance</Link> that runs on the ONVIF and RTSP cameras a site already owns, with cloud recording, 23 AI detections and scheduled patrol rounds that produce a compliance report. The <Link href="/compare/camzify-vs-verkada" className="text-primary hover:underline">even-handed comparison</Link> sets the two side by side; this page takes the switcher&apos;s angle.
          </p>
          <p className="mt-4 max-w-2xl text-body text-muted-foreground">
            That means three questions: what you keep, what you give up, and how the move works. Every statement about Verkada comes from a Verkada page opened on 18 September 2026 and listed at the bottom. Where their pages did not describe something, the row says so.
          </p>

          <div className="mt-10 max-w-3xl">
            <PhotoFigure src="/alternatives-verkada.webp" alt="The Camzify console on a laptop beside a wall of existing cameras staying exactly where they are" />
          </div>

          <div className="mt-10 max-w-3xl">
            <ProductShot src="/product-video-backup" alt="Video backup and retention in the Camzify console: a retention window per camera, the storage pool it draws from and the recordings available for playback" label="Video backup and retention" sizes="(max-width: 1024px) 100vw, 768px" />
          </div>

          <div className="mt-12">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why buyers look for a Verkada alternative</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Verkada&apos;s own pages describe what it sells: its own cameras in eight families, plus access control, alarms, intercoms and sensors, managed in its Command platform. Its pricing page lists cameras as hardware with an additional license required, and shows one-year license terms. A buyer weighing it is weighing a hardware purchase and a license per device together.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                For a site whose cameras still work, that is the sticking point. The cameras are paid for and the cabling is done, and the question is whether the gap is the cameras or what sits behind them. Verkada does describe a Command Connector appliance for other makers&apos; cameras, and its page lists what those cameras do not get: automatic firmware updates, full camera tampering detection, low-latency AI analytics and license plate alerts.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                The other reason is the round. Command describes real-time alerts, footage search and audit logs. None of the pages we checked describes a scheduled round that checks a list at each camera and files a report with a compliance percentage.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What you keep and what you give up</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                A switch is a trade. The first list is what a Camzify account gives a site that keeps its cameras; the second is what Verkada&apos;s pages describe that Camzify does not offer.
              </p>
              <h3 className="mt-8 font-display text-lg font-bold">What you keep</h3>
              <PointList items={keep} />
              <h3 className="mt-8 font-display text-lg font-bold">What you give up</h3>
              <PointList items={giveUp} />
              <p className="mt-6 max-w-prose text-muted-foreground">
                If the second list holds something you need, read the Verkada pages themselves before going further. If it does not, the table below is the shape of the move.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Side by side for a switcher</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                The comparison page covers the two products feature by feature. This table covers only what changes when a site with working cameras moves.
              </p>
              <div className="mt-6">
                <ComparisonTable columns={['Aspect', sides[0], sides[1]]} rows={rows} />
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How the move works</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Six steps, in the order they happen. <Link href="/camera-connectivity" className="text-primary hover:underline">Camera connectivity</Link> covers the connection types, the <Link href="/camzify-connector" className="text-primary hover:underline">Camzify Connector</Link> covers private networks, and <Link href="/guides/using-existing-cameras-with-a-cloud-vms" className="text-primary hover:underline">using existing cameras with a cloud VMS</Link> is the guide behind step one.
              </p>
              <ol className="mt-6 max-w-prose space-y-5">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-sm font-semibold text-primary" aria-hidden="true">{i + 1}</span>
                    <div>
                      <h3 className="font-display text-base font-bold">{s.title}</h3>
                      <p className="mt-1 text-muted-foreground">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-6 max-w-prose text-muted-foreground">
                <Link href="/platform/video-backup-and-retention" className="text-primary hover:underline">Video backup and retention</Link> shows the per-camera retention screen behind step three, and <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link> explains the round and its report behind step five.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where Verkada is the better choice</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Verkada is the stronger option when the hardware is part of what you want to buy, or when the things Camzify does not do are on your list.
              </p>
              <PointList items={verkadaBetter} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where Camzify is the better choice</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Camzify is the stronger option when the cameras stay and what is missing is detection, retention control and a record of the rounds.
              </p>
              <PointList items={camzifyBetter} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">The bottom line</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                If you are replacing your cameras and want doors, alarms and sensors on the same platform, Verkada is built for exactly that. If your cameras work and the gap is detection, retention you control and proof that the rounds were done, Camzify puts all three on those cameras without a hardware purchase. The two answer different questions about the same building.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                The cost basis is on the <Link href="/pricing" className="text-primary hover:underline">pricing</Link> page: from $5 per camera per month, quoted per site within one business day. A <Link href="/book-a-demo" className="text-primary hover:underline">demo</Link> runs on your own camera list. If the system you are leaving is an alarm and monitoring contract rather than a camera platform, the <Link href="/alternatives/adt" className="text-primary hover:underline">ADT alternative</Link> page covers that move instead.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Sources, checked 18 September 2026</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Every statement about Verkada above comes from one of these pages, read on that date. If a line here disagrees with what Verkada&apos;s site says today, its site is current and this page is not.
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
