import { Metadata } from 'next';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { SITE_NAME, sitePageTitle } from '../../lib/brand';
import {
  ShieldCheck,
  Database,
  Eye,
  Lock,
  Cookie,
  UserCheck,
  Globe2,
  ShieldAlert,
  FileCheck,
  MailCheck,
} from 'lucide-react';

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: sitePageTitle(`Privacy Policy (${SITE_NAME}, Updated 2026)`),
    description:
      `Read the ${SITE_NAME} privacy policy: what personal data we collect, how cookies are used, third-party analytics, your rights under GDPR and CCPA, and how to contact our data protection officer.`,
    canonicalUrl: '/privacy',
  });
}

const LAST_UPDATED = 'August 7, 2026';

const SECTIONS: Array<{
  Icon: any;
  title: string;
  body: Array<string>;
}> = [
  {
    Icon: Eye,
    title: '1. Information We Collect',
    body: [
      'TheRadarHub collects a minimal amount of personal data necessary to operate, improve and secure our AI tools directory.',
      'Voluntary submissions: when you email us, submit a listing suggestion, or sign up to the weekly digest we capture your name, email address and any message content you provide.',
      'Product usage: server logs (IP address, user agent, referrer, timestamp) and anonymized analytics events are retained for up to 30 days for abuse prevention and site reliability.',
      'User reviews: any author name, rating, comment or role you submit via the reviews feature is stored alongside the applicable tool listing.',
    ],
  },
  {
    Icon: Database,
    title: '2. How We Use Your Information',
    body: [
      'Operate and maintain the directory, load listings, compute ratings and surface comparisons.',
      'Respond to inbound correspondence, listing requests, corrections and support questions.',
      'Deliver the weekly AI digest if you subscribed (with one-click unsubscribe in every send).',
      'Detect abuse, prevent scraping or credential stuffing, and investigate security incidents.',
      'Aggregated, anonymized statistics may be used in case studies, investor updates or marketing content without identifying any individual user.',
    ],
  },
  {
    Icon: Cookie,
    title: '3. Cookies & Similar Technologies',
    body: [
      'Essential cookies: we set a signed, HttpOnly session cookie named admin_session exclusively for authenticated administrators. This cookie expires after one hour and is never used for tracking.',
      'Analytics: anonymized page view and interaction telemetry collected in first-party context, retained for 13 months and not sold to any third party.',
      'You can disable non-essential cookies via your browser controls; core directory functionality remains fully available without them.',
    ],
  },
  {
    Icon: Globe2,
    title: '4. Third-Party Services & Data Sharing',
    body: [
      'Hosting & infrastructure: pages and API endpoints may be served by a managed Next.js cloud provider. Logs and runtime metrics are covered by the provider data processing agreement.',
      'Analytics providers: aggregated usage insights used to improve discovery and relevance, with IP pseudonymization enabled where applicable.',
      'We do not sell, rent or swap personal email addresses with advertisers. Brand partnerships are clearly labeled on the applicable listing and never bypass your consent choices.',
    ],
  },
  {
    Icon: Lock,
    title: '5. Security & Retention',
    body: [
      'In transit: all traffic to TheRadarHub is served over HTTPS with HSTS enabled and TLS 1.2+ enforced.',
      'At rest: application databases are encrypted, credentials are stored in environment-managed secrets, and admin sessions use signed, short-lived tokens.',
      'Retention: logs and pseudonymized analytics data are deleted on a rolling 30-365 day schedule depending on category. Subscriber emails are retained until unsubscribe.',
    ],
  },
  {
    Icon: UserCheck,
    title: '6. Your Rights (GDPR, CCPA & Beyond)',
    body: [
      'Right of access: receive a copy of personal data we hold about you.',
      'Right of rectification: correct incomplete or incorrect records.',
      'Right of erasure / "right to be forgotten": request permanent deletion of your account and associated data.',
      'Right to restrict processing, data portability and right to object where applicable.',
      'To exercise any of these rights email privacy@aifind.io with a clear subject line. We respond within 30 days.',
    ],
  },
  {
    Icon: ShieldAlert,
    title: '7. Children and Minors',
    body: [
      'TheRadarHub is a professional directory and is not directed to children under the age of 16.',
      'We do not knowingly collect personal information from children. If you believe a child has submitted data to us, contact privacy@aifind.io and we will delete it promptly.',
    ],
  },
  {
    Icon: FileCheck,
    title: '8. Changes To This Policy',
    body: [
      'We will update this page when our practices change, with a refreshed "Last Updated" date at the top.',
      'Material changes (new processing purposes, new third parties or new rights) will be announced on the site and, where required by law, sent to subscribed contacts.',
    ],
  },
  {
    Icon: MailCheck,
    title: '9. Contact the Data Protection Team',
    body: [
      'Data protection enquiries and DPO contact: privacy@aifind.io.',
      'Security incident disclosures: security@aifind.io (encrypted mail accepted on request).',
      'Mailing address on file available upon request for regulated entities and supervisory authorities.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-16">
      <header className="space-y-4 text-center">
        <div className="inline-flex items-center gap-1.5 bg-accent/10 border border-accent/30 text-accent px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-accent" />
          Privacy Policy
        </div>
        <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-foreground-strong">
          How TheRadarHub Protects Your Privacy
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Last updated <span className="font-semibold text-foreground-strong">{LAST_UPDATED}</span>. This
          policy explains what information the TheRadarHub directory collects, why it is processed, and
          the concrete controls you have over your data.
        </p>
      </header>

      <div className="space-y-8">
        {SECTIONS.map(({ Icon, title, body }) => (
          <section
            key={title}
            className="bg-background-raised rounded-2xl border border-border/50 shadow-sm p-6 sm:p-8 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-medium tracking-tight text-foreground-strong">{title}</h2>
            </div>
            <ul className="space-y-2.5 pl-13 list-none">
              {body.map((line, idx) => (
                <li
                  key={idx}
                  className="text-sm text-foreground leading-relaxed flex gap-2.5"
                >
                  <span className="mt-[0.55rem] w-1.5 h-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="text-center text-xs text-muted-foreground pt-2">
        &copy; {new Date().getFullYear()} TheRadarHub Platform &middot; Policy document hash updated at
        publication.
      </div>
    </div>
  );
}
