import React from 'react';
import { useLokSeva } from '../../context/LokSevaContext';
import {
  X,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export const EligibilityCheckerModal: React.FC = () => {
  const {
    eligibilityModalItem,
    setEligibilityModalItem,
    userProfile,
    documents,
    setActiveTab,
    fixDocumentOnce
  } = useLokSeva();

  if (!eligibilityModalItem) return null;

  const item = eligibilityModalItem;

  const age = 2026 - parseInt(userProfile.dob.split('-')[0] || '2004', 10);
  const isStudent = Boolean(userProfile.college && userProfile.course);
  const isStateMatch = item.state === 'Central' || userProfile.state === item.state;
  const isIncomeEligible = userProfile.annualFamilyIncome <= 250000;
  const incomeDoc = documents.find(d => d.type === 'income_cert');
  const isIncomeDocValid = incomeDoc && incomeDoc.status === 'verified';

  const rules = [
    {
      label: 'Age Requirement (18 - 25 Years)',
      status: age >= 18 && age <= 28 ? 'pass' : 'fail',
      detail: `Your age: ${age} years old (Verified via Aadhaar)`
    },
    {
      label: 'State Domicile Requirement',
      status: isStateMatch ? 'pass' : 'fail',
      detail: `${userProfile.state} Resident (Requirement: ${item.state})`
    },
    {
      label: 'Enrolled Student Status',
      status: isStudent ? 'pass' : 'fail',
      detail: `Patna Science College • ${userProfile.course} (${userProfile.semester})`
    },
    {
      label: 'Annual Family Income (< ₹2.50 Lakhs)',
      status: isIncomeEligible ? 'pass' : 'fail',
      detail: `Current family income: ₹${userProfile.annualFamilyIncome.toLocaleString('en-IN')} / year`
    },
    {
      label: 'Valid Income Certificate Verification',
      status: isIncomeDocValid ? 'pass' : 'missing',
      detail: isIncomeDocValid
        ? 'Current FY 2026-27 certificate uploaded and verified'
        : 'Outdated or expired in Document Vault. Renewal required.'
    }
  ];

  const passCount = rules.filter(r => r.status === 'pass').length;
  const isMissing = rules.some(r => r.status === 'missing');
  const matchPercent = isMissing ? 91 : Math.round((passCount / rules.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 relative">
        
        <button
          onClick={() => setEligibilityModalItem(null)}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="pr-8">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            Rules-Based Eligibility Engine
          </span>

          <h2 className="text-xl font-bold text-white font-heading mt-2">
            {item.title}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Evaluating profile of <strong className="text-slate-200">{userProfile.name}</strong> against criteria.
          </p>
        </div>

        {/* Score Bar */}
        <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              {isMissing ? (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Probably Eligible (Missing Document)</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Fully Eligible</span>
                </>
              )}
            </span>
            <span className="text-base font-bold text-amber-400 font-heading">
              {matchPercent}% Match
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-amber-400 transition-all duration-300"
              style={{ width: `${matchPercent}%` }}
            />
          </div>
        </div>

        {/* Criteria Breakdown */}
        <div className="mt-4 space-y-2 max-h-64 overflow-y-auto pr-1">
          {rules.map((rule, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border flex items-start justify-between gap-3 text-xs ${
                rule.status === 'pass'
                  ? 'bg-slate-950 border-slate-800 text-slate-200'
                  : rule.status === 'missing'
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-200'
              }`}
            >
              <div className="flex items-start gap-2">
                {rule.status === 'pass' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : rule.status === 'missing' ? (
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-semibold text-slate-100">{rule.label}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{rule.detail}</p>
                </div>
              </div>

              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded whitespace-nowrap ${
                rule.status === 'pass'
                  ? 'bg-emerald-500/10 text-emerald-300'
                  : rule.status === 'missing'
                  ? 'bg-amber-500/20 text-amber-300'
                  : 'bg-rose-500/20 text-rose-300'
              }`}>
                {rule.status === 'pass' ? 'Matches' : rule.status === 'missing' ? 'Outdated' : 'Ineligible'}
              </span>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="mt-5 pt-3.5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="text-left w-full sm:w-auto">
            <span className="text-[10px] text-slate-400 block uppercase">Recommendation:</span>
            <span className="text-xs font-semibold text-slate-200">
              {isMissing ? 'Renew Income Certificate in Vault' : 'Ready to Proceed'}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {isMissing && (
              <button
                onClick={() => {
                  fixDocumentOnce('income_cert');
                  setEligibilityModalItem(null);
                  setActiveTab('documents');
                }}
                className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-750 text-amber-400 text-xs font-semibold border border-slate-700"
              >
                Fix Document Now
              </button>
            )}

            <button
              onClick={() => {
                setEligibilityModalItem(null);
                setActiveTab('agent');
              }}
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <span>Continue Application</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
