import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { UserManagementMockup } from '@/components/mockups/user-management-mockup';
import { FAQAccordion } from '@/components/content/faq-accordion';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Cpu, MapPin, UserCog } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Security System User Management",
  description: "Camzify user management: permission groups with per-module access, site-level control, AI instance grants for multi-tenant deployments.",
  path: "/platform/user-management",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'How do I set up delegated access for a team?', answer: 'Build a permission group first, then add the user against it, assign their sites and cameras, and allocate licence quota from what you hold. The walkthrough is at /guides/how-to-manage-sub-users-and-quotas.' },
  { question: 'Can a sub-user create their own sub-users?', answer: 'Yes, on the same model as the parent account. A sub-user can create users beneath them, assign a permission group, and allocate sites, cameras, feature instances and backup storage out of their own unused quota — never more than they hold. Subscription end date and pricing stay parent-admin-only, so a delegated administrator can run their part of the account without touching commercial terms.' },
  { question: 'What happens when a sub-user runs out of licensed instances?', answer: 'They see the limit and are offered a quota request form rather than a dead end. The request arrives in the parent account under User Management, where it can be approved — if there is enough unallocated quota to cover it — or declined. Nothing is granted automatically, so the parent account keeps control of what has been handed out.' },
  { question: 'Can I suspend a sub-user without deleting them?', answer: 'Yes. Deactivating a user blocks sign-in while keeping their allocation and data reserved, so a contractor between shifts or a member of staff on leave can be restored later without rebuilding their access. Deleting is the separate, permanent action.' },
  { question: 'How do I reset a sub-user\'s password?', answer: 'From that user\'s menu in User Management, either set a password directly or generate a strong random one. It does not require the user to start a reset from their own end, which matters for shift staff who need access restored while they are on site.' },
  { question: 'What happens to a disabled sub-user\'s allocated AI instances?', answer: 'They typically return to the parent account\'s available pool once the sub-user is disabled, freeing that detection capacity to be reassigned elsewhere rather than sitting unused against an inactive account.' },
  { question: 'Can a sub-user see other sub-users on the account?', answer: 'Not by default. Sub-user visibility is scoped by permission group, and seeing the account\'s user list is its own permission — a Guard or Auditor role typically won\'t see who else has been invited unless that access is explicitly granted.' },
  { question: 'What does "Invited" mean, and how long does it last?', answer: 'Invited means the account has been created and a role, sites, and any instance allocation assigned, but the person hasn\'t accepted the invite and logged in yet — their status flips to Active on first login. An invite that\'s never accepted stays in that pending state until it\'s accepted or the invite is revoked.' },
  { question: 'Can one sub-user belong to more than one site?', answer: 'Yes. Site access is assigned per sub-user and isn\'t limited to a single location — a role like Surveillance Manager, for example, can be scoped to several sites at once, such as a retail location and a parking structure.' },
  { question: 'How do instance allocations to a sub-user affect the parent account\'s quota?', answer: 'Each AI feature instance granted to a sub-user is drawn from the parent account\'s licensed capacity — allocating detection instances to a sub-user reduces what\'s available for the parent account or other sub-users until it\'s reassigned or freed up.' },
];

export default function Page() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Platform', href: '/platform' },
      { label: 'Security System User Management' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Role-Based, Site-Scoped Access</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Security System User Management</h1>

          <div className="mt-8 grid items-center gap-8 lg:grid-cols-[2fr_3fr]">
            <p className="text-body text-muted-foreground">User management in Camzify supports sub-users with permission groups — a per-module View, Edit, Delete matrix. Site-level access control limits which locations a user can see. AI feature instance grants let a parent account allocate detection capacity to child accounts.</p>
            <Image
              src="/security-system-user-management.jpg"
              alt="A laptop showing the Camzify User Management screen with the Create Permission Group modal open, including page-access toggles and a View/Create/Edit/Delete instance permissions matrix"
              className="w-full"
              width={1229}
              height={692}
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="mt-12">
            <UserManagementMockup />
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ShieldCheck, title: 'Role-based permission groups', desc: 'Site Admin, Guard, Auditor, Surveillance Manager, or a custom group — each defines exactly what a sub-user can view, edit, or delete.' },
              { icon: Cpu, title: 'Per-user instance allocation', desc: 'AI feature instances (Line Intrusion, Tampering, VPS, and more) can be granted to a sub-user straight from the parent account\'s license.' },
              { icon: MapPin, title: 'Multi-site scoping', desc: 'Each sub-user is scoped to one site, several, or all sites — visibility never has to be all-or-nothing.' },
              { icon: UserCog, title: 'Invite / disable lifecycle', desc: 'Sub-users move cleanly through Invited, Active, and Disabled states without losing their configured role or site scope.' },
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
                <span className="font-mono text-mono-sm uppercase text-primary">Part Of Every Patrol</span>
                <h2 className="mt-2 font-display text-2xl font-bold">One account, many roles</h2>
                <p className="mt-4 text-muted-foreground">
                  This module integrates with <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link> to
                  provide a complete operations picture. Patrol results, detection alerts, and platform status
                  all feed into the same console.
                </p>
                <p className="mt-4 text-muted-foreground">
                  The detailed permission matrix — the exact View, Edit, and Delete grants each of the four
                  built-in groups carries per module — lives on its own page. See{' '}
                  <Link href="/platform/permission-groups" className="text-primary hover:underline">Permission Groups</Link> for
                  the full breakdown, or <Link href="/platform/license-and-instance-management" className="text-primary hover:underline">License & Instance Management</Link> for
                  how AI detection capacity is licensed and allocated in the first place.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <span className="font-mono text-mono-sm uppercase text-primary">Permission Groups</span>
                <div className="mt-4 space-y-3">
                  {[
                    { role: 'Site Admin', desc: 'Broad access across an assigned site' },
                    { role: 'Guard', desc: 'Day-to-day monitoring, limited edit rights' },
                    { role: 'Auditor', desc: 'Read-focused access for review and compliance' },
                    { role: 'Surveillance Manager', desc: 'Manages cameras and detection across sites' },
                  ].map((r) => (
                    <div key={r.role} className="flex items-center justify-between rounded-lg bg-muted/30 px-4 py-2.5">
                      <span className="font-mono text-mono-sm text-primary">{r.role}</span>
                      <span className="text-xs text-muted-foreground">{r.desc}</span>
                    </div>
                  ))}
                </div>
                <Link href="/platform/permission-groups" className="mt-4 inline-block text-sm text-primary hover:underline">See the full permission matrix →</Link>
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
              <Link href="/platform/permission-groups" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Permission Groups</Link>
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
