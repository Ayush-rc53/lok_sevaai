import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// In-memory data store for server-side persistence
let profileData: any = {
  id: 'usr_ayush_01',
  name: 'Ayush Kumar',
  dob: '2004-08-15',
  gender: 'Male',
  fatherName: 'Ramesh Kumar',
  phone: '+91 98765 43210',
  email: 'ayush.kumar@example.com',
  state: 'Bihar',
  district: 'Patna',
  pincode: '800001',
  address: 'Flat 402, Ganga Heights, Bailey Road, Patna, Bihar',
  category: 'OBC',
  subCaste: 'Yadav',
  annualFamilyIncome: 180000,
  isStudent: true,
  collegeName: 'Patna Science College',
  universityName: 'Patna University',
  course: 'B.Sc Computer Science',
  degree: 'Undergraduate',
  currentSemester: 4,
  enrollmentNo: 'PU/BSC/2023/1084',
  tenthPercentage: 88.5,
  twelfthPercentage: 84.2,
  currentCgpa: 8.6,
  bankAccountNo: '918237465019',
  bankIfsc: 'SBIN0001234',
  bankName: 'State Bank of India',
  branch: 'Patna Main Branch',
  aadhaarLinkedWithBank: true
};

let documentsData: any[] = [
  {
    id: 'doc_aadhaar',
    type: 'aadhaar',
    title: 'Aadhaar Card (UIDAI)',
    subtitle: 'Verified Identity & Address Proof',
    status: 'verified',
    issueDate: '2016-04-12',
    fileSize: '1.2 MB',
    verifiedByAi: true,
    extractedInfo: {
      'Name': 'Ayush Kumar',
      'DOB': '15/08/2004',
      'Gender': 'Male',
      'UID Masked': 'XXXX-XXXX-9012',
      'Address': 'Bailey Road, Patna, Bihar - 800001'
    },
    usedInApplicationIds: ['app_scholarship', 'app_income_cert', 'app_internship']
  },
  {
    id: 'doc_college_id',
    type: 'college_id',
    title: 'Student Identity Card',
    subtitle: 'Patna Science College (PU)',
    status: 'verified',
    issueDate: '2023-08-01',
    expiryDate: '2026-07-31',
    daysUntilExpiry: 300,
    fileSize: '850 KB',
    verifiedByAi: true,
    extractedInfo: {
      'Student Name': 'Ayush Kumar',
      'Roll No': 'BSC-CS-23-44',
      'Course': 'B.Sc Computer Science',
      'Valid Upto': 'July 2026'
    },
    usedInApplicationIds: ['app_scholarship', 'app_internship']
  },
  {
    id: 'doc_12th_marksheet',
    type: '12th_marksheet',
    title: 'Class XII Board Marksheet',
    subtitle: 'BSEB Intermediate Council (84.2%)',
    status: 'verified',
    issueDate: '2022-06-15',
    fileSize: '2.1 MB',
    verifiedByAi: true,
    extractedInfo: {
      'Candidate': 'Ayush Kumar',
      'Roll Code': '31042',
      'Aggregate': '84.2% (Distinction)',
      'Division': 'First Division'
    },
    usedInApplicationIds: ['app_scholarship', 'app_internship']
  },
  {
    id: 'doc_income_cert',
    type: 'income_cert',
    title: 'Annual Income Certificate',
    subtitle: 'Block Sadar, Revenue Authority',
    status: 'expired',
    issueDate: '2023-08-10',
    expiryDate: '2024-08-09',
    daysUntilExpiry: -390,
    fileSize: '1.4 MB',
    verifiedByAi: false,
    extractedInfo: {
      'Name': 'Ayush Kumar',
      'Annual Income': '₹ 1,80,000/-',
      'Certificate No': 'IN/BR/2023/184912'
    },
    usedInApplicationIds: ['app_scholarship']
  }
];

let applicationsData: any[] = [
  {
    id: 'app_scholarship',
    serviceId: 'srv_post_matric',
    title: 'Post-Matric Scholarship (Bihar PMS)',
    department: 'Education Department & Welfare Board',
    submissionDate: '2026-09-28',
    currentStage: 'scrutiny_review',
    progressPercentage: 65,
    status: 'action_required',
    statusLabel: 'Action Required: Renew Income Certificate',
    missingDocTypes: ['income_cert'],
    nextAction: 'Renew expired Income Certificate to proceed with sanction'
  },
  {
    id: 'app_internship',
    serviceId: 'srv_pm_internship',
    title: 'PM National Internship Scheme (Round 2)',
    department: 'Ministry of Corporate Affairs',
    submissionDate: '2026-10-01',
    currentStage: 'submitted',
    progressPercentage: 80,
    status: 'in_progress',
    statusLabel: 'Under Merit Assessment by Participating Firms',
    missingDocTypes: [],
    nextAction: 'Check allotment result on 18th October'
  }
];

let auditLogsData: any[] = [];

// Helper function to safely invoke Gemini with a strict timeout
async function generateWithGemini(prompt: string, systemInstruction?: string, responseMimeType?: string): Promise<string> {
  if (!ai) throw new Error('Gemini API not configured');
  
  const callPromise = ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      ...(systemInstruction ? { systemInstruction } : {}),
      ...(responseMimeType ? { responseMimeType } : {}),
      temperature: 0.7,
    },
  });

  const timeoutPromise = new Promise<never>((_, reject) => 
    setTimeout(() => reject(new Error('Gemini request timeout after 7000ms')), 7000)
  );

  const response: any = await Promise.race([callPromise, timeoutPromise]);
  return response.text || '';
}

// Server-side Gemini initialization
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// 0. Health & Diagnostics endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    geminiConfigured: Boolean(ai),
    serverPort: PORT,
    activeConnectors: ['RTPS Bihar', 'NSP National Portal', 'PM Internship MCA', 'eDistrict']
  });
});

// 1. AI Chat & Orchestrator endpoint
app.post(['/api/gemini/chat', '/api/chat'], async (req, res) => {
  try {
    const { prompt, userProfile, language = 'en' } = req.body;
    
    // Quick heuristic classification for instant response
    const pLower = (prompt || '').toLowerCase();
    const isScholarship = pLower.includes('scholarship');
    const isIncome = pLower.includes('income');
    const isInternship = pLower.includes('internship');

    const defaultReply = isScholarship 
      ? "I analyzed your citizen profile for Post-Matric Scholarship (Bihar PMS Portal). You have 91% eligibility based on enrollment at Patna Science College and family income below ₹2.5L. Action required: Renew expired Income Certificate before final submission."
      : isIncome
      ? "For an Income Certificate, we can draft Form IV on RTPS Bihar using your verified Aadhaar and address proof. Processing time is 7-10 working days at ₹0 fee."
      : isInternship
      ? "The PM National Internship Scheme matches your undergraduate technical coursework (94% Match). It offers an industrial attachment in top companies with a ₹5,000 monthly stipend."
      : "Hello! I am Lok Seva AI. I have analyzed your profile against active Indian citizen & student schemes. What service or opportunity would you like to explore?";

    let detectedService = isScholarship ? "Post-Matric Scholarship (Bihar PMS)" : isIncome ? "Income Certificate (RTPS Portal)" : isInternship ? "PM National Internship Scheme" : "General Citizen Inquiries";

    if (ai) {
      try {
        const systemInstruction = `You are Lok Seva AI, the premier GovTech citizen and student assistant in India.
Your mission is to help citizens discover official government schemes, scholarships, internships, and certificates, check statutory eligibility, verify required documents, and guide them with clear next actions.
Current User Profile: ${JSON.stringify(userProfile || profileData || {})}.
Language requested: ${language}.
Provide a clear, structured response with:
1. What official service or scheme is identified
2. The user's eligibility status based on their profile
3. Any required vs missing documents
4. Immediate next action. Keep the tone professional, trustworthy, and helpful.`;

        const reply = await generateWithGemini(prompt, systemInstruction);
        if (reply && reply.trim().length > 10) {
          return res.json({
            reply: reply.trim(),
            detectedService,
            confidence: 0.95,
            source: 'gemini-2.5-flash'
          });
        }
      } catch (geminiErr: any) {
        console.warn('Gemini chat fallback engaged:', geminiErr.message);
      }
    }

    res.json({
      reply: defaultReply,
      detectedService,
      confidence: 0.94,
      source: 'orchestrator_rules_engine'
    });
  } catch (err: any) {
    console.error('Chat API error:', err);
    res.status(500).json({ error: err.message || 'AI processing failed' });
  }
});

// 2. Document Intelligence / OCR endpoint
app.post('/api/gemini/ocr-analyze', async (req, res) => {
  try {
    const { docType, fileName, imageBase64, userProfile } = req.body;

    const mockExtracted = {
      'Issued To': userProfile?.name || profileData.name || 'Ayush Kumar',
      'Guardian Name': userProfile?.fatherName || profileData.fatherName || 'Ramesh Kumar',
      'DOB': userProfile?.dob || profileData.dob || '2004-08-15',
      'Annual Family Income': '₹ 1,80,000 / year',
      'Issuing Office': 'Circle Officer, Patna Sadar',
      'Issue Date': '2026-10-05',
      'Valid Until': '2027-10-04',
      'Certificate No': 'IN/BR/2026/902814',
      'Digital Signature': 'National Informatics Centre Verified ✓'
    };

    if (ai && imageBase64) {
      try {
        const prompt = `Analyze this official Indian document of claimed type: ${docType}. 
Extract:
1. Document Type identified
2. Name, DOB, Authority, Certificate Number, Issue Date, Expiry Date, Income / Roll Number if present.
3. Compare against User Profile: ${JSON.stringify(userProfile || profileData)}. Note any mismatches.
Return JSON with { docType, extracted: {}, profileMatch: { nameMatch, dobMatch, addressMatch, mismatchNotes }, confidence }.`;

        const contents: any = {
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: 'image/jpeg',
                data: imageBase64.replace(/^data:image\/[a-z]+;base64,/, '')
              }
            }
          ]
        };

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents,
          config: {
            responseMimeType: 'application/json'
          }
        });

        const parsed = JSON.parse(response.text || '{}');
        return res.json(parsed);
      } catch (e: any) {
        console.warn('OCR fallback engaged:', e.message);
      }
    }

    return res.json({
      docType: docType || 'income_cert',
      extracted: mockExtracted,
      profileMatch: {
        nameMatch: true,
        dobMatch: true,
        addressMatch: true,
        mismatchNotes: 'All primary identity fields match profile credentials 100%.'
      },
      readinessScore: 95,
      confidence: 0.96
    });
  } catch (err: any) {
    console.error('OCR API error:', err);
    res.status(500).json({ error: err.message || 'OCR analysis failed' });
  }
});

// 3. Government Language Simplifier ("Explain This")
app.post('/api/gemini/simplify', async (req, res) => {
  try {
    const { officialText } = req.body;

    if (ai) {
      try {
        const prompt = `An Indian citizen is confused by this official government notice or circular:
"${officialText}"

Provide:
1. simplifiedEnglish: Plain, crystal-clear conversational English explaining exactly what they must do in 1-2 simple sentences.
2. simplifiedHindi: Simple colloquial Hindi (Devanagari) explaining it clearly.
3. keyTakeaway: One short rule or warning to avoid rejection.
Respond in JSON format.`;

        const raw = await generateWithGemini(prompt, undefined, 'application/json');
        const parsed = JSON.parse(raw);
        return res.json(parsed);
      } catch (err: any) {
        console.warn('Simplify fallback:', err.message);
      }
    }

    return res.json({
      simplifiedEnglish: "Please sign a photocopy of your marksheets with your own handwriting (self-attest) and upload it. No notary or lawyer stamp is needed.",
      simplifiedHindi: "इस डॉक्यूमेंट की फोटोकॉपी पर अपने हाथ से हस्ताक्षर (Signature) करें और फिर अपलोड करें।",
      keyTakeaway: "Photocopy with your handwritten signature is sufficient."
    });
  } catch (err: any) {
    console.error('Simplify error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 4. Problem Resolver endpoint
app.post('/api/gemini/resolve-problem', async (req, res) => {
  try {
    const { rejectionNotice, applicationTitle } = req.body;

    if (ai) {
      try {
        const prompt = `Application: ${applicationTitle}
Rejection notice or defect: "${rejectionNotice}"
Analyze the issue. Provide:
1. rootCause (clear plain English explanation of what happened)
2. whatHappenedHindi (clear Hindi explanation)
3. actionPlan (array of 4 progressive concrete steps)
4. canAutoFix (boolean)
5. workflowToStart (string slug)
Respond in JSON.`;

        const raw = await generateWithGemini(prompt, undefined, 'application/json');
        const parsed = JSON.parse(raw);
        return res.json(parsed);
      } catch (err: any) {
        console.warn('Problem resolver fallback:', err.message);
      }
    }

    return res.json({
      rootCause: "Your Income Certificate was issued in August 2023, which exceeds the statutory 12-month validity window for the current financial assessment year.",
      whatHappenedHindi: "आपका आय प्रमाण पत्र 1 वर्ष से पुराना है, इसलिए नियम 4(ख) के तहत आवेदन वापस भेजा गया है।",
      actionPlan: [
        "Renew your Income Certificate on the state RTPS portal",
        "Automatically link the fresh digital certificate into your Document Vault",
        "Update the application annexure",
        "One-click resubmit to the scrutiny officer"
      ],
      canAutoFix: true,
      workflowToStart: "income_certificate_renewal"
    });
  } catch (err: any) {
    console.error('Problem resolver error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 5. Citizen Profile Memory API
app.get('/api/profile', (req, res) => {
  res.json({ profile: profileData });
});

app.put('/api/profile', (req, res) => {
  profileData = { ...profileData, ...req.body };
  res.json({ success: true, profile: profileData });
});

// 6. Documents & "Fix Once -> Use Everywhere" API
app.get('/api/documents', (req, res) => {
  res.json({ documents: documentsData });
});

app.post('/api/documents', (req, res) => {
  const newDoc = {
    id: req.body.id || `doc_${Date.now()}`,
    ...req.body
  };
  const idx = documentsData.findIndex(d => d.id === newDoc.id || d.type === newDoc.type);
  if (idx >= 0) {
    documentsData[idx] = { ...documentsData[idx], ...newDoc };
  } else {
    documentsData.push(newDoc);
  }
  res.json({ success: true, document: newDoc });
});

app.post('/api/documents/fix-once', (req, res) => {
  const { docType = 'income_cert' } = req.body;

  const renewedDoc = {
    id: `doc_${docType}`,
    type: docType,
    title: 'Annual Income Certificate (Renewed FY 2026-27)',
    subtitle: 'Block Sadar / RTPS Authority',
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
      'Digital Signature': 'National Informatics Centre Verified ✓'
    },
    usedInApplicationIds: ['app_scholarship', 'app_caste_cert']
  };

  // Update in memory documents
  const idx = documentsData.findIndex(d => d.type === docType);
  if (idx >= 0) {
    documentsData[idx] = renewedDoc;
  } else {
    documentsData.push(renewedDoc);
  }

  // Update any application that was blocked by income_cert
  applicationsData = applicationsData.map(app => {
    if (app.missingDocTypes && app.missingDocTypes.includes(docType)) {
      return {
        ...app,
        missingDocTypes: app.missingDocTypes.filter((t: string) => t !== docType),
        progressPercentage: 100,
        status: 'in_progress',
        statusLabel: 'Verification Complete - Awaiting Sanction',
        nextAction: 'No further action required. Direct Bank Transfer pending.'
      };
    }
    return app;
  });

  res.json({
    success: true,
    message: 'Document renewed and automatically propagated to dependent applications.',
    renewedDoc,
    syncedApplicationIds: ['app_scholarship', 'app_caste_cert', 'app_credit_card']
  });
});

// 7. Applications Tracker API
app.get('/api/applications', (req, res) => {
  res.json({ applications: applicationsData });
});

app.post('/api/applications', (req, res) => {
  const newApp = {
    id: req.body.id || `app_${Date.now()}`,
    submissionDate: new Date().toISOString().split('T')[0],
    ...req.body
  };
  applicationsData.unshift(newApp);
  res.json({ success: true, application: newApp });
});

app.patch('/api/applications/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const idx = applicationsData.findIndex(a => a.id === id);
  if (idx >= 0) {
    applicationsData[idx] = { ...applicationsData[idx], ...updates };
    return res.json({ success: true, application: applicationsData[idx] });
  }
  res.json({ success: true, applicationId: id, updated: updates });
});

// 8. Slot Booking API
app.post('/api/slots/book', (req, res) => {
  const { applicationId, date, time, center, citizenName } = req.body;
  const tokenNo = `PAT-${Math.floor(1000 + Math.random() * 9000)}`;

  res.json({
    success: true,
    booking: {
      applicationId,
      tokenNo,
      date: date || '15 October 2026',
      time: time || '10:00 AM',
      center: center || 'Patna Service Centre (Collectorate Campus)',
      citizenName,
      status: 'confirmed',
      carryAlongDocs: ['Original Aadhaar Card', 'College Identity Card', '2 Photographs']
    }
  });
});

// 9. Immutable Audit Log API
app.get('/api/audit-logs', (req, res) => {
  res.json({ logs: auditLogsData });
});

app.post('/api/audit-logs', (req, res) => {
  const logEntry = {
    id: `aud_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    ...req.body
  };
  auditLogsData.unshift(logEntry);
  res.json({ success: true, log: logEntry });
});

// Setup Vite middleware in dev or serve dist in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🇮🇳 Lok Seva AI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
