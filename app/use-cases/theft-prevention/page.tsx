import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { UseCasePage, type UseCaseContent } from '@/components/content/use-case-page';
import Link from 'next/link';

const pageMeta = {
  title: "AI Theft Prevention | Zone Monitoring",
  description: "Theft prevention on existing cameras: stockrooms, cages and cash areas held to a schedule, entry outside it flagged with a snapshot and checked on the round.",
  path: "/use-cases/theft-prevention",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'Does it detect shoplifting?', answer: 'It does not detect the act of concealing merchandise, and we will not claim it does. What it detects is presence and movement against a rule: a person in the stockroom outside its hours, a person in the cage who did not come through the door, an object left where it should not be. For a retail floor that is awareness, not a shoplifting alarm.' },
  { question: 'How does it help with internal theft?', answer: 'Controlled areas carry schedules. The cash office, the stockroom and the high-value cage can each be a zone with hours, and entry outside those hours raises an alert with the snapshot. A patrol round checks those areas are clear on schedule and records it, which is a deterrent in itself once staff know the round exists and is recorded.' },
  { question: 'Can it follow a person across the store?', answer: 'Multi-object tracking follows a subject across frames on one camera, and the cross-camera journey map links appearances across cameras on the same site. Attribute extraction adds a description, clothing color, bag, direction of travel. None of it is facial recognition, and none of it identifies a named person.' },
  { question: 'What about the loading dock?', answer: 'The dock is where stock leaves, so most theft-prevention rounds include it. Dock doors closed outside the delivery window, no vehicle at the bay after hours, staging area clear. The loading dock monitoring page covers that part in detail.' },
  { question: 'Who gets the alert?', answer: 'The channels are set per alert category and the severity per camera per detection, so a zone alert in the cash office can be critical and reach the manager by SMS while a stockroom alert during trading hours is informational. A failed checklist item on a round messages the guard designated for that camera.' },
  { question: 'Is there something to show the loss-prevention team?', answer: 'Every detection is logged with camera, time and snapshot, and every round produces a report with the result of each item and its frame. When something is missing, AI suspect search takes a plain-language description and returns matching appearances across the indexed cameras and time window, which shortens the review considerably.' },
];

const content: UseCaseContent = {
  eyebrow: 'Use case · Stock and cash',
  title: 'AI theft prevention',
  lede: <>
    <strong className="font-semibold text-foreground">Theft prevention through video analytics means detecting unauthorized presence and movement in the areas where stock and cash are kept, while it is happening, rather than reviewing footage after the loss is counted.</strong>{' '}
    Camzify puts zone rules with hours on stockrooms, cages, cash offices and docks, flags entry outside them with a snapshot, and runs a patrol round that checks the controlled areas are clear and records it.
  </>,
  facts: ['Zones with hours on stock and cash areas', 'Entry outside hours flagged with a snapshot', 'Controlled areas checked on the round'],
  image: { src: '/ai-theft-detection.jpg', alt: 'A warehouse operator reviewing an alert on a tablet while a ceiling camera covers a caged storage area' },
  secondary: { href: '/ai-features/zone-intrusion-detection', label: 'Zone intrusion detection' },
  problem: {
    heading: 'Shrinkage is counted, not caught',
    paras: [
      'Stock goes missing and the stocktake finds out. The cameras over the stockroom recorded every entry for the last month and nobody has an hour to spare per camera to find the one that mattered. Loss prevention reviews footage after the count, identifies a pattern, and is too late for that pattern by definition.',
      'The areas that matter are few and well defined: the stockroom, the cage, the cash office, the dock. What they need is a rule about who should be there and when, and a record that the rule was checked.',
    ],
    visual: 'notification',
    caption: 'What reaches the guard when a controlled area fails its check: the camera, the message and the snapshot, logged to the round.',
    alt: 'A guard notification for a failed checklist item, with the message, the snapshot and an acknowledgement',
  },
  handles: {
    heading: 'Rules with hours on the places stock is kept',
    paras: [
      <><Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">Zone intrusion detection</Link> draws each controlled area on its camera and attaches the hours it is open. A tracked person inside the cage after its hours, or in the cash office at any hour it should be empty, raises an alert with the snapshot. <Link href="/ai-features/abandoned-object-detection" className="text-primary hover:underline">Abandoned object detection</Link> catches stock staged by a fire exit or a bag left in a corridor, which is how goods leave a building that has a guard on the front door.</>,
      <>A <Link href="/virtual-patrolling" className="text-primary hover:underline">patrol round</Link> checks the same areas on a schedule, clear, closed, nothing staged, and records each answer with a frame. When something does go missing, <Link href="/ai-features/forensic-video-search" className="text-primary hover:underline">AI suspect search</Link> takes a description in plain language and returns matching appearances across the cameras and the time window, instead of a week of scrubbing.</>,
    ],
    detections: [
      { href: '/ai-features/zone-intrusion-detection', name: 'Zone intrusion detection', role: 'Stockroom, cage and cash office as zones with hours. Presence outside them is the event.' },
      { href: '/ai-features/abandoned-object-detection', name: 'Abandoned object detection', role: 'Stock staged by an exit or a bag left in a corridor, raised while it is still there.' },
      { href: '/ai-features/forensic-video-search', name: 'AI suspect search', role: 'A plain-language description returns matching appearances across cameras. Not facial recognition.' },
      { href: '/ai-features/cross-camera-journey-map', name: 'Cross-camera journey map', role: 'Links one subject’s appearances across cameras on the site into a path.' },
    ],
  },
  round: {
    heading: 'What a stock-and-cash round checks',
    label: 'CAM 05 · Stockroom',
    guard: 'Ayesha M.',
    items: [['Stockroom empty after hours', 'ok'], ['Cage door locked', 'fail'], ['Cash office door closed', 'ok'], ['Nothing staged at the fire exit', 'ok']],
    caption: 'The closing round with the cage found unlocked. The guard gets the frame; the report shows before and after once it is fixed.',
    paras: [
      'A theft-prevention sequence is the cameras on the controlled areas in order, and the checklist is the state each should be in: empty, locked, closed, nothing staged. Run at closing and through the night, it produces a report per round that shows the controls held, and once staff know the round exists and is recorded, it changes behavior on its own.',
      <>Include the <Link href="/use-cases/loading-dock-monitoring" className="text-primary hover:underline">dock</Link> in the sequence. Stock leaves through it, and a dock door found up at 22:00 is a checklist failure with a snapshot rather than a discovery at the next count.</>,
    ],
  },
  limits: {
    heading: 'What it will not do',
    paras: [
      'It will not see concealment, and it will not identify people. It works on presence, movement and objects against rules you define, and describes what it saw; it does not recognize faces or name anyone. It will not cover an area without a camera on it. And it will not stop the person in the cage; it puts the snapshot in front of whoever you designate.',
      <>We do not publish shrinkage reductions or detection rates. Those depend on your store, your staff and your cameras, and the <Link href="/trust" className="text-primary hover:underline">trust page</Link> explains why we will not estimate them.</>,
    ],
  },
  industries: [
    { href: '/industries/retail', name: 'Retail' },
    { href: '/industries/warehouses', name: 'Warehouses' },
    { href: '/industries/self-storage', name: 'Self-storage' },
    { href: '/industries/manufacturing', name: 'Manufacturing' },
  ],
  faqs,
};

export default function TheftPreventionPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "AI Theft Prevention", description: pageMeta.description, path: pageMeta.path })]} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Theft Prevention' },
    ]}>
      <UseCasePage c={content} />
    </PageShell>
  );
}
