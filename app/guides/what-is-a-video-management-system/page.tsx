import { generatePageMeta } from '@/lib/page-utils';
import { ProductShot } from '@/components/content/product-shot';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { articleSchema, personSchema } from '@/lib/seo';
import { AuthorByline } from '@/components/content/author-byline';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PointList } from '@/components/content/point-list';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 *
 * The definitional guide for "video management system", "VMS system", "vms software",
 * "what is VMS in CCTV", "vms recording" and "vms device". It replaces the old site's
 * blog post at /blog/what-is-video-management-software-vms/, which ranked for those
 * terms, and receives a redirect from that URL. It answers the category question
 * first and generically; the cloud form has its own guide at /guides/what-is-a-cloud-vms,
 * and this page does not repeat it.
 */
const pageMeta = {
  title: "What Is a VMS? | Video Management System Guide",
  description: "A video management system (VMS) is the software that records, stores and searches camera video. How it differs from an NVR, and how to choose one.",
  path: "/guides/what-is-a-video-management-system",
};

const publishedTime = '2026-09-18';
const modifiedTime = '2026-09-18';

export const metadata = generatePageMeta({ ...pageMeta, type: 'article', publishedTime, modifiedTime });

const faqs = [
  { question: 'Is a VMS a device or software?', answer: 'Software. A video management system is the program that records, stores, plays back and controls access to camera video. It can run on a server the site owns, inside a network video recorder as firmware, or in the cloud as a subscription, which is why the same term turns up attached to a box, a server and a browser login.' },
  { question: 'What is VMS recording?', answer: 'VMS recording is the function that writes incoming camera streams to storage under a rule the operator sets: continuously, on a schedule, or when an event such as motion occurs. The VMS also enforces retention, deleting footage after a set number of days or when a storage cap is reached. Where the footage is written depends on the deployment: local disks for an on-premise or recorder-based VMS, the vendor\'s storage for a cloud VMS.' },
  { question: 'What is a VMS in CCTV?', answer: 'In a CCTV system the VMS is the software layer between the cameras and the people watching them. Cameras capture and encode video; the VMS receives those streams, records them, shows them live, plays them back and decides who can see which camera. In a small analog system that layer lives inside the DVR; in an IP system it runs on an NVR, a server or in the cloud.' },
  { question: 'Is a VMS the same as an NVR?', answer: 'No. An NVR is a recorder, a box with disks that takes in IP camera streams and stores them. A VMS is the software that manages recording, viewing and access, and an NVR is one of the places that software can run. Buying an NVR gets you a VMS embedded in a fixed box; buying VMS software separately lets you choose where it runs and how far it scales.' },
  { question: 'Do I need a VMS if my cameras have their own app?', answer: 'For one or two cameras at one site, usually not. A VMS earns its place when cameras from more than one manufacturer need to be viewed in one place, when retention must be set and enforced per camera, when several people need different levels of access, or when several sites need to be run from one console. Each camera app does one of those jobs for its own cameras; a VMS does all of them for every camera.' },
  { question: 'What does a VMS cost?', answer: 'It depends on the form. On-premise VMS software is generally licensed per server or per camera channel, with the server, storage and maintenance bought on top. Cloud VMS products are generally licensed per camera per month, with storage included or sold separately. Camzify is priced per instance per month and quoted per site, from $5 per camera per month; no other rate is published.' },
];

export default function WhatIsAVideoManagementSystemPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[articleSchema({ headline: "What Is a VMS?", description: pageMeta.description, path: pageMeta.path, datePublished: publishedTime, dateModified: modifiedTime }), personSchema()]} breadcrumbs={[
      { label: 'Guides', href: '/guides' },
      { label: 'What Is a VMS?' },
    ]}>
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">What is a video management system (VMS)?</h1>
          <AuthorByline className="mt-6" updated={modifiedTime} />
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            A video management system, or VMS, is the software that takes in the streams from security cameras and records, stores, shows, searches and exports their video, and controls who may see which camera. It is the layer an operator actually uses: the live wall, the playback timeline, the export button and the user list. Cameras and recorders are hardware; the VMS is what makes them one system.
          </p>
          <p className="mt-4 max-w-prose text-body text-muted-foreground">
            The term is also written as video management software; the two mean the same thing. Much of the confusion around it comes from mixing up the software with the box it runs on, so &ldquo;VMS device&rdquo; and &ldquo;VMS recording&rdquo; are answered directly below. This guide covers the category: what a VMS does, how it relates to cameras, NVRs and DVRs, the three forms it is sold in, and what to check before choosing one. The glossary carries the short definition of a{' '}
            <Link href="/glossary/video-management-system" className="text-primary hover:underline">VMS</Link>, and the{' '}
            <Link href="/guides/what-is-a-cloud-vms" className="text-primary hover:underline">cloud VMS</Link>{' '}
            form has a guide of its own.
          </p>

          <div className="mt-10 max-w-3xl">
            <ProductShot src="/product-live-streaming" alt="The live streaming screen of a VMS: a wall of camera views grouped by site, with each camera's online state shown" label="Live streaming" sizes="(max-width: 1024px) 100vw, 768px" />
          </div>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What does a VMS do?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  A VMS receives video from cameras, records it, keeps it for a defined period, and lets authorized people watch it live, play it back, search it and export it. Around that core it manages users, raises alerts and connects to other systems. Any product sold as a VMS should do the following.
                </p>
              </div>
              <PointList items={[
                <>Ingest. The VMS connects to each camera and receives its stream, usually over RTSP or through an ONVIF profile. A camera that stops streaming is shown as offline rather than silently dropped.</>,
                <>Recording. Each stream is written to storage under a rule: continuously, on a schedule, or when an event occurs. The rule is set per camera, because a loading bay and a server room do not need the same treatment.</>,
                <>Storage and retention. Footage is kept for a number of days or up to a storage cap, then deleted automatically. Enforced retention is what turns a written policy into a fact.</>,
                <>Live view. Cameras are arranged in a wall, grouped by site or area, and watched from a browser or client.</>,
                <>Playback. A timeline per camera, with jumps to the events recorded on it, so an operator can go to the minute that matters.</>,
                <>Search and export. Footage is found by camera and time, and on newer systems by what is in it, then exported as a clip for police, an insurer or a client.</>,
                <>Users and permissions. Named users, each scoped to the cameras and functions they need, with a log of who viewed, exported or changed what.</>,
                <>Alerts. Motion, a camera going offline, or an analytics detection is delivered to a named person by email, SMS, a messaging app or push notification.</>,
                <>Integrations. Access control, alarm panels, intercoms and analytics engines connect to the VMS so an event in one system pulls up video from another.</>,
              ]} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Is a VMS a device, or software?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  A VMS is software. There is no such thing as a VMS device in the strict sense, but the software has to run somewhere, and the place it runs is often called by the same name. That is why a search for a VMS device turns up NVRs, servers and cloud subscriptions together.
                </p>
                <p>
                  The pieces of a camera system divide cleanly. Cameras capture and encode video; a DVR takes analog camera signals, digitizes them and records them to its own disks; a{' '}
                  <Link href="/glossary/network-video-recorder" className="text-primary hover:underline">network video recorder</Link>, or NVR, takes streams that IP cameras have already encoded and records those. The VMS is the management layer on top: it decides what is recorded, for how long, who can watch it and what happens when something is detected.
                </p>
                <p>
                  Every DVR and NVR runs a VMS of some kind, embedded in its firmware, which is where the confusion starts. The recorder is the device; the software inside it is the VMS. A standalone VMS does the same job without being tied to one box: it can manage cameras from several manufacturers, on a server the site sizes itself or in the cloud with no recorder at all.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What is VMS recording?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  VMS recording is the function that writes camera streams to storage under a rule the operator sets. The rule has three parts: when to record, how long to keep what was recorded, and where to write it. The first two are set per camera; the third is decided by how the VMS is deployed.
                </p>
                <p>
                  Continuous recording writes every frame from every camera and costs the most storage. Scheduled recording writes during set hours, such as overnight at a site staffed by day. Event recording writes only when something triggers it, typically motion or an analytics detection, and is the cheapest to store but the easiest to get wrong, because a missed trigger is footage that was never kept.
                </p>
                <p>
                  Retention closes the loop. A VMS keeps each camera&rsquo;s footage for a set number of days or until a storage cap is reached, then deletes the oldest automatically. On a recorder the ceiling is the disks fitted at installation; on a cloud VMS it is the storage the account holds, spent across cameras as the operator chooses.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What are the deployment forms of a VMS?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  A VMS is sold in three forms: as software on a server the customer owns, embedded in a recorder, or as a service in the cloud. All three do the jobs listed above; they differ in who owns the hardware, where the footage lives, how remote viewing works and what happens when something fails.
                </p>
                <p>
                  An on-premise VMS runs on a server inside the building, licensed per server or per camera channel and maintained by the site or its integrator. It is strongest where deep integration with access control and building systems is required, where footage must by policy stay on site, and where the internet connection cannot carry every camera upstream. The costs are the server, its storage, the people who maintain it, and a single point of failure for every camera on it.
                </p>
                <p>
                  A recorder-embedded VMS is the software inside an NVR or DVR. It is the simplest to buy, and for one site with a handful of cameras it is often enough. Its limits are fixed at purchase: the number of channels, the disks fitted, the manufacturer&rsquo;s own camera support, and remote viewing that depends on port forwarding or the vendor&rsquo;s app.
                </p>
                <p>
                  A cloud VMS runs on infrastructure the vendor operates, and the customer pays per camera. Cameras stream to it, footage is stored off site, every site is on one login, and updates are the vendor&rsquo;s job. It needs upstream bandwidth for every camera it streams, and footage leaves the building, encrypted, which some policies forbid. The trade-offs are tabled on{' '}
                  <Link href="/compare/cloud-vms-vs-on-premise" className="text-primary hover:underline">cloud VMS vs on-premise VMS</Link>.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What should you look for when choosing a VMS?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Start with whether it works with the cameras you already own, and then with whether recording, retention and access are controlled per camera rather than per box. Get those two wrong and no other feature recovers the cost.
                </p>
              </div>
              <PointList items={[
                <>Camera compatibility. The VMS should connect any camera that speaks ONVIF or produces an RTSP stream, which covers most IP cameras from the last decade, without a hardware swap. <Link href="/guides/onvif-and-rtsp-explained" className="text-primary hover:underline">ONVIF and RTSP explained</Link> covers both standards.</>,
                <>Retention control. Retention should be set per camera, in days or as a storage cap, and enforced by automatic deletion, so a camera that needs ninety days and one that needs seven do not share a rule.</>,
                <>Remote access. Viewing from outside the building should not depend on a VPN, port forwarding or a vendor app; a browser login is the safest form.</>,
                <>Multi-site management. Every site should be visible from one console, folded together or held separate per client, with users scoped to their own sites.</>,
                <>Analytics. Detections should fire on a confirmed object track rather than pixel motion, so a shadow or a light change does not raise an alert, and reach a named person with an acknowledgment trail.</>,
                <>Licensing model. Know what a license unit is (a server, a channel, a camera, an instance) and what it includes. A per-camera figure without storage, analytics or support is not comparable with one that includes them.</>,
                <>Exit terms. Ask how footage is exported in bulk, what format it comes in, and what happens to it when the subscription or maintenance contract ends.</>,
              ]} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where does Camzify fit?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Camzify is a cloud VMS that runs on the IP cameras a site already owns and adds one thing other VMS products do not: virtual patrolling. Cameras connect over ONVIF, RTSP, RTMP or HTTPS, or through a small connector application inside a private network, with no recorder and no port forwarding. Recording runs continuously or on a schedule, retention is set per camera, and every site sits on one login.
                </p>
                <p>
                  The{' '}
                  <Link href="/platform" className="text-primary hover:underline">Camzify console</Link>{' '}
                  covers the functions above, and 23 detections run on the same streams, each firing on a confirmed object track. <Link href="/virtual-patrolling" className="text-primary hover:underline">Virtual patrolling</Link> is the part a VMS does not usually have: a scheduled round through the cameras that checks a list at each stop, notifies the guard on a failure and files a timestamped report. It does not replace an NVR or integrate with alarm panels;{' '}
                  <Link href="/compare/camzify-vs-traditional-vms" className="text-primary hover:underline">Camzify vs traditional VMS</Link>{' '}
                  says where an on-premise VMS is the better purchase.
                </p>
                <p>
                  Pricing is per instance per month and quoted per site, from $5 per camera per month. Streams are encrypted in transit over TLS 1.2 or higher and footage at rest with AES-256; the PDPA, GDPR, SOC 2 Type II and ISO 27001 work is in progress and none is held yet.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-20 rounded-xl bg-card p-8 shadow">
            <h2 className="font-display text-xl font-bold">Related guides</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/guides/best-cloud-vms" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Best Cloud VMS Platforms</Link>
              <Link href="/guides/what-is-a-cloud-vms" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">What Is a Cloud VMS?</Link>
              <Link href="/guides/what-is-a-cloud-nvr" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">What Is a Cloud NVR?</Link>
              <Link href="/guides/how-to-choose-video-analytics-software" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">How to Choose Video Analytics Software</Link>
              <Link href="/guides/onvif-and-rtsp-explained" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">ONVIF and RTSP Explained</Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/pricing" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow transition-colors hover:bg-primary/90">View pricing</Link>
              <Link href="/roi-calculator" className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted">Calculate ROI</Link>
            </div>
          </section>
        </div>
      </article>
      <FaqSection items={faqs} />
    </PageShell>
  );
}
