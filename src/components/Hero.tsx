import React, { useState, useEffect } from 'react';
import { BRAND, BRAND_ASSETS } from '../data/siteContent';
import { ArrowRight, MessageSquare, ShieldCheck, CheckCircle2, Smartphone, Terminal, Zap, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenEnquiry: (platform?: 'Android' | 'iOS' | 'Both') => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEnquiry }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, active: false });
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y, active: true });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0, active: false });
  };

  const tiltTransform = mousePos.active
    ? `perspective(1000px) rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg) scale3d(1.02, 1.02, 1.02)`
    : 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-[#FBFAF8] dark:bg-[#0B0F17]"
    >
      {/* Decorative ambient subtle glow with scroll parallax drift */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 w-[700px] h-[350px] bg-red-500/8 dark:bg-red-500/10 blur-[130px] rounded-full transition-transform duration-200 ease-out"
        style={{
          transform: `translate3d(-50%, ${scrollY * 0.18}px, 0)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Value Proposition & Focused CTAs */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            {/* Editorial Eyebrow */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider text-[#E11D48] dark:text-red-400">
              <span className="w-2 h-2 rounded-full bg-[#E11D48] animate-pulse shrink-0" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400">01</span>
              <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
              <span className="uppercase tracking-wider font-bold">Custom Software &amp; Mobile App Development Company</span>
              <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
              <span className="text-neutral-600 dark:text-neutral-300 font-medium">Pan-India Delivery</span>
            </div>

            {/* Main Headline */}
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight text-[#101827] dark:text-white leading-[1.08]"
            >
              Custom Mobile App &amp;{' '}
              <span className="text-[#E11D48] block sm:inline">Software Development Company in India</span>
            </h1>

            {/* Core Value Proposition Narrative */}
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl font-normal">
              We design and engineer custom Android mobile apps, iOS applications, Flutter builds, and custom business software from scratch. Speak directly with senior developers on WhatsApp, test interactive staging builds on your phone every two weeks, and own 100% of your source code from day one.
            </p>

            {/* Service Tags Pill */}
            <div className="flex flex-wrap gap-2 text-[11px] font-mono font-bold tracking-wider text-neutral-700 dark:text-neutral-300">
              {['CUSTOM SOFTWARE SERVICES', 'ANDROID APP DEVELOPMENT', 'iOS & FLUTTER APPS', 'AI SOFTWARE DEVELOPMENT', 'CUSTOM CRM / ERP', 'UPI & RAZORPAY'].map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800/90 border border-neutral-200/80 dark:border-neutral-700">
                  {tag}
                </span>
              ))}
            </div>

            {/* Compelling Call-to-Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenEnquiry()}
                className="btn-tactile-primary inline-flex items-center justify-center gap-2.5 font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48] cursor-pointer"
              >
                <span>Get Free Project Estimate (₹ INR)</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <a
                href="#demo-playground"
                className="inline-flex items-center justify-center gap-2 font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800/80 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all active:scale-[0.98]"
              >
                <Smartphone className="w-4 h-4 text-neutral-500 dark:text-neutral-400" aria-hidden="true" />
                <span>Try Live App Sandbox</span>
              </a>
            </div>

            {/* Understated Editorial Studio Metrics */}
            <div className="pt-6 border-t border-neutral-200/80 dark:border-neutral-800 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
              <span className="text-neutral-900 dark:text-white font-bold">50+ Apps Shipped Across India</span>
              <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
              <span className="text-neutral-900 dark:text-white font-bold">100% Source Code Ownership</span>
              <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
              <span className="text-neutral-900 dark:text-white font-bold">Direct WhatsApp Senior Engineer</span>
              <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">Milestone-Based Escrow Billing</span>
            </div>
          </div>

          {/* Right Column: Clean Architectural Graphic Frame with Rich Interactive Animations */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Animated Multi-Layer Backdrop Glow Halo */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 bg-gradient-to-tr from-red-600/30 via-red-500/15 to-amber-500/20 rounded-3xl blur-2xl animate-hero-pulse-glow pointer-events-none"
              />

              {/* Floating Levitation Outer Container */}
              <div className="animate-hero-float">
                
                {/* Floating Chip 1: Native Performance (Top-Left) */}
                <div 
                  className="absolute -top-4 -left-3 sm:-top-5 sm:-left-4 z-20 animate-hero-chip-1 pointer-events-none sm:pointer-events-auto transition-transform duration-200 ease-out"
                  style={{ transform: `translate3d(0, ${scrollY * -0.05}px, 0)` }}
                >
                  <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-neutral-200/90 dark:border-neutral-700/90 shadow-xl text-xs font-bold text-neutral-900 dark:text-white">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <Zap className="w-3.5 h-3.5 text-[#E11D48]" />
                    <span>60 FPS Native Performance</span>
                  </div>
                </div>

                {/* Floating Chip 2: NDA & Code Ownership (Bottom-Right) */}
                <div 
                  className="absolute -bottom-4 -right-2 sm:-bottom-5 sm:-right-4 z-20 animate-hero-chip-2 pointer-events-none sm:pointer-events-auto transition-transform duration-200 ease-out"
                  style={{ transform: `translate3d(0, ${scrollY * 0.06}px, 0)` }}
                >
                  <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-neutral-200/90 dark:border-neutral-700/90 shadow-xl text-xs font-bold text-neutral-900 dark:text-white">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>100% IP &amp; Bilateral NDA</span>
                  </div>
                </div>

                {/* Interactive 3D Parallax Tilt Card Frame */}
                <div
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    transform: tiltTransform,
                    transformStyle: 'preserve-3d',
                    transition: mousePos.active ? 'transform 0.12s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-3 sm:p-4 group cursor-pointer"
                >
                  <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-neutral-950">
                    <img
                      src={BRAND_ASSETS.heroGraphic}
                      alt="Taskmare Labs App Development Studio Workspace"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="eager"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/assets/taskmare/home-graphics.png';
                      }}
                    />
                    
                    {/* Dark gradient vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                    {/* Animated Light Reflection Sheen passing periodically */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none animate-hero-sheen"
                    />

                    {/* Subtle clean bottom bar caption with live sprint badge */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/90 bg-neutral-900/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 shadow-lg">
                      <span className="flex items-center gap-1.5 truncate">
                        <Terminal className="w-3.5 h-3.5 text-[#E11D48] shrink-0" />
                        <span className="truncate">Taskmare Labs Dev Studio</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold shrink-0">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                        </span>
                        Active Sprint
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
