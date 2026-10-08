import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TechMarquee } from './components/TechMarquee';
import { ServicesSection } from './components/ServicesSection';
import { TechStackSection } from './components/TechStackSection';
import { ParallaxSection } from './components/ParallaxSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { SocialProofSection } from './components/SocialProofSection';
import { FAQSection } from './components/FAQSection';
import { EnquiryForm } from './components/EnquiryForm';
import { Footer } from './components/Footer';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsAndConditionsPage } from './components/TermsAndConditionsPage';
import { MobileBottomBar } from './components/MobileBottomBar';
import { ThankYouPage } from './components/ThankYouPage';
import { ToastNotification, ToastNotificationData } from './components/ToastNotification';
import { AmbientPageEffects } from './components/AmbientPageEffects';
import { AppPlaygroundSection } from './components/AppPlaygroundSection';
import { PlatformChoice, InquiryResponse } from './types';
import { SEOModal } from './components/seo/SEOModal';
import { AdminAuthModal } from './components/admin/AdminAuthModal';
import { applySEOMetadata } from './services/seoService';
import { isAdminAuthenticated } from './services/adminAuthService';

interface SubmittedInquiryData {
  inquiry: InquiryResponse;
  name: string;
  email: string;
  phone: string;
  platform: PlatformChoice;
  budget: string;
  timeline: string;
  details: string;
}

type PageView = 'home' | 'terms' | 'privacy';

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/terms' || path === '/terms-and-conditions' || hash === '#terms') {
        return 'terms';
      }
      if (path === '/privacy-policy' || path === '/privacy' || hash === '#privacy-policy' || hash === '#privacy') {
        return 'privacy';
      }
    }
    return 'home';
  });

  const [selectedPlatform, setSelectedPlatform] = useState<PlatformChoice>('Both');
  const [estimatedBudget, setEstimatedBudget] = useState<string>('₹25,000 – ₹75,000');
  const [estimatedTimeline, setEstimatedTimeline] = useState<string>('Within 1–3 months');
  const [estimatedDetails, setEstimatedDetails] = useState<string>('');
  const [privacyModalOpen, setPrivacyModalOpen] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<SubmittedInquiryData | null>(null);
  const [toastData, setToastData] = useState<ToastNotificationData | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(() => isAdminAuthenticated());
  const [adminAuthModalOpen, setAdminAuthModalOpen] = useState<boolean>(false);
  const [seoModalOpen, setSeoModalOpen] = useState<boolean>(false);

  const handleOpenAdminPortal = () => {
    if (isAdminAuthenticated()) {
      setIsAdmin(true);
      setSeoModalOpen(true);
    } else {
      setAdminAuthModalOpen(true);
    }
  };

  useEffect(() => {
    applySEOMetadata(currentView);
  }, [currentView]);

  // Private shortcut (Ctrl+Shift+A or Ctrl+Shift+S) for Admin Portal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key.toLowerCase() === 'a' || e.key.toLowerCase() === 's')) {
        e.preventDefault();
        handleOpenAdminPortal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Check for admin deep link (#admin or #admin-seo)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#admin' || hash === '#admin-seo') {
        handleOpenAdminPortal();
      }
    }
  }, []);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/terms' || path === '/terms-and-conditions' || hash === '#terms') {
        setCurrentView('terms');
      } else if (path === '/privacy-policy' || path === '/privacy' || hash === '#privacy-policy' || hash === '#privacy') {
        setCurrentView('privacy');
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (view: PageView) => {
    setCurrentView(view);
    const targetPath = view === 'terms' ? '/terms' : view === 'privacy' ? '/privacy-policy' : '/';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ view }, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToEnquiry = (platform?: PlatformChoice, prefillDetails?: string) => {
    if (submittedData) {
      setSubmittedData(null);
    }
    if (currentView !== 'home') {
      navigateTo('home');
    }
    if (platform) {
      setSelectedPlatform(platform);
    }
    if (prefillDetails) {
      setEstimatedDetails(prefillDetails);
    }
    setTimeout(() => {
      const element = document.getElementById('enquiry');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleFormSubmission = (data: SubmittedInquiryData) => {
    setToastData({
      id: String(Date.now()),
      inquiryId: data.inquiry.inquiryId || 'TM-REGISTERED',
      clientName: data.name,
      platform: data.platform,
      onViewDetails: () => {
        setSubmittedData(data);
        setToastData(null);
      },
    });
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#FBFAF8] dark:bg-[#0B0F17] text-[#101827] dark:text-neutral-100 flex flex-col font-sans transition-colors duration-200 selection:bg-[#E11D48] selection:text-white relative">
        {/* Modern Ambient Page Effects */}
        <AmbientPageEffects />

        {/* Main Sticky Header */}
        <Header 
          onOpenEnquiry={scrollToEnquiry} 
          onNavigateHome={() => navigateTo('home')} 
        />

        {/* Main Landmark for WCAG accessibility */}
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          {submittedData ? (
            /* Dedicated Thank You Page View */
            <ThankYouPage
              inquiry={submittedData.inquiry}
              clientName={submittedData.name}
              clientEmail={submittedData.email}
              clientPhone={submittedData.phone}
              platform={submittedData.platform}
              budget={submittedData.budget}
              timeline={submittedData.timeline}
              details={submittedData.details}
              onBackToHome={() => setSubmittedData(null)}
            />
          ) : currentView === 'terms' ? (
            /* Dedicated Terms & Conditions Page */
            <TermsAndConditionsPage
              onBackToHome={() => navigateTo('home')}
              onOpenEnquiry={() => scrollToEnquiry()}
            />
          ) : currentView === 'privacy' ? (
            /* Dedicated Privacy Policy Page */
            <PrivacyPolicyPage
              onBackToHome={() => navigateTo('home')}
              onOpenEnquiry={() => scrollToEnquiry()}
            />
          ) : (
            <>
              {/* Conversion Focused Hero Section */}
              <Hero onOpenEnquiry={scrollToEnquiry} />

              {/* Dynamic Infinite Capabilities & Tech Stack Marquee */}
              <TechMarquee onSelectItem={(item) => scrollToEnquiry(undefined, `Inquiry regarding: ${item}`)} />

              {/* Core Services Section with Direct Inquire Triggers */}
              <ServicesSection onSelectService={scrollToEnquiry} />

              {/* Modern Technology & Practical Decisions Matrix */}
              <TechStackSection onOpenEnquiry={() => scrollToEnquiry()} />

              {/* Interactive Live Phone Simulator (App Demo Playground) */}
              <AppPlaygroundSection onOpenEnquiry={scrollToEnquiry} />

              {/* Client Stories & NDA-Protected Case Studies */}
              <SocialProofSection onOpenEnquiry={scrollToEnquiry} />

              {/* Cinematic Multi-Layer Parallax Architecture Section */}
              <ParallaxSection onOpenEnquiry={() => scrollToEnquiry()} />

              {/* What We Stand For & 5-Step Process */}
              <WhyChooseUs onOpenEnquiry={() => scrollToEnquiry()} />

              {/* Frequently Asked Questions (Accordion) */}
              <FAQSection onOpenEnquiry={() => scrollToEnquiry()} />

              {/* The High-Converting Project Enquiry Form with reCAPTCHA */}
              <EnquiryForm
                initialPlatform={selectedPlatform}
                initialBudget={estimatedBudget}
                initialTimeline={estimatedTimeline}
                initialDetails={estimatedDetails}
                onSuccessfulSubmit={handleFormSubmission}
              />
            </>
          )}
        </main>

        {/* Footer */}
        <Footer
          onOpenPrivacy={() => navigateTo('privacy')}
          onOpenTerms={() => navigateTo('terms')}
          onOpenEnquiry={() => scrollToEnquiry()}
          isAdmin={isAdmin}
          onOpenAdminAuth={handleOpenAdminPortal}
        />

        {/* Private Admin Passkey Gate Modal */}
        <AdminAuthModal
          isOpen={adminAuthModalOpen}
          onClose={() => setAdminAuthModalOpen(false)}
          onSuccess={() => {
            setIsAdmin(true);
            setAdminAuthModalOpen(false);
            setSeoModalOpen(true);
          }}
        />

        {/* Dynamic SEO & Script Injection Manager Modal (Restricted to Main Admin) */}
        <SEOModal
          isOpen={seoModalOpen}
          onClose={() => setSeoModalOpen(false)}
          currentPage={currentView}
          onLogout={() => {
            setIsAdmin(false);
            setSeoModalOpen(false);
          }}
        />

        {/* Privacy Policy Modal (for quick popup if needed) */}
        <PrivacyPolicyModal
          isOpen={privacyModalOpen}
          onClose={() => setPrivacyModalOpen(false)}
        />

        {/* Subtle Toast Notification upon Successful Form Submission */}
        <ToastNotification
          toast={toastData}
          onClose={() => setToastData(null)}
        />

        {/* High Conversion Sticky Mobile Bar */}
        <MobileBottomBar onOpenEnquiry={scrollToEnquiry} />
      </div>
    </ThemeProvider>
  );
}
