export type LanguageCode = 'hi' | 'en' | 'bn' | 'mr' | 'ta';

export interface UserProfile {
  id: string;
  name: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  state: string;
  district: string;
  pincode: string;
  aadhaarMasked: string;
  category: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';
  
  // Education
  college: string;
  university: string;
  course: string;
  semester: string;
  qualification: string;
  cgpa: string;
  passingYear: string;
  studentIdNo: string;

  // Family & Income
  annualFamilyIncome: number; // in Rupees, e.g. 180000
  fatherName: string;
  motherName: string;
  fatherOccupation: string;

  // Preferences
  language: LanguageCode;
  voiceAutoSpeak: boolean;
  isSeniorMode: boolean;
  activeFamilyMemberId: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: 'Self' | 'Father' | 'Mother' | 'Grandfather' | 'Sister' | 'Brother';
  avatar: string;
  age: number;
  aadhaarMasked: string;
  state: string;
  district: string;
  hasConsentGiven: boolean;
}

export type DocCategory = 
  | 'aadhaar'
  | 'college_id'
  | 'marksheet_10'
  | 'marksheet_12'
  | 'income_cert'
  | 'caste_cert'
  | 'domicile_cert'
  | 'address_proof'
  | 'bank_passbook'
  | 'photograph'
  | 'other';

export interface DocumentItem {
  id: string;
  type: DocCategory;
  title: string;
  subtitle: string;
  status: 'verified' | 'uploaded' | 'pending' | 'expiring_soon' | 'expired' | 'missing';
  issueDate?: string;
  expiryDate?: string;
  daysUntilExpiry?: number;
  extractedInfo?: Record<string, string>;
  usedInApplicationIds: string[];
  mismatchDetected?: {
    field: string;
    docVal: string;
    profileVal: string;
    note: string;
  };
  fileSize?: string;
  verifiedByAi?: boolean;
}

export type WorkflowStageKey = 
  | 'eligibility'
  | 'documents'
  | 'form'
  | 'review'
  | 'submission'
  | 'verification'
  | 'approval'
  | 'completed';

export type StageStatus = 'completed' | 'current' | 'pending' | 'failed';

export interface ApplicationItem {
  id: string;
  serviceId: string;
  title: string;
  category: 'scholarship' | 'certificate' | 'job' | 'internship' | 'scheme';
  state: string;
  progressPercent: number;
  currentStage: WorkflowStageKey;
  stageStatuses: Record<WorkflowStageKey, StageStatus>;
  statusLabel: string;
  nextAction: string;
  missingDocTypes: DocCategory[];
  requiredDocTypes: DocCategory[];
  submissionRefNo?: string;
  submissionDate?: string;
  isReturnedOrRejected?: boolean;
  rejectionReason?: string;
  bookedSlot?: {
    date: string;
    time: string;
    center: string;
    tokenNo: string;
  };
  demoSandbox: boolean;
}

export interface OpportunityItem {
  id: string;
  title: string;
  category: 'scholarship' | 'job' | 'internship' | 'fellowship' | 'scheme';
  department: string;
  state: string;
  deadline: string;
  daysLeft: number;
  matchScore: number;
  benefit: string;
  whyMatch: {
    criteria: string;
    matched: boolean;
    note: string;
  }[];
  requiredDocs: DocCategory[];
  description: string;
  stipendOrAmount: string;
  eligibleCourses: string[];
}

export interface ConsentRequest {
  id: string;
  title: string;
  description: string;
  actionType: 'read_doc' | 'extract_info' | 'fill_form' | 'upload_doc' | 'book_slot' | 'submit_application';
  targetDocument?: string;
  targetApplication?: string;
  status: 'pending' | 'approved' | 'denied';
  timestamp: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  agentName: string;
  action: string;
  details: string;
  badge: 'auto' | 'user_consented' | 'safety_check';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'urgent' | 'warning' | 'info' | 'success';
  timestamp: string;
  read: boolean;
  actionLabel?: string;
  actionTarget?: string;
}

export interface LifeEvent {
  id: string;
  title: string;
  titleHindi: string;
  icon: string;
  description: string;
  checklist: {
    item: string;
    serviceSlug: string;
    status: 'done' | 'todo';
  }[];
}
