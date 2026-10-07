import React, { useState } from 'react';
import { useLokSeva } from '../../context/LokSevaContext';
import {
  X,
  HelpCircle,
  Sparkles,
  RefreshCw,
  Send,
  Volume2,
  CheckCircle2,
  BookOpen
} from 'lucide-react';

export const LanguageSimplifierModal: React.FC = () => {
  const {
    languageSimplifierOpen,
    setLanguageSimplifierOpen,
    speakText
  } = useLokSeva();

  const sampleTexts = [
    {
      title: 'Self-Attestation Requirement',
      text: 'The applicant is hereby directed to produce self-attested documentary evidence in respect of educational qualification along with non-encumbrance undertaking on non-judicial stamp paper.'
    },
    {
      title: 'DBT Seeding Notice',
      text: 'Disbursement of post-matric stipend is strictly contingent upon Aadhaar mapped NPCI DBT bank mandate seeding with active KYC compliance.'
    },
    {
      title: 'Income Certificate Validity',
      text: 'Certificates issued pursuant to financial year preceding the current assessment shall be deemed non-cognizable under Clause 14(b) of the Welfare Code.'
    }
  ];

  const [inputText, setInputText] = useState(sampleTexts[0].text);
  const [simplifiedEnglish, setSimplifiedEnglish] = useState(
    'Please sign a photocopy of your marksheets with your own handwriting (self-attest) and upload it. No expensive lawyer stamp needed.'
  );
  const [simplifiedHindi, setSimplifiedHindi] = useState(
    'इस डॉक्यूमेंट की फोटोकॉपी पर अपने हाथ से हस्ताक्षर (Signature) करें और फिर अपलोड करें। किसी वकील या नोटरी की जरूरत नहीं है।'
  );
  const [keyTakeaway, setKeyTakeaway] = useState('Photocopy + your signature only.');
  const [isSimplifying, setIsSimplifying] = useState(false);

  if (!languageSimplifierOpen) return null;

  const handleSimplify = async (textToUse?: string) => {
    const text = textToUse || inputText;
    if (!text.trim()) return;

    setIsSimplifying(true);
    try {
      const res = await fetch('/api/gemini/simplify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ officialText: text })
      });
      if (res.ok) {
        const data = await res.json();
        setSimplifiedEnglish(data.simplifiedEnglish);
        setSimplifiedHindi(data.simplifiedHindi);
        setKeyTakeaway(data.keyTakeaway);
      }
    } catch (e) {
      console.warn('Fallback simplifier:', e);
    } finally {
      setIsSimplifying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-7 relative animate-in fade-in zoom-in-95 duration-200">
        
        <button
          onClick={() => setLanguageSimplifierOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge */}
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            "Explain This" • Government Language Simplifier
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
          Confused by Government Notices?
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Paste any difficult official circular, portal requirement, or legal notice to translate into plain, easy language.
        </p>

        {/* Quick Sample Selector */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-[11px] text-slate-400 font-semibold self-center">Try sample:</span>
          {sampleTexts.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputText(s.text);
                handleSimplify(s.text);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs border border-slate-700"
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Input box */}
        <div className="mt-3">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={3}
            placeholder="Paste official bureaucratic text here..."
            className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
          />

          <div className="mt-2 flex justify-end">
            <button
              onClick={() => handleSimplify()}
              disabled={isSimplifying || !inputText.trim()}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 disabled:opacity-40"
            >
              {isSimplifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Simplifying...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Explain in Plain Hindi & English</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Simplified Output Box */}
        <div className="mt-5 space-y-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                🇮🇳 Colloquial Hindi (सरल हिन्दी)
              </span>
              <button
                onClick={() => speakText(simplifiedHindi)}
                className="text-[11px] text-slate-400 hover:text-amber-400 flex items-center gap-1"
                title="Listen with voice"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Listen</span>
              </button>
            </div>
            <p className="text-sm text-slate-100 font-hindi leading-relaxed">
              "{simplifiedHindi}"
            </p>
          </div>

          <div className="pt-3 border-t border-slate-900">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                🇬🇧 Plain Conversational English
              </span>
              <button
                onClick={() => speakText(simplifiedEnglish)}
                className="text-[11px] text-slate-400 hover:text-emerald-400 flex items-center gap-1"
                title="Listen with voice"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Listen</span>
              </button>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              "{simplifiedEnglish}"
            </p>
          </div>

          <div className="pt-2 border-t border-slate-900">
            <p className="text-[11px] text-slate-400">
              <strong className="text-amber-300">Key Rule:</strong> {keyTakeaway}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
