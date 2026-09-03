import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { UseCasePage, type UseCaseContent } from '@/components/content/use-case-page';
import Link from 'next/link';

const pageMeta = {
  title: "Loading Dock Security Monitoring",
  description: "Loading dock monitoring on the bay cameras: door status and staging areas checked against the delivery window, vehicles tracked at the bay, guard messaged.",
  path: "/use-cases/loading-dock-monitoring",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'Can it tell whether a dock door is open or closed?', answer: 'A checklist item on a patrol round asks exactly that, "dock door closed", and the AI judges it from the frame at each stop; on an automated round it can watch the scene for a short period first. Between rounds, a zone rule across the opening fires on a tracked person or vehicle passing through it when the door should be down.' },
  { question: 'Can monitoring differ between delivery hours and after hours?', answer: 'Yes. Zone and line rules carry schedules, and patrol sequences have active hours and active days. A dock can run light rules during the delivery window and strict ones outside it, with a separate after-hours sequence that checks every bay is down and every staging area is clear.' },
  { question: 'Does it read the truck’s number plate?', answer: 'No. Vehicles are tracked as objects: present, moving, at the bay, in the yard. There is no license plate recognition, and we say so on the vehicle monitoring page too. Illegal parking detection covers a vehicle stopped where it should not be for longer than it should.' },
  { question: 'What about forklifts and site vehicles?', answer: 'Wrong-way vehicle detection covers a vehicle moving against the defined direction of a lane, and zone rules can keep pedestrians and vehicles out of each other’s areas. PPE violation detection applies on docks where high-visibility clothing is mandatory. None of these replaces a traffic management plan; they enforce parts of one.' },
  { question: 'Who is notified when a bay is found open at night?', answer: 'The guard designated for that camera, on the configured channel, with the snapshot. On an automated round that happens on its own. The item stays Pending until someone marks it Fixed, which captures the after frame, and both appear in the round’s report.' },
  { question: 'Is there a record for the logistics manager?', answer: 'A report per round with every bay, every checklist result and the frame it was judged against, plus a compliance percentage. Detection events are logged with camera, time and snapshot. Both are exportable and neither is edited after the fact.' },
];

const content: UseCaseContent = {
  eyebrow: 'Use case · Docks and bays',
  title: 'Loading dock security monitoring',
  lede: <>
    <strong className="font-semibold text-foreground">Loading dock monitoring is the continuous verification of dock doors, staging areas and vehicle bays: doors closed when not in use, vehicles present only in their window, and staging areas clear.</strong>{' '}
    A dock combines stock, vehicle access and a door that opens forty times a day, which makes it the most common route for goods to leave a building. Camzify checks it on a round against the delivery schedule and tracks what arrives at the bay between rounds.
  </>,
  facts: ['Door status checked against the schedule', 'Vehicles tracked at the bay, not plates', 'Staging areas clear on the round'],
  image: { src: '/loading-dock-security.jpg', alt: 'Loading dock with cameras covering trucks, a forklift and dock doors' },
  secondary: { href: '/virtual-patrolling/patrol-checklists', label: 'How checklists work' },
  problem: {
    heading: 'The door that is open forty times a day',
    paras: [
      'A dock door left up overnight is an open wall. A vehicle at the bay outside the delivery window is either a mistake or a theft, and nobody on site can tell which from the office. Guards checking several docks on foot walk past a closed door and cannot see the one that was opened after they left.',
      'The dock cameras see all of it, in the middle of a stream of legitimate deliveries, forklifts and staff that makes motion-based alarms useless and manual review impractical.',
    ],
    visual: 'schedule',
    caption: 'The dock sequence runs light rules during the delivery window and strict ones after it. The window is the schedule.',
    alt: 'A patrol schedule with a delivery window and an after-hours sequence',
  },
  handles: {
    heading: 'Checked against the window, watched between checks',
    paras: [
      <>A <Link href="/virtual-patrolling" className="text-primary hover:underline">patrol round</Link> visits each bay camera on a schedule and answers the list: door down, staging area clear, no vehicle at the bay outside the window, no one in the yard. Each answer is recorded with the frame. On an automated round the AI can watch the scene for a short period, which is how a forklift passing through and a person loading a van are told apart.</>,
      <>Between rounds, <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">zone intrusion</Link> across the opening, with hours matching the delivery window, fires on a tracked person or vehicle passing through a door that should be down. <Link href="/ai-features/illegal-parking-detection" className="text-primary hover:underline">Illegal parking detection</Link> covers a vehicle stopped at the bay or in the yard longer than it should be, and <Link href="/ai-features/wrong-way-vehicle-detection" className="text-primary hover:underline">wrong-way vehicle detection</Link> a vehicle moving against the lane.</>,
    ],
    detections: [
      { href: '/ai-features/zone-intrusion-detection', name: 'Zone intrusion detection', role: 'The door opening and the staging area as zones, with the delivery window as their hours.' },
      { href: '/ai-features/illegal-parking-detection', name: 'Illegal parking detection', role: 'A vehicle stopped at the bay or in the yard beyond the time allowed.' },
      { href: '/ai-features/wrong-way-vehicle-detection', name: 'Wrong-way vehicle detection', role: 'A vehicle moving against the defined direction of the dock lane.' },
      { href: '/ai-features/ppe-violation-detection', name: 'PPE violation detection', role: 'High-visibility clothing on the dock where it is mandatory. A safety check on the same cameras.' },
    ],
  },
  round: {
    heading: 'What a dock round checks',
    label: 'CAM 04 · Dock bay 3',
    guard: 'Priya R.',
    items: [['Dock door down', 'fail'], ['No vehicle at the bay', 'ok'], ['Staging area clear', 'ok'], ['Yard gate closed', 'pending']],
    caption: 'Bay 3 found open after the window, the yard gate waiting on the guard. Both count against the round.',
    paras: [
      'A dock sequence is one stop per bay plus the yard and the gate, and its checklist is the state each should be in at that hour. During the delivery window the items are light; after it, every door should be down, every bay empty, every staging area clear. The after-hours sequence is usually the one that earns its keep.',
      <>The report per round shows each bay with its frame, and a door found up shows the before and after frames once it has been marked Fixed. The <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">reports page</Link> shows what one looks like.</>,
    ],
  },
  limits: {
    heading: 'What it will not do',
    paras: [
      'It will not read plates, so it cannot tell a scheduled carrier from an unscheduled one by registration; it can tell that a vehicle is at the bay outside the window. It will not count pallets or verify a manifest. It will not close the door; it tells the guard designated for that camera and keeps the frame.',
      <>We do not publish detection rates or how much shrinkage dock rounds prevent. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> sets out why.</>,
    ],
  },
  industries: [
    { href: '/industries/warehouses', name: 'Warehouses' },
    { href: '/industries/manufacturing', name: 'Manufacturing' },
    { href: '/industries/retail', name: 'Retail' },
    { href: '/industries/automotive', name: 'Automotive' },
  ],
  faqs,
};

export default function LoadingDockMonitoringPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "Loading Dock Security Monitoring", description: pageMeta.description, path: pageMeta.path })]} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Loading Dock Monitoring' },
    ]}>
      <UseCasePage c={content} />
    </PageShell>
  );
}
