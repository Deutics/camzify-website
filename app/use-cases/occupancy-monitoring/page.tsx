import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { UseCasePage, type UseCaseContent } from '@/components/content/use-case-page';
import { HeroPlaceholder } from '@/components/content/hero-placeholder';
import Link from 'next/link';

const pageMeta = {
  title: "Occupancy Monitoring From Existing Cameras",
  description: "Occupancy monitoring from the cameras you own: live counts per zone from confirmed tracks, peak-hour trends for staffing, unusual patterns flagged.",
  path: "/use-cases/occupancy-monitoring",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'How is occupancy counted?', answer: 'From confirmed subject tracks. Multi-object tracking follows each person in the camera view, and the counts are aggregated per camera or zone continuously, giving a live figure and a trend over time. There is no turnstile, sensor or beam involved.' },
  { question: 'How accurate is it in a crowd?', answer: 'The count holds up in moderately busy areas because it is built on tracks rather than on motion. In very dense crowds individual tracks are harder to separate, so at extreme density the figure is best read as a reliable trend rather than an exact headcount. We say that on the feature page too.' },
  { question: 'What is a heatmap anomaly?', answer: 'A departure from the normal pattern of activity in a zone: a corridor that is usually empty at 2pm and is not, a queue forming where none forms. Heatmap anomalies learns the usual pattern per zone and flags the unusual one, with a notification window so a known busy period does not notify.' },
  { question: 'Can I compare zones and sites?', answer: 'Yes. Occupancy is tracked per camera or zone, so trends compare zone by zone within a site and roll up across a multi-site account. A chain reads peak hours per branch in one place.' },
  { question: 'Is this a people-counting product?', answer: 'It is a use of the tracking that already runs for security. If the account has cameras on the floor for intrusion or patrol rounds, occupancy and peak hours come from the same feeds at no additional hardware. It is not built as a dedicated retail-analytics product and does not claim the precision of one.' },
  { question: 'Does it identify anyone?', answer: 'No. It counts tracks. Attribute extraction, a separate detection, can describe a person\'s clothing and carried objects; nothing on the platform recognizes faces or names anyone.' },
];

const content: UseCaseContent = {
  eyebrow: 'Use case · Operations',
  title: 'Occupancy monitoring',
  lede: <>
    <strong className="font-semibold text-foreground">Occupancy monitoring is a live count of people per area, and a record of how that count moves through the day and the week, taken from the cameras already on the floor.</strong>{' '}
    It answers when a place is busiest and where, which decides staffing, cleaning and restocking windows and space planning. Camzify counts confirmed tracks per camera or zone, keeps the trend, and flags a pattern that departs from the usual one.
  </>,
  facts: ['Counts from confirmed tracks, per zone', 'Peak hours per zone and per site', 'No counting hardware'],
  heroVisual: <HeroPlaceholder label="Occupancy · Four zones, live" alt="A console camera wall of four cameras covering an entrance, a corridor, a back-of-house area and a car park, each labelled as a counted zone" frames={[{ src: '/cam-06.jpg', id: 'ZONE A · ENTRANCE', loc: 'LIVE COUNT' }, { src: '/cam-03.jpg', id: 'ZONE B · CORRIDOR', loc: 'LIVE COUNT' }, { src: '/cam-02.jpg', id: 'ZONE C · BACK OF HOUSE', loc: 'LIVE COUNT' }, { src: '/cam-04.jpg', id: 'ZONE D · CAR PARK', loc: 'LIVE COUNT' }]} active={0} />,
  secondary: { href: '/ai-features/occupancy-and-peak-hour-trends', label: 'Occupancy and peak hour trends' },
  problem: {
    heading: 'Staffing is planned from a guess',
    paras: [
      'When is the floor busiest? The answer is usually a manager\'s impression, refreshed once a year by a clipboard count on a day that was not typical. Rosters, cleaning windows and restocking are planned from it, and the cost of getting it wrong shows up as queues at one hour and idle staff at another.',
      'The cameras over the floor have been counting the whole time. They were installed for security, and nobody asked them the operational question.',
    ],
    visual: 'compliance',
    caption: 'A week of counts per zone, read as a trend. The peaks are what the roster is built around.',
    alt: 'A weekly overview with per-round figures, read here as an occupancy trend',
  },
  handles: {
    heading: 'Counted from the tracking that already runs',
    paras: [
      <><Link href="/ai-features/occupancy-and-peak-hour-trends" className="text-primary hover:underline">Occupancy and peak hour trends</Link> aggregates confirmed subject counts from <Link href="/ai-features/multi-object-tracking" className="text-primary hover:underline">multi-object tracking</Link> per camera or zone, continuously, into a live figure and a history. The busiest hours and the busiest zones fall out of the history, and the comparison runs zone by zone within a site or across a multi-site account. The cameras are the ones already on the floor for security; there is no counting hardware.</>,
      <><Link href="/ai-features/heatmap-anomalies" className="text-primary hover:underline">Heatmap anomalies</Link> covers the other side of the same data: it learns the usual pattern of activity per zone and flags a departure from it, a crowd where none forms, a corridor busy when it should be empty. A notification window on the camera keeps a known busy period from notifying. The <Link href="/platform/analytics-and-reporting" className="text-primary hover:underline">analytics</Link> pages hold the trends and export them.</>,
    ],
    detections: [
      { href: '/ai-features/occupancy-and-peak-hour-trends', name: 'Occupancy and peak hour trends', role: 'Live counts per camera or zone from confirmed tracks, and the trend over time.' },
      { href: '/ai-features/heatmap-anomalies', name: 'Heatmap anomalies', role: 'A departure from the usual pattern of activity in a zone, flagged with a notification window.' },
      { href: '/ai-features/multi-object-tracking', name: 'Multi-object tracking', role: 'The tracks the count is built on. A person is counted once, not once per frame.' },
      { href: '/ai-features/cross-camera-journey-map', name: 'Cross-camera journey map', role: 'How people move between zones on a site, linked across cameras.' },
    ],
  },
  round: {
    heading: 'Where the round fits',
    label: 'CAM 01 · Entrance',
    guard: 'Duty manager',
    items: [['Queue within marked area', 'ok'], ['Entrance not congested', 'fail'], ['Fire exit clear', 'ok'], ['Staff present at desk', 'ok']],
    caption: 'A peak-hour stop with the entrance found congested. The duty manager gets the frame; the trend explains why.',
    paras: [
      'Occupancy is continuous and does not need a round. The round adds the conditions a count does not capture: the queue inside its marked area, the entrance not congested, the exit clear when the floor is full. Run at the known peaks, it records the site as it was at its busiest, with frames, which is what a safety review asks for.',
      <>On an <Link href="/virtual-patrolling/automated-patrol-scheduling" className="text-primary hover:underline">automated round</Link>, the AI also raises a critical notification for a safety risk it sees, a blocked exit on a full floor for instance, whether or not the checklist asked.</>,
    ],
  },
  limits: {
    heading: 'What it will not do',
    paras: [
      'It will not give an exact headcount in a dense crowd; it gives a reliable trend. It will not identify or profile anyone. It will not count an area without a camera on it or with a camera pointed at the ceiling. And it is not a dedicated retail-analytics product with dwell-time funnels and conversion figures; it is what the security cameras can tell you about occupancy, honestly labelled.',
      <>We do not publish count accuracy figures. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> sets out why.</>,
    ],
  },
  industries: [
    { href: '/industries/retail', name: 'Retail' },
    { href: '/industries/restaurants', name: 'Restaurants' },
    { href: '/industries/education-facilities', name: 'Education facilities' },
    { href: '/industries/healthcare', name: 'Healthcare' },
  ],
  faqs,
};

export default function OccupancyMonitoringPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "Occupancy Monitoring", description: pageMeta.description, path: pageMeta.path })]} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Occupancy Monitoring' },
    ]}>
      <UseCasePage c={content} />
    </PageShell>
  );
}
