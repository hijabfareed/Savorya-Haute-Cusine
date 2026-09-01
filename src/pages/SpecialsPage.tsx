/**
 * @file SpecialsPage.tsx
 * @description Dedicated Chef's Specials & Limited-Edition Tasting Offers Page for Savorya.
 * Showcases exclusive seasonal culinary courses, claimable promo privilege vouchers,
 * tasting flight passes, and direct reservation triggers.
 * Documented line-by-line for clear educational structure.
 */

// Import React and hooks
import React, { useState } from 'react';
// Import icons from lucide-react
import { 
  Crown, 
  Sparkles, 
  Tag, 
  Check, 
  Copy, 
  ArrowRight, 
  Calendar, 
  Clock, 
  Star, 
  Plus, 
  Info 
} from 'lucide-react';
// Import types and data
import { PageId, MenuItem, SpecialOffer } from '../types';
import { SPECIAL_OFFERS, MENU_ITEMS } from '../data/restaurantData';
// Import motion animations
import { motion } from 'motion/react';

// Props interface for SpecialsPage
export interface SpecialsPageProps {
  // Navigation handler
  onNavigate: (page: PageId) => void;
  // Menu items list
  items?: MenuItem[];
  // Dish inspection handler
  onSelectDish: (dish: MenuItem) => void;
  // Add to cart handler
  onAddToCart: (dish: MenuItem, e?: React.MouseEvent) => void;
  // Claim offer handler
  onClaimOffer: (offer: SpecialOffer) => void;
  // Copy promo code handler
  onCopyCode: (code: string) => void;
}

export const SpecialsPage: React.FC<SpecialsPageProps> = ({
  onNavigate,
  items = MENU_ITEMS,
  onSelectDish,
  onAddToCart,
  onClaimOffer,
  onCopyCode,
}) => {
  // Filter only chef special dishes
  const list = items || MENU_ITEMS;
  const chefSpecialDishes = list.filter((item) => item.isChefSpecial);
  // State tracking copied code feedback
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Copy code with feedback
  const handleCopy = (code: string) => {
    onCopyCode(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <div id="specials-page-view" className="pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      
      {/* ------------------------------------------------------------------- */}
      {/* PAGE BANNER HEADER                                                  */}
      {/* ------------------------------------------------------------------- */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181818] border border-[#D4AF37]/40 shadow">
          <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase">
            Exclusive Masterworks
          </span>
        </div>

        <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-bold text-[#F3E5AB]">
          Chef’s Specials & <span className="text-[#D4AF37]">Tasting Privileges</span>
        </h1>

        <p className="text-sm sm:text-base text-[#A89878] font-cormorant text-xl max-w-2xl mx-auto">
          Rare seasonal flights, 24K gold confections, and limited-edition tasting privileges curated exclusively for Savorya patrons.
        </p>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* SECTION 1: PROMO PRIVILEGE CARDS & OFFERS                           */}
      {/* ------------------------------------------------------------------- */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4">
          <h2 className="font-serif-luxury text-2xl font-bold text-[#F3E5AB] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            <span>Seasonal Tasting Packages & Privilege Passes</span>
          </h2>
          <span className="text-xs text-[#8c826e]">Limited Daily Availability</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {SPECIAL_OFFERS.map((offer) => (
            <div
              key={offer.id}
              className="rounded-3xl bg-[#161616] border border-[#D4AF37]/30 shadow-2xl overflow-hidden flex flex-col justify-between"
            >
              {/* Top Banner Image */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-[#161616]/40 to-transparent" />
                
                {/* Discount Tag */}
                <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-[#D4AF37] text-[#121212] text-xs font-bold uppercase tracking-wider shadow-lg">
                  {offer.discountText}
                </div>
              </div>

              {/* Offer Details */}
              <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-widest block">
                    {offer.subtitle}
                  </span>
                  <h3 className="font-serif-luxury text-2xl font-bold text-[#F3E5AB]">
                    {offer.title}
                  </h3>
                  <p className="text-xs text-[#A89878] leading-relaxed">
                    {offer.description}
                  </p>

                  {/* Highlight bullets */}
                  <div className="space-y-2 pt-2">
                    {offer.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#E5D7B7]">
                        <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Promo Code & Action Box */}
                <div className="pt-4 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  
                  {/* Coupon Code Pill */}
                  <button
                    type="button"
                    onClick={() => handleCopy(offer.code)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#121212] border border-[#D4AF37]/40 flex items-center justify-between sm:justify-start gap-3 text-xs font-mono font-bold text-[#D4AF37] hover:bg-[#1f1f1f] transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Code: {offer.code}</span>
                    </div>
                    {copiedCode === offer.code ? (
                      <span className="text-[10px] text-[#7bf1a8] font-sans font-normal">Copied!</span>
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-[#8c826e]" />
                    )}
                  </button>

                  {/* Reserve / Claim Button */}
                  <button
                    type="button"
                    onClick={() => {
                      onClaimOffer(offer);
                      onNavigate('reservation');
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#121212] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
                  >
                    <span>Claim & Reserve Table</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                </div>

              </div>

            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* SECTION 2: CHEF’S SIGNATURE CREATIONS                               */}
      {/* ------------------------------------------------------------------- */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4">
          <div>
            <h2 className="font-serif-luxury text-2xl font-bold text-[#F3E5AB] flex items-center gap-2">
              <Crown className="w-5 h-5 text-[#D4AF37]" />
              <span>Chef Sara's Signature Masterpieces</span>
            </h2>
            <p className="text-xs text-[#8c826e] mt-1">
              Dishes awarded highest acclaim for precision technique and luxury ingredients.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chefSpecialDishes.map((dish) => (
            <div
              key={dish.id}
              className="rounded-3xl bg-[#161616] border border-[#D4AF37]/25 hover:border-[#D4AF37] shadow-xl overflow-hidden flex flex-col justify-between transition-all duration-300"
            >
              {/* Photo */}
              <div
                className="relative h-60 overflow-hidden cursor-pointer"
                onClick={() => onSelectDish(dish)}
              >
                <img
                  src={dish.image}
                  alt={dish.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-transparent opacity-85" />
                <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-[#121212]/90 border border-[#D4AF37]/50 text-xs font-bold text-[#D4AF37]">
                  PKR {dish.price.toLocaleString()}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    onClick={() => onSelectDish(dish)}
                    className="font-serif-luxury text-lg font-bold text-[#F3E5AB] hover:text-[#D4AF37] transition-colors cursor-pointer"
                  >
                    {dish.name}
                  </h3>
                  <p className="text-xs text-[#8c826e] line-clamp-2 mt-1.5 leading-relaxed">
                    {dish.description}
                  </p>
                </div>

                {dish.chefNote && (
                  <div className="p-3 rounded-xl bg-[#121212] border border-[#D4AF37]/20 text-[11px] text-[#E5D7B7] italic">
                    Chef's Note: "{dish.chefNote}"
                  </div>
                )}

                <div className="pt-3 border-t border-[#D4AF37]/15 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectDish(dish)}
                    className="flex-1 py-2.5 rounded-xl bg-[#202020] hover:bg-[#282828] text-[#F3E5AB] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Info className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>View Ingredients</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => onAddToCart(dish, e)}
                    className="px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#C5A059] text-[#121212] font-bold text-xs flex items-center justify-center gap-1 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Order</span>
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
