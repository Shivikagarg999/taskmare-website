import React from 'react';
import { TECH_STACK } from '../data/siteContent';
import { Smartphone, Globe, Server, Database, Sparkles, Cloud, CreditCard, Truck } from 'lucide-react';

interface TechStackSectionProps {
  onOpenEnquiry?: () => void;
}

export const TechStackSection: React.FC<TechStackSectionProps> = ({ onOpenEnquiry }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Mobile & Android':
      case 'Mobile':
        return Smartphone;
      case 'Web & SaaS':
      case 'Web':
        return Globe;
      case 'Backend & APIs':
      case 'Backend':
        return Server;
      case 'Indian Fintech & Rails':
        return CreditCard;
      case 'AI & Bharat Intelligence':
      case 'AI & GenAI':
        return Sparkles;
      case 'Data & Logistics':
      case 'Data':
        return Truck;
      default:
        return Server;
    }
  };

  return (
    <section
      id="tech-stack"
      aria-labelledby="tech-stack-heading"
      className="py-16 sm:py-24 bg-white dark:bg-[#0B0F17] border-t border-neutral-200 dark:border-neutral-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#E11D48] dark:text-red-400 mb-2">
            <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400">03</span>
            <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
            <span className="uppercase tracking-wider font-bold">Tech Stack &amp; Web Development Best Practices</span>
          </div>

          <h2
            id="tech-stack-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#101827] dark:text-white tracking-tight"
          >
            Battle-tested frameworks.{' '}
            <span className="text-[#E11D48] inline-block">Built for scale.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
            From native Android and Flutter app development to Next.js, Python microservices, and Google Gemini AI—we select the right architecture for your product, not recycled templates.
          </p>
        </div>

        {/* 6 Tech Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECH_STACK.map((tech) => {
            const Icon = getCategoryIcon(tech.category);
            return (
              <div
                key={tech.category}
                className="group rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-[#FBFAF8] dark:bg-neutral-900/60 p-6 shadow-xs hover:shadow-lg hover:border-[#E11D48]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/80 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-[#E11D48]/40 transition-all">
                      <Icon className="w-5 h-5 text-[#E11D48]" />
                    </div>
                    <h3 className="text-lg font-bold font-heading text-neutral-900 dark:text-white group-hover:text-[#E11D48] transition-colors">
                      {tech.category}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {tech.items.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700/80 text-neutral-700 dark:text-neutral-300 shadow-2xs group-hover:border-neutral-300 dark:group-hover:border-neutral-600 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200/70 dark:border-neutral-800/80 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                  <span>Stack Tier</span>
                  <span className="text-[#E11D48] font-bold">Production Ready</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner from Page 1 */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-neutral-900 text-white border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#E11D48] block mb-1">
              FROM IDEA TO LAUNCH, AND BEYOND
            </span>
            <p className="text-sm sm:text-base text-neutral-200 max-w-2xl font-normal leading-relaxed">
              Planning, development, integrations, deployment and post-launch support handled as one connected product journey.
            </p>
          </div>

          {onOpenEnquiry && (
            <button
              type="button"
              onClick={onOpenEnquiry}
              className="btn-tactile-primary text-xs sm:text-sm px-6 py-3 rounded-xl font-bold shrink-0"
            >
              Discuss Your Stack
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
