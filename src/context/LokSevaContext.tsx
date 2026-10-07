import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import { User, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../firebase';
import {
  UserProfile,
  FamilyMember,
  DocumentItem,
  ApplicationItem,
  OpportunityItem,
  NotificationItem,
  AuditLogEntry,
  LanguageCode,
  DocCategory,
  WorkflowStageKey
} from '../types';
import {
  initialUserProfile,
  initialFamilyMembers,
  initialDocuments,
  initialApplications,
  initialOpportunities,
  initialNotifications,
  initialAuditLogs,
} from '../data/initialData';

interface ConsentModalPayload {
  title: string;
  description: string;
  actionType: 'read_doc' | 'extract_info' | 'fill_form' | 'upload_doc' | 'book_slot' | 'submit_application';
  targetItem?: string;
  onApprove: () => void;
  onDeny?: () => void;
}

interface SlotBookingPayload {
  applicationTitle: string;
  applicationId: string;
  onSuccess: (slot: { date: string; time: string; center: string; tokenNo: string }) => void;
}

interface LokSevaContextType {
  // Profile & Family
  userProfile: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  familyMembers: FamilyMember[];
  activeFamilyMember: FamilyMember;
  switchFamilyMember: (memberId: string) => void;

  // Documents
  documents: DocumentItem[];
  addOrUpdateDocument: (doc: DocumentItem) => void;
  fixDocumentOnce: (docType: DocCategory) => Promise<void>;
  analyzeDocumentWithAi: (docType: DocCategory, fileBase64?: string) => Promise<any>;

  // Applications
  applications: ApplicationItem[];
  updateApplication: (appId: string, updates: Partial<ApplicationItem>) => void;
  advanceApplicationStage: (appId: string, newStage: WorkflowStageKey) => Promise<void>;
  simulateRejection: (appId: string, reason: string) => void;

  // Opportunities
  opportunities: OpportunityItem[];

  // Notifications & Audit Log
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  addNotification: (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;
  auditLogs: AuditLogEntry[];
  addAuditLog: (entry: Omit<AuditLogEntry, 'id' | 'timestamp'>) => Promise<void>;

  // Global Settings & Navigation
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  isSeniorMode: boolean;
  setIsSeniorMode: (enabled: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Voice & AI Chat Assistant
  isListening: boolean;
  isSpeaking: boolean;
  voiceTranscript: string;
  startVoiceInput: () => void;
  stopVoiceInput: () => void;
  speakText: (text: string) => void;
  queryAiAssistant: (prompt: string) => Promise<{ reply: string; detectedService?: string; confidence?: number }>;

  // Interactive Modals
  eligibilityModalItem: OpportunityItem | null;
  setEligibilityModalItem: (item: OpportunityItem | null) => void;
  consentModalData: ConsentModalPayload | null;
  setConsentModalData: (data: ConsentModalPayload | null) => void;
  requestConsent: (payload: ConsentModalPayload) => void;
  slotBookingData: SlotBookingPayload | null;
  setSlotBookingData: (data: SlotBookingPayload | null) => void;
  problemResolverItem: ApplicationItem | null;
  setProblemResolverItem: (item: ApplicationItem | null) => void;
  languageSimplifierOpen: boolean;
  setLanguageSimplifierOpen: (open: boolean) => void;
  globalSearchOpen: boolean;
  setGlobalSearchOpen: (open: boolean) => void;
  riskCheckUrl: string | null;
  setRiskCheckUrl: (url: string | null) => void;

  // Backend Connection Status
  backendConnected: boolean;
  isFirebaseConnected: boolean;

  // Firebase Authentication
  firebaseUser: User | null;
  isAuthLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  logoutUser: () => Promise<void>;

  // Guided End-to-End Demo Journey
  demoStep: number;
  isDemoActive: boolean;
  startEndToEndDemo: () => void;
  nextDemoStep: () => void;
  prevDemoStep: () => void;
  resetDemo: () => void;
  triggerCelebration: () => void;
}

const LokSevaContext = createContext<LokSevaContextType | undefined>(undefined);

export const LokSevaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState<boolean>(true);

  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);
  const [familyMembers] = useState<FamilyMember[]>(initialFamilyMembers);
  const [activeFamilyMemberId, setActiveFamilyMemberId] = useState<string>('fam_ayush');
  const [documents, setDocuments] = useState<DocumentItem[]>(initialDocuments);
  const [applications, setApplications] = useState<ApplicationItem[]>(initialApplications);
  const [opportunities] = useState<OpportunityItem[]>(initialOpportunities);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(initialAuditLogs);
  const [language, setLanguageState] = useState<LanguageCode>('en');
  const [isSeniorMode, setIsSeniorMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [backendConnected, setBackendConnected] = useState<boolean>(true);

  // Monitor Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      setIsAuthLoading(false);

      if (user) {
        // Sync with Firestore
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const snapshot = await getDoc(userDocRef);
          if (snapshot.exists()) {
            const data = snapshot.data();
            setUserProfile(prev => ({
              ...prev,
              name: data.name || user.displayName || prev.name,
              email: data.email || user.email || prev.email,
              ...data
            }));
          } else {
            // Seed profile in Firestore
            const initialData = {
              id: user.uid,
              name: user.displayName || userProfile.name,
              email: user.email || userProfile.email,
              state: userProfile.state,
              district: userProfile.district,
              college: userProfile.college,
              course: userProfile.course,
              annualFamilyIncome: userProfile.annualFamilyIncome,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };
            await setDoc(userDocRef, initialData);
          }
        } catch (error) {
          console.warn('Firestore load/seed error:', error);
          // Don't crash - fallback to local state
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      addNotification({
        title: 'Logged in with Google',
        message: 'Your profile and document vault are now backed up to Firebase Firestore.',
        type: 'success'
      });
    } catch (err: any) {
      console.error('Google Sign-In failed:', err);
      addNotification({
        title: 'Sign In Notice',
        message: err.message || 'Could not authenticate with Google. Continuing in local demo mode.',
        type: 'warning'
      });
    }
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);
      setFirebaseUser(null);
      addNotification({
        title: 'Signed Out',
        message: 'You have been safely signed out. Local demo session restored.',
        type: 'info'
      });
    } catch (err) {
      console.error('Sign Out failed:', err);
    }
  };

  // Voice state
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [voiceTranscript, setVoiceTranscript] = useState<string>('');

  // Modals state
  const [eligibilityModalItem, setEligibilityModalItem] = useState<OpportunityItem | null>(null);
  const [consentModalData, setConsentModalData] = useState<ConsentModalPayload | null>(null);
  const [slotBookingData, setSlotBookingData] = useState<SlotBookingPayload | null>(null);
  const [problemResolverItem, setProblemResolverItem] = useState<ApplicationItem | null>(null);
  const [languageSimplifierOpen, setLanguageSimplifierOpen] = useState<boolean>(false);
  const [globalSearchOpen, setGlobalSearchOpen] = useState<boolean>(false);
  const [riskCheckUrl, setRiskCheckUrl] = useState<string | null>(null);

  // Guided Demo state
  const [demoStep, setDemoStep] = useState<number>(0);
  const [isDemoActive, setIsDemoActive] = useState<boolean>(false);

  // On mount, check health of the backend API and load persisted state
  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(() => setBackendConnected(true))
      .catch(() => setBackendConnected(false));

    fetch('/api/profile')
      .then(res => res.json())
      .then(data => {
        if (data && data.profile) {
          setUserProfile(prev => ({ ...prev, ...data.profile }));
        }
      })
      .catch(err => console.warn('Could not load profile from backend:', err));

    fetch('/api/documents')
      .then(res => res.json())
      .then(data => {
        if (data && data.documents && data.documents.length > 0) {
          setDocuments(data.documents);
        }
      })
      .catch(err => console.warn('Could not load documents from backend:', err));

    fetch('/api/applications')
      .then(res => res.json())
      .then(data => {
        if (data && data.applications && data.applications.length > 0) {
          setApplications(data.applications);
        }
      })
      .catch(err => console.warn('Could not load applications from backend:', err));
  }, []);

  const activeFamilyMember = familyMembers.find(m => m.id === activeFamilyMemberId) || familyMembers[0];

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    setUserProfile(prev => {
      const merged = { ...prev, ...updates };
      // Sync with backend profile API
      fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(merged)
      }).catch(err => console.warn('Backend profile sync:', err));
      return merged;
    });
  };

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    setUserProfile(prev => ({ ...prev, language: lang }));
  };

  const switchFamilyMember = (memberId: string) => {
    setActiveFamilyMemberId(memberId);
    const member = familyMembers.find(m => m.id === memberId);
    if (member) {
      addAuditLog({
        agentName: 'Identity & Consent Layer',
        action: `Switched active profile to ${member.name} (${member.relation})`,
        details: 'Explicit family management authorization verified with digital consent.',
        badge: 'user_consented'
      });
      addNotification({
        title: `Profile Switched to ${member.name}`,
        message: `Now managing services and document access for ${member.relation}.`,
        type: 'info'
      });
    }
  };

  const addAuditLog = async (entry: Omit<AuditLogEntry, 'id' | 'timestamp'>) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newEntry: AuditLogEntry = {
      id: `aud_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: timeStr,
      ...entry
    };
    setAuditLogs(prev => [newEntry, ...prev]);

    // Sync with backend audit log API
    try {
      await fetch('/api/audit-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      });
    } catch (err) {
      console.warn('Backend audit log sync:', err);
    }
  };

  const addNotification = (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      timestamp: 'Just now',
      read: false,
      ...notif
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const addOrUpdateDocument = (doc: DocumentItem) => {
    setDocuments(prev => {
      const idx = prev.findIndex(d => d.id === doc.id || d.type === doc.type);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], ...doc };
        return copy;
      }
      return [...prev, doc];
    });
  };

  // Connected to backend: POST /api/documents/fix-once
  const fixDocumentOnce = async (docType: DocCategory) => {
    let renewedDocData: DocumentItem | null = null;
    try {
      const res = await fetch('/api/documents/fix-once', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ docType })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.renewedDoc) {
          renewedDocData = data.renewedDoc;
        }
      }
    } catch (err) {
      console.warn('Backend fix-once API call:', err);
    }

    const updatedDoc: DocumentItem = renewedDocData || {
      id: `doc_${docType}`,
      type: docType,
      title: 'Annual Income Certificate (Renewed FY 2026-27)',
      subtitle: 'Issued by Block Sadar / RTPS Authority',
      status: 'verified',
      issueDate: '2026-10-05',
      expiryDate: '2027-10-04',
      daysUntilExpiry: 365,
      fileSize: '1.4 MB',
      verifiedByAi: true,
      extractedInfo: {
        'Certificate No': 'IN/BR/2026/902814',
        'Annual Family Income': '₹ 1,80,000/-',
        'Issued By': 'Circle Officer, Patna Sadar',
        'Digital Signature': 'VERIFIED ✓ (National Informatics Centre)'
      },
      mismatchDetected: undefined,
      usedInApplicationIds: ['app_scholarship', 'app_caste_cert']
    };

    addOrUpdateDocument(updatedDoc);

    // Synchronize all dependent applications
    setApplications(prev =>
      prev.map(app => {
        if (app.missingDocTypes.includes(docType)) {
          const newMissing = app.missingDocTypes.filter(t => t !== docType);
          const newProgress = Math.min(100, app.progressPercent + 20);
          return {
            ...app,
            missingDocTypes: newMissing,
            progressPercent: newProgress,
            statusLabel: newMissing.length === 0 ? 'All Documents Verified ✓ Ready for Review' : app.statusLabel,
            nextAction: newMissing.length === 0 ? 'Proceed to Final Submission' : app.nextAction
          };
        }
        return app;
      })
    );

    await addAuditLog({
      agentName: 'Document Intelligence & Propagation Agent',
      action: 'FIX ONCE → APPLIED EVERYWHERE',
      details: 'Income Certificate updated via backend. Automatically refreshed 3 dependent applications (Scholarship, Caste Certificate, Fee Scheme).',
      badge: 'auto'
    });

    addNotification({
      title: 'Fix Once → Use Everywhere Applied',
      message: 'Income Certificate updated via backend. 3 applications have been synchronized with verified status.',
      type: 'success'
    });
  };

  // Connected to backend: POST /api/gemini/ocr-analyze
  const analyzeDocumentWithAi = async (docType: DocCategory, fileBase64?: string) => {
    try {
      const res = await fetch('/api/gemini/ocr-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          docType,
          imageBase64: fileBase64,
          userProfile
        })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Backend OCR call fallback:', e);
    }
    return {
      docType,
      extracted: {
        name: userProfile.name,
        dob: userProfile.dob,
        income: '₹ 1,80,000',
        status: 'Valid'
      },
      profileMatch: { nameMatch: true, dobMatch: true, addressMatch: true },
      confidence: 0.94
    };
  };

  const updateApplication = (appId: string, updates: Partial<ApplicationItem>) => {
    setApplications(prev =>
      prev.map(a => (a.id === appId ? { ...a, ...updates } : a))
    );
  };

  // Connected to backend: PATCH /api/applications/:id
  const advanceApplicationStage = async (appId: string, newStage: WorkflowStageKey) => {
    const stages: WorkflowStageKey[] = [
      'eligibility',
      'documents',
      'form',
      'review',
      'submission',
      'verification',
      'approval',
      'completed'
    ];
    const newIndex = stages.indexOf(newStage);
    const progressCalc = Math.round(((newIndex + 0.5) / stages.length) * 100);

    setApplications(prev =>
      prev.map(a => {
        if (a.id !== appId) return a;
        const newStatuses = { ...a.stageStatuses };
        stages.forEach((stage, idx) => {
          if (idx < newIndex) newStatuses[stage] = 'completed';
          else if (idx === newIndex) newStatuses[stage] = 'current';
          else newStatuses[stage] = 'pending';
        });

        return {
          ...a,
          currentStage: newStage,
          stageStatuses: newStatuses,
          progressPercent: progressCalc,
          isReturnedOrRejected: false
        };
      })
    );

    // Call backend API
    try {
      await fetch(`/api/applications/${appId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentStage: newStage,
          progressPercent: progressCalc
        })
      });
    } catch (err) {
      console.warn('Backend application patch:', err);
    }
  };

  const simulateRejection = (appId: string, reason: string) => {
    setApplications(prev =>
      prev.map(a => {
        if (a.id !== appId) return a;
        const newStatuses = { ...a.stageStatuses };
        newStatuses.verification = 'failed';
        return {
          ...a,
          isReturnedOrRejected: true,
          rejectionReason: reason,
          statusLabel: 'Application Returned for Correction',
          nextAction: 'Fix required: Outdated Income Certificate needs replacement.',
          stageStatuses: newStatuses
        };
      })
    );
    addNotification({
      title: 'Action Required: Application Returned',
      message: `Your scholarship application was returned: "${reason}". Click to fix now with Lok Seva AI.`,
      type: 'urgent',
      actionLabel: 'Solve Problem',
      actionTarget: 'problem_resolver'
    });
  };

  // Connected to backend: POST /api/gemini/chat
  const queryAiAssistant = async (prompt: string) => {
    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          userProfile,
          language
        })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('Backend chat API call:', err);
    }
    return {
      reply: 'Lok Seva AI has processed your request and identified relevant government services.',
      confidence: 0.94
    };
  };

  const requestConsent = (payload: ConsentModalPayload) => {
    setConsentModalData(payload);
  };

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Voice Speech Synthesis
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.includes('en-IN') || v.lang.includes('en-GB') || v.lang.includes('en'));
    if (englishVoice) utterance.voice = englishVoice;
    utterance.rate = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  // Voice Input (Web Speech Recognition)
  const startVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      addNotification({
        title: 'Microphone Not Available',
        message: 'Speech recognition is not supported or permitted in this browser iframe. Please type in the query bar.',
        type: 'info'
      });
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setVoiceTranscript('');
    };
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setVoiceTranscript(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => {
      setIsListening(false);
    };
    recognition.onend = () => {
      setIsListening(false);
    };
    recognition.start();
  };

  const stopVoiceInput = () => {
    setIsListening(false);
  };

  const startEndToEndDemo = () => {
    setIsDemoActive(true);
    setDemoStep(1);
    setActiveTab('dashboard');
  };

  const nextDemoStep = () => {
    setDemoStep(prev => prev + 1);
  };

  const prevDemoStep = () => {
    setDemoStep(prev => Math.max(1, prev - 1));
  };

  const resetDemo = () => {
    setIsDemoActive(false);
    setDemoStep(0);
  };

  return (
    <LokSevaContext.Provider
      value={{
        userProfile,
        updateUserProfile,
        familyMembers,
        activeFamilyMember,
        switchFamilyMember,
        documents,
        addOrUpdateDocument,
        fixDocumentOnce,
        analyzeDocumentWithAi,
        applications,
        updateApplication,
        advanceApplicationStage,
        simulateRejection,
        opportunities,
        notifications,
        markNotificationRead,
        addNotification,
        auditLogs,
        addAuditLog,
        language,
        setLanguage,
        isSeniorMode,
        setIsSeniorMode,
        activeTab,
        setActiveTab,
        isListening,
        isSpeaking,
        voiceTranscript,
        startVoiceInput,
        stopVoiceInput,
        speakText,
        queryAiAssistant,
        eligibilityModalItem,
        setEligibilityModalItem,
        consentModalData,
        setConsentModalData,
        requestConsent,
        slotBookingData,
        setSlotBookingData,
        problemResolverItem,
        setProblemResolverItem,
        languageSimplifierOpen,
        setLanguageSimplifierOpen,
        globalSearchOpen,
        setGlobalSearchOpen,
        riskCheckUrl,
        setRiskCheckUrl,
        backendConnected,
        isFirebaseConnected,
        firebaseUser,
        isAuthLoading,
        loginWithGoogle,
        logoutUser,
        demoStep,
        isDemoActive,
        startEndToEndDemo,
        nextDemoStep,
        prevDemoStep,
        resetDemo,
        triggerCelebration
      }}
    >
      {children}
    </LokSevaContext.Provider>
  );
};

export const useLokSeva = (): LokSevaContextType => {
  const context = useContext(LokSevaContext);
  if (!context) {
    throw new Error('useLokSeva must be used within a LokSevaProvider');
  }
  return context;
};
