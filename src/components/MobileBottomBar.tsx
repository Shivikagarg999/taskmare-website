import React, { useState, useEffect } from 'react';
import { BRAND } from '../data/siteContent';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { PlatformChoice } from '../types';

interface MobileBottomBarProps {
  onOpenEnquiry: (platform?: PlatformChoice) => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onOpenEnquiry }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show once scrolled past 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Quick Contact Actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-t border-neutral-200 dark:border-neutral-800 p-3 shadow-2xl transition-all duration-300 transform translate-y-0"
    >
      <div className="max-w-md mx-auto grid grid-cols-2 gap-2">
        <a
          href={BRAND.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs shadow-md active:scale-[0.98] transition-all"
          aria-label="Direct WhatsApp chat"
        >
          <MessageSquare className="w-4 h-4 text-white fill-white/20 shrink-0" aria-hidden="true" />
          <span>WhatsApp Chat</span>
        </a>

        <button
          type="button"
          onClick={() => onOpenEnquiry()}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white font-bold text-xs shadow-md active:scale-[0.98] transition-all"
        >
          <span>Get Free Estimate</span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
};
