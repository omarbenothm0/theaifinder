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
  primary: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  strong: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  partial: 'bg-amber-100 text-amber-800 border-amber-200',
  listed: 'bg-slate-100 text-slate-700 border-slate-200',
  exclude: 'bg-red-100 text-red-800 border-red-200',
};

export function UseCaseToolCard({ tool }: UseCaseToolCardProps) {
  const { useCaseFit } = tool;
  const tier = useCaseFit.fitTier;
  const outbound = getToolOutboundLink(tool);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 hover:shadow-md transition-all">
      <div className="flex items-start gap-4">
        <Image
          src={tool.logo}
          alt={`${tool.name} logo`}
          width={48}
          height={48}
          referrerPolicy="no-referrer"
          className="w-12 h-12 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
        />

        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/tools/${tool.slug}`}
              className="font-bold text-slate-900 hover:text-emerald-600 transition-colors"
            >
              {tool.name}
            </Link>
            {tool.verified && (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-label="Verified" />
            )}
            <span
              className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded border ${TIER_STYLES[tier]}`}
            >
              {TIER_LABELS[tier]}
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">{tool.tagline}</p>

          <p className="text-xs text-slate-700 bg-slate-50 rounded-lg px-3 py-2 border border-slate-100">
            <span className="font-semibold text-slate-900">Verified capabilities: </span>
            {useCaseFit.capabilities}
          </p>

          {useCaseFit.limitation && (
            <p className="text-xs text-amber-800 bg-amber-50 rounded-lg px-3 py-2 border border-amber-100">
              <span className="font-semibold">Limitation: </span>
              {useCaseFit.limitation}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href={`/tools/${tool.slug}`}
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-emerald-600 transition-colors"
            >
              Full profile
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href={outbound.href}
              target="_blank"
              rel={outbound.rel}
              title={outbound.title}
              className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Official site
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={useCaseFit.evidenceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 transition-colors"
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
