'use client';

import { useState } from 'react';
import { Tool } from '../../types/tool';
import { ToolCard } from '../tool/ToolCard';
import { Compass, CheckCircle2, RotateCcw, ArrowRight, Sparkles, Layers, DollarSign, Users } from 'lucide-react';
import { toolMatchesUseCase } from '../../lib/utils/useCaseMatch';

interface FinderWizardProps {
  initialTools: Tool[];
}

export function FinderWizard({ initialTools }: FinderWizardProps) {
  const [step, setStep] = useState(1);
  const [useCase, setUseCase] = useState('writing');
  const [role, setRole] = useState('content-creators');
  const [budgetPreference, setBudgetPreference] = useState('freemium');

  const [evaluating, setEvaluating] = useState(false);
  const [results, setResults] = useState<Array<{ tool: Tool; score: number; matchReasons: string[] }> | null>(null);

  const handleEvaluate = async () => {
    setEvaluating(true);
    try {
      const response = await fetch('/api/finder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ useCase, role, budgetPreference }),
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data.recommendations ?? []);
        setStep(4);
        return;
      }

      // Fallback: client-side scoring if API unavailable
      const tools = initialTools;
      const scored = tools.map((tool) => {
        let score = 70;
        const matchReasons: string[] = [];

        if (toolMatchesUseCase(tool, useCase)) {
          score += 20;
          matchReasons.push(`Directly matches your primary use case: ${useCase.replace(/-/g, ' ')}`);
        }

        if (tool.targetUsers.includes(role)) {
          score += 20;
          matchReasons.push(`Optimized for ${role.replace(/-/g, ' ')} workflows`);
        }

        if (budgetPreference === 'free-only') {
          if (tool.pricingModel === 'Free') {
            score += 10;
            matchReasons.push('Fully free tool model with zero subscription cost');
          } else {
            score -= 30;
          }
        } else if (budgetPreference === 'freemium') {
          if (tool.pricingModel === 'Free' || tool.pricingModel === 'Freemium' || tool.hasFreeTrial) {
            score += 10;
            matchReasons.push('Offers a free plan or free trial');
          }
        }

        if (tool.verified) {
          score += 5;
          matchReasons.push('Verified listing with active development');
        }

        if (tool.rating >= 4.5) {
          score += 5;
          matchReasons.push(`High user rating (${tool.rating.toFixed(1)}/5.0)`);
        }

        return { tool, score: Math.min(score, 99), matchReasons };
      });

      scored.sort((a, b) => b.score - a.score);
      setResults(scored.slice(0, 5));
      setStep(4);
    } catch (err) {
      console.error('Finder evaluation error:', err);
    } finally {
      setEvaluating(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setResults(null);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-semibold">
          <Compass className="w-3.5 h-3.5 text-emerald-600" />
          Interactive AI Recommendation Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">AI Tool Finder</h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Find the right AI tool tailored precisely to your specific task, role, and budget in under 30 seconds.
        </p>
      </div>

      {/* Step Progress Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex items-center justify-between text-xs font-bold text-slate-500">
        <div className={`flex items-center gap-2 ${step >= 1 ? 'text-emerald-600' : ''}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-emerald-600 text-white' : 'bg-slate-100'}`}>
            1
          </span>
          <span className="hidden sm:inline">Use Case</span>
        </div>
        <div className="w-12 h-0.5 bg-slate-200"></div>

        <div className={`flex items-center gap-2 ${step >= 2 ? 'text-emerald-600' : ''}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-emerald-600 text-white' : 'bg-slate-100'}`}>
            2
          </span>
          <span className="hidden sm:inline">Your Role</span>
        </div>
        <div className="w-12 h-0.5 bg-slate-200"></div>

        <div className={`flex items-center gap-2 ${step >= 3 ? 'text-emerald-600' : ''}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-emerald-600 text-white' : 'bg-slate-100'}`}>
            3
          </span>
          <span className="hidden sm:inline">Budget</span>
        </div>
        <div className="w-12 h-0.5 bg-slate-200"></div>

        <div className={`flex items-center gap-2 ${step === 4 ? 'text-emerald-600' : ''}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center ${step === 4 ? 'bg-emerald-600 text-white' : 'bg-slate-100'}`}>
            4
          </span>
          <span className="hidden sm:inline">Results</span>
        </div>
      </div>

      {/* Wizard Form Cards */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-8">
        
        {/* Step 1: Use Case */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" />
                Step 1 of 3
              </span>
              <h2 className="text-xl font-bold text-slate-900">What do you need AI for?</h2>
              <p className="text-xs text-slate-500">Select the primary objective you want to accomplish:</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'writing', name: 'Writing & Copywriting', desc: 'Articles, ads, emails, summaries, and docs' },
                { id: 'coding', name: 'Coding & Software', desc: 'Code completion, debugging, and refactoring' },
                { id: 'video', name: 'Video & Motion', desc: 'Text-to-video, editing, and subtitle automation' },
                { id: 'image', name: 'Images & Design', desc: 'Generative artwork, thumbnails, and graphic editing' },
                { id: 'voice', name: 'Voice & Speech', desc: 'Voiceover synthesis, audio dubbing, and cleanup' },
                { id: 'seo', name: 'SEO & Research', desc: 'Live search research, keyword analysis, and citations' },
                { id: 'presentations', name: 'Presentations', desc: 'Slide decks, pitch presentations, and visual reports' },
                { id: 'productivity', name: 'Productivity', desc: 'Knowledge assistants and workflow tools' },
                { id: 'project-management', name: 'Project Management', desc: 'Meeting notes, tasks, plans, and status reports for PMs' },
                { id: 'study-education', name: 'Study & Education', desc: 'Flashcards, homework help, research, writing, and lecture notes' },
                { id: 'marketing', name: 'Marketing & Growth', desc: 'Content, SEO, social, email campaigns, ads, and analytics' },
                { id: 'teaching', name: 'Teaching & Classroom', desc: 'Lesson plans, worksheets, quizzes, grading, and classroom support' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setUseCase(item.id)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    useCase === item.id
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-2xs font-bold text-slate-900'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-sm font-bold text-slate-900 mb-1 flex items-center justify-between">
                    <span>{item.name}</span>
                    {useCase === item.id && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </div>
                  <p className="text-xs text-slate-500 font-normal leading-relaxed">{item.desc}</p>
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setStep(2)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <span>Next: Your Role</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Role / Persona */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                Step 2 of 3
              </span>
              <h2 className="text-xl font-bold text-slate-900">What best describes your role?</h2>
              <p className="text-xs text-slate-500">We prioritize tools optimized for your specific role:</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'content-creators', name: 'Content Creator / Streamer' },
                { id: 'youtubers', name: 'YouTuber & Video Producer' },
                { id: 'writers', name: 'Writer, Blogger & Journalist' },
                { id: 'developers', name: 'Software Engineer & Developer' },
                { id: 'marketers', name: 'Marketer & Growth Strategist' },
                { id: 'teachers', name: 'Teacher, Educator & Tutor' },
                { id: 'real-estate-agents', name: 'Real Estate Broker & Agent' },
                { id: 'entrepreneurs', name: 'Startup Founder & Entrepreneur' },
                { id: 'project-managers', name: 'Project Manager' },
                { id: 'students', name: 'Student' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setRole(item.id)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    role === item.id
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-2xs font-bold text-slate-900'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-sm font-bold text-slate-900 flex items-center justify-between">
                    <span>{item.name}</span>
                    {role === item.id && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <span>Next: Budget</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Budget */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5" />
                Step 3 of 3
              </span>
              <h2 className="text-xl font-bold text-slate-900">What is your pricing preference?</h2>
              <p className="text-xs text-slate-500">Filter software options based on financial requirements:</p>
            </div>

            <div className="space-y-3">
              {[
                { id: 'free-only', name: 'Strictly Free Tools', desc: '100% free software without monthly mandatory plans' },
                { id: 'freemium', name: 'Free Tier / Trial Available (Recommended)', desc: 'Include free plans, trials, and premium options' },
                { id: 'any', name: 'Any Pricing Tier', desc: 'Show top professional tools regardless of cost' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setBudgetPreference(item.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    budgetPreference === item.id
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-2xs font-bold text-slate-900'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-sm font-bold text-slate-900 mb-1 flex items-center justify-between">
                    <span>{item.name}</span>
                    {budgetPreference === item.id && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </div>
                  <p className="text-xs text-slate-500 font-normal leading-relaxed">{item.desc}</p>
                </button>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={handleEvaluate}
                disabled={evaluating}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm px-8 py-3.5 rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>{evaluating ? 'Evaluating Match Matrix...' : 'Generate My Tool Match Report'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Results */}
        {step === 4 && results && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Matching Evaluation Complete
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Your Top Recommended AI Tools</h2>
              </div>

              <button
                onClick={handleReset}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Restart Quiz
              </button>
            </div>

            <div className="space-y-6">
              {results.map((resItem, idx) => (
                <div key={resItem.tool.id} className="relative">
                  <div className="absolute -top-3 right-4 z-10 bg-slate-900 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md flex items-center gap-1 border border-emerald-400/40">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span>#{idx + 1} Match &bull; {resItem.score}% Fit Score</span>
                  </div>

                  <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
                    <ToolCard tool={resItem.tool} layout="list" />

                    {/* Match reasoning list */}
                    {resItem.matchReasons.length > 0 && (
                      <div className="bg-white p-3 rounded-xl border border-slate-100 text-xs text-slate-700">
                        <span className="font-bold text-slate-900 block mb-1">Why this was recommended for you:</span>
                        <ul className="space-y-1">
                          {resItem.matchReasons.map((reason, rIdx) => (
                            <li key={rIdx} className="flex items-center gap-1.5 text-emerald-800">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
