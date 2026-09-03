import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { FeatureHero } from '@/components/content/feature-hero';
import { HeroPlaceholder } from '@/components/content/hero-placeholder';
import { SectionVisual } from '@/components/content/section-visual';
import { FAQAccordion } from '@/components/content/faq-accordion';
import Link from 'next/link';
import { Cable, Server, Users, FileCheck2, Camera, KeyRound, HardDrive } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data.
 *
 * Written for the company that installs and maintains the cameras. Everything here is a
 * shipped capability: the three connection routes, the Connector, per-camera recording
 * and retention, and the sub-user hand-over. No installer certification program is
 * claimed because none exists.
 */
const pageMeta = {
  title: "For Security Integrators | Cloud VMS Add-On",
  description: "Attach virtual patrolling to camera systems you already install. RTSP, RTMP or HTTPS, a Connector for LAN cameras, no NVR replaced, and a clean hand-over to the customer.",
  path: "/partners/for-security-integrators",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  {
    question: 'Does the customer have to replace their NVR or existing VMS?',
    answer: 'No. Camzify takes a stream from the camera and records to the cloud on its own schedule and retention. The on-site recorder keeps doing what it does. Where a camera cannot be reached from the internet, the Camzify Connector on a PC inside the customer\'s network relays it, and the site\'s existing recording is untouched.',
  },
  {
    question: 'Which cameras and protocols work?',
    answer: 'Any camera that produces an RTSP stream, which covers ONVIF-conformant IP cameras from the major manufacturers, plus RTMP from encoders and HTTPS streams (HLS or WebRTC). The supported cameras page lists sixteen brands with notes per protocol. Camzify sells no hardware, so nothing is reserved for its own cameras.',
  },
  {
    question: 'What is the Camzify Connector and where does it run?',
    answer: 'A small application installed on a Windows, macOS or Linux machine that sits on the same LAN as the cameras and has internet access. It discovers local RTSP cameras and relays them to Camzify without port forwarding on the customer\'s router. PTZ control passes through it where the camera supports it.',
  },
  {
    question: 'Can we commission the account and then hand it to the customer?',
    answer: 'Yes. Set the account up under your own login, add the sites, cameras, recording schedules and retention, then create the customer as a sub-user scoped to their sites with a permission group that fits. If the customer wants you to keep a maintenance login, the reverse also works: they hold the account and you are a sub-user with the access you need.',
  },
  {
    question: 'Is recording configured per camera or for the whole site?',
    answer: 'Per camera, with bulk actions. Each camera records continuously or on a schedule, and keeps footage by a number of days or a storage cap. A schedule or a retention preset can be applied to every camera on a site, or on the whole account, in one action.',
  },
  {
    question: 'What does an integrator get that a customer buying direct does not?',
    answer: 'Nothing hidden. The product is the same and the pricing is quote-based either way. What you bring is the site access, the camera knowledge and the customer relationship, which is most of what a deployment needs. Commercial terms for partners are agreed in conversation, not published, because we do not publish numbers we cannot stand behind for every case.',
  },
];

const FRAMES = [
  { src: '/cam-06.jpg', id: 'CAM 01 · RTSP', loc: 'VIA CONNECTOR · MAIN GATE' },
  { src: '/cam-02.jpg', id: 'CAM 04 · RTSP', loc: 'VIA CONNECTOR · LOADING DOCK' },
  { src: '/cam-03.jpg', id: 'CAM 09 · RTMP', loc: 'ENCODER · SERVER CORRIDOR' },
  { src: '/cam-04.jpg', id: 'CAM 02 · HTTPS', loc: 'HLS · PARKING LOT A' },
];

export default function ForSecurityIntegratorsPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Partners', href: '/partners' },
      { label: 'For Security Integrators' },
    ]}>
      <FeatureHero
        eyebrow="Security integrators"
        title="Camzify for security integrators"
        lede={<>
          <strong className="font-semibold text-foreground">
            Integrators are usually the reason a site&apos;s cameras exist in the first place.
          </strong>{' '}
          Camzify attaches to the systems you have already installed, including ones several
          years old, over RTSP, RTMP or HTTPS. Nothing you specified is displaced: the recorder
          stays, the cameras stay, and virtual patrolling becomes a service line on top of the
          footprint you already maintain.
        </>}
        facts={['Any RTSP, RTMP or HTTPS stream', 'Connector for LAN cameras, no port forwarding', 'Hand-over by sub-user and permission group']}
        primary={{ href: '/book-a-demo', label: 'Book a demo' }}
        secondary={{ href: '/supported-cameras', label: 'Supported cameras' }}
        visual={
          <HeroPlaceholder
            label="Commissioning · Four cameras, three routes"
            alt="A commissioning view of four cameras at one site, each labelled with the route it connects by: two via the Connector, one from an encoder, one over HLS"
            frames={FRAMES}
            active={0}
          />
        }
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div className="grid items-start gap-10 lg:grid-cols-[3fr_2fr]">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">Connection</span>
              <h2 className="mt-2 font-display text-2xl font-bold">Three ways a camera reaches Camzify</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                A camera whose stream is reachable from the internet connects directly by its
                RTSP URL. A camera on the customer&apos;s LAN connects through the{' '}
                <Link href="/camzify-connector" className="text-primary hover:underline">Camzify Connector</Link>,
                a small application on a PC inside that network, so there is no port forwarding
                to negotiate with the customer&apos;s IT. Encoders and streaming appliances push
                RTMP to a private ingest address, and web-delivered streams connect over HTTPS,
                whether HLS or WebRTC.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                The route is chosen per camera when it is added, and a site can mix all three.
                The{' '}
                <Link href="/camera-connectivity/rtsp-setup" className="text-primary hover:underline">RTSP setup guide</Link>{' '}
                walks through finding the URL, choosing the route and adding the camera.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <SectionVisual
                variant="flow"
                steps={['Camera on site', 'Direct, Connector or RTMP', 'Camzify cloud', 'Rounds, alerts, recording']}
                caption="Whichever route a camera takes, it arrives as the same stream and gets the same recording, detection and patrol configuration."
                alt="Four-step flow from a camera on site, through one of three connection routes, to the Camzify cloud, to rounds, alerts and recording"
              />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <span className="font-mono text-mono-sm uppercase text-primary">On the job</span>
            <h2 className="mt-2 font-display text-2xl font-bold">What commissioning looks like</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Cable, title: 'Add cameras by route', desc: 'RTSP URL, Connector discovery, or a generated RTMP ingest address with server URL and stream key. Stream quality is detected on connect.', href: '/camera-connectivity' },
                { icon: HardDrive, title: 'Set recording per camera', desc: 'Continuous or scheduled, retained by days or by a storage cap. Apply a preset to every camera on the site in one action.', href: '/guides/how-to-configure-cloud-video-backup' },
                { icon: Camera, title: 'Build the patrol round', desc: 'Order the camera stops, write the checklist for each, assign the guard to notify, and set the schedule. The customer can adjust it later.', href: '/guides/how-to-run-a-virtual-patrol-round' },
                { icon: KeyRound, title: 'Hand over cleanly', desc: 'Create the customer as a sub-user scoped to their sites, pick a permission group, and keep a maintenance login if they want you to.', href: '/guides/how-to-manage-sub-users-and-quotas' },
              ].map((item) => (
                <Link key={item.title} href={item.href} className="group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg">
                  <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="mt-3 font-display text-base font-bold group-hover:text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-16 grid items-start gap-10 lg:grid-cols-[2fr_3fr]">
            <ScrollReveal>
              <SectionVisual
                variant="schedule"
                caption="Recording and retention are set per camera and can be applied to a whole site at once. The on-site recorder is not involved."
                alt="A per-camera recording schedule with retention settings, applied across a site"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <span className="font-mono text-mono-sm uppercase text-primary">What stays and what changes</span>
              <h2 className="mt-2 font-display text-2xl font-bold">Nothing you installed is displaced</h2>
              <ul className="mt-6 space-y-4 text-muted-foreground">
                {[
                  { icon: Server, text: <>The NVR or on-premise VMS keeps recording as before. Camzify records to the cloud on its own schedule, so the customer gains a copy that survives a stolen or destroyed recorder. The <Link href="/compare/cloud-vms-vs-on-premise" className="text-primary hover:underline">cloud versus on-premise comparison</Link> sets out the trade-offs honestly.</>},
                  { icon: Camera, text: <>Cameras stay. Any ONVIF-conformant IP camera with an RTSP stream works, and the <Link href="/supported-cameras" className="text-primary hover:underline">supported cameras</Link> page lists sixteen brands with protocol notes. We sell no hardware and hold no preference for any manufacturer.</>},
                  { icon: Users, text: <>Your relationship stays. The customer sees the service under your hand-over, and the <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">report per round</Link> gives them something to show their own management that a camera installation alone never did.</>},
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <item.icon className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What we will not tell you</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                That there is a certified installer program, a partner portal or a published
                margin. There is not, and we would rather say so than invent one. Commercial terms
                for integrators are agreed in conversation. What we can say is what the product
                does, in detail, on the{' '}
                <Link href="/platform" className="text-primary hover:underline">platform pages</Link>{' '}
                and in the{' '}
                <Link href="/guides" className="text-primary hover:underline">guides</Link>, and our
                position on claims is on the{' '}
                <Link href="/trust" className="text-primary hover:underline">trust page</Link>.
                If you also operate monitoring for your customers, the{' '}
                <Link href="/partners/for-managed-service-providers" className="text-primary hover:underline">managed service providers</Link>{' '}
                page covers holding accounts on their behalf.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div className="rounded-2xl border border-border bg-card p-8 sm:p-10">
            <span className="font-mono text-mono-sm uppercase text-primary">FAQ</span>
            <h2 className="mt-2 font-display text-2xl font-bold">Frequently asked questions</h2>
            <div className="mt-6">
              <FAQAccordion items={faqs} />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
