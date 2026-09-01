/**
 * @file SpecialOffersSection.tsx
 * @description Promotional & Seasonal tasting experiences banner for Savorya.
 * Allows patrons to copy privilege codes and discover exclusive dining packages.
 */

// Import React and hooks
import React, { useState } from 'react';
// Import icons from lucide-react
import { 
  Sparkles, 
  Tag, 
  Copy, 
  Check, 
  Calendar, 
  Clock, 
  ArrowRight
} from 'lucide-react';
// Import mock data and types
import { SPECIAL_OFFERS } from '../data/restaurantData';
import { SpecialOffer } from '../types';
// Import animations from motion
import { motion } from 'motion/react';

// Props interface for SpecialOffersSection
export interface SpecialOffersSectionProps {
  // Callback to open reservation modal with prefilled promo or offer note
  onClaimOffer: (offer: SpecialOffer) => void;
  // Callback when a promo code is copied to display toast
  onCopyCode: (code: string) => void;
}

export const SpecialOffersSection: React.FC<SpecialOffersSectionProps> = ({
  onClaimOffer,
  onCopyCode,
}) => {
  // State tracking which promo code was recently copied to show checkmark
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Copy code handler
  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    onCopyCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  return (
    // Section wrapper with dark fine-dining background
    <section
      id="offers"
      className="py-24 bg-[#141414] relative border-t border-[#D4AF37]/20"
    >
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c1c1c] border border-[#D4AF37]/35 mb-4 shadow-lg">
            <Tag className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase">
              Seasonal Tasting Privileges
            </span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#F3E5AB]">
            Limited <span className="text-[#D4AF37] italic">Tasting Editions</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#A89878] font-cormorant text-lg">
            Curated seasonal indulgences and cellar flights crafted for our discerning patrons. Use code at checkout or mention upon reservation.
          </p>
        </div>

        {/* 2-Column Offers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {SPECIAL_OFFERS.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="rounded-3xl bg-[#1a1a1a] border border-[#D4AF37]/30 hover:border-[#D4AF37]/70 transition-all duration-300 shadow-xl overflow-hidden flex flex-col md:flex-row"
            >
              {/* Photo Side */}
              <div className="md:w-5/12 relative h-64 md:h-auto overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#1a1a1a] via-transparent to-transparent opacity-70" />
                
                {/* Discount Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#D4AF37] text-[#121212] font-extrabold text-xs tracking-wider shadow-lg">
                  {offer.discountText}
                </div>
              </div>

              {/* Information Side */}
              <div className="md:w-7/12 p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-luxury text-xl font-bold text-[#F3E5AB]">
                    {offer.title}
                  </h3>
                  <span className="text-xs text-[#C5A059] block mt-1">
                    {offer.subtitle}
                  </span>

                  <p className="text-xs text-[#A89878] mt-3 leading-relaxed">
                    {offer.description}
                  </p>

                  {/* Feature Highlights Checklist */}
                  <div className="mt-4 space-y-1.5">
                    {offer.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#E5D7B7]">
                        <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Promo Code & Claim Button */}
                <div className="mt-6 pt-4 border-t border-[#D4AF37]/15 flex flex-col sm:flex-row items-center gap-3 justify-between">
                  
                  {/* Copyable Promo Code Chip */}
                  <button
                    type="button"
                    onClick={() => handleCopy(offer.code)}
                    title="Click to copy privilege code"
                    className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-[#121212] border border-dashed border-[#D4AF37]/50 text-xs text-[#F3E5AB] flex items-center justify-between sm:justify-start gap-2 hover:border-[#D4AF37] transition-all"
                  >
                    <span className="font-mono text-[#D4AF37] font-bold">{offer.code}</span>
                    {copiedCode === offer.code ? (
                      <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-[#8c826e]" />
                    )}
                  </button>

                  {/* Reserve / Claim CTA */}
                  <button
                    type="button"
                    onClick={() => onClaimOffer(offer)}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#121212] font-bold text-xs uppercase tracking-wider hover:brightness-110 flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#121212]" />
                    <span>Reserve Package</span>
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
