import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { UseCasePage, type UseCaseContent } from '@/components/content/use-case-page';
import Link from 'next/link';

const pageMeta = {
  title: "Virtual Patrolling for Compliance Evidence",
  description: "Where a regulator, insurer or contract requires proof that checks were made: scheduled rounds on your cameras, a frame per item, a timestamped PDF.",
  path: "/use-cases/virtual-patrolling-for-compliance-evidence",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'Will an auditor accept a camera frame as evidence that a check was made?', answer: 'That is the auditor\'s decision, and we do not promise it. What the report gives them is the item, the time it was checked, the frame it was judged against, the reasoning on an automated round, and the person notified on a failure, which is the form of record most clauses ask for: created at the time of the activity, dated, timed and attributable. Whether it satisfies a particular clause is a judgment about the clause, not about the software.' },
  { question: 'Is Camzify itself 21 CFR Part 11 compliant, SOC 2 certified or PCI certified?', answer: 'No claim is made. Part 11 applies to the regulated firm\'s own electronic records and the determination is theirs to make with their quality function. Camzify\'s SOC 2 Type II and ISO 27001 certifications are in progress and not held, and the trust page says so. What the product does is produce records with the properties a site needs to argue its own case.' },
  { question: 'Can the round run at the frequency our policy or license names?', answer: 'Yes, within what the cameras can support. Each patrol sequence has its own schedule, hourly overnight, twice a shift, once a week for a vacant building, and the rounds run at those times whether or not anyone is on site. A scheduled round that did not run is recorded as overdue in compliance tracking, so a missed check is a record of its own rather than a silence.' },
  { question: 'How long are reports kept, and can I export a whole month for an audit?', answer: 'Reports stay in the patrol log for as long as the account is active, and a date range covering many rounds can be exported together, which is what an audit or a claim usually needs. The historical view filters by site, camera and status, so one door that keeps failing the same item is visible without reading every report.' },
  { question: 'What about the time between rounds?', answer: 'The detections cover it. Zone intrusion records a person in a restricted bay or a cage the moment one appears, camera tampering records a camera that was covered or moved, and each is logged with its frame whether or not anyone acts. Notifications for each detection follow a window per camera, so the detection runs always and the people are told in the hours you set.' },
  { question: 'What will it not do?', answer: 'It will not measure anything a camera cannot see, so a cold room\'s temperature is a sensor question and only its door is a camera question. It will not make a site compliant with a framework, sign a record on a person\'s behalf, or produce evidence from a camera that was dark or offline; that round is logged as failed or missed. It produces a record, and the auditor judges the record.' },
];

const content: UseCaseContent = {
  eyebrow: 'Use case · Regulated and insured sites',
  title: 'Virtual patrolling for compliance evidence',
  lede: <>
    <strong className="font-semibold text-foreground">Virtual patrolling for compliance evidence is the use of scheduled camera rounds to produce the record a regulator, an insurer or a client contract requires: proof that a defined check was made, at a stated time, with the frame it was judged against.</strong>{' '}
    A cold store that must show its doors were closed, a data center that must show its cage was not entered, a licensed premises that must show its exits were clear, a vacant building whose policy requires weekly inspection. Camzify runs the round, answers each item from the camera, and files a timestamped PDF with a frame per item.
  </>,
  facts: ['A frame behind every answer', 'Timestamped, filed, exportable by date', 'Rounds that run whether or not anyone is in'],
  image: { src: '/guard-tour-verification.webp', alt: 'A guard at night reading a checklist on a tablet outside an office building, with a panel of six camera views above, five passed and one flagged' },
  secondary: { href: '/virtual-patrolling/patrol-reports', label: 'Patrol reports' },
  problem: {
    heading: 'The check was done; the evidence is a tick in a logbook',
    paras: [
      'Most sites make the checks their obligations require. What they struggle to produce is evidence. The auditor asks for the record of the storage-room door checks for March, and the answer is a paper log with a tick and an initial per line, or a guard tour system that proves someone stood at a tag and nothing about what they saw.',
      <>The frameworks are specific about the record. FDA rules for food facilities require records to be created concurrently with the activity and to carry its date and time (21 CFR 117.305), and the FDA electronic-records rule asks for time-stamped audit trails (21 CFR 11.10). PCI DSS requires that access to sensitive areas be monitored on camera, and the data reviewed and retained. A SOC 2 examination tests that physical access to data center facilities is restricted to authorized personnel (<a href="https://www.aicpa-cima.com/resources/download/2017-trust-services-criteria-with-revised-points-of-focus-2022" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">AICPA Trust Services Criteria, CC6.4</a>). Vacant-property insurers ask for inspections at least weekly and for proof they happened (<a href="https://www.chubb.com/us-en/businesses/resources/safeguarding-vacant-assets-a-blueprint-for-portfolio-risk-management.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Chubb</a>).</>,
      'A tick cannot be examined. A frame can.',
    ],
    visual: 'report',
    caption: 'The report per round: each item with its status, the frame it was judged against, and the guard notified on a failure.',
    alt: 'A patrol report with a row per checklist item, its status and the camera frame',
  },
  handles: {
    heading: 'The round is the check, and the report is the evidence',
    paras: [
      <>A <Link href="/virtual-patrolling/patrol-sequences" className="text-primary hover:underline">patrol sequence</Link> lists the cameras that cover the things you must prove, and a <Link href="/virtual-patrolling/patrol-checklists" className="text-primary hover:underline">checklist</Link> per camera asks the questions the obligation is about, in plain words: cold-room door closed, cage door shut, fire exit unobstructed, no person in the restricted bay.</>,
      { points: [
        <>An <Link href="/virtual-patrolling/automated-patrol-scheduling" className="text-primary hover:underline">automated round</Link> runs at the times the obligation names, hourly overnight, twice a shift, every Monday for a vacant building, and answers each item from the frame with its reasoning written down.</>,
        <>Every answer is recorded with the frame it was judged against, and a failed item <Link href="/virtual-patrolling/guard-notifications" className="text-primary hover:underline">messages the designated person</Link>, whose fix captures the after frame.</>,
        <>The round produces a timestamped PDF <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">report</Link> with a compliance percentage, stored in the patrol log for as long as the account is active and exportable by date range for an audit.</>,
        <><Link href="/virtual-patrolling/patrol-compliance-tracking" className="text-primary hover:underline">Compliance tracking</Link> shows the rounds that ran, the ones that were flagged and the ones that were overdue, so a missed round is a record of its own rather than a silence.</>,
      ] },
      'The evidence has the same shape whether the round was run by an operator or by the schedule: item, answer, time, frame, and who was told.',
    ],
    detections: [
      { href: '/virtual-patrolling/patrol-checklists', name: 'Patrol checklists', role: 'The questions the obligation asks, written per camera in plain words and answered from the frame at each stop.' },
      { href: '/virtual-patrolling/patrol-reports', name: 'Patrol reports', role: 'The PDF per round: every item, its status, its frame, the guard notified, and the compliance percentage.' },
      { href: '/ai-features/zone-intrusion-detection', name: 'Zone intrusion detection', role: 'A person in the restricted bay or the cage between rounds, recorded with the frame as an event of its own.' },
      { href: '/ai-features/camera-tampering-detection', name: 'Camera tampering detection', role: 'A covered or moved camera raised the same day, because a camera that was not looking produces no evidence.' },
    ],
  },
  round: {
    heading: 'What a compliance round checks',
    label: 'CAM 04 · Cold room door',
    guard: 'Shift supervisor',
    items: [['Cold room door closed', 'ok'], ['Fire exit unobstructed', 'ok'], ['No person in restricted bay', 'ok'], ['Cage door secured', 'fail']],
    caption: 'Three items compliant, one not. The failed one carries its frame, the person who was messaged, and the after frame once it was fixed.',
    paras: [
      'A compliance sequence is written from the obligation backwards. Take the clauses you must evidence, name the camera that can see each one, and write the item as the question an inspector would ask. Storage temperature is not a camera question; a door left open, a blocked exit, a person in a cage, a light left on and a gate standing open all are.',
      <>Set the schedule to the frequency the obligation names, and no tighter than the cameras can support. The report then answers the inspector&apos;s question in their own terms: was it checked, when, against what, and what did it show. <Link href="/use-cases/guard-tour-verification" className="text-primary hover:underline">Guard tour verification</Link> covers the same record for a manned round, and the <Link href="/guides/security-audit-checklist" className="text-primary hover:underline">security audit checklist</Link> lists what an audit usually asks for.</>,
    ],
  },
  evidence: {
    heading: 'What the frameworks require, in their own words',
    lede: 'Quoted from the regulation, the standard and the insurance industry, with a link to each. Camzify publishes no figures of its own; it produces records that a site can put in front of its own auditor.',
    items: [
      { figure: '21 CFR 117.305', text: 'FDA records for food facilities must "be created concurrently with performance of the activity documented" and include "the date and, when appropriate, the time of the activity documented" and "the signature or initials of the person performing the activity."', source: { name: '21 CFR 117.305, Code of Federal Regulations', href: 'https://www.law.cornell.edu/cfr/text/21/117.305' } },
      { figure: '21 CFR 11.10(e)', text: 'The FDA electronic-records rule requires "secure, computer-generated, time-stamped audit trails to independently record the date and time of operator entries and actions that create, modify, or delete electronic records."', source: { name: '21 CFR 11.10, Code of Federal Regulations', href: 'https://www.law.cornell.edu/cfr/text/21/11.10' } },
      { figure: '3 months', text: 'PCI DSS v4.0.1, Requirement 9.2.1.1: individual physical access to sensitive areas within the cardholder data environment is monitored with video cameras, physical access control mechanisms, or both; the collected data is reviewed and correlated with other entries and "stored for at least three months, unless otherwise restricted by law."', source: { name: 'PCI Security Standards Council, PCI DSS v4.0.1', href: 'https://www.pcisecuritystandards.org/document_library/' } },
      { figure: 'Weekly', text: 'Chubb\'s guidance for vacant assets: "Inspect vacant or unoccupied properties at least once a week to ensure safety and maintenance." The Insurance Information Institute puts the underwriting position plainly: "Insurers typically require proof that reasonable steps were taken to maintain the property" (June 2025).', source: { name: 'Insurance Information Institute, 2025', href: 'https://www.iii.org/blog/when-no-ones-home-understanding-roleof-vacancy-insurance' } },
    ],
  },
  limits: {
    heading: 'What it will not do',
    paras: [
      'A camera round evidences what a camera can see, and the frameworks above ask for more than that.',
      { points: [
        'It will not measure a temperature, a humidity or a pressure; a cold-room door is a camera question, and the cold room\'s temperature is a sensor question.',
        'It will not make a site compliant with any framework; it produces a record of checks, and the auditor judges whether that record meets the clause.',
        'It will not prove a check was made from a camera that was covered, dark or offline; that round is logged as failed or missed, which is itself a record.',
        'It will not sign a record on a person\'s behalf; the report says which guard was notified and who marked an item fixed.',
      ] },
      <>Camzify&apos;s own SOC 2 Type II and ISO 27001 certifications are in progress and not held, and we publish no uptime or response-time figures. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> sets out both.</>,
    ],
  },
  industries: [
    { href: '/industries/manufacturing', name: 'Manufacturing' },
    { href: '/industries/financial-services', name: 'Financial services' },
    { href: '/industries/multiple-sites', name: 'Multiple sites' },
    { href: '/industries/healthcare', name: 'Healthcare' },
  ],
  faqs,
};

export default function VirtualPatrollingForComplianceEvidencePage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "Virtual Patrolling for Compliance Evidence", description: pageMeta.description, path: pageMeta.path })]} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Virtual Patrolling for Compliance Evidence' },
    ]}>
      <UseCasePage c={content} />
    </PageShell>
  );
}
