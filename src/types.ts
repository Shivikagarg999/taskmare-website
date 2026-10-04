export type PlatformChoice = 'Android' | 'iOS' | 'Both' | 'AI & Software';

export interface ServiceItem {
  id: string;
  title: string;
  image: string;
  description: string;
  platform: PlatformChoice;
  badge?: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  content: string;
  projectType: string;
  result: string;
}

export interface CaseStudy {
  id: string;
  domain: 'Gaming Apps' | 'Ecommerce' | 'AI Systems' | 'SaaS Web Apps';
  title: string;
  clientDescriptor: string;
  confidentialityNote: string;
  challenge: string;
  solution: string;
  stack: string[];
  metrics: {
    highlight: string;
    description: string;
  }[];
  keyDeliverable: string;
  image?: string;
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  platform: PlatformChoice;
  details: string;
  timeline: string;
  budget: string;
  location: string;
  honeypot?: string;
  captchaToken: string;
}

export interface InquiryResponse {
  success: boolean;
  inquiryId?: string;
  recipient?: string;
  emailDispatched?: boolean;
  sheetLogged?: boolean;
  directMailtoUrl?: string;
  message?: string;
  error?: string;
  inquiryRecord?: any;
}

export interface FAQItem {
  id: string;
  category: 'Pricing & Timelines' | 'Ownership & Legal' | 'Tech & Stores' | 'Process & Support';
  question: string;
  answer: string;
  highlight?: string;
}
