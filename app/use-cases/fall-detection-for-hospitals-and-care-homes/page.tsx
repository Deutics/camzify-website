import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { UseCasePage, type UseCaseContent } from '@/components/content/use-case-page';
import Link from 'next/link';

const pageMeta = {
  title: "Fall Detection for Hospitals and Care Homes",
  description: "Fall detection on the cameras hospitals and care homes already have: a person on the floor raised to staff in seconds, not found at the next round.",
  path: "/use-cases/fall-detection-for-hospitals-and-care-homes",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'What does fall detection actually see?', answer: 'A tracked person whose posture changes rapidly and who is then on the floor, and a person who stays on the floor rather than getting up. It is a visual detection on the camera frame, not a wearable, a pressure mat or a bed sensor. The alert carries the frame and a clip so the person receiving it can see what happened before they walk.' },
  { question: 'Does it work in patient rooms and bathrooms?', answer: 'Only where a camera is. Most hospitals and care homes have cameras in corridors, lounges, dining rooms, entrances and outdoor areas, and not in bedrooms or bathrooms, and Camzify does not change that. A fall from a bed or during toileting is not seen unless the facility has chosen to put a camera there, which is a clinical and privacy decision we do not make for you.' },
  { question: 'Who receives the alert?', answer: 'Whoever is designated for that camera: a charge nurse, a floor supervisor, a care assistant, the security desk, or a monitoring company working for the operator. Channels are set per category and severity per camera, so a fall in the memory-care lounge can go to the nearest carer by push and to the nurse station by SMS at the same time. The alert is acknowledged by a person, and the record shows who and when.' },
  { question: 'Will it fire on a resident sitting down on the floor deliberately?', answer: 'Sometimes. A person lowering themselves to the floor to reach something, or a physiotherapy session on a mat, can match the pattern, and the detection watches for whether the person stays down. Every alert includes the clip so a person can dismiss it in seconds, and the workflow is built for that rather than for an alert that is always right.' },
  { question: 'What does it not do?', answer: 'It does not prevent a fall, assess fall risk, or replace hourly rounding, bed alarms or a care plan. It does not identify who fell, and it does not see a fall in a room without a camera. What it changes is the time between a person going down in a corridor or a common area and a member of staff knowing about it.' },
  { question: 'Is the footage a patient record?', answer: 'The alert is logged with the camera, the time, the frame and the clip, and cloud recording holds the footage within the retention set for that camera. Whether that recording becomes part of an incident report or a clinical record is the facility\'s decision under its own policies. Camzify does not identify anyone by face and does not link a clip to a patient identity.' },
];

const content: UseCaseContent = {
  eyebrow: 'Use case · Hospitals and care homes',
  title: 'Fall detection for hospitals and care homes',
  lede: <>
    <strong className="font-semibold text-foreground">Fall detection for hospitals and care homes is the visual detection of a person on the floor, on the corridor and common-area cameras the facility already has, raised to a member of staff within seconds of the fall.</strong>{' '}
    A fall in a corridor between rounds is found when someone walks past. Camzify watches the same cameras continuously, sends the frame and a clip to the person designated for that camera, and records who acknowledged it and when.
  </>,
  facts: ['A person on the floor, raised in seconds', 'On the corridor cameras already installed', 'Staff decide and attend, the record is kept'],
  image: { src: '/feature-slip-and-fall-detection-1.webp', alt: 'The console live view of a hospital corridor with a person on the floor outlined and a Fall Detected label, nurses at the station behind' },
  secondary: { href: '/ai-features/slip-and-fall-detection', label: 'Slip and fall detection' },
  problem: {
    heading: 'The fall is found at the next round, not when it happens',
    paras: [
      'Hourly rounding is the standard on most wards and in most care homes, and it means a person who goes down in a corridor at ten past the hour can lie there until the next pass. In a memory-care unit or a night shift with two carers for thirty residents, the pass can be a long way off. The injury is often not the fall itself but the time on a hard floor afterwards.',
      'The corridor camera saw the whole thing. It recorded it for the incident review, where it will establish how long the person was down, which is precisely the number the facility wanted to be small.',
      'Nurse call buttons and bed alarms cover the bed. Wearables cover the people who wear them and keep them charged. The corridor, the dining room, the lounge and the garden are covered by cameras that nobody is watching.',
    ],
    visual: 'notification',
    caption: 'The alert as the charge nurse receives it: the camera, the time, the frame and an acknowledgement.',
    alt: 'A staff notification for a detected fall, with the message, the snapshot and an acknowledgement button',
  },
  handles: {
    heading: 'The camera raises it, a person attends',
    paras: [
      <><Link href="/ai-features/slip-and-fall-detection" className="text-primary hover:underline">Slip and fall detection</Link> runs on every enabled camera and evaluates each tracked person individually.</>,
      { points: [
        'A rapid, uncontrolled change of posture that ends with the person on the floor is the event.',
        'A person who stays on the floor rather than getting up raises the severity.',
        'The alert carries the frame and a clip, so the person receiving it sees what happened before they walk.',
        'The alert is acknowledged by a named person, and the time from detection to acknowledgement is in the record.',
      ] },
      <>Detection runs at every hour. A notification window per camera limits when notifications go out, not when the detection runs, so the day room can notify the carer on the floor by day and the night station by night. The <Link href="/platform/notifications-and-alerts" className="text-primary hover:underline">notification settings</Link> cover the channels and the escalation.</>,
      <>Between falls, the <Link href="/virtual-patrolling/automated-patrol-scheduling" className="text-primary hover:underline">automated round</Link> checks the conditions that lead to them: a wet floor without a sign, a corridor blocked by a trolley, a handrail obstructed. <Link href="/use-cases/workplace-safety-monitoring" className="text-primary hover:underline">Workplace safety monitoring</Link> covers the same detections for staff areas and loading bays.</>,
    ],
    detections: [
      { href: '/ai-features/slip-and-fall-detection', name: 'Slip and fall detection', role: 'A tracked person down on the floor, and a person who stays down, raised with the frame and a clip.' },
      { href: '/ai-features/multi-object-tracking', name: 'Multi-object tracking', role: 'Each person in the corridor followed as one track, so a fall is evaluated on a person rather than on movement in the scene.' },
      { href: '/ai-features/camera-tampering-detection', name: 'Camera tampering detection', role: 'A corridor camera that is covered, turned or failed, raised the same day rather than found after an incident.' },
      { href: '/platform/notifications-and-alerts', name: 'Notifications and alerts', role: 'Channels and severity per camera, so the lounge notifies the carer on the floor and the nurse station at once.' },
    ],
  },
  round: {
    heading: 'What a ward round checks',
    label: 'CAM 04 · East wing corridor',
    guard: 'Charge nurse',
    items: [['No person on the floor', 'ok'], ['Corridor clear of trolleys and cables', 'fail'], ['Wet-floor sign placed where floor is wet', 'ok'], ['Camera view unobstructed', 'ok']],
    caption: 'Nobody is on the floor; a trolley is across the corridor. The round records the condition at each time, and the detection covers the time in between.',
    paras: [
      'Fall detection is continuous and does not wait for a round. The round adds the conditions: at each stop, the corridor was clear, the floor was dry or signed, the camera could see. Repeated through the shift, it is a record that the environment was checked at each time, which is the record a facility is asked for after a fall.',
      <>A failed item messages the person designated for that camera and stays Pending in the <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">report</Link> until it is marked Fixed. On an automated round, the AI also raises a critical notification for a person on the floor it sees at a stop, whether or not the checklist asked.</>,
    ],
  },
  evidence: {
    heading: 'Why falls in care settings matter',
    lede: 'Published figures from the CDC, AHRQ and The Joint Commission, quoted as the source states them. None of them is a Camzify figure; we publish none.',
    items: [
      { figure: '1 in 4', text: 'Over 14 million, or 1 in 4 older adults report falling every year, and the age-adjusted fall death rate rose 21%, from 64.7 per 100,000 older adults in 2018 to 78.4 per 100,000 in 2024.', source: { name: 'CDC, Older Adult Falls Data', href: 'https://www.cdc.gov/falls/data-research/index.html' } },
      { figure: '700,000 to 1 million', text: 'Approximately 700,000 to 1 million patients fall in hospitals in the United States each year, and patient falls are the most common preventable adverse event within hospitals (December 2024).', source: { name: 'AHRQ Patient Safety Network', href: 'https://psnet.ahrq.gov/perspective/ongoing-journey-prevent-patient-falls' } },
      { figure: '776', text: 'Patient falls were the most frequently reported sentinel event in 2024, with 776 events, a 15% increase from 2023. Of these, 51 falls (7%) resulted in patient death and 503 (65%) in severe harm.', source: { name: 'The Joint Commission, Sentinel Event Data 2024 Annual Review', href: 'https://digitalassets.jointcommission.org/api/public/content/eac7511986c0442a9c1ae04b1aa02cc0?v=ad34daa0' } },
      { figure: '4.5 million', text: 'Each year there are about 4.5 million emergency department visits due to older people falls, with 3.1 million treated and released and 1.4 million hospitalizations.', source: { name: 'CDC, Facts About Older Adult Falls', href: 'https://www.cdc.gov/falls/data-research/facts-stats/index.html' } },
    ],
  },
  limits: {
    heading: 'What it will not do',
    paras: [
      'The limits follow from what it is: a visual detection on the cameras that exist, verified by a person.',
      { points: [
        'It will not prevent a fall, and it will not assess who is at risk of one; those remain the care plan\'s job.',
        'It will not see a fall in a bedroom or a bathroom without a camera, and most facilities rightly have none there.',
        'It will not attend; it tells the person designated for that camera, and the response is theirs.',
        'It will produce some alerts that a person, looking at the clip, will dismiss, and the workflow is built for that.',
        'It will not identify anyone, and it does not link a clip to a patient record.',
      ] },
      <>We do not publish detection rates, false-alert rates or response times for fall detection, because we cannot verify them for your corridors. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> sets out the policy.</>,
    ],
  },
  industries: [
    { href: '/industries/healthcare', name: 'Healthcare' },
    { href: '/industries/property-management', name: 'Property management' },
    { href: '/industries/residential', name: 'Residential' },
  ],
  faqs,
};

export default function FallDetectionForHospitalsAndCareHomesPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "Fall Detection for Hospitals and Care Homes", description: pageMeta.description, path: pageMeta.path })]} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Fall Detection for Hospitals and Care Homes' },
    ]}>
      <UseCasePage c={content} />
    </PageShell>
  );
}
