import React, { useState } from 'react';
import { BRAND_ASSETS } from '../data/siteContent';
import { 
  ArrowRight, 
  Maximize2, 
  X, 
  Check, 
  Sparkles,
  Eye,
  Compass,
  Palette,
  Terminal,
  ShieldCheck,
  Rocket,
  Zap,
  Code2,
  Lock,
  GitBranch,
  Users,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Layers,
  Award
} from 'lucide-react';

interface WhyChooseUsProps {
  onOpenEnquiry: () => void;
}

type WhyUsTab = 'guarantees' | 'comparison' | 'process';

interface StudioGuarantee {
  id: string;
  tag: string;
  title: string;
  summary: string;
  icon: React.ElementType;
  accent: string;
  highlights: string[];
  deliverableProof: string;
}

interface StepDetail {
  number: string;
  name: string;
  badge: string;
  timeline: string;
  deliverable: string;
  icon: React.ElementType;
  highlights: string[];
}

const STUDIO_GUARANTEES: StudioGuarantee[] = [
  {
    id: 'scratch-built',
    tag: 'Engineering Purity',
    title: '100% Scratch-Built Architecture',
    summary: 'Every line of Swift, Kotlin, React, or Python is written custom for your product specification. Zero recycled themes, zero sluggish WebViews, zero third-party template lock-in.',
    icon: Code2,
    accent: 'text-[#E11D48]',
    highlights: [
      'Sub-16ms native frame times (solid 60/120 FPS)',
      'Strict TypeScript & typed backend data contracts',
      'Clean modular architecture ready for your future in-house team'
    ],
    deliverableProof: 'Production Git repository with clean architecture documentation.'
  },
  {
    id: 'direct-access',
    tag: 'No Middlemen',
    title: 'Direct Senior Engineer Line',
    summary: 'You communicate directly with the senior engineers writing your codebase via WhatsApp, Slack, and weekly Google Meet demos. No account managers or sales translation errors.',
    icon: Users,
    accent: 'text-emerald-400',
    highlights: [
      'Real-time WhatsApp & Slack developer workspace',
      'Immediate technical answers without multi-day PM delays',
      'Weekly interactive sprint builds you can test on real devices'
    ],
    deliverableProof: 'Direct engineer access with weekly live deployment walkthroughs.'
  },
  {
    id: 'ip-ownership',
    tag: 'Total Ownership',
    title: '100% IP & Git Transfer from Day 1',
    summary: 'You own every asset from the moment it is written. Bilateral NDA signed before kickoff, GitHub organization transfer, and zero proprietary agency licensing fees.',
    icon: Lock,
    accent: 'text-sky-400',
    highlights: [
      'Bilateral Mutual Non-Disclosure Agreement (Indian legal NDA)',
      'Transparent milestone invoicing with fixed INR (₹) sprint pricing',
      'Direct GitHub organization admin collaborator & transfer rights',
      'Figma design tokens, environment variables & cloud key handoff'
    ],
    deliverableProof: 'Complete intellectual property assignment & sovereign repository rights.'
  },
  {
    id: 'store-approval',
    tag: 'Store Clearance',
    title: 'Guaranteed App Store Launch Clearance',
    summary: 'We handle all Google Play Console 20-tester requirements, Apple App Store Connect provisioning, privacy manifests, and human reviewer guideline compliance.',
    icon: Award,
    accent: 'text-amber-400',
    highlights: [
      'Full closed-track testing with 20 real device testers managed',
      'Apple Human Interface & Google Play policy pre-audits',
      'Zero-cost rejection remediation guarantee until your app is live'
    ],
    deliverableProof: 'Live production releases on Google Play and Apple App Store.'
  }
];

const COMPARISON_ROWS = [
  {
    aspect: 'Code Architecture',
    taskmare: '100% scratch-built native code tailored to your exact product spec',
    agencies: 'Often repackaged boilerplate or recycled themes with high markup',
    freelancers: 'Inconsistent quality, frequently copied or unmaintained snippets'
  },
  {
    aspect: 'Communication',
    taskmare: 'Direct line to senior developer on WhatsApp, Slack & weekly Google Meet',
    agencies: 'Filtered through junior account managers & non-technical sales reps',
    freelancers: 'Timezone gaps, slow replies, and risk of ghosting mid-sprint'
  },
  {
    aspect: 'Git & IP Ownership',
    taskmare: 'Full GitHub repository ownership & bilateral NDA from Day 1',
    agencies: 'Code held as hostage until final invoice or locked in proprietary CMS',
    freelancers: 'Vague licensing terms with no formal intellectual property assignment'
  },
  {
    aspect: 'Pricing & Sprints',
    taskmare: 'Transparent milestone pricing tied strictly to working deliverables',
    agencies: 'Bloated hourly retainers with constant scope-creep overages',
    freelancers: 'Unpredictable hourly billing or abandoned low-bid projects'
  },
  {
    aspect: 'Store Approval Guarantee',
    taskmare: 'Complete 20-tester Play Store track & Apple approval included',
    agencies: 'Billed as a high extra add-on service ($2,000+ line item)',
    freelancers: 'Typically drops off once APK/IPA is delivered, leaving you to handle rejections'
  },
  {
    aspect: 'Post-Launch Warranty',
    taskmare: 'Included technical bug-fix warranty & direct developer hotline',
    agencies: 'Expensive recurring monthly maintenance contracts ($3k+/mo)',
    freelancers: 'Zero availability once contract closes; hard to re-engage'
  }
];

const LIFECYCLE_STEPS: StepDetail[] = [
  {
    number: '01',
    name: 'Plan & Discovery',
    badge: 'Discovery & Schemas',
    timeline: 'Sprint 1 (Days 1–5)',
    deliverable: 'Clickable PRD, Database ERD & Architecture Spec',
    icon: Compass,
    highlights: ['Bilateral NDA execution', 'Database schema modeling', 'Milestone timeline agreement']
  },
  {
    number: '02',
    name: 'UI/UX Design',
    badge: 'Prototyping',
    timeline: 'Sprint 2 (Days 6–12)',
    deliverable: 'Production Figma UI with Design System & User Flows',
    icon: Palette,
    highlights: ['Native iOS & Android components', 'Dark & Light mode tokens', 'Interactive prototype review']
  },
  {
    number: '03',
    name: 'Native Build',
    badge: 'Core Engineering',
    timeline: 'Sprints 3–5 (Weeks 2–6)',
    deliverable: 'Bi-Weekly Staging Releases on TestFlight & Firebase App Distribution',
    icon: Terminal,
    highlights: ['Kotlin / Swift / Next.js', 'Real-time WebSocket/REST APIs', 'Bi-weekly testable builds']
  },
  {
    number: '04',
    name: 'Quality & Audit',
    badge: 'Security & QA',
    timeline: 'Sprint 6 (Week 6–7)',
    deliverable: '100% Policy Clearance & Security Pen-Test Report',
    icon: ShieldCheck,
    highlights: ['Device fragmentation testing', 'Google Play policy pre-check', 'Sub-16ms latency profiling']
  },
  {
    number: '05',
    name: 'Store Launch',
    badge: 'Production Live',
    timeline: 'Sprint 7 (Week 7–8)',
    deliverable: 'Live Google Play & Apple App Store Production Releases',
    icon: Rocket,
    highlights: ['20-tester closed track complete', 'Store listing metadata setup', 'Production cloud scaling']
  },
  {
    number: '06',
    name: 'Scale & Armor',
    badge: 'Post-Launch Care',
    timeline: 'Ongoing Support',
    deliverable: 'Included Warranty & Direct Engineer Maintenance Hotline',
    icon: Zap,
    highlights: ['Zero-cost bug remediation', 'OS update compatibility', 'Continuous direct developer support']
  }
];

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenEnquiry }) => {
  const [activeTab, setActiveTab] = useState<WhyUsTab>('guarantees');
  const [activeStep, setActiveStep] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const currentStep = LIFECYCLE_STEPS[activeStep];
  const StepIcon = currentStep.icon;

  return (
    <section
      id="why-us"
      aria-labelledby="why-us-heading"
      className="py-16 sm:py-24 bg-[#090D14] text-white relative overflow-hidden border-b border-neutral-800/80"
    >
      {/* Subtle ambient red/crimson glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 right-10 w-[550px] h-[350px] bg-[#E11D48]/8 blur-[140px] rounded-full"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Purpose-Driven & Convincing */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[#E11D48] text-xs font-mono font-bold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>05 · Why Choose Our Software Development Company</span>
            </div>
            <h2
              id="why-us-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight"
            >
              Why founders choose our{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E11D48] to-rose-400">
                software development company.
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-400 leading-relaxed font-normal">
              We combine senior engineering speed with predictable, milestone-based delivery in INR (₹). You get direct access to developers, bi-weekly testable builds, 100% source code ownership, and zero agency bureaucracy.
            </p>
          </div>

          {/* Interactive Mode Navigation Switcher */}
          <div className="flex items-center gap-1.5 p-1.5 bg-neutral-900/90 border border-neutral-800 rounded-2xl shrink-0 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('guarantees')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'guarantees'
                  ? 'bg-[#E11D48] text-white shadow-md shadow-[#E11D48]/20'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Core Guarantees</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('comparison')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'comparison'
                  ? 'bg-[#E11D48] text-white shadow-md shadow-[#E11D48]/20'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Comparison Matrix</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('process')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'process'
                  ? 'bg-[#E11D48] text-white shadow-md shadow-[#E11D48]/20'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>6-Step Roadmap</span>
            </button>
          </div>
        </div>

        {/* TAB 1: 4 CORE STUDIO GUARANTEES */}
        {activeTab === 'guarantees' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {STUDIO_GUARANTEES.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="p-6 sm:p-7 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-[#E11D48]/40 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl"
                  >
                    <div>
                      {/* Top Bar with Icon & Tag */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-neutral-800/90 border border-neutral-700/80 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                            <Icon className={`w-5 h-5 ${item.accent}`} />
                          </div>
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                            {item.tag}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md bg-neutral-800 text-emerald-400 border border-emerald-500/20">
                          Verified Standard
                        </span>
                      </div>

                      <h3 className="text-xl font-extrabold text-white tracking-tight mb-2 group-hover:text-[#E11D48] transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-sm text-neutral-300 leading-relaxed font-normal mb-5">
                        {item.summary}
                      </p>

                      {/* Bullet Highlights */}
                      <div className="space-y-2 pt-4 border-t border-neutral-800">
                        {item.highlights.map((hl, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-300">
                            <CheckCircle2 className="w-4 h-4 text-[#E11D48] shrink-0 mt-0.5" />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Deliverable Proof Badge */}
                    <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs font-mono text-neutral-400">
                      <span className="text-[11px] truncate text-neutral-400">
                        Proof: <strong className="text-white font-medium">{item.deliverableProof}</strong>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Quick Callout */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#E11D48]/10 border border-[#E11D48]/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#E11D48]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">
                    Need a signed bilateral legal NDA &amp; project quote before sharing your pitch?
                  </div>
                  <div className="text-xs text-neutral-400">
                    We execute our bilateral mutual legal NDA within 2 business hours.
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenEnquiry}
                className="btn-tactile-primary px-5 py-2.5 rounded-xl text-xs font-bold shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Request NDA &amp; Scope Call (₹ INR)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: DETAILED COMPARISON MATRIX */}
        {activeTab === 'comparison' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="rounded-2xl bg-neutral-900/90 border border-neutral-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[640px]">
                  <thead>
                    <tr className="border-b border-neutral-800 bg-neutral-950/80 text-xs font-mono uppercase tracking-wider text-neutral-400">
                      <th className="py-4 px-5 font-bold">Evaluation Criteria</th>
                      <th className="py-4 px-5 font-bold text-white bg-[#E11D48]/10 border-x border-[#E11D48]/20">
                        <span className="flex items-center gap-1.5 text-[#E11D48]">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Taskmare Labs</span>
                        </span>
                      </th>
                      <th className="py-4 px-5 font-bold text-neutral-400">Traditional Agency</th>
                      <th className="py-4 px-5 font-bold text-neutral-400">Freelance Marketplaces</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800 text-neutral-300">
                    {COMPARISON_ROWS.map((row, idx) => (
                      <tr key={idx} className="hover:bg-neutral-800/30 transition-colors">
                        <td className="py-4 px-5 font-bold text-white text-xs sm:text-sm">
                          {row.aspect}
                        </td>
                        <td className="py-4 px-5 bg-[#E11D48]/5 border-x border-[#E11D48]/15 font-semibold text-white">
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{row.taskmare}</span>
                          </div>
                        </td>
                        <td className="py-4 px-5 text-neutral-400">
                          <div className="flex items-start gap-2">
                            <XCircle className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                            <span>{row.agencies}</span>
                          </div>
                        </td>
                        <td className="py-4 px-5 text-neutral-400">
                          <div className="flex items-start gap-2">
                            <XCircle className="w-4 h-4 text-rose-500/70 shrink-0 mt-0.5" />
                            <span>{row.freelancers}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-400">
              <span>Looking for a transparent software studio that works like an extension of your own company?</span>
              <button
                type="button"
                onClick={onOpenEnquiry}
                className="btn-tactile-primary px-5 py-2.5 rounded-xl font-bold text-xs shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Discuss Your Project With an Engineer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: THE CONNECTED 6-STEP ROADMAP & INFOGRAPHIC */}
        {activeTab === 'process' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="rounded-2xl bg-neutral-900/90 border border-neutral-800 p-5 sm:p-8 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left: Official Lifecycle Infographic Diagram */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3 text-xs font-mono">
                    <span className="text-neutral-400">Official Lifecycle Diagram</span>
                    <button
                      type="button"
                      onClick={() => setIsZoomed(true)}
                      className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#E11D48]" />
                      <span>Inspect HD</span>
                      <Maximize2 className="w-3 h-3 ml-0.5" />
                    </button>
                  </div>

                  <div 
                    onClick={() => setIsZoomed(true)}
                    className="relative rounded-xl overflow-hidden bg-black/70 border border-neutral-800 p-4 flex items-center justify-center cursor-pointer group hover:border-[#E11D48]/40 transition-all"
                  >
                    <img
                      src={BRAND_ASSETS.aboutPlan}
                      alt="Taskmare Labs full product development lifecycle roadmap infographic"
                      className="w-full h-auto max-h-64 object-contain group-hover:scale-[1.02] transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  </div>
                  <p className="text-[11px] font-mono text-neutral-500 mt-2 text-center">
                    Click diagram to view full-resolution roadmap
                  </p>
                </div>

                {/* Right: Interactive 6-Step Controller */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  {/* Step Navigation Pills */}
                  <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-3 gap-2 mb-5">
                    {LIFECYCLE_STEPS.map((step, idx) => {
                      const isActive = activeStep === idx;
                      const Icon = step.icon;
                      return (
                        <button
                          key={step.number}
                          type="button"
                          onClick={() => setActiveStep(idx)}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                            isActive
                              ? 'border-[#E11D48] bg-red-500/10 text-white shadow-sm'
                              : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:text-white hover:border-neutral-700'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#E11D48]">
                            <span>{step.number}</span>
                            <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#E11D48]' : 'text-neutral-500'}`} />
                          </div>
                          <div className="text-xs font-bold text-white mt-1 truncate">
                            {step.name}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Step Clean Details Card */}
                  <div className="p-5 sm:p-6 rounded-xl bg-neutral-950 border border-neutral-800">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#E11D48]">
                          PHASE {currentStep.number} · {currentStep.name.toUpperCase()}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                          {currentStep.badge}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{currentStep.timeline}</span>
                      </span>
                    </div>

                    <div className="text-base sm:text-lg font-bold text-white mb-2">
                      {currentStep.deliverable}
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-neutral-800/80">
                      {currentStep.highlights.map(hl => (
                        <span 
                          key={hl}
                          className="inline-flex items-center gap-1.5 text-xs text-neutral-300"
                        >
                          <Check className="w-3.5 h-3.5 text-[#E11D48]" />
                          <span>{hl}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-5 flex justify-end">
                    <button
                      type="button"
                      onClick={onOpenEnquiry}
                      className="btn-tactile-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold shadow-md cursor-pointer"
                    >
                      <span>Build With This Process</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Global Bottom Trust Anchors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-neutral-800/60 text-xs text-neutral-400 font-mono">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-[#E11D48] shrink-0" />
            <span>100% Scratch-built native architecture</span>
          </div>
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Direct senior developer communication</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-sky-400 shrink-0" />
            <span>100% Git IP &amp; Bilateral NDA</span>
          </div>
        </div>

      </div>

      {/* High-Resolution Full-Screen Modal Lightbox for Infographic */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsZoomed(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Product Lifecycle Roadmap Diagram"
        >
          <div 
            className="relative max-w-2xl w-full max-h-[92vh] bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-800 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
              <div>
                <h4 className="font-bold text-sm sm:text-base text-white">
                  Full-Lifecycle Product Journey Roadmap
                </h4>
                <p className="text-xs text-neutral-400 font-mono">
                  Plan · Design · Develop · Audit · Launch · Scale
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsZoomed(false)}
                className="p-2 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white hover:bg-[#E11D48] transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-4 sm:p-6 bg-neutral-950 flex justify-center">
              <img
                src={BRAND_ASSETS.aboutPlan}
                alt="Our steps: plan, design, develop, test, launch and support"
                className="w-full max-w-lg h-auto object-contain rounded-xl shadow-lg border border-neutral-800"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
