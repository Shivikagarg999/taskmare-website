import { ServiceItem, Testimonial, CaseStudy, FAQItem } from '../types';

export const BRAND = {
  name: 'Taskmare Labs',
  tagline: 'Custom Software & Mobile App Development Company in India',
  subtagline: 'We build native Android & iOS mobile apps, custom business software, and modern AI platforms for founders and scaling teams across India.',
  shortBio: 'Custom software development company and mobile app development agency in India. We engineer custom Android apps, Flutter cross-platform applications, ERP/CRM software, and AI solutions from scratch—with direct senior developer communication and transparent milestone billing in INR (₹).',
  email: 'taskmarelabs@gmail.com',
  phone: '+91 97605 56855',
  phoneRaw: '919760556855',
  address: 'Teachers Colony, Chandpur, Uttar Pradesh, India',
  whatsappUrl: 'https://wa.me/919760556855?text=Hi%20Taskmare%20Labs%2C%20I%20would%20like%20to%20discuss%20a%20new%20mobile%20app%20or%20software%20project.',
  facebookUrl: 'https://www.facebook.com/taksmare/',
  instagramUrl: 'https://www.instagram.com/taskmare_labs',
  hours: 'Monday – Saturday: 9:30 AM – 7:30 PM IST (24/7 for active launch support)',
};

export const BRAND_ASSETS = {
  logo: '/assets/taskmare/logo-whiteBG.png',
  logoDark: '/assets/taskmare/logo-dark.png',
  logoTransparent: '/assets/taskmare/logo-transparent.png',
  favicon: '/assets/taskmare/favicon.png',
  heroGraphic: '/images/hero_mobile_showcase_1790316785657.jpg',
  aboutGraphic: '/images/about_studio_workspace_1790316842120.jpg',
  aboutPlan: '/assets/taskmare/about-plan.png',
  creativePost: '/assets/taskmare/creative-post.png',
  bgImg: '/assets/taskmare/bg-img.png',
  android: '/assets/taskmare/service-mobile.jpg',
  apple: '/assets/taskmare/service-hero.jpg',
  aiDev: '/assets/taskmare/service-ai.jpg',
  softwareDev: '/assets/taskmare/service-backend.jpg',
  api: '/assets/taskmare/service-backend.jpg',
  stores: '/assets/taskmare/service-mobile.jpg',
  googlePlayBadge: '/assets/taskmare/google-play-badge.svg',
  appStoreBadge: '/assets/taskmare/app-store-badge.svg',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'android',
    title: 'Android Mobile App Development',
    image: BRAND_ASSETS.android,
    description: 'As an experienced android app development company in India, we deliver high-performance, responsive Android mobile app development. Silky-smooth 60 FPS performance on budget Redmi, Realme, and Samsung devices with guaranteed Google Play 20-tester release.',
    platform: 'Android',
    badge: 'Android App Development',
    features: [
      'Native Android mobile app development with Kotlin & Android Studio',
      'Cross-platform Flutter app development with 60 FPS performance',
      'Custom Android app development services with offline-first Room storage',
      'Lightweight APKs optimized for budget Indian smartphones & spotty networks',
      'In-house Google Play 20-tester closed-track testing guarantee',
    ],
  },
  {
    id: 'ios',
    title: 'iOS and Android Mobile App Development',
    image: BRAND_ASSETS.apple,
    description: 'Comprehensive mobile app development services for startups and established brands. Unified Flutter app development or pure native Swift builds engineered for peak performance and verified Apple App Store approval.',
    platform: 'iOS',
    badge: 'Mobile App Development',
    features: [
      'Cross-platform Flutter app development & React Native single-codebase builds',
      'Native Swift & SwiftUI architecture for premium iPhone & iPad experiences',
      'Apple Human Interface compliance & guaranteed App Store clearance',
      'Seamless UPI intent deep-linking, Apple Pay & biometric authentication',
      'Weekly TestFlight and internal staging releases you test on real phones',
    ],
  },
  {
    id: 'ai-development',
    title: 'AI Software Development & Smart App Features',
    image: BRAND_ASSETS.aiDev,
    description: 'Recognized as an innovative AI software development company in India, we embed Google AI (Gemini) and Claude AI into real-world business apps. Multilingual Indian speech, natural language processing, and custom RAG knowledge assistants.',
    platform: 'AI & Software',
    badge: 'AI Development Services',
    features: [
      'AI for app development: Google Gemini & OpenAI multimodal architectures',
      'Natural language processing (NLP) for Indian speech-to-text & voice search',
      'Automated WhatsApp AI customer support & triage agents',
      'Domain-specific RAG vector databases with private company data',
      'Token-optimized caching to keep cloud AI operating costs predictable',
    ],
  },
  {
    id: 'software',
    title: 'Custom Business Software, ERP & CRM',
    image: BRAND_ASSETS.softwareDev,
    description: 'Full-suite custom software development services for growing enterprises. Custom ERP software development, CRM pipelines, and custom healthcare software development built around your exact team workflow—with automated billing and operations dashboards.',
    platform: 'AI & Software',
    badge: 'Custom Business Software',
    features: [
      'High-performance React development & Next.js custom web platforms',
      'Custom ERP software development tailored to operations & inventory',
      'Custom CRM software development with automated lead pipelines',
      'Custom healthcare software development (ABHA IDs, clinic portals & scheduling)',
      'Automated billing, operations dashboards, and role-based permissions',
    ],
  },
  {
    id: 'backend',
    title: 'Backend Development & Cloud Computing Services',
    image: BRAND_ASSETS.api,
    description: 'High-throughput backend development and cloud computing services. Microservices, real-time WebSockets, and deep integrations with Indian financial rails, UPI, Razorpay, Cashfree, and WhatsApp Cloud APIs following web development best practices.',
    platform: 'Both',
    badge: 'Backend Development',
    features: [
      'High-speed Node.js, Express & Python/FastAPI microservices',
      'Razorpay, Cashfree, PhonePe, Paytm & native UPI deep-linking',
      'WhatsApp Business Cloud API & automated SMS OTP verification',
      'PostgreSQL, MongoDB & Redis hosted on AWS Mumbai or Google Cloud India',
      'Agile methodology with continuous deployment and automated testing',
    ],
  },
  {
    id: 'stores',
    title: 'Play Store & App Store Launch Services',
    image: BRAND_ASSETS.stores,
    description: 'End-to-end mobile app launch management. We navigate Google Play Console 20-tester requirements, Apple App Store Connect guidelines, and privacy declarations—with zero-cost rejection remediation until your app is live.',
    platform: 'Both',
    badge: 'Store Launch Guarantee',
    features: [
      'Full 14-day Google Play 20-tester closed-track testing pipeline',
      'Apple App Store Connect provisioning, certificates & review approval',
      'App Store Optimization (ASO): screenshots, keywords & listing copy',
      'Complete DPDP Act 2023 & developer privacy policy compliance',
      'Zero-cost rejection remediation guarantee until your app is live',
    ],
  },
];

export const WHAT_WE_STAND_FOR = [
  {
    number: '01',
    title: 'Built from scratch',
    description: 'Products developed around your requirements instead of recycled templates.',
  },
  {
    number: '02',
    title: 'One team, end to end',
    description: 'Planning, development, backend, integrations and launch support handled as one connected team.',
  },
  {
    number: '03',
    title: 'Flexible engagement',
    description: 'Clear scope and milestone or installment-based payments where agreed.',
  },
  {
    number: '04',
    title: 'Post-launch support',
    description: '6-month or 12-month support options can be included depending on the project.',
  },
  {
    number: '05',
    title: 'Store launch support',
    description: 'Assistance with Google Play and Apple App Store submission and release management.',
  },
];

export const PROCESS_STEPS = [
  {
    step: '01',
    name: 'PLAN',
    detail: 'Understand the idea, users, requirements and business goals.',
  },
  {
    step: '02',
    name: 'DESIGN',
    detail: 'Structure screens, flows and product experience before development.',
  },
  {
    step: '03',
    name: 'DEVELOP',
    detail: 'Build frontend, backend, APIs and integrations around the approved scope.',
  },
  {
    step: '04',
    name: 'TEST',
    detail: 'Test features and critical user flows before release.',
  },
  {
    step: '05',
    name: 'LAUNCH',
    detail: 'Prepare production builds and assist with deployment and store release.',
  },
  {
    step: '06',
    name: 'SUPPORT',
    detail: 'Provide post-launch technical support and maintenance where included.',
  },
];

export interface TechCategory {
  category: string;
  items: string[];
}

export const TECH_STACK: TechCategory[] = [
  {
    category: 'Mobile & Android',
    items: ['Kotlin (Android)', 'Swift (iOS)', 'Flutter app development', 'Android Studio', 'React Native', '20-Tester Play Track'],
  },
  {
    category: 'Web & SaaS',
    items: ['React development', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Web Development Best Practices', 'SEO Schema'],
  },
  {
    category: 'Backend & APIs',
    items: ['Node.js & Express', 'Python / FastAPI', 'REST & WebSockets', 'Cloud Computing Services', 'AWS Mumbai & GCP India'],
  },
  {
    category: 'Indian Fintech & Rails',
    items: ['UPI Intent / Deep-Linking', 'PhonePe & GPay', 'Razorpay', 'Cashfree', 'WhatsApp Cloud API', '1-Click Checkout'],
  },
  {
    category: 'AI & Bharat Intelligence',
    items: ['Google AI (Gemini)', 'Claude AI', 'Natural Language Processing', 'RAG Vector DBs', 'Multilingual Speech', 'AI Agents'],
  },
  {
    category: 'Data & Logistics',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Agile Methodology', 'Shiprocket Logistics', 'GitHub CI/CD'],
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-gaming',
    domain: 'Gaming Apps',
    title: 'Real-Time Multiplayer Tournament Gaming App',
    clientDescriptor: 'Mobile Gaming Studio',
    confidentialityNote: 'Protected by Bilateral NDA · Commercial details, game title, and client branding anonymized',
    challenge: 'The client needed a fast, lag-free mobile game capable of pairing 10,000+ players in live 1v1 matches. Their earlier version suffered from battery heating, game disconnects, and sluggish frame rates on budget phones.',
    solution: 'Engineered a silky-smooth 60 FPS mobile app with instant live matchmaking, cheat protection, and seamless in-app wallet withdrawals.',
    stack: ['Flutter & C++ Skia Engine', 'Node.js Cluster', 'Redis Pub/Sub', 'WebSocket Streaming', 'Google Play Game Services'],
    metrics: [
      { highlight: '60 FPS Smooth Gameplay', description: 'Runs fluidly even on budget Android phones with zero lag' },
      { highlight: '< 45ms Match Latency', description: 'Instant player pairing with zero gameplay disconnects' },
      { highlight: '120k+ Daily Matches', description: 'Scales effortlessly during peak weekend tournaments' },
    ],
    keyDeliverable: 'Complete iOS & Android game app, tournament matchmaking backend, and live admin dashboard.',
    image: '/images/cs_gaming.jpg',
  },
  {
    id: 'cs-ecommerce',
    domain: 'Ecommerce',
    title: 'Fast Mobile Shopping App for D2C Brand',
    clientDescriptor: 'Fashion & Lifestyle Retail Brand',
    confidentialityNote: 'Protected by Bilateral NDA · Commercial details and client branding anonymized',
    challenge: 'Over 40% of mobile shoppers were leaving without buying because the mobile website was slow and payments often timed out during flash sales.',
    solution: 'Built a dedicated, high-speed mobile shopping app with instant 1-second browsing, 1-click UPI & card checkout, automated discount notifications, and live warehouse inventory sync.',
    stack: ['Flutter', 'Razorpay & UPI Deep-Linking', 'Redis Cache', 'Firebase Cloud Messaging', 'Store Approval Suite'],
    metrics: [
      { highlight: '+52% Higher Checkout Rate', description: '1-click checkout cut mobile cart drop-offs by more than half' },
      { highlight: '< 1.1s Catalog Speed', description: 'Instant browsing through 4,000+ product designs' },
      { highlight: '48-Hour Store Approvals', description: 'Approved first-try on both Google Play & Apple App Store' },
    ],
    keyDeliverable: 'Customer shopping app (iOS & Android), promotional banner manager, and push alert system.',
    image: '/images/cs_ecommerce.jpg',
  },
  {
    id: 'cs-saas',
    domain: 'SaaS Web Apps',
    title: 'B2B Operations & Subscription Web Platform',
    clientDescriptor: 'Team Productivity Software Startup',
    confidentialityNote: 'Protected by Bilateral NDA · Commercial details and proprietary IP anonymized',
    challenge: 'The founder was managing client workflows manually in messy spreadsheets and needed an automated, professional cloud web application with user accounts and monthly billing.',
    solution: 'Developed a modern web app with dedicated company workspaces, team permission roles, automated Stripe subscription billing, and 1-click PDF/CSV reports.',
    stack: ['React & TypeScript', 'Tailwind CSS', 'PostgreSQL & Row-Level Security', 'Node.js / Express', 'Stripe Billing & Webhooks'],
    metrics: [
      { highlight: '100% Secure Workspaces', description: 'Complete privacy isolation between business accounts' },
      { highlight: '< 1.2s Fast Page Loads', description: 'Optimized web architecture for instant daily productivity' },
      { highlight: 'Automated Billing', description: 'Hands-off recurring payments, trial upgrades, and invoices' },
    ],
    keyDeliverable: 'Full-stack web application, company onboarding wizard, Stripe billing setup, and admin dashboard.',
    image: '/images/cs_saas.jpg',
  },
  {
    id: 'cs-ai',
    domain: 'AI Systems',
    title: 'AI Customer Support & Voice Order Assistant',
    clientDescriptor: 'Wholesale Distributor & Supply Marketplace',
    confidentialityNote: 'Protected by Bilateral NDA · Commercial details and client branding anonymized',
    challenge: 'Wholesale customers sent messy voice notes and regional dialect messages. Support staff spent hours manually retyping orders and answering 3,000+ repetitive status calls daily.',
    solution: 'Built an intelligent AI assistant that automatically converts voice memos into clear order invoices and gives customers instant answers about inventory and shipment status 24/7.',
    stack: ['Gemini Multimodal API', 'Python / FastAPI', 'Pinecone Vector DB', 'PostgreSQL', 'WebSocket Streaming'],
    metrics: [
      { highlight: '71% Fewer Support Calls', description: 'Routine order questions answered instantly by AI without human staff' },
      { highlight: 'Instant 850ms Answers', description: 'Real-time answers directly connected to warehouse stock' },
      { highlight: '4x Faster Order Processing', description: 'Voice recordings converted automatically into draft invoices' },
    ],
    keyDeliverable: 'Custom AI order service, live warehouse inventory connector, and operator review panel.',
    image: '/images/cs_ai.jpg',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Amitabh Sharma',
    role: 'Co-founder',
    company: 'KrishiMitra Agri Logistics',
    location: 'North India',
    content: 'Taskmare Labs built our Android app from the ground up for rural mandis. Their direct communication on WhatsApp and milestone transparency made a world of difference. We hit 10,000 active users in 2 months with zero server crashes.',
    projectType: 'Android App & Cloud Backend',
    result: '10,000+ Downloads · Smooth Play Store Launch',
  },
  {
    id: '2',
    name: 'Dr. Priya Varma',
    role: 'Founder',
    company: 'CareConnect Health',
    location: 'India',
    content: 'We needed both Android and iOS versions with real-time patient appointment booking, ABHA health ID integration, and Razorpay UPI payments. Taskmare delivered ahead of schedule and guided our Apple App Store approval without a single rejection.',
    projectType: 'Android + iOS Cross-Platform App',
    result: 'Approved on First Submission · 100% On-Time',
  },
  {
    id: '3',
    name: 'Rohan Deshmukh',
    role: 'Operations Director',
    company: 'SwiftFleet Dispatch',
    location: 'India',
    content: 'The custom route optimization and driver app they built works seamlessly even in low-network regions. The engineering team is exceptionally responsive and delivered our complete production repository on schedule.',
    projectType: 'Custom AI & Mobile Dispatch Portal',
    result: '40% Efficiency Gain · 24/7 System Uptime',
  },
  {
    id: '4',
    name: 'Ananya Sen',
    role: 'Founder & CEO',
    company: 'Aura Lifestyle D2C',
    location: 'India',
    content: 'Our Shopify website was too slow for flash sales. Taskmare Labs engineered a lightning-fast Flutter app with 1-click PhonePe and Google Pay checkout. Our cart abandonment dropped by 52% in the first week.',
    projectType: 'D2C Shopping App (iOS & Android)',
    result: '+52% Checkout Conversion · 1.1s Catalog Speed',
  },
];

export const TRUST_STATS = [
  { value: '50+', label: 'Products Shipped Across India', sub: 'Native Android, iOS & Custom Web Software' },
  { value: '100%', label: 'Play Store Pass Rate', sub: '20-tester closed track guaranteed' },
  { value: '100%', label: 'Source Code & IP Rights', sub: 'Bilateral legal NDA on file from Day 1' },
  { value: '100%', label: 'Milestone Transparency', sub: 'Pay only after inspecting deliverables' },
];

export const VALUE_PROPOSITIONS = [
  {
    title: 'Zero Template Shortcuts',
    description: 'We code custom architectures using native Kotlin/Swift or Flutter. No buggy drag-and-drop web wrappers or recycled code.',
  },
  {
    title: 'Milestone-Based Billing in INR (₹)',
    description: 'Pay only as each agreed sprint milestone is completed, demonstrated on your phone, and verified by you.',
  },
  {
    title: 'Free 30-Day Launch Warranty',
    description: 'Comprehensive bug fixing, store policy updates, and server stability monitoring included at no extra cost post-launch.',
  },
  {
    title: 'Strict Confidentiality (Bilateral NDA)',
    description: 'Your intellectual property, proprietary business logic, and code are protected under a legally binding bilateral Indian NDA.',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-pricing',
    category: 'Pricing & Timelines',
    question: 'How much does a custom software development company in India charge for mobile app development?',
    answer: 'At Taskmare Labs, we scope and quote every project transparently in Indian Rupees (₹) based on exact architectural requirements. Rapid MVPs and starter prototypes typically range from ₹25,000 to ₹55,000. Full-scale production mobile applications with real-time cloud sync, user authentication, and payment gateways range between ₹60,000 and ₹1,80,000+. We operate strictly on milestone-based escrow billing—meaning you only pay after inspecting working deliverables on your own device.',
    highlight: 'Milestone billing in INR (₹) · No hidden fees',
  },
  {
    id: 'faq-cross-platform',
    category: 'Tech & Stores',
    question: 'Should I choose native Android/iOS development or Flutter cross-platform app development?',
    answer: 'For 85% of startups and modern businesses, Flutter app development is the most cost-effective and scalable choice. Flutter produces high-speed 60 FPS applications for both Android and iOS from a single codebase, reducing development time and maintenance costs by up to 40%. If your application requires intensive background hardware processing, custom Bluetooth peripherals, or deep iOS-specific frameworks, we build native Kotlin (Android) and Swift (iOS).',
    highlight: 'Flutter for 2x faster cross-platform · Native for hardware-level control',
  },
  {
    id: 'faq-play-store-testers',
    category: 'Tech & Stores',
    question: 'How do you handle Google Play\'s 20-tester closed-testing requirement for Android app development?',
    answer: 'Google requires all new personal developer accounts in India to undergo 14 consecutive days of closed testing with at least 20 active testers before public release. As an experienced android app development company in India, Taskmare Labs manages this entire 20-tester testing pipeline in-house with real Android devices, logs tester feedback, and ensures your app receives immediate approval for production release.',
    highlight: 'In-house 20-tester closed track · 100% approval pass',
  },
  {
    id: 'faq-business-software',
    category: 'Tech & Stores',
    question: 'Can you build custom business software, ERP, and CRM platforms with automated workflows?',
    answer: 'Yes! We specialize in custom business software development, including custom ERP software development, CRM pipelines, and operations dashboards. Our platforms include multi-tenant role-based permissions, automated billing systems, Indian payment gateway reconciliations, and low-latency cloud hosting on AWS Mumbai or Google Cloud India.',
    highlight: 'Custom ERP & CRM · Built for your exact workflow',
  },
  {
    id: 'faq-ai-development',
    category: 'Tech & Stores',
    question: 'How does an AI software development company integrate AI and Generative AI into mobile apps?',
    answer: 'We build pragmatic AI software development services into real applications. We integrate Google Gemini and OpenAI multimodal models for customer triage assistants, intelligent document OCR parsing (such as commercial invoices and PAN cards), multilingual Indian speech-to-text, and domain-specific RAG knowledge search over your private business data with token caching.',
    highlight: 'Gemini & OpenAI integration · Low-latency streaming',
  },
  {
    id: 'faq-payments',
    category: 'Tech & Stores',
    question: 'Do you support Indian payment rails like UPI, PhonePe, Google Pay, and Razorpay?',
    answer: 'Yes! We specialize in Indian fintech integrations: native UPI intent deep-linking (PhonePe, Google Pay, Paytm, BHIM, Cred), Razorpay, Cashfree, and recurring subscription e-mandates with seamless 1-click checkout and automated reconciliation webhooks.',
    highlight: 'Native UPI deep-linking · Razorpay & Cashfree',
  },
  {
    id: 'faq-timeline',
    category: 'Pricing & Timelines',
    question: 'How long does mobile app and custom software development take from idea to launch?',
    answer: 'Typical turnaround depends on scope: rapid MVPs take 2 to 4 weeks. Full cross-platform apps (iOS and Android) with custom backend APIs usually require 4 to 8 weeks. Comprehensive systems with AI workflows or enterprise ERP dashboards take 8 to 12 weeks. You get hands-on access to testable staging builds at every bi-weekly sprint.',
    highlight: '2–4 weeks for MVPs · Interactive staging builds',
  },
  {
    id: 'faq-ownership',
    category: 'Ownership & Legal',
    question: 'Do I retain 100% ownership of the source code and intellectual property (IP)?',
    answer: 'Yes, 100%. Upon milestone completion and final settlement, we transfer the full Git repository, proprietary backend schemas, deployment scripts, design assets, and production store certificates directly to you. You own all intellectual property under a bilateral Indian legal NDA signed before kickoff.',
    highlight: '100% IP & repository transfer · Bilateral NDA',
  },
  {
    id: 'faq-communication',
    category: 'Process & Support',
    question: 'How do we communicate and monitor progress during development?',
    answer: 'You collaborate directly with our lead software developer on WhatsApp and Slack without middlemen or sales bureaucracy. We provide weekly Google Meet video walkthroughs with live milestone demonstrations, and share live APK builds so you can test features on real devices as they are coded.',
    highlight: 'Direct WhatsApp & Google Meet demos · Zero middlemen',
  },
  {
    id: 'faq-warranty',
    category: 'Process & Support',
    question: 'What happens after launch? Is there post-launch support and warranty?',
    answer: 'Every project comes with an unconditional 30-Day Post-Launch Free Warranty covering any unexpected edge bugs, store updates, and server performance monitoring. Following the warranty window, we offer flexible, affordable monthly maintenance retainers for continuous feature iterations, OS updates, and scaling.',
    highlight: '30-Day Free Warranty · Bug-free guarantee',
  },
];
