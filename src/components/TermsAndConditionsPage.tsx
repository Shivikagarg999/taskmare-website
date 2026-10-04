import React, { useEffect } from 'react';
import { applySEOMetadata } from '../services/seoService';
import { 
  ArrowLeft, 
  FileText, 
  CheckCircle2, 
  ShieldAlert, 
  Printer, 
  ExternalLink, 
  HelpCircle, 
  Briefcase, 
  DollarSign, 
  Clock, 
  UserCheck, 
  RefreshCw, 
  Code, 
  Cloud, 
  Smartphone, 
  Lock, 
  Headphones, 
  Database, 
  PauseCircle, 
  XCircle, 
  Eye, 
  TrendingUp, 
  ShieldCheck
} from 'lucide-react';
import { BRAND, BRAND_ASSETS } from '../data/siteContent';

interface TermsAndConditionsPageProps {
  onBackToHome: () => void;
  onOpenEnquiry: () => void;
}

interface TermItem {
  id: string;
  number: string;
  title: string;
  content: string;
  icon: React.ComponentType<{ className?: string }>;
  tag?: string;
}

export const TermsAndConditionsPage: React.FC<TermsAndConditionsPageProps> = ({
  onBackToHome,
  onOpenEnquiry,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    applySEOMetadata('terms');
    return () => {
      applySEOMetadata('home');
    };
  }, []);

  const termsList: TermItem[] = [
    {
      id: 'scope',
      number: '01',
      title: 'Project Scope & Approval',
      content:
        'Work will be based on the features, platforms, integrations and deliverables agreed before development begins. Anything outside the approved scope will be treated as additional work and may affect the project cost and timeline.',
      icon: Code,
      tag: 'Scope',
    },
    {
      id: 'payments',
      number: '02',
      title: 'Payments & Installments',
      content:
        'Projects may be paid upfront or through agreed milestones or installments. Development may be paused if a scheduled payment becomes overdue. Payments made against work already completed are non-refundable.',
      icon: DollarSign,
      tag: 'Billing',
    },
    {
      id: 'timeline',
      number: '03',
      title: 'Project Timeline',
      content:
        'Delivery dates are estimates based on the approved scope and timely cooperation from the client. Delays in feedback, content, credentials, API access, approvals, payments or other required inputs may move the delivery date.',
      icon: Clock,
      tag: 'Delivery',
    },
    {
      id: 'client-responsibilities',
      number: '04',
      title: 'Client Responsibilities',
      content:
        'The client is responsible for providing the content, branding assets, business information, credentials, third-party accounts and approvals reasonably required to complete the project.',
      icon: UserCheck,
      tag: 'Cooperation',
    },
    {
      id: 'revisions',
      number: '05',
      title: 'Revisions & Changes',
      content:
        'Reasonable revisions within the agreed scope are included during development. New features, major redesigns, changed workflows or requirements introduced after approval may require additional time and a revised quotation.',
      icon: RefreshCw,
      tag: 'Iterations',
    },
    {
      id: 'testing',
      number: '06',
      title: 'Development, Review & Testing',
      content:
        'Taskmare Labs will develop and test the agreed functionality before delivery. The client will be given an opportunity to review the product and report issues related to the approved scope before final acceptance.',
      icon: CheckCircle2,
      tag: 'Quality',
    },
    {
      id: 'third-party',
      number: '07',
      title: 'Third-Party Services & Costs',
      content:
        'Unless specifically included in the quotation, charges for hosting, domains, cloud services, SMS or OTP, payment gateways, maps, AI APIs, email services, developer accounts and other third-party products are separate. Availability, pricing and policies of those services are controlled by their respective providers.',
      icon: Cloud,
      tag: 'Infrastructure',
    },
    {
      id: 'app-stores',
      number: '08',
      title: 'Play Store & App Store Support',
      content:
        'Where included in the project, Taskmare Labs will assist with app builds, store listings and submission. Final approval, rejection, review time and policy decisions remain under the control of Google, Apple or the applicable platform and therefore cannot be guaranteed.',
      icon: Smartphone,
      tag: 'Deployment',
    },
    {
      id: 'ownership',
      number: '09',
      title: 'Source Code & Ownership',
      content:
        'After full payment, the client receives ownership of the custom project code and agreed deliverables created specifically for the project. Pre-existing internal tools, reusable components, frameworks and third-party or open-source libraries remain subject to their existing ownership and licence terms.',
      icon: Briefcase,
      tag: 'Intellectual Property',
    },
    {
      id: 'confidentiality',
      number: '10',
      title: 'Confidentiality',
      content:
        'Non-public project information, credentials and business information shared for development will be treated as confidential and used only as reasonably necessary to deliver and support the project.',
      icon: Lock,
      tag: 'Privacy',
    },
    {
      id: 'support',
      number: '11',
      title: 'Support After Delivery',
      content:
        'Where 6-month or 12-month support is included, support covers bug fixes and reasonable technical assistance for the delivered scope. New features, redesigns, major upgrades, new integrations and changes caused by new requirements are separate development work unless otherwise agreed.',
      icon: Headphones,
      tag: 'Maintenance',
    },
    {
      id: 'backups',
      number: '12',
      title: 'Backups & Production Data',
      content:
        'The client should maintain appropriate backups of important business and production data. Taskmare Labs will take reasonable care when working with production systems, but is not the client\'s permanent backup service unless a separate backup arrangement has been agreed.',
      icon: Database,
      tag: 'Data Safety',
    },
    {
      id: 'inactivity',
      number: '13',
      title: 'Project Hold & Inactivity',
      content:
        'If required feedback, content, access or payment remains pending for an extended period, the project may be placed on hold. Resuming a long-inactive project may require a reassessment of availability, dependencies and timeline.',
      icon: PauseCircle,
      tag: 'Scheduling',
    },
    {
      id: 'cancellation',
      number: '14',
      title: 'Cancellation',
      content:
        'Either party may discontinue a project through written communication. The client remains responsible for work already completed and any committed third-party expenses up to the cancellation date.',
      icon: XCircle,
      tag: 'Exit Terms',
    },
    {
      id: 'portfolio',
      number: '15',
      title: 'Portfolio Usage',
      content:
        'After a project becomes public, Taskmare Labs may display the project name, publicly available screens and a brief project description in its portfolio unless confidentiality has been agreed with the client.',
      icon: Eye,
      tag: 'Showcase',
    },
    {
      id: 'business-results',
      number: '16',
      title: 'Business Results',
      content:
        'Taskmare Labs commits to the agreed development work, not to a specific commercial outcome. Downloads, revenue, rankings, user growth, conversions and other business results depend on factors beyond software development and are not guaranteed.',
      icon: TrendingUp,
      tag: 'Outcome',
    },
    {
      id: 'limitation',
      number: '17',
      title: 'Limitation of Responsibility',
      content:
        'Taskmare Labs is responsible for providing the agreed development services, but is not responsible for outages, policy changes, account actions, service interruptions or failures originating from third-party platforms and services outside its reasonable control.',
      icon: ShieldAlert,
      tag: 'Liability',
    },
    {
      id: 'acceptance',
      number: '18',
      title: 'Acceptance of Terms',
      content:
        'Starting the project, approving the quotation or making the first project payment confirms acceptance of the agreed project scope, commercial terms and these project terms and conditions.',
      icon: ShieldCheck,
      tag: 'Binding Agreement',
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
              HOW WE WORK
            </span>
            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
              Effective: October 2026
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-neutral-900 dark:text-white">
            Project Terms &amp; Conditions
          </h1>

          <p className="mt-3 text-lg sm:text-xl font-bold text-[#E11D48]">
            Clear scope. Clear payments. No surprises.
          </p>

          <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl">
            These terms explain how Taskmare Labs handles project scope, payments, revisions, ownership, delivery and post-launch support so both sides know what to expect before work begins.
          </p>

          {/* Priority Notice Banner */}
          <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm leading-relaxed">
              <strong className="font-bold">Project-specific documents take priority.</strong> If an approved quotation, proposal or written project agreement contains a term that differs from this document, the project-specific term will apply to that project.
            </div>
          </div>
        </div>

        {/* Quick Directory Jump Bar */}
        <div className="mb-10 p-4 rounded-xl bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 shadow-xs print:hidden">
          <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
            Quick Index (18 Clauses)
          </p>
          <div className="flex flex-wrap gap-1.5">
            {termsList.map((term) => (
              <a
                key={term.id}
                href={`#term-${term.number}`}
                className="text-[11px] font-mono px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-[#E11D48] hover:text-white transition-colors"
              >
                {term.number}. {term.title.split(' ')[0]}
              </a>
            ))}
          </div>
        </div>

        {/* 18 Project Terms Clauses */}
        <div className="space-y-6">
          {termsList.map((term) => {
            const IconComponent = term.icon;
            return (
              <div
                key={term.id}
                id={`term-${term.number}`}
                className="group relative rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 p-5 sm:p-6 shadow-xs hover:border-[#E11D48]/40 transition-colors"
              >
                <div className="flex items-start gap-4">
                  {/* Number Badge */}
                  <div className="shrink-0 flex flex-col items-center">
                    <span className="text-sm font-black font-mono text-[#E11D48] bg-red-500/10 px-2.5 py-1 rounded-lg">
                      {term.number}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h2 className="text-lg sm:text-xl font-bold font-heading text-neutral-900 dark:text-white">
                        {term.title}
                      </h2>
                      {term.tag && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                          {term.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {term.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* A Practical Note Section */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-start gap-3.5">
            <HelpCircle className="w-5 h-5 text-[#E11D48] shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base sm:text-lg font-bold font-heading text-neutral-900 dark:text-white">
                A Practical Note
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                These terms are intended to create a clear working relationship between Taskmare Labs and its clients. For high-value, regulated or jurisdiction-sensitive projects, the final agreement should be reviewed by a qualified legal professional and supplemented with any required tax, dispute-resolution, data-protection or industry-specific clauses.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA & Signoff */}
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              TASKMARE LABS | Project Terms &amp; Conditions
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
              Inquire About a Project
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
