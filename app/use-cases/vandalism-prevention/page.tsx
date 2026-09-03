import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { UseCasePage, type UseCaseContent } from '@/components/content/use-case-page';
import Link from 'next/link';

const pageMeta = {
  title: "Vandalism Prevention | Early Presence Alerts",
  description: "Vandalism prevention on existing cameras: presence near walls, windows and equipment off-hours, raised while intervention is possible, checked on a round.",
  path: "/use-cases/vandalism-prevention",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'Can it prevent vandalism, or only record it?', answer: 'It detects the condition that precedes it: a person at a wall, a window or a parked vehicle during hours when nobody should be there, and it tells the guard with the snapshot while they are still there. Whether that prevents the damage depends on the response. What it removes is the gap between the person arriving and anyone knowing.' },
  { question: 'Does it detect graffiti or spray paint?', answer: 'No. It detects a tracked person in a zone, not the act of painting. The person standing at the wall at 2am is the actionable event; the paint is what happens if nobody comes. A patrol round can include "no new damage visible" as a checklist item, judged from the frame at each stop.' },
  { question: 'What about vehicles being damaged in a car park?', answer: 'Zone rules with after-hours schedules cover the car park, and a person moving between parked vehicles at night is the event. Vehicle damage report, one of the 22 detections, assesses visible damage on a vehicle in frame; it is built for fleet and rental inspection rather than as an alarm.' },
  { question: 'Will it fire on people walking past on the pavement?', answer: 'Only if the pavement is inside the zone. Zones are drawn on the camera view, so the rule can cover the wall and the forecourt and stop at the property line. A line rule on the boundary fires only on crossing it, in the direction you choose.' },
  { question: 'How is the guard told?', answer: 'On the channels configured for that alert category, email, SMS, WhatsApp or push, with the snapshot. A failed checklist item on a round messages the guard designated for that camera. On an automated round that happens on its own; on a manual round the operator chooses.' },
  { question: 'Is there a record for the landlord or insurer?', answer: 'A report per patrol round with each exterior camera, every checklist result and its frame, plus a compliance percentage, and a log of every detection with camera, time and snapshot. When damage is found, the timeline is already written.' },
];

const content: UseCaseContent = {
  eyebrow: 'Use case · Property',
  title: 'Vandalism prevention',
  lede: <>
    <strong className="font-semibold text-foreground">Vandalism prevention in a surveillance context means detecting a person near vulnerable assets, walls, windows, vehicles and equipment, during hours when nobody should be there, and telling someone while they are still there.</strong>{' '}
    The aim is intervention, not a better recording of the damage. Camzify does it with zone rules on the exterior cameras already in place and a patrol round that checks the property and records what it found.
  </>,
  facts: ['Presence near assets off-hours, raised live', 'Zones drawn to the property line', 'Exterior checked and recorded on the round'],
  image: { src: '/vandalism-prevention.jpg', alt: 'A camera covering an alley at night where a person is spray-painting a wall' },
  secondary: { href: '/virtual-patrolling/guard-notifications', label: 'How guards are notified' },
  problem: {
    heading: 'Discovered in the morning, every time',
    paras: [
      'Vandalism is found, not caught. The camera on the wall recorded the whole thing in good detail, and the recording is watched the next day by someone estimating a repair. Passive recording changes nothing about the night; it only changes what can be proven afterwards, and even that requires knowing which hour to look at.',
      'The person who does the damage stands still in a place they should not be for a minute or more first. That is the signal, and it is a simple one.',
    ],
    visual: 'notification',
    caption: 'The guard message for a failed exterior check, with the snapshot, sent while the person is still there and logged to the round.',
    alt: 'A guard notification for a failed checklist item, with the message, the snapshot and an acknowledgement',
  },
  handles: {
    heading: 'The person at the wall is the event',
    paras: [
      <><Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">Zone intrusion detection</Link> draws the vulnerable areas on each exterior camera, the wall, the forecourt, the ground-floor windows, the equipment yard, the car park, and attaches the hours when nobody should be in them. A tracked person inside a zone during those hours raises an alert with the snapshot. Because it fires on a track rather than on motion, a cat, a headlight sweep or a plastic bag does not.</>,
      <>Automated <Link href="/virtual-patrolling/automated-patrol-scheduling" className="text-primary hover:underline">patrol rounds</Link> can watch a scene for a short period before judging, which tells a person walking past from a person who has stopped. The round also checks the exterior on a schedule, no person present, no new damage visible, camera unobstructed, and keeps the frame, which is the timeline when damage is found.</>,
    ],
    detections: [
      { href: '/ai-features/zone-intrusion-detection', name: 'Zone intrusion detection', role: 'Walls, windows, yards and car parks as zones with off-hours schedules.' },
      { href: '/ai-features/line-intrusion-detection', name: 'Line intrusion detection', role: 'A directional line on the property boundary. Entering fires; passing along it does not.' },
      { href: '/ai-features/camera-tampering-detection', name: 'Camera tampering detection', role: 'The camera itself is often the first target. Covered or turned, it raises an alert.' },
      { href: '/ai-features/vehicle-damage-report', name: 'Vehicle damage report', role: 'Visible damage on a vehicle in frame, for fleet and car park inspection.' },
    ],
  },
  round: {
    heading: 'What an exterior round checks',
    label: 'CAM 03 · West wall',
    guard: 'Rahul K.',
    items: [['No person at the wall', 'fail'], ['Ground-floor windows intact', 'ok'], ['Equipment yard clear', 'ok'], ['No new damage visible', 'ok']],
    caption: 'The 02:00 round finds someone at the west wall. Snapshot to the guard; the rest of the stop passed.',
    paras: [
      'An exterior sequence is the cameras around the building in walking order, with a checklist of conditions: nobody present, windows intact, yard clear, no new damage visible, camera unobstructed. Repeated through the night, it produces a report per round that shows the property was checked and found in order at each time, which is what the landlord and the insurer ask for after the night it was not.',
      <>Keep the items as conditions rather than events so that a passing round means something. <Link href="/virtual-patrolling/patrol-checklists" className="text-primary hover:underline">How checklists work</Link> covers the difference.</>,
    ],
  },
  limits: {
    heading: 'What it will not do',
    paras: [
      'It will not see the act of painting, breaking or cutting, and it will not identify who did it; attribute extraction describes clothing and carried objects, and that is all. It will not cover a wall without a camera on it. And it will not intervene: it puts the snapshot in front of the guard designated for that camera while the person is still there.',
      <>We do not publish figures for incidents prevented. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> sets out what we claim and what we do not.</>,
    ],
  },
  industries: [
    { href: '/industries/retail', name: 'Retail' },
    { href: '/industries/education-facilities', name: 'Education facilities' },
    { href: '/industries/property-management', name: 'Property management' },
    { href: '/industries/residential', name: 'Residential' },
  ],
  faqs,
};

export default function VandalismPreventionPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "Vandalism Prevention", description: pageMeta.description, path: pageMeta.path })]} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Vandalism Prevention' },
    ]}>
      <UseCasePage c={content} />
    </PageShell>
  );
}
