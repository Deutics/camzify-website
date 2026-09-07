import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FeatureHero } from '@/components/content/feature-hero';
import { FaqSection } from '@/components/content/faq-section';
import { ProductShot } from '@/components/content/product-shot';
import { SectionVisual } from '@/components/content/section-visual';
import { ComparisonTable } from '@/components/content/comparison-table';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { serviceSchema } from '@/lib/seo';
import Link from 'next/link';
import { ArrowRight, Cloud, HardDrive, Layers, ShieldCheck } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data.
 *
 * The category pillar for "cloud video surveillance", "cloud VMS", "cloud NVR" and
 * "NVR alternative", which between them are searched more than any product term the
 * site owns. It explains the model honestly, including where an on-site NVR is still
 * the right answer, and sends readers on to the platform modules.
 */
const pageMeta = {
  title: "Cloud Video Surveillance | Cloud VMS, No NVR",
  description: "Cloud video surveillance for cameras you already own: recording kept per camera, live view, AI detections and patrol rounds in a cloud VMS. No NVR.",
  path: "/cloud-video-surveillance",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'What is cloud video surveillance?', answer: 'A model in which cameras stream to a service in the cloud instead of to a recorder on site. Recording, storage, live viewing, user access and, on Camzify, AI detections and patrol rounds all happen in that service and are used from a browser. The cameras stay where they are; the box under the desk goes.' },
  { question: 'Do I need to replace my cameras?', answer: 'No. Any camera that produces an RTSP stream can be connected, and most IP cameras from the last decade do. RTMP and HTTPS streams work too. Cameras on a private network connect through the Camzify Connector, a small application on a Windows, macOS or Linux machine inside that network, without opening ports on the router.' },
  { question: 'Is it a cloud NVR?', answer: 'It does what an NVR does, recording and playback, without the NVR, and it does things an NVR cannot: retention set per camera rather than per box, every site on one login, AI detections and scheduled patrol rounds on the same streams. If the phrase you know is cloud NVR, this is the same idea with more on top.' },
  { question: 'When is an on-site NVR still the better choice?', answer: 'When the site has too little upstream bandwidth to carry its cameras, when footage must by policy never leave the building, or when the only thing wanted is local recording for occasional review. The comparison page sets this out in full rather than pretending the cloud wins every case.' },
  { question: 'How long is footage kept?', answer: 'For as long as the retention window on that camera says, set in days or as a storage cap, camera by camera. A gate camera can keep ninety days while a corridor keeps seven. The video retention guide covers what different sectors typically require.' },
  { question: 'How is footage protected?', answer: 'Encrypted in transit over TLS 1.2 or higher and at rest with AES-256. Access follows the same permission groups as everything else in the console, so a user who cannot open a camera cannot open its recordings, and every action on the account is written to an audit trail. Compliance certifications are in progress and are listed as such on the trust page; none is claimed as held.' },
  { question: 'What does it cost?', answer: 'Camzify is licensed per camera and quoted for the site. We do not publish rates. The pricing page explains what a quote is built from, and the ROI calculator lets you compare it against the guarding or recorder costs it replaces.' },
];

const comparisonRows = [
  { feature: 'Where footage is stored', values: ['In the cloud, encrypted, under a retention window per camera', 'On a disk in the recorder on site'] },
  { feature: 'What fails when hardware fails', values: ['A camera going offline is shown as offline; recording of the others continues', 'The recorder is the single point of failure for every camera on it'] },
  { feature: 'Viewing from elsewhere', values: ['Browser on any device, same login, permissions per user', 'Port forwarding or a vendor app, per recorder'] },
  { feature: 'Several sites', values: ['One console, folded together or held separate per site', 'One recorder and one login per site'] },
  { feature: 'AI detections', values: ['Any of the detection features on any connected camera, licensed per camera', 'Whatever the recorder\'s firmware offers, if anything'] },
  { feature: 'Patrol rounds', values: ['Scheduled rounds with a checklist per camera and a report each', 'None'] },
  { feature: 'Bandwidth', values: ['Needs upstream bandwidth for every camera streamed', 'Needs none beyond the local network'] },
  { feature: 'Footage leaving the building', values: ['Yes, encrypted, to the cloud', 'No, unless exported'] },
  { feature: 'Cost basis', values: ['Per camera, quoted', 'Hardware, disks and replacement'] },
];

export default function CloudVideoSurveillancePage() {
  return (
    <PageShell
      {...pageMeta}
      faqs={faqs}
      schema={[serviceSchema({ name: 'Cloud Video Surveillance', description: pageMeta.description, path: pageMeta.path })]}
      breadcrumbs={[{ label: 'Cloud Video Surveillance' }]}
    >
      <FeatureHero
        eyebrow="Cloud video surveillance"
        title="Cloud video surveillance for the cameras you already own"
        lede={
          <>
            <strong className="font-semibold text-foreground">
              Cloud video surveillance sends a site&apos;s cameras to a video management system in the cloud instead of a recorder on site:
            </strong>{' '}
            footage recorded and kept under a retention window set per camera, live view and playback from a browser, every site on one login, and on Camzify the AI detections and scheduled patrol rounds that turn recording into watching. Nothing new is mounted. The NVR is what goes.
          </>
        }
        primary={{ href: '/book-a-demo', label: 'Book a demo' }}
        secondary={{ href: '/platform', label: 'See the platform' }}
        facts={['Any RTSP camera connects', 'Retention set per camera', 'Encrypted in transit and at rest']}
        visual={
          <ProductShot
            src="/product-video-backup"
            alt="The video backup screen in the Camzify console with per-camera recording mode and retention settings"
            label="Video backup and retention"
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        }
      />

      {/* How it works */}
      <section className="border-t border-border bg-muted/20 py-20 sm:py-24">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-mono text-mono-sm uppercase text-primary">How it works</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Camera to cloud in three steps</h2>
              <p className="mt-5 max-w-prose text-body text-muted-foreground">
                The whole model rests on one fact: almost every IP camera already speaks RTSP. Everything else is where that stream goes.
              </p>
            </div>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              { icon: Cloud, title: 'The camera streams', body: 'A camera reachable from the internet is added by its RTSP address. A camera on a private network is relayed by the Camzify Connector, a small application on a machine inside that network, so nothing is opened on the router.', href: '/camera-connectivity', label: 'Camera connectivity' },
              { icon: HardDrive, title: 'The cloud records', body: 'Continuous or scheduled recording per camera, kept for a number of days or up to a storage cap you set for that camera. Playback and export from the browser, with the same permissions as live view.', href: '/platform/video-backup-and-retention', label: 'Backup and retention' },
              { icon: Layers, title: 'The console does the rest', body: 'Live wall grouped by site, alerts in one queue, users and permission groups, license per camera and every site under one account, folded together or held separate.', href: '/platform', label: 'Platform modules' },
            ].map((c, i) => {
              const Icon = c.icon;
              return (
                <ScrollReveal key={c.href} delay={i * 0.05}>
                  <div className="flex h-full flex-col rounded-xl border border-border bg-card p-8">
                    <span className="inline-flex w-fit rounded-lg bg-primary/10 p-2"><Icon className="h-5 w-5 text-primary" aria-hidden="true" /></span>
                    <h3 className="mt-4 font-display text-xl font-bold">{c.title}</h3>
                    <p className="mt-3 flex-1 text-muted-foreground">{c.body}</p>
                    <Link href={c.href} className="mt-5 inline-flex items-center gap-2 font-semibold text-primary hover:underline">{c.label} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* What sits on top */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-site px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">Beyond recording</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Recording is the floor, not the point</h2>
              <p className="mt-5 max-w-prose text-body text-muted-foreground">
                A recorder keeps footage so that someone can review it after something has happened. Cloud video surveillance on Camzify puts two things on the same streams that a recorder cannot. <Link href="/ai-features" className="text-primary hover:underline">AI detections</Link> watch each camera for a tracked person, vehicle, weapon, fire or the behavior you describe, and notify within the window you set for that camera. <Link href="/virtual-patrolling" className="text-primary hover:underline">Virtual patrolling</Link> runs a scheduled round through the cameras, checks a list at each one from the frame, messages the guard on a failure and files a report.
              </p>
              <p className="mt-4 max-w-prose text-body text-muted-foreground">
                Both are licensed per camera and switched on where they earn their place. A corridor camera can record and nothing more; the gate camera can record, detect and be a stop on the round. The recording underneath is the same either way, which is what lets an alert or a failed check open the footage around it.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <SectionVisual
                variant="notification"
                caption="A detection on a recorded camera: the frame, the time, the rule it matched and the backup clip it links to."
                alt="A notification card with a camera snapshot, timestamp, detection name and a link to the recorded clip"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Cloud vs NVR */}
      <section className="border-t border-border bg-muted/20 py-20 sm:py-24">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-mono text-mono-sm uppercase text-primary">Cloud NVR alternative</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Against a recorder on site</h2>
              <p className="mt-5 max-w-prose text-body text-muted-foreground">
                The last two rows are where the recorder wins. A site with poor upstream bandwidth, or a policy that footage never leaves the building, should keep its NVR. The longer version is on <Link href="/compare/cloud-vms-vs-on-premise" className="text-primary hover:underline">cloud VMS vs on-premise</Link>.
              </p>
            </div>
          </ScrollReveal>
          <div className="mt-10">
            <ComparisonTable rows={comparisonRows} columns={['Aspect', 'Cloud video surveillance on Camzify', 'NVR on site']} />
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-site px-6">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <ScrollReveal>
              <span className="inline-flex rounded-lg bg-primary/10 p-2"><ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" /></span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Footage off site, still yours</h2>
              <p className="mt-5 max-w-prose text-body text-muted-foreground">
                Streams are encrypted in transit over TLS 1.2 or higher and footage is encrypted at rest with AES-256. Who can see which camera, live or recorded, is decided by <Link href="/platform/permission-groups" className="text-primary hover:underline">permission groups</Link>, and every action on the account is written to an audit trail the account holder can read.
              </p>
              <p className="mt-4 max-w-prose text-body text-muted-foreground">
                Compliance certifications are in progress and none is claimed as held; the <Link href="/security-and-compliance" className="text-primary hover:underline">security and compliance page</Link> lists each one with its status, and the <Link href="/trust" className="text-primary hover:underline">trust page</Link> lists the figures we do not publish at all.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <ProductShot
                src="/product-user-management"
                alt="The user management screen in the Camzify console with sub-users, their sites and their permission groups"
                label="Users and permissions"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Who it is for */}
      <section className="border-t border-border bg-muted/20 py-16 sm:py-20">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-mono text-mono-sm uppercase text-primary">Who it is for</span>
              <h2 className="mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl">Several sites, or several clients</h2>
              <p className="mt-5 max-w-prose text-body text-muted-foreground">
                The model pays off where recorders multiply: a company with <Link href="/industries/multiple-sites" className="text-primary hover:underline">several sites</Link> and one person responsible for all of them, a <Link href="/partners/for-security-integrators" className="text-primary hover:underline">CCTV installer</Link> who would rather sell a monthly service than a box, a <Link href="/partners/for-security-agencies" className="text-primary hover:underline">security agency</Link> putting a <Link href="/virtual-guard" className="text-primary hover:underline">virtual guard</Link> on each client&apos;s existing cameras. One site with a recorder that works and nobody who needs to watch it remotely can keep the recorder.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Related */}
      <section className="py-16">
        <div className="mx-auto max-w-site px-6">
          <h2 className="font-mono text-mono-sm uppercase text-muted-foreground">Read next</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: '/compare/cloud-vms-vs-on-premise', title: 'Cloud VMS vs on-premise', desc: 'The full comparison, including where on-premise wins.' },
              { href: '/guides/how-to-configure-cloud-video-backup', title: 'Configure cloud video backup', desc: 'Recording mode and retention, camera by camera.' },
              { href: '/guides/video-retention-requirements', title: 'Video retention requirements', desc: 'How long different sectors typically keep footage.' },
              { href: '/guides/onvif-and-rtsp-explained', title: 'ONVIF and RTSP explained', desc: 'Why your existing cameras can connect.' },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="group rounded-xl border border-border bg-card p-6 transition-all duration-normal hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <h3 className="font-display text-base font-bold transition-colors group-hover:text-primary">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={faqs} heading="Cloud video surveillance, answered" />
    </PageShell>
  );
}
