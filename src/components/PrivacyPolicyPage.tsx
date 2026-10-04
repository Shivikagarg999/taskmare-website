import React, { useEffect } from 'react';
import { applySEOMetadata } from '../services/seoService';
import { 
  ArrowLeft, 
  Shield, 
  Mail, 
  MapPin, 
  Printer, 
  Database, 
  FileText, 
  Share2, 
  Lock, 
  Cookie, 
  ExternalLink, 
  Clock, 
  UserCheck, 
  Users, 
  RefreshCw, 
  Phone
} from 'lucide-react';
import { BRAND } from '../data/siteContent';

interface PrivacyPolicyPageProps {
  onBackToHome: () => void;
  onOpenEnquiry: () => void;
}

interface PrivacySection {
  id: string;
  title: string;
  content: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({
  onBackToHome,
  onOpenEnquiry,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    applySEOMetadata('privacy');
    return () => {
      applySEOMetadata('home');
    };
  }, []);

  const privacySections: PrivacySection[] = [
    {
      id: 'collection',
      title: 'Information We Collect',
      content:
        'We may collect your name, email, phone number, project details, usage data, and information you share through forms.',
      icon: Database,
    },
    {
      id: 'usage',
      title: 'How We Use Information',
      content:
        'We use information to respond to inquiries, plan projects, provide services, improve our website, and communicate with you.',
      icon: FileText,
    },
    {
      id: 'sharing',
      title: 'Information Sharing',
      content:
        'We do not sell personal information. We may share data only with trusted service providers when needed to operate our business.',
      icon: Share2,
    },
    {
      id: 'security',
      title: 'Data Security',
      content:
        'We use reasonable technical and organizational safeguards to protect submitted information.',
      icon: Lock,
    },
    {
      id: 'cookies',
      title: 'Cookies',
      content:
        'Our website may use cookies or similar tools for basic functionality, analytics, and performance.',
      icon: Cookie,
    },
    {
      id: 'third-party',
      title: 'Third-Party Links',
      content:
        'Our website may link to third-party websites. Their privacy practices are governed by their own policies.',
      icon: ExternalLink,
    },
    {
      id: 'retention',
      title: 'Data Retention',
      content:
        'We keep information only as long as needed for business, legal, and service purposes.',
      icon: Clock,
    },
    {
      id: 'rights',
      title: 'User Rights',
      content:
        'You can request access, correction, or deletion of your personal information by contacting us.',
      icon: UserCheck,
    },
    {
      id: 'children',
      title: "Children's Privacy",
      content:
        'Our services are not directed to children, and we do not knowingly collect data from children.',
      icon: Users,
    },
    {
      id: 'changes',
      title: 'Policy Changes',
      content:
        'We may update this policy from time to time. The latest version will be posted on this page.',
      icon: RefreshCw,
    },
    {
      id: 'contact',
      title: 'Contact Information',
      content:
        'For privacy questions, contact Taskmare Labs at taskmarelabs@gmail.com. Address: Gokul Nagar, Chandpur, Bijnor, Uttar Pradesh, India.',
      icon: Mail,
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FBFAF8] dark:bg-[#0B0F17] text-[#101827] dark:text-neutral-100 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-neutral-200 dark:border-neutral-800 print:hidden">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-600 dark:text-neutral-300 hover:text-[#E11D48] dark:hover:text-[#E11D48] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Taskmare Labs Home</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs font-semibold hover:border-[#E11D48] transition-colors"
              title="Print or save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-neutral-500" />
              <span>Print / PDF</span>
            </button>
            <button
              type="button"
              onClick={onOpenEnquiry}
              className="btn-tactile-primary px-4 py-1.5 rounded-lg text-xs font-bold"
            >
              Start Project Inquiry
            </button>
          </div>
        </div>

        {/* Document Header */}
        <div className="pt-10 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#E11D48] bg-red-500/10 px-2.5 py-1 rounded-md">
              PRIVACY
            </span>
            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
              Taskmare Labs • India
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-neutral-900 dark:text-white">
            Privacy Policy
          </h1>

          <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl">
            How Taskmare Labs collects, uses and protects the information you share with us.
          </p>
        </div>

        {/* Structured Sections */}
        <div className="mt-6 border-t border-neutral-200 dark:border-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-800">
          {privacySections.map((sec, index) => {
            const Icon = sec.icon;
            const isContact = sec.id === 'contact';

            return (
              <div
                key={sec.id}
                className="py-8 sm:py-10 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/80 flex items-center justify-center shrink-0 group-hover:border-[#E11D48]/40 transition-colors">
                    <Icon className="w-5 h-5 text-[#E11D48]" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-neutral-400 font-bold">
                        {String(index + 1).padStart(2, '0')}.
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold font-heading text-neutral-900 dark:text-white">
                        {sec.title}
                      </h2>
                    </div>

                    <p className="mt-3 text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {sec.content}
                    </p>

                    {isContact && (
                      <div className="mt-6 p-5 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                          <Mail className="w-4 h-4 text-[#E11D48] shrink-0 mt-0.5" />
                          <div>
                            <span className="text-xs font-semibold text-neutral-500 block">Direct Email</span>
                            <a
                              href={`mailto:${BRAND.email}`}
                              className="text-sm font-bold text-neutral-900 dark:text-white hover:text-[#E11D48] transition-colors"
                            >
                              {BRAND.email}
                            </a>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-[#E11D48] shrink-0 mt-0.5" />
                          <div>
                            <span className="text-xs font-semibold text-neutral-500 block">Studio Address</span>
                            <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                              {BRAND.address}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA & Signoff */}
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              TASKMARE LABS | Privacy &amp; Data Protection
            </p>
            <p className="text-xs text-neutral-400 mt-1">
              {BRAND.address}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToHome}
              className="text-xs font-semibold px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:border-[#E11D48] transition-colors"
            >
              Back to Home
            </button>
            <button
              type="button"
              onClick={onOpenEnquiry}
              className="btn-tactile-primary text-xs font-bold px-5 py-2 rounded-xl"
            >
              Start Project Inquiry
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
