import React, { useState } from 'react';
import { useLokSeva } from '../../context/LokSevaContext';
import { OpportunityItem } from '../../types';
import {
  Sparkles,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Search
} from 'lucide-react';

export const StudentOpportunities: React.FC<{ onApplyOpportunity: (opp: OpportunityItem) => void }> = ({
  onApplyOpportunity
}) => {
  const { opportunities, setEligibilityModalItem } = useLokSeva();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedWhyId, setExpandedWhyId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Opportunities' },
    { id: 'scholarship', label: 'Scholarships' },
    { id: 'internship', label: 'Internships' },
    { id: 'fellowship', label: 'Fellowships' },
    { id: 'scheme', label: 'Education Schemes' }
  ];

  const filtered = opportunities.filter((opp) => {
    const matchesCat = selectedCategory === 'all' || opp.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.benefit.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header Banner */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white font-heading">
              Student Opportunities
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Curated government scholarships, industrial internships, fellowships, and tuition waivers matched to your verified academic qualifications.
            </p>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-semibold text-emerald-400 flex items-center gap-1.5 shrink-0">
            <ShieldCheck className="w-4 h-4" />
            <span>NSP & MCA Portals Synced</span>
          </div>
        </div>

        {/* Filter Pills & Search */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedCategory === c.id
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((opp) => {
          const isWhyExpanded = expandedWhyId === opp.id;
          return (
            <div
              key={opp.id}
              className="rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-750 p-5 sm:p-6 shadow-sm flex flex-col justify-between transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                      {opp.category}
                    </span>
                    <span className="text-xs text-slate-400 truncate max-w-[150px]">
                      {opp.state}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-xs">
                    <Sparkles className="w-3 h-3" />
                    <span>{opp.matchScore}% Match</span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mt-2.5 font-heading leading-snug">
                  {opp.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {opp.department}
                </p>

                {/* Financial Benefit Callout */}
                <div className="mt-3.5 p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
                      Benefit & Financial Aid
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-300">
                      {opp.benefit}
                    </span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-900 text-amber-400 border border-slate-800">
                    {opp.stipendOrAmount}
                  </span>
                </div>

                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  {opp.description}
                </p>

                {/* "Why am I seeing this?" */}
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <button
                    onClick={() => setExpandedWhyId(isWhyExpanded ? null : opp.id)}
                    className="w-full flex items-center justify-between text-xs font-medium text-slate-300 hover:text-amber-400 transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                      <span>Why am I seeing this? ({opp.whyMatch.length} Criteria Matched)</span>
                    </span>
                    <span className="text-[11px] text-amber-400 font-semibold">
                      {isWhyExpanded ? 'Hide Details' : 'Show Details'}
                    </span>
                  </button>

                  {isWhyExpanded && (
                    <div className="mt-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      {opp.whyMatch.map((m, idx) => (
                        <div key={idx} className="flex items-start justify-between gap-2 text-xs">
                          <div className="flex items-center gap-1.5">
                            {m.matched ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            ) : (
                              <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                            )}
                            <span className="text-slate-200 font-medium">{m.criteria}</span>
                          </div>
                          <span className="text-[11px] text-slate-400 text-right">{m.note}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-3.5 border-t border-slate-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 text-xs text-rose-400 font-medium">
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
                    onClick={() => onApplyOpportunity(opp)}
                    className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1"
                  >
                    <span>Apply with AI</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
