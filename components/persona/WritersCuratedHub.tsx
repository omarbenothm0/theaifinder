'use client';

import { useState, useMemo } from 'react';
import { Tool } from '../../types/tool';
import { ToolCard } from '../tool/ToolCard';
import { CheckCircle2, Star, BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { WRITER_TOOL_USE_CASES } from '../../lib/data/writer-cluster';

type UseCaseFitTier = 'primary' | 'strong' | 'partial' | 'listed' | 'exclude';

interface WritersCuratedHubProps {
  tools: Tool[];
}

interface WorkflowTool {
  tool: Tool;
  fitTier: UseCaseFitTier;
  capabilities: string;
}

interface WorkflowSection {
  slug: string;
  title: string;
  tools: WorkflowTool[];
}

interface ToolRecommendation {
  tool: Tool;
  score: number;
  reason: string;
  specificStrength: string;
}

const WORKFLOWS: Array<{ slug: string; title: string; label: string }> = [
  { slug: 'drafting-composition', title: 'Drafting & Composition', label: 'Drafting' },
  { slug: 'editing-proofreading', title: 'Editing & Proofreading', label: 'Editing' },
  { slug: 'research-for-writing', title: 'Research for Writing', label: 'Research' },
  { slug: 'long-form-manuscripts', title: 'Long-Form & Manuscripts', label: 'Long-Form' },
  { slug: 'writing-organization', title: 'Outlines & Organization', label: 'Organization' },
];

// Writers-specific card without FEATURED badge
function WritersToolCard({ tool, reason, specificStrength }: { tool: Tool; reason?: string; specificStrength?: string }) {
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

// Dedicated Top Pick card with stronger visual distinction
function TopPickCard({ tool, reason, specificStrength }: { tool: Tool; reason: string; specificStrength: string }) {
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

export function WritersCuratedHub({ tools }: WritersCuratedHubProps) {
  const [activeWorkflow, setActiveWorkflow] = useState<string>('drafting-composition');

  // Create tool map for quick lookup
  const toolMap = useMemo(() => new Map(tools.map(t => [t.slug, t])), [tools]);
  
  // Create workflow sections using actual WRITER_TOOL_USE_CASES data
  const workflowSections: WorkflowSection[] = useMemo(() => {
    return WORKFLOWS.map(workflow => {
      const workflowUseCases = WRITER_TOOL_USE_CASES.filter(uc => uc.useCaseSlug === workflow.slug);
      
      const workflowTools: WorkflowTool[] = workflowUseCases
        .map(uc => {
          const tool = toolMap.get(uc.toolSlug);
          if (!tool) return null;
          return {
            tool,
            fitTier: uc.fitTier as UseCaseFitTier,
            capabilities: uc.capabilities,
          };
        })
        .filter((wt): wt is WorkflowTool => wt !== null)
        .sort((a, b) => a.fitTier === 'primary' ? -1 : b.fitTier === 'primary' ? 1 : 0);

      return {
        slug: workflow.slug,
        title: workflow.title,
        tools: workflowTools,
      };
    });
  }, [toolMap]);

  // Get unique tools for top recommendations (deduplicated) with reasoning
  const topRecommendations: ToolRecommendation[] = useMemo(() => {
    // Count how many primary/strong fits each tool has across workflows
    const toolScores = new Map<string, number>();
    const toolWorkflows = new Map<string, string[]>();
    const toolPrimaryCapability = new Map<string, string>();
    
    WRITER_TOOL_USE_CASES.forEach(uc => {
      const score = uc.fitTier === 'primary' ? 3 : uc.fitTier === 'strong' ? 2 : 1;
      toolScores.set(uc.toolSlug, (toolScores.get(uc.toolSlug) || 0) + score);
      
      const workflows = toolWorkflows.get(uc.toolSlug) || [];
      const workflowName = WORKFLOWS.find(w => w.slug === uc.useCaseSlug)?.label || uc.useCaseSlug;
      if (!workflows.includes(workflowName)) {
        workflows.push(workflowName);
      }
      toolWorkflows.set(uc.toolSlug, workflows);

      // Store primary workflow capability (first primary fit)
      if (uc.fitTier === 'primary' && !toolPrimaryCapability.has(uc.toolSlug)) {
        toolPrimaryCapability.set(uc.toolSlug, uc.capabilities);
      }
    });

    const uniqueTools = Array.from(new Map(tools.map(t => [t.slug, t])).values());

    return uniqueTools
      .filter(tool => toolScores.has(tool.slug))
      .map(tool => {
        const workflows = toolWorkflows.get(tool.slug) || [];
        const reason = workflows.length > 1 
          ? `Strong fit for ${workflows.slice(0, 2).join(', ')}${workflows.length > 2 ? ' and more' : ''}.`
          : `Strong fit for ${workflows[0]}.`;

        // Generate specific strength from primary workflow capability
        const primaryCap = toolPrimaryCapability.get(tool.slug);
        let specificStrength = '';
        
        if (primaryCap) {
          // Use primary workflow capability, shortened to first sentence
          specificStrength = primaryCap.split('.')[0] + '.';
        } else {
          // Fallback to tagline if no primary workflow found
          specificStrength = tool.tagline || tool.description;
        }

        return {
          tool,
          score: toolScores.get(tool.slug) || 0,
          reason,
          specificStrength,
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [tools]);

  // Get tools for active workflow
  const activeSection = workflowSections.find(w => w.slug === activeWorkflow);
  const workflowTools = activeSection?.tools || [];

  return (
    <div className="space-y-10">
      {/* Top Recommendations Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border/50 pb-3">
          <h2 className="text-xl font-medium text-foreground-strong flex items-center gap-2">
            <Star className="w-5 h-5 text-foreground" />
            Top Writing Tools
          </h2>
        </div>

        <div className="space-y-6">
          {/* Top Pick - Prominent */}
          {topRecommendations.length > 0 && (
            <TopPickCard tool={topRecommendations[0].tool} reason={topRecommendations[0].reason} specificStrength={topRecommendations[0].specificStrength} />
          )}

          {/* Secondary Recommendations */}
          {topRecommendations.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {topRecommendations.slice(1).map(({ tool, reason, specificStrength }) => (
                <WritersToolCard key={tool.id} tool={tool} reason={reason} specificStrength={specificStrength} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Connective Copy */}
      <div className="bg-background-raised rounded-2xl border border-border/50 p-5">
        <p className="text-sm text-muted-foreground text-center">
          These are the tools we recommend starting with. If your writing workflow is more specific, explore recommendations by task below.
        </p>
      </div>

      {/* Workflow Exploration */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border/50 pb-3">
          <h2 className="text-xl font-medium text-foreground-strong flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-foreground" />
            Explore by Writing Task
          </h2>
        </div>

        {/* Workflow Tabs */}
        <div className="flex flex-wrap gap-2">
          {WORKFLOWS.map((workflow) => (
            <button
              key={workflow.slug}
              onClick={() => setActiveWorkflow(workflow.slug)}
              className={`text-xs py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer ${
                activeWorkflow === workflow.slug
                  ? 'bg-inverted text-inverted-foreground font-semibold shadow-xs'
                  : 'bg-foreground/5 text-foreground hover:bg-foreground/8'
              }`}
            >
              {workflow.label}
            </button>
          ))}
        </div>

        {/* Workflow Results */}
        <div className="space-y-4">
          {workflowTools.length > 0 ? (
            workflowTools.map(({ tool, fitTier, capabilities }) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.slug}`}
                className="home-card p-4 flex items-start gap-4 group transition-all duration-200 ease hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:-translate-y-[-2px]"
              >
                <Image
                  src={tool.logo}
                  alt={tool.name}
                  width={48}
                  height={48}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 object-cover border border-border/40 rounded-lg shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                      {tool.name}
                    </h3>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                      fitTier === 'primary' 
                        ? 'bg-verified-muted text-verified border border-verified-border' 
                        : fitTier === 'strong'
                        ? 'bg-foreground/10 text-foreground border border-border/50'
                        : 'bg-foreground/5 text-muted-foreground border border-border/30'
                    }`}>
                      {fitTier === 'primary' ? 'Primary' : fitTier === 'strong' ? 'Strong' : 'Partial'}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {capabilities}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-200 shrink-0" />
              </Link>
            ))
          ) : (
            <div className="bg-background-raised rounded-2xl border border-border/50 p-6 text-center">
              <p className="text-sm text-muted-foreground">
                No specific tools mapped for this workflow yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
