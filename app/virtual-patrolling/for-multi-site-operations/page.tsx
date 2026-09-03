import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { FeatureHero } from '@/components/content/feature-hero';
import { HeroPlaceholder } from '@/components/content/hero-placeholder';
import { SectionVisual } from '@/components/content/section-visual';
import { FAQAccordion } from '@/components/content/faq-accordion';
import Link from 'next/link';
import { Building, Globe, Users, ArrowRight } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Multi-Site Virtual Patrolling | One Console, Every Location",
  description: "Run virtual patrol rounds across distributed locations from a single console. Each site gets its own sequences, checklists, and compliance tracking.",
  path: "/virtual-patrolling/for-multi-site-operations",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'Do all sites need to run the same patrol sequences?', answer: 'No. Each site configures its own patrol sequences and checklists, suited to its own layout and risk profile — a warehouse and a retail location don\'t need to look the same on the patrol schedule.' },
  { question: 'How does licensing work when adding a new site?', answer: 'Camzify uses instance-based licensing. The parent account holds the total licensed capacity and allocates VPS camera instances to each new site, so scaling to another location means allocating instances rather than buying a separate system.' },
  { question: 'Can an operator at one site see another site\'s cameras?', answer: 'Only if they\'re granted access. Role-based permission groups control which sites, cameras, and sequences a given operator or guard can see or manage.' },
  { question: 'Is compliance tracked separately per site or combined?', answer: 'Both. Each site\'s compliance score is visible on its own, and the parent dashboard also rolls every site up into a single aggregate figure for the whole operation.' },
  { question: 'How long does it take to bring a new site online?', answer: 'It depends on the number of cameras and sequences involved, but the process itself is consistent regardless of size — allocate instances, configure sequences and guards, then set permissions for who can access the new site.' },
];

/** Agencies are the multi-site buyer with the sharpest version of this problem. */
export default function MultiSiteOpsPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Virtual Patrolling', href: '/virtual-patrolling' },
      { label: 'Multi-Site Operations' },
    ]}>
      <FeatureHero
        eyebrow="Multi-Site Coverage"
        title="Multi-site virtual patrolling"
        lede={<>Multi-site <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link> is
            the ability to run scheduled AI patrol rounds across multiple distributed locations from a single console.
            Each site has its own patrol sequences, checklists, assigned guards, and compliance scores — all visible
            on one dashboard.</>}
        primary={{ href: '/book-a-demo', label: 'Book a demo' }}
        secondary={{ href: '/partners/for-security-agencies', label: 'For security agencies' }}
        visual={<HeroPlaceholder label="Multi-site · 4 locations" alt="Camzify console illustrating multi-site virtual patrolling" />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">


          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              { icon: Building, title: 'Per-site sequences', desc: 'Each location gets its own patrol routes, customised to its layout and risk profile.' },
              { icon: Globe, title: 'Centralised oversight', desc: 'Operations managers see compliance scores and patrol status for every site in one view.' },
              { icon: Users, title: 'Site-level access control', desc: 'Assign operators and guards per site. Permission groups control who sees what.' },
            ].map((item: any, i: number) => {
              const Icon = item?.icon ?? Building;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/20 hover:shadow-md">
                    <Icon className="h-5 w-5 text-primary" />
                    <h3 className="mt-3 font-display text-lg font-bold">{item?.title ?? ''}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item?.desc ?? ''}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">Why It Matters</span>
              <h2 className="mt-2 font-display text-2xl font-bold">Why multi-site operations matter</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>Running a separate system at every location means separate logins, separate configurations, and no easy way to tell whether one site's patrol compliance is better or worse than another's without contacting each site individually.</p>
                <p>A patrol sequence built for one site rarely transfers cleanly to another with a different layout and risk profile. A checklist generic enough to apply everywhere ends up too vague to be useful anywhere, while one built for a single site doesn't scale as more locations come online.</p>
                <p>Centralising on one console solves both problems at once: each site keeps sequences, checklists, and guards suited to its own layout, while an operations manager can compare compliance across every location from a single dashboard — and new sites come online by allocating capacity, not by standing up a new deployment.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">Per-Site Setup</span>
                <h2 className="mt-2 font-display text-2xl font-bold">What varies per site</h2>
                <p className="mt-4 text-muted-foreground">Centralised oversight doesn't mean every site is configured the same way. Each location keeps its own settings underneath the shared dashboard.</p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Patrol sequences and camera checklists are built independently for each site's layout</li>
                  <li className="flex gap-2">• Guard rosters and escalation contacts are assigned per site, not shared across locations</li>
                  <li className="flex gap-2">• Compliance thresholds and alert settings can be tuned per site based on its risk profile</li>
                  <li className="flex gap-2">• Role-based permission groups control which operators and guards can access a given site</li>
                </ul>
              </div>
            </ScrollReveal>
            <SectionVisual variant="sites" caption="Per-Site Configuration" alt="Configuration screen showing per-site patrol sequences, guard rosters, and permission settings" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">Licensing</span>
                <h2 className="mt-2 font-display text-2xl font-bold">How multi-site licensing works</h2>
                <p className="mt-4 text-muted-foreground">
                  Camzify uses <Link href="/platform/license-and-instance-management" className="text-primary hover:underline">instance-based licensing</Link>.
                  A parent account holds the total licensed capacity and allocates VPS camera instances to each site
                  or sub-account. This means you scale patrolling to new locations by allocating instances, not by
                  buying separate systems.
                </p>
                <p className="mt-4 text-muted-foreground">
                  Each sub-account manages its own patrol sequences, guard contacts, and schedules — while the
                  parent account retains visibility into compliance across all sites through the{' '}
                  <Link href="/platform/multi-site-management" className="text-primary hover:underline">multi-site management</Link> module.
                </p>
              </div>
            </ScrollReveal>
            <SectionVisual variant="compliance" caption="Multi-Site Compliance" alt="Multi-site dashboard showing patrol compliance across distributed locations" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <SectionVisual variant="flow" caption="Site Rollout" alt="Diagram showing the steps of rolling out virtual patrolling to a new site under a parent account" steps={['Connect the site\'s cameras', 'Build its sequences', 'Assign guards and checklists', 'Schedule the rounds']} />
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">Rollout</span>
                <h2 className="mt-2 font-display text-2xl font-bold">Rolling out a new site</h2>
                <ol className="mt-6 space-y-4 text-muted-foreground">
                  <li className="flex gap-3"><span className="font-mono text-primary">01</span> The new site is added as a sub-account under the parent instance</li>
                  <li className="flex gap-3"><span className="font-mono text-primary">02</span> VPS camera instances are allocated to the site from the parent's licensed capacity</li>
                  <li className="flex gap-3"><span className="font-mono text-primary">03</span> Patrol sequences, checklists, and guard contacts are configured for the site independently</li>
                  <li className="flex gap-3"><span className="font-mono text-primary">04</span> Role-based permissions determine which operators and guards can access the new site</li>
                  <li className="flex gap-3"><span className="font-mono text-primary">05</span> The site appears on the parent dashboard with its own compliance score, alongside every other location</li>
                </ol>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 rounded-2xl border border-border bg-card p-8 sm:p-10">
            <span className="font-mono text-mono-sm uppercase text-primary">FAQ</span>
            <h2 className="mt-2 font-display text-2xl font-bold">Frequently asked questions</h2>
            <div className="mt-6">
              <FAQAccordion items={faqs} />
            </div>
          </div>

          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold">Related</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/platform/multi-site-management" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Multi-Site Management <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/industries/multiple-sites" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Multiple Sites Industry <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/platform/user-management" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">User Management <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/pricing" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Pricing <ArrowRight className="h-3 w-3" /></Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
