import Link from 'next/link';
import { Category, Persona, Comparison, Tool } from '../../types/tool';
import { ArrowRight, Sparkles, Layers, Users, Zap } from 'lucide-react';
import { sortPublicPersonasByNavOrder } from '../../lib/seo/persona-visibility';
import { isComparisonIndexable } from '../../lib/seo/indexability';

interface InternalLinksProps {
  categories?: Category[];
  personas?: Persona[];
  comparisons?: Comparison[];
  relatedTools?: Tool[];
  title?: string;
  excludeCategorySlug?: string;
  excludePersonaSlug?: string;
  excludeComparisonSlug?: string;
}

export function InternalLinks({
  categories = [],
  personas = [],
  comparisons = [],
  relatedTools = [],
  title = 'Explore Related Tools & Guides',
  excludeCategorySlug,
  excludePersonaSlug,
  excludeComparisonSlug,
}: InternalLinksProps) {
  const visibleCategories = categories.filter(
    (cat) => !excludeCategorySlug || cat.slug !== excludeCategorySlug
  );
  const visiblePersonas = sortPublicPersonasByNavOrder(personas).filter(
    (p) => !excludePersonaSlug || p.slug !== excludePersonaSlug
  );
  const visibleComparisons = comparisons.filter(
    (comp) =>
      isComparisonIndexable(comp).indexable &&
      (!excludeComparisonSlug || comp.slug !== excludeComparisonSlug)
  );

  if (
    visibleCategories.length === 0 &&
    visiblePersonas.length === 0 &&
    visibleComparisons.length === 0 &&
    relatedTools.length === 0
  ) {
    return null;
  }

  const sectionIcon = 'w-3.5 h-3.5 text-inverted-foreground/80';
  const linkClass =
    'text-inverted-foreground/70 hover:text-inverted-foreground font-medium flex items-center justify-between group py-1 transition-colors';

  return (
    <div className="bg-inverted text-inverted-foreground rounded-2xl p-6 sm:p-8 space-y-8 my-12 border border-inverted-foreground/20">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-inverted-foreground/80" />
        <h3 className="text-lg font-medium text-inverted-foreground">{title}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleCategories.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-medium uppercase tracking-wider text-inverted-foreground/50 flex items-center gap-1.5">
              <Layers className={sectionIcon} />
              Related Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {visibleCategories.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className={linkClass}>
                    <span>{cat.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-inverted-foreground/40 group-hover:translate-x-1 group-hover:text-inverted-foreground transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {visiblePersonas.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-medium uppercase tracking-wider text-inverted-foreground/50 flex items-center gap-1.5">
              <Users className={sectionIcon} />
              AI Tools by Role
            </h4>
            <ul className="space-y-2 text-xs">
              {visiblePersonas.slice(0, 6).map((p) => (
                <li key={p.slug}>
                  <Link href={`/for/${p.slug}`} className={linkClass} title={`AI tools for ${p.subtitle || p.title}`}>
                    <span>{p.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-inverted-foreground/40 group-hover:translate-x-1 group-hover:text-inverted-foreground transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {visibleComparisons.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-medium uppercase tracking-wider text-inverted-foreground/50 flex items-center gap-1.5">
              <Zap className={sectionIcon} />
              Head-to-Head Comparisons
            </h4>
            <ul className="space-y-2 text-xs">
              {visibleComparisons.slice(0, 6).map((comp) => (
                <li key={comp.slug}>
                  <Link href={`/compare/${comp.slug}`} className={linkClass}>
                    <span>{comp.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-inverted-foreground/40 group-hover:translate-x-1 group-hover:text-inverted-foreground transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {relatedTools.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-medium uppercase tracking-wider text-inverted-foreground/50 flex items-center gap-1.5">
              <Sparkles className={sectionIcon} />
              Top Alternative Tools
            </h4>
            <ul className="space-y-2 text-xs">
              {relatedTools.slice(0, 6).map((tool) => (
                <li key={tool.slug}>
                  <Link href={`/tools/${tool.slug}`} className={linkClass}>
                    <span>{tool.name}</span>
                    <span className="text-[10px] text-inverted-foreground/50 bg-inverted-foreground/10 px-1.5 py-0.5 rounded">
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
