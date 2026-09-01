/**
 * @file HeroSection.tsx
 * @description Cinematic luxury Hero banner for Savorya fine-dining restaurant.
 * Features dark obsidian backgrounds, gold typography, key culinary accolades, and interactive action triggers.
 */

// Import React library
import React from 'react';
// Import icons from lucide-react
import { 
  Sparkles, 
  Calendar, 
  Utensils, 
  Award, 
  Wine, 
  Flame, 
  ChevronDown,
  Clock
} from 'lucide-react';
// Import animations from motion
import { motion } from 'motion/react';

// Props interface for HeroSection
export interface HeroSectionProps {
  // Handler to open table reservation modal
  onOpenReservation: () => void;
  // Handler to scroll smoothly down to menu section
  onExploreMenu: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenReservation,
  onExploreMenu,
}) => {
  return (
    // Main full-screen hero wrapper with dark obsidian aesthetic
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#121212]"
    >
      {/* Background Image Layer with Dark Luxury Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        {/* Cinematic dark restaurant interior image */}
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop"
          alt="Savorya luxury fine-dining dining hall ambiance"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-25 scale-105 transform duration-10000 hover:scale-100"
        />
        {/* Radial Dark Vignette Overlay for focus */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/80 to-[#121212]/90" />
        {/* Subtle Warm Gold Light Bloom Effect in the Center */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Top Michelin / Luxury Distinction Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1a1a1a]/90 border border-[#D4AF37]/40 shadow-xl mb-6 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="text-xs font-semibold tracking-[0.2em] text-[#F3E5AB] uppercase">
            3-Star Michelin Culinary Excellence
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
        </motion.div>

        {/* Primary Luxury Heading with Playfair Display / Cormorant Styling */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#F3E5AB] max-w-4xl leading-[1.15]"
        >
          Where Haute Cuisine Meets <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] bg-clip-text text-transparent italic">
            Pure Gold Artistry
          </span>
        </motion.h1>

        {/* Subtitle & Story Hook */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-[#C5A059]/90 max-w-2xl font-normal leading-relaxed font-cormorant"
        >
          Welcome to <strong className="text-[#F3E5AB] font-semibold">Savorya</strong>. An intimate sanctuary of gastronomic wonder where rare ingredients, binchotan fire, and sommelier grand crus weave unforgettable evenings.
        </motion.p>

        {/* Interactive Action CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          {/* Primary Action: Book a Table at Savorya */}
          <button
            id="hero-reserve-btn"
            type="button"
            onClick={onOpenReservation}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#B38E30] text-[#121212] font-bold text-sm tracking-widest uppercase shadow-xl shadow-[#D4AF37]/20 hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5"
          >
            <Calendar className="w-4 h-4 text-[#121212]" />
            <span>Reserve a Table</span>
          </button>

          {/* Secondary Action: Explore Gourmet Menu */}
          <button
            id="hero-explore-menu-btn"
            type="button"
            onClick={onExploreMenu}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1a1a1a]/80 hover:bg-[#222222] border border-[#D4AF37]/50 text-[#F3E5AB] font-semibold text-sm tracking-widest uppercase hover:border-[#D4AF37] transition-all duration-300 flex items-center justify-center gap-2.5 backdrop-blur-sm"
          >
            <Utensils className="w-4 h-4 text-[#D4AF37]" />
            <span>Explore Menu</span>
          </button>
        </motion.div>

        {/* Floating Accolade Metric Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-14 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-8 border-t border-[#D4AF37]/20"
        >
          {/* Accolade 1: Michelin Distinction */}
          <div className="p-3.5 rounded-xl bg-[#181818]/80 border border-[#D4AF37]/15 flex flex-col items-center justify-center text-center">
            <Award className="w-5 h-5 text-[#D4AF37] mb-1.5" />
            <span className="font-serif-luxury text-xl font-bold text-[#F3E5AB]">3 Stars</span>
            <span className="text-[11px] text-[#A69980] tracking-wider uppercase">Michelin Guide</span>
          </div>

          {/* Accolade 2: Vintage Grand Crus */}
          <div className="p-3.5 rounded-xl bg-[#181818]/80 border border-[#D4AF37]/15 flex flex-col items-center justify-center text-center">
            <Wine className="w-5 h-5 text-[#D4AF37] mb-1.5" />
            <span className="font-serif-luxury text-xl font-bold text-[#F3E5AB]">4,000+</span>
            <span className="text-[11px] text-[#A69980] tracking-wider uppercase">Cellar Bottles</span>
          </div>

          {/* Accolade 3: Japanese Charcoal Fire */}
          <div className="p-3.5 rounded-xl bg-[#181818]/80 border border-[#D4AF37]/15 flex flex-col items-center justify-center text-center">
            <Flame className="w-5 h-5 text-[#D4AF37] mb-1.5" />
            <span className="font-serif-luxury text-xl font-bold text-[#F3E5AB]">Binchotan</span>
            <span className="text-[11px] text-[#A69980] tracking-wider uppercase">White Charcoal Grill</span>
          </div>

          {/* Accolade 4: Service Hours */}
          <div className="p-3.5 rounded-xl bg-[#181818]/80 border border-[#D4AF37]/15 flex flex-col items-center justify-center text-center">
            <Clock className="w-5 h-5 text-[#D4AF37] mb-1.5" />
            <span className="font-serif-luxury text-xl font-bold text-[#F3E5AB]">5 PM – Late</span>
            <span className="text-[11px] text-[#A69980] tracking-wider uppercase">Dinner & Cocktails</span>
          </div>
        </motion.div>

        {/* Subtle Scroll Down Prompt Indicator */}
        <div className="mt-8 flex flex-col items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={onExploreMenu}
            aria-label="Scroll down to menu"
            className="text-xs tracking-widest text-[#C5A059] uppercase flex flex-col items-center gap-1 focus:outline-none"
          >
            <span>Discover Savorya</span>
            <ChevronDown className="w-4 h-4 text-[#D4AF37] animate-bounce" />
          </button>
        </div>

      </div>
    </section>
  );
};
