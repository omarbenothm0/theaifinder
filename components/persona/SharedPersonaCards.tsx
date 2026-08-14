import { Tool } from '../../types/tool';
import { CheckCircle2, Star, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface PersonaToolCardProps {
  tool: Tool;
  reason?: string;
  specificStrength?: string;
}

// Standard persona tool card without FEATURED badge
export function PersonaToolCard({ tool, reason, specificStrength }: PersonaToolCardProps) {
  return (
    <div className="home-card group flex flex-col justify-between overflow-hidden relative p-5 md:p-6">
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
                className="text-[15px] font-medium text-foreground hover:text-foreground-strong transition-colors truncate"
              >
                {tool.name}
              </Link>

              {tool.verified && (
                <span className="inline-flex items-center text-verified" title="Verified Tool Listing">
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

        {specificStrength && (
          <div className="bg-verified-muted/30 rounded-lg p-3 mb-3 border border-verified-border/40">
            <p className="text-[12px] text-foreground leading-relaxed font-medium">
              {specificStrength}
            </p>
          </div>
        )}

        {reason && (
          <div className="bg-foreground/5 rounded-lg p-3 mb-4 border border-border/30">
            <p className="text-[12px] text-muted-foreground leading-relaxed">
              <span className="font-medium text-foreground">Why we recommend it:</span> {reason}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="home-pill home-pill-outline !text-[11px] !py-0.5 !px-2">
            {tool.pricingModel}
            {tool.monthlyPrice ? ` · $${tool.monthlyPrice}/mo` : ''}
          </span>

          {tool.hasApi && (
            <span className="home-pill home-pill-outline !text-[11px] !py-0.5 !px-2" title="API Available">
              API
            </span>
          )}

          {tool.hasMobileApp && (
            <span className="home-pill home-pill-outline !text-[11px] !py-0.5 !px-2" title="Mobile App Available">
              Mobile
            </span>
          )}

          {tool.hasExtension && (
            <span className="home-pill home-pill-outline !text-[11px] !py-0.5 !px-2" title="Extension Available">
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
      </div>
    </div>
  );
}

interface TopPickCardProps {
  tool: Tool;
  reason: string;
  specificStrength: string;
}

// Dedicated Top Pick card with stronger visual distinction
export function TopPickCard({ tool, reason, specificStrength }: TopPickCardProps) {
  return (
    <div className="relative">
      {/* Integrated Top Pick badge */}
      <div className="absolute -top-3 left-6 z-10 bg-inverted text-inverted-foreground text-[11px] font-medium px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 border border-border/60">
        <Sparkles className="w-3 h-3 text-muted-foreground" />
        Top Pick
      </div>
      
      {/* Featured card with stronger visual treatment */}
      <div className="bg-background-raised border-2 border-foreground/15 rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden">
        {/* Subtle accent tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.02] to-transparent pointer-events-none" />
        
        <div className="relative">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Logo section */}
            <div className="flex items-start gap-4 md:flex-col md:items-center md:text-center">
              <Image
                src={tool.logo}
                alt={tool.name}
                width={80}
                height={80}
                referrerPolicy="no-referrer"
                className="w-20 h-20 object-cover border-2 border-border/40 rounded-2xl shrink-0 shadow-sm"
              />
            </div>
            
            {/* Content section */}
            <div className="flex-1 min-w-0">
              {/* Title and verification */}
              <div className="flex items-center gap-3 mb-3">
                <Link
                  href={`/tools/${tool.slug}`}
                  className="text-[20px] md:text-[22px] font-semibold text-foreground hover:text-foreground-strong transition-colors"
                >
                  {tool.name}
                </Link>
                {tool.verified && (
                  <CheckCircle2 className="w-5 h-5 text-verified shrink-0" />
                )}
              </div>
              
              {/* Category and rating */}
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <Link
                  href={`/category/${tool.categorySlug || tool.categoryId}`}
                  className="home-pill home-pill-outline !text-[12px] !py-1 !px-3"
                >
                  {tool.categoryName}
                </Link>
                {tool.reviewCount > 0 && (
                  <div className="flex items-center gap-1.5 text-[14px] text-foreground">
                    <Star className="w-4 h-4 fill-rating/70 text-rating/70" />
                    <span className="font-medium">{tool.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground">({tool.reviewCount} reviews)</span>
                  </div>
                )}
              </div>
              
              {/* Description */}
              <p className="text-[15px] text-muted-foreground mb-5 leading-relaxed line-clamp-2">
                {tool.tagline || tool.description}
              </p>
              
              {/* Specific strength - differentiating signal */}
              <div className="bg-verified-muted/40 rounded-xl p-4 mb-4 border border-verified-border/50">
                <p className="text-[14px] text-foreground leading-relaxed font-medium">
                  {specificStrength}
                </p>
              </div>
              
              {/* Prominent reasoning section */}
              <div className="bg-foreground/[0.03] rounded-xl p-4 mb-5 border border-border/40">
                <p className="text-[14px] text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">Why we recommend it:</span> {reason}
                </p>
              </div>
              
              {/* Complete metadata */}
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="home-pill home-pill-outline !text-[12px] !py-1.5 !px-3 font-medium">
                  {tool.pricingModel}
                  {tool.monthlyPrice ? ` · $${tool.monthlyPrice}/mo` : ''}
                </span>
                {tool.hasApi && (
                  <span className="home-pill home-pill-outline !text-[12px] !py-1.5 !px-3" title="API Available">
                    API
                  </span>
                )}
                {tool.hasMobileApp && (
                  <span className="home-pill home-pill-outline !text-[12px] !py-1.5 !px-3" title="Mobile App Available">
                    Mobile
                  </span>
                )}
                {tool.hasExtension && (
                  <span className="home-pill home-pill-outline !text-[12px] !py-1.5 !px-3" title="Extension Available">
                    Extension
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {/* CTA section */}
          <div className="mt-6 pt-5 border-t border-border/40 flex items-center justify-between">
            <Link
              href={`/tools/${tool.slug}`}
              className="text-[14px] font-medium text-foreground hover:text-foreground-strong flex items-center gap-2 transition-colors"
            >
              View full profile &amp; pricing
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
