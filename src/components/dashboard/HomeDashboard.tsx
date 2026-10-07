import React, { useState } from 'react';
import { useLokSeva } from '../../context/LokSevaContext';
import {
  GraduationCap,
  Briefcase,
  Rocket,
  BookOpen,
  Landmark,
  FileText,
  MapPin,
  Bot,
  Mic,
  ArrowRight,
  AlertCircle,
  Clock,
  CheckCircle2,
  ChevronRight,
  Zap,
  RefreshCw,
  Search,
  Sparkles,
  Server,
  HelpCircle
} from 'lucide-react';
import { initialLifeEvents } from '../../data/initialData';

export const HomeDashboard: React.FC<{ onStartAgentQuery: (query: string) => void }> = ({ onStartAgentQuery }) => {
  const {
    userProfile,
    setActiveTab,
    opportunities,
    setEligibilityModalItem,
    fixDocumentOnce,
    startVoiceInput,
    isListening,
    voiceTranscript,
    queryAiAssistant,
    backendConnected
  } = useLokSeva();

  const [aiPrompt, setAiPrompt] = useState('');
  const [selectedLifeEvent, setSelectedLifeEvent] = useState(initialLifeEvents[0]);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [aiResult, setAiResult] = useState<{ reply: string; detectedService?: string; confidence?: number; source?: string } | null>(null);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handlePromptSubmit = async (e?: React.FormEvent, customPrompt?: string) => {
    if (e) e.preventDefault();
    const query = (customPrompt ?? aiPrompt).trim() || voiceTranscript.trim();
    if (!query) return;

    if (customPrompt) {
      setAiPrompt(customPrompt);
    }

    setAiProcessing(true);
    try {
      const response = await queryAiAssistant(query);
      setAiResult(response);
    } catch (err) {
      console.warn('Backend Assistant query failed:', err);
    } finally {
      setAiProcessing(false);
    }
  };

  const examplePrompts = [
    { text: 'I want to apply for a scholarship', label: 'Apply for Scholarship' },
    { text: 'I need an income certificate', label: 'Income Certificate' },
    { text: 'Find internships for college students', label: 'Find Internships' },
    { text: 'Check my application status', label: 'Track Applications' },
    { text: 'Why was my application returned?', label: 'Why Returned?' }
  ];

  const mainServices = [
    {
      id: 'scholarships',
      title: 'Scholarships',
      icon: GraduationCap,
      badge: '91% Match',
      desc: 'Post-Matric, National Scholarship Portal (NSP), and state tuition waivers.',
      action: () => setActiveTab('opportunities')
    },
    {
      id: 'jobs',
      title: 'Jobs & Exams',
      icon: Briefcase,
      badge: 'SSC / UPSC / State',
      desc: 'Official notification updates, eligibility checks, and syllabus tracker.',
      action: () => setActiveTab('opportunities')
    },
    {
      id: 'internships',
      title: 'Internships',
      icon: Rocket,
      badge: 'PM Scheme (₹5K/mo)',
      desc: 'Top 500 corporate attachments with government-backed stipends.',
      action: () => setActiveTab('opportunities')
    },
    {
      id: 'education',
      title: 'Education & Loans',
      icon: BookOpen,
      badge: 'Credit Card Scheme',
      desc: 'Student credit cards, fee reimbursement, and low-interest education loans.',
      action: () => setActiveTab('opportunities')
    },
    {
      id: 'services',
      title: 'Government Services',
      icon: Landmark,
      badge: 'RTPS / e-District',
      desc: 'Income, Caste, Domicile, EWS, and character certificate applications.',
      action: () => setActiveTab('navigator')
    },
    {
      id: 'documents',
      title: 'Document Vault',
      icon: FileText,
      badge: '7 Stored • 1 Expired',
      desc: 'AI-verified wallet with automatic attribute extraction and zero re-uploads.',
      action: () => setActiveTab('documents')
    },
    {
      id: 'applications',
      title: 'Application Trackers',
      icon: MapPin,
      badge: '4 Active',
      desc: 'Real-time workflow progress, current stage diagnostics, and slot booking.',
      action: () => setActiveTab('applications')
    },
    {
      id: 'agent',
      title: 'Agent Mode',
      icon: Bot,
      badge: 'Autonomous',
      desc: 'Multi-agent orchestration with mandatory human consent before submission.',
      action: () => setActiveTab('agent')
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Hero Welcome & Assistant Search Bar */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Verified Citizen Profile
            </span>
            <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
              <Server className="w-3 h-3 text-slate-500" />
              Backend API: {backendConnected ? 'Connected (Port 3000)' : 'Connecting...'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-heading">
            {getGreeting()}, <span className="text-amber-400">{userProfile.name}</span>
          </h1>
          <p className="mt-1 text-sm text-slate-300">
            Tell Lok Seva AI what you need. We'll identify the official service, verify your eligibility, check required documents, and guide you through submission.
          </p>

          {/* Assistant Search Bar */}
          <form onSubmit={handlePromptSubmit} className="mt-6">
            <div className="relative flex items-center bg-slate-950 rounded-xl border border-slate-700 focus-within:border-amber-500 focus-within:ring-1 focus-within:ring-amber-500 transition-all p-1.5">
              <Search className="w-5 h-5 text-slate-400 ml-2.5 shrink-0" />
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder={isListening ? 'Listening... please speak your query' : 'Tell Lok Seva AI what you need (e.g. "Apply for scholarship", "I need income certificate")...'}
                className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none"
              />

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={startVoiceInput}
                  className={`p-2 rounded-lg transition-colors ${
                    isListening
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                  title="Voice Assistant (Click and speak)"
                >
                  <Mic className="w-4 h-4" />
                </button>

                <button
                  type="submit"
                  disabled={aiProcessing || (!aiPrompt.trim() && !voiceTranscript.trim())}
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-colors flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {aiProcessing ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Ask AI</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Prompt Suggestions */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-400 font-medium mr-1">Try asking:</span>
              {examplePrompts.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    handlePromptSubmit(undefined, p.text);
                  }}
                  className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700/80 text-[11px] transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </form>

          {/* Real-Time Backend AI Response Card */}
          {aiResult && (
            <div className="mt-5 p-4 rounded-xl bg-slate-950 border border-amber-500/40 shadow-sm animate-in fade-in duration-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-white">AI Assistant Response</span>
                  {aiResult.detectedService && (
                    <span className="text-[10px] font-medium bg-slate-800 text-amber-300 px-2 py-0.5 rounded">
                      {aiResult.detectedService}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-slate-400">
                  Confidence: {Math.round((aiResult.confidence || 0.95) * 100)}%
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {aiResult.reply}
              </p>

              <div className="mt-3 pt-2.5 border-t border-slate-900 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Ready to proceed with this workflow?</span>
                <button
                  onClick={() => onStartAgentQuery(aiPrompt || 'Scholarship Workflow')}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1"
                >
                  <span>Launch Agent Workflow</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Action Required Banner & "Fix Once → Use Everywhere" Feature */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Action Required Card */}
        <div className="lg:col-span-2 rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Action Required</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  3 applications need your attention. Your <strong className="text-amber-400">Income Certificate is outdated</strong>.
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('applications')}
              className="hidden sm:flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300"
            >
              <span>View All Trackers</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-rose-400">Urgent</span>
                <span className="text-slate-400 text-[11px]">18 days left</span>
              </div>
              <p className="text-xs font-bold text-slate-100">Post-Matric Scholarship</p>
              <p className="text-[11px] text-slate-400 mt-1">Requires renewed income certificate</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-amber-400">Expired Document</span>
                <span className="text-slate-400 text-[11px]">Expired 30d</span>
              </div>
              <p className="text-xs font-bold text-slate-100">Annual Income Certificate</p>
              <p className="text-[11px] text-slate-400 mt-1">Issued Aug 2023. Annual renewal needed</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-emerald-400">Verified</span>
                <span className="text-slate-400 text-[11px]">Active</span>
              </div>
              <p className="text-xs font-bold text-slate-100">Aadhaar & Bank Seeding</p>
              <p className="text-[11px] text-slate-400 mt-1">DBT enabled with SBI account ✓</p>
            </div>
          </div>
        </div>

        {/* Fix Once → Use Everywhere Card */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Zap className="w-4 h-4" />
              <span>Smart Document Sync</span>
            </div>
            <h3 className="text-base font-bold text-white font-heading">
              Fix Once → Use Everywhere
            </h3>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              Renew your Income Certificate once in the Document Vault. Lok Seva AI automatically synchronizes verified status across all 3 dependent applications.
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">3 Portals Dependent</span>
            <button
              onClick={() => fixDocumentOnce('income_cert')}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1"
            >
              <span>Renew Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Primary Service Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white font-heading">
              Services & Portals
            </h2>
            <p className="text-xs text-slate-400">
              Select a category or launch the automated AI agent
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {mainServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                onClick={service.action}
                className="group rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 p-4 sm:p-5 cursor-pointer transition-all hover:bg-slate-850"
              >
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-lg bg-slate-800 text-amber-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {service.badge}
                  </span>
                </div>

                <div className="mt-3">
                  <h3 className="font-bold text-sm text-white group-hover:text-amber-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 group-hover:text-amber-400">
                  <span className="text-[11px] font-semibold">Explore</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Opportunities For You */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white font-heading">
              Recommended For You
            </h2>
            <p className="text-xs text-slate-400">
              Matched against your verified college enrollment and income criteria
            </p>
          </div>
          <button
            onClick={() => setActiveTab('opportunities')}
            className="flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {opportunities.slice(0, 2).map((opp) => (
            <div
              key={opp.id}
              className="rounded-2xl bg-slate-900 border border-slate-800 p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {opp.category}
                  </span>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold">
                    <Sparkles className="w-3 h-3" />
                    <span>{opp.matchScore}% Match</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mt-2 font-heading">
                  {opp.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {opp.department} • {opp.state}
                </p>

                <div className="mt-3 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-emerald-300 font-semibold">
                  Financial Benefit: {opp.benefit}
                </div>

                {/* "Why am I seeing this?" Criteria List */}
                <div className="mt-3">
                  <p className="text-[11px] font-semibold text-slate-400 mb-1">
                    Why am I seeing this?
                  </p>
                  <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-300">
                    {opp.whyMatch.slice(0, 4).map((m, idx) => (
                      <div key={idx} className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="truncate">{m.criteria}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 text-xs text-rose-400 font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{opp.daysLeft} days left</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEligibilityModalItem(opp)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold transition-colors"
                  >
                    Check Eligibility
                  </button>

                  <button
                    onClick={() => onStartAgentQuery(`Apply for ${opp.title}`)}
                    className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors"
                  >
                    Apply with AI
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Life Event Assistant */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-sm">
        <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-2 mb-4">
          <div>
            <h2 className="text-base font-bold text-white font-heading">
              What is Happening in Your Life?
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Personalized statutory and government service checklists for major milestones
            </p>
          </div>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
            Life Event Navigator
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {initialLifeEvents.map((event) => (
            <button
              key={event.id}
              onClick={() => setSelectedLifeEvent(event)}
              className={`p-3 rounded-xl border text-left transition-colors ${
                selectedLifeEvent.id === event.id
                  ? 'bg-amber-500/10 border-amber-500/50 text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-850'
              }`}
            >
              <span className="text-lg block mb-1">{event.icon}</span>
              <p className="text-xs font-bold line-clamp-1">{event.title}</p>
            </button>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="text-xs font-bold text-amber-300">
                {selectedLifeEvent.title} Checklist
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">{selectedLifeEvent.description}</p>
            </div>
            <button
              onClick={() => onStartAgentQuery(`Create checklist for ${selectedLifeEvent.title}`)}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
            >
              Create My Checklist
            </button>
          </div>

          <div className="space-y-1.5 mt-3">
            {selectedLifeEvent.checklist.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`w-3.5 h-3.5 ${item.status === 'done' ? 'text-emerald-400' : 'text-slate-600'}`} />
                  <span className={item.status === 'done' ? 'text-slate-400 line-through' : 'text-slate-200'}>
                    {item.item}
                  </span>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                  item.status === 'done' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-300'
                }`}>
                  {item.status === 'done' ? 'Completed' : 'Action Needed'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
