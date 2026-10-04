import React, { useState, useMemo } from 'react';
import { FAQ_ITEMS, BRAND } from '../data/siteContent';
import { FAQItem } from '../types';
import { 
  ChevronDown, 
  HelpCircle, 
  Search, 
  MessageSquare, 
  ArrowRight, 
  Sparkles,
  CheckCircle2,
  X
} from 'lucide-react';

interface FAQSectionProps {
  onOpenEnquiry: () => void;
}

type CategoryFilter = 'All' | 'Pricing & Timelines' | 'Ownership & Legal' | 'Tech & Stores' | 'Process & Support';

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenEnquiry }) => {
  // State for active open questions (store set of IDs to allow multiple or single)
  const [openIds, setOpenIds] = useState<string[]>(['faq-pricing', 'faq-ownership']);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: CategoryFilter[] = [
    'All',
    'Pricing & Timelines',
    'Ownership & Legal',
    'Tech & Stores',
    'Process & Support',
  ];

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setOpenIds(filteredFaqs.map((faq) => faq.id));
  };

  const collapseAll = () => {
    setOpenIds([]);
  };

  // Filter FAQs based on category and search query
  const filteredFaqs = useMemo(() => {
    return FAQ_ITEMS.filter((faq) => {
      const matchesCategory =
        activeCategory === 'All' || faq.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (faq.highlight && faq.highlight.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Schema.org FAQPage structured data for rich snippets in Google search
  const faqSchema = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };
  }, []);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-20 sm:py-24 bg-neutral-50/70 dark:bg-[#0d121c] border-t border-neutral-200/80 dark:border-neutral-800/80 transition-colors"
    >
      {/* Injected FAQPage Structured Data for Google SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-[#E11D48] dark:text-red-400 mb-2">
            <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400">06</span>
            <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
            <span className="uppercase tracking-wider font-bold">Frequently Asked Questions</span>
            <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
            <span className="text-neutral-500 dark:text-neutral-400 font-medium">App &amp; Software Development</span>
          </div>
          <h2
            id="faq-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white font-heading"
          >
            Clear answers about mobile app &amp; custom software development
          </h2>
          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-300 font-normal">
            Whether you are evaluating native Android, Flutter app development, or custom business software, here are clear answers about our pricing in INR (₹), timelines, Google Play approvals, and 100% source code ownership.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g., pricing, Flutter, NDA, App Store)..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl text-sm bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#E11D48]/30 focus:border-[#E11D48] text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 transition-all"
                aria-label="Search frequently asked questions"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Actions (Expand/Collapse) */}
            <div className="flex items-center gap-2 self-end sm:self-center text-xs">
              <button
                type="button"
                onClick={expandAll}
                className="px-3 py-1.5 rounded-lg bg-neutral-200/70 hover:bg-neutral-300/80 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium transition-colors"
              >
                Expand All
              </button>
              <button
                type="button"
                onClick={collapseAll}
                className="px-3 py-1.5 rounded-lg bg-neutral-200/70 hover:bg-neutral-300/80 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium transition-colors"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Interactive Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#E11D48] text-white shadow-xs font-semibold'
                      : 'bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                  aria-pressed={isActive}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5" role="list">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-white dark:bg-neutral-900 border-[#E11D48]/40 dark:border-[#E11D48]/40 shadow-sm'
                      : 'bg-white/80 dark:bg-neutral-900/80 border-neutral-200/90 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(faq.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48] transition-colors"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    id={`faq-question-${faq.id}`}
                  >
                    <div className="flex-1 pr-2">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
                          {faq.category}
                        </span>
                        {faq.highlight && (
                          <>
                            <span className="text-neutral-300 dark:text-neutral-700" aria-hidden="true">·</span>
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                              <CheckCircle2 className="w-3 h-3" />
                              {faq.highlight}
                            </span>
                          </>
                        )}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white leading-snug">
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200 mt-0.5 ${
                        isOpen
                          ? 'rotate-180 bg-[#E11D48] text-white'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
                      }`}
                      aria-hidden="true"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Accordion Content with smooth height and opacity */}
                  {isOpen && (
                    <div
                      id={`faq-answer-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-question-${faq.id}`}
                      className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed border-t border-neutral-100 dark:border-neutral-800/80 pt-4"
                    >
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 px-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <HelpCircle className="w-10 h-10 mx-auto text-neutral-400 dark:text-neutral-600 mb-3" />
              <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-1">
                No matching answers found
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto mb-4">
                We haven't listed this specific question yet, but our engineering team can answer it directly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                className="text-xs font-semibold text-[#E11D48] dark:text-red-400 hover:underline"
              >
                Clear filters and view all questions
              </button>
            </div>
          )}
        </div>

        {/* Bottom Direct Support Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 dark:from-[#111827] dark:to-[#0b101b] border border-neutral-700/80 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-[#E11D48]" />
              <span>Have a Custom Technical Requirement?</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-1.5">
              Discuss architecture, APIs, or timelines directly with our lead engineer
            </h3>
            <p className="text-sm text-neutral-300">
              No sales pitches. Send over your preliminary notes, API specs, or wireframes for a straightforward feasibility evaluation.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
            <button
              type="button"
              onClick={onOpenEnquiry}
              className="btn-tactile-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48]"
            >
              <span>Submit Project Scope</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
