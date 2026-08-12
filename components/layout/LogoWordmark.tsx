export type LogoWordmarkVariant = '1' | '2' | '3';

export const LOGO_VARIANT_LABELS: Record<
  LogoWordmarkVariant,
  { name: string; description: string }
> = {
  '1': {
    name: 'Split Semibold',
    description: 'TheRadar in strong foreground + Hub muted. Tight -0.04em tracking, semibold — Linear-style.',
  },
  '2': {
    name: 'Bold Monolith',
    description: 'Single-weight bold wordmark, unified foreground. -0.03em tracking — Vercel-style.',
  },
  '3': {
    name: 'Tri-tone Refinement',
    description: 'The muted · Radar semibold strong · Hub softer muted. -0.035em — Stripe-style rhythm.',
  },
};

type LogoWordmarkProps = {
  variant?: LogoWordmarkVariant;
  className?: string;
};

export function LogoWordmark({ variant = '1', className = '' }: LogoWordmarkProps) {
  const font = 'font-[family-name:var(--font-wordmark)]';

  if (variant === '2') {
    return (
      <span
        className={`${font} text-[19px] font-bold tracking-[-0.03em] text-foreground-strong truncate ${className}`}
      >
        TheRadarHub
      </span>
    );
  }

  if (variant === '3') {
    return (
      <span className={`${font} text-[19px] tracking-[-0.035em] truncate ${className}`}>
        <span className="font-medium text-muted-foreground">The</span>
        <span className="font-semibold text-foreground-strong">Radar</span>
        <span className="font-medium text-muted-foreground/80">Hub</span>
      </span>
    );
  }

  return (
    <span
      className={`${font} text-[23px] font-semibold tracking-[-0.04em] text-foreground-strong leading-none truncate ${className}`}
    >
      TheRadarHub
    </span>
  );
}
