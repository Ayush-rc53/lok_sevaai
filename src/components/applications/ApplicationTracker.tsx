import React, { useState } from 'react';
import { useLokSeva } from '../../context/LokSevaContext';
import { ApplicationItem, WorkflowStageKey } from '../../types';
import {
  MapPin,
  Calendar,
  AlertTriangle,
  ChevronRight,
  Info,
  ShieldCheck
} from 'lucide-react';

export const ApplicationTracker: React.FC = () => {
  const {
    applications,
    setProblemResolverItem,
    setSlotBookingData,
    fixDocumentOnce
  } = useLokSeva();

  const [selectedApp, setSelectedApp] = useState<ApplicationItem>(applications[0]);

  const stagesOrder: { key: WorkflowStageKey; label: string; desc: string }[] = [
    { key: 'eligibility', label: 'Eligibility Checked', desc: 'Rules & domicile criteria verified' },
    { key: 'documents', label: 'Documents Collected', desc: 'Vault sync & OCR verification' },
    { key: 'form', label: 'Form Auto-Filled', desc: 'Pre-populated with zero re-typing' },
    { key: 'review', label: 'Citizen Review', desc: 'Summary inspection & digital consent' },
    { key: 'submission', label: 'Application Submitted', desc: 'Dispatched to state portal with acknowledgment' },
    { key: 'verification', label: 'Document Verification', desc: 'Scrutiny officer document check' },
    { key: 'approval', label: 'Department Approval', desc: 'Competent officer digital signature' },
    { key: 'completed', label: 'Completed & Dispatched', desc: 'Benefit disbursed or certificate issued' }
  ];

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header Banner */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white font-heading">
              Application Status & Timeline
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Always know exactly where your application stands. Track real workflow stages, inspect upcoming actions, and resolve delays directly.
            </p>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-semibold text-emerald-400 flex items-center gap-1.5 shrink-0">
            <ShieldCheck className="w-4 h-4" />
            <span>4 Portals Synced</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Application List on Left, Timeline on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Applications List */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-1">
            <span>Active Applications ({applications.length})</span>
            <span>Select to view stage timeline</span>
          </div>

          <div className="space-y-2.5">
            {applications.map((app) => {
              const isSelected = selectedApp.id === app.id;
              const isBlocked = app.isReturnedOrRejected || app.missingDocTypes.length > 0;
              return (
                <div
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500/60 shadow-sm'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-750'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                      {app.category} • {app.state}
                    </span>

                    <span className={`text-xs font-bold ${
                      app.progressPercent >= 80 ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      {app.progressPercent}% Complete
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-white mt-2 font-heading">
                    {app.title}
                  </h3>

                  {/* Progress Bar */}
                  <div className="mt-2.5 w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isBlocked ? 'bg-amber-500' : 'bg-emerald-400'
                      }`}
                      style={{ width: `${app.progressPercent}%` }}
                    />
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <span className="truncate max-w-[200px] text-[11px]">
                      {app.statusLabel}
                    </span>
                    <span className="text-amber-400 font-medium flex items-center gap-1 text-[11px]">
                      Timeline <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: "Where Am I?" & Visual Workflow */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-sm space-y-5">
            
            {/* Header info */}
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                    {selectedApp.category} Portal
                  </span>
                  <h2 className="text-xl font-bold text-white mt-2 font-heading">
                    {selectedApp.title}
                  </h2>
                  {selectedApp.submissionRefNo && (
                    <p className="text-xs text-slate-400 mt-0.5">
                      Acknowledgment Ref: <strong className="text-slate-200">{selectedApp.submissionRefNo}</strong> • Submitted: {selectedApp.submissionDate}
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <span className="text-2xl font-black text-amber-400 font-heading block">
                    {selectedApp.progressPercent}%
                  </span>
                  <span className="text-[10px] text-slate-400">Workflow Progress</span>
                </div>
              </div>
            </div>

            {/* "Where Am I?" Diagnostic */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-400" />
                <span>Application Diagnostics ("Where Am I?")</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] font-medium text-slate-400 uppercase block">What is happening now?</span>
                  <p className="font-semibold text-slate-100 mt-0.5">{selectedApp.statusLabel}</p>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] font-medium text-slate-400 uppercase block">What do I need to do?</span>
                  <p className="font-semibold text-amber-300 mt-0.5">{selectedApp.nextAction}</p>
                </div>
              </div>

              {/* If Returned / Rejection detected */}
              {selectedApp.isReturnedOrRejected && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-rose-300 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-400" />
                      Defect Notice Issued by Scrutiny Officer
                    </span>
                    <button
                      onClick={() => setProblemResolverItem(selectedApp)}
                      className="px-2.5 py-1 rounded bg-rose-500 hover:bg-rose-400 text-white font-bold text-[11px]"
                    >
                      Fix This For Me →
                    </button>
                  </div>
                  <p className="text-[11px] text-rose-200">
                    {selectedApp.rejectionReason || 'Income Certificate is outdated and requires renewal under Section 4(b).'}
                  </p>
                </div>
              )}

              {/* If Missing Document in Application */}
              {selectedApp.missingDocTypes.length > 0 && !selectedApp.isReturnedOrRejected && (
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-amber-300">Income Certificate is Missing or Expired</p>
                    <p className="text-[11px] text-slate-300">Renew once to update all 3 portals automatically.</p>
                  </div>
                  <button
                    onClick={() => fixDocumentOnce('income_cert')}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                  >
                    Fix Once Now
                  </button>
                </div>
              )}
            </div>

            {/* Workflow Stages Timeline */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Workflow Progress
              </h3>

              <div className="space-y-2">
                {stagesOrder.map((stage, idx) => {
                  const status = selectedApp.stageStatuses[stage.key] || 'pending';
                  const isCurrent = status === 'current';
                  const isCompleted = status === 'completed';
                  const isFailed = status === 'failed';

                  return (
                    <div
                      key={stage.key}
                      className={`p-2.5 sm:p-3 rounded-xl border flex items-center justify-between transition-colors ${
                        isCurrent
                          ? 'bg-amber-500/10 border-amber-500/50'
                          : isCompleted
                          ? 'bg-slate-950 border-slate-800 text-slate-300'
                          : isFailed
                          ? 'bg-rose-500/10 border-rose-500/30 text-rose-200'
                          : 'bg-slate-950/40 border-slate-850 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                          isCompleted
                            ? 'bg-emerald-500 text-slate-950'
                            : isCurrent
                            ? 'bg-amber-500 text-slate-950'
                            : isFailed
                            ? 'bg-rose-500 text-white'
                            : 'bg-slate-800 text-slate-500'
                        }`}>
                          {isCompleted ? '✓' : idx + 1}
                        </div>

                        <div>
                          <p className={`text-xs font-bold ${
                            isCurrent ? 'text-amber-300' : isCompleted ? 'text-slate-100' : isFailed ? 'text-rose-300' : 'text-slate-500'
                          }`}>
                            {stage.label}
                          </p>
                          <p className="text-[10px] text-slate-400">{stage.desc}</p>
                        </div>
                      </div>

                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        isCompleted
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : isCurrent
                          ? 'bg-amber-500/20 text-amber-300'
                          : isFailed
                          ? 'bg-rose-500/20 text-rose-300'
                          : 'bg-slate-800 text-slate-600'
                      }`}>
                        {isCompleted ? 'Completed' : isCurrent ? 'Current' : isFailed ? 'Action Needed' : 'Pending'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* In-Person Verification Slot Booking CTA */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-slate-200">Need in-person biometric verification?</p>
                <p className="text-[11px] text-slate-400">Book an appointment at Patna Service Centre to skip physical queues.</p>
              </div>

              <button
                onClick={() => {
                  setSlotBookingData({
                    applicationTitle: selectedApp.title,
                    applicationId: selectedApp.id,
                    onSuccess: () => {}
                  });
                }}
                className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white font-semibold text-xs border border-slate-700 transition-colors flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Book Appointment Slot</span>
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
