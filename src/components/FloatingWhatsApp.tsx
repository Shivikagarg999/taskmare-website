import React, { useState, useEffect, useRef } from 'react';
import { BRAND } from '../data/siteContent';
import { X, Send, MessageCircle, Check, CheckCheck } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);
  const [customNote, setCustomNote] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>('Android & iOS App');
  // Message status for the simulated chat bubble: 'sent' -> 'delivered' -> 'seen' (blue double check)
  const [messageStatus, setMessageStatus] = useState<'sent' | 'delivered' | 'seen'>('delivered');
  const cardRef = useRef<HTMLDivElement>(null);

  // Quick enquiry templates for high conversion
  const quickTopics = [
    { label: 'Android App', text: 'Hi Taskmare Labs, I am interested in developing an Android app.' },
    { label: 'iOS App', text: 'Hi Taskmare Labs, I would like to discuss an iOS app development project.' },
    { label: 'Android + iOS', text: 'Hi Taskmare Labs, I need a cross-platform app for both Android and iOS.' },
    { label: 'AI & Custom Software', text: 'Hi Taskmare Labs, I have an AI / software project idea to discuss.' },
  ];

  // Auto-show a subtle notification toast preview after 4.5 seconds on initial visit
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasPrompted(true);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  // When the chat dialog opens, simulate a realistic delivery to "seen / read" status transition after 2 seconds
  useEffect(() => {
    let seenTimer: NodeJS.Timeout | null = null;

    if (isOpen) {
      // Start with grey delivered ticks
      setMessageStatus('delivered');
      
      // Transition to blue "read / seen" double ticks after 2 seconds
      seenTimer = setTimeout(() => {
        setMessageStatus('seen');
      }, 2000);
    } else {
      setMessageStatus('delivered');
    }

    return () => {
      if (seenTimer) clearTimeout(seenTimer);
    };
  }, [isOpen]);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleLaunchWhatsApp = (customMessage?: string) => {
    const chosenTopicObj = quickTopics.find((t) => t.label === selectedTopic);
    let baseText = chosenTopicObj ? chosenTopicObj.text : 'Hi Taskmare Labs, I want to discuss a new app project.';
    
    if (customMessage || customNote.trim()) {
      baseText += ` Details: ${encodeURIComponent(customMessage || customNote.trim())}`;
    }

    const targetUrl = `https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent(baseText)}`;
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div
      ref={cardRef}
      className="fixed z-50 bottom-20 sm:bottom-6 right-4 sm:right-6 flex flex-col items-end print:hidden"
      aria-live="polite"
    >
      {/* Floating Interactive Chat Enquiry Dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="WhatsApp Quick Enquiry"
          className="w-[calc(100vw-2rem)] sm:w-96 mb-3 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden transition-all duration-200 animate-in fade-in slide-in-from-bottom-3"
        >
          {/* Header */}
          <div className="bg-[#075E54] dark:bg-[#075E54] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20">
                  <MessageCircle className="w-5 h-5 text-emerald-300" aria-hidden="true" />
                </div>
                {/* Active pulse */}
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#075E54]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-heading font-bold text-sm tracking-tight">Taskmare Labs</h3>
                  <span className="text-[10px] font-semibold bg-emerald-700/80 px-1.5 py-0.5 rounded text-emerald-100">
                    Direct
                  </span>
                </div>
                <p className="text-[11px] text-emerald-100/90 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 inline-block animate-pulse" />
                  Engineering Studio · Online
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close WhatsApp chat popup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-4 bg-[#F0F2F5] dark:bg-neutral-950/60 space-y-3">
            {/* Simulated Chat Bubble */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl rounded-tl-xs p-3.5 shadow-xs border border-neutral-200/70 dark:border-neutral-700/70 text-xs text-neutral-800 dark:text-neutral-200 space-y-1.5 transition-all">
              <p className="font-semibold text-neutral-900 dark:text-white flex items-center gap-1.5">
                <span>👋 Welcome to Taskmare Labs!</span>
              </p>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Need an Android app, iOS build, or custom AI product? Select a topic or message our lead developers directly on WhatsApp.
              </p>
              <div className="flex items-center justify-end gap-1 text-[10px] text-neutral-400 select-none">
                <span className="text-[10px] text-neutral-400 dark:text-neutral-500">
                  {messageStatus === 'seen' ? 'Read just now' : 'Delivered'}
                </span>
                <span className="inline-flex items-center transition-all duration-300 transform scale-100">
                  {messageStatus === 'sent' ? (
                    <Check className="w-3.5 h-3.5 text-neutral-400" aria-label="Sent" />
                  ) : messageStatus === 'delivered' ? (
                    <CheckCheck className="w-3.5 h-3.5 text-neutral-400" aria-label="Delivered" />
                  ) : (
                    <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb] animate-in zoom-in-75 duration-200" aria-label="Read / Seen" />
                  )}
                </span>
              </div>
            </div>

            {/* Quick Topic Selection */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1.5">
                What are you building?
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {quickTopics.map((topic) => (
                  <button
                    key={topic.label}
                    type="button"
                    onClick={() => setSelectedTopic(topic.label)}
                    className={`text-left text-xs font-semibold p-2 rounded-lg border transition-all ${
                      selectedTopic === topic.label
                        ? 'border-[#25D366] bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 ring-1 ring-[#25D366]'
                        : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300'
                    }`}
                  >
                    {topic.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Custom Note Input */}
            <div>
              <label htmlFor="whatsapp-custom-note" className="sr-only">
                Optional note or project brief
              </label>
              <input
                id="whatsapp-custom-note"
                type="text"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="Brief project details (optional)..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleLaunchWhatsApp();
                  }
                }}
                className="w-full text-xs px-3 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366]"
              />
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={() => handleLaunchWhatsApp()}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-neutral-950 font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
            >
              <Send className="w-4 h-4 text-neutral-950" />
              <span>Start WhatsApp Conversation</span>
            </button>

            {/* Privacy & Direct Assurance */}
            <p className="text-[10px] text-center text-neutral-500 dark:text-neutral-400">
              Direct line: {BRAND.phone} · No spam, instant engineer response.
            </p>
          </div>
        </div>
      )}

      {/* Subtle Proactive Prompt Toast (Disappears when chat opens) */}
      {!isOpen && hasPrompted && (
        <div
          onClick={() => setIsOpen(true)}
          className="cursor-pointer mb-2 max-w-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-2.5 rounded-xl shadow-lg flex items-center gap-2.5 text-xs text-neutral-800 dark:text-neutral-200 group hover:border-emerald-500 transition-all animate-bounce"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsOpen(true);
            }
          }}
          aria-label="Quick inquiry: chat on WhatsApp with Taskmare Labs"
        >
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="truncate">
            Have an app idea? <strong className="text-emerald-600 dark:text-emerald-400 font-semibold group-hover:underline">Chat on WhatsApp</strong>
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setHasPrompted(false);
            }}
            className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 p-0.5 ml-auto"
            aria-label="Dismiss chat prompt"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* The Main Circular Floating Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative group p-3 sm:p-3.5 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/50 flex items-center justify-center"
        aria-label={isOpen ? 'Close WhatsApp enquiry' : 'Open WhatsApp chat enquiry'}
        aria-expanded={isOpen}
      >
        {/* Animated pulse ring */}
        <span
          className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping pointer-events-none"
          aria-hidden="true"
        />

        {isOpen ? (
          <X className="w-6 h-6 sm:w-7 sm:h-7 text-white" aria-hidden="true" />
        ) : (
          /* Real WhatsApp Brand SVG Icon */
          <svg
            className="w-6 h-6 sm:w-7 sm:h-7 fill-current text-white"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12.031 0C5.394 0 0 5.394 0 12.031c0 2.119.553 4.186 1.602 6.012L.073 24l6.143-1.611a11.96 11.96 0 0 0 5.815 1.495h.005c6.635 0 12.03-5.394 12.03-12.032.001-3.212-1.248-6.231-3.52-8.503C18.27 1.25 15.247 0 12.031 0zm-.005 22.015h-.004a9.988 9.988 0 0 1-5.086-1.39l-.365-.216-3.777.991 1.008-3.682-.237-.377a9.96 9.96 0 0 1-1.534-5.31c0-5.514 4.486-10 10.003-10 2.67 0 5.18 1.04 7.069 2.929a9.945 9.945 0 0 1 2.93 7.073c-.002 5.513-4.488 9.996-10.004 9.996zm5.474-7.478c-.3-.15-1.776-.877-2.051-.977-.276-.1-.476-.15-.676.15-.2.3-.776.977-.951 1.177-.176.2-.351.226-.651.076-.3-.15-1.267-.467-2.413-1.489-.892-.795-1.494-1.777-1.669-2.077-.175-.3-.019-.462.131-.611.135-.135.3-.35.45-.526.151-.175.201-.3.301-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.628-.926-2.23-.243-.586-.49-.506-.676-.516l-.576-.01c-.2 0-.525.075-.8.375s-1.05 1.026-1.05 2.502c0 1.477 1.076 2.903 1.226 3.103.15.2 2.118 3.234 5.132 4.536.717.31 1.277.495 1.713.633.72.228 1.376.196 1.894.119.578-.086 1.776-.726 2.026-1.428.251-.701.251-1.302.176-1.428-.076-.125-.276-.2-.576-.35z" />
          </svg>
        )}

        {/* Online green indicator badge */}
        {!isOpen && (
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 border-2 border-white dark:border-neutral-900" />
          </span>
        )}
      </button>
    </div>
  );
};
