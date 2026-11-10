import React, { useState, useEffect } from 'react';
import { BRAND_ASSETS } from '../data/siteContent';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenEnquiry: (platform?: 'Android' | 'iOS' | 'Both') => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEnquiry }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-[#FBFAF8] dark:bg-[#0B0F17]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 w-[700px] h-[350px] bg-red-500/8 dark:bg-red-500/10 blur-[130px] rounded-full transition-transform duration-200 ease-out"
        style={{
          transform: `translate3d(-50%, ${scrollY * 0.18}px, 0)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight text-[#101827] dark:text-white leading-[1.08]"
            >
              Custom Mobile App &amp;{' '}
              <span className="text-[#E11D48] block sm:inline">Software Development Company in India</span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl font-normal">
              We design and engineer custom Android mobile apps, iOS applications, Flutter builds, and custom business software from scratch. Speak directly with senior developers on WhatsApp, test interactive staging builds on your phone every two weeks, and own 100% of your source code from day one.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenEnquiry()}
                className="btn-tactile-primary inline-flex items-center justify-center gap-2.5 font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48] cursor-pointer"
              >
                <span>Get Free Project Estimate (₹ INR)</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-950 shadow-2xl">
                <img
                  src={BRAND_ASSETS.heroGraphic}
                  alt="Taskmare Labs development workspace"
                  className="w-full h-full object-cover"
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/assets/taskmare/home-graphics.png';
                  }}
                />

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
