import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { UseCasePage, type UseCaseContent } from '@/components/content/use-case-page';
import { ProductShot } from '@/components/content/product-shot';
import Link from 'next/link';

/**
 * An owner or operator with cameras bought at different times from different
 * installers has a recorder and a login per site. This page is live streaming in that
 * setting: every ONVIF or RTSP camera from every site on one wall, grouped by site,
 * with the Connector for the cameras that sit behind a router.
 */
const pageMeta = {
  title: "One Live Wall for Every Camera Brand and Site",
  description: "Cameras from any ONVIF or RTSP brand and every site on one live wall, grouped by site, instead of a login per recorder. Connector for local networks.",
  path: "/use-cases/one-live-wall-for-every-brand-and-location",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'Which camera brands can go on the wall?', answer: 'Any IP camera or recorder that speaks ONVIF or RTSP, which covers effectively every IP camera made in the last decade, whoever made it. RTMP from encoders and HLS or WebRTC streams connect as well. The supported cameras page lists manufacturers known to interoperate, and the guide to ONVIF and RTSP explains how to check a camera you already own.' },
  { question: 'Do I have to replace the recorders at each site?', answer: 'No. A camera reachable on the network connects to Camzify directly, and a recorder that publishes its cameras as RTSP streams can be the source instead. The recorder keeps recording locally as before. What changes is that the operator opens one wall rather than one app per site.' },
  { question: 'What about cameras behind a router with no public address?', answer: 'The Camzify Connector runs on a Windows, macOS or Linux machine on that local network, often an existing office PC, and makes an outbound connection to Camzify. No port is forwarded, no inbound rule is added and the cameras are never exposed to the internet. Pan, tilt and zoom control passes through it for cameras that have it.' },
  { question: 'How many cameras can one operator see at once?', answer: 'The grid paginates rather than shrinking every camera onto one screen, so each stream stays legible, and slideshow mode cycles through the pages on its own. Saved camera sets hold the cameras that are watched together, one set can be the default view, and the grid filters by site, by AI feature or by what a given sub-user can see.' },
  { question: 'Can a client or a guard see only their own site?', answer: 'Yes. A sub-user is scoped to specific sites through a permission group, and the live grid respects the same boundary as the rest of the account. A guard assigned to one store does not see the warehouse, and a client sees their own cameras and nobody else\'s.' },
  { question: 'What will it not do?', answer: 'It will not connect an analog camera that has no encoder or recorder to put it on the network, and it will not merge the recordings already sitting on old recorders; that history stays where it is. It will not make a poor link good: a camera that drops shows as no signal, and a site that goes offline is flagged as such. Patrol sequences belong to a site, so a round runs per site rather than across all of them at once.' },
];

const content: UseCaseContent = {
  eyebrow: 'Use case · Mixed brands, many sites',
  title: 'One live wall for every brand and location',
  lede: <>
    <strong className="font-semibold text-foreground">One live wall for every brand and location is a single live view of every camera an operator is responsible for, whatever make it is and whichever site it is at, in place of a separate login for each recorder.</strong>{' '}
    The cameras already speak a common language: ONVIF and RTSP are on effectively every IP camera and recorder sold in the last decade. Camzify puts them on one wall grouped by site, with a no-signal state that says which site has the problem, and reaches the cameras behind a router through the Connector.
  </>,
  facts: ['Any ONVIF or RTSP camera or recorder', 'Grouped by site, with an online count', 'Local networks through the Connector'],
  heroVisual: (
    <ProductShot
      src="/product-live-streaming"
      alt="The Camzify live streaming screen: a grid of camera feeds grouped by site, with the site strip and per-site online counts along the top and a no-signal tile for a dropped camera"
      label="Live streaming"
      priority
      sizes="(max-width: 1024px) 100vw, 45vw"
    />
  ),
  secondary: { href: '/platform/live-streaming', label: 'Live streaming' },
  problem: {
    heading: 'Five recorders, five logins, one operator',
    paras: [
      'An operator with several sites usually has cameras bought several times, from several installers, over several years. Each site has its own recorder, its own app, its own password and its own way of showing that a camera has dropped. Checking every site means logging in and out five times, and the sites that are slowest to open are the ones checked least.',
      'A security agency covering client sites has the same problem multiplied by clients. The control room carries a recorder login per site, and a guard who moves between sites carries them all. Nobody is watching the wall, because there is no wall; there are five windows.',
      'The fragmentation is not in the cameras. ONVIF and the international standard built on it exist so that devices from different manufacturers work with one client. What most sites lack is the client: one place that listens to all of them.',
    ],
    visual: 'sites',
    caption: 'Every site on one account with its camera count and online status. The one that is offline is shown offline, as a site, rather than as a set of frozen frames.',
    alt: 'A list of sites on one account with their camera counts and online status, one site flagged offline',
  },
  handles: {
    heading: 'One wall, grouped by site, whatever the brand',
    paras: [
      <><Link href="/platform/live-streaming" className="text-primary hover:underline">Live streaming</Link> puts every connected camera on one grid, grouped by site, with a per-site online count in the site strip.</>,
      { points: [
        <>A camera connects by ONVIF or RTSP directly, or through the <Link href="/camzify-connector" className="text-primary hover:underline">Camzify Connector</Link> when it sits on a local network with no public route, with no port forwarding and PTZ passed through.</>,
        'A recorder that publishes its cameras as RTSP streams can be the source, so the existing recorder stays and keeps its local copy.',
        'The grid paginates so each stream stays legible, slideshow mode cycles the pages, and saved camera sets hold the cameras watched together with one set as the default view.',
        'A dropped camera shows as no signal at once, never a frozen last frame, and a site that goes offline is flagged in the site strip and with a banner across the grid.',
        'The grid filters by site, by AI feature or by what a given sub-user is allowed to see.',
      ] },
      <><Link href="/platform/multi-site-management" className="text-primary hover:underline">Multi-site management</Link> keeps each site its own record, so the wall does not become one undifferentiated pile of cameras.</>,
      { points: [
        'Each site keeps its own cameras, patrol sequences, operators and event history, and the dashboard and reporting can roll every site into one account-wide view or pull one site on its own.',
        <>A sub-user is scoped to specific sites through a <Link href="/platform/permission-groups" className="text-primary hover:underline">permission group</Link>, so a client or a guard sees their own cameras and nobody else&apos;s.</>,
        <><Link href="/ai-features/camera-tampering-detection" className="text-primary hover:underline">Camera tampering detection</Link> raises a covered, turned or frozen camera to a person, so the wall does not depend on someone noticing a tile has changed.</>,
        <>The <Link href="/supported-cameras" className="text-primary hover:underline">supported cameras</Link> page lists manufacturers known to interoperate, and <Link href="/guides/onvif-and-rtsp-explained" className="text-primary hover:underline">ONVIF and RTSP explained</Link> covers how to check a camera you already own.</>,
      ] },
    ],
    detections: [
      { href: '/platform/live-streaming', name: 'Live streaming', role: 'Every camera on one grid grouped by site, paginated, with saved sets and a slideshow.' },
      { href: '/platform/multi-site-management', name: 'Multi-site management', role: 'A site is its own record with its own cameras, sequences and people, under one account.' },
      { href: '/ai-features/camera-tampering-detection', name: 'Camera tampering detection', role: 'A covered, turned, defocused or frozen camera at any site, raised to a person with the frame.' },
      { href: '/platform/permission-groups', name: 'Permission groups', role: 'Who sees which site. A client or a guard scoped to their own cameras on the same wall.' },
    ],
  },
  round: {
    heading: 'What a round checks at a site the operator is not at',
    label: 'CAM 12 · Store 3 · Loading bay',
    guard: 'Area manager',
    items: [['Roller door closed', 'ok'], ['Yard clear of vehicles', 'ok'], ['Camera view unobstructed', 'ok'], ['Rear gate locked', 'fail']],
    caption: 'Three sites, three rounds, one console. The gate at Store 3 is the only failure of the evening, and the area manager hears about that stop alone.',
    paras: [
      <>Once a camera is on the wall it is a stop like any other, whoever made it. Each site carries its own <Link href="/virtual-patrolling/patrol-sequences" className="text-primary hover:underline">patrol sequence</Link> through its doors, its yard and its own cameras, on its own <Link href="/virtual-patrolling/automated-patrol-scheduling" className="text-primary hover:underline">schedule</Link>, and one operator runs or reviews all of them from the same console.</>,
      <>A failed item captures the frame and messages the person designated for that camera at that site, and the report is filed per site, so a client with one store receives the round for that store and nothing else. The <Link href="/virtual-patrolling/for-multi-site-operations" className="text-primary hover:underline">multi-site operations page</Link> covers the setup, and <Link href="/guides/how-to-monitor-live-camera-feeds" className="text-primary hover:underline">how to monitor live camera feeds</Link> walks through building the wall.</>,
    ],
  },
  evidence: {
    heading: 'Why it matters, in published figures',
    lede: 'Figures from ONVIF, the IEC and NIST, linked to the page each comes from. None of them is a Camzify figure; we publish none.',
    items: [
      {
        figure: '35,000+',
        text: 'ONVIF conformant products as the organization entered 2026, "all capable of integrating into a single management platform, regardless of vendor, using common ONVIF profiles." Its first conformant products shipped in 2009.',
        source: { name: 'ONVIF, Building your security future with ONVIF conformant products (January 2026)', href: 'https://www.onvif.org/blog/2026/01/29/building-your-security-future-with-the-growing-ecosystem-of-onvif-conformant-products/' },
      },
      {
        figure: '7 profiles',
        text: 'Published ONVIF profiles as of 2026, from a membership of roughly 500 companies, with Profiles S and T covering video streaming, G recording and M metadata and events. ONVIF describes the aim as combining products "without vendor lock-in."',
        source: { name: 'ONVIF, ISC West 2026 press release', href: 'https://www.onvif.org/pressrelease/onvif-highlights-interoperability-at-isc-west-2026/' },
      },
      {
        figure: '2013',
        text: 'The year the IEC published 62676-2-3, the international standard for IP video interoperability based on Web services, which "makes it possible to build network video systems with devices and receivers from different manufacturers using common and well defined interfaces."',
        source: { name: 'IEC 62676-2-3:2013, IEC Webstore', href: 'https://webstore.iec.ch/en/publication/7351' },
      },
      {
        figure: 'Proprietary formats',
        text: 'NIST, at the FBI\'s request, on collecting video from many systems: "Current CCTV systems often output video in proprietary formats along with propriety software needed for viewing," which "adds an extra burden to the evidence collecting process."',
        source: { name: 'NIST IR 8161r1, CCTV Digital Video Export Profile (2019)', href: 'https://nvlpubs.nist.gov/nistpubs/ir/2019/NIST.IR.8161r1.pdf' },
      },
    ],
  },
  limits: {
    heading: 'What it will not do',
    paras: [
      'One wall changes what the operator sees; it does not change what the cameras can do.',
      { points: [
        'It will not connect an analog camera that has no encoder or recorder putting it on the network, and it will not connect a camera that speaks a proprietary protocol and nothing else.',
        'It will not merge the recordings already on old recorders. That history stays on the recorder; off-site recording in Camzify starts when backup is switched on.',
        'It will not make a poor link good. A camera that drops shows as no signal and a site that goes offline is flagged; the fix is at the site.',
        'It will not run one round across every site at once. A patrol sequence belongs to a site, and each site runs its own on its own schedule.',
      ] },
      <>We do not publish bandwidth per camera or a maximum wall size; the grid paginates. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> sets out why, and <Link href="/camera-connectivity" className="text-primary hover:underline">camera connectivity</Link> covers each protocol.</>,
    ],
  },
  industries: [
    { href: '/industries/multiple-sites', name: 'Multiple sites' },
    { href: '/industries/retail', name: 'Retail' },
    { href: '/industries/property-management', name: 'Property management' },
  ],
  faqs,
};

export default function OneLiveWallForEveryBrandAndLocationPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "One Live Wall for Every Brand and Location", description: pageMeta.description, path: pageMeta.path })]} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'One Live Wall for Every Brand and Location' },
    ]}>
      <UseCasePage c={content} />
    </PageShell>
  );
}
