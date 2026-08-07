import { Metadata } from 'next';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { generateBreadcrumbSchema } from '../../lib/seo/jsonld';
import { JsonLd } from '../../components/shared/JsonLd';
import ContactForm from './ContactForm';
import { Mail, Clock, ExternalLink } from 'lucide-react';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: 'Contact AIFind | Submit a Tool or Report an Issue',
    description: 'Get in touch with the AIFind team to submit a tool for listing, report outdated information, or ask a question about the directory.',
    canonicalUrl: 'https://aifind.io/contact'
  });
}

export default async function ContactPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://aifind.io' },
    { name: 'Contact', url: 'https://aifind.io/contact' }
  ]);

  return (
    <div className="space-y-10 max-w-3xl mx-auto">
      <JsonLd schema={breadcrumbSchema} />

      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-lg text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Contact Us</h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Submit a tool for listing consideration, report outdated information, or send us a question.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2 shadow-2xs">
          <Mail className="w-5 h-5 text-emerald-600" />
          <h3 className="font-bold text-slate-900 text-sm">General Inquiries</h3>
          <p className="text-xs text-slate-500 leading-relaxed">Use the form below for the fastest response.</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2 shadow-2xs">
          <ExternalLink className="w-5 h-5 text-emerald-600" />
          <h3 className="font-bold text-slate-900 text-sm">Tool Submissions</h3>
          <p className="text-xs text-slate-500 leading-relaxed">Include the tool name, official URL, and category when submitting via the form.</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2 shadow-2xs">
          <Clock className="w-5 h-5 text-emerald-600" />
          <h3 className="font-bold text-slate-900 text-sm">Response Time</h3>
          <p className="text-xs text-slate-500 leading-relaxed">We review submissions weekly. Not every submission is listed.</p>
        </div>
      </div>

      <ContactForm />
    </div>
  );
}
