import React, { useEffect } from 'react';
import { BRAND } from '../data/siteContent';
import { X, ShieldCheck } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/70 backdrop-blur-xs"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-200 dark:border-neutral-800 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#E11D48]" />
            <h2 id="privacy-modal-title" className="text-xl font-bold font-heading text-neutral-900 dark:text-white">
              Privacy Policy · Taskmare Labs
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48]"
            aria-label="Close privacy policy modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 space-y-4 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
          <p>
            Taskmare Labs (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting the privacy of prospective clients, partners, and visitors to our website and inquiry portals.
          </p>

          <h3 className="text-base font-bold text-neutral-900 dark:text-white pt-2">
            1. Information We Collect
          </h3>
          <p>
            When you submit a project enquiry through our forms, we collect your name, email address, telephone/WhatsApp contact number, location or company name, and your submitted project requirements and descriptions.
          </p>

          <h3 className="text-base font-bold text-neutral-900 dark:text-white pt-2">
            2. How We Use Your Information
          </h3>
          <p>
            We use your submitted data exclusively to evaluate technical feasibility, provide project estimates and proposals, schedule discovery calls, and respond to your direct inquiries. We do not sell, rent, or trade your personal details or project specifications to third-party marketing companies.
          </p>

          <h3 className="text-base font-bold text-neutral-900 dark:text-white pt-2">
            3. Strict Confidentiality & Intellectual Property
          </h3>
          <p>
            All submitted concepts, business ideas, and project descriptions are held in strict confidence. We routinely sign Non-Disclosure Agreements (NDAs) prior to formal discovery sessions to protect your proprietary assets.
          </p>

          <h3 className="text-base font-bold text-neutral-900 dark:text-white pt-2">
            4. Contact Information
          </h3>
          <p>
            For any privacy inquiries or to request deletion of your submitted records, please contact Taskmare Labs:
          </p>
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 text-xs space-y-1 font-mono">
            <p><strong>Email:</strong> {BRAND.email}</p>
            <p><strong>Phone:</strong> {BRAND.phone}</p>
            <p><strong>Address:</strong> {BRAND.address}</p>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-900 font-bold text-xs rounded-xl transition-all"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
