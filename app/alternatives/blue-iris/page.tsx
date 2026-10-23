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
 * Switch-intent page for Blue Iris, the Windows video management software. Most people
 * searching "blue iris alternative" run it at home and want something free and local;
 * this page says so up front and is written for the other reader: a business, installer
 * or security company running Blue Iris on a PC at a site it has to look after. The
 * first lead it was written for was a Blue Iris user whose camera stopped connecting.
 *
 * Every statement about Blue Iris comes from blueirissoftware.com, opened on 13 October
 * 2026 and listed in the Sources section at the bottom. Its prices are quoted only as
 * that site lists them, and never set against Camzify's. If Blue Iris changes a page,
 * re-check the row that cites it.
 */
const pageMeta = {
  title: "Blue Iris Alternative: Cloud VMS for Business",
  description: "A Blue Iris alternative for businesses and security companies: cloud recording, remote access with no port forwarding, patrol rounds. Who should stay put.",
  path: "/alternatives/blue-iris",
};

export const metadata = generatePageMeta({ ...pageMeta });

const sides = ['Camzify', 'Blue Iris'];

/** Blue Iris pages opened for this page. Rendered at the bottom. */
const sources = [
  { label: 'Blue Iris home page: features, licenses, maintenance plans, system requirements', href: 'https://blueirissoftware.com/' },
  { label: 'Blue Iris updates: version 6 overview and roadmap', href: 'https://blueirissoftware.com/?page_id=344' },
  { label: 'Blue Iris version 6.0.1 release note: built-in AI', href: 'https://blueirissoftware.com/?p=1035' },
];

const keep = [
  'The cameras. Any camera Blue Iris reaches over RTSP or ONVIF can connect to Camzify the same way, and RTMP and HTTPS streams connect too. The stream address already set up in Blue Iris is the one Camzify asks for.',
  'Detection on those cameras. 23 standard AI detections, from intrusion and loitering to PPE and fire and smoke, each switched on per camera, with motion and camera tampering included on every stream.',
  'Alerts to a named person. Detections reach the assigned contact by email, SMS, WhatsApp or push within seconds of a confirmed detection, with a record of who acknowledged them.',
  'Retention you set per camera. Storage is a pool sold per terabyte per month, and each camera takes its own window in days or as a storage cap.',
];

const gain = [
  'Footage that is not in the building. Recordings are written to Amazon S3 in the AWS region nearest your sites as they are captured, so a stolen PC or a failed drive does not take the evidence with it.',
  'No recording server to keep alive. There is no Windows machine at the site holding the archive, no drives to size and no updates to install. Where cameras sit on a private network, the Camzify Connector relays their streams to the cloud from a PC that is already there.',
  'Remote access without opening the router. The console runs in a browser, and the Connector reaches the cloud with no port forwarding, static IP or firewall change.',
  'Patrol rounds with a report. A scheduled round checks a list at every camera, notifies the assigned guard when an item fails, and files a timestamped report with a compliance percentage.',
  'Every site in one account. Each site is set up on its own and read from one console, with sub-users scoped to their own sites, which is how a security company gives each client its own view.',
];

const giveUp = [
  'Recording that never leaves your network. Blue Iris runs on your own Windows PC or server. Camzify is a cloud service by default; it is also deployed on premises or as a hybrid for clients whose footage must stay on site, planned with each client.',
  'A license price instead of a monthly service. Blue Iris lists a Full License at $99.95 for up to 128 cameras and an LE License at $39.95 for one camera, with maintenance plans after the first year. Camzify is billed per instance per month.',
  'The built-in AI Blue Iris now ships. Its version 6 notes list object classification, tracking and counting, facial recognition and ALPR as built-in services, plus custom ONNX and YOLO models. Camzify identifies no one in its standard detections; facial recognition exists only as a custom build for a customer with the legal basis to use it.',
  'Deep local control. Blue Iris lists PTZ auto-tracking of AI objects, MQTT, Sonoff switches for home automation, RTMP streaming to YouTube and Facebook, and running as a Windows service.',
  'Native phone apps. Blue Iris has Android and iOS apps. Camzify works in the phone\'s browser today; native iOS and Android apps are in development.',
];

const rows = [
  { label: 'Where it runs', values: ['In the cloud, opened in a browser. On-premises and hybrid deployments are planned with each client that needs them.', 'On a Windows PC or server you provide: Windows 10 64-bit at minimum, Windows 11 recommended.'] },
  { label: 'Hardware to maintain', values: ['None for recording. The optional Camzify Connector, an application for Windows, macOS or Linux, relays streams from a private network.', 'The recording machine: an Intel processor, 8GB of RAM or more, 1GB of RAM per high-megapixel camera recommended, 7200+ RPM drives or SSDs, and an optional Nvidia graphics card.'] },
  { label: 'Where recordings are kept', values: ['Amazon S3, in the AWS region nearest your sites, with retention set per camera.', 'Cloud recording is not described on the pages checked. Blue Iris captures MP4, AVI, an advanced DVR format or Windows Media files.'] },
  { label: 'Remote access', values: ['Browser console from anywhere. Private-network cameras connect through the Connector with no port forwarding.', 'A built-in web server (UI3) with HTTPS. Its home page links a port-forwarding guide for external access, and its roadmap describes a hosted remote-access service as planned.'] },
  { label: 'AI detection', values: ['23 standard detections, each licensed per camera, running in the cloud. License plate recognition (US and Singapore plates) and other detections are built to order. No standard detection identifies anyone.', 'Built in since version 6.0.1: object classification, tracking and counting, facial recognition and ALPR, plus custom ONNX and YOLO models. Runs on the Blue Iris machine.'] },
  { label: 'Alerts', values: ['Email, SMS, WhatsApp or push to an assigned contact, within seconds of a confirmed detection.', 'Loudspeaker, email, instant message, voice phone call with automatic redial, or an external program or script.'] },
  { label: 'Patrol rounds and reports', values: ['Scheduled rounds with a checklist per camera, a guard notified on a failure, and a report with a compliance percentage.', 'Not described on the pages checked. Blue Iris describes action sets for alerts and other conditions.'] },
  { label: 'Pricing as published', values: ['From $5 per camera per month, quoted per site. Most cameras land between $20 and $90 per camera per month.', 'Full License $99.95 (up to 128 cameras); LE License $39.95 (one camera). One year of basic maintenance included; plans listed at $44.95 a year, $199.95 a year, and a Commercial license at $39.95 a month.'] },
  { label: 'Commercial use', values: ['Built for it: businesses, and security companies covering client sites.', 'The maintenance plan table marks "Commercial use permitted" only for the Commercial license plan.'] },
];

const steps = [
  { title: 'List the cameras Blue Iris records', body: 'Each camera is already set up in Blue Iris with its address and login. Note each one down with its make and model; that list is most of the setup.' },
  { title: 'Decide how each camera reaches the cloud', body: 'A camera with a reachable stream address connects directly. A camera on a private network connects through the Camzify Connector on a Windows, macOS or Linux machine at the site, with no port forwarding.' },
  { title: 'Set retention per camera', body: 'Size the storage pool, then give each camera a retention window in days or a storage cap. Cameras that matter for evidence keep more; corridor cameras keep less.' },
  { title: 'Choose detections per camera', body: 'Motion and camera tampering come with every stream. Each other detection is switched on for the camera it runs on, so a gate can carry line intrusion while a yard carries loitering.' },
  { title: 'Schedule the patrol rounds', body: 'Order the camera stops, write the checklist for each one, name the guard to notify and set the schedule. From the first run there is a report per round with a compliance percentage.' },
  { title: 'Run both while you check', body: 'Keep Blue Iris recording until the cloud recordings, alerts and reports have been checked over a period you decide. Some cameras limit how many streams they serve at once, so check yours. Export any old clips you need before the Blue Iris machine is retired.' },
];

const blueIrisBetter = [
  'You are a homeowner or hobbyist who wants local recording on your own terms. Blue Iris is a software license on a PC you control, and Camzify is not built or priced for a single home.',
  'Footage must never leave the building and you want to run the box yourself. Blue Iris records on your own machine. Camzify can be deployed on premises, but Camzify plans and installs it with you rather than selling software you set up alone.',
  'You want facial recognition or ALPR as standard, or your own AI models. Blue Iris lists both as built in, plus custom ONNX and YOLO models. Camzify builds license plate recognition (US and Singapore plates) and anything beyond its 23 standard detections to order.',
  'You tie your cameras into home automation. Blue Iris lists MQTT, Sonoff switches and further home-automation plans; Camzify does not do home automation.',
];

const camzifyBetter = [
  'You look after cameras at sites you are not at. A security company or installer covering client sites sees every site in one console, gives each client a scoped login, and hands over a report per round.',
  'Losing the recorder must not lose the footage. Recordings leave the site as they are captured, so a stolen or failed machine takes nothing with it.',
  'Remote access has been the hard part. No port forwarding, no static IP and no firewall change, from any browser.',
  'You need proof that the cameras were checked. Scheduled patrol rounds file a report with a compliance percentage, which none of the Blue Iris pages we checked describes.',
  'You would rather not maintain a Windows machine per site: its updates, its drives, its uptime.',
];

const faqs = [
  { question: 'What is the best Blue Iris alternative for a business?', answer: 'It depends on what Blue Iris is not doing for you. If the gap is footage stored off site, remote access without port forwarding, several sites in one place or proof that rounds were done, a cloud VMS such as Camzify covers it on the cameras you already have. If you want to keep recording on your own machine, a different local recorder is the closer swap.' },
  { question: 'Is there a cloud version of Blue Iris?', answer: 'Not that its own pages describe. Blue Iris is Windows software that runs on your PC or server. Its version 6 roadmap describes a planned hosted service for remote access, likely on Amazon AWS, but not cloud recording. Camzify is a cloud VMS: recordings go to Amazon S3 in the AWS region nearest your sites.' },
  { question: 'How much does Blue Iris cost?', answer: 'Blue Iris lists a Full License at $99.95 for up to 128 cameras and an LE License at $39.95 for one camera, with one year of basic maintenance included. After that its maintenance plans are listed at $44.95 a year (Basic), $199.95 a year (Priority) and $39.95 a month (Commercial license). Its plan table marks commercial use as permitted only on the Commercial license. Check its site for current prices.' },
  { question: 'Can Camzify use the cameras I have in Blue Iris?', answer: 'Network IP cameras, yes, if they publish an RTSP stream or answer ONVIF; RTMP and HTTPS streams connect too. Most IP cameras from the last decade do. USB webcams, analog capture cards and a Windows desktop, which Blue Iris can also record, do not connect to Camzify.' },
  { question: 'Do I need port forwarding for remote viewing?', answer: 'Not with Camzify. The console is in the cloud, and cameras on a private network reach it through the Camzify Connector, which needs no port forwarding, static IP or firewall change. Blue Iris\'s own site links a port-forwarding guide for external access to a Blue Iris server.' },
  { question: 'Does Blue Iris run on a Mac?', answer: 'Its system requirements list Windows 10 or 11, 64-bit. Its version 6 notes describe ARM64 support as planned, which they say would be needed to run it on Apple silicon through Parallels or a possible native version. Camzify runs in any browser, and the Camzify Connector installs on macOS, Windows or Linux.' },
  { question: 'Is Camzify cheaper than Blue Iris?', answer: 'We do not compare the amounts, and for one home Camzify is the wrong tool. Blue Iris lists a software license plus maintenance plans, on a PC you buy and keep running. Camzify is a monthly service from $5 per camera per month, with no recording hardware to buy or maintain. For a business, set the cost of the Blue Iris machine, its drives and the time spent looking after it against a Camzify quote for the same cameras.' },
];

export default function BlueIrisAlternativePage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Alternatives', href: '/alternatives' },
      { label: 'Blue Iris alternative' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">A Blue Iris alternative for businesses and security companies</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Camzify is a Blue Iris alternative for the business that wants its camera recordings off site and its cameras reachable from anywhere, without a Windows PC at every site to look after. It is <Link href="/cloud-video-surveillance" className="text-primary hover:underline">cloud video surveillance</Link> that runs on the RTSP and ONVIF cameras already on the wall, with cloud recording, 23 AI detections and scheduled patrol rounds that produce a compliance report.
          </p>
          <p className="mt-4 max-w-2xl text-body text-muted-foreground">
            If you run Blue Iris at home and want something free and local, this is not that, and the section on where Blue Iris is the better choice says so. Every statement about Blue Iris comes from its own site, opened on 13 October 2026 and listed at the bottom.
          </p>

          <div className="mt-10 max-w-3xl">
            <PhotoFigure src="/alternatives-blue-iris.webp" alt="Camzify open on a laptop beside a Windows desktop running a camera recording program: a cloud console versus software on a PC in the building" />
          </div>

          <div className="mt-12">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why businesses look for a Blue Iris alternative</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Blue Iris is capable software. Its version 6 handles up to 128 cameras, has AI built in, and its Full License is listed at $99.95. It is also Windows software on a machine you provide: its recommended specs list Windows 11, 1GB of RAM per high-megapixel camera, an optional Nvidia graphics card and 7200+ RPM drives or SSDs. Whoever owns that machine owns its updates, its drives and its uptime.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                The second reason is remote access. Blue Iris&apos;s own roadmap says remote access &ldquo;remains a struggle for many due to networking security and architecture&rdquo;. Its home page links a port-forwarding guide for reaching a Blue Iris server from outside, and a hosted remote-access service is described as planned, with its details still being worked out.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                The third is scale and use. A company covering several client sites needs one view across them, a login per client and a record that the cameras were checked. And Blue Iris&apos;s maintenance plan table marks &ldquo;Commercial use permitted&rdquo; only for its Commercial license plan, listed at $39.95 a month.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What you keep, what you gain and what you give up</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                A switch is a trade. Read the third list before the other two: if something on it is the reason you chose Blue Iris, stay with it.
              </p>
              <h3 className="mt-8 font-display text-lg font-bold">What you keep</h3>
              <PointList items={keep} />
              <h3 className="mt-8 font-display text-lg font-bold">What you gain</h3>
              <PointList items={gain} />
              <h3 className="mt-8 font-display text-lg font-bold">What you give up</h3>
              <PointList items={giveUp} />
            </ScrollReveal>
          </div>

          <div className="mt-10 max-w-3xl">
            <ProductShot src="/product-live-streaming" alt="The Camzify live streaming wall: cameras from several sites in one grid, each with its site label and online state" label="Live streaming · Camzify console" sizes="(max-width: 1024px) 100vw, 768px" />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Camzify and Blue Iris side by side</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                What changes when a site moves from a Blue Iris machine to the cloud. Where Blue Iris&apos;s pages did not describe something, the row says so rather than assuming it is missing.
              </p>
              <div className="mt-6">
                <ComparisonTable columns={['Aspect', sides[0], sides[1]]} rows={rows} />
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How to move from Blue Iris to Camzify</h2>
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
                <Link href="/platform/video-backup-and-retention" className="text-primary hover:underline">Video backup and retention</Link> shows the per-camera retention screen behind step three, and <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link> explains the round and its report behind step five. If your cameras are a particular make, the <Link href="/supported-cameras" className="text-primary hover:underline">supported cameras</Link> guides give the stream address format for each.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where Blue Iris is the better choice</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Blue Iris is the stronger option when local control is the point, not the problem.
              </p>
              <PointList items={blueIrisBetter} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where Camzify is the better choice</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Camzify is the stronger option when the cameras are a business&apos;s, or a client&apos;s, and someone has to answer for them.
              </p>
              <PointList items={camzifyBetter} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">The bottom line</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Blue Iris is a strong recorder for someone who wants to own and run the machine. Camzify is for the business that would rather not: recordings off site, remote access with no router changes, every site in one console and a report for every round, on the cameras Blue Iris already records. For the wider picture, <Link href="/compare/cloud-vms-vs-on-premise" className="text-primary hover:underline">cloud VMS versus on-premise</Link> weighs the two models without naming a product.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                The cost basis is on the <Link href="/pricing" className="text-primary hover:underline">pricing</Link> page: from $5 per camera per month, quoted per site within one business day. A <Link href="/book-a-demo" className="text-primary hover:underline">demo</Link> runs on your own camera list.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Sources, checked 13 October 2026</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Every statement about Blue Iris above comes from one of these pages, read on that date. If a line here disagrees with what Blue Iris&apos;s site says today, its site is current and this page is not.
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
