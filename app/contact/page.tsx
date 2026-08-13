import { Metadata } from 'next';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { SITE_NAME, sitePageTitle } from '../../lib/brand';
import {
  Mail,
  MessageSquare,
  Share2,
  Bug,
  Briefcase,
  Send,
  Clock3,
  ShieldAlert,
  MapPin,
} from 'lucide-react';

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: sitePageTitle(`Contact ${SITE_NAME} - Editorial, Press, Listings & Support`),
    description:
      `Contact the ${SITE_NAME} team for new tool submissions, listing corrections, press and media requests, partnerships, research studies, or bug reports from our public directory.`,
    canonicalUrl: '/contact',
  });
}

const REASONS: Array<{
  key: string;
  Icon: any;
  label: string;
  email: string;
  detail: string;
}> = [
  {
    key: 'listing',
    Icon: Share2,
    label: 'Suggest / List a Tool',
    email: 'listings@aifind.io',
    detail: 'Share an AI product we should review, or request a missing listing.',
  },
  {
    key: 'correction',
    Icon: Bug,
    label: 'Report an Error / Correction',
    email: 'editors@aifind.io',
    detail: 'Outdated pricing, broken link, or incorrect feature flag on any listing.',
  },
  {
    key: 'press',
    Icon: MessageSquare,
    label: 'Press & Media',
    email: 'press@aifind.io',
    detail: 'Interview requests, data licensing, or comment for your publication.',
  },
  {
    key: 'partners',
    Icon: Briefcase,
    label: 'Partnerships & Business',
    email: 'partners@aifind.io',
    detail: 'Integrations, brand campaigns, co-marketing or directory API access.',
  },
  {
    key: 'privacy',
    Icon: ShieldAlert,
    label: 'Privacy & Security',
    email: 'privacy@aifind.io',
    detail: 'Security disclosures, GDPR requests, or data concerns.',
  },
  {
    key: 'general',
    Icon: Mail,
    label: 'General Questions',
    email: 'hello@aifind.io',
    detail: 'Anything else and we will route it to the right person.',
  },
];

export default function ContactPage() {
  return (
    <div className="space-y-14 pb-16">
      <section className="bg-inverted text-inverted-foreground rounded-3xl p-8 sm:p-12 shadow-lg max-w-5xl mx-auto text-center space-y-5">
        <div className="inline-flex items-center gap-1.5 bg-accent/10 border border-accent/30 text-accent px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <Mail className="w-4 h-4 text-accent" />
          Contact
        </div>
        <h1 className="text-3xl sm:text-5xl font-medium tracking-tight leading-tight">
          Get In Touch With The {SITE_NAME} Team
        </h1>
        <p className="text-sm sm:text-base text-inverted-foreground/70 max-w-2xl mx-auto leading-relaxed">
          Pick the topic that matches best and we will get back to you within one business day. We
          read every message personally.
        </p>
      </section>

      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {REASONS.map(({ key, Icon, label, email, detail }) => (
          <a
            key={key}
            href={`mailto:${email}?subject=${encodeURIComponent(SITE_NAME)}%20-%20${encodeURIComponent(label)}`}
            className="group bg-background-raised rounded-2xl border border-border/50 hover:border-accent/30 shadow-sm hover:shadow-md p-6 space-y-3 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent/15 transition-colors">
                <Icon className="w-5 h-5" />
              </div>
              <Send className="w-4 h-4 text-inverted-foreground/70 group-hover:text-accent transition-colors" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-medium text-foreground-strong group-hover:text-accent transition-colors">
                {label}
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">{detail}</p>
            </div>
            <code className="block text-[11px] font-mono font-semibold text-accent bg-accent/10 border border-accent/20 px-2.5 py-1.5 rounded-lg">
              {email}
            </code>
          </a>
        ))}
      </section>

      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2 bg-background-raised rounded-2xl border border-border/50 shadow-sm p-7 sm:p-8 space-y-5">
          <h2 className="text-xl font-medium tracking-tight text-foreground-strong">
            Send Us A Message
          </h2>
          <form
            action="mailto:hello@aifind.io"
            method="post"
            encType="text/plain"
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm"
          >
            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">Name</label>
              <input
                required
                name="name"
                type="text"
                placeholder="Your name"
                className="w-full bg-background border border-border/50 rounded-xl px-3.5 py-2.5 text-sm text-foreground-strong focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">Email</label>
              <input
                required
                name="email"
                type="email"
                placeholder="you@company.com"
                className="w-full bg-background border border-border/50 rounded-xl px-3.5 py-2.5 text-sm text-foreground-strong focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-foreground mb-1.5">Topic</label>
              <select
                name="topic"
                defaultValue="general"
                className="w-full bg-background border border-border/50 rounded-xl px-3.5 py-2.5 text-sm text-foreground-strong focus:outline-none focus:ring-2 focus:ring-accent"
              >
                {REASONS.map((r) => (
                  <option key={r.key} value={r.key}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-foreground mb-1.5">Message</label>
              <textarea
                required
                rows={6}
                name="message"
                placeholder="Tell us what you need..."
                className="w-full bg-background border border-border/50 rounded-xl px-3.5 py-2.5 text-sm text-foreground-strong focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              />
            </div>
            <div className="sm:col-span-2 pt-1">
              <button
                type="submit"
                className="bg-primary hover:bg-foreground/90 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </div>
          </form>
        </div>

        <aside className="bg-gradient-to-br from-inverted to-inverted text-white rounded-2xl shadow-sm p-7 sm:p-8 space-y-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-accent">
            Response Times
          </h3>
          <ul className="space-y-3.5 text-xs text-inverted-foreground/80">
            <li className="flex gap-3">
              <Clock3 className="w-4 h-4 shrink-0 text-accent mt-0.5" />
              <span>
                <strong className="text-white">Editorial / Listings:</strong> within 24 hours on
                business days.
              </span>
            </li>
            <li className="flex gap-3">
              <Bug className="w-4 h-4 shrink-0 text-rating mt-0.5" />
              <span>
                <strong className="text-white">Bug / Correction reports:</strong> same-day triage.
              </span>
            </li>
            <li className="flex gap-3">
              <Briefcase className="w-4 h-4 shrink-0 text-sky-400 mt-0.5" />
              <span>
                <strong className="text-white">Partnerships:</strong> within 2-3 business days.
              </span>
            </li>
          </ul>
          <div className="pt-4 border-t border-inverted-foreground/20 space-y-2.5 text-xs text-inverted-foreground/70">
            <div className="flex gap-2 items-start">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-muted-foreground mt-0.5" />
              <span>
                Distributed editorial &amp; engineering team across North America and EU.
              </span>
            </div>
            <div className="flex gap-2 items-start">
              <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-muted-foreground mt-0.5" />
              <span>
                For security disclosures please email{' '}
                <code className="bg-inverted-foreground/10 text-accent rounded px-1.5 py-0.5">
                  security@aifind.io
                </code>
                .
              </span>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
