/**
 * @file FAQSection.tsx
 * @description Luxury FAQ accordion section for Savorya.
 * Addresses guest inquiries regarding dress code, reservation policies,
 * complimentary valet parking, Halal certification, and private dining.
 */

import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  Shirt,
  CalendarCheck,
  Car,
  ShieldCheck,
  Sparkles,
  PhoneCall,
  Clock,
  Wine
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { PageId } from '../types';

export interface FAQItem {
  id: string;
  category: 'dress-code' | 'reservations' | 'parking' | 'culinary';
  categoryLabel: string;
  question: string;
  answer: string;
  icon: React.ElementType;
  highlights?: string[];
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-dress-code',
    category: 'dress-code',
    categoryLabel: 'Dress Code',
    question: 'What is the required dress code at Savorya?',
    answer: 'Savorya maintains an atmosphere of refined elegance. We kindly ask our guests to observe a Smart Elegant or Formal fine dining dress code. Tailored suits, collared shirts, evening dresses, and elegant national/cultural attire are warmly welcomed.',
    icon: Shirt,
    highlights: [
      'Smart Elegant / Formal attire recommended',
      'Refined national and cultural attire is celebrated',
      'Athletic apparel, tank tops, gym shorts, and flip-flops are strictly restricted',
    ],
  },
  {
    id: 'faq-reservation-policy',
    category: 'reservations',
    categoryLabel: 'Reservations',
    question: 'What is your reservation, table hold, and cancellation policy?',
    answer: 'To ensure an unhurried experience for all guests, reserved tables are held for a maximum grace period of 15 minutes past the booking time before being released. We kindly request notice at least 4 hours prior for standard party cancellations or modifications.',
    icon: CalendarCheck,
    highlights: [
      '15-minute grace period for table holds',
      '4 hours advance notice for modifications',
      'Private Vault suites and large banquets (6+ guests) require deposit confirmation',
    ],
  },
  {
    id: 'faq-valet-parking',
    category: 'parking',
    categoryLabel: 'Valet & Parking',
    question: 'Is parking available at your F-7 Markaz location?',
    answer: 'Yes, Savorya provides complimentary chauffeured valet parking directly at our private entrance in F-7 Markaz, Islamabad. Our dedicated vehicle concierge team and 24/7 security personnel ensure immediate, hassle-free arrival and departure.',
    icon: Car,
    highlights: [
      'Complimentary chauffeured valet service',
      '24/7 monitored private vehicle bay',
      'Direct covered entrance access in F-7 Markaz',
    ],
  },
  {
    id: 'faq-halal-dietary',
    category: 'culinary',
    categoryLabel: 'Culinary & Halal',
    question: 'Are your culinary preparations 100% Halal certified?',
    answer: 'Every ingredient, cut of meat, poultry, and artisanal preparation across our entire menu is strictly 100% Halal certified, sourced from verified gourmet purveyors. Our culinary brigade also accommodates bespoke allergies, gluten-free, dairy-free, and vegan preferences with prior notice.',
    icon: ShieldCheck,
    highlights: [
      '100% Halal certified gourmet meats & poultry',
      'Gluten-free, vegan & allergy-sensitive custom menus',
      'Dedicated allergen separation protocols in our prep kitchen',
    ],
  },
  {
    id: 'faq-beverage-program',
    category: 'culinary',
    categoryLabel: 'Beverages',
    question: 'What beverage pairings and mixology options are offered?',
    answer: 'Savorya features an artisanal zero-alcohol mixology program designed by master beverage crafters. We curate botanical infusions, smoked de-alcoholized aperitifs, cold-pressed elixirs, and single-estate rare mountain teas that pair harmoniously with our tasting courses.',
    icon: Wine,
    highlights: [
      'Artisanal zero-alcohol botanical infusions',
      'Sommelier-crafted mocktail pairings for each course',
      'Single-estate Himalayan & Ceylon vintage tea selections',
    ],
  },
  {
    id: 'faq-children-atmosphere',
    category: 'reservations',
    categoryLabel: 'Atmosphere',
    question: 'What is the policy regarding children and group dining?',
    answer: 'Guests of all ages are warmly welcomed for our Weekend Luncheon service. For our candlelit Evening Dinner Service (after 7:00 PM), we strive to preserve an intimate gastronomic ambiance; we recommend children be at least 8 years of age or hosted within our private dining salons.',
    icon: Sparkles,
    highlights: [
      'All ages welcome during Weekend Luncheon (12:30 PM - 4:00 PM)',
      'Intimate fine dining ambiance preserved for evening dinners',
      'Sound-insulated Private VIP Dining suites available for families',
    ],
  },
];

export interface FAQSectionProps {
  onNavigate?: (page: PageId) => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openId, setOpenId] = useState<string | null>('faq-dress-code');

  const categories = [
    { id: 'all', label: 'All Inquiries' },
    { id: 'dress-code', label: 'Dress Code' },
    { id: 'reservations', label: 'Reservations' },
    { id: 'parking', label: 'Valet & Parking' },
    { id: 'culinary', label: 'Halal & Dining' },
  ];

  const filteredFaqs = selectedCategory === 'all'
    ? FAQ_DATA
    : FAQ_DATA.filter((item) => item.category === selectedCategory);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="contact-faq-section"
      aria-label="Frequently Asked Questions"
      className="space-y-10 pt-8"
    >
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181818] border border-[#D4AF37]/40 shadow">
          <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase">
            Guest Protocol & Inquiries
          </span>
        </div>

        <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#F3E5AB]">
          Frequently Asked <span className="text-[#D4AF37]">Questions</span>
        </h2>

        <p className="text-xs sm:text-sm text-[#A89878] max-w-xl mx-auto leading-relaxed">
          Essential information regarding etiquette, table reservations, complimentary valet service, and our culinary standards to ensure an impeccable dining experience.
        </p>
      </div>

      {/* Category Navigation Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              id={`faq-tab-${cat.id}`}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 focus:outline-none ${
                isActive
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#121212] shadow-md shadow-[#D4AF37]/20 font-bold'
                  : 'bg-[#181818] border border-[#D4AF37]/25 text-[#C5A059] hover:border-[#D4AF37] hover:text-[#F3E5AB]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* FAQ Accordion Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-start">
        {filteredFaqs.map((faq) => {
          const isOpen = openId === faq.id;
          const Icon = faq.icon;

          return (
            <div
              key={faq.id}
              id={faq.id}
              className={`rounded-3xl transition-all duration-300 border overflow-hidden ${
                isOpen
                  ? 'bg-[#181818] border-[#D4AF37] shadow-xl shadow-[#D4AF37]/5'
                  : 'bg-[#141414] border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
              }`}
            >
              {/* Accordion Trigger Header */}
              <button
                type="button"
                onClick={() => toggleAccordion(faq.id)}
                aria-expanded={isOpen}
                className="w-full p-6 sm:p-7 text-left flex items-start justify-between gap-4 focus:outline-none group"
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border transition-colors ${
                      isOpen
                        ? 'bg-[#D4AF37] text-[#121212] border-[#D4AF37]'
                        : 'bg-[#1a1a1a] text-[#D4AF37] border-[#D4AF37]/30 group-hover:border-[#D4AF37]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block mb-1">
                      {faq.categoryLabel}
                    </span>
                    <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-[#F3E5AB] group-hover:text-[#D4AF37] transition-colors leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                </div>

                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                    isOpen
                      ? 'bg-[#121212] border-[#D4AF37] text-[#D4AF37] rotate-180'
                      : 'bg-[#1a1a1a] border-[#D4AF37]/30 text-[#A89878] group-hover:border-[#D4AF37] group-hover:text-[#F3E5AB]'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {/* Accordion Content Body */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    <div className="px-6 sm:px-7 pb-6 pt-1 text-xs text-[#A89878] space-y-4 border-t border-[#D4AF37]/15">
                      <p className="leading-relaxed text-[#D6C7A1]">
                        {faq.answer}
                      </p>

                      {faq.highlights && (
                        <div className="p-3.5 rounded-2xl bg-[#121212] border border-[#D4AF37]/20 space-y-2">
                          <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-bold block">
                            Key Details
                          </span>
                          <ul className="space-y-1.5">
                            {faq.highlights.map((hl, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-[#C5A059]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                                <span>{hl}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Bottom Assistance Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#181818] via-[#1a1813] to-[#181818] border border-[#D4AF37]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Clock className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
              Personal Concierge Desk
            </span>
          </div>
          <h4 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#F3E5AB]">
            Have a bespoke request or private event inquiry?
          </h4>
          <p className="text-xs text-[#8c826e] max-w-xl">
            Our Maitre d’ and event sommeliers are available daily from 11:00 AM to 11:00 PM for private arrangements.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          <a
            id="faq-call-concierge-btn"
            href={`tel:${RESTAURANT_INFO.phone}`}
            className="px-5 py-3 rounded-full bg-[#141414] border border-[#D4AF37]/50 text-[#F3E5AB] hover:text-[#D4AF37] hover:border-[#D4AF37] text-xs font-semibold tracking-wider flex items-center gap-2 transition-all shadow-md"
          >
            <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
            <span>Call Concierge</span>
          </a>

          {onNavigate && (
            <button
              id="faq-book-table-cta-btn"
              type="button"
              onClick={() => onNavigate('reservation')}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#B38E30] text-[#121212] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#D4AF37]/15 transition-all active:scale-95"
            >
              Reserve a Table
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
