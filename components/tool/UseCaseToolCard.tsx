import Link from 'next/link';
import Image from 'next/image';
import { ToolWithUseCaseFit, UseCaseFitTier } from '../../types/tool';
import { CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { getToolOutboundLink } from '../../lib/utils/toolOutboundLink';

interface UseCaseToolCardProps {
  tool: ToolWithUseCaseFit;
}

const TIER_LABELS: Record<UseCaseFitTier, string> = {
  primary: 'Primary fit',
  strong: 'Strong fit',
  partial: 'Partial fit',
  listed: 'Listed',
  exclude: 'Excluded',
};

const TIER_STYLES: Record<UseCaseFitTier, string> = {
  primary: 'bg-verified-muted text-verified border-verified-border',
  strong: 'bg-verified-muted text-verified border-verified-border',
  partial: 'bg-rating-muted text-rating-foreground border-rating-border',
  listed: 'bg-foreground/5 text-foreground border-border/50',
  exclude: 'bg-destructive-muted text-destructive-text border-destructive-border',
};

export function UseCaseToolCard({ tool }: UseCaseToolCardProps) {
  const { useCaseFit } = tool;
  const tier = useCaseFit.fitTier;
  const outbound = getToolOutboundLink(tool);

  return (
    <div className="bg-background-raised rounded-xl border border-border/50 p-5 shadow-xs hover:border-border hover:shadow-md transition-all">
      <div className="flex items-start gap-4">
        <Image
          src={tool.logo}
          alt={`${tool.name} logo`}
          width={48}
          height={48}
          referrerPolicy="no-referrer"
          className="w-12 h-12 rounded-lg object-cover bg-foreground/5 border border-border/50 shrink-0"
        />

        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/tools/${tool.slug}`}
              className="font-bold text-foreground-strong hover:text-foreground-strong transition-colors"
            >
              {tool.name}
            </Link>
            {tool.verified && (
              <CheckCircle2 className="w-4 h-4 text-verified" aria-label="Verified" />
            )}
            <span
              className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded border ${TIER_STYLES[tier]}`}
            >
              {TIER_LABELS[tier]}
            </span>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">{tool.tagline}</p>

          <p className="text-xs text-foreground bg-background rounded-lg px-3 py-2 border border-border/30">
            <span className="font-semibold text-foreground-strong">Verified capabilities: </span>
            {useCaseFit.capabilities}
          </p>

          {useCaseFit.limitation && (
            <p className="text-xs text-rating-foreground bg-rating-muted rounded-lg px-3 py-2 border border-rating-border">
              <span className="font-semibold">Limitation: </span>
              {useCaseFit.limitation}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href={`/tools/${tool.slug}`}
              className="inline-flex items-center gap-1 text-xs font-bold text-foreground hover:text-foreground-strong transition-colors"
            >
              Full profile
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href={outbound.href}
              target="_blank"
              rel={outbound.rel}
              title={outbound.title}
              className="inline-flex items-center gap-1 text-xs font-bold text-foreground hover:text-foreground-strong transition-colors"
            >
              Official site
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={useCaseFit.evidenceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Evidence source
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
