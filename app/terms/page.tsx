import { Metadata } from 'next';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { SITE_NAME, sitePageTitle } from '../../lib/brand';
import {
  Scale,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Gavel,
  Handshake,
  BookmarkCheck,
  Ban,
  ShieldAlert,
  MessagesSquare,
} from 'lucide-react';

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: sitePageTitle(`Terms of Service (${SITE_NAME}, Updated 2026)`),
    description:
      `Terms of Service for the ${SITE_NAME} AI tools discovery platform: acceptable use policy, directory listing guidelines, user reviews, disclaimers of warranty, limitation of liability, and applicable law.`,
    canonicalUrl: '/terms',
  });
}

const LAST_UPDATED = 'August 7, 2026';

const SECTIONS: Array<{
  Icon: any;
  title: string;
  body: Array<string>;
}> = [
  {
    Icon: FileText,
    title: '1. Acceptance of Terms',
    body: [
      'By accessing or using this website or any associated subdomains, APIs or branded directory tools (collectively, the "Service"), you agree to be bound by these Terms of Service and our Privacy Policy.',
      'If you do not agree with any part of these terms, you must discontinue use of the Service immediately.',
      'These terms apply to all visitors, registered users, subscribers, paying customers and business partners.',
    ],
  },
  {
    Icon: Gavel,
    title: '2. Description of the Service',
    body: [
      'TheRadarHub provides a curated directory, comparison engine and discovery resource for commercially available artificial intelligence software products ("Tool Listings").',
      'Tool Listings contain metadata, feature flags, pricing summaries, third-party review extracts and editorial commentary. They are provided for informational purposes only.',
      'We do not operate, resell or license the underlying AI products themselves; pricing and availability shown on our pages may differ from the vendor offer at the moment of purchase.',
    ],
  },
  {
    Icon: BookmarkCheck,
    title: '3. Your Account and Responsibilities',
    body: [
      'Where an account is created (for example, an admin CMS account) you are responsible for safeguarding credentials, keeping contact details current, and not sharing passwords.',
      'You agree to provide accurate information when submitting user reviews, listing corrections, or tool suggestions.',
      'You agree not to use the Service in any way that violates applicable local, national or international law or regulation.',
    ],
  },
  {
    Icon: Ban,
    title: '4. Acceptable Use Policy',
    body: [
      'No automated scraping, crawling, bulk mirroring or API-style extraction of directory pages, ratings or pricing data without a written commercial agreement.',
      'No fraudulent reviews, impersonation of another person, or rating manipulation of any tool listing.',
      'No circumvention of rate limits, no injection of malware, no credential stuffing and no attempt to bypass authentication controls.',
      'Violations may result in IP blocks, account termination and, where appropriate, referral to law enforcement.',
    ],
  },
  {
    Icon: MessagesSquare,
    title: '5. User-Generated Content (Reviews, Comments)',
    body: [
      'You retain ownership of content you submit to the Service (reviews, comments, listing suggestions). By submitting it, you grant TheRadarHub a non-exclusive, royalty-free, worldwide license to host, display, moderate and republish that content in connection with directory listings.',
      'We may remove or edit user content for violations of this policy, legal risk or quality reasons without prior notice.',
      'You are solely responsible for the content you submit and the consequences of publishing it.',
    ],
  },
  {
    Icon: Handshake,
    title: '6. Brand Partnerships, Affiliate Links and Advertisements',
    body: [
      'Some tool listing pages may display partner badges or commission-earning outbound links (affiliate links) where a vendor has an active partnership program.',
      'Every commercial relationship is clearly labeled on the applicable listing page, on the page footer, or inside the corresponding module.',
      'Advertising and partnerships never influence star ratings, verification status, or core editorial ranking decisions.',
      'Specific terms for partners are covered by a separate written agreement.',
    ],
  },
  {
    Icon: AlertTriangle,
    title: '7. Disclaimers of Warranties',
    body: [
      'THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY OR OTHERWISE.',
      'TheRadarHub expressly disclaims all warranties of merchantability, fitness for a particular purpose, title, non-infringement, accuracy, completeness and currency of Tool Listings.',
      'We do not guarantee that the Service will be uninterrupted, error-free, secure or free of harmful components.',
    ],
  },
  {
    Icon: Scale,
    title: '8. Limitation of Liability',
    body: [
      'TO THE FULLEST EXTENT PERMITTED BY LAW, TheRadarHub, its officers, employees, partners and affiliates SHALL NOT BE LIABLE for any indirect, incidental, special, consequential or punitive damages, including lost revenue, lost savings, loss of data or business interruption, arising from your use of the Service.',
      'In no event shall total aggregate liability under these terms exceed the greater of (a) fees paid by you to TheRadarHub in the prior twelve months, or (b) one hundred USD ($100.00).',
      'This section applies regardless of the legal theory under which liability is asserted.',
    ],
  },
  {
    Icon: ShieldAlert,
    title: '9. Indemnification',
    body: [
      'You agree to defend, indemnify and hold harmless TheRadarHub from and against any and all claims, damages, costs, losses and expenses (including reasonable legal fees) arising out of your use of the Service, your violation of these Terms, or any content you submit.',
      'We will notify you promptly of any indemnifiable claim and reasonably cooperate with your defense at your expense.',
    ],
  },
  {
    Icon: FileText,
    title: '10. Termination, Modification & Governing Law',
    body: [
      'We may modify the Service or these Terms at any time, with a refreshed "Last Updated" date and site notice for material changes.',
      'Continued use of the Service after changes are published constitutes your acceptance of the revised Terms.',
      'These Terms are governed by and construed in accordance with the laws of the jurisdiction in which TheRadarHub\'s principal business is registered, without regard to conflict of law principles. Disputes shall first be resolved through good-faith negotiation before any formal proceeding.',
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-16">
      <header className="space-y-4 text-center">
        <div className="inline-flex items-center gap-1.5 bg-inverted/5 border border-primary/10 text-foreground-strong px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <Scale className="w-4 h-4 text-foreground-strong" />
          Terms of Service
        </div>
        <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-foreground-strong">
          TheRadarHub Terms of Service
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Last updated <span className="font-semibold text-foreground-strong">{LAST_UPDATED}</span>. Please
          read these terms carefully before using the TheRadarHub directory. They explain the rules for
          using our Service and the scope of what we provide.
        </p>
      </header>

      <div className="bg-background-raised border border-border/50 rounded-2xl p-5 sm:p-6 flex gap-4 items-start">
        <CheckCircle2 className="w-5 h-5 shrink-0 text-foreground mt-0.5" />
        <p className="text-sm text-foreground leading-relaxed">
          <strong className="font-medium">Short version:</strong> Use the directory ethically,
          do not scrape it, be honest in reviews, and understand that tool metadata is best-effort
          editorial information rather than a vendor-validated contract. The full legal terms
          follow below.
        </p>
      </div>

      <div className="space-y-7">
        {SECTIONS.map(({ Icon, title, body }) => (
          <section
            key={title}
            className="bg-background-raised rounded-2xl border border-border/50 shadow-sm p-6 sm:p-8 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-foreground/5 text-foreground-strong flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-medium tracking-tight text-foreground-strong">{title}</h2>
            </div>
            <ul className="space-y-2.5 list-none">
              {body.map((line, idx) => (
                <li key={idx} className="text-sm text-foreground leading-relaxed flex gap-2.5">
                  <span className="mt-[0.55rem] w-1.5 h-1.5 shrink-0 rounded-full bg-muted-foreground" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="text-center text-xs text-muted-foreground pt-2 space-y-1">
        <div>
          Questions about these Terms? Contact{' '}
          <a
            href="/contact"
            className="font-semibold text-foreground hover:text-foreground-strong underline underline-offset-2"
          >
            our legal team
          </a>
          .
        </div>
        <div>&copy; {new Date().getFullYear()} TheRadarHub Platform. All rights reserved.</div>
      </div>
    </div>
  );
}
