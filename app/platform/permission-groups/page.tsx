import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { FeatureHero } from '@/components/content/feature-hero';
import { PermissionGroupsMockup } from '@/components/mockups/permission-groups-mockup';
import { FAQAccordion } from '@/components/content/faq-accordion';
import Link from 'next/link';
import { SiteImage } from '@/components/content/site-image';
import { LayoutList, SlidersHorizontal, Users, Zap } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Permission Groups | Role-Based Access",
  description: "Camzify permission groups: per-module View/Edit/Delete matrix, site-level access, fine-grained role-based control for enterprise deployments.",
  path: "/platform/permission-groups",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'What is the difference between page-level access and CRUD permissions?', answer: 'A permission group carries both. Page-level access decides which pages a user can open at all. CRUD permissions decide what they can do to each resource — sites, cameras, AI features and so on — at the level of create, read, update and delete. The two combine into the single group you assign to a user.' },
  { question: 'What happens to CRUD permissions if I turn off a page for a group?', answer: 'They go with it. Turning off a page removes the CRUD permissions for that page too, so there is no state where a user holds edit rights over something they cannot reach. That prevents the most common misconfiguration in role-based access: rights that survive on paper after the route to them has been closed.' },
  { question: 'Can permission groups be customized beyond the four built-in roles?', answer: 'The four built-in groups — Site Admin, Guard, Auditor, and Surveillance Manager — cover the common operational patterns out of the box, and each can be assigned freely to as many users as needed. For access needs outside those four templates, your account team can help scope a custom group to the exact page and instance permissions your deployment requires.' },
  { question: "What happens to a user's access if their group's permissions change?", answer: "A user's effective access always reflects their group's current configuration, not a snapshot from when they were assigned. If Auditor's page access were changed, every user in the Auditor group would see that change take effect immediately on their next page load — there's no per-user override to reconcile." },
  { question: 'Does page access override instance permissions, or is it the other way around?', answer: 'They\'re independent and both apply. Page access controls which sections a user can navigate to at all — a Guard, for instance, has no route into Configuration or Plan & Usage. Instance permissions then control what they can do with the AI-feature instances on the pages they can reach, which is why a Guard can open Live Streaming but still can\'t create or edit anything there.' },
  { question: 'Can one user belong to more than one permission group?', answer: 'No — each user is assigned exactly one permission group at a time, which keeps the effective access for any given account unambiguous. Moving a user to a different group replaces their previous access rather than adding to it.' },
  { question: "What's the difference between View and Create rights on an instance type?", answer: 'View rights let a user see an existing instance and its data — footage, detection events, configuration — without being able to change anything. Create rights let a user stand up a new instance of that AI feature type. A group can have full view access with zero create rights, which is exactly the Auditor pattern: see everything, change nothing.' },
];

export default function Page() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Platform', href: '/platform' },
      { label: 'Permission Groups' },
    ]}>
      <FeatureHero
        eyebrow="Role-Based Access Control"
        title="Permission groups"
        lede={<><strong className="font-semibold text-foreground">Permission groups in Camzify define a per-module access matrix: which of the seven platform pages a role can reach, and View, Create, Edit, and Delete rights across the ten AI-feature instance types.</strong> Four ready-made roles — Site Admin, Guard, Auditor, and Surveillance Manager — cover the operational patterns most deployments need. Combined with site-level access control, this creates fine-grained security appropriate for multi-site enterprise deployments.</>}
        primary={{ href: '/book-a-demo', label: 'Book a demo' }}
        secondary={{ href: '/platform/user-management', label: 'User management' }}
        visual={<div className="overflow-hidden rounded-xl border border-border bg-card">
            <SiteImage
              src="/permission-group.jpg"
              alt="A laptop showing the Camzify Create Permission Group screen with page-access toggles and a View/Create/Edit/Delete instance permissions matrix"
              className="w-full"
              width={1229}
              height={692}
              priority
            sizes="(max-width: 1024px) 100vw, 45vw" />
          </div>}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">

          <div className="mt-12">
            <PermissionGroupsMockup />
          </div>

          <div className="mt-16">
            <span className="font-mono text-mono-sm uppercase text-primary">In practice</span>
            <h2 className="mt-2 font-display text-2xl font-bold">How a permission group is built</h2>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: LayoutList, title: 'Granular page access', desc: 'Each role reaches a defined subset of the 7 platform pages — Guard sees 4, Auditor sees all 7, nothing is all-or-nothing.' },
              { icon: SlidersHorizontal, title: 'View / Create / Edit / Delete', desc: 'Instance permissions are tracked separately across all 10 AI-feature types, so read access and write access never have to travel together.' },
              { icon: Users, title: 'Four ready-made role templates', desc: 'Site Admin, Guard, Auditor, and Surveillance Manager map to real operational roles out of the box — assign and go.' },
              { icon: Zap, title: 'Applies the moment a role is assigned', desc: 'Access changes take effect immediately — no separate propagation step, no cached permissions to clear.' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/20 hover:shadow-md">
                    <Icon className="h-5 w-5 text-primary" />
                    <h3 className="mt-3 font-display text-base font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">Two Roles, Two Philosophies</span>
                <h2 className="mt-2 font-display text-2xl font-bold">Guard vs. Auditor, in practice</h2>
                <p className="mt-4 text-muted-foreground">
                  Guard and Auditor sit at opposite ends of the same access model. A Guard reaches only 4 of the 7
                  pages — Dashboard, Live Streaming, Virtual Patrolling, and Notifications — the pages needed to
                  watch cameras and respond in the moment. Instance permissions are almost nonexistent: View on
                  just 1 of 10 instance types, and zero Create, Edit, or Delete rights anywhere.
                </p>
                <p className="mt-4 text-muted-foreground">
                  An Auditor is the inverse. Page access is complete — all 7 pages, including Configuration and
                  Plan & Usage, which no other non-admin role reaches. Instance permissions are View on all 10
                  types, and zero write access anywhere. One role is built to act with minimal visibility; the
                  other is built to see everything and change nothing.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <span className="font-mono text-mono-sm uppercase text-primary">Access Model</span>
                <div className="mt-4 space-y-3">
                  {[
                    { role: 'Guard', detail: '4/7 pages · View 1/10 · no write rights' },
                    { role: 'Auditor', detail: '7/7 pages · View 10/10 · no write rights' },
                    { role: 'Site Admin', detail: '6/7 pages · full read/write, Delete 8/10' },
                    { role: 'Surveillance Manager', detail: '6/7 pages · full read/write, Delete 0/10' },
                  ].map((r) => (
                    <div key={r.role} className="flex items-center justify-between rounded-lg bg-muted/30 px-4 py-2.5">
                      <div>
                        <div className="text-sm font-medium">{r.role}</div>
                        <div className="text-xs text-muted-foreground">{r.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
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
              <Link href="/platform" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Platform Overview</Link>
              <Link href="/platform/user-management" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">User Management</Link>
              <Link href="/platform/license-and-instance-management" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">License & Instance Management</Link>
              <Link href="/virtual-patrolling" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Virtual Patrolling</Link>
              <Link href="/pricing" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Pricing</Link>
              <Link href="/book-a-demo" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Book a Demo</Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
