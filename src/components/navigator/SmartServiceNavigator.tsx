import React, { useState } from 'react';
import { useLokSeva } from '../../context/LokSevaContext';
import {
  Search,
  Landmark,
  CheckCircle2,
  XCircle,
  FileText,
  Clock,
  ArrowRight,
  ShieldCheck,
  Bot
} from 'lucide-react';
import { DocCategory } from '../../types';

interface ServiceDefinition {
  id: string;
  name: string;
  category: 'certificate' | 'scholarship' | 'pension' | 'identity' | 'scheme';
  state: string;
  department: string;
  purpose: string;
  eligibility: string[];
  requiredDocs: { type: DocCategory; label: string }[];
  processSteps: string[];
  timeline: string;
  officialFee: string;
  portalName: string;
}

const servicesDirectory: ServiceDefinition[] = [
  {
    id: 'srv_income_certificate',
    name: 'Income Certificate (Annual Revenue Proof)',
    category: 'certificate',
    state: 'Bihar',
    department: 'Revenue & Land Reforms Department',
    purpose: 'Statutory certificate certifying the total annual income of the family from all sources for scholarships, fee waivers, and state subsidies.',
    eligibility: [
      'Permanent resident of the state',
      'Valid Aadhaar or biometric identity proof',
      'Self-declaration of family agricultural / business revenue'
    ],
    requiredDocs: [
      { type: 'aadhaar', label: 'Aadhaar Card' },
      { type: 'address_proof', label: 'Address Proof / Ration Card' },
      { type: 'photograph', label: 'Passport Photograph' },
      { type: 'income_cert', label: 'Income Declaration / Salary Slip' }
    ],
    processSteps: [
      'Fill Form IV online on state RTPS portal',
      'AI cross-checks identity attributes with Aadhaar',
      'Revenue Inspector electronic verification',
      'Digital signature issued by Circle Officer (CO)',
      'Direct download of verified PDF with QR code'
    ],
    timeline: '7 - 10 Working Days',
    officialFee: 'Free (₹0)',
    portalName: 'serviceonline.bihar.gov.in (RTPS Bihar)'
  },
  {
    id: 'srv_caste_certificate',
    name: 'Caste Certificate (OBC Non-Creamy Layer / SC / ST)',
    category: 'certificate',
    state: 'Bihar',
    department: 'General Administration Department',
    purpose: 'Statutory verification of social category required for reservation in government jobs, competitive examinations, and educational quotas.',
    eligibility: [
      'Resident belonging to recognized OBC, EBC, SC, or ST list',
      'Proof of ancestral residence in the state'
    ],
    requiredDocs: [
      { type: 'aadhaar', label: 'Aadhaar Card' },
      { type: 'marksheet_10', label: '10th Marksheet (DOB & Name Proof)' },
      { type: 'photograph', label: 'Passport Photograph' },
      { type: 'income_cert', label: 'Parental Income Proof (for NCL)' }
    ],
    processSteps: [
      'Submit application on state GAD portal',
      'Upload lineage & resident documentary evidence',
      'Field inspector electronic verification',
      'Issuance of digitized barcode certificate'
    ],
    timeline: '10 - 14 Working Days',
    officialFee: 'Free (₹0)',
    portalName: 'RTPS Service Plus Portal'
  },
  {
    id: 'srv_domicile_certificate',
    name: 'Permanent Residence / Domicile Certificate',
    category: 'certificate',
    state: 'Bihar',
    department: 'Revenue Department',
    purpose: 'Legal proof of permanent residence required for state quotas in university admissions, state recruitment, and competitive benefits.',
    eligibility: [
      'Residing continuously in the state or ancestral domicile'
    ],
    requiredDocs: [
      { type: 'aadhaar', label: 'Aadhaar Card with Local Address' },
      { type: 'photograph', label: 'Passport Photograph' },
      { type: 'address_proof', label: 'Electricity Bill or Land Registry' }
    ],
    processSteps: [
      'Online application on RTPS',
      'Automated address validation with UIDAI',
      'Issuance by Revenue Officer'
    ],
    timeline: '7 Working Days',
    officialFee: 'Free (₹0)',
    portalName: 'serviceonline.bihar.gov.in'
  },
  {
    id: 'srv_post_matric_scholarship',
    name: 'Post-Matric Scholarship for College Students (PMS)',
    category: 'scholarship',
    state: 'Bihar',
    department: 'Education Department & Welfare Board',
    purpose: 'Reimbursement of tuition fees and monthly maintenance allowance for post-secondary students pursuing undergraduate or diploma courses.',
    eligibility: [
      'Enrolled in recognized College / University',
      'Annual family income below ₹2,50,000 threshold',
      'Passed qualifying secondary or higher secondary exam'
    ],
    requiredDocs: [
      { type: 'aadhaar', label: 'Aadhaar Card (DBT Linked)' },
      { type: 'college_id', label: 'College ID & Bonafide Certificate' },
      { type: 'marksheet_12', label: '12th Class Marksheet' },
      { type: 'income_cert', label: 'Valid Income Certificate (Current FY)' },
      { type: 'bank_passbook', label: 'Bank Passbook (Aadhaar Seeded)' }
    ],
    processSteps: [
      'Student registration with Aadhaar eKYC',
      'College / Institute nodal officer verification',
      'District Welfare Officer approval',
      'Direct Benefit Transfer (DBT) credit to Aadhaar linked account'
    ],
    timeline: '20 - 30 Working Days',
    officialFee: 'Free (₹0)',
    portalName: 'pmsonline.bih.nic.in'
  },
  {
    id: 'srv_old_age_pension',
    name: 'Senior Citizen Old Age Pension (Indira Gandhi Scheme)',
    category: 'pension',
    state: 'Central',
    department: 'Ministry of Rural Development & Social Welfare',
    purpose: 'Monthly financial assistance pension disbursed directly to bank accounts of senior citizens aged 60 and above.',
    eligibility: [
      'Age 60 years or older',
      'Resident household meeting economic criteria'
    ],
    requiredDocs: [
      { type: 'aadhaar', label: 'Aadhaar Card for Age Verification' },
      { type: 'bank_passbook', label: 'Bank / Post Office Passbook' },
      { type: 'photograph', label: 'Passport Size Photograph' },
      { type: 'income_cert', label: 'Income Certificate / BPL Document' }
    ],
    processSteps: [
      'Application submission online or at Block Seva Kendra',
      'Social Security Officer verification',
      'Approval and recurring monthly DBT pension disbursement'
    ],
    timeline: '15 - 20 Working Days',
    officialFee: 'Free (₹0)',
    portalName: 'nsap.nic.in'
  }
];

export const SmartServiceNavigator: React.FC<{ onStartAgentWithService: (service: ServiceDefinition) => void }> = ({
  onStartAgentWithService
}) => {
  const { documents } = useLokSeva();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedService, setSelectedService] = useState<ServiceDefinition>(servicesDirectory[0]);

  const isDocAvailable = (docType: DocCategory) => {
    const doc = documents.find(d => d.type === docType);
    return doc && doc.status === 'verified';
  };

  const filteredServices = servicesDirectory.filter(s => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      s.name.toLowerCase().includes(query) ||
      s.purpose.toLowerCase().includes(query) ||
      s.department.toLowerCase().includes(query);
    const matchesState = selectedState === 'All' || s.state === selectedState || s.state === 'Central';
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    return matchesSearch && matchesState && matchesCategory;
  });

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header Banner */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white font-heading">
              Smart Service Navigator
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              You don't need to navigate complex government directories. Tell us what you need, and Lok Seva AI maps the statutory service, required documents, and process steps.
            </p>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-semibold text-emerald-400 flex items-center gap-1.5 shrink-0">
            <ShieldCheck className="w-4 h-4" />
            <span>Sandbox Connectors Connected</span>
          </div>
        </div>

        {/* Search & State Filter */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services (e.g. 'Income certificate', 'Caste certificate', 'Pension')..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="md:col-span-4">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
            >
              <option value="All">All Jurisdictions / Central</option>
              <option value="Bihar">Bihar (RTPS)</option>
              <option value="Uttar Pradesh">Uttar Pradesh (eDistrict)</option>
              <option value="Maharashtra">Maharashtra (MahaOnline)</option>
              <option value="Delhi">Delhi (eSLA)</option>
              <option value="Central">Central Govt Schemes</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Layout: Service List on Left, Detail on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Service Cards */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-1">
            <span>Available Services ({filteredServices.length})</span>
            <span>Select to inspect</span>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredServices.map((service) => {
              const isSelected = selectedService.id === service.id;
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500/60 shadow-sm'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-750'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                      {service.state}
                    </span>
                    <span className="text-xs font-semibold text-emerald-400">
                      {service.officialFee}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-white mt-2">
                    {service.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {service.purpose}
                  </p>

                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {service.timeline}
                    </span>
                    <span className="text-amber-400 font-semibold flex items-center gap-1">
                      View Details <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Service Details & Next Action */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-sm space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold text-slate-300">{selectedService.department}</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Demo Connector Active
              </span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white font-heading">
                {selectedService.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                {selectedService.purpose}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block">Official Portal</span>
                <span className="text-slate-200 font-medium truncate block">{selectedService.portalName}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Estimated Timeline</span>
                <span className="text-amber-400 font-medium">{selectedService.timeline}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Government Fee</span>
                <span className="text-emerald-400 font-medium">{selectedService.officialFee}</span>
              </div>
            </div>

            {/* Required Documents Checklist */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Required Documents Checklist (Live Vault Match)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedService.requiredDocs.map((doc, idx) => {
                  const available = isDocAvailable(doc.type);
                  return (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-lg border flex items-center justify-between text-xs ${
                        available
                          ? 'bg-slate-950 border-slate-800 text-slate-200'
                          : 'bg-rose-500/10 border-rose-500/30 text-rose-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {available ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        )}
                        <span className="font-medium text-slate-200">{doc.label}</span>
                      </div>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                        available ? 'bg-emerald-500/10 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {available ? 'Ready in Vault' : 'Missing'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Process Steps */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Official Procedure Steps
              </h3>
              <div className="space-y-1.5">
                {selectedService.processSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="w-4 h-4 rounded-full bg-slate-800 text-amber-400 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-slate-200">Next Action:</p>
                <p className="text-[11px] text-slate-400">Lok Seva AI will extract details from your vault and draft the application.</p>
              </div>

              <button
                onClick={() => onStartAgentWithService(selectedService)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition-colors flex items-center justify-center gap-1.5"
              >
                <Bot className="w-4 h-4" />
                <span>Start Application with AI</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
