import React, { useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ParallaxSectionProps {
  onOpenEnquiry: () => void;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({ onOpenEnquiry }) => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      aria-label="Studio Engineering Principles"
      className="relative py-20 sm:py-28 bg-[#070A10] text-white overflow-hidden border-y border-neutral-800/80"
    >
      {/* Subtle Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-600/10 rounded-full blur-[140px]"
      />

      {/* Clean Blueprint Grid Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]"
      />

      {/* Main Focal Typography: Clean, Uncluttered, Breathable */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Discreet Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-400 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" />
          <span>Engineered in India · Shipped for Bharat &amp; Global Scale</span>
        </div>

        {/* Heroic Statement */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight text-white leading-tight">
          Built for scale.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E11D48] to-rose-300">
            Engineered for longevity.
          </span>
        </h2>

        {/* Narrative: Crisp & Confident */}
        <p className="mt-5 text-sm sm:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed font-normal">
          Zero recycled themes. Zero technical debt. Every database schema, native UI interaction, and API gateway is custom-engineered to withstand real-world production traffic.
        </p>

        {/* Single Primary Action */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={onOpenEnquiry}
            className="btn-tactile-primary inline-flex items-center gap-2 font-bold text-xs sm:text-sm px-7 py-3.5 rounded-xl shadow-lg cursor-pointer"
          >
            <span>Discuss Your Product Roadmap</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
