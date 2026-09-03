import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { UseCasePage, type UseCaseContent } from '@/components/content/use-case-page';
import { HeroPlaceholder } from '@/components/content/hero-placeholder';
import Link from 'next/link';

const pageMeta = {
  title: "Lock-Up and Closing Checks on Cameras",
  description: "Lock-up verification without driving back: a closing round on the cameras checks doors, shutters and lights, keeps a frame per item, and files the report.",
  path: "/use-cases/lock-up-and-closing-checks",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'Who runs the closing round?', answer: 'Either the closing manager, as a manual round from the console before leaving, or the platform, as an automated round scheduled for a set time after closing. Many sites run both: the manager\'s round at closing and an automated one an hour later that confirms nothing has changed.' },
  { question: 'What can a closing checklist ask?', answer: 'Anything visible in the frame: door closed, shutter down, lights off, safe closed, till drawer open and empty, stockroom door shut, back door secured, nobody inside. Each item is judged from the camera and the frame is kept, so "shutter down" is a picture of the shutter down, not a tick.' },
  { question: 'What happens when something fails?', answer: 'The item is marked Not Compliant with the frame, and the guard or keyholder designated for that camera is messaged with it. On an automated round that happens on its own. The item stays Pending until someone marks it Fixed, which captures the after frame, and the round cannot be closed with an item still Not Compliant.' },
  { question: 'Can I see that the round was done, not just that it passed?', answer: 'Yes. The report per round lists every stop, every item, the result, the frame and the time. A round that was not run is a missing report, and a schedule that fires and cannot reach the cameras logs the failure rather than skipping it.' },
  { question: 'Does this work across many branches?', answer: 'Each site has its own sequence, schedule and roster on one account, so a chain runs a closing round at every branch at its own closing time and the regional manager reads the reports in one place. A branch that failed an item shows as such on the compliance view.' },
  { question: 'Is a lights-off check really useful?', answer: 'It is the cheapest thing on the list and it is checked because the frame shows it. Lights left on are money; a shutter left up is a break-in. Putting both on the same round means the closing manager stops relying on memory and the business stops relying on the closing manager.' },
];

const content: UseCaseContent = {
  eyebrow: 'Use case · Closing time',
  title: 'Lock-up and closing checks',
  lede: <>
    <strong className="font-semibold text-foreground">Lock-up verification is confirmation that a site was left as it should be at closing: doors locked, shutters down, lights off, safe closed, nobody inside.</strong>{' '}
    It usually rests on the closing manager&apos;s memory and a phone call from the car. Camzify runs a closing round on the cameras, judges each item from the frame, messages the keyholder for anything wrong, and files the report the next morning starts with.
  </>,
  facts: ['A closing round, manual or scheduled', 'A frame per item, not a tick', 'Keyholder messaged for anything wrong'],
  heroVisual: <HeroPlaceholder label="Closing round · 22:10, all stops" alt="A console camera wall of four cameras covering a shopfront shutter, a back door, a stockroom and a car park at closing time" frames={[{ src: '/cam-06.jpg', id: 'CAM 01', loc: 'FRONT SHUTTER' }, { src: '/cam-02.jpg', id: 'CAM 04', loc: 'BACK DOOR' }, { src: '/cam-03.jpg', id: 'CAM 09', loc: 'STOCKROOM' }, { src: '/cam-04.jpg', id: 'CAM 02', loc: 'CAR PARK' }]} active={0} />,
  secondary: { href: '/virtual-patrolling/patrol-checklists', label: 'How checklists work' },
  problem: {
    heading: 'Did I lock the back door?',
    paras: [
      'Every closing manager has driven back. The end of a shift is the worst time to rely on memory, and the checklist on the clipboard is signed from habit. A shutter left up, a back door on the latch or a stockroom light burning all night is found by whoever opens up, and the answer to "who closed?" is a name, not a record.',
      'Across a chain the problem multiplies: forty branches, forty closing managers, forty phone calls a regional manager cannot make.',
    ],
    visual: 'schedule',
    caption: 'A patrol schedule: frequency, active hours and active days. A closing sequence runs once after the doors, at the time you set, on trading days.',
    alt: 'A patrol schedule with its frequency, active hours and active days',
  },
  handles: {
    heading: 'The closing round, from the console or on a schedule',
    paras: [
      <>A <Link href="/virtual-patrolling/patrol-sequences" className="text-primary hover:underline">closing sequence</Link> is the cameras that see the things that must be right at lock-up: front shutter, back door, stockroom, till area, safe, car park. The <Link href="/virtual-patrolling/patrol-checklists" className="text-primary hover:underline">checklist</Link> at each is the state it should be in, and each item is judged from the frame and kept with it. The closing manager can run it from the console before leaving, or the platform runs it <Link href="/virtual-patrolling/automated-patrol-scheduling" className="text-primary hover:underline">on schedule</Link> after the doors close, or both.</>,
      <>Anything wrong messages the keyholder designated for that camera with the frame, and the item stays Pending until it is marked Fixed with an after frame. The <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">report per round</Link> is what the opening manager and the regional manager read in the morning. Between the closing round and opening, <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">zone intrusion</Link> notifies on a tracked person inside during the hours you set.</>,
    ],
    detections: [
      { href: '/ai-features/zone-intrusion-detection', name: 'Zone intrusion detection', role: 'A tracked person inside after closing, notified during the hours you set on the camera.' },
      { href: '/ai-features/line-intrusion-detection', name: 'Line intrusion detection', role: 'A tripwire on the back door and the shutter line, watching between the closing round and opening.' },
      { href: '/ai-features/camera-tampering-detection', name: 'Camera tampering detection', role: 'A camera covered or turned before closing is caught before the night starts.' },
      { href: '/ai-features/abandoned-object-detection', name: 'Abandoned object detection', role: 'Stock or a bag left by the back door past the dwell time you set.' },
    ],
  },
  round: {
    heading: 'What a closing round checks',
    label: 'CAM 04 · Back door',
    guard: 'Keyholder',
    items: [['Back door closed and secured', 'ok'], ['Stockroom light off', 'fail'], ['Shutter fully down', 'ok'], ['Nobody inside', 'ok']],
    caption: 'The 22:10 round finds the stockroom light on. Frame to the keyholder; the rest of the stop passed.',
    paras: [
      'The closing sequence is short and the same every night, which is exactly what a person is bad at and a schedule is good at. Front shutter down, back door secured, safe closed, tills empty and open, lights off, nobody inside. The report per round is the record that the site was left right, with the frame for each item, and a chain reads every branch in one place.',
      <>A branch that fails an item shows on the <Link href="/virtual-patrolling/patrol-compliance-tracking" className="text-primary hover:underline">compliance view</Link> with the item and the frame, so the conversation the next day is about a picture rather than a recollection.</>,
    ],
  },
  limits: {
    heading: 'What it will not do',
    paras: [
      'It will not lock the door. It will not check a lock the camera cannot see, or confirm an alarm was set unless the panel is in view. It will not run without a connection to the cameras; a missed round is logged, not hidden. And it will not replace the closing manager; it replaces the drive back.',
      <>We do not publish figures for incidents prevented or hours saved. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> sets out the policy.</>,
    ],
  },
  industries: [
    { href: '/industries/retail', name: 'Retail' },
    { href: '/industries/restaurants', name: 'Restaurants' },
    { href: '/industries/education-facilities', name: 'Education facilities' },
    { href: '/industries/financial-services', name: 'Financial services' },
  ],
  faqs,
};

export default function LockUpAndClosingChecksPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "Lock-Up and Closing Checks", description: pageMeta.description, path: pageMeta.path })]} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Lock-Up and Closing Checks' },
    ]}>
      <UseCasePage c={content} />
    </PageShell>
  );
}
