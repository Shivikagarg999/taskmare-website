import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { BRAND, BRAND_ASSETS } from '../data/siteContent';
import { Menu, X, Sun, Moon, Phone, MessageSquare, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onOpenEnquiry: (platform?: 'Android' | 'iOS' | 'Both') => void;
  onNavigateHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenEnquiry, onNavigateHome }) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Tech Stack', href: '#tech-stack' },
    { label: 'Live Demo', href: '#demo-playground' },
    { label: 'Case Studies', href: '#reviews' },
    { label: 'Principles', href: '#why-us' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FBFAF8]/95 dark:bg-[#0B0F17]/95 backdrop-blur-md shadow-sm border-b border-neutral-200/80 dark:border-neutral-800'
            : 'bg-[#FBFAF8] dark:bg-[#0B0F17] border-b border-neutral-200/50 dark:border-neutral-800/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              if (onNavigateHome) {
                e.preventDefault();
                onNavigateHome();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48] rounded-lg p-1"
            aria-label="Taskmare Labs - Home"
          >
            <img
              src={theme === 'dark' ? BRAND_ASSETS.logoDark : BRAND_ASSETS.logo}
              onError={(e) => {
                e.currentTarget.src = BRAND_ASSETS.logoTransparent;
              }}
              alt="Taskmare Labs"
              className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              loading="eager"
            />
          </a>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-8 text-[14px] font-semibold text-neutral-700 dark:text-neutral-200"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative py-1 hover:text-[#E11D48] dark:hover:text-[#E11D48] transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#E11D48] hover:after:w-full after:transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48] rounded-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action buttons & Controls */}
          <div className="flex items-center gap-2.5">
            {/* Dark Mode Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:text-[#E11D48] dark:hover:text-[#E11D48] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48]"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" />
              ) : (
                <Moon className="w-4 h-4 text-neutral-700" aria-hidden="true" />
              )}
            </button>

            {/* Primary Conversion CTA Button */}
            <button
              type="button"
              onClick={() => onOpenEnquiry()}
              className="btn-tactile-primary inline-flex items-center gap-2 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E11D48]"
            >
              <span>Submit Inquiry</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48]"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-neutral-900 dark:text-white" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5 text-neutral-900 dark:text-white" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation (WCAG Compliant & High Performance) */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="fixed inset-0 z-50 lg:hidden flex flex-col justify-between"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-over panel */}
          <div className="relative ml-auto w-full max-w-xs sm:max-w-sm h-full bg-[#FBFAF8] dark:bg-[#0F172A] p-6 shadow-2xl flex flex-col justify-between border-l border-neutral-200 dark:border-neutral-800 overflow-y-auto">
            <div>
              {/* Drawer Top */}
              <div className="flex items-center justify-between pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <a
                  href="#hero"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center"
                  aria-label="Taskmare Labs - Home"
                >
                  <img
                    src={theme === 'dark' ? BRAND_ASSETS.logoDark : BRAND_ASSETS.logo}
                    onError={(e) => {
                      e.currentTarget.src = BRAND_ASSETS.logoTransparent;
                    }}
                    alt="Taskmare Labs"
                    className="h-8 w-auto object-contain"
                  />
                </a>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200"
                    aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                    title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                  >
                    {theme === 'dark' ? (
                      <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" />
                    ) : (
                      <Moon className="w-4 h-4 text-neutral-700" aria-hidden="true" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-md text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48]"
                    aria-label="Close navigation drawer"
                  >
                    <X className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="mt-6 flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-3 text-base font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 rounded-lg transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-neutral-400" aria-hidden="true" />
                  </a>
                ))}
              </nav>

              {/* Quick Platform Enquiry Filters */}
              <div className="mt-6 pt-5 border-t border-neutral-200 dark:border-neutral-800">
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
                  Quick Inquiries
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenEnquiry('Android');
                    }}
                    className="text-left text-xs font-semibold p-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-200 hover:border-[#E11D48] border border-transparent transition-colors"
                  >
                    Android App
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenEnquiry('iOS');
                    }}
                    className="text-left text-xs font-semibold p-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-200 hover:border-[#E11D48] border border-transparent transition-colors"
                  >
                    iOS App
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenEnquiry('Both');
                    }}
                    className="col-span-2 text-left text-xs font-semibold p-2.5 rounded-lg bg-[#FFF1F2] dark:bg-red-950/40 text-[#E11D48] dark:text-red-400 border border-red-200 dark:border-red-900/50"
                  >
                    Android + iOS (Cross-Platform)
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Drawer Bottom Actions */}
            <div className="pt-6 mt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="btn-tactile-primary w-full flex items-center justify-center gap-2 font-bold py-3 px-4 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48]"
              >
                <span>Submit Project Inquiry</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${BRAND.phoneRaw}`}
                  className="flex items-center justify-center gap-2 text-xs font-semibold py-2.5 px-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 active:scale-[0.98] transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" aria-hidden="true" />
                  <span>Call Us</span>
                </a>
                <a
                  href={BRAND.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile-whatsapp flex items-center justify-center gap-2 text-xs font-bold py-2.5 px-3 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <div className="text-[11px] text-center text-neutral-500 dark:text-neutral-400">
                {BRAND.address}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
