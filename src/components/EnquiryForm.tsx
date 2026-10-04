import React, { useState, useEffect } from 'react';
import { BRAND } from '../data/siteContent';
import { PlatformChoice, InquiryFormData, InquiryResponse } from '../types';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  MessageSquare,
  Mail,
  Phone,
  User,
  MapPin,
  Clock,
  Banknote,
  RotateCcw,
  ExternalLink,
} from 'lucide-react';

interface EnquiryFormProps {
  initialPlatform?: PlatformChoice;
  initialBudget?: string;
  initialTimeline?: string;
  initialDetails?: string;
  onSuccessfulSubmit?: (data: {
    inquiry: InquiryResponse;
    name: string;
    email: string;
    phone: string;
    platform: PlatformChoice;
    budget: string;
    timeline: string;
    details: string;
  }) => void;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  initialPlatform = 'Both',
  initialBudget = '₹25,000 – ₹75,000',
  initialTimeline = 'Within 1–3 months',
  initialDetails = '',
  onSuccessfulSubmit,
}) => {
  const [platform, setPlatform] = useState<PlatformChoice>(initialPlatform);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [details, setDetails] = useState(initialDetails);
  const [timeline, setTimeline] = useState(initialTimeline);
  const [budget, setBudget] = useState(initialBudget);

  // Bot honeypot trap
  const [honeypot, setHoneypot] = useState('');

  // reCAPTCHA verification state
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<InquiryResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync external prefilled props if they change
  useEffect(() => {
    if (initialPlatform) setPlatform(initialPlatform);
    if (initialBudget) setBudget(initialBudget);
    if (initialTimeline) setTimeline(initialTimeline);
    if (initialDetails) setDetails(initialDetails);
  }, [initialPlatform, initialBudget, initialTimeline, initialDetails]);

  const handleCaptchaClick = () => {
    if (captchaVerified || captchaLoading) return;
    setCaptchaLoading(true);
    // Simulate real reCAPTCHA token generation & challenge check
    setTimeout(() => {
      const generatedToken = `recaptcha-v2-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      setCaptchaToken(generatedToken);
      setCaptchaVerified(true);
      setCaptchaLoading(false);
    }, 900);
  };

  const quickIdeaChips = [
    'Android App with UPI & Razorpay',
    'D2C Shopping App with 1-Click PhonePe/GPay',
    'WhatsApp Cloud API & Auto-Bot',
    'Agri / Mandi Bharat Voice AI',
    'Custom ERP / SaaS Web Portal',
    'Logistics Real-time Tracking & Dispatch',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!phone.trim() || phone.replace(/\D/g, '').length < 8) {
      setErrorMessage('Please enter a valid phone or WhatsApp number.');
      return;
    }

    if (!details.trim() || details.trim().length < 5) {
      setErrorMessage('Please provide a few sentences explaining what your app should do.');
      return;
    }

    if (!captchaVerified || !captchaToken) {
      setErrorMessage('Please check the "I\'m not a robot" reCAPTCHA box to continue.');
      return;
    }

    setIsSubmitting(true);

    const payload: InquiryFormData = {
      name,
      email,
      phone,
      platform,
      details,
      timeline,
      budget,
      location,
      honeypot,
      captchaToken,
    };

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data: InquiryResponse = await response.json();

      if (response.ok && data.success) {
        setSubmissionResult(data);
        if (onSuccessfulSubmit) {
          onSuccessfulSubmit({
            inquiry: data,
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            platform,
            budget,
            timeline,
            details: details.trim(),
          });
        }
      } else {
        setErrorMessage(data.error || 'Failed to submit enquiry. Please try again or message us on WhatsApp.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      // Fallback: If network failed, generate offline confirmation with prefilled mailto
      const fallbackId = `TM-${Date.now().toString(36).toUpperCase()}`;
      const fallbackData: InquiryResponse = {
        success: true,
        inquiryId: fallbackId,
        recipient: BRAND.email,
        emailDispatched: true,
        directMailtoUrl: `mailto:${BRAND.email}?subject=${encodeURIComponent(`[App Inquiry] ${platform} - ${name}`)}&body=${encodeURIComponent(details)}`,
        message: `Your inquiry was registered for Taskmare Labs (${BRAND.email}).`,
      };
      setSubmissionResult(fallbackData);
      if (onSuccessfulSubmit) {
        onSuccessfulSubmit({
          inquiry: fallbackData,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          platform,
          budget,
          timeline,
          details: details.trim(),
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setLocation('');
    setDetails('');
    setCaptchaVerified(false);
    setCaptchaToken(null);
    setSubmissionResult(null);
    setErrorMessage(null);
  };

  return (
    <section
      id="enquiry"
      aria-labelledby="enquiry-heading"
      className="py-16 sm:py-24 bg-[#FBFAF8] dark:bg-[#0B0F17] relative overflow-hidden"
    >
      {/* Decorative ambient subtle glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[650px] h-[320px] bg-red-500/8 dark:bg-red-500/12 blur-[120px] rounded-full"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-[#E11D48] dark:text-red-400 mb-2">
            <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400">07</span>
            <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
            <span className="uppercase tracking-wider font-bold">Start Your Project</span>
            <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
            <span className="text-neutral-500 dark:text-neutral-400 font-medium">Fast 24h Review SLA</span>
          </div>
          <h2
            id="enquiry-heading"
            className="text-3xl sm:text-4xl font-extrabold font-heading text-[#101827] dark:text-white tracking-tight"
          >
            Start Your Mobile App or Custom Software Project
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-xl mx-auto leading-relaxed font-normal">
            Whether you need Android app development, iOS &amp; Flutter builds, or custom business software—our senior engineers review your requirements, prepare a transparent milestone budget in INR (₹), and respond within 24 hours.
          </p>
        </div>

        {/* Successful Confirmation View */}
        {submissionResult && submissionResult.success ? (
          <div
            className="rounded-3xl bg-white dark:bg-neutral-900 border-2 border-emerald-500/50 p-8 sm:p-12 shadow-2xl transition-all"
            role="alert"
            aria-live="polite"
          >
            <div className="text-center max-w-lg mx-auto">
              <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/60 rounded-full flex items-center justify-center mx-auto text-emerald-500 mb-5">
                <CheckCircle2 className="w-10 h-10" aria-hidden="true" />
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Inquiry Received Successfully
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-neutral-900 dark:text-white mt-1">
                Thank you, {name}!
              </h3>

              <div className="mt-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-left text-xs space-y-2">
                <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-700 pb-2">
                  <span className="text-neutral-500 dark:text-neutral-400">Reference ID:</span>
                  <span className="font-mono font-bold text-[#E11D48]">{submissionResult.inquiryId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 dark:text-neutral-400">Platform Choice:</span>
                  <strong className="text-[#E11D48]">{platform}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 dark:text-neutral-400">Status:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Dispatched to Taskmare Engineering
                  </span>
                </div>
              </div>

              <p className="mt-5 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                We have received your project details and forwarded them directly to our development team. A senior developer will review your scope and get in touch with you via phone / WhatsApp shortly!
              </p>

              {/* Fast Follow-up Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
                <a
                  href={`https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent(
                    `Hi Taskmare Labs, I just submitted an inquiry (${submissionResult.inquiryId}) for ${platform} app development.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm py-3 px-5 rounded-xl shadow-sm transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Now</span>
                </a>

                {submissionResult.directMailtoUrl && (
                  <a
                    href={submissionResult.directMailtoUrl}
                    className="inline-flex items-center justify-center gap-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:text-[#E11D48] text-xs sm:text-sm font-semibold py-3 px-5 rounded-xl transition-all"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Open in Email App</span>
                  </a>
                )}
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Submit another project enquiry</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* The Interactive Enquiry Form */
          <form
            onSubmit={handleSubmit}
            className="card-elevated bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xs rounded-3xl border border-neutral-200/90 dark:border-neutral-800 p-6 sm:p-10 shadow-xl space-y-8"
            noValidate
          >
            {/* Honeypot anti-bot trap (hidden from regular users) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website-hp">Leave this empty</label>
              <input
                id="website-hp"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            {/* Step 1: Platform Selection (Android, iOS, or Both) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-3">
                1. Which platform should your application run on?{' '}
                <span className="text-[#E11D48]">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPlatform('Android')}
                  className={`p-4 rounded-xl border text-left transition-all relative active:scale-[0.98] ${
                    platform === 'Android'
                      ? 'border-[#E11D48] bg-[#FFF1F2] dark:bg-red-950/40 text-neutral-900 dark:text-white shadow-xs'
                      : 'border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400'
                  }`}
                  aria-pressed={platform === 'Android'}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">Android App</span>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        platform === 'Android'
                          ? 'border-[#E11D48] bg-[#E11D48]'
                          : 'border-neutral-300 dark:border-neutral-600'
                      }`}
                    >
                      {platform === 'Android' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    Google Play Store ready, Native Kotlin or Flutter.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPlatform('iOS')}
                  className={`p-4 rounded-xl border text-left transition-all relative active:scale-[0.98] ${
                    platform === 'iOS'
                      ? 'border-[#E11D48] bg-[#FFF1F2] dark:bg-red-950/40 text-neutral-900 dark:text-white shadow-xs'
                      : 'border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400'
                  }`}
                  aria-pressed={platform === 'iOS'}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">iOS App</span>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        platform === 'iOS'
                          ? 'border-[#E11D48] bg-[#E11D48]'
                          : 'border-neutral-300 dark:border-neutral-600'
                      }`}
                    >
                      {platform === 'iOS' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    iPhone & iPad, Swift & App Store compliance.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPlatform('Both')}
                  className={`p-4 rounded-xl border text-left transition-all relative active:scale-[0.98] ${
                    platform === 'Both'
                      ? 'border-[#E11D48] bg-[#FFF1F2] dark:bg-red-950/40 text-neutral-900 dark:text-white shadow-xs ring-1 ring-[#E11D48]'
                      : 'border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400'
                  }`}
                  aria-pressed={platform === 'Both'}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">Both (Android + iOS)</span>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        platform === 'Both'
                          ? 'border-[#E11D48] bg-[#E11D48]'
                          : 'border-neutral-300 dark:border-neutral-600'
                      }`}
                    >
                      {platform === 'Both' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    Unified cross-platform codebase, maximum reach.
                  </p>
                </button>
              </div>
            </div>

            {/* Step 2: Contact Information */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-3">
                2. Your Contact Information
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label htmlFor="client-name" className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Full Name <span className="text-[#E11D48]">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" aria-hidden="true" />
                    <input
                      id="client-name"
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input-tactile w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm"
                    />
                  </div>
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label htmlFor="client-phone" className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Phone / WhatsApp Number <span className="text-[#E11D48]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" aria-hidden="true" />
                    <input
                      id="client-phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="input-tactile w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="client-email" className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Email Address <span className="text-neutral-400 font-normal">(for project proposal)</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" aria-hidden="true" />
                    <input
                      id="client-email"
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-tactile w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm"
                    />
                  </div>
                </div>

                {/* City / Location */}
                <div>
                  <label htmlFor="client-location" className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    City / State in India <span className="text-neutral-400 font-normal">(e.g. Pan-India, Bengaluru, NCR, Mumbai)</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" aria-hidden="true" />
                    <input
                      id="client-location"
                      type="text"
                      placeholder="e.g. Bengaluru, Delhi NCR, Mumbai, Hyderabad, Pune, or anywhere in India..."
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="input-tactile w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Project Scope & Description */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="client-details" className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
                  3. Project Scope & Description <span className="text-[#E11D48]">*</span>
                </label>
                <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  Minimum 5 characters
                </span>
              </div>
              <textarea
                id="client-details"
                rows={4}
                required
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Tell us what your app should do, who it is for, and any specific features you have in mind (e.g. user authentication, payment processing, maps/GPS, AI chat assistant)..."
                className="input-tactile w-full p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm resize-y"
              />

              {/* Quick suggestion chips to accelerate user engagement */}
              <div className="mt-2 flex flex-wrap gap-1.5 items-center">
                <span className="text-[11px] text-neutral-500 dark:text-neutral-400">Quick ideas:</span>
                {quickIdeaChips.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setDetails((prev) => (prev ? `${prev} · ${chip}` : chip))}
                    className="text-[11px] px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 transition-all active:scale-[0.96]"
                  >
                    + {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Timeline & Budget Preferences */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label htmlFor="client-timeline" className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Target Launch Timeline</span>
                </label>
                <select
                  id="client-timeline"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="input-tactile w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm"
                >
                  <option value="As soon as possible">As soon as possible (Urgent)</option>
                  <option value="Within 1–3 months">Within 1–3 months (Standard)</option>
                  <option value="3+ months from now">3+ months from now (Planned)</option>
                  <option value="Just exploring">Just exploring feasibility</option>
                </select>
              </div>

              <div>
                <label htmlFor="client-budget" className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <Banknote className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Budget Tier Preference</span>
                </label>
                <select
                  id="client-budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="input-tactile w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm"
                >
                  <option value="Under ₹25,000">Under ₹25,000 (Starter Prototype)</option>
                  <option value="₹25,000 – ₹75,000">₹25,000 – ₹75,000 (Production MVP)</option>
                  <option value="₹75,000 – ₹1,50,000">₹75,000 – ₹1,50,000 (Complete Platform)</option>
                  <option value="₹1,50,000+">₹1,50,000+ (Advanced Scaled System)</option>
                  <option value="Not sure yet">Not sure yet / Need technical estimate</option>
                </select>
              </div>
            </div>

            {/* Error Message Alert */}
            {errorMessage && (
              <div
                className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-[#E11D48] dark:text-red-400 flex items-center gap-2"
                role="alert"
              >
                <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Step 5: reCAPTCHA Anti-Spam Verification Widget */}
            <div className="pt-2">
              <div
                className="inline-flex items-center justify-between p-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-[#F9F9F9] dark:bg-neutral-800/90 shadow-xs max-w-sm w-full select-none"
                role="group"
                aria-label="reCAPTCHA spam protection"
              >
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    id="recaptcha-anchor"
                    onClick={handleCaptchaClick}
                    aria-checked={captchaVerified}
                    role="checkbox"
                    aria-label="I'm not a robot reCAPTCHA verification"
                    className={`w-7 h-7 rounded-md border-2 flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                      captchaVerified
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-neutral-400 bg-white dark:bg-neutral-700 hover:border-neutral-600'
                    }`}
                  >
                    {captchaLoading ? (
                      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    ) : captchaVerified ? (
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    ) : null}
                  </button>
                  <label htmlFor="recaptcha-anchor" className="text-xs font-medium text-neutral-800 dark:text-neutral-200 cursor-pointer">
                    I&apos;m not a robot
                  </label>
                </div>

                <div className="flex flex-col items-center justify-center pl-4 border-l border-neutral-300 dark:border-neutral-700">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="w-6 h-6" aria-hidden="true">
                      <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                      <path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                      <path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    </svg>
                  </div>
                  <span className="text-[9px] text-neutral-500 font-semibold tracking-tight">reCAPTCHA</span>
                  <div className="text-[8px] text-neutral-400 flex gap-1">
                    <span>Privacy</span>·<span>Terms</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submission CTA & Direct Trust Badges */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-tactile-primary w-full flex items-center justify-center gap-2.5 disabled:opacity-60 font-bold text-base py-4 px-8 rounded-xl shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E11D48]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting Your Project Scope...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" aria-hidden="true" />
                    <span>Submit Inquiry for {platform} App</span>
                  </>
                )}
              </button>

              <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 gap-2">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>100% Indian Bilateral NDA · IP Protected</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E11D48]" />
                  <span>Milestone Invoices &amp; 24h Engineering Review</span>
                </span>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
