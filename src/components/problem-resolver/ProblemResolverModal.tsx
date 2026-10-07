import React, { useState } from 'react';
import { useLokSeva } from '../../context/LokSevaContext';
import {
  X,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  HelpCircle,
  Bot
} from 'lucide-react';

export const ProblemResolverModal: React.FC = () => {
  const {
    problemResolverItem,
    setProblemResolverItem,
    fixDocumentOnce,
    advanceApplicationStage,
    addNotification,
    addAuditLog,
    triggerCelebration,
    setActiveTab
  } = useLokSeva();

  const [isFixing, setIsFixing] = useState<boolean>(false);
  const [fixCompleted, setFixCompleted] = useState<boolean>(false);

  if (!problemResolverItem) return null;

  const app = problemResolverItem;

  const handleFixForMe = () => {
    setIsFixing(true);
    setTimeout(() => {
      fixDocumentOnce('income_cert');
      advanceApplicationStage(app.id, 'verification');
      setIsFixing(false);
      setFixCompleted(true);
      triggerCelebration();

      addAuditLog({
        agentName: 'AI Problem Resolver Agent',
        action: 'Application Remediation Completed',
        details: 'Renewed Income Certificate FY 2026-27 attached. Resubmitted to portal with corrected annexure.',
        badge: 'auto'
      });

      addNotification({
        title: 'Application Defect Resolved',
        message: 'Your scholarship application defect has been fixed and successfully resubmitted.',
        type: 'success'
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 relative">
        
        <button
          onClick={() => setProblemResolverItem(null)}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>AI Defect Resolver</span>
          </span>
        </div>

        <h2 className="text-xl font-bold text-white font-heading">
          {app.title}
        </h2>
        <p className="text-xs text-rose-300 font-medium mt-0.5">
          Notice: Application Returned for Correction
        </p>

        {/* What Happened */}
        <div className="mt-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>What Happened?</span>
          </h3>
          <p className="text-xs text-slate-200 leading-relaxed">
            "Your application was returned because your attached Income Certificate was issued in August 2023, which exceeds the statutory 12-month validity window for the current academic assessment year."
          </p>
        </div>

        {/* What Can You Do */}
        <div className="mt-3.5 p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>What Can You Do? (Resolution Plan)</span>
          </h3>
          <div className="space-y-1 text-xs text-slate-300">
            <p>1. Renew Income Certificate on the state RTPS portal</p>
            <p>2. Automatically link the fresh digital certificate into your Document Vault</p>
            <p>3. Update the application annexure</p>
            <p>4. Resubmit to the scholarship scrutiny officer</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 pt-3.5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-slate-400">
            {fixCompleted ? 'Application Resubmitted ✓' : 'Lok Seva AI can automate the entire resolution'}
          </span>

          {!fixCompleted ? (
            <button
              onClick={handleFixForMe}
              disabled={isFixing}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition-colors flex items-center justify-center gap-1.5"
            >
              {isFixing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Automating Resolution...</span>
                </>
              ) : (
                <>
                  <Bot className="w-4 h-4" />
                  <span>Fix This For Me</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() => {
                setProblemResolverItem(null);
                setActiveTab('applications');
              }}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
            >
              View Updated Application Status →
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
