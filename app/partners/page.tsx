import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';
import { Handshake, Shield, Monitor, Server, Users } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Partners | Reseller & Integration Partners",
  description: "Join the Camzify partner program — resellers, security integrators, monitoring centers, and managed service providers.",
  path: "/partners",
};

export const metadata = generatePageMeta({ ...pageMeta });

const partnerTypes = [
  { slug: 'for-security-agencies', title: 'For Security Agencies', icon: Users, desc: 'Sell overnight coverage across every client site, with a report per client — alongside the guards you already provide.' },
  { slug: 'become-a-reseller', title: 'Become a Reseller', icon: Handshake, desc: 'Sell a cloud VMS with virtual patrolling built in. Software only, quote-based pricing, a page you can quote for every claim.' },
  { slug: 'for-security-integrators', title: 'For Security Integrators', icon: Shield, desc: 'Attach virtual patrolling to systems you already install: RTSP, RTMP or HTTPS, a Connector for LAN cameras, a clean hand-over.' },
  { slug: 'for-monitoring-centers', title: 'For Monitoring Companies', icon: Monitor, desc: 'Run scheduled rounds for every agency you monitor for, notify their guards from the round, and hand each one a report per round.' },
  { slug: 'for-managed-service-providers', title: 'For Managed Service Providers', icon: Server, desc: 'One account you hold, a scoped login per customer, quota you allocate and reclaim, alerts and reports per client.' },
];

export default function PartnersHub() {
  return (
    <PageShell {...pageMeta} breadcrumbs={[{ label: 'Partners' }]}>
      <section className="pb-20">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Partners</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Camzify works with security integrators, resellers, monitoring centers, and MSPs to bring <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link> to facilities worldwide.
          </p>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {partnerTypes.map((p, i) => (
              <ScrollReveal key={p.slug} delay={i * 0.08}>
                <Link href={`/partners/${p.slug}`} className="group flex items-start gap-5 rounded-xl bg-card p-8 shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5">
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
    </PageShell>
  );
}
