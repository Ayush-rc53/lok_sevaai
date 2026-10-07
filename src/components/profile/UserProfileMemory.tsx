import React, { useState } from 'react';
import { useLokSeva } from '../../context/LokSevaContext';
import {
  User,
  GraduationCap,
  ShieldCheck,
  Lock,
  Edit2,
  Save,
  Sparkles
} from 'lucide-react';

export const UserProfileMemory: React.FC = () => {
  const { userProfile, updateUserProfile, addAuditLog, triggerCelebration } = useLokSeva();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userProfile);

  const handleSave = () => {
    updateUserProfile(formData);
    setIsEditing(false);
    triggerCelebration();

    addAuditLog({
      agentName: 'Personal AI Memory Agent',
      action: 'Updated Profile Knowledge Base',
      details: 'Stored updated academic & contact attributes for automatic form reuse.',
      badge: 'user_consented'
    });
  };

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-slate-850 border border-slate-700 flex items-center justify-center text-2xl">
              👦
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white font-heading">{userProfile.name}</h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                  Verified Identity
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {userProfile.college} • {userProfile.course} • {userProfile.district}, {userProfile.state}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (isEditing) handleSave();
              else setIsEditing(true);
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
          >
            {isEditing ? (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </>
            ) : (
              <>
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* AI Memory Callout */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3 text-xs text-slate-300">
        <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-white">Continuous AI Memory Active</p>
          <p className="text-slate-400 mt-0.5">
            Your academic records and social category were verified in previous applications. Lok Seva AI automatically reuses verified credentials so you never have to re-enter them repeatedly.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Personal & Identity */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <User className="w-4 h-4 text-amber-400" />
            <h2 className="text-base font-bold text-white font-heading">Personal Details</h2>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Full Name</span>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 mt-1 rounded-lg bg-slate-950 border border-slate-700 text-white"
                />
              ) : (
                <p className="font-semibold text-slate-100">{userProfile.name}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-slate-400 block text-[11px]">Date of Birth</span>
                <p className="font-semibold text-slate-100">{userProfile.dob}</p>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Social Category</span>
                <p className="font-semibold text-slate-100">{userProfile.category} (Non-Creamy Layer)</p>
              </div>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Aadhaar Number (Protected)</span>
              <p className="font-mono font-medium text-emerald-400 flex items-center gap-1.5 mt-0.5">
                <Lock className="w-3.5 h-3.5" />
                {userProfile.aadhaarMasked} (Verified via UIDAI eKYC)
              </p>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Permanent Domicile</span>
              <p className="font-semibold text-slate-100">{userProfile.district}, {userProfile.state} - {userProfile.pincode}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-slate-400 block text-[11px]">Phone</span>
                <p className="font-semibold text-slate-100">{userProfile.phone}</p>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Email</span>
                <p className="font-semibold text-slate-100 truncate">{userProfile.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Education & Academic Record */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            <h2 className="text-base font-bold text-white font-heading">Education & Academic Record</h2>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Enrolled Institution</span>
              <p className="font-semibold text-slate-100">{userProfile.college}</p>
              <p className="text-[10px] text-slate-400">Affiliated to {userProfile.university}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-slate-400 block text-[11px]">Degree & Course</span>
                <p className="font-semibold text-slate-100">{userProfile.course}</p>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Current Semester</span>
                <p className="font-semibold text-slate-100">{userProfile.semester}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-slate-400 block text-[11px]">Cumulative CGPA</span>
                <p className="font-bold text-amber-400">{userProfile.cgpa}</p>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Passing Out Year</span>
                <p className="font-semibold text-slate-100">{userProfile.passingYear}</p>
              </div>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Student Roll / Registration No.</span>
              <p className="font-mono font-medium text-slate-200">{userProfile.studentIdNo}</p>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <span className="text-slate-400 block text-[11px]">Annual Family Income</span>
              <p className="font-bold text-emerald-400">
                ₹{userProfile.annualFamilyIncome.toLocaleString('en-IN')} / year (Under ₹2.5L Threshold)
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
