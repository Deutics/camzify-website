import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { HowToSteps, HowToNote, type HowToStep } from '@/components/content/how-to-steps';
import { howToSchema } from '@/lib/seo';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "How to Add Sites and Cameras | Setup Guide",
  description: "Create a site, add IP cameras over RTSP or HTTPS, install the Camzify Connector for cameras on a local network, and confirm the stream is flowing before you rely on it.",
  path: "/guides/how-to-set-up-sites-and-cameras",
};

export const metadata = generatePageMeta({ ...pageMeta, type: 'article' });

const steps: HowToStep[] = [
  {
    name: 'Create the site first',
    text: 'A site is a physical location that groups its cameras — a warehouse, a campus, a storefront. Create it with a name, address and an optional contact number before adding anything else. Getting sites right early matters more than it looks: site is the unit that access, reporting and notification filtering are all organized around later, so a fleet dumped into one site is hard to delegate afterwards.',
  },
  {
    name: 'Add the camera and give it a name someone will recognize',
    text: 'Add each camera against its site, name it, and set its resolution. Name it for the place rather than the hardware — "Loading Dock B" tells a guard reading an alert at 2am where to go, and "Cam 14" does not. The name follows the camera into patrol reports and alerts, so it is worth a moment.',
  },
  {
    name: 'Choose the stream type',
    text: 'HTTPS covers HLS and WebRTC sources, which play directly. RTSP covers camera URLs; a publicly reachable RTSP stream is pulled straight from its URL. RTMP is the third option, where the camera or encoder pushes to an ingest address that Camzify generates for it.',
  },
  {
    name: 'For cameras on a local network, install the Connector',
    text: 'If the camera sits behind a router or firewall with no public route, install the Camzify Connector on a Windows, macOS or Linux machine on that network. It makes an outbound connection and relays the stream, so no port has to be opened and the camera is never exposed to the internet. It carries PTZ control for those cameras too.',
  },
  {
    name: 'Verify the stream before you depend on it',
    text: 'Use Test Stream in the camera form, then check the tile in live streaming to confirm footage is actually flowing. Do this before building patrol sequences on the camera. A stream that authenticated once but drops is the failure that quietly empties a patrol report later.',
  },
];

const faqs = [
  {
    question: 'Do I need a static IP to connect my cameras?',
    answer: 'No. A static IP or an existing public route lets an RTSP stream be pulled directly, which is the simplest case. Everything else goes through the Camzify Connector, which connects outward from inside your network — no port forwarding, no inbound firewall rule, and no static IP.',
  },
  {
    question: 'Can I move a camera to a different site later, or rename it?',
    answer: 'Yes. A site or camera can be edited after it is created — name, address, contact number, resolution and stream URL. Nothing about the initial setup is permanent, so it is better to get cameras connected and adjust the organization afterwards than to delay connecting them.',
  },
  {
    question: 'What resolution should I use for AI detection?',
    answer: 'Framing and lighting matter more than pixel count. The practical test is whether a person reviewing the feed can identify a person or vehicle at the distance you care about — if they can, the detection models have enough to work with. A 4K camera pointed at a wide car park can be worse than a 1080p camera framed on the entrance.',
  },
  {
    question: 'How many cameras can one Connector handle?',
    answer: 'It depends on the machine and the upload bandwidth available, since each camera consumes roughly 2 to 4 Mbps at standard resolution. Plan the bandwidth first — that is the constraint that bites, not the software.',
  },
];

export default function Page() {
  return (
    <PageShell
      {...pageMeta}
      faqs={faqs}
      schema={[howToSchema({ name: 'How to add sites and cameras in Camzify', description: pageMeta.description, path: pageMeta.path, steps })]}
      breadcrumbs={[{ label: 'Guides', href: '/guides' }, { label: 'How to Add Sites and Cameras' }]}
    >
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Guide</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">How to add sites and cameras</h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            <strong className="font-semibold text-foreground">
              Everything in Camzify hangs off a site: a physical location that groups its cameras.
            </strong>{' '}
            This guide covers creating one, connecting cameras to it over{' '}
            <Link href="/camera-connectivity/rtsp-setup" className="text-primary hover:underline">RTSP</Link> or{' '}
            <Link href="/camera-connectivity/https-setup" className="text-primary hover:underline">HTTPS</Link>, and
            confirming the stream works before anything is built on top of it.
          </p>

          <HowToSteps steps={steps} />

          <HowToNote>
            The one thing worth deciding up front is how you split sites, because site is the unit
            that access control, reporting and alert filtering all use. Splitting a large building
            into two sites later means revisiting every sub-user&rsquo;s access; doing it at setup
            costs nothing.
          </HowToNote>

          <div className="mt-14">
            <ScrollReveal>
              <p className="max-w-prose text-muted-foreground">
                Next:{' '}
                <Link href="/guides/how-to-run-a-virtual-patrol-round" className="text-primary hover:underline">run a patrol round</Link> on
                the cameras you just added, or read about the{' '}
                <Link href="/camzify-connector" className="text-primary hover:underline">Camzify Connector</Link> and{' '}
                <Link href="/supported-cameras" className="text-primary hover:underline">which cameras work</Link>.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
