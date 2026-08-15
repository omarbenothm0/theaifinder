'use client';

import { useState, useMemo } from 'react';
import { Tool, UseCaseFitTier } from '../../types/tool';
import { WorkflowTool, WorkflowSection } from '../../types/persona';
import { PersonaWorkflowConfig } from '../../lib/data/persona-configs/types';
import { BookOpen, ArrowRight, Users, CheckCircle2, Layers } from 'lucide-react';
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

interface PersonaWorkflowGuideProps {
  tools: Tool[];
  toolUseCases: PersonaToolUseCase[];
  useCases: PersonaUseCase[];
  config: PersonaWorkflowConfig;
  personaTitle: string;
}

export function PersonaWorkflowGuide({ 
  tools, 
  toolUseCases, 
  useCases,
  config,
  personaTitle
}: PersonaWorkflowGuideProps) {
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

  // Get tools for active workflow
  const activeSection = workflowSections.find(w => w.slug === activeWorkflow);
  const workflowTools = useMemo(() => {
    const tools = activeSection?.tools || [];
    // Dedupe by tool.id in case same tool appears in multiple sections
    return Array.from(new Map(tools.map(t => [t.tool.id, t])).values());
  }, [activeSection?.tools]);

  // Get problem context from config
  const activeContext = config.workflowContext[activeWorkflow] || { problem: '', solution: '' };

  return (
    <div className="space-y-10">
      {/* Persona Problem Context */}
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-background-raised rounded-2xl border border-border/50 p-6 sm:p-8">
          <h2 className="text-xl font-medium text-foreground-strong flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-foreground" />
            {config.challengesSectionTitle}
          </h2>
          <div className="space-y-4">
            {config.challenges.map((challenge, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center text-xs font-bold text-foreground">{index + 1}</div>
                <div>
                  <h3 className="font-medium text-foreground-strong text-sm mb-1">{challenge.title}</h3>
                  <p className="text-sm text-muted-foreground">{challenge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Workflow Exploration */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border/50 pb-3">
          <h2 className="text-xl font-medium text-foreground-strong flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-foreground" />
            {config.workflowSectionTitle}
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
        <div className="space-y-6" role="tabpanel" aria-labelledby={`${activeWorkflow}-tab`} id={`${activeWorkflow}-panel`}>
          {workflowTools.length > 0 ? (
            <>
              {/* Problem Context for Active Workflow */}
              {activeContext.problem && (
                <div className="bg-background-raised rounded-2xl border border-border/50 p-6 space-y-4">
                  <div>
                    <h3 className="font-medium text-foreground-strong text-sm mb-2">The Challenge</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{activeContext.problem}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground-strong text-sm mb-2">How AI Helps</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{activeContext.solution}</p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="text-base font-medium text-foreground-strong">
                  Recommended Tools for {activeSection?.title || 'this workflow'}
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
                      <p className="text-xs text-foreground/70 mt-1">
                        {config.toolReasoningPrefix}: {tool.tagline}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-200 shrink-0" />
                  </Link>
                ))}
              </div>

              {/* Link to dedicated workflow guide */}
              <Link
                href={`/for/${config.personaSlug}/${activeWorkflow}`}
                className="inline-flex items-center gap-2 text-xs font-bold text-foreground bg-foreground/5 border border-border/50 px-4 py-2.5 rounded-xl hover:bg-foreground/5 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                View detailed {activeSection?.title || 'workflow'} guide
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
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

      {/* How We Select Tools Section */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-background-raised rounded-2xl border border-border/50 p-6 sm:p-8">
          <h2 className="text-xl font-medium text-foreground-strong flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-foreground" />
            {config.selectionCriteriaSectionTitle}
          </h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>{config.selectionCriteriaIntro}</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              {config.selectionCriteria.map((criteria, index) => (
                <li key={index}><strong className="text-foreground-strong">{criteria.category}:</strong> {criteria.description}</li>
              ))}
            </ul>
            <p className="pt-2">{config.selectionCriteriaOutro}</p>
          </div>
        </div>
      </div>

      {/* Category Link */}
      <div className="max-w-4xl mx-auto">
        <Link
          href={config.categoryLink.href}
          className="inline-flex items-center gap-2 text-xs font-bold text-foreground bg-foreground/5 border border-border/50 px-4 py-2.5 rounded-xl hover:bg-foreground/5 transition-colors"
        >
          <Layers className="w-4 h-4" />
          {config.categoryLink.text}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
