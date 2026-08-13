import type { ReactNode } from 'react';

interface PageHeroProps {
  badge?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
  centered?: boolean;
  maxWidth?: '4xl' | '5xl';
  titleSize?: 'default' | 'compact';
}

const MAX_WIDTH_CLASS = {
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
} as const;

const TITLE_SIZE_CLASS = {
  default: 'text-3xl sm:text-5xl',
  compact: 'text-3xl sm:text-4xl',
} as const;

/** Dark editorial hero band — canonical inverted page header. */
export function PageHero({
  badge,
  title,
  description,
  children,
  className = '',
  centered = true,
  maxWidth = '4xl',
  titleSize = 'default',
}: PageHeroProps) {
  return (
    <div
      className={`bg-inverted text-inverted-foreground rounded-3xl p-8 sm:p-12 shadow-lg ${MAX_WIDTH_CLASS[maxWidth]} mx-auto space-y-4 ${
        centered ? 'text-center' : ''
      } ${className}`}
    >
      {badge}
      <h1 className={`${TITLE_SIZE_CLASS[titleSize]} font-medium tracking-[-0.3px] leading-tight text-inverted-foreground`}>
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

/** Neutral badge on inverted hero (subtle inverted-foreground tint). */
export function PageHeroBadge({ icon, children }: PageHeroBadgeProps) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-inverted-foreground/20 bg-inverted-foreground/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.015em] text-inverted-foreground/85">
      {icon}
      {children}
    </div>
  );
}

interface PageHeroAccentBadgeProps {
  icon?: ReactNode;
  children: ReactNode;
}

/** Neutral metadata badge on inverted hero (category/persona hubs). */
export function PageHeroAccentBadge({ icon, children }: PageHeroAccentBadgeProps) {
  return <PageHeroBadge icon={icon}>{children}</PageHeroBadge>;
}

interface PageHeroRatingBadgeProps {
  icon?: ReactNode;
  children: ReactNode;
}

/** Rating-tinted badge on inverted hero (comparisons, featured listings). */
export function PageHeroRatingBadge({ icon, children }: PageHeroRatingBadgeProps) {
  return (
    <div className="home-rating-badge-inverted">
      {icon}
      {children}
    </div>
  );
}
