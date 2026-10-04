import React, { useState } from 'react';
import { PlatformChoice } from '../types';
import { Calculator, Check, ArrowRight, Clock, Banknote, Sparkles } from 'lucide-react';

interface CostEstimatorProps {
  onApplyEstimate: (data: {
    platform: PlatformChoice;
    budget: string;
    timeline: string;
    details: string;
  }) => void;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({ onApplyEstimate }) => {
  const [platform, setPlatform] = useState<PlatformChoice>('Both');
  const [tier, setTier] = useState<'mvp' | 'standard' | 'advanced'>('standard');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'User Auth & Profiles',
    'Push Notifications & Alerts',
  ]);

  const featureOptions = [
    { id: 'auth', name: 'User Auth & Mobile OTP (MSG91/Firebase)', timeDays: 3, priceInr: 8000 },
    { id: 'payment', name: 'Indian Payments (UPI, PhonePe, Razorpay, Cashfree)', timeDays: 4, priceInr: 12000 },
    { id: 'whatsapp', name: 'WhatsApp Cloud API & Auto-Notifications', timeDays: 3, priceInr: 9000 },
    { id: 'testers', name: 'Google Play 20-Tester Closed Track Guarantee', timeDays: 4, priceInr: 10000 },
    { id: 'ai', name: 'Bharat AI Assistant / Regional Voice Search', timeDays: 6, priceInr: 18000 },
    { id: 'admin', name: 'Admin Dashboard & Automated Invoicing UI', timeDays: 7, priceInr: 20000 },
    { id: 'offline', name: 'Offline Storage & Auto-Sync (for spotty 3G/4G)', timeDays: 4, priceInr: 10000 },
  ];

  const toggleFeature = (name: string) => {
    if (selectedFeatures.includes(name)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== name));
    } else {
      setSelectedFeatures([...selectedFeatures, name]);
    }
  };

  // Base calculations
  let baseDays = 14;
  let basePrice = 25000;

  if (platform === 'Android') {
    baseDays = 18;
    basePrice = 30000;
  } else if (platform === 'iOS') {
    baseDays = 20;
    basePrice = 35000;
  } else if (platform === 'Both') {
    baseDays = 28;
    basePrice = 50000;
  } else {
    baseDays = 21;
    basePrice = 40000;
  }

  if (tier === 'mvp') {
    baseDays = Math.round(baseDays * 0.8);
    basePrice = Math.round(basePrice * 0.85);
  } else if (tier === 'advanced') {
    baseDays = Math.round(baseDays * 1.4);
    basePrice = Math.round(basePrice * 1.5);
  }

  const extraDays = selectedFeatures.reduce((acc, featName) => {
    const f = featureOptions.find((o) => o.name === featName);
    return acc + (f ? f.timeDays : 0);
  }, 0);

  const extraPrice = selectedFeatures.reduce((acc, featName) => {
    const f = featureOptions.find((o) => o.name === featName);
    return acc + (f ? f.priceInr : 0);
  }, 0);

  const totalDays = baseDays + extraDays;
  const estimatedWeeks = Math.max(2, Math.ceil(totalDays / 7));
  const estimatedPriceTotal = basePrice + extraPrice;

  // Format budget tier string for inquiry form
  let budgetTierString = '₹25,000 – ₹50,000';
  if (estimatedPriceTotal < 35000) {
    budgetTierString = 'Under ₹35,000';
  } else if (estimatedPriceTotal <= 75000) {
    budgetTierString = '₹35,000 – ₹75,000';
  } else if (estimatedPriceTotal <= 150000) {
    budgetTierString = '₹75,000 – ₹1,50,000';
  } else {
    budgetTierString = '₹1,50,000+';
  }

  const timelineString = `Within ${estimatedWeeks}–${estimatedWeeks + 2} weeks`;

  const handleApply = () => {
    const details = `Estimated Project Scope: ${tier.toUpperCase()} ${platform} app with ${selectedFeatures.length} custom modules (${selectedFeatures.join(', ')}). Estimated delivery target: ~${estimatedWeeks} weeks.`;
    onApplyEstimate({
      platform,
      budget: budgetTierString,
      timeline: timelineString,
      details,
    });
  };

  return (
    <section
      id="estimator"
      aria-labelledby="estimator-heading"
      className="py-16 sm:py-24 bg-neutral-100/70 dark:bg-[#0F172A]/70 border-y border-neutral-200 dark:border-neutral-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-[#E11D48] dark:text-red-400 mb-2">
            <Calculator className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400">05</span>
            <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
            <span className="uppercase tracking-wider font-bold">Interactive Project Estimator</span>
          </div>
          <h2
            id="estimator-heading"
            className="text-3xl sm:text-4xl font-extrabold font-heading text-[#101827] dark:text-white tracking-tight"
          >
            Calculate Your Mobile App &amp; Software Development Estimate
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
            Select your target platform, development scope, and required modules to see an instant, transparent timeline and milestone budget estimate in INR (₹).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Configurator */}
          <div className="lg:col-span-7 bg-white dark:bg-neutral-900/90 p-6 sm:p-8 rounded-3xl border border-neutral-200/90 dark:border-neutral-800 shadow-sm space-y-7">
            {/* Step 1: Platform Selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-3">
                1. Select Target Platform
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {(['Android', 'iOS', 'Both', 'AI & Software'] as PlatformChoice[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPlatform(p)}
                    className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all text-center active:scale-[0.97] ${
                      platform === p
                        ? 'border-[#E11D48] bg-[#FFF1F2] dark:bg-red-950/40 text-[#E11D48] dark:text-red-300 shadow-xs'
                        : 'border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400'
                    }`}
                  >
                    {p === 'Both' ? 'Both (Android + iOS)' : p}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Complexity / Tier */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-3">
                2. Project Tier & Scope
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'mvp', title: 'MVP / Prototype', desc: 'Core features, fast validation' },
                  { id: 'standard', title: 'Standard Launch', desc: 'Complete product, ready for market' },
                  { id: 'advanced', title: 'Advanced Custom', desc: 'Deep custom logic & scaling' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTier(t.id as any)}
                    className={`p-3.5 rounded-xl text-left border transition-all active:scale-[0.97] ${
                      tier === t.id
                        ? 'border-[#E11D48] bg-[#FFF1F2] dark:bg-red-950/40 text-[#E11D48] dark:text-red-300 shadow-xs'
                        : 'border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400'
                    }`}
                  >
                    <div className="text-xs font-bold">{t.title}</div>
                    <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 leading-snug">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Key Modules */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-3">
                3. Choose Key Features & Integrations
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {featureOptions.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat.name);
                  return (
                    <button
                      key={feat.id}
                      type="button"
                      onClick={() => toggleFeature(feat.name)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border text-left text-xs transition-all active:scale-[0.98] ${
                        isChecked
                          ? 'border-[#E11D48]/60 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-semibold shadow-xs'
                          : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      <span className="pr-2">{feat.name}</span>
                      <div
                        className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 border ${
                          isChecked
                            ? 'bg-[#E11D48] border-[#E11D48] text-white'
                            : 'border-neutral-300 dark:border-neutral-600'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="card-elevated lg:col-span-5 sticky top-28 bg-[#101827] text-white p-7 sm:p-8 rounded-3xl shadow-2xl border border-neutral-800">
            <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E11D48]">
                Estimated Scope Summary
              </span>
              <span className="text-xs text-neutral-400 font-medium">
                Taskmare Labs Studio
              </span>
            </div>

            <div className="py-6 space-y-5">
              {/* Estimated Timeline */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-[#E11D48] shrink-0 border border-neutral-700/60">
                  <Clock className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 font-medium">Estimated Delivery Timeline</div>
                  <div className="text-2xl font-bold font-heading text-white mt-0.5 tabular-nums">
                    {estimatedWeeks} – {estimatedWeeks + 2} Weeks
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">
                    With weekly demo milestones & continuous testing
                  </div>
                </div>
              </div>

              {/* Estimated Investment Range */}
              <div className="flex items-start gap-3 pt-4 border-t border-neutral-800">
                <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-emerald-400 shrink-0 border border-neutral-700/60">
                  <Banknote className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 font-medium">Indicative Investment Range</div>
                  <div className="text-2xl font-bold font-heading text-white mt-0.5 tabular-nums">
                    {budgetTierString}
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">
                    Milestone-based escrow, pay as each stage is verified
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-800/80 border border-neutral-700/60 mb-6 text-xs text-neutral-300 space-y-1">
              <div className="flex items-center gap-1.5 text-white font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" />
                <span>Standard Inclusions For Indian Startups:</span>
              </div>
              <p>· 100% Full Source Code Ownership &amp; Indian Bilateral NDA</p>
              <p>· Transparent Milestone Invoicing &amp; Digital Estimates</p>
              <p>· Google Play 20-Tester Closed Track In-House Management</p>
              <p>· Free 30-Day Post-Launch Bug Warranty &amp; WhatsApp Support</p>
            </div>

            {/* Action Button */}
            <button
              type="button"
              onClick={handleApply}
              className="btn-tactile-primary w-full flex items-center justify-center gap-2 font-bold text-sm py-3.5 px-6 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Apply to Project Enquiry Form</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <p className="text-center text-[11px] text-neutral-400 mt-2.5">
              Zero obligation · Fast quote & technical feasibility review
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
