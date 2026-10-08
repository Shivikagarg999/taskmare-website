import React from 'react';
import { 
  Smartphone, 
  Sparkles, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Code2, 
  Terminal, 
  Database, 
  Cloud, 
  CheckCircle2, 
  Zap, 
  GitBranch, 
  Lock, 
  Award,
  RefreshCw
} from 'lucide-react';

interface TechMarqueeProps {
  onSelectItem?: (item: string) => void;
}

export const TechMarquee: React.FC<TechMarqueeProps> = ({ onSelectItem }) => {
  // Track 1: Technologies & Frameworks
  const techItems = [
    { name: 'Kotlin (Android Native)', category: 'Mobile', icon: Smartphone, color: 'text-emerald-500' },
    { name: 'Swift & SwiftUI (iOS)', category: 'Mobile', icon: Smartphone, color: 'text-amber-500' },
    { name: 'Flutter & Dart', category: 'Cross-Platform', icon: Layers, color: 'text-cyan-500' },
    { name: 'React Native', category: 'Mobile', icon: Code2, color: 'text-blue-500' },
    { name: 'Google Gemini AI', category: 'AI & GenAI', icon: Sparkles, color: 'text-purple-400' },
    { name: 'OpenAI GPT-4o', category: 'AI & GenAI', icon: Cpu, color: 'text-emerald-400' },
    { name: 'Next.js & React 19', category: 'Web & SaaS', icon: Layers, color: 'text-indigo-400' },
    { name: 'FastAPI & Python', category: 'Backend', icon: Terminal, color: 'text-teal-400' },
    { name: 'Node.js & Express', category: 'Backend', icon: Terminal, color: 'text-green-500' },
    { name: 'PostgreSQL & Drizzle', category: 'Database', icon: Database, color: 'text-blue-400' },
    { name: 'Redis Pub/Sub', category: 'Cache & Realtime', icon: Zap, color: 'text-red-500' },
    { name: 'Firebase Firestore', category: 'Cloud DB', icon: Cloud, color: 'text-amber-500' },
    { name: 'Docker & CI/CD', category: 'DevOps', icon: GitBranch, color: 'text-sky-400' },
    { name: 'Tailwind CSS', category: 'Styling', icon: Layers, color: 'text-cyan-400' },
  ];

  // Track 2: Core Guarantees & Production Standards from the Company Profile
  const standardItems = [
    { text: 'Built From Scratch', detail: 'Zero Recycled Templates', icon: Award },
    { text: '100% Code Ownership', detail: 'Full IP & Git Transfer', icon: Code2 },
    { text: 'Bilateral NDA Protected', detail: 'Strict Confidentiality', icon: Lock },
    { text: 'Direct Engineer Access', detail: 'No Middlemen PMs', icon: Terminal },
    { text: 'Play Store Submission', detail: '20-Tester & Policy Guidance', icon: Smartphone },
    { text: 'Apple App Store Review', detail: 'Strict HIG Adherence', icon: CheckCircle2 },
    { text: 'Milestone Engagement', detail: 'Clear Predictable Billing', icon: ShieldCheck },
    { text: 'Post-Launch Warranty', detail: '6 & 12 Month Support', icon: RefreshCw },
    { text: 'High-Throughput APIs', detail: '< 45ms Latency Core', icon: Zap },
    { text: 'Offline-First Sync', detail: 'Reliable Local SQLite', icon: Database },
  ];

  // Double items for seamless infinite scroll loop
  const duplicatedTech = [...techItems, ...techItems];
  const duplicatedStandards = [...standardItems, ...standardItems];

  const maskStyle = {
    maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
  };

  return (
    <section 
      aria-label="Capabilities and Technologies Marquee"
      className="relative py-7 sm:py-8 bg-neutral-100/60 dark:bg-neutral-950/80 border-y border-neutral-200/90 dark:border-neutral-800/90 overflow-hidden"
    >
      {/* Top micro-bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3 sm:mb-4 flex items-center justify-between text-[11px] font-mono tracking-wider text-neutral-500 dark:text-neutral-400">
        <div className="flex items-center gap-2 font-bold uppercase text-neutral-700 dark:text-neutral-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E11D48] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E11D48]" />
          </span>
          <span>Core Technology Stack &amp; Studio Standards</span>
        </div>
      </div>

      {/* Row 1: Technologies (Scroll Left) with Mask */}
      <div className="overflow-hidden py-1 flex items-center" style={maskStyle}>
        <div className="animate-marquee-left flex items-center gap-3">
          {duplicatedTech.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={`tech-${index}`}
                onClick={() => onSelectItem && onSelectItem(item.name)}
                className="group flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 shadow-2xs hover:border-[#E11D48]/60 dark:hover:border-[#E11D48]/60 transition-all cursor-pointer select-none active:scale-[0.98]"
              >
                <Icon className={`w-3.5 h-3.5 ${item.color} group-hover:scale-110 transition-transform shrink-0`} />
                <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 whitespace-nowrap group-hover:text-[#E11D48] transition-colors">
                  {item.name}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 uppercase">
                  {item.category}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 2: Production Standards & Guarantees (Scroll Right) with Mask */}
      <div className="overflow-hidden py-1 mt-2 flex items-center" style={maskStyle}>
        <div className="animate-marquee-right flex items-center gap-3">
          {duplicatedStandards.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={`std-${index}`}
                onClick={() => onSelectItem && onSelectItem(item.text)}
                className="group flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-white/90 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800/80 shadow-2xs hover:border-[#E11D48]/50 transition-all cursor-pointer select-none active:scale-[0.98]"
              >
                <div className="w-4 h-4 rounded-md bg-red-500/10 flex items-center justify-center shrink-0">
                  <Icon className="w-2.5 h-2.5 text-[#E11D48]" />
                </div>
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="text-xs font-bold text-neutral-900 dark:text-white">
                    {item.text}
                  </span>
                  <span className="text-neutral-300 dark:text-neutral-700">·</span>
                  <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">
                    {item.detail}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
