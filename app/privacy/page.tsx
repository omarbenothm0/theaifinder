import { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { generateBreadcrumbSchema } from '../../lib/seo/jsonld';
import { JsonLd } from '../../components/shared/JsonLd';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: 'Privacy Policy | AIFind',
    description: 'How AIFind collects, uses, and protects visitor data. Read our full privacy policy covering cookies, analytics, and third-party links.',
    canonicalUrl: 'https://aifind.io/privacy'
  });
}

export default async function PrivacyPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://aifind.io' },
    { name: 'Privacy Policy', url: 'https://aifind.io/privacy' }
  ]);

  return (
    <div className="space-y-10 max-w-3xl mx-auto">
      <JsonLd schema={breadcrumbSchema} />

      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-lg text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Last updated: August 2026</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-8">
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">Overview</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            This policy explains what information AIFind (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects when you visit aifind.io, how we use it, and the choices you have. We aim to collect only what is necessary to operate the directory and improve the experience.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">Information We Collect</h2>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2"><span className="text-emerald-600 font-bold mt-0.5">&bull;</span><span><strong>Usage data:</strong> Pages visited, referring URLs, browser type, and approximate location. This is collected anonymously and in aggregate.</span></li>
            <li className="flex items-start gap-2"><span className="text-emerald-600 font-bold mt-0.5">&bull;</span><span><strong>Newsletter email:</strong> If you subscribe via the footer form, we store your email address to send updates. You can unsubscribe at any time.</span></li>
            <li className="flex items-start gap-2"><span className="text-emerald-600 font-bold mt-0.5">&bull;</span><span><strong>Contact form submissions:</strong> Name, email, and message content when you use the contact form.</span></li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">Cookies</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            We use a minimal set of cookies. An admin session cookie is set only when an administrator logs in. Analytics cookies, if any, are used to understand traffic patterns in aggregate. You can disable cookies in your browser settings, though some site features may not function properly.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">Third-Party Links</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Tool listings link to external websites operated by third parties. We do not control their privacy practices. Once you leave aifind.io, you are subject to the privacy policy of the destination site. We encourage reviewing their policies before sharing personal information.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">How We Use Information</h2>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2"><span className="text-emerald-600 font-bold mt-0.5">&bull;</span>To operate and maintain the directory.</li>
            <li className="flex items-start gap-2"><span className="text-emerald-600 font-bold mt-0.5">&bull;</span>To respond to contact form submissions and tool submission requests.</li>
            <li className="flex items-start gap-2"><span className="text-emerald-600 font-bold mt-0.5">&bull;</span>To send newsletter emails, if you have subscribed.</li>
            <li className="flex items-start gap-2"><span className="text-emerald-600 font-bold mt-0.5">&bull;</span>To understand which pages and tools are most useful to visitors.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">Data Retention</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Anonymous usage data is retained in aggregate. Contact form submissions and newsletter emails are retained only as long as needed to respond or provide the service. You may request deletion of your data at any time via the <Link href="/contact" className="text-emerald-600 font-bold hover:text-emerald-500">contact page</Link>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">Your Rights</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Depending on your location, you may have the right to access, correct, or delete personal data we hold about you. To exercise these rights, contact us through the <Link href="/contact" className="text-emerald-600 font-bold hover:text-emerald-500">contact page</Link>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">Changes to This Policy</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            We may update this policy from time to time. The &ldquo;last updated&rdquo; date at the top reflects the most recent revision. Continued use of the site after changes constitutes acceptance of the updated policy.
          </p>
        </section>
      </div>
    </div>
  );
}
