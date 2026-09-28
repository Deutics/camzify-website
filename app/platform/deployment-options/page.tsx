import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FeatureHero } from '@/components/content/feature-hero';
import { FaqSection } from '@/components/content/faq-section';
import { SectionVisual } from '@/components/content/section-visual';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';

/**
 * Deployment options: cloud, on premises, hybrid.
 *
 * Facts, all from the business. Cloud: as stated on /security-and-compliance and in
 * /llms.txt (Amazon S3 in the AWS region nearest the customer's sites; the Connector for
 * private-network cameras). On premises and hybrid, stated 2026-09-28: on premises is
 * for clients concerned about data privacy; server requirements depend on what the
 * client needs to keep on site and are planned with them in conversation; Camzify
 * installs and sets up everything; hybrid is possible. Nothing was said about air-gapped
 * operation, update cadence, specific hardware or on-premises pricing: do not add any.
 */
const pageMeta = {
  title: 'Deployment Options | Cloud, On-Premises, Hybrid',
  description: 'Run Camzify in the cloud, on your own premises, or as a hybrid of both. On-premises installations are planned with you and installed and set up by Camzify.',
  path: '/platform/deployment-options',
};

export const metadata = generatePageMeta(pageMeta);

const faqs = [
  { question: 'Can Camzify run on premises?', answer: 'Yes. Besides the cloud service, Camzify is deployed on premises for clients whose footage has to stay on their own site, usually for data privacy reasons. Camzify installs and sets up the whole installation.' },
  { question: 'What server does an on-premises installation need?', answer: 'It depends on what you need to keep on site: how many cameras, which detections and how much footage. Those requirements are worked out with you in conversation first, and the server is specified from them, so there is no one-size answer to quote before that conversation.' },
  { question: 'Who installs and maintains it?', answer: 'Camzify installs and sets up everything for an on-premises installation. You provide the site and the requirements; the installation itself is done by Camzify.' },
  { question: 'Is a hybrid of cloud and on premises possible?', answer: 'Yes. Part of the deployment can run on your premises and part in the cloud. Which part goes where is decided per client, from the same requirements conversation as an on-premises installation.' },
  { question: 'Where is footage stored in the cloud deployment?', answer: 'In Amazon S3 in the AWS region nearest your sites, encrypted in transit with TLS 1.2 or higher and at rest with AES-256.' },
  { question: 'Do custom detections work on premises?', answer: 'Yes. A custom detection built for you runs in the cloud or on premises, the same choice as the rest of the platform.' },
  { question: 'How is an on-premises or hybrid deployment priced?', answer: 'Like everything else on Camzify, it is quoted per site. The quote follows the requirements conversation, because what has to run on site shapes it.' },
];

const options = [
  {
    name: 'Cloud',
    tag: 'Default',
    who: 'For most sites: nothing to install, nothing to maintain.',
    points: [
      'Cameras stream to the platform and every module is used from a browser.',
      'Footage is stored in Amazon S3 in the AWS region nearest your sites, with retention set per camera.',
      'Cameras on a private network connect through the Camzify Connector, without port forwarding.',
    ],
  },
  {
    name: 'On premises',
    tag: 'For data privacy',
    who: 'For clients whose footage has to stay on their own site.',
    points: [
      'The server is specified from your requirements, worked out with you first.',
      'Camzify installs and sets up everything.',
      'Custom detections can run on premises too.',
    ],
  },
  {
    name: 'Hybrid',
    tag: 'Both',
    who: 'For clients who want part of it on site and part in the cloud.',
    points: [
      'Which part runs where is decided per client.',
      'Planned from the same requirements conversation as an on-premises installation.',
      'Quoted per site, like every Camzify deployment.',
    ],
  },
];

export default function DeploymentOptionsPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Platform', href: '/platform' },
      { label: 'Deployment Options' },
    ]}>
      <FeatureHero
        eyebrow="Platform · Deployment"
        title="Cloud, on premises, or a hybrid of both"
        lede={<><strong className="font-semibold text-foreground">Camzify runs in the cloud by default, and on your own premises when footage has to stay on site.</strong> A hybrid of the two is possible as well. On-premises and hybrid installations are planned with you from your requirements, and Camzify installs and sets up everything.</>}
        facts={['Cloud by default', 'On premises for data privacy', 'Installed and set up by Camzify']}
        primary={{ href: '/book-a-demo', label: 'Plan a deployment' }}
        secondary={{ href: '/security-and-compliance', label: 'Security and compliance' }}
        visual={<SectionVisual variant="flow" caption="Deployment · three options" alt="Three deployment options: cloud, on premises and hybrid" steps={['Cloud', 'On premises', 'Hybrid', 'Quoted per site']} />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {options.map((o, i) => (
              <ScrollReveal key={o.name} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="font-display text-xl font-bold">{o.name}</h2>
                    <span className="rounded-full border border-border px-2.5 py-0.5 font-mono text-mono-sm uppercase text-muted-foreground">{o.tag}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{o.who}</p>
                  <ul className="mt-5 space-y-3 text-sm">
                    {o.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/20 py-16 sm:py-20">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-mono text-mono-sm uppercase text-primary">On premises</span>
              <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">How an on-premises installation is planned</h2>
              <p className="mt-4 max-w-prose text-body text-muted-foreground">
                There is no standard box to ship, because what has to stay on site differs from one client to the next. The installation starts with a conversation about your requirements: which cameras and sites, which detections, how much footage and for how long, and what must never leave the building. The server is specified from those answers, and Camzify then installs and sets up the whole installation. The same conversation decides whether a hybrid, with part of the deployment in the cloud, fits better.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="max-w-3xl">
              <h2 className="font-display text-2xl font-bold sm:text-3xl">Which one fits</h2>
              <p className="mt-4 max-w-prose text-body text-muted-foreground">
                Choose the cloud when you would rather have nothing to install or maintain, when you run several sites, or when footage should survive a stolen or broken recorder. Choose on premises when a contract, a regulation or your own policy says footage stays on your premises. Choose a hybrid when only part of it has to. The{' '}
                <Link href="/compare/cloud-vms-vs-on-premise" className="text-primary hover:underline">cloud VMS vs on-premise comparison</Link>{' '}
                sets the two models against each other in general terms, and the{' '}
                <Link href="/guides/hybrid-cloud-video-surveillance" className="text-primary hover:underline">hybrid cloud guide</Link>{' '}
                covers the middle ground.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t border-border bg-muted/20 py-16">
        <div className="mx-auto max-w-site px-6">
          <h2 className="font-mono text-mono-sm uppercase text-muted-foreground">Related</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { href: '/security-and-compliance', title: 'Security and compliance', desc: 'Encryption, access control, and the status of each certification.' },
              { href: '/ai-features/custom-detections', title: 'Custom detections', desc: 'Detections built to order, in the cloud or on premises.' },
              { href: '/camzify-connector', title: 'Camzify Connector', desc: 'How private-network cameras reach the cloud without port forwarding.' },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="group rounded-xl border border-border bg-card p-6 transition-all duration-normal hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <h3 className="font-display text-base font-bold transition-colors group-hover:text-primary">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={faqs} />
    </PageShell>
  );
}
