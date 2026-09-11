import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { UseCasePage, type UseCaseContent } from '@/components/content/use-case-page';
import Link from 'next/link';

const pageMeta = {
  title: "Fire Exit and Escape Route Monitoring",
  description: "Blocked fire exits and escape routes found on every patrol round and caught between rounds by abandoned-object detection, on the cameras you own.",
  path: "/use-cases/fire-exit-and-escape-route-monitoring",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'Can a camera tell whether an exit door is locked?', answer: 'Not from the frame alone. A checklist item can ask whether a chain, a padlock, a wedge or a bar is visible on the door, and the guard answers from the picture, which catches the common cases. Whether the latch turns is a hand on the door, and the round does not replace the walk that checks it.' },
  { question: 'How does abandoned object detection tell a pallet from a delivery?', answer: 'By where it is and how long it stays. The detection starts a dwell timer when an object separates from the person who set it down, and fires when it is still there past the threshold set for that zone. An exit corridor gets a short threshold; a loading bay with a normal ten-minute stage gets a longer one or is excluded, so routine deliveries do not notify.' },
  { question: 'What does the report show an inspector?', answer: 'Each round, each exit, the answer to each item and the frame it was judged from, with the time. A month of rounds is a month of frames of every exit at every scheduled hour, and a failed item shows the snapshot, who was notified and the later round where it was cleared. It is a record of condition, not a certified inspection, and we say so.' },
  { question: 'How often should the exit round run?', answer: 'At shift change, at closing and through the night is the usual pattern, because those are the hours when stock is moved and nobody is watching the doors. Detection runs at all hours regardless; a schedule on a detection is a notification window, so a night-only rule still detects by day and notifies only at night.' },
  { question: 'Does it cover the exit stair and the outside of the door?', answer: 'Only where a camera has a view. An exit stair with a camera on each landing is on the round; one without is not. A yard camera that sees the outside of the door lets a checklist item ask whether a vehicle, a skip or a delivery is blocking the discharge, which is as often the problem as the inside.' },
  { question: 'What will it not do?', answer: 'It will not move the pallet, open the door or clear the route; it tells the person designated for that camera, with the frame, and the clearing is theirs. It is not a fire risk assessment, an inspection or a certified life-safety system. We do not publish detection rates or figures on how often a round finds a blocked exit, and the trust page explains why.' },
];

const content: UseCaseContent = {
  eyebrow: 'Use case · Warehouses, factories and back-of-house',
  title: 'Fire exit and escape route monitoring',
  lede: <>
    <strong className="font-semibold text-foreground">Fire exit and escape route monitoring is the routine check that every exit door, escape route and exit stair in a warehouse, a factory or a retail back-of-house is clear, unobstructed and visible, done from the cameras that already cover them and recorded with a frame each time.</strong>{' '}
    Exits get blocked by the ordinary work of the building: a pallet parked for an hour, a cage of returns, a delivery left inside the door. Camzify asks about each exit on every round, catches the object left in the route between rounds, and files the record.
  </>,
  facts: ['Every exit a checklist item on every round', 'The pallet left in the route caught between rounds', 'A frame of each exit at each time, filed'],
  image: { src: '/feature-abandoned-object-detection-1.webp', alt: 'The console live view on a tablet, a terminal concourse with a backpack left by the seating boxed and labeled Unattended Object Detected' },
  secondary: { href: '/ai-features/abandoned-object-detection', label: 'Abandoned object detection' },
  problem: {
    heading: 'Clear at the inspection, blocked by Tuesday',
    paras: [
      'Nobody blocks a fire exit on purpose. A pallet is set down in the aisle by the door because the racking is full; a roll cage of returns waits by the back door for a truck that is late; stock for a promotion is stacked in the corridor because it is the only floor space left. Each is temporary, and each is exactly what the exit route rule forbids.',
      'The annual inspection finds the exits clear because the building was tidied for it. The night that matters is a Tuesday in peak season, and the record of that night is a signature on a monthly sheet, if there is one at all.',
    ],
    visual: 'route',
    caption: 'A fire-exit sequence: the cameras covering every exit door and escape route, in walking order, each with its own checklist.',
    alt: 'A patrol route drawn across the cameras covering the exits, in order',
  },
  handles: {
    heading: 'The round asks. The detection watches in between.',
    paras: [
      <>A <Link href="/virtual-patrolling/patrol-checklists" className="text-primary hover:underline">patrol checklist</Link> puts each exit on the round as a question judged from the camera frame.</>,
      { points: [
        'The items are exit door clear, nothing within the marked route, exit sign visible, door closed on its closer and nothing against it outside.',
        'The answer is recorded with the frame at each stop, so the report shows the exit as it was at that time.',
        <>A failed item messages the person designated for that camera with the snapshot, through <Link href="/virtual-patrolling/guard-notifications" className="text-primary hover:underline">guard notifications</Link>, and the next round shows whether it was cleared.</>,
        <>On an <Link href="/virtual-patrolling/automated-patrol-scheduling" className="text-primary hover:underline">automated round</Link> the AI raises a critical notification for a <Link href="/virtual-patrolling/risk-detection" className="text-primary hover:underline">risk it sees</Link> that the checklist did not ask about.</>,
      ] },
      <><Link href="/ai-features/abandoned-object-detection" className="text-primary hover:underline">Abandoned object detection</Link> covers the hours between rounds.</>,
      { points: [
        'An object that separates from the person who set it down in the exit route and stays past the dwell time you set raises an alert with the frame.',
        'The dwell time is set per camera or zone, so a loading bay with a ten-minute stage and an exit corridor with a one-minute rule are tuned differently.',
        <><Link href="/ai-features/camera-tampering-detection" className="text-primary hover:underline">Camera tampering detection</Link> reports the exit camera that has been turned or covered, because an exit nobody can see is an exit nobody is checking.</>,
      ] },
    ],
    detections: [
      { href: '/ai-features/abandoned-object-detection', name: 'Abandoned object detection', role: 'A pallet, cage, box or bag left in an escape route past a dwell time you set, between rounds.' },
      { href: '/virtual-patrolling/risk-detection', name: 'Risk detection on the round', role: 'A blocked exit or a stacked corridor the AI sees at a stop, raised as a critical notification whether or not the checklist asked.' },
      { href: '/ai-features/camera-tampering-detection', name: 'Camera tampering detection', role: 'The exit camera that has been covered, turned or has failed, raised the same day.' },
      { href: '/ai-features/fire-and-smoke-detection', name: 'Fire and smoke detection', role: 'Visual flame and smoke on the same cameras, raised as a critical alert with a clip.' },
    ],
  },
  round: {
    heading: 'What a fire-exit round checks',
    label: 'CAM 07 · Exit door, west aisle',
    guard: 'Shift supervisor',
    items: [['Exit door clear inside', 'fail'], ['Escape route free of stock', 'ok'], ['Exit sign visible and lit', 'ok'], ['Door closed, nothing chained', 'ok']],
    caption: 'A pallet against the west exit door, found on the 22:00 round. Snapshot to the supervisor; the 23:00 round shows it moved.',
    paras: [
      'A fire-exit sequence is the cameras covering every exit door, escape route and exit stair in walking order, and the checklist at each stop is the state the exit route rule requires.',
      { points: [
        'The exit door is clear on both sides.',
        'The escape route is free of stock, equipment and cages.',
        'The exit sign is visible and lit.',
        'The door is closed on its closer, with no chain, wedge or padlock in view.',
      ] },
      <>Run it at shift change, at closing and through the night, and each <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">report</Link> is the record that every exit was clear at that hour, with the frame to prove it. <Link href="/virtual-patrolling/patrol-compliance-tracking" className="text-primary hover:underline">Compliance tracking</Link> shows the exits that fail most, which is where the storage plan needs changing. Flame and smoke on the same cameras are covered under <Link href="/use-cases/fire-and-smoke-monitoring" className="text-primary hover:underline">fire and smoke monitoring</Link>, and falls, exclusion zones and PPE under <Link href="/use-cases/workplace-safety-monitoring" className="text-primary hover:underline">workplace safety monitoring</Link>.</>,
    ],
  },
  evidence: {
    heading: 'What the rule says, and what a blocked exit costs',
    lede: 'The exit route standard as published by the US Government Publishing Office, and figures from NIST and the US Fire Administration.',
    items: [
      { figure: '29 CFR 1910.37(a)(3)', text: 'Exit routes must be free and unobstructed. No materials or equipment may be placed, either permanently or temporarily, within the exit route. That is OSHA\'s exit route standard as it stands in the 2024 Code of Federal Regulations.', source: { name: 'US Government Publishing Office, 29 CFR 1910.37 (2024)', href: 'https://www.govinfo.gov/app/details/CFR-2024-title29-vol5/CFR-2024-title29-vol5-sec1910-37' } },
      { figure: 'Two exit routes', text: 'At least two exit routes must be available in a workplace, located as far away as practical from each other so that if one exit route is blocked by fire or smoke, employees can evacuate using the second exit route (29 CFR 1910.36(b)(1)).', source: { name: 'US Government Publishing Office, 29 CFR 1910.36 (2024)', href: 'https://www.govinfo.gov/app/details/CFR-2024-title29-vol5/CFR-2024-title29-vol5-sec1910-36' } },
      { figure: '100 deaths', text: 'in The Station nightclub fire in West Warwick, Rhode Island, on February 20, 2003. NIST\'s technical investigation found smoke visible in the exit doorways in a little more than one minute, and flames through part of the roof in less than five.', source: { name: 'NIST, NCSTAR 2, Report of the Technical Investigation of The Station Nightclub Fire (2005)', href: 'https://www.nist.gov/publications/report-technical-investigation-station-nightclub-fire-nist-ncstar-2-volume-1' } },
      { figure: '110,000', text: 'nonresidential building fires in the United States in 2023, with 130 deaths, 1,200 injuries and $3.16 billion in dollar loss. Deaths in nonresidential building fires rose 70 percent over 2014 to 2023.', source: { name: 'US Fire Administration, Nonresidential Building Fire Estimates (2014-2023)', href: 'https://www.usfa.fema.gov/statistics/nonresidential-fires/' } },
    ],
  },
  limits: {
    heading: 'What it will not do',
    paras: [
      'The camera sees the exit; a person clears it.',
      { points: [
        'It will not open a door, move a pallet or clear a route; it tells the person designated for that camera, with the frame, and the clearing is theirs.',
        'It will not judge from the frame alone whether a door is locked; a checklist item can ask whether a chain, a wedge or a padlock is visible, which is not the same thing.',
        'It will not see an exit without a camera on it, or an exit stair beyond the door.',
        'It is not an inspection, a fire risk assessment or a certified life-safety system, and its report replaces none of them.',
      ] },
      <>We do not publish detection rates or figures on how often a round finds a blocked exit, because they depend on your cameras and your building. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> sets out the policy.</>,
    ],
  },
  industries: [
    { href: '/industries/warehouses', name: 'Warehouses' },
    { href: '/industries/manufacturing', name: 'Manufacturing' },
    { href: '/industries/retail', name: 'Retail' },
  ],
  faqs,
};

export default function FireExitAndEscapeRouteMonitoringPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "Fire Exit and Escape Route Monitoring", description: pageMeta.description, path: pageMeta.path })]} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Fire Exit and Escape Route Monitoring' },
    ]}>
      <UseCasePage c={content} />
    </PageShell>
  );
}
