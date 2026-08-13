import type { ReactNode } from 'react';

interface PageHeroProps {
  badge?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
  centered?: boolean;
}

/** Dark editorial hero band — matches homepage inverted CTA styling. */
export function PageHero({
  badge,
  title,
  description,
  children,
  className = '',
  centered = true,
}: PageHeroProps) {
  return (
    <div
      className={`bg-inverted text-inverted-foreground rounded-3xl p-8 sm:p-12 shadow-lg max-w-4xl mx-auto space-y-4 ${
        centered ? 'text-center' : ''
      } ${className}`}
    >
      {badge}
      <h1 className="text-3xl sm:text-4xl font-medium tracking-[-0.3px] text-inverted-foreground">
        {title}
      </h1>
      {description && (
        <p className="text-sm sm:text-base text-inverted-foreground/70 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

interface PageHeroBadgeProps {
  icon?: ReactNode;
  children: ReactNode;
}

export function PageHeroBadge({ icon, children }: PageHeroBadgeProps) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-inverted-foreground/20 bg-inverted-foreground/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.015em] text-inverted-foreground/85">
      {icon}
      {children}
    </div>
  );
}
