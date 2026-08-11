import Link from 'next/link';
import Image from 'next/image';
import { Tool } from '../../types/tool';
import { Star, CheckCircle2, ArrowRight, Sparkles, Smartphone, Code, Puzzle } from 'lucide-react';
import { ToolOutboundLink } from './ToolOutboundLink';

interface ToolCardProps {
  tool: Tool;
  layout?: 'grid' | 'list';
}

export function ToolCard({ tool, layout = 'grid' }: ToolCardProps) {
  const isGrid = layout === 'grid';

  return (
    <div
      className={`group bg-white rounded-xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden relative ${
        isGrid ? 'p-5' : 'p-5 sm:flex-row sm:items-center gap-6'
      }`}
    >
      {/* Top Banner highlight if featured */}
      {tool.featured && (
        <div className="absolute top-0 right-0 bg-slate-900 text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-bl-lg flex items-center gap-1 shadow-xs">
          <Sparkles className="w-3 h-3 text-emerald-400" />
          Featured
        </div>
      )}

      <div>
        {/* Header section: Logo, Name, Rating, Category */}
        <div className="flex items-start gap-3.5 mb-3">
          <Image
            src={tool.logo}
            alt={`${tool.name} logo`}
            width={48}
            height={48}
            referrerPolicy="no-referrer"
            className="w-12 h-12 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0 group-hover:scale-102 transition-transform"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                href={`/tools/${tool.slug}`}
                className="font-bold text-slate-900 text-base hover:text-emerald-600 transition-colors cursor-pointer text-left truncate"
              >
                {tool.name}
              </Link>

              {tool.verified && (
                <span className="inline-flex items-center text-emerald-600" title="Verified Tool Listing">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 flex-wrap">
              <Link
                href={`/category/${tool.categorySlug || tool.categoryId}`}
                className="text-[10px] font-bold text-slate-500 uppercase tracking-tight bg-slate-100 px-2 py-0.5 rounded hover:bg-slate-200 transition-colors"
              >
                {tool.categoryName}
              </Link>
              <span className="text-slate-300">&bull;</span>
              <div className="flex items-center gap-1 font-bold text-slate-800 text-xs">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{tool.rating.toFixed(1)}</span>
                <span className="text-slate-400 font-normal text-[11px]">({tool.reviewCount})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
          {tool.tagline || tool.description}
        </p>

        {/* Tags & Feature Badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span
            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
              tool.pricingModel === 'Free'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : tool.pricingModel === 'Freemium'
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            {tool.pricingModel}
            {tool.monthlyPrice ? ` • $${tool.monthlyPrice}/mo` : ''}
          </span>

          {tool.hasApi && (
            <span className="text-[10px] font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md flex items-center gap-1" title="API Available">
              <Code className="w-3 h-3 text-slate-400" />
              API
            </span>
          )}

          {tool.hasMobileApp && (
            <span className="text-[10px] font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md flex items-center gap-1" title="Mobile App Available">
              <Smartphone className="w-3 h-3 text-slate-400" />
              Mobile
            </span>
          )}

          {tool.hasExtension && (
            <span className="text-[10px] font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md flex items-center gap-1" title="Extension Available">
              <Puzzle className="w-3 h-3 text-slate-400" />
              Extension
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <Link
          href={`/tools/${tool.slug}`}
          className="text-xs font-bold text-slate-900 hover:text-emerald-600 flex items-center gap-1 cursor-pointer transition-colors py-1"
        >
          View Profile &amp; Pricing
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>

        <ToolOutboundLink tool={tool} variant="icon" />
      </div>
    </div>
  );
}
