import React from 'react';
import { useLokSeva } from '../../context/LokSevaContext';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X
} from 'lucide-react';

export const EndToEndDemoWalkthrough: React.FC = () => {
  const {
    isDemoActive,
    demoStep,
    nextDemoStep,
    prevDemoStep,
    resetDemo,
    speakText,
    setActiveTab,
    setEligibilityModalItem,
    opportunities,
    fixDocumentOnce,
    requestConsent,
    advanceApplicationStage,
    simulateRejection,
    setProblemResolverItem,
    applications,
    setSlotBookingData,
    triggerCelebration
  } = useLokSeva();

  if (!isDemoActive) return null;

  const demoStepsInfo = [
    {
      step: 1,
      speaker: 'Citizen (Voice / Text)',
      text: '"I want to apply for a scholarship."',
      actionLabel: '1. Interpret Intent →',
      onRun: () => {
        speakText('I want to apply for a scholarship.');
        setActiveTab('dashboard');
      }
    },
    {
      step: 2,
      speaker: 'Lok Seva AI (Intent Identified)',
      text: 'Identified: Post-Matric Scholarship Scheme (Higher Education Welfare). Checking eligibility...',
      actionLabel: '2. Check Statutory Eligibility →',
      onRun: () => {
        speakText('Post-Matric Scholarship Scheme identified for your profile.');
        const pms = opportunities.find(o => o.id === 'opp_post_matric_scholarship');
        if (pms) setEligibilityModalItem(pms);
      }
    },
    {
      step: 3,
      speaker: 'Rules Engine (Eligibility Match)',
      text: '91% Eligibility Match: ✓ Age matches, ✓ Domicile matches, ✓ Enrolled student, ❌ Income Certificate outdated.',
      actionLabel: '3. Inspect Document Vault →',
      onRun: () => {
        setEligibilityModalItem(null);
        setActiveTab('documents');
        speakText('91% eligibility match found. Income certificate renewal required.');
      }
    },
    {
      step: 4,
      speaker: 'Document Vault (Readiness Check)',
      text: 'Scholarship 75% Ready: ✓ Aadhaar, ✓ College ID, ✓ 12th Marks, ✓ Bank, ❌ Income Certificate expired.',
      actionLabel: '4. AI: "Only Income Certificate missing" →',
      onRun: () => {
        speakText('All other documents are verified. Only income certificate is outdated.');
      }
    },
    {
      step: 5,
      speaker: 'Citizen Action',
      text: 'Citizen clicks "Fix Document Once". Lok Seva AI initiates automated renewal workflow.',
      actionLabel: '5. Launch Autonomous Renewal →',
      onRun: () => {
        setActiveTab('agent');
        speakText('Launching automated renewal workflow.');
      }
    },
    {
      step: 6,
      speaker: 'Consent Center Checkpoint 1',
      text: '"Allow Lok Seva AI to read your Aadhaar & revenue records to draft the renewal form?"',
      actionLabel: '6. Grant Read Permission →',
      onRun: () => {
        requestConsent({
          title: 'Permission Request: Read Vault Documents',
          description: 'Lok Seva AI requests authorization to read your Aadhaar card and previous revenue records to pre-fill the RTPS form.',
          actionType: 'read_doc',
          onApprove: () => {
            speakText('Permission granted.');
            nextDemoStep();
          }
        });
      }
    },
    {
      step: 7,
      speaker: 'Form Agent (Auto-Fill)',
      text: 'AI pre-fills 28 fields on the state portal using verified vault attributes.',
      actionLabel: '7. Request Upload Permission →',
      onRun: () => {
        speakText('Form auto-filled successfully.');
      }
    },
    {
      step: 8,
      speaker: 'Consent Center Checkpoint 2',
      text: '"Allow Lok Seva AI to upload renewed document to the scholarship portal?"',
      actionLabel: '8. Grant Upload Permission →',
      onRun: () => {
        requestConsent({
          title: 'Permission Request: Upload Document',
          description: 'Authorize transmission of verified income certificate to the scholarship portal.',
          actionType: 'upload_doc',
          onApprove: () => {
            fixDocumentOnce('income_cert');
            speakText('Upload permission granted.');
            nextDemoStep();
          }
        });
      }
    },
    {
      step: 9,
      speaker: 'Smart Slot Booking Agent',
      text: 'Provisional biometric verification slot reserved at Patna Service Centre (15 Oct, 10:00 AM).',
      actionLabel: '9. View Slot Booking →',
      onRun: () => {
        setSlotBookingData({
          applicationTitle: 'Post-Matric Scholarship Biometric Verification',
          applicationId: 'app_scholarship',
          onSuccess: () => {
            nextDemoStep();
          }
        });
      }
    },
    {
      step: 10,
      speaker: 'Application Tracker (Dispatched)',
      text: 'Application submitted! Tracker updates to: 70% Complete (Current: Document Verification).',
      actionLabel: '10. View Live Tracker →',
      onRun: () => {
        advanceApplicationStage('app_scholarship', 'verification');
        setActiveTab('applications');
        triggerCelebration();
        speakText('Scholarship application submitted. Status is now 70% complete.');
      }
    },
    {
      step: 11,
      speaker: 'Simulation: Department Scrutiny Notice',
      text: 'Simulating official defect notice: Scrutiny Officer flags outdated financial year.',
      actionLabel: '11. Simulate Defect Notice →',
      onRun: () => {
        simulateRejection(
          'app_scholarship',
          'Income certificate requires correction under Rule 4(b) (Financial Year mismatch).'
        );
      }
    },
    {
      step: 12,
      speaker: 'AI Problem Resolver',
      text: 'AI explains: WHAT HAPPENED? and WHAT CAN YOU DO? and offers one-click automated remediation.',
      actionLabel: '12. Open Problem Resolver →',
      onRun: () => {
        const scholarship = applications.find(a => a.id === 'app_scholarship');
        if (scholarship) setProblemResolverItem(scholarship);
      }
    },
    {
      step: 13,
      speaker: 'Remediation Complete',
      text: 'AI automates correction, attaches valid FY 2026-27 certificate, and resubmits to portal!',
      actionLabel: '13. Finish Demo 🎉',
      onRun: () => {
        advanceApplicationStage('app_scholarship', 'approval');
        setProblemResolverItem(null);
        setActiveTab('applications');
        triggerCelebration();
        speakText('Defect resolved and application resubmitted successfully.');
      }
    }
  ];

  const currentInfo = demoStepsInfo.find(s => s.step === demoStep) || demoStepsInfo[0];

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-4xl mx-auto animate-in slide-in-from-bottom duration-200">
      <div className="rounded-2xl bg-slate-900 border border-amber-500/80 shadow-2xl p-4 sm:p-5 text-white">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-amber-500 text-slate-950">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-heading">
              End-to-End Demo Journey • Step {demoStep} of {demoStepsInfo.length}
            </span>
          </div>

          <button
            onClick={resetDemo}
            className="p-1 rounded-md text-slate-400 hover:text-white"
            title="Close Walkthrough"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="py-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-semibold text-emerald-400 block">
              {currentInfo.speaker}:
            </span>
            <p className="text-xs sm:text-sm text-slate-100 mt-0.5 leading-snug">
              {currentInfo.text}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
            <button
              onClick={prevDemoStep}
              disabled={demoStep <= 1}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 disabled:opacity-30"
              title="Previous Step"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                currentInfo.onRun();
                if (demoStep < demoStepsInfo.length) {
                  if (demoStep !== 6 && demoStep !== 8 && demoStep !== 9) {
                    nextDemoStep();
                  }
                } else {
                  resetDemo();
                }
              }}
              className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <span>{currentInfo.actionLabel}</span>
            </button>
          </div>
        </div>

        {/* Mini Step Indicator Bar */}
        <div className="w-full h-1 rounded-full bg-slate-800 overflow-hidden mt-1">
          <div
            className="h-full bg-amber-400 transition-all duration-300"
            style={{ width: `${(demoStep / demoStepsInfo.length) * 100}%` }}
          />
        </div>

      </div>
    </div>
  );
};
