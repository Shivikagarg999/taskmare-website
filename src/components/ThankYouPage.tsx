import React, { useEffect } from 'react';
import { BRAND, BRAND_ASSETS } from '../data/siteContent';
import { InquiryResponse, PlatformChoice } from '../types';
import { 
  CheckCircle2, 
  MessageSquare, 
  Mail, 
  Phone, 
  ArrowLeft, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  FileText, 
  Share2, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface ThankYouPageProps {
  inquiry: InquiryResponse;
  clientName: string;
  clientEmail?: string;
  clientPhone: string;
  platform: PlatformChoice;
  budget: string;
  timeline: string;
  details: string;
  onBackToHome: () => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({
  inquiry,
  clientName,
  clientEmail,
  clientPhone,
  platform,
  budget,
  timeline,
  details,
  onBackToHome,
}) => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const whatsappShareUrl = `https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent(
    `Hi Taskmare Labs team, I just submitted an inquiry on your website!\n\nReference ID: ${inquiry.inquiryId}\nName: ${clientName}\nPlatform: ${platform}\nLooking forward to discussing our app project.`
  )}`;

  return (
    <div className="min-h-screen bg-[#FBFAF8] dark:bg-[#0B0F17] py-12 sm:py-20 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Taskmare Labs Homepage</span>
          </button>

          <span className="text-xs font-mono font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
            Dispatch Confirmed
          </span>
        </div>

        {/* Hero Confirmation Card */}
        <div className="bg-white dark:bg-[#111726] rounded-3xl border border-neutral-200/90 dark:border-neutral-800 shadow-xl overflow-hidden">
          {/* Top Banner Stripe */}
          <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 p-8 sm:p-12 text-white relative overflow-hidden">
            {/* Subtle decorative circles */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-black/10 blur-xl pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shrink-0 shadow-lg">
                <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>

              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Project Scope Received</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
                  Thank you, {clientName}!
                </h1>
                <p className="text-white/90 text-sm sm:text-base max-w-xl">
                  Your project scope has been securely logged and forwarded to our senior engineering team.
                </p>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-10 space-y-8">
            {/* Key Reference Callout */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
                <span className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-1">
                  Reference ID
                </span>
                <span className="font-mono font-extrabold text-base sm:text-lg text-[#E11D48] dark:text-red-400 break-all">
                  {inquiry.inquiryId || 'TM-REGISTERED'}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
                <span className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-1">
                  Target Platform
                </span>
                <span className="font-bold text-base text-neutral-900 dark:text-white">
                  {platform}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
                <span className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-1">
                  Estimated Response
                </span>
                <span className="font-bold text-base text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> Within 24 Hours
                </span>
              </div>
            </div>

            {/* Fast Connect Action (WhatsApp Priority) */}
            <div className="p-6 sm:p-7 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-base">
                  <MessageSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>Want to skip the line? Connect on WhatsApp</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-700/90 dark:text-emerald-300/80 max-w-xl">
                  You can reference your ID <strong className="font-mono font-bold text-emerald-900 dark:text-emerald-200">{inquiry.inquiryId}</strong> for immediate discussion with our lead development engineer.
                </p>
              </div>

              <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all shrink-0 active:scale-[0.98]"
              >
                <MessageSquare className="w-4 h-4 fill-white/20" />
                <span>Open WhatsApp Chat</span>
              </a>
            </div>

            {/* Scope Summary Accordion/Card */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 bg-neutral-50/40 dark:bg-neutral-900/30 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
                <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#E11D48]" />
                  <span>Submitted Project Summary</span>
                </h2>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                  {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-neutral-500 dark:text-neutral-400 block mb-0.5">Client Contact:</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    {clientName} · {clientPhone}
                  </span>
                  {clientEmail && (
                    <span className="block text-neutral-600 dark:text-neutral-400 font-mono mt-0.5">
                      {clientEmail}
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-neutral-500 dark:text-neutral-400 block mb-0.5">Budget & Timeline:</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    {budget || 'Flexible'} · {timeline || 'Standard timeline'}
                  </span>
                </div>
              </div>

              {details && (
                <div className="pt-2">
                  <span className="text-neutral-500 dark:text-neutral-400 text-xs block mb-1">
                    Requirements Brief:
                  </span>
                  <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-xs sm:text-sm text-neutral-700 dark:text-neutral-200 leading-relaxed max-h-36 overflow-y-auto whitespace-pre-wrap">
                    {details}
                  </div>
                </div>
              )}
            </div>

            {/* What Happens Next - Step by Step */}
            <div className="space-y-4">
              <h2 className="text-base font-bold font-heading text-neutral-900 dark:text-white">
                What happens next?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-extrabold text-sm flex items-center justify-center mb-3">
                      1
                    </div>
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                      Scope Review
                    </h3>
                    <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Our lead software architects study your platform requirements, technical stack, and design goals.
                    </p>
                  </div>
                  <span className="mt-3 text-[11px] font-bold text-neutral-400">Step 1 of 3</span>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950/50 text-[#E11D48] font-extrabold text-sm flex items-center justify-center mb-3">
                      2
                    </div>
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                      Architecture & Costing
                    </h3>
                    <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      We formulate a milestone breakdown, timeline projections, and a fixed-price cost proposal.
                    </p>
                  </div>
                  <span className="mt-3 text-[11px] font-bold text-neutral-400">Step 2 of 3</span>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 font-extrabold text-sm flex items-center justify-center mb-3">
                      3
                    </div>
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                      Direct Consultation
                    </h3>
                    <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      We reach out via WhatsApp/phone to walk through the estimate and answer any questions.
                    </p>
                  </div>
                  <span className="mt-3 text-[11px] font-bold text-neutral-400">Step 3 of 3</span>
                </div>
              </div>
            </div>

            {/* Direct Contact Alternatives */}
            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-neutral-500 dark:text-neutral-400 text-center sm:text-left">
                Need to add extra documents or wireframes? Email them directly to{' '}
                <a
                  href={`mailto:${BRAND.email}?subject=${encodeURIComponent(`[Follow-up ${inquiry.inquiryId}] Project Documents`)}`}
                  className="text-[#E11D48] font-bold hover:underline"
                >
                  {BRAND.email}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onBackToHome}
                  className="px-5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold text-xs sm:text-sm transition-all"
                >
                  Return to Home
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bilateral NDA Assurance Footer Note */}
        <div className="mt-8 text-center text-xs text-neutral-500 dark:text-neutral-400 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Your intellectual property and project ideas remain 100% confidential under our bilateral privacy pledge.</span>
        </div>
      </div>
    </div>
  );
};
