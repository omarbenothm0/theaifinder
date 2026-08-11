import Link from 'next/link';
import { PersonaUseCaseLink } from '../../types/tool';
import { ArrowRight, Clock, Layers } from 'lucide-react';

interface PersonaUseCaseCardsProps {
  personaSlug: string;
  useCases: PersonaUseCaseLink[];
}

export function PersonaUseCaseCards({ personaSlug, useCases }: PersonaUseCaseCardsProps) {
  if (useCases.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600" />
          Use Cases
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {useCases.map((item) => {
          const href = `/for/${personaSlug}/${item.useCase.slug}`;
          const isEnabled = item.pageEnabled;

          if (isEnabled) {
            return (
              <Link
                key={item.useCase.slug}
                href={href}
                className="group bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all flex flex-col gap-3"
              >
                <h3 className="font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                  {item.useCase.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed flex-1">
                  {item.useCase.description}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600">
                  View verified tools
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            );
          }

          return (
            <div
              key={item.useCase.slug}
              className="bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-5 flex flex-col gap-3"
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <h3 className="font-bold text-slate-700">{item.useCase.title}</h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed flex-1">
                {item.hubNote ?? item.useCase.description}
              </p>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Standalone page deferred
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
