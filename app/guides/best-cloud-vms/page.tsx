import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { articleSchema, personSchema } from '@/lib/seo';
import { AuthorByline } from '@/components/content/author-byline';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PointList } from '@/components/content/point-list';
import { ComparisonTable } from '@/components/content/comparison-table';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 *
 * The buyer's guide for "cloud vms" and "best cloud vms". The query is answered in
 * search by multi-vendor lists, so this page is one: eight cloud VMS platforms, Camzify
 * among them, each described only from its own site. Camzify is listed first because it
 * is ours, and the page says so in the first paragraph. Every vendor statement is
 * traceable to a page in the `sources` array at the bottom; add a claim, add its page.
 */
const pageMeta = {
  title: "Best Cloud VMS | 8 Platforms Compared",
  description: "Eight cloud VMS platforms, Camzify included, compared on cameras, storage, retention, analytics, doors and published pricing. Every claim is sourced.",
  path: "/guides/best-cloud-vms",
};

const publishedTime = '2026-09-18';
const modifiedTime = '2026-09-18';

export const metadata = generatePageMeta({ ...pageMeta, type: 'article', publishedTime, modifiedTime });

/**
 * Every vendor page opened for this guide, grouped by vendor and rendered in the
 * Sources section. Nothing on this page about a named vendor comes from anywhere else.
 * Several Eagle Eye product URLs on een.com now redirect to brivo.com; the Brivo page
 * that actually loaded is the one listed.
 */
const sources = [
  {
    vendor: 'Camzify',
    pages: [
      { label: 'Camzify platform', href: '/platform' },
      { label: 'Camzify llms.txt', href: '/llms.txt' },
    ],
  },
  {
    vendor: 'Eagle Eye Networks',
    pages: [
      { label: 'Eagle Eye Networks home page', href: 'https://www.een.com/' },
      { label: 'Eagle Eye camera compatibility', href: 'https://www.een.com/support/camera-compatibility-digital-ip/' },
      { label: 'Eagle Eye bridges', href: 'https://www.een.com/hardware/bridges/' },
      { label: 'Cloud VMS (een.com/product/vms-video-management-system/ redirects here)', href: 'https://www.brivo.com/platform/video-management-system/' },
      { label: 'Video editions: Standard, Professional, Enterprise', href: 'https://www.brivo.com/platform/video-management-system-editions/' },
      { label: 'Camera Direct (een.com/product/camera-direct/ redirects here)', href: 'https://www.brivo.com/platform/video-management-system/camera-direct/' },
    ],
  },
  {
    vendor: 'Verkada',
    pages: [
      { label: 'Verkada home page', href: 'https://www.verkada.com/' },
      { label: 'Verkada Command', href: 'https://www.verkada.com/command/' },
      { label: 'Verkada security cameras', href: 'https://www.verkada.com/security-cameras/' },
      { label: 'Verkada Command Connector', href: 'https://www.verkada.com/security-cameras/command-connector/' },
      { label: 'Verkada access control', href: 'https://www.verkada.com/access-control/' },
      { label: 'Verkada pricing', href: 'https://www.verkada.com/pricing/' },
    ],
  },
  {
    vendor: 'Rhombus',
    pages: [
      { label: 'Rhombus home page', href: 'https://www.rhombus.com/' },
      { label: 'Rhombus Console', href: 'https://www.rhombus.com/console/' },
      { label: 'Rhombus AI analytics', href: 'https://www.rhombus.com/ai-analytics/' },
      { label: 'Rhombus Relay Core N100', href: 'https://www.rhombus.com/cameras/relay-connector/n100/' },
      { label: 'Rhombus alarm monitoring', href: 'https://www.rhombus.com/alarm-monitoring/' },
      { label: 'Rhombus license comparison', href: 'https://www.rhombus.com/license-comparison/' },
      { label: 'Rhombus pricing', href: 'https://www.rhombus.com/pricing/' },
    ],
  },
  {
    vendor: 'Solink',
    pages: [
      { label: 'Solink home page', href: 'https://solink.com/' },
      { label: 'Solink AI Cloud VMS', href: 'https://solink.com/ai-cloud-vms/' },
      { label: 'Solink AI Video Alarms', href: 'https://solink.com/ai-video-alarms/' },
      { label: 'Solink camera compatibility', href: 'https://solink.com/camera-compatibility/' },
      { label: 'Solink pricing', href: 'https://solink.com/pricing/' },
    ],
  },
  {
    vendor: 'Spot AI',
    pages: [
      { label: 'Spot AI home page', href: 'https://www.spot.ai/' },
      { label: 'Spot AI product', href: 'https://www.spot.ai/product' },
      { label: 'Spot AI camera system guide, with the Check pricing link', href: 'https://www.spot.ai/ai-camera-system' },
      { label: 'Spot AI contact page, the Check pricing destination', href: 'https://try.spot.ai/contact' },
    ],
  },
  {
    vendor: 'Coram AI',
    pages: [
      { label: 'Coram AI home page', href: 'https://www.coram.ai/' },
      { label: 'Coram AI security camera system', href: 'https://www.coram.ai/security-camera-system' },
      { label: 'Coram Point AI NVR', href: 'https://www.coram.ai/nvr' },
      { label: 'Coram AI access control', href: 'https://www.coram.ai/access-control' },
      { label: 'Coram AI pricing', href: 'https://www.coram.ai/pricing' },
    ],
  },
  {
    vendor: 'Avigilon Alta',
    pages: [
      { label: 'Avigilon home page', href: 'https://www.avigilon.com/' },
      { label: 'Avigilon Alta overview', href: 'https://www.avigilon.com/alta' },
      { label: 'Alta Video, the cloud VMS', href: 'https://www.avigilon.com/vms/cloud' },
      { label: 'Alta Cloud Connectors', href: 'https://www.avigilon.com/cloud-connectors' },
      { label: 'Avigilon Unity, the on-premise line', href: 'https://www.avigilon.com/unity' },
      { label: 'How to buy', href: 'https://www.avigilon.com/how-to-buy' },
      { label: 'Get a quote', href: 'https://www.avigilon.com/quote' },
    ],
  },
];

const faqs = [
  { question: 'What is the difference between a cloud VMS and a cloud NVR?', answer: 'A cloud NVR is the recording function of a network video recorder moved off site: footage is stored in the cloud and played back from a browser. A cloud VMS includes that and adds the management layer around it, which means live viewing across sites, users and permissions, retention per camera, alerts and analytics on one login. Several products on this page keep a recorder on site and manage it from the cloud, which is a third shape again, and the storage row of the table shows which.' },
  { question: 'Can I keep my existing cameras with a cloud VMS?', answer: 'With most of the eight, yes, but the mechanism differs. Camzify, Solink and Spot AI describe connecting the cameras a site already has as the normal path. Eagle Eye, Rhombus, Verkada and Avigilon Alta each sell their own cameras and describe a separate device (a bridge, the Relay Core, the Command Connector, a Cloud Connector) that brings third-party cameras into the platform. Coram AI runs any IP camera through its own recorder. Check the camera row for the one you are considering.' },
  { question: 'Why is Camzify listed first?', answer: 'Because Camzify is our product and this guide is published on its site. Listing it first is a disclosure, not a ranking, and the other seven are in alphabetical order. Its section is written to the same length and pattern as the others, including its limits: no hardware, no access control, no alarms and no monitoring center.' },
  { question: 'Which of these platforms publishes prices?', answer: 'On the pages checked, Verkada lists MSRP hardware prices with a license required on top, and Rhombus lists camera prices and an annual per-camera license price. Camzify publishes one figure, from $5 per camera per month, and quotes the rest per site. Eagle Eye, Solink, Spot AI, Coram AI and Avigilon Alta publish no figure and direct the reader to a quote or a sales conversation. Cloud VMS cost explains what a per-camera quote is built from.' },
  { question: 'Do I need a cloud VMS that also does access control and alarms?', answer: 'Only if doors and alarm panels are part of the purchase. Verkada, Rhombus, Coram AI and Avigilon Alta each sell their own access control alongside video, and Eagle Eye is integrated with the Brivo access suite. Camzify, Solink and Spot AI are video products; Solink describes alarm and access integrations, Camzify and Spot AI describe none. A buyer who already has a door system that works has no reason to pay for a second one.' },
  { question: 'How was this guide researched?', answer: 'Every statement about a vendor comes from a page on that vendor\'s own website, opened on the date in the Sources section and listed there. No review sites, analyst reports, ratings or customer counts were used, and no vendor was ranked on quality. Where a vendor\'s pages do not describe something, the guide says so rather than guessing. If a vendor changes a page, the vendor\'s page is the authority.' },
];

export default function BestCloudVmsPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[articleSchema({ headline: "The best cloud VMS platforms, compared on what their own pages say", description: pageMeta.description, path: pageMeta.path, datePublished: publishedTime, dateModified: modifiedTime }), personSchema()]} breadcrumbs={[
      { label: 'Guides', href: '/guides' },
      { label: 'Best Cloud VMS' },
    ]}>
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">The best cloud VMS platforms, compared on what their own pages say</h1>
          <AuthorByline className="mt-6" />
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            This guide compares eight cloud VMS platforms: Camzify, Eagle Eye Networks, Verkada, Rhombus, Solink, Spot AI, Coram AI and Avigilon Alta. Camzify is our product, which is why it is listed first; the other seven follow in alphabetical order. Every statement about a vendor comes from that vendor&apos;s own website, read on the date shown in the Sources section at the bottom; nothing here rests on reviews or third-party reports.
          </p>
          <p className="mt-4 max-w-prose text-body text-muted-foreground">
            A{' '}
            <Link href="/guides/what-is-a-cloud-vms" className="text-primary hover:underline">cloud VMS</Link>{' '}
            records and manages camera video as a service rather than on a server in the building, and the eight products here fit that definition in different ways. Some keep a recorder on site; some send every stream off site; some sell the cameras, some take yours. There is no best overall, only a best fit for a given buyer, so each section ends with the situation it suits. What a per-camera subscription is built from is covered in{' '}
            <Link href="/guides/cloud-vms-cost" className="text-primary hover:underline">cloud VMS cost</Link>.
          </p>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How to read this guide</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Five questions separate these platforms more than any feature list does, and the answers decide most of the cost. The vendor sections below answer them in the same order for each product.
                </p>
              </div>
              <PointList items={[
                <>Do you keep your cameras or buy the vendor&apos;s? Some run on any ONVIF or RTSP camera; some are built around their own hardware and bring in third-party cameras through a connector device with its own limits.</>,
                <>Where is the video stored? On the camera, on a recorder in the building, in the cloud, or a combination, which decides what happens when the internet drops.</>,
                <>How is retention set? Per camera in days or storage, per recorder model, or per license edition, which decides whether one camera can be kept longer than its neighbor.</>,
                <>Which analytics are included and which are licensed on top? Every vendor names AI features; fewer say which license tier or camera model each one needs.</>,
                <>Are doors, alarms and sensors part of the product? Several vendors sell access control and alarm monitoring alongside video, the right purchase for some buyers and a duplicate for others.</>,
              ]} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Camzify</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Camzify is a cloud VMS that runs on the IP cameras a site already owns, with 23 detection models and scheduled virtual patrol rounds built into the same console. It sells no hardware, has no access control, alarm panel or monitoring center, and its native mobile apps are still on the roadmap.
                </p>
              </div>
              <PointList items={[
                <>Cameras: bring your own. Any ONVIF or RTSP camera connects over RTSP, RTMP or HTTPS, and a camera on a private network is relayed by the Camzify Connector without port forwarding. No hardware is sold.</>,
                <>Storage and retention: cloud only, encrypted in transit and at rest. Recording runs continuously or on a schedule, and retention is set per camera by days or by storage cap.</>,
                <>Analytics: 23 detection models that fire on confirmed object tracks, plus virtual patrolling, a scheduled round that checks a list at each camera and files a compliance report. PDPA, GDPR, SOC 2 Type II and ISO 27001 work is in progress; none is held.</>,
                <>Pricing as its own pages state it: per instance per month, from $5 per camera per month for a stream instance with motion and camera tampering detection included. Every other rate is quoted per site.</>,
              ]} />
              <p className="mt-4 max-w-prose text-muted-foreground">
                Fits best when a site is keeping its cameras and wants detections and a verified patrol round with a written record, not when doors, alarms or a staffed monitoring service are part of the purchase.
              </p>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Eagle Eye Networks</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Eagle Eye Networks sells the Eagle Eye Cloud VMS, a Video API Platform, and its own bridges, CMVRs, cameras and sensors; its home page states that Brivo and Eagle Eye Networks have merged, and several een.com product pages now load on brivo.com. The VMS page describes managing video, access, visitors, intrusion detection and monitoring in one interface through the Brivo Security Suite.
                </p>
              </div>
              <PointList items={[
                <>Cameras: either. The home page says to use your existing cameras and that the system works with more than 7,500 of them, digital IP, analog and HD over coax included, and Eagle Eye also sells its own. Cameras connect through an on-premise Bridge or CMVR, or, for factory-configured Eagle Eye cameras and recent models from Axis and others, directly to the cloud through Camera Direct.</>,
                <>Storage and retention: the VMS page says video can be stored in the cloud, on premise, or both, and bridges buffer on premise for bandwidth management. The editions page lists a 30-day retention option on Standard and a 90-day option on Professional.</>,
                <>Analytics: Gun Detection, Face Match, License Plate Recognition, Precision Person and Vehicle Detection, Smart Video Search with natural language, and point-of-sale integration are named.</>,
                <>Pricing as its own pages state it: no figure appears on any page checked. The editions page says to contact its sales team to learn more about pricing and features.</>,
              ]} />
              <p className="mt-4 max-w-prose text-muted-foreground">
                Fits best when a mixed camera estate, analog included, reaches the cloud through an on-site bridge and doors and intrusion detection belong in the same interface as video.
              </p>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Verkada</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Verkada sells its own cameras, access control, alarms, air quality sensors and intercoms, all managed in Command, which its site describes as one platform for physical security. Video, doors, alarms and sensors are all Verkada devices under one login.
                </p>
              </div>
              <PointList items={[
                <>Cameras: Verkada&apos;s own by default. The Command Connector bridges non-Verkada cameras to Command in three models, from 10 channels at 5MP up to 50; the page notes limited support for those cameras: streams are not recorded during a network failure and analytics may run with higher latency.</>,
                <>Storage and retention: the cameras page says all Verkada cameras include guaranteed onboard storage, with data processed and stored both on the camera and in the cloud, and onboard storage ranging from 30 to 365 days. Retention for connected third-party cameras is not described on the pages checked.</>,
                <>Analytics: AI-powered search including face search and reverse image search, alerts for line crossing, motion and camera tampering, operational analytics such as wait times, a unified timeline for people and vehicles, and AI-generated talk-down messages.</>,
                <>Pricing as its own pages state it: the pricing page lists MSRP hardware prices per device and notes that an additional license is required, with a Get quote form and a pricing catalog to download. License prices for most devices are not shown on that page.</>,
              ]} />
              <p className="mt-4 max-w-prose text-muted-foreground">
                Fits best when an organization is replacing its cameras and wants doors, alarms, sensors and intercoms from the same vendor, less well when the installed cameras are meant to stay.
              </p>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Rhombus</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Rhombus sells smart cameras, access control, sensors and alarm monitoring with live agents, managed from the Rhombus Console, which its site says scales to unlimited cameras, doors, users and locations. The alarm monitoring page describes 24/7 live monitoring across cameras, sensors and access control with certified agents and verified dispatch.
                </p>
              </div>
              <PointList items={[
                <>Cameras: Rhombus&apos;s own by default. The Relay Core N100 ingests third-party cameras over ONVIF where supported and RTSP, with up to 40 days of storage per camera on its own drive, and gives them remote access, AI insights and centralized management.</>,
                <>Storage and retention: the pricing page says the cameras store all of the video locally on the cameras, with storage days varying by model from 20 to 90 at default settings. The license comparison shows 30-day cloud archiving included with Enterprise and available for purchase with Professional.</>,
                <>Analytics: AI video search with natural language, face recognition, license plate recognition, occupancy insights, heat mapping, automated audio and visual deterrence, and environmental monitoring for air quality, smoke and vape.</>,
                <>Pricing as its own pages state it: the pricing page lists camera prices per model, a Professional license at $149 per camera per year and Enterprise from $149 to $649 by camera type, with 1, 3, 5 or 10 year terms, and says to contact a reseller or the sales team for a custom quote.</>,
              ]} />
              <p className="mt-4 max-w-prose text-muted-foreground">
                Fits best when new cameras with onboard storage are wanted and doors, sensors and a staffed alarm monitoring service should come from the same account.
              </p>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Solink</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Solink sells an AI Cloud VMS, AI Agents, AI Video Alarms and an AI Command Center under what it calls a vision intelligence platform, and names retail, convenience, grocery, restaurants, cannabis, auto service, property management, hospitality, warehouses and financial institutions as its markets. Its distinguishing claim is pairing video with business data through 375 or more integrations, from point of sale to access control.
                </p>
              </div>
              <PointList items={[
                <>Cameras: bring your own. The compatibility page says Solink supports more than 30,000 models across 270 brands, DVR and NVR units included, and the VMS page calls it hardware-agnostic. Whether a Solink device is installed on site is not described on the pages checked.</>,
                <>Storage and retention: the VMS page describes cloud storage with short- and long-term full camera backups and retrieval at multiple resolutions. How retention is configured is not described on the pages checked.</>,
                <>Analytics: AI-searchable footage, person and vehicle activity, occupancy and dwell time, exception-based reporting against transactions, and AI Video Alarms with arm and disarm schedules and optional professional monitoring by live operators.</>,
                <>Pricing as its own pages state it: the pricing page shows no figure and says pricing is customized to suit your business needs, with a form to book a meeting with a Solink specialist.</>,
              ]} />
              <p className="mt-4 max-w-prose text-muted-foreground">
                Fits best when a restaurant or retail operator is keeping its cameras and wants video matched to point-of-sale and other business data rather than a security-only view.
              </p>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Spot AI</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Spot AI sells IP cameras, an Intelligent Video Recorder with on-device AI processing, a cloud dashboard, and a set of AI agents it names AI Security Guard, AI Operations Assistant and AI Safety Manager, plus Iris, a conversational agent that answers plain-language questions about the cameras. The recorder keeps full-resolution footage on site and sends metadata and selected clips to the cloud.
                </p>
              </div>
              <PointList items={[
                <>Cameras: either. The home page offers cameras at no cost or lets you keep your current cameras, and the product page says the system is camera-agnostic and runs on virtually any ONVIF-compliant IP camera across more than 100 brands.</>,
                <>Storage and retention: the Intelligent Video Recorder provides 24/7 local storage, with unlimited cloud backup of your most important clips and only metadata sent to the cloud. Retention periods are not described on the pages checked.</>,
                <>Analytics: more than 15 pre-trained AI agents across security, operations and safety, detecting suspicious activity, vehicle break-ins and hazards, with real-time alerting, automated responses and scorecards.</>,
                <>Pricing as its own pages state it: no figure appears on any page checked. The camera system guide&apos;s Check pricing link leads to a contact page for custom pricing and trial information.</>,
              ]} />
              <p className="mt-4 max-w-prose text-muted-foreground">
                Fits best when a site wants local recording on a supplied device with AI agents on top and cameras either kept or replaced at no charge; doors and alarms are not described on the pages checked.
              </p>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Coram AI</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Coram AI sells what its home page calls a unified physical security platform: a video management system, an access control system, an emergency management system with a panic button and reunification, and guest management, built around Coram Point, an AI NVR. It also lists its own cameras and mobile surveillance units.
                </p>
              </div>
              <PointList items={[
                <>Cameras: either. The site says it works with any IP camera with no rip and replace, and the pricing page offers free 5MP NDAA-compliant cameras to customers who have none. Every camera records through a Coram Point purchased upfront.</>,
                <>Storage and retention: the NVR page says video is stored locally on the Coram Point and accessed through the cloud, with storage from 30 up to 365 days depending on model; the camera system page adds an unlimited cloud archive.</>,
                <>Analytics: AI Search, Journey tracking, facial recognition, license plate detection, gun detection, tailgating, people counting, line crossing and productivity alerts. Access control pairs every door event with video.</>,
                <>Pricing as its own pages state it: a per-camera video license with 1, 3, 5 or 10 year terms plus the Coram Point bought upfront, no figure shown, and an instant quote form; the FAQ says price depends on locations, camera type and days of storage.</>,
              ]} />
              <p className="mt-4 max-w-prose text-muted-foreground">
                Fits best when a site wants an on-premise recorder it owns, cloud access to it, and doors and emergency alerts in the same product, less well when nothing may be installed on site.
              </p>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Avigilon Alta</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Avigilon sells two lines: Alta, its cloud security suite of Alta Video, Alta Access, Alta Protect, Alta Mailroom and Alta Visitor, and Unity, its on-premise video and access control line, alongside more than 100 camera models and HALO smart sensors. Alta Video is described as serverless by design.
                </p>
              </div>
              <PointList items={[
                <>Cameras: either. Avigilon sells its own camera portfolio, and Alta Cloud Connectors bring existing third-party cameras into Alta Video, in a workstation for up to 75 cameras or a rack server for up to 200. Protocols for connected cameras are not named on the pages checked.</>,
                <>Storage and retention: not described on the pages checked. The Alta pages describe a serverless design and connector hardware but not where video is kept or how retention is set.</>,
                <>Analytics: Appearance Search, unusual motion detection, facial recognition, license plate recognition, crowd and object detection and PPE detection, an AI timeline of motion, people and vehicles, and actions such as auto-locking doors for watchlisted faces through Alta Access.</>,
                <>Pricing as its own pages state it: no figure appears on any page checked. The how-to-buy page directs to a free quote or a partner, and the Unity page names Core, Standard and Enterprise subscription plans without prices.</>,
              ]} />
              <p className="mt-4 max-w-prose text-muted-foreground">
                Fits best when an organization already runs Avigilon or Motorola equipment, buys through an integrator, and wants cloud video, access control and sensors from one vendor.
              </p>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Side by side</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  The same six rows for every platform, in the vendor&apos;s own terms. &quot;Not described&quot; means the pages checked do not say, not that the product lacks it.
                </p>
              </div>
              {/*
               * Nine columns overflow on any viewport narrower than a wide desktop and the
               * table only scrolls horizontally, so the eight platforms are split across two
               * tables with Camzify repeated in both as the fixed point of comparison.
               */}
              <div className="mt-6">
                <ComparisonTable
                  columns={['Aspect', 'Camzify', 'Eagle Eye', 'Verkada', 'Rhombus']}
                  rows={[
                    { feature: 'Cameras', values: ['Bring your own, ONVIF or RTSP', 'Own or existing, via bridge or Camera Direct', 'Own; third-party via Command Connector', 'Own; third-party via Relay Core N100'] },
                    { feature: 'Storage location', values: ['Cloud', 'Cloud, on premise, or both', 'On camera and in cloud', 'On camera; cloud archiving by license'] },
                    { feature: 'Retention control', values: ['Per camera, days or storage cap', 'By edition: 30 or 90 day options', 'Onboard 30 to 365 days by model', 'By camera model, 20 to 90 days'] },
                    { feature: 'Analytics', values: ['23 detections plus virtual patrolling', 'Gun, face, plates, person and vehicle, search', 'Search, face search, alerts, operational analytics', 'Search, face, plates, occupancy, deterrence'] },
                    { feature: 'Doors, alarms, sensors', values: ['None', 'Brivo access, intrusion and sensors', 'Own access, alarms, sensors, intercom', 'Own access, sensors, alarm monitoring'] },
                    { feature: 'Pricing as published', values: ['From $5 per camera per month', 'No figure; contact sales', 'Hardware MSRPs; license extra', 'Camera prices; license per camera per year'] },
                  ]}
                />
              </div>
              <div className="mt-6">
                <ComparisonTable
                  columns={['Aspect', 'Camzify', 'Solink', 'Spot AI', 'Coram AI', 'Avigilon Alta']}
                  rows={[
                    { feature: 'Cameras', values: ['Bring your own, ONVIF or RTSP', 'Bring your own, 30,000+ models listed', 'Own at no cost, or any ONVIF camera', 'Any IP camera, or free cameras, via Coram Point', 'Own; third-party via Cloud Connector'] },
                    { feature: 'Storage location', values: ['Cloud', 'Cloud', 'On recorder; clips backed up to cloud', 'On Coram Point; cloud archive', 'Not described on pages checked'] },
                    { feature: 'Retention control', values: ['Per camera, days or storage cap', 'Not described on pages checked', 'Not described on pages checked', 'By recorder model, 30 to 365 days', 'Not described on pages checked'] },
                    { feature: 'Analytics', values: ['23 detections plus virtual patrolling', 'Search, activity, occupancy, exception reporting, video alarms', '15+ AI agents, Iris plain-language questions', 'Search, face, plates, gun, tailgating, counting', 'Appearance Search, face, plates, PPE, unusual motion'] },
                    { feature: 'Doors, alarms, sensors', values: ['None', 'Integrations; video alarms with optional monitoring', 'Not described on pages checked', 'Own access control, panic button', 'Alta Access, HALO sensors, Alta Protect'] },
                    { feature: 'Pricing as published', values: ['From $5 per camera per month', 'No figure; pricing customized, book a meeting', 'No figure; contact for custom pricing', 'No figure; per-camera license, quote form', 'No figure; quote or partner'] },
                  ]}
                />
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Which one for which buyer</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  The right platform follows from the situation, not the feature count. Each line below rests on the vendor sections above.
                </p>
              </div>
              <PointList items={[
                <>Replacing the cameras and buying doors, alarms and sensors at the same time: Verkada and Rhombus sell every part under one account, and Rhombus adds a staffed alarm monitoring service.</>,
                <>Keeping the cameras and wanting detections plus a scheduled patrol round with a compliance record: Camzify, the one platform here whose pages describe a checklist-based round.</>,
                <>A restaurant or retail chain that wants video tied to point-of-sale and labor data: Solink, whose pages are built around business-data integrations on existing cameras.</>,
                <>A mixed estate with analog cameras that must reach the cloud through an on-site bridge, with access control in the same interface: Eagle Eye Networks with the Brivo suite.</>,
                <>A site that wants a recorder it owns on premises, cloud access to it, and no camera purchase: Coram AI, and Spot AI where AI agents on a supplied recorder matter more than doors.</>,
                <>An organization with an existing Avigilon or Motorola estate buying through an integrator: Avigilon Alta, with Unity for the sites that must stay on premise.</>,
                <>A site that cannot carry its cameras upstream: not a cloud-only option; Coram AI, Spot AI, Rhombus and Verkada each keep a local copy on a recorder or camera.</>,
              ]} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Sources, checked 18 September 2026</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Every statement about a vendor on this page comes from one of these pages on that vendor&apos;s own site, read on the date above. Vendors change their pages; if a claim here no longer matches, the page below is the authority. Camzify&apos;s own facts come from its platform page and llms.txt.
              </p>
              <div className="mt-6 max-w-prose space-y-6">
                {sources.map((group) => (
                  <div key={group.vendor}>
                    <h3 className="font-display text-base font-bold">{group.vendor}</h3>
                    <ul className="mt-2 space-y-2 text-muted-foreground">
                      {group.pages.map((s) => (
                        <li key={s.href} className="flex gap-3">
                          <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          {s.href.startsWith('/') ? (
                            <Link href={s.href} className="text-primary hover:underline">{s.label}</Link>
                          ) : (
                            <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{s.label}</a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-20 rounded-xl bg-card p-8 shadow">
            <h2 className="font-display text-xl font-bold">Related guides</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/guides/what-is-a-cloud-vms" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">What Is a Cloud VMS?</Link>
              <Link href="/guides/what-is-a-video-management-system" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">What Is a VMS?</Link>
              <Link href="/guides/cloud-vms-cost" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Cloud VMS Cost</Link>
              <Link href="/guides/using-existing-cameras-with-a-cloud-vms" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Using Existing Cameras With a Cloud VMS</Link>
            </div>
            <p className="mt-6 max-w-prose text-sm text-muted-foreground">
              For a one-to-one comparison of Camzify against any of the seven, each with its own sources, see the{' '}
              <Link href="/compare" className="text-primary hover:underline">comparisons</Link>.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/pricing" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow transition-colors hover:bg-primary/90">View pricing</Link>
              <Link href="/book-a-demo" className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted">Book a demo</Link>
            </div>
          </section>
        </div>
      </article>
      <FaqSection items={faqs} />
    </PageShell>
  );
}
