import { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { generateBreadcrumbSchema } from '../../lib/seo/jsonld';
import { JsonLd } from '../../components/shared/JsonLd';
import { Search, ShieldCheck, RefreshCw, Users } from 'lucide-react';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: 'About AIFind | AI Tool Discovery Platform',
    description: 'Learn how AIFind helps professionals, creators, and teams discover, compare, and choose the right AI tools for their work.',
    canonicalUrl: 'https://aifind.io/about'
  });
}

export default async function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://aifind.io' },
    { name: 'About', url: 'https://aifind.io/about' }
  ]);

  return (
    <div className="space-y-10 max-w-3xl mx-auto">
      <JsonLd schema={breadcrumbSchema} />

      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-lg text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">About AIFind</h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          An independent AI tools directory and discovery engine built to help you find the right software for any task.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">What AIFind Does</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            AIFind is a curated directory of artificial intelligence tools and software. We organize tools by category, pricing model, and professional role so you can quickly narrow down options that fit your workflow. Every listing includes key specifications, pricing details, and feature breakdowns to support side-by-side comparison.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            We do not build or sell the tools listed here. AIFind is a discovery and comparison resource. Each tool links to its official website where you can sign up or learn more directly from the provider.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-2">
            <Search className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-sm">Structured Discovery</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Filter by category, pricing, platform, and API availability to find tools that match your requirements.</p>
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-sm">Verification Badges</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Listings marked as verified have been checked for accurate pricing and feature claims at the time of review.</p>
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-2">
            <RefreshCw className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-sm">Regular Updates</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Tool listings are reviewed periodically. Last-verified dates appear on each profile when available.</p>
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-2">
            <Users className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-sm">Role-Based Guides</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Browse recommendations tailored to specific professions and workflows via our role-based pages.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Editorial Independence</h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          AIFind may earn referral commissions when users sign up for certain tools through links on this site. This does not affect placement in editorial rankings or comparison tables. Tool ratings reflect publicly available information and community feedback, not payment arrangements.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed">
          We do not guarantee that any tool will meet your specific needs. Always review a tool&rsquo;s official website, terms of service, and pricing before making a purchase decision.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Get in Touch</h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          Have a tool you&rsquo;d like listed, or found something out of date? Visit our <Link href="/contact" className="text-emerald-600 font-bold hover:text-emerald-500">contact page</Link> to reach us. For how we handle data, read our <Link href="/privacy" className="text-emerald-600 font-bold hover:text-emerald-500">privacy policy</Link> and <Link href="/terms" className="text-emerald-600 font-bold hover:text-emerald-500">terms of use</Link>.
        </p>
      </div>
    </div>
  );
}
