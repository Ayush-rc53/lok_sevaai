import React from 'react';
import { useLokSeva } from '../../context/LokSevaContext';
import { ShieldAlert, ShieldCheck, Check, X } from 'lucide-react';

export const GlobalConsentModal: React.FC = () => {
  const {
    consentModalData,
    setConsentModalData,
    userProfile
  } = useLokSeva();

  if (!consentModalData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-amber-500/50 shadow-2xl p-6 relative">
        <button
          onClick={() => {
            if (consentModalData.onDeny) consentModalData.onDeny();
            setConsentModalData(null);
          }}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="p-1 rounded-md bg-amber-500/10 text-amber-400">
            <ShieldAlert className="w-4 h-4" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Digital Consent Required (DPDP Act 2023)
          </span>
        </div>

        <h3 className="text-lg font-bold text-white font-heading mt-1">
          {consentModalData.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
          {consentModalData.description}
        </p>

        <div className="mt-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1.5">
          <div className="flex justify-between">
            <span>Authorized Citizen:</span>
            <strong className="text-slate-200">{userProfile.name}</strong>
          </div>
          <div className="flex justify-between">
            <span>Action Category:</span>
            <strong className="text-amber-400 uppercase">{consentModalData.actionType.replace('_', ' ')}</strong>
          </div>
          {consentModalData.targetItem && (
            <div className="flex justify-between">
              <span>Target Scheme/Portal:</span>
              <strong className="text-slate-200">{consentModalData.targetItem}</strong>
            </div>
          )}
          <div className="flex justify-between">
            <span>Security Standard:</span>
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Zero Unverified Submissions
            </span>
          </div>
        </div>

        <div className="mt-5 pt-3.5 border-t border-slate-800 flex items-center justify-end gap-2.5">
          <button
            onClick={() => {
              if (consentModalData.onDeny) consentModalData.onDeny();
              setConsentModalData(null);
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold transition-colors"
          >
            Deny Permission
          </button>

          <button
            onClick={() => {
              const cb = consentModalData.onApprove;
              setConsentModalData(null);
              cb();
            }}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors flex items-center gap-1.5 shadow"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>Authorize & Proceed</span>
          </button>
        </div>
      </div>
    </div>
  );
};
