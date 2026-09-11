import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { siteConfig, formattedAddress } from '@/lib/site-config';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data.
 *
 * Written from what the site actually does, checked in code on 2026-09-07: four forms
 * that email what a visitor types to the team (and store it once the database is connected), no analytics or advertising
 * scripts, a theme preference and two session flags in browser storage, and no
 * emails sent by the site. Company details come from lib/site-config.ts. This is a
 * draft for counsel to review before the site leaves maintenance; the review date
 * below is the date it was written, not the date it was approved.
 */
const pageMeta = {
  title: "Privacy Policy",
  description: "What the Camzify website collects, why, where it is kept, who can see it, and the rights you have over it. A draft awaiting counsel.",
  path: "/privacy-policy",
};

export const metadata = generatePageMeta({ ...pageMeta });

const UPDATED = '7 September 2026';

const faqs = [
  { question: 'Does this policy cover the Camzify product, or just the website?', answer: 'Just this website. Video, detections, patrol reports and account data in the Camzify console are processed under the customer agreement for that account, and the security and compliance page describes how that data is protected. This policy covers what happens when you read these pages or send us a form.' },
  { question: 'Do you sell or share my details with advertisers?', answer: 'No. There are no advertising networks or analytics services on this site. What you send us is stored with our hosting and database providers so we can reply, and is not sold, rented or shared for marketing by anyone else.' },
  { question: 'How do I get my details deleted?', answer: 'Email us at the address on this page from the address you used, and say what you want removed. We will confirm when it is done. You can also ask what we hold about you and have it corrected.' },
  { question: 'Why did I receive an email from Camzify when I never filled in a form?', answer: 'Because we contact businesses that we believe would benefit from the product, using business contact details from public or licensed business sources, on the basis of legitimate interest. Every such email says who we are and how to stop further ones, and a single reply asking us to stop is enough.' },
];

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-12 font-display text-2xl font-bold">{children}</h2>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 max-w-prose text-muted-foreground">{children}</p>;
}

export default function PrivacyPolicyPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[{ label: 'Privacy Policy' }]} showCTA={false}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Legal · last reviewed {UPDATED}</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Privacy policy</h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            <strong className="font-semibold text-foreground">This policy describes what the {siteConfig.name} website collects about you, why, where it is kept, who can see it, and what you can ask us to do with it.</strong>{' '}
            It is written from what the site actually does rather than from a template, so it is shorter than most. Where we do not do something, we say so.
          </p>

          <H2>Who we are</H2>
          <P>
            The website at {siteConfig.url} is operated by {siteConfig.legalName}, a company registered in Singapore, at {formattedAddress}. For anything in this policy, write to{' '}
            <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">{siteConfig.email}</a> or call {siteConfig.phone}. We are the data controller for the personal data described here.
          </P>

          <H2>What this policy covers, and what it does not</H2>
          <P>
            It covers this website: the pages you read and the forms you send. It does not cover the Camzify console, the cameras connected to it, or the video, detections and reports processed there. That data belongs to the customer whose account it is and is processed under the agreement for that account; the{' '}
            <Link href="/security-and-compliance" className="text-primary hover:underline">security and compliance page</Link> describes how it is protected.
          </P>

          <H2>What we collect</H2>
          <P>
            <strong className="font-semibold text-foreground">What you send us.</strong> The site has four forms. The contact form stores your name, email address, a subject and your message. The demo request and trial request forms store your name, email address, your company name if you give it, and the number of cameras you tell us about. The newsletter form stores your email address. Nothing on these forms is required beyond your name, your email address and, for the contact form, your message.
          </P>
          <P>
            <strong className="font-semibold text-foreground">What your browser sends.</strong> Like any website, ours is served by a hosting provider that records the technical details of each request, such as your IP address, browser type, the page requested and the time. We use those records to keep the site running and secure, not to profile you.
          </P>
          <P>
            <strong className="font-semibold text-foreground">What we do not collect.</strong> There are no analytics services, advertising networks or tracking pixels on this site. We do not build profiles of visitors, and we do not know who you are unless you tell us.
          </P>

          <H2>Why we use it, and on what basis</H2>
          <P>
            We use what you send through a form to do what you asked: reply to your message, arrange a demo or a trial, send the newsletter you subscribed to, and prepare a quote if you want one. The legal basis is that you asked us to, and, for follow-up about the product you enquired about, our legitimate interest in answering that enquiry properly. Under Singapore&apos;s Personal Data Protection Act this is consent given by your submission; under the GDPR, for visitors in the European Economic Area and the United Kingdom, it is performance of steps at your request and legitimate interest.
          </P>
          <P>
            We also contact businesses we have not met, using business contact details from public or licensed business sources, to tell them about the product. We do this on the basis of legitimate interest, only to business addresses, and every such message says who we are and how to stop further ones. If you tell us to stop, we stop.
          </P>

          <H2>Where it is kept, and for how long</H2>
          <P>
            Form submissions are emailed to our team through a transactional email provider (ZeptoMail, operated by Zoho) and, once our lead database is connected, also stored in a database operated with our hosting and database providers. These providers process it on our instructions and may do so in countries other than yours, including outside Singapore, the EEA and the UK, under contracts that require them to protect it. We keep an enquiry for as long as we are dealing with it and for a reasonable period afterwards so that we can pick the conversation up if you come back; a newsletter address is kept until you unsubscribe. If you ask us to delete what we hold about you, we do, unless a legal obligation requires us to keep a record.
          </P>

          <H2>Who can see it</H2>
          <P>
            The people at {siteConfig.company} who answer enquiries, and the providers who host the site, deliver the email and, when connected, the database. We do not sell personal data, we do not share it with advertisers, and we do not pass it to anyone else except where the law requires it or you ask us to.
          </P>

          <H2>Cookies and browser storage</H2>
          <P>
            This site sets no advertising or analytics cookies. It keeps a small amount of information in your browser to remember your light or dark theme choice and whether you have dismissed a notice during your visit. The{' '}
            <Link href="/cookie-policy" className="text-primary hover:underline">cookie policy</Link> lists each item.
          </P>

          <H2>Your rights</H2>
          <P>
            You can ask us what personal data we hold about you, ask us to correct it, ask us to delete it, and withdraw consent for anything that rests on consent, such as the newsletter. Visitors in the EEA and the UK also have the right to object to processing based on legitimate interest, to restrict processing, and to receive their data in a portable form. To exercise any of these, email{' '}
            <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">{siteConfig.email}</a> from the address you used with us. We will respond within the time the applicable law allows, and usually much sooner. If you are not satisfied, you may complain to the Personal Data Protection Commission in Singapore or to the supervisory authority in your own country.
          </P>

          <H2>Children</H2>
          <P>This is a business website and is not directed at children. We do not knowingly collect personal data from anyone under 18.</P>

          <H2>Changes</H2>
          <P>
            If we change what the site collects, for example by adding an analytics service, we will update this policy first and change the date at the top. This version was written on {UPDATED} from the site as it was on that day.
          </P>

          <H2>Contact</H2>
          <P>
            {siteConfig.legalName}, {formattedAddress}. Email{' '}
            <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">{siteConfig.email}</a>, telephone {siteConfig.phone}.
          </P>
        </div>
      </section>

      <FaqSection items={faqs} />
    </PageShell>
  );
}
