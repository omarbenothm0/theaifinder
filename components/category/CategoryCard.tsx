import Link from 'next/link';
import { Category } from '../../types/tool';
import { Layers, ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800 group-hover:bg-slate-900 group-hover:text-emerald-400 transition-colors">
            <Layers className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            {category.toolCount} Tools
          </span>
        </div>

        <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-emerald-600 transition-colors">
          {category.name}
        </h3>
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {category.description}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900 group-hover:text-emerald-600">
        <span>Explore Category</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
