import { UserProfile, FamilyMember, DocumentItem, ApplicationItem, OpportunityItem, LifeEvent, NotificationItem, AuditLogEntry } from '../types';

export const initialUserProfile: UserProfile = {
  id: 'usr_ayush_01',
  name: 'Ayush Kumar',
  dob: '2004-08-15',
  gender: 'Male',
  phone: '+91 98765 43210',
  email: 'ayush.kumar@college.edu.in',
  state: 'Bihar',
  district: 'Patna',
  pincode: '800020',
  aadhaarMasked: 'XXXX-XXXX-4812',
  category: 'OBC',

  // Education
  college: 'Patna Science College',
  university: 'Patna University',
  course: 'B.Sc Computer Science',
  semester: '4th Semester',
  qualification: 'Undergraduate',
  cgpa: '8.4 / 10',
  passingYear: '2026',
  studentIdNo: 'PSC/CS/2022/104',

  // Family & Income
  annualFamilyIncome: 180000, // ₹ 1.8 Lakhs (under ₹2.5L threshold!)
  fatherName: 'Ramesh Kumar',
  motherName: 'Sunita Devi',
  fatherOccupation: 'Small Business / Agriculture',

  // Preferences
  language: 'en',
  voiceAutoSpeak: false,
  isSeniorMode: false,
  activeFamilyMemberId: 'fam_ayush'
};

export const initialFamilyMembers: FamilyMember[] = [
  {
    id: 'fam_ayush',
    name: 'Ayush Kumar',
    relation: 'Self',
    avatar: '👦',
    age: 21,
    aadhaarMasked: 'XXXX-XXXX-4812',
    state: 'Bihar',
    district: 'Patna',
    hasConsentGiven: true
  },
  {
    id: 'fam_ramesh',
    name: 'Ramesh Kumar',
    relation: 'Father',
    avatar: '👨',
    age: 52,
    aadhaarMasked: 'XXXX-XXXX-8921',
    state: 'Bihar',
    district: 'Patna',
    hasConsentGiven: true
  },
  {
    id: 'fam_sunita',
    name: 'Sunita Devi',
    relation: 'Mother',
    avatar: '👩',
    age: 48,
    aadhaarMasked: 'XXXX-XXXX-1934',
    state: 'Bihar',
    district: 'Patna',
    hasConsentGiven: true
  },
  {
    id: 'fam_ramdas',
    name: 'Ramdas Sharma',
    relation: 'Grandfather',
    avatar: '👴',
    age: 74,
    aadhaarMasked: 'XXXX-XXXX-6610',
    state: 'Bihar',
    district: 'Patna',
    hasConsentGiven: true
  }
];

export const initialDocuments: DocumentItem[] = [
  {
    id: 'doc_aadhaar',
    type: 'aadhaar',
    title: 'Aadhaar Card',
    subtitle: 'UIDAI e-Aadhaar Digital Copy',
    status: 'verified',
    issueDate: '2018-05-10',
    extractedInfo: {
      'Full Name': 'Ayush Kumar',
      'Father Name': 'Ramesh Kumar',
      'DOB': '15/08/2004',
      'Gender': 'Male',
      'Aadhaar No': 'XXXX-XXXX-4812',
      'Address': 'Flat 302, Green Enclave, Kankarbagh, Patna, Bihar - 800020'
    },
    usedInApplicationIds: ['app_scholarship', 'app_internship', 'app_caste_cert'],
    fileSize: '1.2 MB',
    verifiedByAi: true
  },
  {
    id: 'doc_college_id',
    type: 'college_id',
    title: 'College Identity Card',
    subtitle: 'Patna Science College (Session 2022-26)',
    status: 'verified',
    issueDate: '2022-09-01',
    expiryDate: '2026-06-30',
    daysUntilExpiry: 620,
    extractedInfo: {
      'Student Name': 'Ayush Kumar',
      'Roll Number': 'PSC/CS/2022/104',
      'Course': 'B.Sc (Hons) Computer Science',
      'College': 'Patna Science College, Patna University',
      'Valid Upto': '30/06/2026'
    },
    usedInApplicationIds: ['app_scholarship', 'app_internship'],
    fileSize: '840 KB',
    verifiedByAi: true
  },
  {
    id: 'doc_marksheet_10',
    type: 'marksheet_10',
    title: '10th Class Marksheet',
    subtitle: 'CBSE Secondary School Examination',
    status: 'verified',
    issueDate: '2020-07-15',
    extractedInfo: {
      'Candidate Name': 'Ayush Kumar',
      'Roll Code / No': '310452',
      'Aggregate Marks': '89.4%',
      'Board': 'CBSE New Delhi',
      'Result': 'PASS'
    },
    usedInApplicationIds: ['app_scholarship', 'app_caste_cert'],
    fileSize: '1.5 MB',
    verifiedByAi: true
  },
  {
    id: 'doc_marksheet_12',
    type: 'marksheet_12',
    title: '12th Class Marksheet',
    subtitle: 'BSEB Senior Secondary (Science Stream)',
    status: 'verified',
    issueDate: '2022-06-18',
    extractedInfo: {
      'Candidate Name': 'Ayush Kumar',
      'Marks': '84.2%',
      'Stream': 'Science (PCM)',
      'Board': 'Bihar School Examination Board',
      'Result': 'PASS 1st Div'
    },
    usedInApplicationIds: ['app_scholarship', 'app_internship'],
    fileSize: '1.4 MB',
    verifiedByAi: true
  },
  {
    id: 'doc_bank_passbook',
    type: 'bank_passbook',
    title: 'Bank Passbook / Statement',
    subtitle: 'State Bank of India (DBT Enabled)',
    status: 'verified',
    issueDate: '2023-01-10',
    extractedInfo: {
      'Account Holder': 'Ayush Kumar',
      'Account No': 'XXXXXX7841',
      'IFSC Code': 'SBIN0003452',
      'Branch': 'Kankarbagh Patna',
      'Aadhaar Seeding / DBT': 'ACTIVE ✓'
    },
    usedInApplicationIds: ['app_scholarship'],
    fileSize: '950 KB',
    verifiedByAi: true
  },
  {
    id: 'doc_photograph',
    type: 'photograph',
    title: 'Passport Size Photograph',
    subtitle: 'Recent Studio Portrait with White Background',
    status: 'verified',
    issueDate: '2024-02-15',
    extractedInfo: {
      'Dimensions': '3.5 x 4.5 cm',
      'Background': 'Plain Off-White',
      'Clarity': 'High (Biometric Grade)'
    },
    usedInApplicationIds: ['app_scholarship', 'app_internship', 'app_caste_cert'],
    fileSize: '320 KB',
    verifiedByAi: true
  },
  {
    id: 'doc_income_cert',
    type: 'income_cert',
    title: 'Annual Income Certificate',
    subtitle: 'Block Revenue Officer (RTPS Bihar)',
    status: 'expiring_soon',
    issueDate: '2023-08-10',
    expiryDate: '2024-08-09',
    daysUntilExpiry: -30, // Expired / outdated demonstration!
    extractedInfo: {
      'Issued To': 'Ayush Kumar',
      'Guardian': 'Ramesh Kumar',
      'Total Annual Income': '₹ 1,80,000/-',
      'Office': 'Sadar Circle, Patna',
      'Certificate No': 'IN/BR/2023/84912',
      'Status': 'Expired (Older than 1 Year)'
    },
    usedInApplicationIds: ['app_scholarship', 'app_fee_reimbursement', 'app_credit_card'],
    mismatchDetected: {
      field: 'Validity Period',
      docVal: 'Issued 2023-08-10 (Expired)',
      profileVal: 'Academic Year 2026-27 requires FY 2025-26 certificate',
      note: 'Current scholarship portals strictly require income certificate issued within the last 6 months.'
    },
    fileSize: '1.1 MB',
    verifiedByAi: true
  }
];

export const initialApplications: ApplicationItem[] = [
  {
    id: 'app_scholarship',
    serviceId: 'srv_post_matric_scholarship',
    title: 'Post-Matric Scholarship (Bihar PMS Portal)',
    category: 'scholarship',
    state: 'Bihar',
    progressPercent: 75,
    currentStage: 'documents',
    stageStatuses: {
      eligibility: 'completed',
      documents: 'current',
      form: 'pending',
      review: 'pending',
      submission: 'pending',
      verification: 'pending',
      approval: 'pending',
      completed: 'pending'
    },
    statusLabel: '75% Ready (Action Required)',
    nextAction: 'Fresh Income Certificate required to finalize submission',
    missingDocTypes: ['income_cert'],
    requiredDocTypes: ['aadhaar', 'college_id', 'marksheet_12', 'bank_passbook', 'income_cert', 'photograph'],
    demoSandbox: true
  },
  {
    id: 'app_income_cert',
    serviceId: 'srv_income_certificate',
    title: 'Income Certificate (RTPS Portal)',
    category: 'certificate',
    state: 'Bihar',
    progressPercent: 60,
    currentStage: 'verification',
    stageStatuses: {
      eligibility: 'completed',
      documents: 'completed',
      form: 'completed',
      review: 'completed',
      submission: 'completed',
      verification: 'current',
      approval: 'pending',
      completed: 'pending'
    },
    statusLabel: 'Application Submitted — Under Verification',
    nextAction: 'Wait for Revenue Officer digital signature (Estimated 48 hrs)',
    missingDocTypes: [],
    requiredDocTypes: ['aadhaar', 'address_proof', 'photograph'],
    submissionRefNo: 'RTPS/BR/2026/INC-782194',
    submissionDate: '2026-10-04',
    demoSandbox: true
  },
  {
    id: 'app_internship',
    serviceId: 'srv_pm_internship',
    title: 'PM National Internship Scheme (GoI)',
    category: 'internship',
    state: 'Central',
    progressPercent: 85,
    currentStage: 'approval',
    stageStatuses: {
      eligibility: 'completed',
      documents: 'completed',
      form: 'completed',
      review: 'completed',
      submission: 'completed',
      verification: 'completed',
      approval: 'current',
      completed: 'pending'
    },
    statusLabel: 'Department Review & Shortlisting',
    nextAction: 'Matching with Top 500 corporate partners',
    missingDocTypes: [],
    requiredDocTypes: ['aadhaar', 'college_id', 'marksheet_12', 'photograph'],
    submissionRefNo: 'PMIS/2026/IND-44910',
    submissionDate: '2026-09-28',
    demoSandbox: true
  },
  {
    id: 'app_caste_cert',
    serviceId: 'srv_caste_certificate',
    title: 'OBC Non-Creamy Layer (NCL) Certificate',
    category: 'certificate',
    state: 'Bihar',
    progressPercent: 40,
    currentStage: 'documents',
    stageStatuses: {
      eligibility: 'completed',
      documents: 'current',
      form: 'pending',
      review: 'pending',
      submission: 'pending',
      verification: 'pending',
      approval: 'pending',
      completed: 'pending'
    },
    statusLabel: 'Awaiting Document Upload',
    nextAction: 'Upload Parent Income Proof to verify NCL eligibility',
    missingDocTypes: ['income_cert'],
    requiredDocTypes: ['aadhaar', 'marksheet_10', 'income_cert', 'photograph'],
    demoSandbox: true
  }
];

export const initialOpportunities: OpportunityItem[] = [
  {
    id: 'opp_post_matric_scholarship',
    title: 'Post-Matric Scholarship for College Students (PMS Bihar)',
    category: 'scholarship',
    department: 'Education Dept, Govt of Bihar',
    state: 'Bihar',
    deadline: '2026-10-25',
    daysLeft: 18,
    matchScore: 91,
    benefit: '₹ 25,000 - ₹ 60,000 / year + Full Tuition Reimbursement',
    stipendOrAmount: '₹ 38,000 / yr',
    eligibleCourses: ['B.Sc', 'B.Tech', 'B.Com', 'B.A', 'Diploma'],
    description: 'Financial assistance for underprivileged OBC, SC & ST students pursuing higher undergraduate and professional education.',
    whyMatch: [
      { criteria: 'Student Status', matched: true, note: 'Enrolled in Patna Science College, Patna University' },
      { criteria: 'Age Requirement', matched: true, note: 'Age 21 is within 18-28 eligibility bracket' },
      { criteria: 'State Domicile', matched: true, note: 'Resident of Bihar verified via Aadhaar' },
      { criteria: 'Course Requirement', matched: true, note: 'B.Sc Computer Science is a recognized technical degree' },
      { criteria: 'Income Criteria', matched: true, note: 'Family income ₹ 1.8L is well below ₹ 2.5L limit' }
    ],
    requiredDocs: ['aadhaar', 'college_id', 'marksheet_12', 'bank_passbook', 'income_cert', 'photograph']
  },
  {
    id: 'opp_pm_internship',
    title: 'PM National Internship Scheme (Top 500 Companies)',
    category: 'internship',
    department: 'Ministry of Corporate Affairs, Govt of India',
    state: 'Central',
    deadline: '2026-11-10',
    daysLeft: 34,
    matchScore: 94,
    benefit: '₹ 5,000 monthly stipend + ₹ 6,000 one-time incidentals grant',
    stipendOrAmount: '₹ 5,000 / month',
    eligibleCourses: ['Any Undergraduate / Diploma student in 2nd/3rd/4th year'],
    description: '12-month hands-on industrial internship in India’s leading companies like Tata, Reliance, Infosys, and L&T.',
    whyMatch: [
      { criteria: 'Age (21-24 yrs)', matched: true, note: 'Candidate age is 21' },
      { criteria: 'Family Income (< ₹8L)', matched: true, note: 'Family income ₹ 1.8L satisfies the non-taxpayer criteria' },
      { criteria: 'No Full-Time Job', matched: true, note: 'Full-time college student verified' },
      { criteria: 'College Accreditation', matched: true, note: 'Patna University is UGC recognized' }
    ],
    requiredDocs: ['aadhaar', 'college_id', 'marksheet_12', 'photograph']
  },
  {
    id: 'opp_nsp_central_sector',
    title: 'Central Sector Scheme of Scholarships for College & University',
    category: 'scholarship',
    department: 'Department of Higher Education, MHRD',
    state: 'Central',
    deadline: '2026-11-15',
    daysLeft: 39,
    matchScore: 85,
    benefit: '₹ 12,000 per annum for Undergraduate Degree level',
    stipendOrAmount: '₹ 12,000 / yr',
    eligibleCourses: ['Undergraduate Degree Courses'],
    description: 'Awarded to top 20th percentile students who scored above 80% in Class 12 board exams.',
    whyMatch: [
      { criteria: 'Class 12 Score (> 80%)', matched: true, note: '12th score is 84.2% ✓' },
      { criteria: 'Parental Income (< ₹4.5L)', matched: true, note: 'Income is ₹ 1.8L ✓' },
      { criteria: 'Regular Student', matched: true, note: 'Patna Science College regular degree program ✓' }
    ],
    requiredDocs: ['aadhaar', 'college_id', 'marksheet_12', 'income_cert', 'bank_passbook']
  },
  {
    id: 'opp_bihar_credit_card',
    title: 'Bihar Student Credit Card Scheme (MNSSBY)',
    category: 'scheme',
    department: 'Bihar Vikas Mission',
    state: 'Bihar',
    deadline: 'Open Year-Round',
    daysLeft: 120,
    matchScore: 92,
    benefit: 'Up to ₹ 4 Lakh education loan at 1% interest (0% for girls/PWD)',
    stipendOrAmount: 'Up to ₹ 4,00,000',
    eligibleCourses: ['B.Tech', 'B.Sc', 'BBA', 'BCA', 'Medical'],
    description: 'Government backed soft education loan for tuition fees, books, laptops and hostel expenses.',
    whyMatch: [
      { criteria: 'Bihar Domicile', matched: true, note: 'Verified Bihar resident' },
      { criteria: '12th Passed', matched: true, note: 'Passed 12th from BSEB with 84.2%' },
      { criteria: 'Enrolled in Higher Ed', matched: true, note: 'Currently enrolled in B.Sc CS' }
    ],
    requiredDocs: ['aadhaar', 'college_id', 'marksheet_10', 'marksheet_12', 'address_proof']
  },
  {
    id: 'opp_isro_fellowship',
    title: 'ISRO START Space Science & Tech Fellowship',
    category: 'fellowship',
    department: 'Indian Space Research Organisation (ISRO)',
    state: 'Central',
    deadline: '2026-10-31',
    daysLeft: 24,
    matchScore: 78,
    benefit: 'Free training at ISRO centers + Research grant & certificate',
    stipendOrAmount: 'Full Grant + Travel',
    eligibleCourses: ['B.Sc Physics/CS/Maths, B.Tech'],
    description: 'Introductory level space science training fellowship for science and technology undergrads.',
    whyMatch: [
      { criteria: 'STEM Student', matched: true, note: 'B.Sc Computer Science student' },
      { criteria: 'CGPA (> 7.5)', matched: true, note: 'Current CGPA is 8.4 ✓' }
    ],
    requiredDocs: ['college_id', 'marksheet_12', 'photograph']
  }
];

export const initialLifeEvents: LifeEvent[] = [
  {
    id: 'event_college',
    title: 'Starting College',
    titleHindi: 'कॉलेज में दाखिला',
    icon: '🎓',
    description: 'New college admission checklist for scholarships, hostels, and student bus pass.',
    checklist: [
      { item: 'Get College ID Card & Bonafide Certificate', serviceSlug: 'college_id', status: 'done' },
      { item: 'Link Aadhaar with Bank Account (DBT Seeding)', serviceSlug: 'bank_dbt', status: 'done' },
      { item: 'Apply for Post-Matric Scholarship (Save up to ₹60K)', serviceSlug: 'post_matric', status: 'todo' },
      { item: 'Check Bihar Student Credit Card for laptop loan', serviceSlug: 'credit_card', status: 'todo' }
    ]
  },
  {
    id: 'event_job',
    title: 'Starting Job / Internship',
    titleHindi: 'नौकरी या इंटर्नशिप की शुरुआत',
    icon: '💼',
    description: 'Essential compliance checklist before joining your first employment or internship.',
    checklist: [
      { item: 'Obtain PAN Card & verify Aadhaar linkage', serviceSlug: 'pan_card', status: 'done' },
      { item: 'Generate Character / Police Verification Certificate', serviceSlug: 'police_verification', status: 'todo' },
      { item: 'Register on PM National Internship Portal', serviceSlug: 'pm_internship', status: 'done' },
      { item: 'Open EPFO UAN Portal Account', serviceSlug: 'epfo_uan', status: 'todo' }
    ]
  },
  {
    id: 'event_migration',
    title: 'Moving to Another State',
    titleHindi: 'दूसरे राज्य में शिफ्ट होना',
    icon: '🏠',
    description: 'Documents required when moving for study, job or relocation.',
    checklist: [
      { item: 'Update Address Proof in Aadhaar Card online', serviceSlug: 'aadhaar_address', status: 'todo' },
      { item: 'Apply for One Nation One Ration Card portability', serviceSlug: 'ration_card', status: 'todo' },
      { item: 'Transfer Vehicle Registration / State NOC', serviceSlug: 'vahan_noc', status: 'todo' },
      { item: 'Apply for Central Domicile Certificate', serviceSlug: 'domicile', status: 'done' }
    ]
  },
  {
    id: 'event_senior',
    title: 'Senior Citizen Care & Retirement',
    titleHindi: 'वरिष्ठ नागरिक पेंशन व सेवाएँ',
    icon: '👴',
    description: 'Dedicated schemes, life certificate submission (Jeevan Pramaan) and healthcare.',
    checklist: [
      { item: 'Submit Digital Life Certificate (Jeevan Pramaan)', serviceSlug: 'jeevan_pramaan', status: 'done' },
      { item: 'Ayushman Bharat Senior Golden Card (₹5 Lakh free health cover)', serviceSlug: 'ayushman_card', status: 'todo' },
      { item: 'Old Age Pension Application (Indira Gandhi Scheme)', serviceSlug: 'old_age_pension', status: 'todo' },
      { item: 'Senior Citizen Concession Card', serviceSlug: 'senior_card', status: 'done' }
    ]
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'Scholarship Deadline Approaching',
    message: 'Post-Matric Scholarship portal closes in 18 days. Income certificate needs update.',
    type: 'urgent',
    timestamp: '10 mins ago',
    read: false,
    actionLabel: 'Fix Document',
    actionTarget: 'documents'
  },
  {
    id: 'notif_2',
    title: 'Income Certificate Outdated',
    message: 'Your Income certificate expired 30 days ago. 3 active applications require an updated copy.',
    type: 'warning',
    timestamp: '2 hours ago',
    read: false,
    actionLabel: 'Renew Now',
    actionTarget: 'documents'
  },
  {
    id: 'notif_3',
    title: 'PM Internship Status Updated',
    message: 'Your application has progressed to Department Review & Partner Matching (85% Complete).',
    type: 'info',
    timestamp: 'Yesterday',
    read: true,
    actionLabel: 'View Tracker',
    actionTarget: 'applications'
  }
];

export const initialAuditLogs: AuditLogEntry[] = [
  {
    id: 'aud_1',
    timestamp: '10:31 AM',
    agentName: 'Document Agent',
    action: 'Read Aadhaar Card',
    details: 'Verified identity and extracted UIDAI biometric details with zero raw storage',
    badge: 'auto'
  },
  {
    id: 'aud_2',
    timestamp: '10:32 AM',
    agentName: 'OCR Intelligence',
    action: 'Extracted College ID Data',
    details: 'Matched Patna Science College credentials with user profile (100% Match)',
    badge: 'auto'
  },
  {
    id: 'aud_3',
    timestamp: '10:33 AM',
    agentName: 'Form Agent',
    action: 'Pre-filled Scholarship Draft',
    details: 'Reused previously verified education data without repeated user questioning',
    badge: 'auto'
  },
  {
    id: 'aud_4',
    timestamp: '10:34 AM',
    agentName: 'Consent & Safety Layer',
    action: 'Requested Upload Permission',
    details: 'Prompted citizen authorization before transmitting documents to mock portal',
    badge: 'user_consented'
  },
  {
    id: 'aud_5',
    timestamp: '10:35 AM',
    agentName: 'Security Orchestrator',
    action: 'User Approved Action',
    details: 'Citizen Ayush Kumar granted one-time consent for submission',
    badge: 'user_consented'
  }
];
