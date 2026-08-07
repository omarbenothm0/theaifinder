import Link from 'next/link';
import { Category, Persona, Comparison, Tool } from '../../types/tool';
import { ArrowRight, Sparkles, Layers, Users, Zap } from 'lucide-react';

interface InternalLinksProps {
  categories?: Category[];
  personas?: Persona[];
  comparisons?: Comparison[];
  relatedTools?: Tool[];
  title?: string;
}

export function InternalLinks({
  categories = [],
  personas = [],
  comparisons = [],
  relatedTools = [],
  title = 'Explore Related Hubs & Comparisons'
}: InternalLinksProps) {
  if (
    categories.length === 0 &&
    personas.length === 0 &&
    comparisons.length === 0 &&
    relatedTools.length === 0
  ) {
    return null;
  }

  return (
    <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 sm:p-8 space-y-8 my-12 border border-slate-800">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-emerald-400" />
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Categories Section */}
        {categories.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              Related Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-slate-300 hover:text-emerald-400 font-medium flex items-center justify-between group py-1"
                  >
                    <span>{cat.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-1 group-hover:text-emerald-400 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Personas / Workflows Section */}
        {personas.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              Workflow Hubs
            </h4>
            <ul className="space-y-2 text-xs">
              {personas.slice(0, 6).map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/for/${p.slug}`}
                    className="text-slate-300 hover:text-emerald-400 font-medium flex items-center justify-between group py-1"
                  >
                    <span>{p.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-1 group-hover:text-emerald-400 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Comparisons Section */}
        {comparisons.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              Head-to-Head Comparisons
            </h4>
            <ul className="space-y-2 text-xs">
              {comparisons.slice(0, 6).map((comp) => (
                <li key={comp.slug}>
                  <Link
                    href={`/compare/${comp.slug}`}
                    className="text-slate-300 hover:text-emerald-400 font-medium flex items-center justify-between group py-1"
                  >
                    <span>{comp.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-1 group-hover:text-emerald-400 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related Tools Section */}
        {relatedTools.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Top Alternative Tools
            </h4>
            <ul className="space-y-2 text-xs">
              {relatedTools.slice(0, 6).map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="text-slate-300 hover:text-emerald-400 font-medium flex items-center justify-between group py-1"
                  >
                    <span>{tool.name}</span>
                    <span className="text-[10px] text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">
                      {tool.pricingModel}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
