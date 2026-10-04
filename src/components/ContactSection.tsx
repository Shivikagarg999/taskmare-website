import React from 'react';
import { BRAND } from '../data/siteContent';
import { Mail, Phone, MessageSquare, MapPin, Clock, ArrowRight } from 'lucide-react';

interface ContactSectionProps {
  onOpenEnquiry: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenEnquiry }) => {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-16 sm:py-24 bg-neutral-100/60 dark:bg-[#0F172A]/50 border-t border-neutral-200 dark:border-neutral-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-[#E11D48] dark:text-red-400 mb-2">
            <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400">09</span>
            <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
            <span className="uppercase tracking-wider font-bold">Direct Channels</span>
            <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
            <span className="text-neutral-500 dark:text-neutral-400 font-medium">Pan-India Support</span>
          </div>
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl font-extrabold font-heading text-[#101827] dark:text-white tracking-tight"
          >
            Talk to the engineers building your product
          </h2>
          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-300 font-normal">
            Have a question before submitting a formal scope? Reach out via WhatsApp, phone, or direct email.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Direct Email Card */}
          <div className="p-7 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/60 text-[#E11D48] flex items-center justify-center mb-5">
                <Mail className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold font-heading text-neutral-900 dark:text-white">
                Email the Studio
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Send your RFPs, specifications, or inquiry emails directly to our team inbox.
              </p>
              <div className="mt-4 font-mono font-bold text-sm text-[#E11D48] break-all">
                {BRAND.email}
              </div>
            </div>
            <div className="mt-6 pt-5 border-t border-neutral-100 dark:border-neutral-800">
              <a
                href={`mailto:${BRAND.email}?subject=Project%20Inquiry%20-%20Taskmare%20Labs`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 dark:text-white hover:text-[#E11D48] dark:hover:text-[#E11D48] transition-colors"
              >
                <span>Compose email to us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* WhatsApp & Phone Card */}
          <div className="p-7 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mb-5">
                <MessageSquare className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold font-heading text-neutral-900 dark:text-white">
                WhatsApp & Direct Call
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Chat in real-time or request an instant technical consultation call.
              </p>
              <div className="mt-4 font-bold text-base text-neutral-900 dark:text-white">
                {BRAND.phone}
              </div>
            </div>
            <div className="mt-6 pt-5 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-3">
              <a
                href={BRAND.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile-whatsapp inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-white/20" />
                <span>WhatsApp Chat</span>
              </a>
              <a
                href={`tel:${BRAND.phoneRaw}`}
                className="text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white px-2 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                Direct Call
              </a>
            </div>
          </div>

          {/* Physical Office / Studio Card */}
          <div className="p-7 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center mb-5">
                <MapPin className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold font-heading text-neutral-900 dark:text-white">
                Studio Location
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Visit our development headquarters or schedule an in-person meeting.
              </p>
              <div className="mt-4 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
                {BRAND.address}
              </div>
            </div>
            <div className="mt-6 pt-5 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Mon – Sat, 9:30 AM – 7:30 PM IST</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
