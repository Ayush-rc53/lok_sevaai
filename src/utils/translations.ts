import { LanguageCode } from '../types';

export interface TranslationDict {
  tagline: string;
  greetingMorning: string;
  greetingAfternoon: string;
  greetingEvening: string;
  searchPlaceholder: string;
  mainAiInputPlaceholder: string;
  voiceListening: string;
  actionRequiredTitle: string;
  actionRequiredDesc: string;
  opportunitiesTitle: string;
  opportunitiesDesc: string;
  navDashboard: string;
  navServices: string;
  navOpportunities: string;
  navDocuments: string;
  navApplications: string;
  navAgentMode: string;
  navConsent: string;
  navProfile: string;
  seniorModeToggle: string;
  familyProfile: string;
  fixOnceUseEverywhere: string;
  fixNow: string;
  viewDetails: string;
  checkEligibility: string;
  applyWithAi: string;
  whatDoINeed: string;
  explainThis: string;
  rejectionSolver: string;
  sandboxNotice: string;
}

export const translations: Record<LanguageCode, TranslationDict> = {
  hi: {
    tagline: 'सरकारी सेवा, अब AI के साथ।',
    greetingMorning: 'शुभ प्रभात 👋',
    greetingAfternoon: 'शुभ दोपहर 👋',
    greetingEvening: 'शुभ संध्या 👋',
    searchPlaceholder: 'सेवाएं, छात्रवृत्ति, दस्तावेज़ या योजनाएं खोजें...',
    mainAiInputPlaceholder: 'लोक सेवा AI को बताएं आपको क्या चाहिए... (उदा. "मुझे स्कॉलरशिप चाहिए")',
    voiceListening: 'सुन रहा हूँ... बोलिए',
    actionRequiredTitle: 'तत्काल कार्रवाई आवश्यक',
    actionRequiredDesc: '3 आवेदनों में आपकी त्वरित कार्रवाई की आवश्यकता है।',
    opportunitiesTitle: 'आपके लिए छात्रवृत्ति व योजनाएं',
    opportunitiesDesc: 'आपकी शिक्षा और योग्यता के अनुसार AI-अनुशंसित अवसर',
    navDashboard: 'होम डैशबोर्ड',
    navServices: 'सेवा नेविगेटर',
    navOpportunities: 'छात्र अवसर',
    navDocuments: 'दस्तावेज़ वॉलेट',
    navApplications: 'मेरे आवेदन',
    navAgentMode: 'एजेंट मोड',
    navConsent: 'सहमति केंद्र',
    navProfile: 'मेरी प्रोफाइल',
    seniorModeToggle: 'वरिष्ठ नागरिक मोड',
    familyProfile: 'परिवार प्रोफाइल',
    fixOnceUseEverywhere: 'एक बार सुधारें → हर जगह उपयोग करें',
    fixNow: 'अभी सुधारें',
    viewDetails: 'विवरण देखें',
    checkEligibility: 'पात्रता जांचें',
    applyWithAi: 'AI से आवेदन करें',
    whatDoINeed: 'मुझे क्या चाहिए?',
    explainThis: 'सरकारी भाषा सरल करें',
    rejectionSolver: 'अस्वीकृति समाधान',
    sandboxNotice: 'सुरक्षित डेमो व सैंडबॉक्स वातावरण'
  },
  en: {
    tagline: 'Sarkari Seva, Ab AI Ke Saath.',
    greetingMorning: 'Good Morning 👋',
    greetingAfternoon: 'Good Afternoon 👋',
    greetingEvening: 'Good Evening 👋',
    searchPlaceholder: 'Search services, scholarships, documents or schemes...',
    mainAiInputPlaceholder: 'Tell Lok Seva AI what you need... (e.g. "I need a scholarship")',
    voiceListening: 'Listening... please speak',
    actionRequiredTitle: 'Action Required',
    actionRequiredDesc: '3 applications require your prompt attention.',
    opportunitiesTitle: 'Opportunities For You',
    opportunitiesDesc: 'AI-matched scholarships, jobs and schemes tailored to your profile',
    navDashboard: 'Dashboard',
    navServices: 'Service Navigator',
    navOpportunities: 'Opportunities',
    navDocuments: 'Document Wallet',
    navApplications: 'My Applications',
    navAgentMode: 'Agent Mode',
    navConsent: 'Consent Center',
    navProfile: 'My Profile',
    seniorModeToggle: 'Senior Citizen Mode',
    familyProfile: 'Family Profiles',
    fixOnceUseEverywhere: 'Fix Once → Use Everywhere',
    fixNow: 'Fix Now',
    viewDetails: 'View Details',
    checkEligibility: 'Check Eligibility',
    applyWithAi: 'Apply with Lok Seva AI',
    whatDoINeed: 'What Do I Need?',
    explainThis: 'Explain This (Simplifier)',
    rejectionSolver: 'Resolve Problem',
    sandboxNotice: 'Certified Sandbox Demo Environment'
  },
  bn: {
    tagline: 'সরকারি সেবা, এখন এআই-এর সাথে।',
    greetingMorning: 'সুপ্রভাত 👋',
    greetingAfternoon: 'শুভ অপরাহ্ন 👋',
    greetingEvening: 'শুভ সন্ধ্যা 👋',
    searchPlaceholder: 'পরিষেবা, স্কলারশিপ বা নথি অনুসন্ধান করুন...',
    mainAiInputPlaceholder: 'লোক সেবা এআই-কে বলুন আপনার কি প্রয়োজন...',
    voiceListening: 'শুনছি... বলুন',
    actionRequiredTitle: 'পদক্ষেপ প্রয়োজন',
    actionRequiredDesc: '৩টি আবেদনের জন্য আপনার মনোযোগ প্রয়োজন।',
    opportunitiesTitle: 'আপনার জন্য সুযোগ',
    opportunitiesDesc: 'আপনার প্রোফাইলের সাথে মিলে যাওয়া স্কলারশিপ ও প্রকল্প',
    navDashboard: 'ড্যাশবোর্ড',
    navServices: 'পরিষেবা সন্ধান',
    navOpportunities: 'শিক্ষার্থী সুযোগ',
    navDocuments: 'নথি ওয়ালেট',
    navApplications: 'আমার আবেদন',
    navAgentMode: 'এজেন্ট মোড',
    navConsent: 'সম্মতি কেন্দ্র',
    navProfile: 'প্রোফাইল',
    seniorModeToggle: 'প্রবীণ নাগরিক মোড',
    familyProfile: 'পারিবারিক প্রোফাইল',
    fixOnceUseEverywhere: 'একবার ঠিক করুন → সর্বত্র ব্যবহার করুন',
    fixNow: 'এখনই ঠিক করুন',
    viewDetails: 'বিস্তারিত দেখুন',
    checkEligibility: 'যোগ্যতা যাচাই',
    applyWithAi: 'এআই দিয়ে আবেদন করুন',
    whatDoINeed: 'আমার কি প্রয়োজন?',
    explainThis: 'সরল ব্যাখ্যা',
    rejectionSolver: 'সমস্যা সমাধান',
    sandboxNotice: 'ডেমো স্যান্ডবক্স পরিবেশ'
  },
  mr: {
    tagline: 'सरकारी सेवा, आता AI सोबत.',
    greetingMorning: 'शुभ सकाळ 👋',
    greetingAfternoon: 'शुभ दुपार 👋',
    greetingEvening: 'शुभ संध्याकाळ 👋',
    searchPlaceholder: 'योजना, शिष्यवृत्ती किंवा कागदपत्रे शोधा...',
    mainAiInputPlaceholder: 'लोक सेवा AI ला सांगा तुम्हाला काय हवे आहे...',
    voiceListening: 'ऐकत आहे... बोला',
    actionRequiredTitle: 'तातडीची कृती आवश्यक',
    actionRequiredDesc: '३ अर्जांवर तुमच्या लक्ष देण्याची गरज आहे.',
    opportunitiesTitle: 'तुमच्यासाठी संधी',
    opportunitiesDesc: 'तुमच्या शैक्षणिक पात्रतेनुसार AI शिफारसी',
    navDashboard: 'डॅशबोर्ड',
    navServices: 'सेवा शोधक',
    navOpportunities: 'विद्यार्थी संधी',
    navDocuments: 'कागदपत्र वॉलेट',
    navApplications: 'माझे अर्ज',
    navAgentMode: 'एजंट मोड',
    navConsent: 'संमती केंद्र',
    navProfile: 'माझे प्रोफाईल',
    seniorModeToggle: 'ज्येष्ठ नागरिक मोड',
    familyProfile: 'कुटुंब प्रोफाईल',
    fixOnceUseEverywhere: 'एकदा दुरुस्त करा → सर्वत्र वापरा',
    fixNow: 'आता दुरुस्त करा',
    viewDetails: 'तपशील पहा',
    checkEligibility: 'पात्रता तपासा',
    applyWithAi: 'AI सह अर्ज करा',
    whatDoINeed: 'मला काय आवश्यक आहे?',
    explainThis: 'सोप्या भाषेत समजावून सांगा',
    rejectionSolver: 'समस्या निवारण',
    sandboxNotice: 'डेमो सँडबॉक्स प्रणाली'
  },
  ta: {
    tagline: 'அரசு சேவை, இனி AI உடன்.',
    greetingMorning: 'காலை வணக்கம் 👋',
    greetingAfternoon: 'மதிய வணக்கம் 👋',
    greetingEvening: 'மாலை வணக்கம் 👋',
    searchPlaceholder: 'சேவைகள், உதவித்தொகை, ஆவணங்களைத் தேடுங்கள்...',
    mainAiInputPlaceholder: 'லோக் சேவா AI இடம் உங்கள் தேவையை கூறுங்கள்...',
    voiceListening: 'கேட்கிறது... பேசுங்கள்',
    actionRequiredTitle: 'நடவடிக்கை தேவை',
    actionRequiredDesc: '3 விண்ணப்பங்களுக்கு உங்கள் கவனம் தேவை.',
    opportunitiesTitle: 'உங்களுக்கான வாய்ப்புகள்',
    opportunitiesDesc: 'உங்களுக்கான கல்வி உதவித்தொகை மற்றும் அரசு திட்டங்கள்',
    navDashboard: 'முகப்பு பலகை',
    navServices: 'சேவை வழிகாட்டி',
    navOpportunities: 'மாணவர் வாய்ப்புகள்',
    navDocuments: 'ஆவண பணப்பை',
    navApplications: 'என் விண்ணப்பங்கள்',
    navAgentMode: 'ஏஜென்ட் முறை',
    navConsent: 'அனுமதி மையம்',
    navProfile: 'சுயவிவரம்',
    seniorModeToggle: 'மூத்த குடிமக்கள் முறை',
    familyProfile: 'குடும்ப விவரம்',
    fixOnceUseEverywhere: 'ஒருமுறை சரிசெய் → எங்கும் பயன்படுத்து',
    fixNow: 'இப்போதே சரிசெய்க',
    viewDetails: 'விவரம் பார்க்க',
    checkEligibility: 'தகுதியை சரிபார்க்க',
    applyWithAi: 'AI மூலம் விண்ணப்பிக்க',
    whatDoINeed: 'எனக்கு என்ன தேவை?',
    explainThis: 'எளிய விளக்கம்',
    rejectionSolver: 'பிரச்சினை தீர்வு',
    sandboxNotice: 'டெமோ மணல்வெளி தளம்'
  }
};
