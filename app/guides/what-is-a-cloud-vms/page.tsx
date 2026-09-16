import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { articleSchema, personSchema } from '@/lib/seo';
import { AuthorByline } from '@/components/content/author-byline';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PointList } from '@/components/content/point-list';
import { ProductShot } from '@/components/content/product-shot';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 *
 * The definitional guide for "cloud VMS", "cloud video management system" and "vms
 * software". It answers the buyer's question in the first two sentences, separates the
 * term from an on-premise VMS and from a cloud NVR, and says plainly where an
 * on-premise VMS is still the better purchase.
 */
const pageMeta = {
  title: "What Is a Cloud VMS? | Video Management",
  description: "A cloud VMS records and manages camera video in the cloud rather than on a server on site. How it differs from an on-premise VMS and a cloud NVR.",
  path: "/guides/what-is-a-cloud-vms",
};

const publishedTime = '2026-09-16';
const modifiedTime = '2026-09-16';

export const metadata = generatePageMeta({ ...pageMeta, type: 'article', publishedTime, modifiedTime });

const faqs = [
  { question: 'What does VMS stand for in security?', answer: 'Video management system, or video management software. It is the layer that connects cameras, records and stores their video, plays it back, and controls who can view it. A cloud VMS runs that layer as a service in the cloud rather than on a server or recorder inside the building.' },
  { question: 'Is a cloud VMS the same as a cloud NVR?', answer: 'Not quite. A cloud NVR usually means the recording function of an NVR moved into the cloud. A cloud VMS covers recording and everything a management layer adds: live viewing across sites, users and permissions, alerts, analytics and, on Camzify, scheduled patrol rounds. Every cloud VMS is a cloud NVR; the reverse does not hold.' },
  { question: 'Do I need new cameras for a cloud VMS?', answer: 'Usually not. A cloud VMS built on open standards connects to any camera that produces an RTSP stream, which covers most IP cameras from the last decade, and Camzify also accepts RTMP and HTTPS streams. Cameras on a private network connect through a small connector application inside that network, without port forwarding.' },
  { question: 'How much bandwidth does a cloud VMS need?', answer: 'Enough upstream bandwidth to carry every camera you choose to stream, continuously. The figure depends on resolution, frame rate and codec, which is why Camzify does not publish a per-camera number. Stream quality is detected when a camera connects, and a site with too little upstream capacity should keep an on-site recorder.' },
  { question: 'Where is the footage stored, and who can reach it?', answer: 'In the cloud, encrypted in transit over TLS 1.2 or higher and at rest with AES-256, under a retention window set per camera. Access follows permission groups, so a user who cannot open a camera cannot open its recordings either. Every action on the account is written to an audit trail the account holder can review.' },
  { question: 'What does a cloud VMS cost?', answer: 'Cloud VMS products are generally licensed per camera per month rather than sold as hardware. Camzify is priced per instance per month, a stream instance per camera plus detection instances and storage, quoted per site below the approximate list rates on its pricing page. The pricing page explains what a quote is built from, and the ROI calculator compares it against the guarding or recorder costs it replaces.' },
];

export default function WhatIsACloudVmsPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[articleSchema({ headline: "What Is a Cloud VMS?", description: pageMeta.description, path: pageMeta.path, datePublished: publishedTime, dateModified: modifiedTime }), personSchema()]} breadcrumbs={[
      { label: 'Guides', href: '/guides' },
      { label: 'What Is a Cloud VMS?' },
    ]}>
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">What is a cloud VMS?</h1>
          <AuthorByline className="mt-6" />
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            A cloud VMS is a video management system that runs as a service in the cloud: cameras stream to it, it records and stores their footage, and every function is used from a browser instead of from a server or recorder on site. It replaces the on-premise VMS server and the NVR with a per-camera subscription, and it keeps the cameras a site already owns.
          </p>
          <p className="mt-4 max-w-prose text-body text-muted-foreground">
            At the narrow end of the term, a cloud VMS is remote recording and playback. At the wide end it is the whole video operation on one login: live viewing across sites, retention per camera, users and permissions, alerts, analytics and, on the{' '}
            <Link href="/platform" className="text-primary hover:underline">cloud VMS</Link>{' '}
            this site describes, scheduled patrol rounds. That wider model is what the industry now calls{' '}
            <Link href="/cloud-video-surveillance" className="text-primary hover:underline">cloud video surveillance</Link>, and Camzify is one product built on it. This guide is about the category rather than the product: what a cloud VMS does, how it differs from the two things it is most often confused with, what to look for, and when it is the wrong purchase.
          </p>

          <div className="mt-10 max-w-3xl">
            <ProductShot src="/product-video-backup" alt="The video backup screen of a cloud VMS: recording mode and retention set per camera, with storage by site above" label="Video backup and retention" sizes="(max-width: 1024px) 100vw, 768px" />
          </div>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What does a cloud VMS do?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  A cloud VMS does the four jobs every video management system has always done, and does them for every site from one place. It connects the cameras, shows them live, records and keeps their footage for a defined period, and decides who may see which camera. What changes in the cloud is that none of those jobs depends on a machine in the building.
                </p>
                <p>
                  In practice, the functions a buyer should expect are these.
                </p>
              </div>
              <PointList items={[
                <>Camera connection over open standards. A cloud VMS built on ONVIF and RTSP takes the stream a camera already produces; a camera on a private network is relayed by a small connector application, so no port is opened on the router. The protocols are explained in <Link href="/guides/onvif-and-rtsp-explained" className="text-primary hover:underline">ONVIF and RTSP explained</Link>.</>,
                <>Live viewing from a browser: a multi-camera wall grouped by site, with an explicit offline state for any camera that has stopped streaming.</>,
                <>Recording and retention set per camera, continuously or on a schedule, kept for a number of days or up to a storage cap, with playback and export from the same browser. The retention screen shown above is the <Link href="/platform/video-backup-and-retention" className="text-primary hover:underline">video backup and retention</Link> module.</>,
                <>Users and permissions: named users, page-level access, and create, read, update and delete rights per resource, with every action written to an audit trail.</>,
                <>Multi-site management: every site set up independently and read from one console, folded together or held separate, which is the feature that stops a company running one recorder and one login per building.</>,
                <>Alerts and analytics on top of the recording: detections delivered to a named person by email, SMS, WhatsApp or push, and trends reported per site and per feature.</>,
              ]} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How is a cloud VMS different from an on-premise VMS?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  An on-premise VMS runs on a server the customer buys, installs and maintains inside the building; a cloud VMS runs on infrastructure the vendor operates, and the customer pays per camera. The software does a similar job in both cases. The difference is who owns the hardware, where the footage lives, and what happens when something fails.
                </p>
                <p>
                  With an on-premise VMS the server is the single point of failure for every camera on it, remote viewing needs a VPN or port forwarding, each additional site usually means another server and another login, and updates are a task for an on-site IT team. With a cloud VMS a camera going offline is shown as offline while the others keep recording, viewing from elsewhere is the default, a new site is added to the same console, and updates are the vendor's job.
                </p>
                <p>
                  The trade runs the other way on two points. An on-premise VMS needs no upstream bandwidth beyond the local network, and its footage never leaves the building unless someone exports it. A cloud VMS needs bandwidth for every camera it streams and sends footage off site, encrypted. The full table is on{' '}
                  <Link href="/compare/cloud-vms-vs-on-premise" className="text-primary hover:underline">cloud VMS vs on-premise VMS</Link>, and a recorder-centered system is set against a cloud one on{' '}
                  <Link href="/compare/camzify-vs-traditional-vms" className="text-primary hover:underline">Camzify vs traditional VMS</Link>.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Is a cloud VMS the same as a cloud NVR?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  No, although the two terms are used for the same products. A cloud NVR is the recording function of a network video recorder moved into the cloud: footage is stored off site and played back from a browser. A cloud VMS includes that function and adds the management layer around it.
                </p>
                <p>
                  The distinction matters when you compare products. Something sold as a cloud NVR may record and play back and do little else, which is fine if recording is all you need. A cloud VMS is expected to set retention per camera rather than per box, put every site on one login, scope users to their own cameras, and carry alerts and analytics on the same streams. If the phrase you know is cloud NVR, treat it as the floor of what a cloud VMS does, not the whole of it.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What should you look for in a cloud VMS?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Look first at whether it takes the cameras you already own, and second at whether retention, access and storage are controlled at the level of a single camera. Those two questions decide most of the cost and most of the compliance outcome. The rest of the list follows from how the system will actually be run.
                </p>
              </div>
              <PointList items={[
                <>Open camera support. The system should connect any ONVIF or RTSP camera without a hardware swap, and should offer a way to reach cameras on a private network without port forwarding.</>,
                <>Retention per camera, in days or as a storage cap, enforced by automatic deletion. A written retention policy the system does not enforce protects nobody; <Link href="/guides/video-retention-requirements" className="text-primary hover:underline">video retention requirements</Link> explains how to set the number.</>,
                <>Encryption in transit and at rest, stated plainly, and an honest account of certification status. Camzify encrypts streams over TLS 1.2 or higher and footage at rest with AES-256; its PDPA, GDPR, SOC 2 Type II and ISO 27001 work is in progress and none is held, and the trust page says so.</>,
                <>Permission groups that scope a user to their own sites and cameras, with a full audit trail. For a security agency or a monitoring center this extends to sub-users who can create their own, with license quota allocated from the parent account.</>,
                <>A single console for every site, with the option to fold sites together or hold them separate per client.</>,
                <>Something that turns recording into watching. Detections that fire on a confirmed object track rather than pixel motion, and, on Camzify, <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link>: a scheduled round through the cameras that checks a list at each stop, notifies the guard on a failure and files a timestamped report.</>,
                <>Access from a phone through the browser, with no dependency on a native app that may not yet exist.</>,
              ]} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">When is an on-premise VMS still the better choice?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  An on-premise VMS is the better choice when the site cannot carry its cameras upstream, when footage must by policy never leave the building, or when local recording for occasional review is all that is wanted. Those are real cases, and a cloud VMS does not win them. A vendor that says otherwise is selling rather than advising.
                </p>
                <p>
                  Bandwidth is the most common reason. A cloud VMS streams every enabled camera continuously, and the upstream capacity that needs depends on resolution, frame rate and codec. A site on a thin or metered connection, or one whose upstream is already committed to other traffic, will either drop frames or starve the rest of the network.
                </p>
                <p>
                  Policy is the second. Some organizations are bound by contract, regulation or internal rule to keep footage on premises, and encryption in transit does not change where the data ends up. In that case the recorder stays. The third is the simplest: one site, one recorder that works, and nobody who needs to watch it from elsewhere has no problem for a cloud VMS to solve.
                </p>
                <p>
                  The two can also coexist. A site can keep its on-premise recorder as the local archive and add a cloud VMS on the same cameras for a second copy under its own retention, remote viewing, detections and patrol rounds. That is often the right answer for a site that has one of the constraints above on some cameras and none of them on the rest.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-20 rounded-xl bg-card p-8 shadow">
            <h2 className="font-display text-xl font-bold">Related guides</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/guides/what-is-a-cloud-nvr" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">What Is a Cloud NVR?</Link>
              <Link href="/guides/cloud-vms-cost" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Cloud VMS Cost</Link>
              <Link href="/guides/cloud-vms-bandwidth-requirements" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Cloud VMS Bandwidth Requirements</Link>
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
