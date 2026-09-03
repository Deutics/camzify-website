import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { UseCasePage, type UseCaseContent } from '@/components/content/use-case-page';
import { HeroPlaceholder } from '@/components/content/hero-placeholder';
import Link from 'next/link';

const pageMeta = {
  title: "PPE Compliance Monitoring | Cameras, Not Clipboards",
  description: "PPE compliance on existing cameras: hats, vests and gloves checked against each zone policy, a clip per violation, the site recorded on the round.",
  path: "/use-cases/ppe-compliance-monitoring",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'Which PPE can it check?', answer: 'Hard hats, high-visibility vests and gloves, checked on every confirmed person in frame against the policy set for that camera or zone. A dock can require hats and vests while the office beside it requires nothing, without different cameras. Other equipment types are not claimed.' },
  { question: 'Does it replace the safety officer?', answer: 'No. It is a continuous check that produces a timestamped clip for the safety officer or supervisor to act on, and a record for audits and incident reviews. The judgement about what to do with a repeat violation is theirs.' },
  { question: 'What about a hat that is briefly out of view?', answer: 'The check is weighed against the confirmed track of the person rather than a single frame, so a hard hat momentarily hidden behind a rack does not become a violation. Every alert carries a confidence score and the clip, so a reviewer can confirm at a glance.' },
  { question: 'Can the policy differ by shift?', answer: 'The policy is per camera or zone. The notification window on the detection sets the hours during which violations are notified, so a yard that is only a hard-hat area during working hours notifies only during them. Outside that window the detection is quiet.' },
  { question: 'Is this a privacy problem for staff?', answer: 'The detection checks equipment on a person, not identity. It does not recognize faces or name anyone, and the clip shows what any supervisor on the floor would see. How you inform staff is a matter for your policy; we recommend telling them, because a known check changes behavior on its own.' },
  { question: 'What does the record look like?', answer: 'A log of violations per camera with time, clip and confidence, and a patrol report per round if you add PPE to the checklist: at each stop, are the people in frame wearing what the zone requires, judged from the frame and kept with it.' },
];

const content: UseCaseContent = {
  eyebrow: 'Use case · Safety compliance',
  title: 'PPE compliance monitoring',
  lede: <>
    <strong className="font-semibold text-foreground">PPE compliance monitoring is the continuous check of every person in a camera&apos;s view against the protective equipment required in that area: hard hat, high-visibility vest, gloves.</strong>{' '}
    A safety officer sees a fraction of the floor for a fraction of the shift. Camzify checks each confirmed person against the policy set for that camera or zone, produces a clip per violation, and can add the check to the patrol round so the site is recorded as compliant at each time.
  </>,
  facts: ['Hats, vests and gloves against a per-zone policy', 'A clip and confidence score per violation', 'Compliance recorded on the round'],
  heroVisual: <HeroPlaceholder label="Safety · PPE policy by zone" alt="A console camera wall of four cameras covering a loading bay, a warehouse aisle, a yard gate and a plant room, each labelled with its PPE zone" frames={[{ src: '/cam-02.jpg', id: 'CAM 04', loc: 'LOADING BAY · HAT + VEST' }, { src: '/cam-04.jpg', id: 'CAM 02', loc: 'YARD · HAT + VEST' }, { src: '/cam-03.jpg', id: 'CAM 09', loc: 'PLANT ROOM · HAT + GLOVES' }, { src: '/cam-06.jpg', id: 'CAM 01', loc: 'GATE · VEST' }]} active={0} />,
  secondary: { href: '/ai-features/ppe-violation-detection', label: 'PPE violation detection' },
  problem: {
    heading: 'The policy is on the wall. Compliance is not.',
    paras: [
      'Every site has the sign at the gate and a policy in the induction pack, and compliance is whatever the safety officer happens to see while walking the floor. A hard hat comes off in the heat, a vest is left in the cab, and the record says the site was compliant because nobody wrote down that it was not.',
      'After an injury the question is what the site looked like at that hour, and the answer is usually a recollection. The cameras saw it. They were not asked.',
    ],
    visual: 'compliance',
    caption: 'Compliance per round, per zone. The number is worth reading because a violation counts against it.',
    alt: 'A compliance overview showing patrol rounds with their compliance percentages',
  },
  handles: {
    heading: 'Every person in frame, checked against the zone',
    paras: [
      <><Link href="/ai-features/ppe-violation-detection" className="text-primary hover:underline">PPE violation detection</Link> checks each confirmed person in the camera view against the equipment required for that camera or zone and raises an alert with a clip and a confidence score when something required is missing. The check is weighed over the person&apos;s track rather than one frame, so a hat hidden for a second behind a rack is not a violation. The policy is per zone, so the dock and the office beside it carry different requirements on the same account.</>,
      <>Add the check to a <Link href="/virtual-patrolling" className="text-primary hover:underline">patrol round</Link> and the site is recorded as compliant, or not, at each stop and each time, with the frame. That is the record an inspector or an insurer asks for after an incident, and it exists before anyone asks. <Link href="/ai-features/slip-and-fall-detection" className="text-primary hover:underline">Slip and fall detection</Link> on the same cameras covers the injury itself, and the <Link href="/use-cases/workplace-safety-monitoring" className="text-primary hover:underline">workplace safety page</Link> covers falls, exits and exclusion zones together.</>,
    ],
    detections: [
      { href: '/ai-features/ppe-violation-detection', name: 'PPE violation detection', role: 'Hard hats, high-visibility vests and gloves checked per person against the zone policy.' },
      { href: '/ai-features/slip-and-fall-detection', name: 'Slip and fall detection', role: 'A fall raised in real time with a clip, routed to the nearest guard.' },
      { href: '/ai-features/zone-intrusion-detection', name: 'Zone intrusion detection', role: 'A person in an exclusion zone, a crane radius or a plant area, notified during the hours you set.' },
      { href: '/ai-features/multi-object-tracking', name: 'Multi-object tracking', role: 'The track each person is followed on, so a check is made over time rather than on one frame.' },
    ],
  },
  round: {
    heading: 'What a safety round checks',
    label: 'CAM 04 · Loading bay',
    guard: 'Site supervisor',
    items: [['All persons in hard hats', 'fail'], ['High-visibility vests worn', 'ok'], ['Exclusion zone clear', 'ok'], ['Walkway unobstructed', 'ok']],
    caption: 'The mid-shift round finds a person without a hat on the bay. The supervisor gets the frame; the round records it.',
    paras: [
      'A safety sequence is the cameras on the working areas in order, and its checklist mixes equipment and conditions: everyone in hats, vests on, exclusion zone clear, walkways unobstructed, extinguisher points accessible. Run at the start of each shift and mid-shift, it produces a report per round that shows the site as it was, with frames, which is worth more in a review than a signed checklist.',
      <>Where the round is <Link href="/virtual-patrolling/automated-patrol-scheduling" className="text-primary hover:underline">automated</Link>, the AI also raises a critical notification for a safety risk it sees that the checklist did not ask about.</>,
    ],
  },
  limits: {
    heading: 'What it will not do',
    paras: [
      'It will not check equipment it is not built for: harnesses, eye protection and respirators are not claimed. It will not identify the person; the clip shows what a supervisor would see and no more. It will not see a person the camera cannot see, or a hat under a hood the camera cannot resolve. And it does not decide the consequence; that stays with your safety process.',
      <>We do not publish detection accuracy or injury-reduction figures. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> sets out why.</>,
    ],
  },
  industries: [
    { href: '/industries/construction-sites', name: 'Construction sites' },
    { href: '/industries/manufacturing', name: 'Manufacturing' },
    { href: '/industries/warehouses', name: 'Warehouses' },
    { href: '/industries/waste-management', name: 'Waste management' },
  ],
  faqs,
};

export default function PpeComplianceMonitoringPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "PPE Compliance Monitoring", description: pageMeta.description, path: pageMeta.path })]} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'PPE Compliance Monitoring' },
    ]}>
      <UseCasePage c={content} />
    </PageShell>
  );
}
