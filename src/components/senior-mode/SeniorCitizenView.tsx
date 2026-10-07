import React, { useState } from 'react';
import { useLokSeva } from '../../context/LokSevaContext';
import {
  FileText,
  DollarSign,
  Mic,
  ArrowRight,
  Volume2,
  CheckCircle2,
  X,
  PhoneCall,
  HeartHandshake
} from 'lucide-react';

export const SeniorCitizenView: React.FC = () => {
  const {
    setIsSeniorMode,
    speakText,
    startVoiceInput,
    isListening,
    triggerCelebration,
    setActiveTab
  } = useLokSeva();

  const [step, setStep] = useState<number>(1);
  const [selectedTask, setSelectedTask] = useState<string>('pension');

  const handleTaskSelect = (task: string, voiceMessage: string) => {
    setSelectedTask(task);
    setStep(2);
    speakText(voiceMessage);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8 flex flex-col justify-between max-w-4xl mx-auto">
      
      {/* Top Controls */}
      <div className="flex items-center justify-between pb-6 border-b-2 border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-3xl">👴</span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-heading">
              वरिष्ठ नागरिक सेवा (Senior Citizen Mode)
            </h1>
            <p className="text-sm text-slate-300">बड़े अक्षरों और आवाज के साथ आसान सुविधा</p>
          </div>
        </div>

        <button
          onClick={() => setIsSeniorMode(false)}
          className="px-4 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-sm font-bold text-slate-200 border border-slate-700"
        >
          सामान्य मोड (Exit) ✕
        </button>
      </div>

      {/* Screen 1: Choice Screen */}
      {step === 1 && (
        <div className="my-auto py-10 space-y-8 text-center">
          <h2 className="text-3xl sm:text-5xl font-black text-white font-hindi">
            आपको क्या करना है?
          </h2>
          <p className="text-lg text-slate-300">
            नीचे दिए गए बड़े बटन पर क्लिक करें या बोलकर बताएं:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-8">
            
            {/* Pension */}
            <button
              onClick={() =>
                handleTaskSelect(
                  'pension',
                  'वृद्धावस्था पेंशन के लिए अब अपना आधार कार्ड दिखाइए।'
                )
              }
              className="p-8 rounded-3xl bg-amber-500 hover:bg-amber-400 text-slate-950 flex flex-col items-center justify-center gap-4 shadow-2xl transition-all transform hover:scale-105 active:scale-95"
            >
              <DollarSign className="w-16 h-16" />
              <span className="text-2xl font-black font-hindi">💰 वृद्धावस्था पेंशन (PENSION)</span>
            </button>

            {/* Certificate */}
            <button
              onClick={() =>
                handleTaskSelect(
                  'certificate',
                  'प्रमाण पत्र के लिए अपने पुराने कागज दिखाइए।'
                )
              }
              className="p-8 rounded-3xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex flex-col items-center justify-center gap-4 shadow-2xl transition-all transform hover:scale-105 active:scale-95"
            >
              <FileText className="w-16 h-16" />
              <span className="text-2xl font-black font-hindi">📄 प्रमाण पत्र (CERTIFICATE)</span>
            </button>

            {/* Voice Talk */}
            <button
              onClick={() => {
                speakText('नमस्ते! मुझे बताएं आपको क्या सहायता चाहिए?');
                startVoiceInput();
              }}
              className="p-8 rounded-3xl bg-sky-500 hover:bg-sky-400 text-slate-950 flex flex-col items-center justify-center gap-4 shadow-2xl transition-all transform hover:scale-105 active:scale-95"
            >
              <Mic className="w-16 h-16" />
              <span className="text-2xl font-black font-hindi">🎙️ बोलकर बताएं (TALK TO AI)</span>
            </button>

          </div>
        </div>
      )}

      {/* Screen 2: Guided 1-Step Task */}
      {step === 2 && (
        <div className="my-auto py-10 space-y-8 text-center max-w-2xl mx-auto">
          <div className="inline-flex p-4 rounded-full bg-amber-500/20 text-amber-400 mb-2">
            <Volume2 className="w-12 h-12 animate-pulse" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white font-hindi">
            {selectedTask === 'pension'
              ? 'अब अपना आधार कार्ड दिखाइए।'
              : 'अपने दस्तावेज की जांच पूरी हो गई है।'}
          </h2>

          <div className="p-6 rounded-3xl bg-slate-900 border-2 border-slate-700 text-left text-base text-slate-200 space-y-3">
            <p className="flex items-center gap-3">
              <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0" />
              <span className="text-xl">नाम: रामदास शर्मा (उम्र 74 वर्ष)</span>
            </p>
            <p className="flex items-center gap-3">
              <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0" />
              <span className="text-xl">आधार कार्ड: XXXX-XXXX-6610 ✓ सत्यापित</span>
            </p>
            <p className="flex items-center gap-3">
              <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0" />
              <span className="text-xl">बैंक खाता: स्टेट बैंक ऑफ इंडिया (डीबीटी सक्रिय)</span>
            </p>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => setStep(1)}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-800 text-slate-300 text-xl font-bold"
            >
              ← पीछे जाएं
            </button>

            <button
              onClick={() => {
                setStep(3);
                speakText('बहुत अच्छा! आपकी पेंशन का आवेदन जमा हो गया है।');
                triggerCelebration();
              }}
              className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-2xl font-black shadow-2xl flex items-center justify-center gap-3"
            >
              <span>बहुत अच्छा। अब आगे बढ़ें (NEXT)</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Screen 3: Completion Celebration */}
      {step === 3 && (
        <div className="my-auto py-10 space-y-6 text-center max-w-xl mx-auto">
          <div className="w-24 h-24 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-5xl font-black mx-auto shadow-2xl">
            ✓
          </div>

          <h2 className="text-4xl sm:text-5xl font-black text-white font-hindi">
            बधाई हो! आपका आवेदन पूरा हुआ।
          </h2>

          <p className="text-xl text-slate-300">
            आपकी वृद्धावस्था पेंशन का टोकन नंबर <strong>#PAT-9821</strong> है। हर महीने ₹ 1,000 सीधे आपके बैंक खाते में आएंगे।
          </p>

          <button
            onClick={() => {
              setStep(1);
              setIsSeniorMode(false);
              setActiveTab('applications');
            }}
            className="mt-6 px-10 py-5 rounded-3xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-2xl font-black shadow-2xl"
          >
            वापस होम स्क्रीन पर जाएं
          </button>
        </div>
      )}

      {/* Footer Support */}
      <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-slate-400 text-sm">
        <span>सहायता हेतु टोल फ्री नंबर: 1800-180-1551</span>
        <span>भारत सरकार जन सेवा केंद्र</span>
      </div>

    </div>
  );
};
