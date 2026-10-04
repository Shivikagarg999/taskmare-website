import React, { useState } from 'react';
import { CASE_STUDIES, BRAND } from '../data/siteContent';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Layers, 
  Cpu, 
  ShoppingBag, 
  Gamepad2,
  Globe2, 
  ExternalLink,
  FileCheck,
  Server,
  Workflow,
  Clock,
  Sparkles,
  X,
  FileCode,
  Zap,
  ChevronRight,
  Database
} from 'lucide-react';
import { PlatformChoice } from '../types';

interface SocialProofSectionProps {
  onOpenEnquiry?: (platform?: PlatformChoice, prefillDetails?: string) => void;
}

type DomainCategory = 'All' | 'Gaming Apps' | 'Ecommerce' | 'AI Systems' | 'SaaS Web Apps';

interface ArchitectureNode {
  title: string;
  sub: string;
  type: 'client' | 'gateway' | 'compute' | 'storage' | 'external';
}

interface CaseStudyEnriched {
  id: string;
  domain: string;
  title: string;
  image?: string;
  clientDescriptor: string;
  confidentialityNote: string;
  challenge: string;
  solution: string;
  stack: string[];
  metrics: { highlight: string; description: string }[];
  keyDeliverable: string;
  heroStat: { value: string; label: string };
  architectureNodes: ArchitectureNode[];
  sprintMilestones: { phase: string; title: string; desc: string }[];
  technicalDecisions: { decision: string; rationale: string }[];
}

export const SocialProofSection: React.FC<SocialProofSectionProps> = ({ onOpenEnquiry }) => {
  const [activeDomain, setActiveDomain] = useState<DomainCategory>('All');
  const [selectedModalStudy, setSelectedModalStudy] = useState<CaseStudyEnriched | null>(null);

  // Enriched architectural details for interactive visualization
  const enrichedCaseStudies: CaseStudyEnriched[] = [
    {
      ...CASE_STUDIES[0], // Gaming
      heroStat: { value: '< 45ms', label: 'Fast Match Time' },
      architectureNodes: [
        { title: 'Flutter & Skia', sub: 'Native 60 FPS Client', type: 'client' },
        { title: 'WebSocket Cluster', sub: 'Low-latency Gateway', type: 'gateway' },
        { title: 'Authoritative Node', sub: 'Deterministic State Engine', type: 'compute' },
        { title: 'Redis Pub/Sub', sub: 'Instant Matchmaker', type: 'storage' },
        { title: 'Google Play IAP', sub: 'Anti-cheat Wallet Rails', type: 'external' }
      ],
      sprintMilestones: [
        { phase: 'Sprint 1', title: 'Socket Architecture & Sync', desc: 'Authoritative server reconciliation and zero-desync protocol.' },
        { phase: 'Sprint 2', title: '60 FPS Skia Rendering', desc: 'Hardware-accelerated UI with optimized thread isolation.' },
        { phase: 'Sprint 3', title: 'Tournament Engine', desc: 'Bracket matchmaking engine handling 10,000+ concurrent players.' },
        { phase: 'Sprint 4', title: 'Hardening & Play Store', desc: 'Keystore signing, anti-tamper bytecode obfuscation, and approval.' }
      ],
      technicalDecisions: [
        { decision: 'C++ Skia Engine instead of HTML5 WebViews', rationale: 'Eliminated frame drops completely on budget devices, ensuring steady 60 FPS rendering under heavy tournament loads.' },
        { decision: 'Authoritative Server Game Loop', rationale: 'Prevented client-side memory tampering and clock desynchronization between competing players.' }
      ]
    },
    {
      ...CASE_STUDIES[1], // Ecommerce
      heroStat: { value: '+52%', label: 'Higher Checkout' },
      architectureNodes: [
        { title: 'Native Flutter App', sub: 'Sub-1.1s Catalogue FCP', type: 'client' },
        { title: 'Edge CDN Caching', sub: 'WebP Compressed Assets', type: 'gateway' },
        { title: 'Node API Cluster', sub: 'Flash-sale Rate Limiting', type: 'compute' },
        { title: 'Redis Cart State', sub: 'Zero-session Timeout', type: 'storage' },
        { title: 'Razorpay / Stripe', sub: '1-Click Deep Linked Pay', type: 'external' }
      ],
      sprintMilestones: [
        { phase: 'Sprint 1', title: 'Frictionless Wireframing', desc: '1-click checkout flow tailored for Indian UPI and global card rails.' },
        { phase: 'Sprint 2', title: 'Image Pipeline & Cache', desc: 'Pre-fetching algorithms ensuring 60 FPS scrolling through 4,000+ SKUs.' },
        { phase: 'Sprint 3', title: 'Cart Recovery Automation', desc: 'Automated push notification sequences reclaiming abandoned sessions.' },
        { phase: 'Sprint 4', title: 'Dual Store Deployment', desc: 'First-attempt approval on both Apple App Store and Google Play in 48h.' }
      ],
      technicalDecisions: [
        { decision: 'Offline-First Catalog Caching', rationale: 'Allowed customers to browse seamlessly even on spotty 3G/4G connections without white screens.' },
        { decision: 'Direct Native Gateway SDKs', rationale: 'Bypassed web redirects entirely to achieve instantaneous UPI app opening.' }
      ]
    },
    {
      ...CASE_STUDIES[2], // SaaS
      heroStat: { value: '100%', label: 'Secure Workspaces' },
      architectureNodes: [
        { title: 'React 18 + TypeScript', sub: 'High-density SaaS UI', type: 'client' },
        { title: 'Kong / Nginx Proxy', sub: 'SSL & Token Validation', type: 'gateway' },
        { title: 'Express Worker Pool', sub: 'Async PDF/CSV Exporter', type: 'compute' },
        { title: 'PostgreSQL + RLS', sub: 'Row-Level Isolation', type: 'storage' },
        { title: 'Stripe Customer Portal', sub: 'Automated Tiered Billing', type: 'external' }
      ],
      sprintMilestones: [
        { phase: 'Sprint 1', title: 'Database Schema & RLS', desc: 'Tenant separation at the database kernel level with automated tenancy tests.' },
        { phase: 'Sprint 2', title: 'Role-Based UI Workspaces', desc: 'Granular permissions for Super-Admins, Managers, and Staff members.' },
        { phase: 'Sprint 3', title: 'Stripe Lifecycle Billing', desc: 'Automated prorations, trial upgrades, and digital invoice generation.' },
        { phase: 'Sprint 4', title: 'Enterprise Audit Logs', desc: 'SOC2-ready activity audit trail and encrypted database backups.' }
      ],
      technicalDecisions: [
        { decision: 'Database Row-Level Security (RLS) over application-level checks', rationale: 'Guaranteed impossible cross-tenant data leakage even in the event of an edge-case application query bug.' },
        { decision: 'Background Worker Daemon for Reporting', rationale: 'Prevented heavy CSV/PDF analytics queries from locking interactive customer dashboards.' }
      ]
    },
    {
      ...CASE_STUDIES[3], // AI
      heroStat: { value: '71%', label: 'Automated Inquiries' },
      architectureNodes: [
        { title: 'Conversational SDK', sub: 'Voice & Text Interface', type: 'client' },
        { title: 'FastAPI Whisper Proxy', sub: 'Voice-to-Text Pipeline', type: 'gateway' },
        { title: 'Gemini Multimodal AI', sub: 'Structured Reasoning Engine', type: 'compute' },
        { title: 'Pinecone Vector DB', sub: 'Grounded Live Inventory', type: 'storage' },
        { title: 'Warehouse ERP', sub: 'Automated PO Generation', type: 'external' }
      ],
      sprintMilestones: [
        { phase: 'Sprint 1', title: 'Knowledge Vectorization', desc: 'Embedding 15,000+ wholesale catalog items and dynamic pricing rules.' },
        { phase: 'Sprint 2', title: 'Audio Transcription Pipeline', desc: 'Regional dialect parsing converting raw voice memos to structured JSON.' },
        { phase: 'Sprint 3', title: 'Hallucination Guardrails', desc: 'Strict verification preventing the AI from quoting unverified inventory levels.' },
        { phase: 'Sprint 4', title: 'Production ERP Integration', desc: 'One-click operator approval dashboard generating ready-to-ship invoices.' }
      ],
      technicalDecisions: [
        { decision: 'Hybrid Keyword + Vector Search (RAG)', rationale: 'Eliminated SKU part-number hallucinations that purely semantic vector searches occasionally produced.' },
        { decision: 'Streaming Token Architecture', rationale: 'Reduced perceived client wait time to 850ms, mimicking human conversational speed.' }
      ]
    }
  ];

  const filteredStudies = enrichedCaseStudies.filter((item) => {
    if (activeDomain === 'All') return true;
    return item.domain === activeDomain;
  });

  const getDomainIcon = (domain: string) => {
    switch (domain) {
      case 'Gaming Apps':
        return <Gamepad2 className="w-4 h-4 text-amber-500" />;
      case 'Ecommerce':
        return <ShoppingBag className="w-4 h-4 text-emerald-500" />;
      case 'SaaS Web Apps':
        return <Globe2 className="w-4 h-4 text-sky-500" />;
      case 'AI Systems':
        return <Cpu className="w-4 h-4 text-purple-500" />;
      default:
        return <Layers className="w-4 h-4 text-[#E11D48]" />;
    }
  };

  const getDomainBadgeColor = (domain: string) => {
    switch (domain) {
      case 'Gaming Apps':
        return 'border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30';
      case 'Ecommerce':
        return 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30';
      case 'SaaS Web Apps':
        return 'border-sky-500/30 text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/30';
      case 'AI Systems':
        return 'border-purple-500/30 text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30';
      default:
        return 'border-red-500/30 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30';
    }
  };

  const handleInquireFromStudy = (study: CaseStudyEnriched) => {
    const platform: PlatformChoice = study.domain === 'SaaS Web Apps' ? 'Both' : study.domain === 'Gaming Apps' ? 'Both' : 'Both';
    const detail = `Inquiring about architecture similar to Case Study: ${study.title} (${study.domain}). Key stack: ${study.stack.slice(0, 3).join(', ')}.`;
    if (onOpenEnquiry) {
      onOpenEnquiry(platform, detail);
    }
  };

  return (
    <section
      id="reviews"
      aria-labelledby="case-studies-heading"
      className="py-16 sm:py-24 bg-[#FBFAF8] dark:bg-[#0B0F17] border-t border-neutral-200/80 dark:border-neutral-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Explicit NDA Safeguard */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
            <Lock className="w-3.5 h-3.5 shrink-0" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500">04</span>
            <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
            <span className="uppercase tracking-wider font-bold">Client Success Stories</span>
            <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
            <span className="text-neutral-500 dark:text-neutral-400 font-medium">Bilateral NDA Protected</span>
          </div>
          <h2
            id="case-studies-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101827] dark:text-white tracking-tight font-heading"
          >
            Real projects. Real business results.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
            See how we helped clients launch custom mobile apps, web platforms, and AI tools with measurable speed, reliability, and growth.
          </p>
        </div>

        {/* Domain Filter Bar with Live Counts */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {(['All', 'Gaming Apps', 'Ecommerce', 'SaaS Web Apps', 'AI Systems'] as const).map((domain) => {
            const isActive = activeDomain === domain;
            const count = domain === 'All' 
              ? enrichedCaseStudies.length 
              : enrichedCaseStudies.filter(s => s.domain === domain).length;
            return (
              <button
                key={domain}
                type="button"
                onClick={() => setActiveDomain(domain)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 active:scale-[0.97] ${
                  isActive
                    ? 'btn-tactile-primary shadow-md shadow-red-500/20'
                    : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <span>{domain}</span>
                <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono ${
                  isActive ? 'bg-white/20 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Simplified 2-Column Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {filteredStudies.map((study) => (
            <article
              key={study.id}
              className="card-elevated rounded-2xl bg-white dark:bg-[#111726] border border-neutral-200/90 dark:border-neutral-800/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between hover:border-[#E11D48]/30 group"
            >
              {/* Card Visual Hero Image Preview */}
              {study.image && (
                <div 
                  onClick={() => setSelectedModalStudy(study)}
                  className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-950 cursor-pointer"
                >
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/20 to-transparent pointer-events-none" />
                  
                  {/* Floating Domain & Client Chips on Image */}
                  <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-neutral-900/90 backdrop-blur-md text-white border border-white/10 shadow-sm">
                      {getDomainIcon(study.domain)}
                      <span>{study.domain}</span>
                    </span>
                    <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-neutral-900/80 backdrop-blur-md text-neutral-300 border border-white/10">
                      {study.clientDescriptor}
                    </span>
                  </div>

                  {/* Impact Highlight Badge on Top Right */}
                  <div className="absolute top-3 right-3 text-right shrink-0 bg-neutral-900/90 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-xl shadow-lg z-10">
                    <div className="text-sm sm:text-base font-black text-[#E11D48] dark:text-red-400 leading-none">
                      {study.heroStat.value}
                    </div>
                    <div className="text-[9px] font-mono text-neutral-300 mt-0.5">
                      {study.heroStat.label}
                    </div>
                  </div>

                  {/* Title overlay on bottom of image */}
                  <div className="absolute bottom-3 left-4 right-4 z-10">
                    <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight leading-snug drop-shadow-sm group-hover:text-red-400 transition-colors">
                      {study.title}
                    </h3>
                  </div>
                </div>
              )}

              {/* Fallback Header Strip when no image */}
              {!study.image && (
                <div className="p-5 sm:p-6 pb-4 border-b border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-900/40">
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 shadow-2xs">
                        {getDomainIcon(study.domain)}
                        <span>{study.domain}</span>
                      </span>
                      <span className="text-neutral-500 dark:text-neutral-400 font-medium">
                        {study.clientDescriptor}
                      </span>
                    </div>

                    <div className="text-right shrink-0 bg-red-50 dark:bg-red-950/40 border border-red-200/60 dark:border-red-900/50 px-3 py-1.5 rounded-xl">
                      <div className="text-base sm:text-lg font-black text-[#E11D48] dark:text-red-400 leading-none">
                        {study.heroStat.value}
                      </div>
                      <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 mt-0.5">
                        {study.heroStat.label}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-snug">
                    {study.title}
                  </h3>
                </div>
              )}

              {/* Card Body: Clear Challenge, What We Built, and Results */}
              <div className="p-5 sm:p-6 space-y-4 flex-1">
                {/* Challenge */}
                <div className="space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                    <span>The Challenge</span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                    {study.challenge}
                  </p>
                </div>

                {/* What We Built */}
                <div className="space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>What We Engineered</span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                    {study.solution}
                  </p>
                </div>

                {/* Key Results */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block mb-2">
                    Verified Outcomes
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {study.metrics.map((m, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800">
                        <div className="text-xs font-black text-neutral-900 dark:text-white truncate">
                          {m.highlight}
                        </div>
                        <div className="text-[10px] text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5">
                          {m.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Chips */}
                <div className="pt-1 flex flex-wrap gap-1.5">
                  {study.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md text-[11px] font-mono font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-5 sm:px-6 py-4 border-t border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/40 dark:bg-neutral-900/30 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedModalStudy(study)}
                  className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors underline-offset-4 hover:underline"
                >
                  Technical Details →
                </button>

                <button
                  type="button"
                  onClick={() => handleInquireFromStudy(study)}
                  className="btn-tactile-primary px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48]"
                >
                  <span>Inquire Similar App</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Mutual NDA & Private Code Inspection Commitment Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/40 text-[#E11D48] flex items-center justify-center shrink-0 mt-0.5 border border-red-200/60 dark:border-red-900/40">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                Need to review code samples under bilateral NDA?
              </h4>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
                We provide sanitized code walkthroughs, architecture diagrams, and test suite reports for enterprise teams and funded founders who require technical due diligence before signing.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full lg:w-auto">
            {onOpenEnquiry && (
              <button
                type="button"
                onClick={() => onOpenEnquiry('Both', 'Requesting bilateral NDA and private architectural code walkthrough.')}
                className="btn-tactile-primary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48]"
              >
                <FileCheck className="w-4 h-4" />
                <span>Request Mutual NDA & Scope</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            )}
          </div>
        </div>

      </div>

      {/* DETAILED TECHNICAL CASE STUDY MODAL */}
      {selectedModalStudy && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-neutral-950/80 backdrop-blur-sm animate-in fade-in"
        >
          <div
            className="fixed inset-0"
            onClick={() => setSelectedModalStudy(null)}
            aria-hidden="true"
          />

          <div className="relative w-full max-w-3xl bg-white dark:bg-[#111726] rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto z-10 custom-scrollbar space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-neutral-200 dark:border-neutral-800 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400">
                  {getDomainIcon(selectedModalStudy.domain)}
                  <span>{selectedModalStudy.domain}</span>
                  <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
                  <span className="text-[#E11D48] dark:text-red-400">Verified Architecture</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">
                  {selectedModalStudy.title}
                </h3>
                <p className="text-xs text-neutral-500 font-mono">
                  {selectedModalStudy.clientDescriptor} · Bilateral NDA Protected
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedModalStudy(null)}
                className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-600 dark:text-neutral-300 transition-colors active:scale-95"
                aria-label="Close case study details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Preview Banner */}
            {selectedModalStudy.image && (
              <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                <img
                  src={selectedModalStudy.image}
                  alt={selectedModalStudy.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-white">
                  <span className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" />
                    {selectedModalStudy.keyDeliverable}
                  </span>
                </div>
              </div>
            )}

            {/* Modal Metrics Grid */}
            <div className="grid grid-cols-3 gap-3">
              {selectedModalStudy.metrics.map((m, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <div className="text-lg font-black text-neutral-900 dark:text-white">{m.highlight}</div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5">{m.description}</div>
                </div>
              ))}
            </div>

            {/* Deep Technical Analysis */}
            <div className="space-y-4 text-xs sm:text-sm">
              <div>
                <h4 className="font-bold uppercase tracking-wider text-neutral-400 text-xs mb-1.5">
                  The Technical Challenge & Constraints
                </h4>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
                  {selectedModalStudy.challenge}
                </p>
              </div>

              <div>
                <h4 className="font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 text-xs mb-1.5">
                  Engineered Solution & Code Deliverables
                </h4>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
                  {selectedModalStudy.solution}
                </p>
              </div>

              <div>
                <h4 className="font-bold uppercase tracking-wider text-neutral-400 text-xs mb-1.5">
                  Complete Production Architecture
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedModalStudy.stack.map(s => (
                    <span key={s} className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 font-mono text-xs text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* End-to-End Distributed Architecture Flow */}
              <div className="pt-2">
                <h4 className="font-bold uppercase tracking-wider text-neutral-400 text-xs mb-2">
                  Distributed Topology & Infrastructure Nodes
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {selectedModalStudy.architectureNodes.map((node, i) => (
                    <div
                      key={node.title}
                      className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono text-[#E11D48] font-bold">0{i + 1}</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                          {node.type}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                        {node.title}
                      </div>
                      <div className="text-[11px] font-mono text-[#E11D48] truncate">
                        {node.sub}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engineering Decisions Log */}
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                  Key Engineering Decisions & Rationales
                </h4>
                <div className="space-y-2.5">
                  {selectedModalStudy.technicalDecisions.map((item, idx) => (
                    <div key={idx} className="text-xs">
                      <p className="font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{item.decision}</span>
                      </p>
                      <p className="text-neutral-500 dark:text-neutral-400 pl-5 mt-0.5">
                        {item.rationale}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4-Phase Delivery Milestones */}
              <div>
                <h4 className="font-bold uppercase tracking-wider text-neutral-400 text-xs mb-2">
                  Sprint Delivery Progression
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {selectedModalStudy.sprintMilestones.map((m) => (
                    <div key={m.phase} className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1">
                      <span className="font-mono text-[10px] font-bold text-[#E11D48] uppercase block">{m.phase}</span>
                      <h5 className="text-xs font-bold text-neutral-900 dark:text-white truncate">{m.title}</h5>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-2">{m.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Action Buttons */}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-neutral-400 font-mono">
                Full intellectual property & source code transferred.
              </span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedModalStudy(null)}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const study = selectedModalStudy;
                    setSelectedModalStudy(null);
                    handleInquireFromStudy(study);
                  }}
                  className="btn-tactile-primary flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48]"
                >
                  <span>Build This System</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
