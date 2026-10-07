import React, { useState } from 'react';
import { useLokSeva } from '../../context/LokSevaContext';
import { DocumentItem } from '../../types';
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Eye,
  RefreshCw,
  FolderLock,
  Layers,
  X
} from 'lucide-react';

export const DocumentWallet: React.FC = () => {
  const {
    documents,
    fixDocumentOnce,
    userProfile
  } = useLokSeva();

  const [selectedDoc, setSelectedDoc] = useState<DocumentItem>(documents[0]);
  const [inspectModalOpen, setInspectModalOpen] = useState<boolean>(false);
  const [isSimulatingUpload, setIsSimulatingUpload] = useState<boolean>(false);

  const problemDocs = documents.filter(d => d.status === 'expiring_soon' || d.status === 'expired' || d.status === 'missing');

  const handleSimulateUploadFresh = async () => {
    setIsSimulatingUpload(true);
    setTimeout(() => {
      fixDocumentOnce('income_cert');
      setIsSimulatingUpload(false);
      const updated = documents.find(d => d.type === 'income_cert');
      if (updated) setSelectedDoc(updated);
    }, 1000);
  };

  const openInspectDoc = (doc: DocumentItem) => {
    setSelectedDoc(doc);
    setInspectModalOpen(true);
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header Banner */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white font-heading">
              Document Vault
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Zero repetitive uploads. Your documents are verified once by AI OCR, encrypted, and mapped directly to all state scholarship and service portals.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSimulateUploadFresh}
              disabled={isSimulatingUpload}
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-colors flex items-center gap-1.5"
            >
              {isSimulatingUpload ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Processing OCR...</span>
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload / Renew Document</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Hero Sync Alert Banner */}
      {problemDocs.length > 0 && (
        <div className="rounded-2xl bg-slate-900 border border-amber-500/40 p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
            <div className="max-w-2xl">
              <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Renewal Required for 3 Applications</span>
              </div>

              <h2 className="text-lg font-bold text-white">
                Income Certificate is Outdated (Expired FY 2023-24)
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                Your current Income Certificate was issued in August 2023. Instead of re-entering it separately across state portals, renew it once here. Lok Seva AI will immediately sync verified status with:
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-slate-950 border border-rose-500/30 text-rose-300 text-xs font-medium">
                  Post-Matric Scholarship → Blocked
                </span>
                <span className="px-2.5 py-1 rounded-md bg-slate-950 border border-rose-500/30 text-rose-300 text-xs font-medium">
                  Bihar Student Credit Card → Blocked
                </span>
                <span className="px-2.5 py-1 rounded-md bg-slate-950 border border-rose-500/30 text-rose-300 text-xs font-medium">
                  OBC NCL Certificate → Awaiting
                </span>
              </div>
            </div>

            <div className="shrink-0 w-full lg:w-auto">
              <button
                onClick={handleSimulateUploadFresh}
                disabled={isSimulatingUpload}
                className="w-full lg:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition-colors flex items-center justify-center gap-2"
              >
                {isSimulatingUpload ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Document...</span>
                  </>
                ) : (
                  <>
                    <span>Fix Document Once</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Stored Documents */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-base font-bold text-white font-heading">
            Stored Documents ({documents.length})
          </h2>
          <span className="text-xs text-slate-400">Click any document to inspect extracted fields</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc) => {
            const isProblem = doc.status === 'expiring_soon' || doc.status === 'expired';
            return (
              <div
                key={doc.id}
                onClick={() => openInspectDoc(doc)}
                className={`rounded-xl border p-4 sm:p-5 cursor-pointer transition-all flex flex-col justify-between ${
                  isProblem
                    ? 'bg-slate-900 border-amber-500/40 hover:border-amber-400'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                      {doc.type.replace('_', ' ')}
                    </span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      doc.status === 'verified'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                    }`}>
                      {doc.status === 'verified' ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>AI Verified</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-3 h-3" />
                          <span>Outdated</span>
                        </>
                      )}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-white mt-2.5">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {doc.subtitle}
                  </p>

                  <div className="mt-3 text-[11px] text-slate-400 flex items-center gap-2">
                    <span>Issued: {doc.issueDate}</span>
                    {doc.expiryDate && (
                      <span className={isProblem ? 'text-amber-400 font-semibold' : ''}>
                        • Exp: {doc.expiryDate}
                      </span>
                    )}
                  </div>

                  {doc.mismatchDetected && (
                    <div className="mt-2.5 p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-200">
                      <p className="font-semibold">{doc.mismatchDetected.field}</p>
                      <p className="text-[10px] text-amber-300/80 mt-0.5">{doc.mismatchDetected.note}</p>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px] flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-slate-500" />
                    <span>Used in {doc.usedInApplicationIds.length} apps</span>
                  </span>

                  <span className="text-amber-400 font-medium flex items-center gap-1 text-[11px]">
                    Inspect <Eye className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Inspect Document OCR Modal */}
      {inspectModalOpen && selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 relative">
            <button
              onClick={() => setInspectModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              AI OCR Attribute Inspector
            </span>

            <h3 className="text-lg font-bold text-white font-heading mt-2">
              {selectedDoc.title}
            </h3>
            <p className="text-xs text-slate-400">{selectedDoc.subtitle}</p>

            <div className="mt-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Extracted Attributes (Auto Pre-Filled)
              </span>

              {selectedDoc.extractedInfo ? (
                Object.entries(selectedDoc.extractedInfo).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between py-1 border-b border-slate-900 last:border-0">
                    <span className="text-slate-400">{key}:</span>
                    <span className="font-semibold text-slate-100">{value}</span>
                  </div>
                ))
              ) : (
                <p className="text-slate-400">No metadata available.</p>
              )}
            </div>

            <div className="mt-3.5 p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
              <span className="font-semibold text-slate-300 block mb-1">Profile Cross-Verification:</span>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Name Match: 100%</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>DOB Match: 100%</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setInspectModalOpen(false)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold"
              >
                Close
              </button>
              {selectedDoc.status !== 'verified' && (
                <button
                  onClick={() => {
                    handleSimulateUploadFresh();
                    setInspectModalOpen(false);
                  }}
                  className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold"
                >
                  Renew This Document
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
