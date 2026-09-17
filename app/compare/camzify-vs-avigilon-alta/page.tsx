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
 * Every statement about Avigilon Alta on this page comes from a page on avigilon.com
 * that was opened on 17 September 2026; the list is rendered at the bottom. Nothing
 * about Avigilon pricing is characterized, because Avigilon publishes no price list.
 */
const pageMeta = {
  title: "Camzify vs Avigilon Alta | Cloud Video Compared",
  description: "Camzify and Avigilon Alta compared: cloud video on the cameras you own, AI detections, scheduled patrol rounds, and how each is sold and priced.",
  path: "/compare/camzify-vs-avigilon-alta",
};

export const metadata = generatePageMeta({ ...pageMeta });

const sides = ['Camzify', 'Avigilon Alta'];

/** Avigilon pages opened for this comparison, checked 17 September 2026. */
const sources = [
  { label: 'Avigilon home: Alta and Unity, cameras, access control, analytics', href: 'https://www.avigilon.com/' },
  { label: 'Avigilon Alta cloud security overview', href: 'https://www.avigilon.com/alta' },
  { label: 'Alta Video, the cloud VMS', href: 'https://www.avigilon.com/vms/cloud' },
  { label: 'Alta Cloud Connectors for existing cameras', href: 'https://www.avigilon.com/cloud-connectors' },
  { label: 'Security AI analytics', href: 'https://www.avigilon.com/analytics' },
  { label: 'Alta Access cloud access control', href: 'https://www.avigilon.com/access-control/cloud' },
  { label: 'Security cameras', href: 'https://www.avigilon.com/security-cameras' },
  { label: 'Avigilon Unity on-premise security', href: 'https://www.avigilon.com/unity' },
  { label: 'Unity Video, the on-premise VMS', href: 'https://www.avigilon.com/vms/on-premise' },
  { label: 'Partner locator', href: 'https://www.avigilon.com/partner-locator' },
  { label: 'How to buy', href: 'https://www.avigilon.com/how-to-buy' },
  { label: 'Get a quote', href: 'https://www.avigilon.com/quote' },
];

const faqs = [
  { question: 'Is Camzify an Avigilon alternative?', answer: 'For part of what Avigilon Alta does, yes. Camzify replaces the cloud video layer and adds AI detections and scheduled patrol rounds on the cameras a site already owns. It does not replace the Avigilon cameras, access control or sensors, and it has no on-premise edition. If those are what you are buying, Avigilon Alta or Unity is the right comparison set.' },
  { question: 'Can I keep my existing cameras with either?', answer: 'Yes, with a difference in what goes on site. Camzify connects any ONVIF or RTSP camera directly or through the Camzify Connector, an application on a PC on the local network. Avigilon Alta connects existing IP cameras through an Alta Cloud Connector, a hardware appliance sized for up to 75 or up to 200 cameras. What does not move between platforms is the recorded archive, which stays under the old retention.' },
  { question: 'How do the prices compare?', answer: 'We do not characterize Avigilon pricing here. Avigilon publishes no price list and sells through certified partners and a quote form, so any figure we gave would be a guess. The one public Camzify figure is the floor of $5 per camera per month; the rest is quoted per site, within one business day, from your camera and feature counts.' },
  { question: 'Does Avigilon Alta run virtual patrol rounds?', answer: 'Its pages do not describe scheduled rounds with a checklist per camera or a report per round. Alta Video offers rule-based smart alerts with thumbnails, an AI timeline and appearance search for review. A Camzify round checks a defined list at each camera on a schedule, notifies the assigned guard on a failure, and files a timestamped PDF report with a compliance percentage.' },
  { question: 'Which has the deeper analytics?', answer: 'Avigilon Alta lists facial recognition and license plate recognition, which Camzify does not offer, alongside appearance search, unusual motion, crowd, object and PPE detection. Camzify runs 23 detections on confirmed object tracks, including weapons, aggression, fire and smoke, slip and fall, and a behavioral anomaly detection you describe in a sentence. Which is deeper depends on whether you need to identify people or verify conditions.' },
];

export default function CamzifyVsAvigilonAltaPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Compare', href: '/compare' },
      { label: 'Camzify vs Avigilon Alta' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Camzify vs Avigilon Alta</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Camzify and Avigilon Alta are two different purchases. Avigilon Alta is the cloud security platform from Motorola Solutions: Alta Video, Alta Access, a camera line of its own and AI analytics, sold and installed through a certified partner network. Camzify is a software-only cloud video service that runs on the ONVIF and RTSP cameras a site already owns, adds AI detections and scheduled virtual patrol rounds with a report per round, and is quoted direct, per site, from $5 per camera per month.
          </p>
          <p className="mt-4 max-w-2xl text-body text-muted-foreground">
            If you are looking for an Avigilon alternative because you want to keep your cameras and add detections and patrol rounds without an integrator project, Camzify is built for that case. If you want cameras, doors, sensors and video from one vendor, with a partner to install and support it, Avigilon Alta is the more complete system, and this page says so. Everything stated here about Avigilon Alta comes from its own pages, listed at the end.
          </p>

          <div className="mt-10 max-w-3xl">
            <ProductShot src="/product-patrol-sequence" alt="A patrol sequence in the Camzify console: ordered camera stops, the checklist at each stop and the schedule the round runs on" label="Patrol sequence" sizes="(max-width: 1024px) 100vw, 768px" />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What you are choosing between</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Avigilon Alta describes itself as serverless and cloud-native, with Alta Video and Alta Access unified on one platform and a camera line that Avigilon puts at more than 100 models, up to 10K resolution. Existing IP cameras join through an Alta Cloud Connector, a hardware appliance that connects third-party cameras to the Alta Video cloud, in a workstation size for up to 75 cameras or a rack-mounted server for up to 200. The analytics listed on the Alta pages include Appearance Search, unusual motion detection, facial recognition, license plate recognition, crowd and object detection and PPE detection. For sites that need recording to stay in the building, the same company sells the Unity line.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Camzify has no hardware to sell. A camera connects over RTSP, RTMP or HTTPS, or through the Camzify Connector, an application on a PC inside the local network that relays streams to the cloud without port forwarding; the <Link href="/supported-cameras" className="text-primary hover:underline">supported cameras</Link> page lists what connects. Each camera takes a stream instance, each AI feature on a camera takes a detection instance, and cloud storage is a pool sold per terabyte with retention set per camera. The capability the Alta pages do not describe is <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link>: a scheduled sequence of camera stops, a checklist at each, a guard notified on any failure, and a timestamped PDF report with a compliance percentage.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                The two are also sold differently. Avigilon directs a buyer to its partner locator to be matched with a certified partner, and its quote page collects requirements and returns pricing, with no figures published anywhere on the site. Camzify is licensed direct: the pricing page takes camera and feature counts and returns a quote within one business day, and a partner quote for a guarding company or monitoring center is sized for the whole portfolio.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-12">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Side by side</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                The Camzify column states what the product does today. The Avigilon Alta column states only what its own pages say, and says so where a page did not cover a row.
              </p>
              <div className="mt-8">
                <ComparisonTable
                  columns={['', sides[0], sides[1]]}
                  rows={[
                    { label: 'What you buy', values: ['A software subscription only. No cameras and no appliance; the Connector is an application on a PC.', 'A cloud security platform: Alta Video, Alta Access, Avigilon cameras, sensors and Cloud Connector appliances, installed by a partner.'] },
                    { label: 'Cameras', values: ['The ONVIF and RTSP cameras you already own, over RTSP, RTMP or HTTPS streams.', 'Its own line: dome, bullet and box, PTZ, 360 and panoramic, specialty, up to 10K. Existing IP cameras connect through an Alta Cloud Connector appliance.'] },
                    { label: 'Recording and retention', values: ['Cloud recording, continuous or scheduled, with retention per camera by days or storage cap from a per-terabyte pool.', 'Cloud video through Alta Video, with a Connector on site for existing cameras. Retention periods are not stated on the pages checked.'] },
                    { label: 'AI detections and analytics', values: ['23 detections on confirmed object tracks, licensed per feature per camera; motion and tampering included. Behavior can be described in plain language.', 'Appearance Search, unusual motion detection, facial recognition, license plate recognition, crowd and object detection, PPE detection, an AI timeline and smart alerts.'] },
                    { label: 'Patrol rounds and compliance reporting', values: ['Scheduled rounds with a checklist per camera, the guard notified on a failure, and a timestamped PDF report with a compliance percentage per round.', 'Not described on its pages. Alerts are rule-based with thumbnails, time and location; review is through the AI timeline and search.'] },
                    { label: 'Multi-site and users', values: ['Sites, sub-users and permission groups on one account. Mobile access is the responsive browser; native apps are on the roadmap.', 'Any number of sites with group configuration policies, an Alta Video mobile app for Android and iOS, and Alta Access on the same platform for doors and credentials.'] },
                    { label: 'How it is sold', values: ['Direct from Camzify, with partner tracks for security agencies, monitoring centers and integrators.', 'Through a certified partner network of resellers, integrators and distributors, with a partner locator and a quote form.'] },
                    { label: 'Pricing model', values: ['Per instance per month, quoted per site, from $5 per camera per month.', 'No public price list. Alta Video points to a pricing request, and the quote page shows no figures.'] },
                    { label: 'Best fit', values: ['Sites that keep their cameras and want verification: scheduled rounds with evidence, direct licensing, no integrator project.', 'Organizations that want cameras, video, access control and sensors from one vendor, installed and supported by a partner, with an on-premise option in Unity.'] },
                  ]}
                />
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where Avigilon Alta is the better choice</h2>
              <PointList items={[
                'You want one vendor for cameras, video, access control and sensors: Alta Video and Alta Access are unified on one platform, and Camzify does not do access control at all.',
                'You are specifying new cameras: Avigilon builds its own line, more than 100 models by its own count, and Camzify sells none.',
                'You need facial recognition or license plate recognition: both are listed on the Alta pages, and neither is among the Camzify detections.',
                'Recording may have to stay on premises: the Unity line covers that, and Camzify is cloud only.',
                'You want certifications held today: the Alta Video page states SOC 2 Type 2 compliance, ISO 27001 certification and GDPR compliance, while the Camzify work on those frameworks is in progress and none is held.',
                'You want a native mobile app now: Alta Video has one for Android and iOS, and Camzify mobile access is the browser until its native apps ship.',
              ]} />
            </ScrollReveal>
          </div>

          <div className="mt-12">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where Camzify is the better choice</h2>
              <PointList items={[
                'You want to keep your cameras and add nothing on site: any ONVIF or RTSP camera connects, and the Connector is an application on a PC rather than an appliance to buy.',
                'You need scheduled rounds with evidence: a checklist per camera, a guard notified on a failure, and a PDF report per round with a compliance percentage, which the Alta pages do not describe.',
                'You want to license per camera and per feature: 100 cameras with line intrusion on ten of them is 100 stream instances and ten detection instances, quoted per site from a public floor of $5 per camera per month.',
                'You buy direct and want a quote within one business day rather than a partner engagement.',
                'You are a guarding company or monitoring center: each client is a sub-user scoped to its own sites, quota is allocated from your own, and every round produces a report you can hand to the client.',
                <>You want to describe a behavior rather than pick it from a catalog: behavioral anomaly detection, one of the 23 <Link href="/ai-features" className="text-primary hover:underline">AI features</Link>, works from a sentence.</>,
              ]} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">The bottom line</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Buy Avigilon Alta when the project is a security system: new cameras, doors, sensors and video from one vendor, installed by a partner, with the option to keep recording on premises through Unity. Buy Camzify when the cameras are already on the wall and what is missing is verification: detections that fire on confirmed object tracks, and a scheduled round that checks a list at each camera and files the evidence. The two are not exclusive. A site that runs Alta today can point the same RTSP streams at Camzify for rounds without replacing anything, and the archive stays where it is.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                To put the difference in your own numbers, the <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link> prices routine rounds against guard hours, and the <Link href="/pricing" className="text-primary hover:underline">pricing page</Link> explains per-instance licensing and turns your counts into a quote. How Camzify handles recording without a recorder is on <Link href="/cloud-video-surveillance" className="text-primary hover:underline">cloud video surveillance</Link>. Integrators who fit Avigilon systems and want a rounds layer to offer on top can read the <Link href="/partners/for-security-integrators" className="text-primary hover:underline">security integrators</Link> page.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Sources, checked 17 September 2026</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Every statement about Avigilon Alta on this page comes from one of these pages, opened on that date. Where a page did not cover something, the table says so rather than guessing.
              </p>
              <ul className="mt-4 max-w-prose space-y-2 text-sm text-muted-foreground">
                {sources.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{s.label}</a>
                    <span className="ml-2 break-all text-muted-foreground/70">{s.href}</span>
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
