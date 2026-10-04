import React from 'react';
import { BRAND, BRAND_ASSETS } from '../data/siteContent';
import { MapPin, Code, Cpu, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-16 sm:py-24 bg-white dark:bg-[#0B0F17] border-t border-neutral-200 dark:border-neutral-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Graphic */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-xl bg-neutral-50 dark:bg-neutral-900 p-3 sm:p-4 card-sheen">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-neutral-950">
                <img
                  src={BRAND_ASSETS.aboutGraphic}
                  alt="Taskmare Labs Software Studio workspace and engineering team"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/assets/taskmare/about.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-7 sm:left-7 sm:right-7 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-700/80 shadow-md">
                <div className="flex items-center gap-2 text-xs font-bold text-[#E11D48] dark:text-red-400 uppercase tracking-wider mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Custom Software Development Company in India</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-300">
                  Partnering with startup founders, D2C brands, and growing enterprises across India with milestone-based delivery and bilateral legal NDA protection.
                </p>
              </div>
            </div>
          </div>

          {/* Right Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#E11D48] dark:text-red-400 mb-2">
                <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400">07</span>
                <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
                <span className="uppercase tracking-wider font-bold">Engineering Pedigree</span>
                <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
                <span className="text-neutral-500 dark:text-neutral-400 font-medium">Pan-India Software Company</span>
              </div>
              <h2
                id="about-heading"
                className="text-3xl sm:text-4xl font-extrabold font-heading text-[#101827] dark:text-white tracking-tight"
              >
                Custom mobile app &amp; software development for ambitious founders
              </h2>
            </div>

            <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Taskmare Labs was founded as a dedicated custom software development company with a clear conviction: software should be engineered from the ground up, with milestone-based transparency and direct developer communication. We eliminate the layers of junior middlemen and non-technical account reps so you collaborate directly with the senior engineers writing your Swift, Kotlin, and React code.
            </p>

            <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Whether you are launching your first Android or iOS mobile application, adopting Flutter app development, or building custom business software with AI automation, we create robust architectures designed for long-term scale and 100% IP ownership.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800">
                <Code className="w-5 h-5 text-[#E11D48] mb-2" />
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Pure Craft</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Native code, clean git commits, documented APIs.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800">
                <Cpu className="w-5 h-5 text-[#E11D48] mb-2" />
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Modern AI</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  OpenAI & Gemini APIs integrated seamlessly.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800">
                <Award className="w-5 h-5 text-[#E11D48] mb-2" />
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Store Certified</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Expert release management on Google & Apple stores.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
