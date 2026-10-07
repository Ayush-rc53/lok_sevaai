import React from 'react';
import { useLokSeva } from '../../context/LokSevaContext';
import {
  ShieldAlert,
  ShieldCheck,
  ExternalLink,
  X,
  AlertTriangle
} from 'lucide-react';

export const RiskSafetyModal: React.FC = () => {
  const { riskCheckUrl, setRiskCheckUrl } = useLokSeva();

  if (!riskCheckUrl) return null;

  const isOfficialGovDomain =
    riskCheckUrl.includes('.gov.in') ||
    riskCheckUrl.includes('.nic.in') ||
    riskCheckUrl.includes('.edu.in');

  const isHttps = riskCheckUrl.startsWith('https://');

  const isSuspicious = !isOfficialGovDomain || !isHttps;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="w-full max-w-md rounded-3xl bg-slate-900 border-2 border-slate-700 shadow-2xl p-6 relative">
        <button
          onClick={() => setRiskCheckUrl(null)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          {isSuspicious ? (
            <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </span>
          ) : (
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </span>
          )}
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Link Safety Verification
          </span>
        </div>

        <h3 className="text-lg font-bold text-white mt-1">
          {isSuspicious ? '⚠️ Possible Risk Warning' : 'Verified Official Domain'}
        </h3>

        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
          {isSuspicious
            ? 'This external link does not match typical National Informatics Centre (.gov.in or .nic.in) conventions. Never enter passwords or pay unauthorized fees.'
            : 'This destination matches official Indian GovTech infrastructure (.gov.in / .nic.in).'}
        </p>

        <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 font-mono break-all">
          {riskCheckUrl}
        </div>

        <p className="text-[11px] text-slate-500 mt-2 italic">
          Disclaimer: Lok Seva AI provides heuristic trust indicators; citizens must always exercise caution.
        </p>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end gap-2">
          <button
            onClick={() => setRiskCheckUrl(null)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
          >
            Go Back (Stay Safe)
          </button>

          <a
            href={riskCheckUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setRiskCheckUrl(null)}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1"
          >
            <span>Proceed Anyway</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
