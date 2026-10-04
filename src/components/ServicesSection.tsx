import React, { useState } from 'react';
import { SERVICES } from '../data/siteContent';
import { PlatformChoice } from '../types';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (platform: PlatformChoice) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [filter, setFilter] = useState<'all' | 'mobile' | 'ai' | 'backend'>('all');

  const filteredServices = SERVICES.filter((service) => {
    if (filter === 'all') return true;
    if (filter === 'mobile') return service.platform === 'Android' || service.platform === 'iOS' || service.id === 'stores';
    if (filter === 'ai') return service.id === 'ai-development';
    if (filter === 'backend') return service.id === 'software' || service.id === 'backend';
    return true;
  });

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-16 sm:py-24 bg-[#FBFAF8] dark:bg-[#0B0F17]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#E11D48] dark:text-red-400 mb-2">
              <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400">02</span>
              <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
              <span className="uppercase tracking-wider font-bold">Services &amp; Capabilities</span>
            </div>
            <h2
              id="services-heading"
              className="text-3xl sm:text-4xl font-extrabold font-heading text-[#101827] dark:text-white tracking-tight"
            >
              Mobile App &amp; Custom Software Development Services
            </h2>
            <p className="mt-3 text-base text-neutral-600 dark:text-neutral-300 max-w-2xl">
              From early product architecture to store release, we build production-grade Android apps, iOS applications, Flutter builds, and custom business software tailored to your goals. 100% scratch-built code with milestone-based delivery.
            </p>
          </div>

          {/* Interactive Filter Controls (Segmented Tabs with Tactile Feedback) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-neutral-100 dark:bg-neutral-800/90 rounded-xl border border-neutral-200/80 dark:border-neutral-700/80 shrink-0">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all active:scale-[0.97] cursor-pointer ${
                filter === 'all'
                  ? 'bg-white dark:bg-neutral-900 text-[#101827] dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              All Services
            </button>
            <button
              type="button"
              onClick={() => setFilter('mobile')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all active:scale-[0.97] cursor-pointer ${
                filter === 'mobile'
                  ? 'bg-white dark:bg-neutral-900 text-[#101827] dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Mobile App Development
            </button>
            <button
              type="button"
              onClick={() => setFilter('ai')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all active:scale-[0.97] cursor-pointer ${
                filter === 'ai'
                  ? 'bg-white dark:bg-neutral-900 text-[#101827] dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              AI Software Development
            </button>
            <button
              type="button"
              onClick={() => setFilter('backend')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all active:scale-[0.97] cursor-pointer ${
                filter === 'backend'
                  ? 'bg-white dark:bg-neutral-900 text-[#101827] dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Custom Business Software &amp; Backend
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="card-elevated group flex flex-col justify-between rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:border-[#E11D48]/40"
            >
              <div>
                {/* Visual Thumbnail */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-neutral-900">
                  <img
                    src={service.image}
                    alt={`${service.title} studio showcase`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/assets/taskmare/home-graphics.png';
                    }}
                  />
                  {/* Subtle dark gradient scrim at bottom of image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                  
                  {service.badge && (
                    <div className="absolute top-3 right-3 text-[11px] font-bold text-white bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/15 shadow-xs">
                      {service.badge}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold font-heading text-neutral-900 dark:text-white group-hover:text-[#E11D48] transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                    {service.description}
                  </p>

                  {/* Feature Checklist */}
                  <ul className="mt-5 space-y-2.5 pt-4 border-t border-neutral-100 dark:border-neutral-800" aria-label={`Key features of ${service.title}`}>
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300 font-medium">
                        <Check className="w-3.5 h-3.5 text-[#E11D48] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Conversion Action Footer */}
              <div className="p-6 pt-0 mt-auto">
                <button
                  type="button"
                  onClick={() => onSelectService(service.platform)}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/80 text-neutral-800 dark:text-neutral-200 hover:bg-[#E11D48] hover:text-white hover:border-[#E11D48] dark:hover:bg-[#E11D48] dark:hover:text-white dark:hover:border-[#E11D48] transition-all active:scale-[0.98]"
                >
                  <span>Inquire for {service.platform === 'Both' ? 'Cross-Platform' : service.platform}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom AI Capabilities Banner */}
        <div className="mt-16 rounded-3xl bg-linear-to-r from-neutral-900 to-neutral-800 text-white p-8 sm:p-10 relative overflow-hidden border border-neutral-700/80 shadow-2xl">
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#E11D48] mb-3">
              <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-400">AI LABS</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="uppercase tracking-wider font-bold">Generative AI Studio</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading">
              OpenAI, Gemini & Custom LLM Integrations Built Into Your App
            </h3>
            <p className="mt-3 text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
              We don&apos;t just build generic wrappers. We integrate intelligent assistants, natural-language search, smart recommendations, and workflow automations into production apps with real user impact.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onSelectService('AI & Software')}
                className="btn-tactile-primary text-xs sm:text-sm font-bold px-6 py-3 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48]"
              >
                Discuss AI Integration
              </button>
              <span className="text-xs text-neutral-400 font-medium">
                Models supported: OpenAI GPT-4o, Google Gemini 2.5/Flash, Anthropic & Local Embeddings
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
