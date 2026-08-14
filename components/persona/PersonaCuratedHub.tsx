'use client';

import { useState, useMemo } from 'react';
import { Tool, UseCaseFitTier } from '../../types/tool';
import { WorkflowTool, WorkflowSection, ToolRecommendation } from '../../types/persona';
import { ToolCard } from '../tool/ToolCard';
import { PersonaToolCard, TopPickCard } from './SharedPersonaCards';
import { BookOpen, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface PersonaToolUseCase {
  toolSlug: string;
  useCaseSlug: string;
  fitTier: UseCaseFitTier;
  capabilities: string;
  limitation?: string;
}

interface PersonaUseCase {
  slug: string;
  title: string;
  description: string;
}

interface PersonaCuratedHubProps {
  tools: Tool[];
  personaSlug: string;
  toolUseCases: PersonaToolUseCase[];
  useCases: PersonaUseCase[];
  headingLabel?: string;
  personaTitle?: string; // Add persona title for more specific headings
}

export function PersonaCuratedHub({ 
  tools, 
  personaSlug, 
  toolUseCases, 
  useCases,
  headingLabel = 'Workflows',
  personaTitle
}: PersonaCuratedHubProps) {
  // Default to first use case
  const [activeWorkflow, setActiveWorkflow] = useState<string>(useCases.length > 0 ? useCases[0].slug : 'all');

  // Create tool map for quick lookup
  const toolMap = useMemo(() => new Map(tools.map(t => [t.slug, t])), [tools]);
  
  // Create workflow sections using tool use case data
  const workflowSections: WorkflowSection[] = useMemo(() => {
    return useCases.map(useCase => {
      const workflowUseCases = toolUseCases.filter(uc => uc.useCaseSlug === useCase.slug);
      
      const workflowTools: WorkflowTool[] = workflowUseCases
        .map(uc => {
          const tool = toolMap.get(uc.toolSlug);
          if (!tool) return null;
          return {
            tool,
            fitTier: uc.fitTier,
            capabilities: uc.capabilities,
          };
        })
        .filter((wt): wt is WorkflowTool => wt !== null)
        .sort((a, b) => a.fitTier === 'primary' ? -1 : b.fitTier === 'primary' ? 1 : 0);

      return {
        slug: useCase.slug,
        title: useCase.title,
        tools: workflowTools,
      };
    });
  }, [toolMap, toolUseCases, useCases]);

  // Get unique tools for top recommendations (deduplicated) with reasoning
  const topRecommendations: ToolRecommendation[] = useMemo(() => {
    // Count how many primary/strong fits each tool has across workflows
    const toolScores = new Map<string, number>();
    const toolWorkflows = new Map<string, string[]>();
    const toolPrimaryCapability = new Map<string, string>();
    
    toolUseCases.forEach(uc => {
      const score = uc.fitTier === 'primary' ? 3 : uc.fitTier === 'strong' ? 2 : 1;
      toolScores.set(uc.toolSlug, (toolScores.get(uc.toolSlug) || 0) + score);
      
      const workflows = toolWorkflows.get(uc.toolSlug) || [];
      const workflowName = useCases.find(w => w.slug === uc.useCaseSlug)?.title || uc.useCaseSlug;
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
  }, [tools, toolUseCases, useCases]);

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
            Top Recommended Tools
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
                <PersonaToolCard key={tool.id} tool={tool} reason={reason} specificStrength={specificStrength} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Connective Copy */}
      <div className="bg-background-raised rounded-2xl border border-border/50 p-5">
        <p className="text-sm text-muted-foreground text-center">
          These are the tools we recommend starting with. If your workflow is more specific, explore recommendations by task below.
        </p>
      </div>

      {/* Workflow Exploration */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border/50 pb-3">
          <h2 className="text-xl font-medium text-foreground-strong flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-foreground" />
            Explore by {headingLabel}
          </h2>
        </div>

        {/* Workflow Tabs */}
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Workflow categories">
          {useCases.map((useCase) => (
            <button
              key={useCase.slug}
              onClick={() => setActiveWorkflow(useCase.slug)}
              role="tab"
              aria-selected={activeWorkflow === useCase.slug}
              aria-controls={`${useCase.slug}-panel`}
              id={`${useCase.slug}-tab`}
              className={`text-xs py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer ${
                activeWorkflow === useCase.slug
                  ? 'bg-inverted text-inverted-foreground font-semibold shadow-xs'
                  : 'bg-foreground/5 text-foreground hover:bg-foreground/8'
              }`}
            >
              {useCase.title}
            </button>
          ))}
        </div>

        {/* Workflow Results */}
        <div className="space-y-4" role="tabpanel" aria-labelledby={`${activeWorkflow}-tab`} id={`${activeWorkflow}-panel`}>
          {workflowTools.length > 0 ? (
            <>
              <h3 className="text-base font-medium text-foreground-strong">
                {activeSection?.title || 'Tools'} for {personaTitle || 'this workflow'}
              </h3>
              {workflowTools.map(({ tool, fitTier, capabilities }) => (
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
            ))}
            </>
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
