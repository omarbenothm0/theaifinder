import { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { generateBreadcrumbSchema } from '../../lib/seo/jsonld';
import { JsonLd } from '../../components/shared/JsonLd';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: 'Terms of Use | AIFind',
    description: 'The terms governing use of AIFind, including acceptable use, intellectual property, disclaimers, and limitation of liability for the AI tools directory.',
    canonicalUrl: 'https://aifind.io/terms'
  });
}

export default async function TermsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://aifind.io' },
    { name: 'Terms of Use', url: 'https://aifind.io/terms' }
  ]);

  return (
    <div className="space-y-10 max-w-3xl mx-auto">
      <JsonLd schema={breadcrumbSchema} />

      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-lg text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Terms of Use</h1>
        <p className="text-xs text-slate-400">Last updated: August 2026</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-8">
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">Acceptance of Terms</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            By accessing or using aifind.io, you agree to these Terms of Use. If you do not agree, please do not use the site. We may revise these terms at any time; continued use after changes constitutes acceptance of the updated terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">Use of the Site</h2>
          <p className="text-sm text-slate-700 leading-relaxed">AIFind provides a directory of AI tools for discovery and comparison. You agree to:</p>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2"><span className="text-emerald-600 font-bold mt-0.5">&bull;</span>Use the site for lawful purposes only.</li>
            <li className="flex items-start gap-2"><span className="text-emerald-600 font-bold mt-0.5">&bull;</span>Not scrape, copy, or redistribute directory content without permission.</li>
            <li className="flex items-start gap-2"><span className="text-emerald-600 font-bold mt-0.5">&bull;</span>Not attempt to disrupt or compromise site security or functionality.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">Third-Party Tools and Links</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            AIFind lists tools operated by third parties. We do not endorse, warrant, or take responsibility for any third-party tool, its functionality, pricing, or terms. When you click through to a tool&rsquo;s website, you are subject to that provider&rsquo;s terms and privacy policy. Any transactions or interactions with third-party tools are solely between you and that provider.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">Disclaimers</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            The directory is provided &ldquo;as is&rdquo; without warranties of any kind. We do not guarantee that tool listings are accurate, complete, or current. Pricing, features, and availability may change without notice. You should always verify information on a tool&rsquo;s official website before making decisions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">Limitation of Liability</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            To the fullest extent permitted by law, AIFind shall not be liable for any indirect, incidental, or consequential damages arising from your use of the site or reliance on directory content. We are not responsible for the actions or offerings of third-party tools listed here.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">Intellectual Property</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            The AIFind site design, directory structure, and editorial content are owned by AIFind. Tool names, logos, and screenshots belong to their respective owners and are used for identification and comparison purposes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">Contact</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Questions about these terms? Reach us through our <Link href="/contact" className="text-emerald-600 font-bold hover:text-emerald-500">contact page</Link>. For how we handle data, see our <Link href="/privacy" className="text-emerald-600 font-bold hover:text-emerald-500">privacy policy</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
