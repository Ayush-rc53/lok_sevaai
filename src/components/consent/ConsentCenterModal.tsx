import React, { useState } from 'react';
import { useLokSeva } from '../../context/LokSevaContext';
import {
  ShieldCheck,
  ShieldAlert,
  Lock,
  History
} from 'lucide-react';

export const ConsentCenterModal: React.FC = () => {
  const {
    consentModalData,
    setConsentModalData,
    auditLogs,
    userProfile
  } = useLokSeva();

  const [permissions, setPermissions] = useState({
    readDocs: true,
    extractInfo: true,
    fillForm: true,
    uploadDocs: false,
    bookSlots: false,
    submitApplication: false
  });

  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Main Consent & Privacy Dashboard */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white font-heading">
              Privacy & Consent Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Lok Seva AI never silently acts or submits irreversible applications. Manage granular agent authorizations and audit every autonomous action.
            </p>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-semibold text-emerald-400 flex items-center gap-1.5 shrink-0">
            <Lock className="w-3.5 h-3.5" />
            <span>Digital Personal Data Protection (DPDP) Compliant</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Granular Permissions Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-sm space-y-3">
            <h2 className="text-base font-bold text-white font-heading">
              Agent Permissions
            </h2>
            <p className="text-xs text-slate-400">
              Configure what sub-agents can automate. Irreversible actions always require manual confirmation.
            </p>

            <div className="space-y-2.5 mt-3">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-slate-100">Read Vault Documents</p>
                  <p className="text-[11px] text-slate-400">Extract fields from Aadhaar & marksheets</p>
                </div>
                <input
                  type="checkbox"
                  checked={permissions.readDocs}
                  onChange={() => togglePermission('readDocs')}
                  className="w-4 h-4 accent-amber-500 rounded"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-slate-100">OCR & Profile Cross-Check</p>
                  <p className="text-[11px] text-slate-400">Cross-reference name, DOB, and address</p>
                </div>
                <input
                  type="checkbox"
                  checked={permissions.extractInfo}
                  onChange={() => togglePermission('extractInfo')}
                  className="w-4 h-4 accent-amber-500 rounded"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-slate-100">Form Auto-Populate</p>
                  <p className="text-[11px] text-slate-400">Draft portal applications</p>
                </div>
                <input
                  type="checkbox"
                  checked={permissions.fillForm}
                  onChange={() => togglePermission('fillForm')}
                  className="w-4 h-4 accent-amber-500 rounded"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-slate-100">Document Upload Transmission</p>
                  <p className="text-[11px] text-slate-400">Send files to external government servers</p>
                </div>
                <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                  Prompt Per Upload
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-slate-100">Final Portal Submission</p>
                  <p className="text-[11px] text-slate-400">Commit final legal submission</p>
                </div>
                <span className="text-[10px] font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
                  Mandatory Approval
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Audit Log */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-amber-400" />
                <h2 className="text-base font-bold text-white font-heading">
                  What Lok Seva AI Did (Audit Trail)
                </h2>
              </div>
              <span className="text-xs text-slate-400">{auditLogs.length} Events Logged</span>
            </div>

            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
              {auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-[11px] font-mono text-slate-400 whitespace-nowrap mt-0.5">
                      {log.timestamp}
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-white">{log.action}</span>
                        <span className="text-[10px] text-amber-400 font-medium">({log.agentName})</span>
                      </div>
                      <p className="text-slate-300 mt-0.5 text-[11px] leading-relaxed">{log.details}</p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded whitespace-nowrap ${
                    log.badge === 'user_consented'
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {log.badge === 'user_consented' ? 'Authorized' : 'Automated'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
