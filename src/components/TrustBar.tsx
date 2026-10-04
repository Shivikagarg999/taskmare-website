import React from 'react';
import { TRUST_STATS, VALUE_PROPOSITIONS } from '../data/siteContent';
import { Shield, Clock, Layers, Users } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const iconMap = [
    <Layers className="w-5 h-5 text-[#E11D48]" key="layers" aria-hidden="true" />,
    <Clock className="w-5 h-5 text-[#E11D48]" key="clock" aria-hidden="true" />,
    <Shield className="w-5 h-5 text-[#E11D48]" key="shield" aria-hidden="true" />,
    <Users className="w-5 h-5 text-[#E11D48]" key="users" aria-hidden="true" />,
  ];

  return (
    <section className="border-y border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0B0F17] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Key Measurable Numbers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 pb-10 border-b border-neutral-200/80 dark:border-neutral-800">
          {TRUST_STATS.map((stat) => (
            <div key={stat.label} className="text-left">
              <div className="text-3xl sm:text-4xl font-extrabold font-heading text-[#101827] dark:text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-[#E11D48] dark:text-red-400 mt-1">
                {stat.label}
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Guarantees Matrix */}
        <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUE_PROPOSITIONS.map((prop, idx) => (
            <div
              key={prop.title}
              className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/70 dark:border-neutral-800/80 transition-all hover:border-[#E11D48]/40"
            >
              <div className="mb-2.5">{iconMap[idx]}</div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-1">
                {prop.title}
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
