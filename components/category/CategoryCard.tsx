import Link from 'next/link';
import { Category } from '../../types/tool';
import { Layers, ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/category/${category.slug}`} className="home-card group flex flex-col justify-between p-5 md:p-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/40 bg-foreground/5 text-foreground transition-colors group-hover:bg-inverted group-hover:text-inverted-foreground">
            <Layers className="w-5 h-5" />
          </div>
          <span className="home-pill home-pill-outline !text-[11px] !py-0.5 !px-2">
            {category.toolCount} Tools
          </span>
        </div>

        <h3 className="text-base font-medium text-foreground-strong mb-1 group-hover:text-foreground-strong transition-colors">
          {category.name}
        </h3>
        <p className="text-[13px] leading-[1.35] text-muted-foreground line-clamp-2 mb-4">
          {category.description}
        </p>
      </div>

      <div className="pt-3 border-t border-border/30 flex items-center justify-between text-[13px] font-medium text-muted-foreground group-hover:text-foreground transition-colors">
        <span>Explore category</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
