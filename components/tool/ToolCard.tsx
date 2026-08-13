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
      className={`home-card group flex flex-col justify-between overflow-hidden relative ${
        isGrid ? 'p-5 md:p-6' : 'p-5 sm:flex-row sm:items-center gap-6'
      }`}
    >
      {tool.featured && (
        <div className="absolute top-3 right-3 text-[11px] font-medium uppercase tracking-[0.015em] text-muted-foreground px-2 py-0.5 rounded-full border border-border/40">
          <Sparkles className="w-3 h-3 inline mr-1 text-highlighted" />
          Featured
        </div>
      )}

      <div>
        <div className="flex items-start gap-3 mb-4">
          <Image
            src={tool.logo}
            alt={`${tool.name} logo`}
            width={44}
            height={44}
            referrerPolicy="no-referrer"
            className="w-11 h-11 object-cover border border-border/40 shrink-0 rounded-lg"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                href={`/tools/${tool.slug}`}
                className="text-[15px] font-medium text-foreground hover:text-accent transition-colors truncate"
              >
                {tool.name}
              </Link>

              {tool.verified && (
                <span className="inline-flex items-center text-highlighted" title="Verified Tool Listing">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <Link
                href={`/category/${tool.categorySlug || tool.categoryId}`}
                className="home-pill home-pill-outline !text-[11px] !py-0.5 !px-2"
              >
                {tool.categoryName}
              </Link>
              {tool.reviewCount > 0 ? (
                <div className="flex items-center gap-1 text-[13px] text-foreground">
                  <Star className="w-3.5 h-3.5 fill-rating/70 text-rating/70" />
                  <span>{tool.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground">({tool.reviewCount})</span>
                </div>
              ) : (
                <span className="text-[11px] text-muted-foreground">Editorial listing</span>
              )}
            </div>
          </div>
        </div>

        <p className="text-[13px] leading-[1.35] text-muted-foreground line-clamp-2 mb-4">
          {tool.tagline || tool.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="home-pill home-pill-outline !text-[11px] !py-0.5 !px-2">
            {tool.pricingModel}
            {tool.monthlyPrice ? ` · $${tool.monthlyPrice}/mo` : ''}
          </span>

          {tool.hasApi && (
            <span className="home-pill home-pill-outline !text-[11px] !py-0.5 !px-2" title="API Available">
              <Code className="w-3 h-3 mr-0.5" />
              API
            </span>
          )}

          {tool.hasMobileApp && (
            <span className="home-pill home-pill-outline !text-[11px] !py-0.5 !px-2" title="Mobile App Available">
              <Smartphone className="w-3 h-3 mr-0.5" />
              Mobile
            </span>
          )}

          {tool.hasExtension && (
            <span className="home-pill home-pill-outline !text-[11px] !py-0.5 !px-2" title="Extension Available">
              <Puzzle className="w-3 h-3 mr-0.5" />
              Extension
            </span>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-border/30 flex items-center justify-between gap-2">
        <Link
          href={`/tools/${tool.slug}`}
          className="text-[13px] font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
        >
          View profile &amp; pricing
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <ToolOutboundLink tool={tool} variant="icon" />
      </div>
    </div>
  );
}
