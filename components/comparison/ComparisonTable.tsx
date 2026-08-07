import Link from 'next/link';
import Image from 'next/image';
import { Tool, Comparison } from '../../types/tool';
import { CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface ComparisonTableProps {
  comparison: Comparison;
  tool1: Tool;
  tool2: Tool;
}

export function ComparisonTable({ comparison, tool1, tool2 }: ComparisonTableProps) {
  return (
    <div className="space-y-10">
      
      {/* Side-by-Side Hero Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Tool 1 Card */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src={tool1.logo} alt={tool1.name} width={56} height={56} referrerPolicy="no-referrer" className="w-14 h-14 rounded-2xl object-cover bg-slate-100 border border-slate-200" />
              <div>
                <h3 className="text-xl font-bold text-slate-900">{tool1.name}</h3>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  {tool1.categoryName}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">{tool1.tagline}</p>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 mb-4 text-xs">
              <span className="font-bold text-slate-900 block mb-1">Best For:</span>
              <p className="text-slate-600 leading-relaxed">{comparison.bestFor1}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="text-xs">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Pricing</span>
              <span className="font-extrabold text-slate-900">
                {tool1.pricingModel} {tool1.monthlyPrice ? `($${tool1.monthlyPrice}/mo)` : ''}
              </span>
            </div>

            <Link
              href={`/tools/${tool1.slug}`}
              className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
            >
              Full Profile
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Tool 2 Card */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src={tool2.logo} alt={tool2.name} width={56} height={56} referrerPolicy="no-referrer" className="w-14 h-14 rounded-2xl object-cover bg-slate-100 border border-slate-200" />
              <div>
                <h3 className="text-xl font-bold text-slate-900">{tool2.name}</h3>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  {tool2.categoryName}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">{tool2.tagline}</p>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 mb-4 text-xs">
              <span className="font-bold text-slate-900 block mb-1">Best For:</span>
              <p className="text-slate-600 leading-relaxed">{comparison.bestFor2}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="text-xs">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Pricing</span>
              <span className="font-extrabold text-slate-900">
                {tool2.pricingModel} {tool2.monthlyPrice ? `($${tool2.monthlyPrice}/mo)` : ''}
              </span>
            </div>

            <Link
              href={`/tools/${tool2.slug}`}
              className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
            >
              Full Profile
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

      {/* Feature Breakdown Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              Feature Comparison Matrix
            </h3>
            <p className="text-xs text-slate-400">Direct head-to-head evaluation parameters</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold">
                <th className="p-4 w-1/3">Feature / Metric</th>
                <th className="p-4 w-1/3 font-extrabold text-slate-900">{tool1.name}</th>
                <th className="p-4 w-1/3 font-extrabold text-slate-900">{tool2.name}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {comparison.featureBreakdown.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-semibold text-slate-900 bg-slate-50/50">{row.feature}</td>
                  <td className={`p-4 ${row.winnerSlug === tool1.slug ? 'bg-emerald-50/50 font-bold text-emerald-950' : ''}`}>
                    <div className="flex items-center gap-1.5">
                      {row.winnerSlug === tool1.slug && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                      <span>{row.tool1Value}</span>
                    </div>
                  </td>
                  <td className={`p-4 ${row.winnerSlug === tool2.slug ? 'bg-emerald-50/50 font-bold text-emerald-950' : ''}`}>
                    <div className="flex items-center gap-1.5">
                      {row.winnerSlug === tool2.slug && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                      <span>{row.tool2Value}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editorial Verdict Box */}
      <div className="bg-emerald-900 text-emerald-100 rounded-2xl p-6 sm:p-8 shadow-sm">
        <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          AIFind Editorial Recommendation
        </span>
        <h4 className="text-xl font-bold text-white mb-3">Final Verdict</h4>
        <p className="text-sm leading-relaxed text-emerald-100">{comparison.verdict}</p>
      </div>

    </div>
  );
}
