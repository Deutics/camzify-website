import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { ComparisonTable } from '@/components/content/comparison-table';
import { PointList } from '@/components/content/point-list';
import Link from 'next/link';
import { ProductShot } from '@/components/content/product-shot';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 *
 * This page compares two deployment models, not two vendors, so it names no product
 * other than Camzify and cites nothing. Every Camzify fact comes from /llms.txt or
 * /platform.
 */
const pageMeta = {
  title: "Cloud VMS vs On-Premise VMS",
  description: "Compare cloud video management with on-premise VMS solutions. Understand the trade-offs in cost, maintenance, scalability, and remote access.",
  path: "/compare/cloud-vms-vs-on-premise",
};

export const metadata = generatePageMeta({ ...pageMeta });

const sides = 'Cloud VMS vs On-Premise VMS'.split(' vs ');

const onPremiseBetter = [
  'Footage may not leave the building. A policy, a contract or a regulator that requires recordings to stay on site is met by a recorder on the local network, and a cloud system cannot meet it by definition.',
  'The site has no usable upload bandwidth. Every stream a cloud VMS records has to be carried to the internet for as long as it records; a recorder takes the same streams over the local network and needs no internet at all.',
  'Recording has to continue through an internet outage. A recorder on the local network keeps writing while the link is down, and a cloud system cannot receive what the site cannot send.',
  'The operators sit at a wall of monitors on the site network. Local viewing of many cameras at full quality is the recorder at its best, with nothing in the path but the switch.',
  'Video must be tied to doors, alarm panels and building systems in one console. Those integrations are what an on-premise VMS is built for, and they run on the same network as the panels.',
];

const cloudBetter = [
  'There is more than one site. A cloud VMS puts every site on one account and one console, with sub-users scoped to their own sites, instead of one server per building and a VPN between them.',
  'People outside the building need the cameras. Guards, an agency or a monitoring company reach a cloud VMS from a browser with a permission group deciding what they see; nobody opens a port or issues VPN credentials.',
  'The recording has to survive the recorder. Footage in the cloud is still there when the equipment room is flooded, burgled or unplugged, which is exactly when it is needed.',
  'Nobody wants to own a server. Updates, disk replacement, capacity planning and the operating system are the provider\'s job, and adding cameras is adding cameras, not buying a bigger box.',
  'Detection and rounds have to run without a GPU on site. A cloud VMS runs its AI detections and its scheduled patrol rounds in the cloud, on the cameras a site already owns, with nothing installed but an optional connector.',
];

const faqs = [
  { question: 'When is on-premise the right answer?', answer: 'A site with no usable connectivity, a policy that forbids footage leaving the building, or an existing recorder that meets every need. Those are real cases and this page says so.' },
  { question: 'What does cloud change for a multi-site operator?', answer: 'One console, every site, no server to maintain per site, footage that survives a stolen or destroyed recorder, and rounds that run across the estate on one schedule.' },
  { question: 'What bandwidth does cloud need?', answer: 'Enough to carry the streams you enable; we do not publish a per-camera figure because it depends on resolution, frame rate and codec. Stream quality is detected when a camera connects.' },
  { question: 'Can the two coexist?', answer: 'Yes. Keep the on-premise recorder and add Camzify on the same cameras. The recorder holds the local archive; the cloud holds a copy under its own retention and runs the detections and rounds.' },
  { question: 'Do I need to open ports or set up a VPN for a cloud VMS?', answer: 'Not with Camzify. A camera whose stream is already reachable over the internet connects directly, and a camera on a private network connects through the Camzify Connector, an application installed on a PC that can reach both the cameras and the internet. The Connector relays the streams outward, so no port is forwarded and no camera is exposed.' },
  { question: 'What happens to cloud recording when the internet goes down?', answer: 'Nothing can reach the cloud while the link is down, so a site that must record through an outage needs a recorder on the local network for that period. This is the honest limit of the cloud model, and the reason hybrid deployments keep a recorder beside the cloud copy rather than replacing it.' },
  { question: 'Is a cloud VMS secure enough for a security buyer?', answer: 'The question to ask any provider is how streams are protected in transit, how footage is protected at rest, and who can reach it. Camzify encrypts streams in transit and footage at rest and applies permission groups and an audit trail to every user. Its PDPA, GDPR, SOC 2 Type II and ISO 27001 work is in progress and none of the four is held, which the trust page states plainly.' },
];

export default function CloudVmsVsOnPremisePage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Compare', href: '/compare' },
      { label: 'Cloud VMS vs On-Premise VMS' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Cloud VMS vs on-premise VMS</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            A cloud VMS is video management software run by a provider in its own data centers: cameras stream to it over the internet, footage is stored and played back from the cloud, and the operator uses it from a browser anywhere. An on-premise VMS is video management software installed on a server or network video recorder inside the building: cameras stream to it over the local network, footage is stored on its disks, and the operator reaches it on that network or through a VPN.
          </p>
          <p className="mt-4 max-w-2xl text-body text-muted-foreground">
            The two record the same cameras and differ on where the footage lives, who maintains the equipment, and how anyone outside the building reaches it. This page sets out how each works, where the recorder remains the right choice, and what a cloud system asks of a site in return for what it removes.
          </p>

          <div className="mt-10 max-w-3xl">
            <ProductShot src="/product-video-backup" alt="The video backup screen: recording mode and retention set per camera, storage by site above" label="Video backup and retention" sizes="(max-width: 1024px) 100vw, 768px" />
          </div>

          <div className="mt-12">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Side by side</h2>
              <div className="mt-6">
                <ComparisonTable
                  columns={['Aspect', sides?.[0] ?? 'Option A', sides?.[1] ?? 'Option B']}
                  rows={[
                    { label: "Upfront cost", values: ["Low: subscription per camera", "High: server hardware, NVR, licenses"] },
                    { label: "Maintenance", values: ["Managed by provider: updates automatic", "On-site IT team required for updates and repairs"] },
                    { label: "Remote access", values: ["Native: access from any device, anywhere", "VPN or port forwarding required"] },
                    { label: "Multi-site", values: ["Centralized dashboard for all locations", "Separate systems per site or complex networking"] },
                    { label: "Scalability", values: ["Add cameras instantly", "Hardware upgrade required at capacity"] },
                    { label: "AI capabilities", values: ["Cloud-native AI processing", "Limited: requires dedicated GPU hardware"] },
                  ]}
                />
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How does an on-premise VMS work?</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                An on-premise VMS keeps everything inside the building. A server or recorder on the local network takes a stream from each camera, writes it to local disks under a retention window sized by the disks, and shows live views and playback to operators on that network.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Its strengths follow from that placement. It needs no internet link to record or to view, footage never leaves the site unless someone exports it, and the same server can be wired to door controllers and alarm panels so events from one appear next to video from another. Its costs follow too: the hardware is bought and sized up front, each site is its own installation with its own disks to replace and software to patch, and anyone outside the building reaches it through a VPN or a forwarded port.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How does a cloud VMS work?</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                A cloud VMS moves the server out of the building. Each camera streams to the provider over the internet, the provider stores the footage under a retention window the account sets, and every user reaches live views, playback, alerts and settings from a browser with nothing installed on site.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                On Camzify, recording runs continuously or on a schedule per camera, with retention set per camera in days or as a storage cap from a pool sold per terabyte, so a camera on a loading dock can keep footage longer than one in a corridor. The 23 AI detections run in the cloud on confirmed object tracks from the same streams, and the scheduled <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrol rounds</Link> run there too, so a site adds detection and rounds without adding a GPU or a server. Every site sits on one account with sub-users scoped to their own sites, which is what turns a portfolio of recorders into one console.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                What the cloud model asks of the site is a path for the streams. A camera already reachable over the internet connects directly by RTSP, RTMP or HTTPS; a camera on a private network connects through the Camzify Connector, an application on a PC that reaches both the cameras and the internet and relays the streams outward, without port forwarding and without exposing a camera.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where on-premise is the better choice</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                On-premise is the better choice when the footage cannot leave the building, when the site cannot carry its streams to the internet, or when recording must continue with the internet down. None of these is solved by a cloud system, and a site with any of them should keep its recorder.
              </p>
              <PointList items={onPremiseBetter} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where a cloud VMS is the better choice</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                A cloud VMS is the better choice when there are several sites, when people outside the building need to see the cameras, or when nobody wants to own and maintain a server. The <Link href="/guides/what-is-a-cloud-vms" className="text-primary hover:underline">cloud VMS guide</Link> covers the model in more depth.
              </p>
              <PointList items={cloudBetter} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Can cloud and on-premise run together?</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Yes, and for a site that already owns a working recorder this is the usual arrangement. The recorder keeps taking its stream and holding the local archive, and the cloud system takes its own stream from the same camera, records a copy under its own retention, and runs the detections and rounds. The recorder answers the outage and the footage-stays-on-site requirements; the cloud answers the remote access, multi-site and verification requirements.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                The <Link href="/guides/hybrid-cloud-video-surveillance" className="text-primary hover:underline">hybrid cloud video surveillance</Link> guide sets out how to split the two, and the <Link href="/cloud-video-surveillance" className="text-primary hover:underline">cloud video surveillance</Link> page describes the cloud side on its own.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">The bottom line</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Neither approach is universally better. The right choice depends on where the footage is allowed to live, what the site can send upstream, how many sites there are and who needs to reach them. <a href="/virtual-patrolling" className="text-primary hover:underline">Virtual patrolling</a> is strongest where consistency, audit trails and cost against guard hours matter most: multi-site operations, after-hours coverage, and facilities where guarding is the dominant security spend, all of which are cases the cloud model serves and a recorder per site does not.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                For the definitions behind this comparison, read <Link href="/guides/what-is-a-cloud-vms" className="text-primary hover:underline">what a cloud VMS is</Link>; for the cost side, <Link href="/guides/cloud-vms-cost" className="text-primary hover:underline">what drives cloud VMS cost</Link>. Use the <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link> to model the cost comparison for your specific scenario, or <Link href="/pricing" className="text-primary hover:underline">review pricing</Link> to understand the per-instance licensing model. The <Link href="/cloud-video-surveillance" className="text-primary hover:underline">cloud video surveillance</Link> page describes the cloud side on its own.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
      <FaqSection items={faqs} />
    </PageShell>
  );
}
