import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { UseCasePage, type UseCaseContent } from '@/components/content/use-case-page';
import Link from 'next/link';

const pageMeta = {
  title: "Guard Tour Verification | Proof of Rounds",
  description: "Guard tour verification that proves the condition, not the tap: a virtual round checks the same points, keeps a frame per item, files a report per round.",
  path: "/use-cases/guard-tour-verification",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'Does this replace an NFC or QR guard tour system?', answer: 'It can, and it can also run beside one. A tag system proves a guard reached a checkpoint. A virtual round proves the condition at that checkpoint, door closed, area clear, with the frame it was judged against. If you keep the tag system for the guard’s own record, the virtual round is the independent check on it.' },
  { question: 'Can it run at the same time as the physical round?', answer: 'Yes. Schedule the virtual round to match the guard’s round, and the report shows what the cameras saw at each point at that time. A guard who reports the dock secured while the round found the door up is a discrepancy that shows itself without anyone comparing notes.' },
  { question: 'What does the report contain?', answer: 'Every stop in order, every checklist item with its result, the snapshot each result was judged against, the before-and-after frames for anything that failed and was fixed, timestamps, and a compliance percentage. It is filed per round and is not edited afterwards.' },
  { question: 'What about a guard who is genuinely doing the round?', answer: 'Then the reports agree, and the guard has independent evidence that they did. That is the point for a security agency: proof of service that the client can read, per round, with frames, rather than a sheet of signatures.' },
  { question: 'Can the client see the reports directly?', answer: 'Through a sub-user login scoped to their sites, yes. A client sees their own patrol reports, their own cameras and their own alerts, and nothing that belongs to another client on the same account. The security agencies page covers that arrangement.' },
  { question: 'Does the AI verify the guard is present?', answer: 'A checklist item can ask for it ("guard present at the gatehouse"), judged from the frame. Attribute extraction can describe the person seen. It does not identify individuals, so it verifies that someone was there, not who.' },
];

const content: UseCaseContent = {
  eyebrow: 'Use case · Proof of service',
  title: 'Guard tour verification',
  lede: <>
    <strong className="font-semibold text-foreground">Guard tour verification is confirmation that a patrol round was completed, that every point was checked, and that what was found was recorded.</strong>{' '}
    Tag-based systems prove presence at a checkpoint and nothing about the checkpoint itself. Camzify runs a virtual round over the same points, judges the condition at each from the camera, keeps the frame, and files a report per round that can be set against the guard&apos;s own.
  </>,
  facts: ['The condition proven, not the tap', 'A frame per checklist item', 'A report per round, per client'],
  image: { src: '/guard-tour-verification.jpg', alt: 'A guard reviewing a patrol route on a tablet with checkpoint markers on a campus at night' },
  secondary: { href: '/compare/virtual-patrolling-vs-guard-tour-systems', label: 'Versus guard tour systems' },
  problem: {
    heading: 'A tag proves the guard was there. Not what they saw.',
    paras: [
      'A guard tour system asks the guard to scan an NFC tag or a QR code at each checkpoint, and the report says each was scanned at a time. It cannot say whether the door beside the tag was closed, whether the yard was clear, or whether the guard looked up at all. The tag can be tapped on the way past.',
      'For a security agency that is a real problem: the client is paying for a round and receiving a list of taps. For the client it is worse, because the round that was not done properly is only discovered when something is found broken in the morning.',
    ],
    visual: 'report',
    caption: 'What a virtual round leaves behind: the item, the frame, the result, and the after frame once fixed.',
    alt: 'A patrol report excerpt with a checklist item, its before and after snapshots and a compliance percentage',
  },
  handles: {
    heading: 'The same points, judged from the camera, with the frame kept',
    paras: [
      <>A <Link href="/virtual-patrolling/patrol-sequences" className="text-primary hover:underline">patrol sequence</Link> is built over the same checkpoints as the physical round, one camera stop per point, with a <Link href="/virtual-patrolling/patrol-checklists" className="text-primary hover:underline">checklist</Link> at each that asks what the guard is supposed to check: door closed, area clear, gate locked, fire exit unobstructed. The round judges each item from the frame and keeps that frame, so the report is a set of pictures with verdicts rather than a set of timestamps.</>,
      <>Run it on the guard&apos;s schedule and the two records line up by time. Run it between the guard&apos;s rounds and it covers the gaps. Either way the <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">report</Link> is filed per round with a compliance percentage, and a client with a scoped login reads their own without anyone forwarding it.</>,
    ],
    detections: [
      { href: '/ai-features/zone-intrusion-detection', name: 'Zone intrusion detection', role: 'Watches the areas between rounds, so a checkpoint is covered when nobody is at it.' },
      { href: '/ai-features/camera-tampering-detection', name: 'Camera tampering detection', role: 'A verification camera that has been covered or turned is itself a finding.' },
      { href: '/ai-features/ai-attribute-extraction', name: 'AI attribute extraction', role: 'Describes the person seen at a checkpoint. Presence, not identity.' },
      { href: '/ai-features/multi-object-tracking', name: 'Multi-object tracking', role: 'The layer the detections run on, following each subject across frames.' },
    ],
  },
  round: {
    heading: 'What a verification round checks',
    label: 'CAM 08 · Checkpoint 4',
    guard: 'Priya R.',
    items: [['Plant room door closed', 'ok'], ['Fire exit unobstructed', 'ok'], ['Guard present at checkpoint', 'pending'], ['Corridor clear', 'ok']],
    caption: 'Checkpoint 4 at 01:15. The condition items passed; whether the guard attended is waiting on the frame review.',
    paras: [
      'The verification sequence mirrors the physical round point for point, and each checklist asks the question the guard was meant to answer there. It can also ask whether the guard attended, judged from the frame. The result is two records of the same round, one from the guard and one from the cameras, that either agree or do not.',
      <>For an agency the report is proof of service that the client can read per round. The <Link href="/partners/for-security-agencies" className="text-primary hover:underline">security agencies</Link> page covers how the account is set up so each client sees only their own.</>,
    ],
  },
  limits: {
    heading: 'What it will not do',
    paras: [
      'It will not identify the guard; it can see that a person was at the checkpoint and describe them, not name them. It will not verify a point with no camera on it, so a round with blind checkpoints keeps them blind. And it will not replace the guard: the round proves the condition, and a person still attends what fails.',
      <>We do not publish figures on how often rounds are found to have been skipped, because it is not our number to publish. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> sets out the policy.</>,
    ],
  },
  industries: [
    { href: '/industries/property-management', name: 'Property management' },
    { href: '/industries/healthcare', name: 'Healthcare' },
    { href: '/industries/financial-services', name: 'Financial services' },
    { href: '/industries/warehouses', name: 'Warehouses' },
  ],
  faqs,
};

export default function GuardTourVerificationPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "Guard Tour Verification", description: pageMeta.description, path: pageMeta.path })]} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Guard Tour Verification' },
    ]}>
      <UseCasePage c={content} />
    </PageShell>
  );
}
