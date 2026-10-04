import React from 'react';
import { BRAND, BRAND_ASSETS } from '../data/siteContent';
import { Mail, Phone, MapPin, ArrowUp, MessageSquare, Lock } from 'lucide-react';
import { FloatingWhatsApp } from './FloatingWhatsApp';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenEnquiry: () => void;
  isAdmin?: boolean;
  onOpenAdminAuth: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenPrivacy, 
  onOpenTerms, 
  onOpenEnquiry, 
  isAdmin, 
  onOpenAdminAuth 
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#101827] text-white border-t border-neutral-800">
      {/* Top Pre-Footer Conversion Ribbon */}
      <div className="border-b border-neutral-800/80 bg-neutral-900/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#E11D48] block mb-1">
              Ready to Launch Your Next App?
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
              Let&apos;s build your idea with precision and craft.
            </h2>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={onOpenEnquiry}
              className="btn-tactile-primary text-xs sm:text-sm px-7 py-3.5 rounded-xl font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48]"
            >
              Start Your Project Inquiry
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center">
              <img
                src={BRAND_ASSETS.logoDark || BRAND_ASSETS.logo}
                onError={(e) => {
                  e.currentTarget.src = BRAND_ASSETS.logoTransparent;
                }}
                alt="Taskmare Labs"
                className="h-10 w-auto object-contain"
              />
            </div>

            <p className="text-sm text-neutral-400 max-w-md leading-relaxed">
              Taskmare Labs is a custom software development company and mobile app development agency in India. We engineer native Android &amp; iOS mobile apps, custom business software, and production AI platforms for startups and scaling enterprises across India.
            </p>

            <div className="pt-2 text-xs text-neutral-400 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#E11D48] shrink-0" />
                <span>{BRAND.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E11D48] shrink-0" />
                <a href={`tel:${BRAND.phoneRaw}`} className="hover:text-white transition-colors">
                  {BRAND.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E11D48] shrink-0" />
                <a href={`mailto:${BRAND.email}`} className="hover:text-white transition-colors">
                  {BRAND.email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Core Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-4">
              Services
            </h3>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <a href="#services" className="hover:text-[#E11D48] transition-colors">
                  Android App Development
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#E11D48] transition-colors">
                  iOS App Development
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#E11D48] transition-colors">
                  AI App Development
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#E11D48] transition-colors">
                  Custom Software & SaaS
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#E11D48] transition-colors">
                  Backend & API Development
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#E11D48] transition-colors">
                  Play Store & App Store Support
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-4">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Capabilities
                </a>
              </li>
              <li>
                <a href="#demo-playground" className="hover:text-white transition-colors">
                  Live Phone Sandbox
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">
                  Engineering Principles
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Project FAQs
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenTerms}
                  className="text-left hover:text-white transition-colors"
                >
                  Terms &amp; Conditions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="text-left hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <a href="#enquiry" className="hover:text-white transition-colors">
                  Start Project Inquiry
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Socials & Connect */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-4">
              Connect With Us
            </h3>
            <div className="space-y-3">
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors"
                aria-label="Follow Taskmare Labs on Instagram"
              >
                <div className="w-7 h-7 rounded-lg bg-neutral-800 flex items-center justify-center text-pink-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.13-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <span>Instagram: @taskmare_labs</span>
              </a>

              <a
                href={BRAND.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors"
                aria-label="Follow Taskmare Labs on Facebook"
              >
                <div className="w-7 h-7 rounded-lg bg-neutral-800 flex items-center justify-center text-blue-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <span>Facebook: taksmare</span>
              </a>

              <a
                href={BRAND.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors"
                aria-label="Chat on WhatsApp with Taskmare Labs"
              >
                <div className="w-7 h-7 rounded-lg bg-neutral-800 flex items-center justify-center text-emerald-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.031 0C5.394 0 0 5.394 0 12.031c0 2.119.553 4.186 1.602 6.012L.073 24l6.143-1.611a11.96 11.96 0 0 0 5.815 1.495h.005c6.635 0 12.03-5.394 12.03-12.032.001-3.212-1.248-6.231-3.52-8.503C18.27 1.25 15.247 0 12.031 0zm-.005 22.015h-.004a9.988 9.988 0 0 1-5.086-1.39l-.365-.216-3.777.991 1.008-3.682-.237-.377a9.96 9.96 0 0 1-1.534-5.31c0-5.514 4.486-10 10.003-10 2.67 0 5.18 1.04 7.069 2.929a9.945 9.945 0 0 1 2.93 7.073c-.002 5.513-4.488 9.996-10.004 9.996zm5.474-7.478c-.3-.15-1.776-.877-2.051-.977-.276-.1-.476-.15-.676.15-.2.3-.776.977-.951 1.177-.176.2-.351.226-.651.076-.3-.15-1.267-.467-2.413-1.489-.892-.795-1.494-1.777-1.669-2.077-.175-.3-.019-.462.131-.611.135-.135.3-.35.45-.526.151-.175.201-.3.301-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.628-.926-2.23-.243-.586-.49-.506-.676-.516l-.576-.01c-.2 0-.525.075-.8.375s-1.05 1.026-1.05 2.502c0 1.477 1.076 2.903 1.226 3.103.15.2 2.118 3.234 5.132 4.536.717.31 1.277.495 1.713.633.72.228 1.376.196 1.894.119.578-.086 1.776-.726 2.026-1.428.251-.701.251-1.302.176-1.428-.076-.125-.276-.2-.576-.35z"/>
                  </svg>
                </div>
                <span>WhatsApp: {BRAND.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} Taskmare Labs. All rights reserved. 100% Source Code &amp; Bilateral Legal NDA Protected.</span>
            {/* Discreet Admin Lock Trigger */}
            <button
              type="button"
              onClick={onOpenAdminAuth}
              className="text-neutral-600 hover:text-neutral-400 transition-colors p-1 rounded"
              title="Admin Portal"
              aria-label="Admin Portal Access"
            >
              <Lock className="w-3 h-3 opacity-40 hover:opacity-100" />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <button
              type="button"
              onClick={onOpenTerms}
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Terms &amp; Conditions
            </button>
            <span className="hidden sm:inline">·</span>
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Privacy Policy
            </button>
            {isAdmin && (
              <>
                <span className="hidden sm:inline">·</span>
                <button
                  type="button"
                  onClick={onOpenAdminAuth}
                  className="text-red-400 font-mono text-[11px] font-bold transition-colors inline-flex items-center gap-1.5 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20 hover:bg-red-500/20"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span>Admin: SEO &amp; Scripts</span>
                </button>
              </>
            )}
            <span className="hidden sm:inline">·</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-[#E11D48] transition-colors"
              aria-label="Scroll back to top of page"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Chat Enquiry Button Integrated in Footer */}
      <FloatingWhatsApp />
    </footer>
  );
};
