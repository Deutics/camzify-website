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
 * Every statement about ADT on this page comes from a page on adt.com listed in the
 * Sources section at the bottom. Nothing about ADT's pricing is characterized beyond
 * what its own pages say: call or complete a form for a quote, and charges vary with
 * the system. Where ADT's pages do not describe something, the row says so.
 *
 * HOW THE ADT PAGES WERE READ ON 18 SEPTEMBER 2026. adt.com refused every direct
 * request from this session with an Akamai "Access Denied" (WebFetch, the preview
 * browser, curl and a third-party crawler all got HTTP 403; the session's IP is
 * outside the United States and ADT's terms page says its services are US-only). The
 * text of each source URL was therefore read from the Internet Archive's capture of
 * that adt.com page, the most recent capture in each case: /business 26 Aug 2026,
 * /business/video-surveillance 19 Jun 2026, /business/cameras 14 Mar 2026,
 * /business/products 19 Jun 2026, /business/solutions 13 May 2026,
 * /business/packages 19 Jun 2026, /business/intrusion-detection 18 Apr 2026,
 * /business/access-control 14 Mar 2026,
 * the business terms 18 Apr 2026, and /commercial 5 Jun 2026. The video verification
 * page had only a 2024 capture, so nothing on this page rests on it. The Sources
 * section says on the page that the captures were used. Re-check each row against
 * the live pages from a US connection when one is available.
 */
const pageMeta = {
  title: "ADT Alternative for Business Video",
  description: "Camzify as an ADT alternative for business video: AI detections and patrol rounds on the cameras you already own, no hardware, from $5 per camera.",
  path: "/alternatives/adt",
};

export const metadata = generatePageMeta({ ...pageMeta });

const sides = ['Camzify', 'ADT'];

/** ADT pages read for this comparison. Rendered at the bottom of the page. */
const sources = [
  { label: 'ADT business security home', href: 'https://www.adt.com/business', captured: '26 August 2026' },
  { label: 'ADT business video surveillance', href: 'https://www.adt.com/business/video-surveillance', captured: '19 June 2026' },
  { label: 'ADT business security cameras', href: 'https://www.adt.com/business/cameras', captured: '14 March 2026' },
  { label: 'ADT business security products', href: 'https://www.adt.com/business/products', captured: '19 June 2026' },
  { label: 'ADT business solutions and monitoring levels', href: 'https://www.adt.com/business/solutions', captured: '13 May 2026' },
  { label: 'ADT compare business packages', href: 'https://www.adt.com/business/packages', captured: '19 June 2026' },
  { label: 'ADT monitored intrusion detection', href: 'https://www.adt.com/business/intrusion-detection', captured: '18 April 2026' },
  { label: 'ADT business access control', href: 'https://www.adt.com/business/access-control', captured: '14 March 2026' },
  { label: 'ADT small business terms and conditions', href: 'https://www.adt.com/about-adt/legal/business-terms-and-conditions', captured: '18 April 2026' },
  { label: 'ADT commercial section (Everon)', href: 'https://www.adt.com/commercial', captured: '5 June 2026' },
];

const rows = [
  { label: 'What you buy', values: ['Software only: a monthly subscription that runs on the cameras a site already has. No hardware and no installation visit.', 'A monitored security system: intrusion detection, video surveillance, access control and business automation, installed by ADT technicians and sold as Secure, Interactive and Complete packages.'] },
  { label: 'Cameras', values: ['Any ONVIF or RTSP camera, plus RTMP and HTTPS streams. Private-network cameras connect through the Camzify Connector, an application on a PC.', 'ADT\'s own dome, bullet, turret, doorbell, perimeter protection and floodlight cameras in HD, with 1080p live video. Connecting existing or third-party cameras is not described on the pages checked.'] },
  { label: 'Recording and retention', values: ['Continuous or scheduled cloud recording. Retention set per camera in days or as a storage cap, from a storage pool sold per terabyte.', 'Cloud storage or on-site storage, each with 24-hour continuous recording and motion-triggered clips. A retention period is not described on the pages checked.'] },
  { label: 'AI detections', values: ['23 detection models on confirmed object tracks, licensed per feature per camera. Motion and camera tampering included with every camera.', 'Analytics and smart alerts for heat mapping, queue monitoring, people counting and occupancy tracking, plus the AI Deterrence add-on, which delivers a verbal warning through the camera\'s speaker.'] },
  { label: 'Patrol rounds and compliance reporting', values: ['Scheduled virtual patrol rounds with a checklist per camera, a guard notified on any failure, and a timestamped report with a compliance percentage per round.', 'Not described on the pages checked. ADT describes an activity feed and reports on events such as alarms, door openings and motion, not a scheduled round with a report each.'] },
  { label: 'Alarm monitoring and response', values: ['Not offered. Alerts go to your own guard or operator over email, SMS, WhatsApp or push; alarm panels and monitoring stay with whoever provides them today.', 'Native. 24/7 professional monitoring of intrusion, hold-up, flood and temperature alarms. Its intrusion detection page describes video verification as a way to reduce false alarms.'] },
  { label: 'Multi-site and users', values: ['Every site on one account. Sub-users scoped to their own sites, permission groups per user, license quota allocated from the parent.', 'Multiple locations monitored and controlled from the ADT Control app, and cameras at multiple locations viewed from a single account. Sub-accounts for client sites are not described on the pages checked.'] },
  { label: 'Pricing model', values: ['Per instance per month, quoted per site, from $5 per camera per month.', 'By quote. Every business page asks you to call or complete a form so an ADT specialist can contact you, and the terms page states that service and installation charges vary with the system configuration, equipment and services selected.'] },
  { label: 'Best fit', values: ['A site or portfolio that keeps its cameras and adds detection, patrol rounds and a compliance record, with alarm monitoring left where it is.', 'A small business that wants alarms, cameras, locks and 24/7 monitoring installed and monitored by one provider.'] },
];

const checklist = [
  <>Whether your cameras publish an RTSP or ONVIF stream. Most IP cameras from the last decade do; a camera that only talks to its own recorder or app may not. The <Link href="/camera-connectivity" className="text-primary hover:underline">camera connectivity</Link> page lists the three connection types and the Connector.</>,
  'What stays with your current provider. Camzify does not touch alarm panels, door hardware or a monitoring center, so intrusion monitoring, hold-up buttons and access control keep running as they are, from whoever provides them.',
  'How long you need footage kept, and on which cameras. Retention is set per camera from a storage pool, so a loading dock can keep more days than a corridor; decide that before the quote.',
  'Who receives alerts and who walks the site when a round fails. Every detection and every failed checklist item goes to a named person, so if that person is a guard from your agency, they need to be in the account before the first round runs.',
  'The status of your current agreement. Check your current agreement for its term and notice period before you change anything, and plan the video move to start alongside it rather than instead of it.',
  'What the recorder holds today. The archive on an on-site recorder does not move to the cloud, so export what you must keep before the recorder is retired.',
];

const adtBetter = [
  'You want one provider to install and monitor everything. ADT\'s pages describe its own technicians installing the system and 24/7 monitoring of intrusion, hold-up, flood and temperature alarms, none of which Camzify offers.',
  'You want a monitoring professional to verify an alarm before anyone responds. ADT\'s intrusion detection page describes 24/7 professional monitoring with video verification; Camzify notifies your own guard and runs no monitoring center.',
  'You want doors and cameras in one app. ADT\'s access control page describes locks, keycard readers and intercoms integrated with its intrusion and video systems in a single app.',
  'You have no cameras yet and want them supplied and installed. ADT sells and installs its own camera range; Camzify sells none.',
  'You want a deterrent that speaks. ADT\'s AI Deterrence add-on delivers a verbal warning through the camera\'s speaker; Camzify raises an alert to a person.',
];

const camzifyBetter = [
  <>You own working cameras and do not want to replace them. Camzify connects any ONVIF or RTSP camera at full capability, and the guide on <Link href="/guides/using-existing-cameras-with-a-cloud-vms" className="text-primary hover:underline">using existing cameras with a cloud VMS</Link> explains what to check first.</>,
  'You need proof that a round was done. A scheduled round checks a list at every camera, messages the guard on a failure and files a report with a compliance percentage, which no ADT page we checked describes.',
  'You want detections beyond counting and heat maps. Line and zone intrusion, loitering, tampering, weapons, fire and smoke, PPE, and a behavior you describe in plain language, all on confirmed object tracks.',
  'You cover other people\'s sites. A security agency or monitoring company runs every client on one account, each as a sub-user scoped to its own cameras, with a report per round to hand over.',
  'You want video that works alongside the alarm system you already have. Camzify adds detection and rounds to the cameras and leaves the panel, the monitoring contract and the dispatch path untouched.',
];

const faqs = [
  { question: 'Why do businesses move from ADT to Camzify?', answer: 'The ones who have told us gave three reasons about what they wanted next: fewer false alarms, a system that keeps running without a recorder in the building, and an interface their staff would actually use. Camzify fires detections on confirmed object tracks rather than pixel motion, records to the cloud, and runs in a browser. That is what they were looking for; it is not a finding about ADT, whose pages are the only source this page uses for ADT itself.' },
  { question: 'Is Camzify an ADT alternative?', answer: 'For the video part of business security, yes. Camzify is cloud video surveillance with 23 AI detections and scheduled virtual patrol rounds on the ONVIF and RTSP cameras a site already owns, and a buyer who wants the video without a new hardware install is who this page is for. It is not an alternative for intrusion alarms, access control or 24/7 alarm monitoring, which Camzify does not offer.' },
  { question: 'Can I use Camzify alongside ADT alarm monitoring?', answer: 'Yes, in the sense that Camzify does not touch alarm panels, sensors or the monitoring center, so an alarm monitoring arrangement keeps running exactly as it is. The condition is on the camera side: Camzify needs each camera to be reachable as an RTSP or ONVIF stream, or as an RTMP or HTTPS stream. We do not claim compatibility with any ADT camera; check what your cameras publish before you plan on it.' },
  { question: 'Does Camzify replace ADT cameras?', answer: 'Camzify sells no hardware, so it does not supply replacement cameras. Cameras that publish a standard RTSP or ONVIF stream can be kept and connected as they are, and cameras on a private network are relayed by the Camzify Connector without port forwarding. A camera that only speaks to its own recorder or app would need to be replaced by a standard one, which you would source yourself.' },
  { question: 'Is Camzify cheaper than ADT?', answer: 'We do not compare prices here. Camzify starts from $5 per camera per month and is quoted per site from the camera and feature counts you enter on the pricing page. ADT\'s business pages direct businesses to call or complete a form for a quote, so the comparison has to be made between two quotes for your own site.' },
  { question: 'Does Camzify offer 24/7 monitoring or police dispatch?', answer: 'No. Camzify runs no monitoring center and dispatches nobody. Every detection and every failed patrol check is delivered to a named person on your side, a guard, an operator or a manager, over email, SMS, WhatsApp or push, with an acknowledgment trail. If you want a monitoring professional to verify alarms and call the police, that service stays with a provider that offers it.' },
  { question: 'Do I have to cancel my current provider to start with Camzify?', answer: 'No. Camzify is added to the cameras, not to the alarm system, so the two run side by side. Check your current agreement for its term and notice period before changing anything, and start the video move alongside it. The one thing that does not carry over is the archive on an on-site recorder, so export what you must keep first.' },
];

export default function AdtAlternativePage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Alternatives', href: '/alternatives' },
      { label: 'ADT alternative' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">An ADT alternative for business video surveillance</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Camzify is an ADT alternative for the video part of business security: <Link href="/cloud-video-surveillance" className="text-primary hover:underline">cloud video surveillance</Link> with AI detections and scheduled <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link> rounds on the IP cameras a site already owns. It sells no cameras, no alarm panels and no monitoring center, so the comparison is narrower than the name suggests. ADT sells a monitored security system installed by its own technicians; Camzify is software for the cameras.
          </p>
          <p className="mt-4 max-w-2xl text-body text-muted-foreground">
            This page sets out what ADT&apos;s business pages describe, what Camzify does differently, and who should stay with ADT. Every statement about ADT comes from a page on adt.com listed at the bottom. Where those pages do not describe something, the row says so.
          </p>

          <div className="mt-10 max-w-3xl">
            <ProductShot src="/product-live-streaming" alt="The Camzify live streaming wall: cameras from several sites in one grid, each with its site label and online state" label="Live streaming · Camzify console" sizes="(max-width: 1024px) 100vw, 768px" />
          </div>

          <div className="mt-12">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What ADT business security includes</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                ADT&apos;s business section is written for small businesses and sells four things: intrusion detection, video surveillance, access control and business automation. Its home page states that ADT technicians install the system, that its 24/7 monitoring responds to alarms, and that cameras, locks and arming are controlled from the ADT Control app. The solutions and packages pages set out three levels: Secure, which is intrusion only; Interactive, which adds interactive services and automation; and Complete, which adds video.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                The video surveillance page describes HD dome, bullet, turret, doorbell and perimeter protection cameras, cloud or on-site storage with 24-hour continuous recording, and analytics for heat mapping, queue monitoring, people counting and occupancy tracking. The cameras page adds 1080p live video, motion-triggered clips and multiple locations on one account. A newer add-on, AI Deterrence, uses the camera&apos;s built-in speaker to deliver a verbal warning to a person it recognizes on the property.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Monitoring is the center of the offer. The intrusion detection page describes systems professionally monitored 24/7, with video verification offered as a way to reduce false alarms. Pricing is by quote: each business page asks you to call or complete a form so an ADT specialist can contact you, and the business terms page states that service and installation charges vary with the system configuration, equipment and services selected.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                One more thing to know before comparing. The commercial section of adt.com carries the Everon brand, which describes itself as a provider of integrated security, fire and life safety for enterprise-scale commercial customers. The ADT-branded business pages are aimed at small businesses, and it is those pages this comparison reads.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What Camzify does differently</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Camzify is a cloud video management system with virtual patrolling built in, and it starts from the cameras already on the wall. Any ONVIF or RTSP camera connects, as do RTMP and HTTPS streams, and cameras on a private network are relayed by the Camzify Connector, a small application on a PC, without opening ports. No hardware is sold and no technician is sent; the <Link href="/supported-cameras" className="text-primary hover:underline">supported cameras</Link> page lists what connects.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Recording is continuous or scheduled, to the cloud, with retention set per camera in days or as a storage cap from a storage pool sized by the account. Twenty-three <Link href="/ai-features" className="text-primary hover:underline">AI detections</Link> run on confirmed object tracks, motion and camera tampering included with every camera and the rest licensed per feature per camera. Every alert goes to a named person over email, SMS, WhatsApp or push, with an acknowledgment trail.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                The capability no ADT page describes is the scheduled virtual patrol round. At each camera stop the system checks a defined list of conditions, notifies the assigned guard on a failure, and files a timestamped report with a compliance percentage for the round. Every site sits on one account with sub-users scoped to their own sites, which is how security agencies run it across client portfolios. What Camzify does not do matters as much: no alarm panels, no access control, no monitoring center and no dispatch.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Side by side</h2>
              <div className="mt-6">
                <ComparisonTable columns={['Aspect', sides[0], sides[1]]} rows={rows} />
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What to check before you switch</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                A move from a monitored system to software on your cameras is mostly a question of what stays and what changes. Six things to settle before asking for a quote.
              </p>
              <PointList items={checklist} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where ADT is the better choice</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                ADT is the stronger option when the alarm system, the installation and the monitoring center are part of what you want to buy, and Camzify offers none of the three.
              </p>
              <PointList items={adtBetter} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where Camzify is the better choice</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Camzify is the stronger option when the cameras stay and what is missing is detection and verification on top of them.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                The US businesses that have moved from ADT to Camzify told us what they were looking for: fewer false alarms, a service that does not depend on a recorder in the building, and an interface their staff would use without training. Camzify answers those three with detections that fire on confirmed object tracks rather than pixel motion, cloud recording with nothing on site to fail except the camera itself, and a browser console that needs no software installed. Whether ADT met those needs at their sites is their account to give, not a claim this page makes about ADT.
              </p>
              <PointList items={camzifyBetter} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">The bottom line</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                If you want alarms, cameras, locks and 24/7 monitoring installed and run by one provider, ADT is built for exactly that. If your cameras work and the gap is that nobody can prove the rounds were done, or that the only detection you have is motion, Camzify puts detections and scheduled patrol rounds on those cameras without a hardware purchase and without touching the alarm system. The two answer different questions about the same building, and many sites will keep one and add the other.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Two pages show the fit in practice. <Link href="/use-cases/alarm-verification" className="text-primary hover:underline">Alarm verification</Link> describes how a camera confirms or dismisses an alarm before anyone is sent, and <Link href="/industries/automotive" className="text-primary hover:underline">automotive</Link> covers the yard and workshop sites ADT&apos;s own industry list starts with. For the cost basis, Camzify is quoted from $5 per camera per month on the <Link href="/pricing" className="text-primary hover:underline">pricing</Link> page, and a <Link href="/book-a-demo" className="text-primary hover:underline">demo</Link> on your own cameras settles the compatibility question in an hour. If the comparison you actually need is with another camera vendor, <Link href="/compare/camzify-vs-verkada" className="text-primary hover:underline">Camzify vs Verkada</Link> is written the same way.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Sources, read 18 September 2026</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Every statement about ADT above comes from one of these adt.com pages. ADT&apos;s site serves US visitors only, so each page was read from the Internet Archive&apos;s most recent capture of that URL, dated as shown. If a row here disagrees with what ADT&apos;s site says today, its site is current and this page is not.
              </p>
              <ul className="mt-4 max-w-prose space-y-2 text-muted-foreground">
                {sources.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{s.label}</a>
                    <span className="ml-2 break-all font-mono text-xs text-muted-foreground">{s.href}</span>
                    <span className="ml-2 text-xs text-muted-foreground">capture of {s.captured}</span>
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
