import React, { useState } from 'react';
import { useLokSeva } from '../../context/LokSevaContext';
import {
  Bot,
  UserCheck,
  CheckCircle2,
  RefreshCw,
  ChevronRight,
  Play
} from 'lucide-react';

export const AgentWorkflowModal: React.FC<{ initialQuery?: string }> = ({
  initialQuery = 'Scholarship Application'
}) => {
  const {
    userProfile,
    advanceApplicationStage,
    addAuditLog,
    addNotification,
    requestConsent,
    triggerCelebration,
    setActiveTab
  } = useLokSeva();

  const [mode, setMode] = useState<'assist' | 'autonomous'>('autonomous');
  const [assistStep, setAssistStep] = useState<number>(1);
  const [reuseCollegeInfo, setReuseCollegeInfo] = useState<boolean>(true);

  const [agentStepIndex, setAgentStepIndex] = useState<number>(0);
  const [isRunningAutonomous, setIsRunningAutonomous] = useState<boolean>(false);
  const [pipelineFinished, setPipelineFinished] = useState<boolean>(false);

  const pipelineStages = [
    {
      agent: 'Service Discovery Agent',
      action: 'Identified Post-Matric Scholarship Scheme (Bihar PMS Portal)',
      desc: 'Category: Undergraduate Technical Education.',
      status: agentStepIndex > 0 ? 'done' : agentStepIndex === 0 && isRunningAutonomous ? 'running' : 'idle'
    },
    {
      agent: 'Eligibility Agent',
      action: 'Verified 91% Match via Rules Engine',
      desc: 'Checks passed: Domicile (Bihar ✓), Income (< ₹2.5L ✓), Enrolled Student ✓.',
      status: agentStepIndex > 1 ? 'done' : agentStepIndex === 1 && isRunningAutonomous ? 'running' : 'idle'
    },
    {
      agent: 'Document & OCR Agent',
      action: 'Collected Wallet Documents & Extracted Attributes',
      desc: 'Aadhaar, 12th Marks, and College ID verified. Income certificate refreshed.',
      status: agentStepIndex > 2 ? 'done' : agentStepIndex === 2 && isRunningAutonomous ? 'running' : 'idle'
    },
    {
      agent: 'Form Agent',
      action: 'Pre-filled 28 Government Portal Fields',
      desc: 'Auto-populated applicant name, roll number, bank IFSC, and DBT mandate.',
      status: agentStepIndex > 3 ? 'done' : agentStepIndex === 3 && isRunningAutonomous ? 'running' : 'idle'
    },
    {
      agent: 'Slot Booking Agent',
      action: 'Reserved Priority Verification Token at Local Seva Kendra',
      desc: 'Provisional biometric slot reserved (#PAT-4029).',
      status: agentStepIndex > 4 ? 'done' : agentStepIndex === 4 && isRunningAutonomous ? 'running' : 'idle'
    },
    {
      agent: 'Consent & Safety Layer',
      action: 'Citizen Approval Required (Paused Before Submission)',
      desc: 'Full application summary presented for your explicit digital consent.',
      status: agentStepIndex > 5 ? 'done' : agentStepIndex === 5 && isRunningAutonomous ? 'waiting_consent' : 'idle'
    }
  ];

  const handleStartAutonomous = () => {
    setIsRunningAutonomous(true);
    setAgentStepIndex(0);
    setPipelineFinished(false);

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setAgentStepIndex(current);
      if (current === 5) {
        clearInterval(interval);
        requestConsent({
          title: 'Final Approval Required: Submit Scholarship Application',
          description: 'Lok Seva AI has prepared your complete Post-Matric Scholarship application using verified vault documents. Do you authorize final submission to the portal?',
          actionType: 'submit_application',
          targetItem: 'Post-Matric Scholarship 2026-27',
          onApprove: () => {
            setAgentStepIndex(6);
            setIsRunningAutonomous(false);
            setPipelineFinished(true);
            advanceApplicationStage('app_scholarship', 'verification');
            addAuditLog({
              agentName: 'Autonomous Agent Orchestrator',
              action: 'Scholarship Application Submitted',
              details: 'Dispatched to Bihar PMS portal with Ack Ref PMS/2026/BR-991204.',
              badge: 'user_consented'
            });
            addNotification({
              title: 'Scholarship Application Submitted',
              message: 'Your application has advanced to Document Verification (70% Complete).',
              type: 'success',
              actionLabel: 'Track Status',
              actionTarget: 'applications'
            });
            triggerCelebration();
          }
        });
      }
    }, 900);
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header Banner */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white font-heading">
              Agent Mode Workflow
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Choose your interaction style: step-by-step guided wizard (<strong>Assist Me</strong>) or autonomous pipeline with human authorization (<strong>Do It For Me</strong>).
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800">
            <button
              onClick={() => setMode('assist')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                mode === 'assist'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Assist Me (Guided)</span>
            </button>

            <button
              onClick={() => setMode('autonomous')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                mode === 'autonomous'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Do It For Me (Agentic)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Assist Me Mode */}
      {mode === 'assist' && (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-sm max-w-2xl mx-auto">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-5">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Step {assistStep} of 4
            </span>
            <span className="text-xs text-slate-400">Post-Matric Scholarship Wizard</span>
          </div>

          {assistStep === 1 && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white">Step 1: Verify Available Documents</h2>
              <p className="text-xs text-slate-300">
                Lok Seva AI has already retrieved your Aadhaar, College ID, and 12th marksheet from the Document Vault.
              </p>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between text-emerald-400">
                  <span>✓ Aadhaar Card (XXXX-4812)</span>
                  <span className="font-semibold">Ready</span>
                </div>
                <div className="flex items-center justify-between text-emerald-400">
                  <span>✓ College ID (Patna Science College)</span>
                  <span className="font-semibold">Ready</span>
                </div>
                <div className="flex items-center justify-between text-emerald-400">
                  <span>✓ Bank Passbook (SBI - DBT Seeded)</span>
                  <span className="font-semibold">Ready</span>
                </div>
              </div>
            </div>
          )}

          {assistStep === 2 && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white">Step 2: Reusable Information</h2>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <p className="text-slate-200 leading-relaxed">
                  "Your college credentials (Patna Science College, Roll No: PSC/CS/2022/104) were verified in your previous application. Would you like to reuse them?"
                </p>
                <div className="mt-3.5 flex items-center gap-2">
                  <button
                    onClick={() => setReuseCollegeInfo(true)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      reuseCollegeInfo
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    Reuse Verified Information
                  </button>
                  <button
                    onClick={() => setReuseCollegeInfo(false)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      !reuseCollegeInfo
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    Edit Details
                  </button>
                </div>
              </div>
            </div>
          )}

          {assistStep === 3 && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white">Step 3: Review Pre-Filled Summary</h2>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                <div className="flex justify-between py-1 border-b border-slate-900">
                  <span className="text-slate-400">Applicant:</span>
                  <span className="font-semibold text-white">{userProfile.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-900">
                  <span className="text-slate-400">Course & Semester:</span>
                  <span className="font-semibold text-white">{userProfile.course} ({userProfile.semester})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-900">
                  <span className="text-slate-400">Estimated Aid:</span>
                  <span className="font-bold text-emerald-400">₹38,000 / year</span>
                </div>
              </div>
            </div>
          )}

          {assistStep === 4 && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white">Step 4: Confirm and Submit</h2>
              <p className="text-xs text-slate-300">
                All fields are filled and verified against official portal schema. Authorize final dispatch:
              </p>
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
                ✓ Aadhaar eKYC verified • Bank DBT active • Zero defects detected
              </div>
            </div>
          )}

          {/* Stepper Navigation */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setAssistStep(Math.max(1, assistStep - 1))}
              disabled={assistStep === 1}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold disabled:opacity-40"
            >
              Previous
            </button>

            {assistStep < 4 ? (
              <button
                onClick={() => setAssistStep(assistStep + 1)}
                className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1"
              >
                <span>Next Step</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => {
                  advanceApplicationStage('app_scholarship', 'verification');
                  triggerCelebration();
                  setActiveTab('applications');
                }}
                className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold"
              >
                Approve & Submit
              </button>
            )}
          </div>
        </div>
      )}

      {/* Autonomous Mode */}
      {mode === 'autonomous' && (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-7 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white font-heading">
                Multi-Agent Pipeline
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Specialized sub-agents coordinate discovery, eligibility, document extraction, and form drafting.
              </p>
            </div>

            <button
              onClick={handleStartAutonomous}
              disabled={isRunningAutonomous}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-colors flex items-center gap-1.5 disabled:opacity-40"
            >
              {isRunningAutonomous ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Agents Executing...</span>
                </>
              ) : pipelineFinished ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Run Pipeline Again</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Launch Autonomous Workflow</span>
                </>
              )}
            </button>
          </div>

          {/* Pipeline Stages */}
          <div className="mt-5 space-y-2.5">
            {pipelineStages.map((stage, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border transition-colors ${
                  stage.status === 'done'
                    ? 'bg-slate-950 border-slate-800 text-slate-200'
                    : stage.status === 'running'
                    ? 'bg-amber-500/10 border-amber-500/60'
                    : stage.status === 'waiting_consent'
                    ? 'bg-rose-500/10 border-rose-500/50 text-rose-200'
                    : 'bg-slate-950/40 border-slate-850 text-slate-500'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                      stage.status === 'done'
                        ? 'bg-emerald-500 text-slate-950'
                        : stage.status === 'running'
                        ? 'bg-amber-500 text-slate-950 animate-pulse'
                        : stage.status === 'waiting_consent'
                        ? 'bg-rose-500 text-white'
                        : 'bg-slate-800 text-slate-500'
                    }`}>
                      {stage.status === 'done' ? '✓' : idx + 1}
                    </div>

                    <div>
                      <span className="font-semibold text-xs text-amber-400 block">{stage.agent}</span>
                      <h4 className="font-bold text-sm text-white mt-0.5">{stage.action}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{stage.desc}</p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded whitespace-nowrap ${
                    stage.status === 'done'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : stage.status === 'running'
                      ? 'bg-amber-500/20 text-amber-300'
                      : stage.status === 'waiting_consent'
                      ? 'bg-rose-500/20 text-rose-300'
                      : 'bg-slate-800 text-slate-600'
                  }`}>
                    {stage.status === 'done' ? 'Completed' : stage.status === 'running' ? 'Executing' : stage.status === 'waiting_consent' ? 'Consent Required' : 'Queued'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {pipelineFinished && (
            <div className="mt-5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-emerald-300">Application Submitted Successfully</p>
                <p className="text-slate-300">Progressed to Document Verification (70% Complete).</p>
              </div>
              <button
                onClick={() => setActiveTab('applications')}
                className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold"
              >
                View Live Tracker →
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
