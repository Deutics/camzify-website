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
 * Every statement about Spot AI on this page comes from a spot.ai page that was opened
 * on 17 September 2026 and is listed in the Sources section at the bottom. Spot AI's
 * own site publishes no software price, so none is characterized here.
 */
const pageMeta = {
  title: "Camzify vs Spot AI | AI Guard vs Patrol Rounds",
  description: "Camzify vs Spot AI from both vendors' own pages: cameras supplied against cameras kept, and a continuous AI guard against scheduled patrol rounds.",
  path: "/compare/camzify-vs-spot-ai",
};

export const metadata = generatePageMeta({ ...pageMeta });

const columns = ['Aspect', 'Camzify', 'Spot AI'];

const rows = [
  { label: 'What you buy', values: ['A software subscription, priced per instance. No hardware is sold or required beyond the optional Camzify Connector on a PC.', 'An AI camera system: cameras, an Intelligent Video Recorder with on-device AI, and a cloud dashboard with pre-trained AI agents.'] },
  { label: 'Cameras', values: ['The ONVIF, RTSP, RTMP or HTTPS cameras a site already owns. Nothing is supplied or replaced.', 'Its own NDAA-compliant cameras at no cost, or keep current cameras. States it runs on virtually any ONVIF-compliant IP camera across 100+ brands.'] },
  { label: 'Recording and retention', values: ['Continuous or scheduled recording to the cloud, retention set per camera in days or as a storage cap, encrypted at rest with AES-256.', 'Full-resolution video stays on the on-site recorder and only metadata leaves the network, with cloud backup of selected clips. A retention period is not stated on the pages read.'] },
  { label: 'AI detections', values: ['23 detection models on confirmed object tracks, licensed per camera: intrusion, loitering, tampering, weapons, fire, PPE and behavior described in plain language.', '15+ pre-trained video AI agents grouped as AI Security Guard, AI Operations Assistant and AI Safety Manager.'] },
  { label: 'AI assistant and search', values: ['Forensic search of recorded footage by a plain-language description of a person, and behaviors to watch for described in ordinary language. No conversational assistant.', 'Iris: ask what is happening across your facilities in plain language, and build custom video AI agents through conversation.'] },
  { label: 'Patrol rounds and compliance reporting', values: ['Scheduled rounds with a checklist per camera, the guard notified on a failure, and a timestamped PDF report with a compliance percentage per round.', 'Continuous monitoring of every feed with escalating deterrents, clips, time-stamped logs and case files. No scheduled round with a checklist is described.'] },
  { label: 'Multi-site and users', values: ['Every site on one login. Sub-users scoped to their own sites, permission groups per user, license quota allocated from the parent account.', 'Locations viewed from one dashboard. Role-based access with permissions set per camera and feature, and SSO or SAML sign-in.'] },
  { label: 'Pricing model', values: ['Per instance per month, from $5 per camera, quoted per site within one business day.', 'No software price published. Cameras are stated to be at no cost; the Check pricing link opens a contact form.'] },
  { label: 'Best fit', values: ['Sites with cameras worth keeping that need a verifiable round, and agencies or monitoring centers selling patrols to their own clients.', 'Sites that want cameras supplied, an on-site recorder, and one conversational assistant across security, safety and operations.'] },
];

const faqs = [
  { question: 'Is Spot AI a direct competitor to Camzify?', answer: 'Partly. Both put AI on the IP cameras a business already has and both are used from a cloud dashboard. Spot AI also supplies cameras and an on-site recorder and markets a continuous AI security guard, while Camzify sells software only and organizes its coverage as scheduled patrol rounds with a report each. The overlap is the security use; the operations use is Spot AI territory.' },
  { question: 'Does either one require replacing cameras?', answer: 'No. Spot AI states that it is camera-agnostic and connects to existing IP cameras over RTSP, and it also offers its own cameras at no cost. Camzify connects any ONVIF or RTSP camera and supplies no hardware at all. What does not move between platforms is the footage archive, which stays under the old system’s retention.' },
  { question: 'What is the difference between an AI security guard and virtual patrolling?', answer: 'An AI security guard, as Spot AI describes it, watches every feed all the time and acts when it verifies a threat. Virtual patrolling runs a round on a schedule, checks a defined list at each camera, and files a report that says what was checked, what failed and who was told. One is a continuous filter on events; the other is a record that the routine was done.' },
  { question: 'How do prices compare?', answer: 'We do not characterize Spot AI’s pricing. Its site publishes no software price and states that its cameras come at no cost, and that is all we repeat. Camzify starts from $5 per camera per month and is quoted per site; compare that quote against what your routine rounds cost today.' },
  { question: 'Does Camzify have an equivalent to Iris?', answer: 'Not a conversational one. Camzify searches recorded footage by a plain-language description of a person, and behavioral anomaly detection takes a behavior described in ordinary language and alerts when it is observed. There is no assistant to ask open questions of, and this page says so rather than stretching the comparison.' },
];

const sources = [
  { href: 'https://www.spot.ai/', label: 'Spot AI homepage: cameras at no cost, AI Security Guard, AI Operations Assistant, Iris' },
  { href: 'https://www.spot.ai/product', label: 'Spot AI product: cameras, Intelligent Video Recorder, cloud dashboard, 15+ AI agents, ONVIF support' },
  { href: 'https://www.spot.ai/ai-security-guard', label: 'Spot AI: AI Security Guard' },
  { href: 'https://www.spot.ai/ai-operations-assistant', label: 'Spot AI: AI Operations Assistant' },
  { href: 'https://www.spot.ai/iris', label: 'Spot AI: Iris' },
  { href: 'https://www.spot.ai/security', label: 'Spot AI: security, encryption, access control and certifications' },
  { href: 'https://www.spot.ai/ai-camera-system', label: 'Spot AI: AI camera system buyer guide, with the Check pricing link' },
  { href: 'https://try.spot.ai/contact', label: 'Spot AI: the Check pricing destination, a contact form with no figures' },
  { href: 'https://www.spot.ai/compare', label: 'Spot AI: comparison library' },
  { href: 'https://www.spot.ai/compare/vs', label: 'Spot AI: head-to-head comparisons' },
  { href: 'https://www.spot.ai/compare/switch', label: 'Spot AI: switch guides' },
];

export default function CamzifyVsSpotAiPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Compare', href: '/compare' },
      { label: 'Camzify vs Spot AI' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Camzify vs Spot AI</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Spot AI sells an AI camera system: NDAA-compliant cameras supplied at no cost, an Intelligent Video Recorder on site, and a cloud dashboard with pre-trained AI agents on top. Camzify is software only, a{' '}
            <Link href="/cloud-video-surveillance" className="text-primary hover:underline">cloud video surveillance</Link>{' '}
            service that runs on the ONVIF and RTSP cameras a site already owns, adds AI detections, and runs scheduled virtual patrol rounds with a compliance report per round. If you are looking for a Spot AI alternative that keeps your cameras and leaves a record of what was checked, this page sets the two side by side from each vendor&apos;s own pages.
          </p>
          <p className="mt-4 max-w-2xl text-body text-muted-foreground">
            Both connect to existing IP cameras, so the choice is not about lock-in. It is about two models of watching. Spot AI&apos;s AI Security Guard monitors every feed continuously and acts when it verifies a threat; Camzify&apos;s{' '}
            <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link>{' '}
            runs a round on a schedule, checks a list at each camera, and files a timestamped report. The sections below say where each one wins.
          </p>

          <div className="mt-10 max-w-3xl">
            <PhotoFigure src="/compare-vs-spot-ai.webp" alt="The Camzify console on a laptop beside a chat-style AI assistant panel, a neutral stand-in for an always-on AI camera system" />
          </div>

          <div className="mt-10 max-w-3xl">
            <ProductShot src="/product-live-streaming" alt="The live streaming wall in the Camzify console, cameras grouped by site with their online state" label="Live streaming" sizes="(max-width: 1024px) 100vw, 768px" />
          </div>

          <div className="mt-12">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Side by side</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                The Spot AI column repeats what its own pages say and nothing else. Where a page did not state something, the cell says so rather than guessing.
              </p>
              <div className="mt-6">
                <ComparisonTable columns={columns} rows={rows} />
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Two models of watching</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Spot AI describes its AI Security Guard as monitoring every camera feed, all the time, and deciding on its own how to act or alert. Its AI Operations Assistant applies the same idea to production lines and back-of-house tasks, and Iris lets a person ask the cameras questions in plain language. The output is events: verified threats, deterrents fired, clips and case files, and answers to questions asked after the fact.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Camzify&apos;s virtual patrolling is a round, not a filter. On a schedule set in the site&apos;s own timezone, the system visits each camera in a sequence, judges a checklist from the frame, messages the guard responsible for anything that fails, and files a report with the snapshot behind every answer and a compliance percentage. The 23 detections run alongside the round, but the record that a manager or a client reads is the report, and it exists whether or not anything happened.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                The second difference is what arrives at the site. Spot AI can ship cameras at no cost and puts an Intelligent Video Recorder on the network, which keeps full-resolution video local. Camzify ships nothing; cameras stream to the cloud directly or through the Camzify Connector on a PC, and footage is stored under a retention window set per camera.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where Spot AI is the better choice</h2>
              <PointList items={[
                'Cameras are supplied at no cost, so a site with aging or missing cameras gets hardware without a separate purchase or a second vendor.',
                'Iris answers plain-language questions about what is happening across your facilities and lets you build custom video AI agents through conversation, which Camzify does not offer.',
                'The AI Operations Assistant monitors production lines against a standard operating procedure, flags process drift in warehouses and scores shifts, an operations scope Camzify does not attempt.',
                'The AI Security Guard fires strobes, two-way talk-downs, floodlights or webhooks the moment a threat is verified and keeps escalating until the scene is clear; Camzify’s response is a notification to a named person.',
                'Its comparison library runs to forty pages, including switch guides that plan a phased migration and keep the cameras you own, which is more switching detail than most vendors publish, this site included.',
              ]} />
            </ScrollReveal>
          </div>

          <div className="mt-12">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where Camzify is the better choice</h2>
              <PointList items={[
                'There is no hardware at all: nothing to ship, mount or replace, and a site with no room or appetite for a recorder needs none.',
                <>A scheduled round with a checklist per camera produces a compliance percentage and a PDF report every time it runs, a record a client, an auditor or an insurer can read without opening any footage. That is the <Link href="/virtual-guard" className="text-primary hover:underline">virtual guard</Link> model as a service.</>,
                'A failing check messages the guard responsible from the round itself, and an item cannot stay Not Compliant: it is fixed and re-checked with a second snapshot, or held Pending with a written reason.',
                'Multi-tenant sub-users let a security agency or monitoring center run each client scoped to its own sites, with license quota allocated from the parent account and a report per round for each client.',
                'Retention is set per camera in days or as a storage cap, so a gate camera can keep ninety days while a corridor keeps seven, and every site is on one login.',
              ]} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">The bottom line</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Choose Spot AI when you want one vendor to supply the cameras and the recorder, keep full-resolution video on site, and put a conversational assistant across security, safety and operations. Choose Camzify when the cameras are already in place and worth keeping, the question you are asked after an incident is whether the round was done, and the answer has to be a report with a timestamp on it. The detail on what a round records is on{' '}
                <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link>, and the 23 detections that run alongside it are listed under{' '}
                <Link href="/ai-features" className="text-primary hover:underline">AI features</Link>, with{' '}
                <Link href="/ai-features/forensic-video-search" className="text-primary hover:underline">forensic video search</Link>{' '}
                as the nearest thing to Iris.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                On cameras, both keep what you own; the difference is that Spot AI will also supply them and Camzify never will.{' '}
                <Link href="/supported-cameras" className="text-primary hover:underline">Supported cameras</Link>{' '}
                lists what connects. On cost, use the{' '}
                <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link>{' '}
                to price the routine rounds a site runs today, then put your camera and feature counts into{' '}
                <Link href="/pricing" className="text-primary hover:underline">pricing</Link>{' '}
                for a quote. We do not characterize Spot AI&apos;s pricing beyond what its site states.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Sources, checked 17 September 2026</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Every statement about Spot AI on this page comes from one of these pages, opened on the date above. Spot AI changes its site; if a cell above no longer matches, the page is the authority.
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
