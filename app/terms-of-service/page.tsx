import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { siteConfig, formattedAddress } from '@/lib/site-config';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data.
 *
 * These are terms for using the website, not the customer agreement for the product.
 * Draft for counsel to review before the site leaves maintenance; governing law
 * follows the company's registration in Singapore.
 */
const pageMeta = {
  title: "Terms of Service",
  description: "The terms for using the Camzify website: what you may do with the content, what we promise and do not promise about it, and how the product itself is governed separately.",
  path: "/terms-of-service",
};

export const metadata = generatePageMeta({ ...pageMeta });

const UPDATED = '7 September 2026';

const faqs = [
  { question: 'Are these the terms for using the Camzify product?', answer: 'No. These terms govern this website. Use of the Camzify console, the cameras connected to it and the data processed there is governed by the customer agreement signed for that account, which takes precedence over anything here for the product.' },
  { question: 'Can I quote or link to pages on this site?', answer: 'Yes. Quote with attribution and link freely. What you may not do is reproduce whole pages, present our content as your own, or use our name and marks to imply an endorsement.' },
  { question: 'Is the information on the site guaranteed to be accurate?', answer: 'We take care to describe the product as it is, and the trust page lists what we deliberately do not claim. Even so, the site is a description, not a contract. What the product will do for you is set out in the quote and the customer agreement.' },
  { question: 'Which law applies?', answer: 'The law of Singapore, where the company is registered, and its courts. If you are a consumer with rights under the law of your own country that cannot be excluded, those rights are unaffected.' },
];

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-12 font-display text-2xl font-bold">{children}</h2>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 max-w-prose text-muted-foreground">{children}</p>;
}

export default function TermsOfServicePage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[{ label: 'Terms of Service' }]} showCTA={false}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Legal · last reviewed {UPDATED}</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Terms of service</h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            <strong className="font-semibold text-foreground">These terms govern your use of the {siteConfig.name} website at {siteConfig.url}.</strong>{' '}
            They are deliberately short. The Camzify product is governed by a separate customer agreement, and nothing here changes that agreement.
          </p>

          <H2>Who you are dealing with</H2>
          <P>
            The website is operated by {siteConfig.legalName}, registered in Singapore, at {formattedAddress}. Questions about these terms go to{' '}
            <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">{siteConfig.email}</a>.
          </P>

          <H2>Using the site</H2>
          <P>
            You may read the site, link to it, and quote from it with attribution. You may not copy whole pages or sections for republication, scrape it for commercial datasets, use our name, logo or product names in a way that suggests we endorse you, or do anything that interferes with the site or the people using it. Automated access for indexing by search engines and answer engines is welcome; the site publishes a sitemap and an llms.txt for that purpose.
          </P>

          <H2>Content and its limits</H2>
          <P>
            We describe the product as it is, and the{' '}
            <Link href="/trust" className="text-primary hover:underline">trust page</Link> lists the figures and claims we deliberately do not publish. The site is still a description, not a contract: what the product will do for a particular site, and on what terms, is set out in the quote and in the customer agreement. Guides and comparisons are general information, not professional, legal or security advice for your circumstances.
          </P>
          <P>
            To the extent the law allows, we provide the site as it is, without warranty that it is error-free or always available, and we are not liable for loss arising from reliance on its content. Nothing in these terms limits liability that cannot be limited by law.
          </P>

          <H2>Intellectual property</H2>
          <P>
            The text, illustrations, screenshots and code of this site belong to {siteConfig.legalName} or are used with permission. Camera manufacturer names and logos on the supported cameras page are the trademarks of their owners and are shown to state interoperability, not partnership. Customer logos are shown with permission.
          </P>

          <H2>Forms and what you send us</H2>
          <P>
            When you send a form, you confirm that the details are yours or that you are authorised to give them, and you agree to our handling of them as described in the{' '}
            <Link href="/privacy-policy" className="text-primary hover:underline">privacy policy</Link>. A demo or trial request is a request, not an order; nothing is agreed until a quote or agreement says so.
          </P>

          <H2>Links to other sites</H2>
          <P>We link to manufacturers, standards bodies and other sites where it helps the reader. We do not control those sites and are not responsible for their content or their handling of your data.</P>

          <H2>Changes</H2>
          <P>We may update these terms and will change the date at the top when we do. Continued use of the site after a change is acceptance of the new terms.</P>

          <H2>Governing law</H2>
          <P>These terms are governed by the law of Singapore and any dispute is subject to the jurisdiction of its courts, without affecting rights you have as a consumer under the law of your own country that cannot be excluded.</P>
        </div>
      </section>

      <FaqSection items={faqs} />
    </PageShell>
  );
}
