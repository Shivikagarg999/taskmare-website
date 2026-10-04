import React, { useEffect, useState } from 'react';
import { CheckCircle2, X, MessageSquare, ArrowRight } from 'lucide-react';
import { BRAND } from '../data/siteContent';

export interface ToastNotificationData {
  id: string;
  inquiryId: string;
  clientName: string;
  platform: string;
  message?: string;
  onViewDetails?: () => void;
}

interface ToastNotificationProps {
  toast: ToastNotificationData | null;
  onClose: () => void;
  duration?: number;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  toast,
  onClose,
  duration = 6000,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (toast) {
      setIsVisible(true);
      setProgress(100);

      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
        setProgress(remaining);
      }, 50);

      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, duration);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    } else {
      setIsVisible(false);
    }
  }, [toast, duration, onClose]);

  if (!toast) return null;

  const whatsappUrl = `https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent(
    `Hi Taskmare Labs, I just submitted project inquiry ${toast.inquiryId} for ${toast.platform} app.`
  )}`;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 max-w-sm sm:max-w-md w-[calc(100%-2rem)] transition-all duration-300 transform pointer-events-auto ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95 pointer-events-none'
      }`}
    >
      <div className="bg-white dark:bg-[#111726] border border-emerald-500/40 rounded-2xl shadow-2xl p-4 relative overflow-hidden backdrop-blur-md">
        {/* Subtle top progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-100 dark:bg-emerald-950">
          <div
            className="h-full bg-emerald-500 transition-all ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-start gap-3.5 pt-1">
          {/* Check icon badge */}
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
            <CheckCircle2 className="w-5 h-5" />
          </div>

          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Inquiry Dispatched
              </span>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                {toast.inquiryId}
              </span>
            </div>

            <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate">
              Thank you, {toast.clientName}!
            </p>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5 leading-snug">
              Your {toast.platform} project inquiry has been received. Our engineering team responds within 24 hours.
            </p>

            {/* Quick Actions inside Toast */}
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>

              {toast.onViewDetails && (
                <button
                  type="button"
                  onClick={toast.onViewDetails}
                  className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 transition-colors"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Dismiss button */}
          <button
            type="button"
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 250);
            }}
            aria-label="Dismiss notification"
            className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-1 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
