import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { UseCasePage, type UseCaseContent } from '@/components/content/use-case-page';
import Link from 'next/link';

const pageMeta = {
  title: "After-Hours Security Monitoring",
  description: "After-hours monitoring without a night shift: scheduled rounds through the empty building, the guard messaged on a failed check, a report by morning.",
  path: "/use-cases/after-hours-monitoring",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'Can weeknights and weekends run different schedules?', answer: 'Yes. A patrol sequence has a frequency, active hours and active days, so a weeknight sequence can run from 7pm to 7am Monday to Friday and a separate weekend sequence can run around the clock with a different checklist. Specific dates can be marked as exceptions for holidays and closures.' },
  { question: 'What happens when a round finds something?', answer: 'The checklist item is marked Not Compliant, the frame is kept as a snapshot, and the guard designated for that camera is messaged on the configured channel with it. On an automated round that happens with nobody in the loop. The item stays Pending until it is marked Fixed, which captures the after frame, and both frames appear in the report.' },
  { question: 'Does this replace the night guard?', answer: 'It replaces the routine round, not the security function. Somebody still attends a broken window. What changes is that the walk through the building at 2am, the part that is expensive to staff and easy to skip, happens on schedule whether or not anyone is awake, and the guard is sent to the things that failed rather than walking past the things that did not.' },
  { question: 'What if nobody is on site to respond?', answer: 'Then the notification goes to whoever you designate: a mobile guard, a keyholder, a monitoring company. The round does not need anyone on site to run or to record. Many sites pair after-hours rounds with a security agency or monitoring company that receives the messages; both have their own pages here.' },
  { question: 'Is there a record in the morning?', answer: 'A report per round: every camera stop, every checklist result, the snapshot each was judged against, timestamps and a compliance percentage. A round that passed produces the report too, which is how you show that the building was checked at 23:00, 01:00, 03:00 and 05:00 and found in order.' },
  { question: 'Does the AI watch between rounds?', answer: 'If detections are enabled on those cameras, yes. Zone intrusion and line intrusion at entrances fire the moment a tracked person appears, independently of the round schedule, and each carries a notification window per camera so they notify after hours and stay quiet by day. Rounds give you the record; detections give you the event.' },
];

const content: UseCaseContent = {
  eyebrow: 'Use case · Off-hours',
  title: 'After-hours security monitoring',
  lede: <>
    <strong className="font-semibold text-foreground">After-hours monitoring is the surveillance and verification of a facility outside business hours: nights, weekends and holidays.</strong>{' '}
    It is the period when staffing is thinnest and when most incidents happen. Camzify covers it with scheduled patrol rounds that walk the cameras through the empty building on a checklist, message the guard when a check fails, and file a report per round so the morning starts with a record rather than a question.
  </>,
  facts: ['Rounds on a schedule, nobody in the loop', 'Checklist per camera, snapshot per item', 'A report per round by morning'],
  image: { src: '/after-hours-security-monitoring.jpg', alt: 'A security operations desk with monitors showing night camera feeds across a facility' },
  secondary: { href: '/virtual-patrolling/automated-patrol-scheduling', label: 'Automated patrol scheduling' },
  problem: {
    heading: 'Cameras record the night. Nobody watches it.',
    paras: [
      'Most sites cannot justify a guard through the night, so the building is left to cameras that record everything and flag nothing. The footage is reviewed after something is found broken or missing, which makes it useful for the insurance claim and useless for the night itself.',
      'Where there is a night guard, the round depends on one person doing the same walk on the fourth night as on the first, and there is no record of what they saw at each door beyond their own note. The round that gets skipped is never the one that mattered, until it is.',
    ],
    visual: 'schedule',
    caption: 'An after-hours sequence: every two hours, 19:00 to 07:00, weeknights. Weekends run their own.',
    alt: 'A patrol schedule set to every two hours during overnight active hours on weekdays',
  },
  handles: {
    heading: 'The round runs itself. The guard gets the failures.',
    paras: [
      <>An <Link href="/virtual-patrolling/automated-patrol-scheduling" className="text-primary hover:underline">automated patrol round</Link> works through the after-hours sequence at the frequency you set: entrance, corridors, stockroom, dock, plant room, back out to the car park. At each camera it checks the list, doors closed, areas empty, nothing left running, and records the answer with the frame. Where one frame is not enough it watches the scene for a short period before deciding.</>,
      <>A failed item messages the guard designated for that camera with the snapshot, and the AI raises a critical notification for a <Link href="/virtual-patrolling/risk-detection" className="text-primary hover:underline">risk it sees</Link> that the checklist did not ask about, a blocked exit, smoke, a person where none should be. Between rounds, <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">zone intrusion</Link> fires on a tracked person the moment they appear, and its notification window keeps it quiet during the day.</>,
    ],
    detections: [
      { href: '/ai-features/zone-intrusion-detection', name: 'Zone intrusion detection', role: 'Interior and exterior zones with an after-hours notification window. A tracked person after closing is the event.' },
      { href: '/ai-features/line-intrusion-detection', name: 'Line intrusion detection', role: 'Tripwires at entrances and the fence, with direction, watching between rounds.' },
      { href: '/ai-features/fire-and-smoke-detection', name: 'Fire and smoke detection', role: 'Visual signatures of flame and smoke on any camera. The other thing an empty building has to fear.' },
      { href: '/ai-features/camera-tampering-detection', name: 'Camera tampering detection', role: 'A camera covered or turned in the evening is caught before the night starts.' },
    ],
  },
  round: {
    heading: 'What an after-hours round checks',
    label: 'CAM 04 · Main entrance',
    guard: 'Priya R.',
    items: [['Main entrance locked', 'ok'], ['Reception empty', 'ok'], ['Stockroom door closed', 'fail'], ['Loading dock doors down', 'ok']],
    caption: 'The 01:00 round with the stockroom door found open. Guard messaged with the frame; the report will show before and after.',
    paras: [
      'The after-hours sequence is the cameras in the order a guard would walk them, and the checklist at each is the state the building should be in when nobody is there. Entrance locked. Reception empty. Stockroom door closed. Dock doors down. Plant room clear. The round produces a report that says each was true at each time it was checked, with the frame to prove it.',
      <>Use <Link href="/virtual-patrolling/patrol-checklists" className="text-primary hover:underline">checklists</Link> that describe conditions, not events, so a passing round is meaningful. The first round of the night is usually the <Link href="/use-cases/lock-up-and-closing-checks" className="text-primary hover:underline">closing round</Link>. A camera that sees an empty corridor is evidence; a camera that saw no motion is not.</>,
    ],
  },
  limits: {
    heading: 'What it will not do',
    paras: [
      'It will not attend. A round finds the stockroom door open and messages the guard; someone still has to close it, and the item stays Pending in the report until they do. It will not see a room without a camera, and it will not run the round if the site loses its internet connection; the failure is logged and the next scheduled round runs when the connection returns.',
      <>We do not publish uptime, response times or how many incidents rounds have caught, because we cannot verify those figures for your site. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> explains the policy.</>,
    ],
  },
  industries: [
    { href: '/industries/retail', name: 'Retail' },
    { href: '/industries/warehouses', name: 'Warehouses' },
    { href: '/industries/financial-services', name: 'Financial services' },
    { href: '/industries/education-facilities', name: 'Education facilities' },
  ],
  faqs,
};

export default function AfterHoursMonitoringPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "After-Hours Security Monitoring", description: pageMeta.description, path: pageMeta.path })]} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'After-Hours Monitoring' },
    ]}>
      <UseCasePage c={content} />
    </PageShell>
  );
}
