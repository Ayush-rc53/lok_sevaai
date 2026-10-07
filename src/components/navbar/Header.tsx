import React, { useState } from 'react';
import { useLokSeva } from '../../context/LokSevaContext';
import {
  Search,
  Mic,
  Bell,
  Languages,
  Sparkles,
  HelpCircle,
  Volume2,
  Check,
  ChevronDown,
  User,
  ShieldCheck
} from 'lucide-react';
import { LanguageCode } from '../../types';

export const Header: React.FC = () => {
  const {
    language,
    setLanguage,
    isSeniorMode,
    setIsSeniorMode,
    familyMembers,
    activeFamilyMember,
    switchFamilyMember,
    notifications,
    markNotificationRead,
    isListening,
    startVoiceInput,
    stopVoiceInput,
    isSpeaking,
    setGlobalSearchOpen,
    setLanguageSimplifierOpen,
    startEndToEndDemo,
    isDemoActive,
    setActiveTab,
    setProblemResolverItem,
    applications,
    backendConnected,
    firebaseUser,
    loginWithGoogle,
    logoutUser
  } = useLokSeva();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showFamilyMenu, setShowFamilyMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleVoiceToggle = () => {
    if (isListening) {
      stopVoiceInput();
    } else {
      startVoiceInput();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Logo & Product Title */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => setActiveTab('dashboard')}
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-lg">
              🇮🇳
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-lg tracking-tight text-white font-heading">
                  Lok Seva <span className="text-amber-400 font-extrabold">AI</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse" />
                  Live Backend
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-normal hidden sm:block">
                Sarkari Seva, Ab AI Ke Saath • Citizen & Student Portal
              </p>
            </div>
          </div>

          {/* Quick Actions & Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">

            {/* Interactive Demo Flow */}
            <button
              onClick={startEndToEndDemo}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors ${
                isDemoActive
                  ? 'bg-amber-400 text-slate-950 shadow'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Guided Demo</span>
              <span className="md:hidden">Demo</span>
            </button>

            {/* Global Search Button */}
            <button
              onClick={() => setGlobalSearchOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs transition-colors"
              title="Search Services, Schemes, Documents"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden md:inline text-slate-300">Search</span>
              <kbd className="hidden lg:inline text-[10px] bg-slate-900 text-slate-400 px-1 py-0.5 rounded border border-slate-700">⌘K</kbd>
            </button>

            {/* Explain Government Notice ("Explain This") */}
            <button
              onClick={() => setLanguageSimplifierOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs transition-colors"
              title="Simplify official notices into plain English"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Explain Notice</span>
            </button>

            {/* Senior Citizen Mode Toggle */}
            <button
              onClick={() => setIsSeniorMode(!isSeniorMode)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                isSeniorMode
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-800'
              }`}
              title="Accessible high-contrast Senior Mode"
            >
              <span>👴</span>
              <span className="hidden sm:inline">Senior Mode</span>
            </button>

            {/* Voice Assistant Microphone Button */}
            <button
              onClick={handleVoiceToggle}
              className={`p-2 rounded-lg border transition-colors ${
                isListening
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                  : isSpeaking
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-800 hover:text-white'
              }`}
              title={isListening ? 'Listening... click to stop' : 'Voice Assistant'}
            >
              {isListening ? (
                <Mic className="w-4 h-4 text-rose-400 animate-pulse" />
              ) : isSpeaking ? (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <Mic className="w-4 h-4 text-slate-300" />
              )}
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 text-xs font-medium"
              >
                <Languages className="w-3.5 h-3.5 text-slate-400" />
                <span className="uppercase font-semibold">{language}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-1.5 w-36 bg-slate-900 border border-slate-700 rounded-xl shadow-xl py-1 z-50">
                  <button
                    onClick={() => { setLanguage('en'); setShowLangMenu(false); }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-800 ${
                      language === 'en' ? 'text-amber-400 font-bold bg-slate-800/50' : 'text-slate-300'
                    }`}
                  >
                    <span>English</span>
                    {language === 'en' && <Check className="w-3 h-3 text-amber-400" />}
                  </button>
                  <button
                    onClick={() => { setLanguage('hi'); setShowLangMenu(false); }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-800 ${
                      language === 'hi' ? 'text-amber-400 font-bold bg-slate-800/50' : 'text-slate-300'
                    }`}
                  >
                    <span>हिंदी (Hindi)</span>
                    {language === 'hi' && <Check className="w-3 h-3 text-amber-400" />}
                  </button>
                  <button
                    onClick={() => { setLanguage('bn'); setShowLangMenu(false); }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-800 ${
                      language === 'bn' ? 'text-amber-400 font-bold bg-slate-800/50' : 'text-slate-300'
                    }`}
                  >
                    <span>বাংলা (Bengali)</span>
                    {language === 'bn' && <Check className="w-3 h-3 text-amber-400" />}
                  </button>
                  <button
                    onClick={() => { setLanguage('mr'); setShowLangMenu(false); }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-800 ${
                      language === 'mr' ? 'text-amber-400 font-bold bg-slate-800/50' : 'text-slate-300'
                    }`}
                  >
                    <span>मराठी (Marathi)</span>
                    {language === 'mr' && <Check className="w-3 h-3 text-amber-400" />}
                  </button>
                  <button
                    onClick={() => { setLanguage('ta'); setShowLangMenu(false); }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-800 ${
                      language === 'ta' ? 'text-amber-400 font-bold bg-slate-800/50' : 'text-slate-300'
                    }`}
                  >
                    <span>தமிழ் (Tamil)</span>
                    {language === 'ta' && <Check className="w-3 h-3 text-amber-400" />}
                  </button>
                </div>
              )}
            </div>

            {/* Profile / Family Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowFamilyMenu(!showFamilyMenu)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 text-xs font-medium"
              >
                <span className="text-sm">{activeFamilyMember.avatar}</span>
                <span className="hidden sm:inline">{activeFamilyMember.name.split(' ')[0]}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showFamilyMenu && (
                <div className="absolute right-0 mt-1.5 w-60 bg-slate-900 border border-slate-700 rounded-xl shadow-xl p-2 z-50">
                  <div className="px-2 py-1.5 border-b border-slate-800 mb-1">
                    <p className="text-xs font-bold text-slate-200">Family Profiles</p>
                    <p className="text-[10px] text-slate-400">Manage services with digital consent</p>
                  </div>
                  <div className="space-y-1">
                    {familyMembers.map(member => (
                      <button
                        key={member.id}
                        onClick={() => {
                          switchFamilyMember(member.id);
                          setShowFamilyMenu(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors ${
                          member.id === activeFamilyMember.id
                            ? 'bg-amber-500/15 text-amber-300 font-semibold'
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{member.avatar}</span>
                          <div className="text-left">
                            <p className="font-medium text-slate-100">{member.name}</p>
                            <p className="text-[10px] text-slate-400">{member.relation} • {member.age} yrs</p>
                          </div>
                        </div>
                        {member.id === activeFamilyMember.id && (
                          <Check className="w-3.5 h-3.5 text-amber-400" />
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 pt-1.5 border-t border-slate-800 text-center">
                    <button
                      onClick={() => {
                        setShowFamilyMenu(false);
                        setActiveTab('consent');
                      }}
                      className="text-[11px] text-amber-400 hover:underline flex items-center justify-center gap-1 mx-auto"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      View Consent Permissions
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white"
                title="Notifications & Deadlines"
              >
                <Bell className="w-4 h-4 text-slate-300" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-slate-950 font-bold text-[10px] rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-1.5 w-80 sm:w-96 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-3 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <Bell className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-xs font-bold text-slate-200">Action Items & Updates</span>
                    </div>
                    <span className="text-[11px] text-slate-400">{unreadCount} unread</span>
                  </div>

                  <div className="py-2 space-y-2 max-h-80 overflow-y-auto">
                    {notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markNotificationRead(n.id);
                          if (n.actionTarget === 'documents') setActiveTab('documents');
                          else if (n.actionTarget === 'applications') setActiveTab('applications');
                          else if (n.actionTarget === 'problem_resolver') {
                            const scholarshipApp = applications.find(a => a.id === 'app_scholarship');
                            if (scholarshipApp) setProblemResolverItem(scholarshipApp);
                          }
                          setShowNotifications(false);
                        }}
                        className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                          n.type === 'urgent'
                            ? 'bg-rose-500/10 border-rose-500/30 text-rose-200 hover:bg-rose-500/20'
                            : n.type === 'warning'
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-200 hover:bg-amber-500/20'
                            : 'bg-slate-850 border-slate-700 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-semibold text-slate-100">{n.title}</p>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.timestamp}</span>
                        </div>
                        <p className="text-slate-300 mt-1 text-[11px] leading-relaxed">{n.message}</p>
                        {n.actionLabel && (
                          <div className="mt-2 flex justify-end">
                            <span className="text-[10px] font-semibold text-amber-400 hover:underline">
                              {n.actionLabel} →
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Firebase Auth / Cloud Sync Status */}
            {firebaseUser ? (
              <div className="flex items-center gap-1.5 pl-1">
                <div
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs cursor-pointer hover:bg-emerald-500/20"
                  onClick={logoutUser}
                  title={`Logged in as ${firebaseUser.email}. Click to sign out.`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-semibold hidden lg:inline truncate max-w-[100px]">
                    {firebaseUser.displayName?.split(' ')[0] || 'Synced'}
                  </span>
                  <span className="text-[10px] text-slate-400">Sign Out</span>
                </div>
              </div>
            ) : (
              <button
                onClick={loginWithGoogle}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-colors"
                title="Connect Google Account to sync documents and applications to Firebase"
              >
                <span className="text-amber-400">🔥</span>
                <span className="hidden sm:inline">Firebase Sync</span>
              </button>
            )}

          </div>
        </div>
      </div>
    </header>
  );
};
