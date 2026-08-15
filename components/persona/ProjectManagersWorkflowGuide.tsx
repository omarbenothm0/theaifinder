'use client';

import { useState, useMemo } from 'react';
import { Tool, UseCaseFitTier } from '../../types/tool';
import { WorkflowTool, WorkflowSection } from '../../types/persona';
import { ToolCard } from '../tool/ToolCard';
import { BookOpen, Star, ArrowRight, Users, CheckCircle2, Layers } from 'lucide-react';
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

interface ProjectManagersWorkflowGuideProps {
  tools: Tool[];
  toolUseCases: PersonaToolUseCase[];
  useCases: PersonaUseCase[];
  personaTitle: string;
}

export function ProjectManagersWorkflowGuide({ 
  tools, 
  toolUseCases, 
  useCases,
  personaTitle
}: ProjectManagersWorkflowGuideProps) {
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
  const workflowTools = activeSection?.tools || [];

  // PM-specific problem context
  const getProblemContext = (workflowSlug: string) => {
    switch (workflowSlug) {
      case 'meeting-notes':
        return {
          problem: "Meeting overload makes it hard to capture action items and decisions. As a project manager, you're often in back-to-back meetings where critical decisions get lost or action items are forgotten.",
          solution: "AI meeting notetakers automatically transcribe conversations, extract decisions, and identify action items so you can focus on the discussion while ensuring nothing falls through the cracks.",
        };
      case 'task-management':
        return {
          problem: "Task chaos and unclear prioritization can derail projects. With multiple workstreams, dependencies, and shifting deadlines, it's challenging to keep everyone aligned on what matters most.",
          solution: "AI-powered task management tools help prioritize work, automatically assign tasks based on team capacity, and provide intelligent planning assistance to keep projects on track.",
        };
      case 'project-reporting':
        return {
          problem: "Reporting pressure and stakeholder updates consume valuable time. Creating status reports and stakeholder presentations often means manually compiling updates from multiple sources and formatting them for different audiences.",
          solution: "AI reporting tools automatically generate status updates and stakeholder presentations by synthesizing information from meetings, tickets, and project updates, saving hours of manual work.",
        };
      default:
        return {
          problem: "",
          solution: "",
        };
    }
  };

  const activeContext = getProblemContext(activeWorkflow);

  return (
    <div className="space-y-10">
      {/* PM Problem Context */}
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-background-raised rounded-2xl border border-border/50 p-6 sm:p-8">
          <h2 className="text-xl font-medium text-foreground-strong flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-foreground" />
            Common PM Challenges
          </h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center text-xs font-bold text-foreground">1</div>
              <div>
                <h3 className="font-medium text-foreground-strong text-sm mb-1">Meeting Overload</h3>
                <p className="text-sm text-muted-foreground">Back-to-back meetings make it difficult to capture action items and decisions that drive projects forward.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center text-xs font-bold text-foreground">2</div>
              <div>
                <h3 className="font-medium text-foreground-strong text-sm mb-1">Task Chaos & Prioritization</h3>
                <p className="text-sm text-muted-foreground">Multiple workstreams, dependencies, and shifting deadlines create uncertainty about what matters most.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center text-xs font-bold text-foreground">3</div>
              <div>
                <h3 className="font-medium text-foreground-strong text-sm mb-1">Reporting Pressure</h3>
                <p className="text-sm text-muted-foreground">Stakeholder updates and status reports consume hours of manual compilation and formatting work.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Exploration */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border/50 pb-3">
          <h2 className="text-xl font-medium text-foreground-strong flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-foreground" />
            PM Workflow Guides
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
                        Why this works for PMs: {tool.tagline}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-200 shrink-0" />
                  </Link>
                ))}
              </div>

              {/* Link to dedicated workflow guide */}
              <Link
                href={`/for/project-managers/${activeWorkflow}`}
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
            How We Select Tools for Project Managers
          </h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>We evaluate tools based on verified PM workflows from official product sources:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong className="text-foreground-strong">Meeting capture:</strong> Transcription accuracy, action item extraction, and PM platform integrations</li>
              <li><strong className="text-foreground-strong">Task management:</strong> AI prioritization, planning assistance, and team collaboration features</li>
              <li><strong className="text-foreground-strong">Reporting:</strong> Status report generation, stakeholder deck creation, and update synthesis</li>
              <li><strong className="text-foreground-strong">PM fit:</strong> Designed for or commonly adopted by project managers in real workflows</li>
            </ul>
            <p className="pt-2">All tools are verified from official product pages, documentation, or pricing information to ensure accuracy for PM decision-making.</p>
          </div>
        </div>
      </div>

      {/* Category Link */}
      <div className="max-w-4xl mx-auto">
        <Link
          href="/category/project-management"
          className="inline-flex items-center gap-2 text-xs font-bold text-foreground bg-foreground/5 border border-border/50 px-4 py-2.5 rounded-xl hover:bg-foreground/5 transition-colors"
        >
          <Layers className="w-4 h-4" />
          Browse all AI project management software
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
