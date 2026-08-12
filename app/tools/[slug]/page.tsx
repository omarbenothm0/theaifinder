import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ToolService } from '../../../lib/services/tool.service';
import { CategoryService } from '../../../lib/services/category.service';
import { PersonaService } from '../../../lib/services/persona.service';
import { ComparisonService } from '../../../lib/services/comparison.service';
import { UseCaseService } from '../../../lib/services/use-case.service';
import { ToolCard } from '../../../components/tool/ToolCard';
import { ToolOutboundLink, toolUsesAffiliateLink } from '../../../components/tool/ToolOutboundLink';
import { AffiliateDisclosure } from '../../../components/tool/AffiliateDisclosure';
import { InternalLinks } from '../../../components/shared/InternalLinks';
import { JsonLd } from '../../../components/shared/JsonLd';
import { generateToolMetadata, generateNotFoundMetadata } from '../../../lib/seo/metadata';
import { generateSoftwareApplicationSchema, generateBreadcrumbSchema } from '../../../lib/seo/jsonld';
import { Star, CheckCircle2, Check, X, ArrowRight, Layers, Users, Building2, Monitor } from 'lucide-react';
import { ToolReviewsSection } from '../../../components/review/ToolReviewsSection';
import { formatInformationVerifiedDate } from '../../../lib/utils/formatDate';
import { getContextualInternalLinks } from '../../../lib/utils/internalLinksContext';
import { getPublicAudienceLinks } from '../../../lib/seo/persona-visibility';
import { isComparisonIndexable } from '../../../lib/seo/indexability';

import { getBaseUrl, absoluteUrl } from '../../../lib/seo/base-url';

const BASE_URL = getBaseUrl();

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = await ToolService.getToolBySlug(slug);
  if (!tool) {
    return generateNotFoundMetadata('Tool Not Found');
  }
  return generateToolMetadata(tool);
}

export default async function ToolProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = await ToolService.getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const [categories, personas, comparisons, categoryToolsRes, useCaseLinks] = await Promise.all([
    CategoryService.getCategories(),
    PersonaService.getPersonas(),
    ComparisonService.getComparisons(),
    ToolService.getTools({ category: tool.categorySlug || tool.categoryId, limit: 4 }),
    UseCaseService.getToolUseCaseLinks(tool.slug),
  ]);

  // Alternatives: prefer explicit tool.alternatives slugs; fall back to same-category tools if empty
  let alternativeTools = [];
  if (tool.alternatives && tool.alternatives.length > 0) {
    const altResults = await Promise.all(
      tool.alternatives.map((altSlug) => ToolService.getToolBySlug(altSlug))
    );
    alternativeTools = altResults.filter((t): t is NonNullable<typeof t> => t !== null && t.id !== tool.id);
  }
  if (alternativeTools.length === 0) {
    alternativeTools = categoryToolsRes.tools.filter((t) => t.id !== tool.id);
  }
  const filteredAlternatives = alternativeTools.slice(0, 3);

  // Find a curated comparison involving this tool (avoid linking to auto-generated compare URLs)
  const toolComparisons = comparisons.filter(
    (c) =>
      c.isCurated !== false &&
      isComparisonIndexable(c).indexable &&
      (c.tool1Slug === tool.slug || c.tool2Slug === tool.slug)
  );
  const curatedComparison =
    tool.slug === 'cursor'
      ? toolComparisons.find((c) => c.slug === 'claude-code-vs-cursor') ?? toolComparisons[0]
      : toolComparisons[0];
  const compareHref = curatedComparison
    ? `/compare/${curatedComparison.slug}`
    : '/ai-tools-directory';

  const audienceLinks = getPublicAudienceLinks(
    tool.targetUsers ?? [],
    personas,
    categories,
    tool.categorySlug || tool.categoryId
  );

  const internalLinks = getContextualInternalLinks(
    tool.slug,
    tool.targetUsers ?? [],
    tool.categorySlug || tool.categoryId,
    categories,
    personas,
    comparisons
  );

  const softwareSchema = generateSoftwareApplicationSchema(tool);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: `${BASE_URL}` },
    { name: 'AI Tools', url: `${BASE_URL}/ai-tools` },
    { name: tool.categoryName, url: `${BASE_URL}/category/${tool.categorySlug || tool.categoryId}` },
    { name: tool.name, url: `${BASE_URL}/tools/${tool.slug}` }
  ]);

  return (
    <div className="space-y-10">
      <JsonLd schema={softwareSchema} />
      <JsonLd schema={breadcrumbSchema} />

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
        <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/ai-tools" className="hover:text-slate-900 transition-colors">Tools</Link>
        <span>/</span>
        <Link href={`/category/${tool.categorySlug || tool.categoryId}`} className="hover:text-slate-900 transition-colors">{tool.categoryName}</Link>
        <span>/</span>
        <span className="font-bold text-slate-900">{tool.name}</span>
      </nav>

      {/* Hero Header Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="flex items-start gap-5">
            <Image
              src={tool.logo}
              alt={`${tool.name} logo`}
              width={96}
              height={96}
              referrerPolicy="no-referrer"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover bg-slate-100 border border-slate-200 shrink-0 shadow-xs"
            />
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">{tool.name}</h1>
                {tool.verified && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Listing
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-600 max-w-xl font-medium leading-relaxed">{tool.tagline}</p>

              <div className="flex items-center gap-3 text-xs text-slate-500 pt-1 flex-wrap">
                <Link href={`/category/${tool.categorySlug || tool.categoryId}`} className="font-bold text-slate-700 hover:text-emerald-600 flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md">
                  <Layers className="w-3.5 h-3.5" />
                  {tool.categoryName}
                </Link>
                <span>&bull;</span>
                {tool.reviewCount > 0 ? (
                  <div className="flex items-center gap-1 font-bold text-slate-900">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{tool.rating.toFixed(1)}</span>
                    <span className="text-slate-400 font-normal">
                      ({tool.reviewCount} review{tool.reviewCount !== 1 ? 's' : ''})
                    </span>
                  </div>
                ) : (
                  <span className="text-slate-500 font-medium">Editorial listing · No user reviews yet</span>
                )}
              </div>

              {tool.lastVerifiedDate && (
                <p className="text-xs text-slate-500 pt-1">
                  Information verified: {formatInformationVerifiedDate(tool.lastVerifiedDate)}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col items-stretch gap-3 shrink-0">
            <div className="flex flex-col gap-2">
              <ToolOutboundLink tool={tool} variant="button" />
              {toolUsesAffiliateLink(tool) && <AffiliateDisclosure variant="inline" />}
            </div>

            <div className="text-center text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="font-bold text-slate-900 block">{tool.pricingModel}</span>
              {tool.monthlyPrice ? `$${tool.monthlyPrice}/month` : 'Free Tier / Trial'}
            </div>
          </div>

        </div>
      </div>

      {/* Screenshot Gallery - only renders if screenshots exist */}
      {tool.screenshots && tool.screenshots.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Screenshots</h2>
          <div className={`grid gap-4 ${tool.screenshots.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
            {tool.screenshots.map((shot, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                <Image
                  src={shot}
                  alt={`${tool.name} screenshot ${idx + 1}`}
                  width={800}
                  height={500}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Main Overview, Features, Pros & Cons */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Overview */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">About {tool.name}</h2>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{tool.description}</p>
            
            <div className="flex flex-wrap gap-2 pt-2">
              {tool.tags.map((tag) => (
                <span key={tag} className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-lg">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Pricing Tiers - only renders if pricingTiers exist */}
          {tool.pricingTiers && tool.pricingTiers.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Pricing Plans</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tool.pricingTiers.map((tier, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-xl border border-slate-200 p-4 flex flex-col gap-3">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{tier.name}</h3>
                      <p className="text-lg font-extrabold text-slate-900">
                        {tier.price === null ? 'Custom' : tier.price === 0 ? 'Free' : `$${tier.price}`}
                        {tier.price !== null && tier.price !== 0 && (
                          <span className="text-xs font-medium text-slate-500">
                            /{tier.billingPeriod === 'yearly' ? 'yr' : 'mo'}
                          </span>
                        )}
                      </p>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {tier.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Features */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Key Features &amp; Capabilities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tool.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-emerald-50/50 rounded-2xl border border-emerald-200/80 p-6 space-y-3">
              <h3 className="font-bold text-emerald-950 text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Pros
              </h3>
              <ul className="space-y-2 text-xs text-emerald-900">
                {tool.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">&bull;</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-rose-50/50 rounded-2xl border border-rose-200/80 p-6 space-y-3">
              <h3 className="font-bold text-rose-950 text-sm flex items-center gap-1.5">
                <X className="w-4 h-4 text-rose-600" />
                Cons
              </h3>
              <ul className="space-y-2 text-xs text-rose-900">
                {tool.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">&bull;</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Best Suited For - only renders if targetUsers exist */}
          {audienceLinks.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                Best Suited For
              </h2>
              <div className="flex flex-wrap gap-2">
                {audienceLinks.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-full hover:bg-indigo-100 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* PM use-case guides — when tool is mapped to persona use cases */}
          {useCaseLinks.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-600" />
                Featured In Workflow Guides
              </h2>
              <div className="flex flex-wrap gap-2">
                {useCaseLinks.map((link) => (
                  <Link
                    key={`${link.personaSlug}-${link.useCaseSlug}-${link.section}`}
                    href={
                      link.pageEnabled
                        ? `/for/${link.personaSlug}/${link.useCaseSlug}`
                        : `/for/${link.personaSlug}#${link.useCaseSlug}`
                    }
                    className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-full hover:bg-indigo-100 transition-colors"
                  >
                    {link.personaTitle}: {link.useCaseTitle}
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Sidebar: Quick Spec Highlights */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
              Specifications
            </h3>

            <div className="space-y-3 text-xs">
              {tool.companyName && (
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500 font-medium flex items-center gap-1"><Building2 className="w-3.5 h-3.5" />Company</span>
                  <span className="font-bold text-slate-900">{tool.companyName}</span>
                </div>
              )}

              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500 font-medium">Pricing Model</span>
                <span className="font-bold text-slate-900">{tool.pricingModel}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500 font-medium">Monthly Cost</span>
                <span className="font-bold text-slate-900">{tool.monthlyPrice ? `$${tool.monthlyPrice}/mo` : 'Free'}</span>
              </div>

              {tool.platforms && tool.platforms.length > 0 && (
                <div className="flex justify-between py-1 border-b border-slate-50 gap-2">
                  <span className="text-slate-500 font-medium flex items-center gap-1 shrink-0"><Monitor className="w-3.5 h-3.5" />Platforms</span>
                  <span className="font-bold text-slate-900 text-right">{tool.platforms.join(', ')}</span>
                </div>
              )}

              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500 font-medium">Developer API</span>
                <span className={`font-bold ${tool.hasApi ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {tool.hasApi ? 'Available' : 'No'}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500 font-medium">Mobile App</span>
                <span className={`font-bold ${tool.hasMobileApp ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {tool.hasMobileApp ? 'Available' : 'No'}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500 font-medium">Browser Extension</span>
                <span className={`font-bold ${tool.hasExtension ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {tool.hasExtension ? 'Available' : 'No'}
                </span>
              </div>
            </div>
          </div>

          {/* Compare Prompt - dynamic based on available alternative */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Head-to-Head</span>
            <h4 className="font-bold text-base">Compare {tool.name}</h4>
            <p className="text-xs text-slate-300">Evaluate against market rivals side by side in feature matrix.</p>
            <Link
              href={compareHref}
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300"
            >
              View Head-to-Head Comparisons &rarr;
            </Link>
          </div>
        </div>

      </div>

      {/* User Reviews */}
      <ToolReviewsSection toolSlug={tool.slug} toolName={tool.name} />

      {/* Alternative Tools Section */}
      {filteredAlternatives.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-slate-200">
          <h2 className="text-xl font-extrabold text-slate-900">Top Alternatives to {tool.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredAlternatives.map((altTool) => (
              <ToolCard key={altTool.id} tool={altTool} />
            ))}
          </div>
        </div>
      )}

      {/* Internal SEO Linking Block */}
      <InternalLinks
        categories={internalLinks.categories}
        personas={internalLinks.personas}
        comparisons={internalLinks.comparisons}
      />
    </div>
  );
}