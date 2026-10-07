import React, { useState } from 'react';
import { useLokSeva } from '../../context/LokSevaContext';
import {
  Search,
  X,
  GraduationCap,
  FileText,
  Landmark,
  MapPin,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const {
    globalSearchOpen,
    setGlobalSearchOpen,
    opportunities,
    documents,
    applications,
    setActiveTab,
    setEligibilityModalItem
  } = useLokSeva();

  const [query, setQuery] = useState('');

  if (!globalSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingOpportunities = q
    ? opportunities.filter(o => o.title.toLowerCase().includes(q) || o.department.toLowerCase().includes(q) || o.category.includes(q))
    : opportunities.slice(0, 3);

  const matchingDocs = q
    ? documents.filter(d => d.title.toLowerCase().includes(q) || d.type.includes(q) || d.subtitle.toLowerCase().includes(q))
    : documents.slice(0, 3);

  const matchingApps = q
    ? applications.filter(a => a.title.toLowerCase().includes(q) || a.category.includes(q))
    : applications.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-slate-950/85 backdrop-blur-md">
      <div className="w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-6 relative animate-in fade-in zoom-in-95 duration-150">
        
        <button
          onClick={() => setGlobalSearchOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Search Input Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-amber-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search everything (e.g. 'Income', 'Scholarship', 'Aadhaar', 'Internship')..."
            autoFocus
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-950 border-2 border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Results Container */}
        <div className="mt-5 space-y-4 max-h-[460px] overflow-y-auto pr-1">
          
          {/* Opportunities / Scholarships */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
              <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
              Scholarships & Schemes ({matchingOpportunities.length})
            </span>
            <div className="space-y-1.5">
              {matchingOpportunities.map(opp => (
                <div
                  key={opp.id}
                  onClick={() => {
                    setEligibilityModalItem(opp);
                    setGlobalSearchOpen(false);
                  }}
                  className="p-3 rounded-xl bg-slate-950/70 hover:bg-slate-800 border border-slate-800 text-xs flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div>
                    <p className="font-bold text-white">{opp.title}</p>
                    <p className="text-[11px] text-slate-400">{opp.department} • {opp.benefit}</p>
                  </div>
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    {opp.matchScore}% Match <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stored Documents */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              Document Wallet ({matchingDocs.length})
            </span>
            <div className="space-y-1.5">
              {matchingDocs.map(doc => (
                <div
                  key={doc.id}
                  onClick={() => {
                    setActiveTab('documents');
                    setGlobalSearchOpen(false);
                  }}
                  className="p-3 rounded-xl bg-slate-950/70 hover:bg-slate-800 border border-slate-800 text-xs flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div>
                    <p className="font-bold text-white">{doc.title}</p>
                    <p className="text-[11px] text-slate-400">{doc.subtitle}</p>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                    doc.status === 'verified' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Applications */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              Active Applications ({matchingApps.length})
            </span>
            <div className="space-y-1.5">
              {matchingApps.map(app => (
                <div
                  key={app.id}
                  onClick={() => {
                    setActiveTab('applications');
                    setGlobalSearchOpen(false);
                  }}
                  className="p-3 rounded-xl bg-slate-950/70 hover:bg-slate-800 border border-slate-800 text-xs flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div>
                    <p className="font-bold text-white">{app.title}</p>
                    <p className="text-[11px] text-slate-400">{app.statusLabel}</p>
                  </div>
                  <span className="text-amber-400 font-bold">
                    {app.progressPercent}% Complete
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
