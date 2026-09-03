import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FAQAccordion } from '@/components/content/faq-accordion';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { HowToSteps, HowToNote, type HowToStep } from '@/components/content/how-to-steps';
import { howToSchema } from '@/lib/seo';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "How to Manage Sub-Users and Quotas | Delegated Access Guide",
  description: "Build a permission group from page access and CRUD rights, add sub-users, assign sites and cameras, allocate license quota from what you hold, and handle quota requests.",
  path: "/guides/how-to-manage-sub-users-and-quotas",
};

export const metadata = generatePageMeta({ ...pageMeta, type: 'article' });

const steps: HowToStep[] = [
  {
    name: 'Build the permission group before the user',
    text: 'A permission group combines page-level access — which pages a user can open — with create, read, update and delete rights per resource. Define it once and reuse it, rather than reasoning about one person at a time. Disabling a page also removes its CRUD permissions, so there is no state where someone holds edit rights over something they cannot reach.',
  },
  {
    name: 'Add the sub-user and assign exactly one group',
    text: 'Set their details and either choose a password or generate one. Each user carries exactly one permission group, which is deliberate: overlapping roles are where access control quietly becomes unauditable, because nobody can say what a given person can actually do without resolving several groups in their head.',
  },
  {
    name: 'Assign sites and cameras explicitly',
    text: 'Pick the sites and cameras that user can reach, with snapshot previews to confirm you have the right ones. Grant the narrowest set that lets them do their job — a contractor covering one site should not be able to open another, and site-scoped access is what makes a multi-tenant or landlord arrangement workable at all.',
  },
  {
    name: 'Allocate quota out of what you actually hold',
    text: 'Grant AI feature instances, streams, patrolling instances and backup storage from your own unused allocation. You cannot give away more than you hold after your own usage and other grants, so the arithmetic is enforced rather than left to you to track.',
  },
  {
    name: 'Handle quota requests instead of over-provisioning',
    text: 'When a sub-user reaches a limit they are offered a request form, and it arrives in your Quota Requests tab to approve or decline. This is the reason not to over-allocate up front: the request flow surfaces genuine demand with a name attached, rather than quota sitting unused because someone asked for headroom once.',
  },
];

const faqs = [
  {
    question: 'Can a sub-user create their own sub-users?',
    answer: 'Yes, on the same model. They can create users beneath them, assign a permission group, and allocate sites, cameras, feature instances and backup storage from their own unused quota — never more than they hold. Subscription end date and pricing remain parent-admin-only, so a delegated administrator can run their part of the account without touching commercial terms. This is what makes the model work for managed service providers and for landlords with tenants.',
  },
  {
    question: 'What happens when a sub-user hits a license limit?',
    answer: 'They see the limit and are offered a quota request rather than a dead end. The request lands with the parent account, which approves it if there is enough unallocated quota or declines it. Nothing is granted automatically.',
  },
  {
    question: 'Can I suspend someone without deleting their account?',
    answer: 'Yes. Deactivating blocks sign-in while keeping their allocation and data reserved, so a contractor between engagements or staff on extended leave can be restored later without rebuilding their access. Deleting is a separate, permanent action.',
  },
  {
    question: 'How do I prove who changed what?',
    answer: 'Account activity is logged and filterable, covering sign-ins, security changes, configuration changes, feature activity and user-management actions. That record is what answers an auditor asking who changed a retention policy or who added a camera, and it is visible to the account holder rather than something you request from us.',
  },
];

export default function Page() {
  return (
    <PageShell
      {...pageMeta}
      faqs={faqs}
      schema={[howToSchema({ name: 'How to manage sub-users and quotas in Camzify', description: pageMeta.description, path: pageMeta.path, steps })]}
      breadcrumbs={[{ label: 'Guides', href: '/guides' }, { label: 'How to Manage Sub-Users and Quotas' }]}
    >
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Guide</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">How to manage sub-users and quotas</h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            <strong className="font-semibold text-foreground">
              Delegated access has two halves: what someone can see and do, and how much of your
              license they are allowed to consume.
            </strong>{' '}
            This guide covers both, and the request flow that handles it when someone runs out. See
            also{' '}
            <Link href="/platform/permission-groups" className="text-primary hover:underline">permission groups</Link> and{' '}
            <Link href="/platform/license-and-instance-management" className="text-primary hover:underline">license and instance management</Link>.
          </p>

          <HowToSteps steps={steps} />

          <HowToNote>
            Grant the narrowest access that lets someone do the job, then widen it when they ask.
            It is the one access-control habit that survives staff turnover: permissions granted
            generously at setup are almost never reviewed afterwards, and an account that has been
            running for two years usually cannot say why half its grants exist.
          </HowToNote>

          <div className="mt-14">
            <ScrollReveal>
              <p className="max-w-prose text-muted-foreground">
                Related:{' '}
                <Link href="/platform/user-management" className="text-primary hover:underline">user management</Link>,{' '}
                <Link href="/partners/for-managed-service-providers" className="text-primary hover:underline">for managed service providers</Link>, and{' '}
                <Link href="/trust" className="text-primary hover:underline">what we log</Link>.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div className="rounded-2xl border border-border bg-card p-8 sm:p-10">
            <span className="font-mono text-mono-sm uppercase text-primary">FAQ</span>
            <h2 className="mt-2 font-display text-2xl font-bold">Frequently asked questions</h2>
            <div className="mt-6">
              <FAQAccordion items={faqs} />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
