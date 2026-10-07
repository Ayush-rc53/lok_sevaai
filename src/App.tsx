import React, { useState } from 'react';
import { LokSevaProvider, useLokSeva } from './context/LokSevaContext';
import { Header } from './components/navbar/Header';
import { HomeDashboard } from './components/dashboard/HomeDashboard';
import { SmartServiceNavigator } from './components/navigator/SmartServiceNavigator';
import { StudentOpportunities } from './components/opportunities/StudentOpportunities';
import { DocumentWallet } from './components/documents/DocumentWallet';
import { ApplicationTracker } from './components/applications/ApplicationTracker';
import { AgentWorkflowModal } from './components/agent/AgentWorkflowModal';
import { ConsentCenterModal } from './components/consent/ConsentCenterModal';
import { UserProfileMemory } from './components/profile/UserProfileMemory';
import { EligibilityCheckerModal } from './components/eligibility/EligibilityCheckerModal';
import { SlotBookingModal } from './components/slots/SlotBookingModal';
import { ProblemResolverModal } from './components/problem-resolver/ProblemResolverModal';
import { LanguageSimplifierModal } from './components/simplifier/LanguageSimplifierModal';
import { GlobalSearchModal } from './components/search/GlobalSearchModal';
import { RiskSafetyModal } from './components/risk/RiskSafetyModal';
import { GlobalConsentModal } from './components/consent/GlobalConsentModal';
import { SeniorCitizenView } from './components/senior-mode/SeniorCitizenView';
import { EndToEndDemoWalkthrough } from './components/demo/EndToEndDemoWalkthrough';
import {
  Home,
  Compass,
  GraduationCap,
  FolderLock,
  MapPin,
  Bot,
  ShieldCheck,
  User
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    isSeniorMode
  } = useLokSeva();

  const [initialAgentQuery, setInitialAgentQuery] = useState('');

  if (isSeniorMode) {
    return <SeniorCitizenView />;
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'navigator', label: 'Services', icon: Compass },
    { id: 'opportunities', label: 'Opportunities', icon: GraduationCap },
    { id: 'documents', label: 'Document Vault', icon: FolderLock },
    { id: 'applications', label: 'Trackers', icon: MapPin },
    { id: 'agent', label: 'Agent Mode', icon: Bot },
    { id: 'consent', label: 'Privacy & Consent', icon: ShieldCheck },
    { id: 'profile', label: 'Citizen Profile', icon: User }
  ];

  const handleStartAgentFromSearch = (query: string) => {
    setInitialAgentQuery(query);
    setActiveTab('agent');
  };

  const handleApplyOpportunity = (opp: any) => {
    setInitialAgentQuery(`Apply for ${opp.title}`);
    setActiveTab('agent');
  };

  const handleStartAgentWithService = (service: any) => {
    setInitialAgentQuery(`Start application for ${service.name}`);
    setActiveTab('agent');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950 font-sans">
      
      {/* Top Navbar */}
      <Header />

      {/* Sub-Nav Bar (Desktop Tabs) */}
      <div className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 no-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Body View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'dashboard' && (
          <HomeDashboard onStartAgentQuery={handleStartAgentFromSearch} />
        )}
        {activeTab === 'navigator' && (
          <SmartServiceNavigator onStartAgentWithService={handleStartAgentWithService} />
        )}
        {activeTab === 'opportunities' && (
          <StudentOpportunities onApplyOpportunity={handleApplyOpportunity} />
        )}
        {activeTab === 'documents' && <DocumentWallet />}
        {activeTab === 'applications' && <ApplicationTracker />}
        {activeTab === 'agent' && (
          <AgentWorkflowModal initialQuery={initialAgentQuery} />
        )}
        {activeTab === 'consent' && <ConsentCenterModal />}
        {activeTab === 'profile' && <UserProfileMemory />}
      </main>

      {/* Global Interactive Modals */}
      <EligibilityCheckerModal />
      <SlotBookingModal />
      <ProblemResolverModal />
      <LanguageSimplifierModal />
      <GlobalSearchModal />
      <RiskSafetyModal />
      <GlobalConsentModal />

      {/* Floating Guided End-to-End Walkthrough */}
      <EndToEndDemoWalkthrough />

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 py-6 text-center text-xs text-slate-400 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-200">Lok Seva AI</span>
            <span>• Smart Citizen & Student Services</span>
          </div>

          <div className="flex items-center gap-3 text-slate-400 text-[11px]">
            <span>DPDP Act 2023 Compliant</span>
            <span>•</span>
            <span>NIC & RTPS Sandbox Mappings</span>
            <span>•</span>
            <span>Zero Unverified Submissions</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <LokSevaProvider>
      <MainAppContent />
    </LokSevaProvider>
  );
}
