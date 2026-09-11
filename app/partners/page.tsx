import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';
import { SiteImage } from '@/components/content/site-image';
import { Handshake, Shield, Monitor, Server, Users } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Partners | Reseller & Integration Partners",
  description: "Join the Camzify partner program, resellers, security integrators, monitoring centers, and managed service providers.",
  path: "/partners",
};

export const metadata = generatePageMeta({ ...pageMeta });

const partnerTypes = [
  { slug: 'for-security-agencies', image: { src: '/vp-vs-security-guards.jpg', alt: 'A security officer at a patrol car alongside an AI camera network' }, title: 'For Security Agencies', icon: Users, desc: 'Sell overnight coverage across every client site, with a report per client, alongside the guards you already provide.' },
  { slug: 'become-a-reseller', image: { src: '/product-license-plan-light.jpg', alt: 'The Plan and Usage screen: instances granted, activated and available' }, title: 'Become a Reseller', icon: Handshake, desc: 'Sell a cloud VMS with virtual patrolling built in. Software only, quote-based pricing, a page you can quote for every claim.' },
  { slug: 'for-security-integrators', image: { src: '/product-configuration-light.jpg', alt: 'The Configuration screen: adding a camera by its stream address' }, title: 'For CCTV & Alarm Installers', icon: Shield, desc: 'Attach virtual patrolling to systems you already install: RTSP, RTMP or HTTPS, a Connector for LAN cameras, a clean hand-over.' },
  { slug: 'for-monitoring-centers', image: { src: '/partner-gate-opened.jpg', alt: 'A yard gate camera: the gate standing open, the state the round found' }, title: 'For Monitoring Companies', icon: Monitor, desc: 'Run scheduled rounds for every agency you monitor for, notify their guards from the round, and hand each one a report per round.' },
  { slug: 'for-managed-service-providers', image: { src: '/product-user-management-light.jpg', alt: 'The user management screen: sub-users with their sites and permission groups' }, title: 'For Managed Service Providers', icon: Server, desc: 'One account you hold, a scoped login per customer, quota you allocate and reclaim, alerts and reports per client.' },
];

const faqs = [
  { question: 'Which partner page am I?', answer: 'If you sell guard hours or mobile patrols, security agencies. If you receive alarms or watch cameras for others, monitoring companies. If you install cameras, CCTV and alarm installers. If you run IT for customers, managed service providers. If you sell software, resellers.' },
  { question: 'Is there a partner program with tiers and margins?', answer: 'No published margin, tier, portal or curriculum. Terms are agreed in conversation, and every partner page says so rather than inventing a program.' },
  { question: 'Who holds the account, the partner or the customer?', answer: 'Whoever operates the console. A partner can hold the account with each customer as a scoped sub-user, or the customer can hold it and give the partner a login. Both are supported.' },
  { question: 'Where do I run the numbers?', answer: "The ROI calculator has an agency mode: client sites, the price you would charge, the hours you cannot staff, and the recurring revenue that follows. Camzify's cost is quoted against it." },
];

export default function PartnersHub() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[{ label: 'Partners' }]}>
      <section className="pb-20">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Partners</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Camzify works with security integrators, resellers, monitoring centers, and MSPs to bring <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link> to facilities worldwide.
          </p>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {partnerTypes.map((p, i) => (
              <ScrollReveal key={p.slug} delay={i * 0.08}>
                <Link href={`/partners/${p.slug}`} className="group flex items-start gap-6 rounded-xl bg-card p-8 shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5">
                <div className="hidden w-40 shrink-0 overflow-hidden rounded-lg border border-border sm:block"><SiteImage src={p.image.src} alt={p.image.alt} width={1229} height={692} sizes="160px" className="aspect-video h-auto w-full object-cover" /></div>
                  <p.icon className="mt-0.5 h-8 w-8 shrink-0 text-primary" />
                  <div>
                    <h2 className="font-display text-lg font-bold">{p.title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                    <span className="mt-3 block text-sm font-semibold text-primary">Learn more →</span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      <FaqSection items={faqs} />
    </PageShell>
  );
}
