import { PersonaHubSection } from '../../types/tool';
import { UseCaseToolCard } from '../tool/UseCaseToolCard';
import { Layers } from 'lucide-react';

interface StudentHubSectionsProps {
  sections: PersonaHubSection[];
  heading?: string;
}

export function StudentHubSections({ sections, heading = 'Student Workflows' }: StudentHubSectionsProps) {
  if (sections.length === 0) return null;

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600" />
          {heading}
        </h2>
      </div>

      {sections.map((section) => (
        <section
          key={section.useCase.slug}
          id={section.useCase.slug}
          className="scroll-mt-24 space-y-4"
        >
          <div className="space-y-1">
            <h3 className="text-lg font-extrabold text-slate-900">{section.useCase.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
              {section.useCase.description}
            </p>
          </div>

          {section.tools.length > 0 ? (
            <div className="grid gap-4">
              {section.tools.map((tool) => (
                <UseCaseToolCard key={`${section.useCase.slug}-${tool.slug}`} tool={tool} />
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">No verified tools mapped for this workflow yet.</p>
          )}
        </section>
      ))}
    </div>
  );
}
