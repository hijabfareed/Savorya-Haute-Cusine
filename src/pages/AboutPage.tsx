/**
 * @file AboutPage.tsx
 * @description Dedicated About Page for Savorya luxury restaurant in Islamabad.
 * Showcases the restaurant's origin story, Master Chef Sara's philosophy,
 * halal fine-dining sourcing standards, architectural aesthetic, and Michelin accolades.
 * Documented line-by-line for comprehensive educational quality.
 */

// Import React library
import React from 'react';
// Import icons from lucide-react
import { 
  Crown, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  Flame, 
  HeartHandshake, 
  CheckCircle2, 
  MapPin, 
  ArrowRight,
  Utensils
} from 'lucide-react';
// Import types and data
import { PageId } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';
// Import motion animations
import { motion } from 'motion/react';

// Props interface for AboutPage
export interface AboutPageProps {
  // Handler to navigate between pages
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div id="about-page-view" className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      
      {/* ------------------------------------------------------------------- */}
      {/* PAGE BANNER HEADER                                                  */}
      {/* ------------------------------------------------------------------- */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181818] border border-[#D4AF37]/40 shadow"
        >
          <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase">
            Our Culinary Legacy
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-bold text-[#F3E5AB] leading-tight"
        >
          The Story of <span className="text-[#D4AF37]">Savorya</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-[#A89878] font-cormorant text-xl leading-relaxed"
        >
          Born from a passion to redefine luxury dining in Pakistan, Savorya blends centuries-old French haute cuisine with opulent Eastern hospitality in F-7 Markaz, Islamabad.
        </motion.p>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* SECTION 1: MASTER CHEF SARA SPOTLIGHT                              */}
      {/* ------------------------------------------------------------------- */}
      <section className="p-8 sm:p-14 rounded-3xl bg-[#161616] border border-[#D4AF37]/30 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Chef Photo Card */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl">
            <img
              src="/assets/chef-sara.jpg"
              alt="Executive Master Chef Sara"
              className="w-full h-[460px] object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#121212]/95 border border-[#D4AF37]/30 backdrop-blur-md">
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block">
                Founding Culinary Master
              </span>
              <h3 className="font-serif-luxury text-lg font-bold text-[#F3E5AB]">
                Chef Sara
              </h3>
              <p className="text-xs text-[#8c826e] mt-0.5">
                Michelin Starred • Paris & Tokyo Classical Alumna
              </p>
            </div>
          </div>
        </div>

        {/* Right Chef Biography & Philosophy */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1f1f1f] border border-[#D4AF37]/30 text-[10px] text-[#D4AF37] uppercase font-bold tracking-wider">
            <Flame className="w-3.5 h-3.5" />
            <span>Culinary Philosophy</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#F3E5AB] leading-snug">
            "Every dish is a canvas of memory, emotion, and unyielding precision."
          </h2>

          <p className="text-sm text-[#A89878] leading-relaxed">
            Having honed her craft across the storied kitchens of Paris, Kyoto, and London, Chef Sara returned to Islamabad with a singular vision: to establish an imperial dining sanctum where classical European technical mastery honors the finest Halal-certified ingredients, regional Pakistani heritage, and vibrant Himalayan flavors.
          </p>

          <p className="text-sm text-[#A89878] leading-relaxed">
            At Savorya, no detail is deemed trivial. From the precise temperature of our Binchotan charcoal grills to the delicate hand-placement of 24-karat edible gold foil, every culinary gesture is choreographed for pure sensory astonishment.
          </p>

          {/* Key Chef Tenets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-[#121212] border border-[#D4AF37]/20 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-[#F3E5AB]">Purity of Ingredients</h4>
                <p className="text-[11px] text-[#8c826e]">Certified Halal Wagyu & wild ocean seafood.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#121212] border border-[#D4AF37]/20 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-[#F3E5AB]">Theatrical Plating</h4>
                <p className="text-[11px] text-[#8c826e]">Tableside smoke infusions & molten ganache pours.</p>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* ------------------------------------------------------------------- */}
      {/* SECTION 2: THE THREE PILLARS OF SAVORYA                            */}
      {/* ------------------------------------------------------------------- */}
      <section className="space-y-10">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181818] border border-[#D4AF37]/30">
            <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[10px] font-bold tracking-widest text-[#D4AF37] uppercase">
              Our Core Standards
            </span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#F3E5AB]">
            The Three Pillars of Savorya
          </h2>
          <p className="text-xs sm:text-sm text-[#A89878]">
            Setting the benchmark for haute gastronomy and bespoke hospitality in Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1 */}
          <div className="p-8 rounded-3xl bg-[#161616] border border-[#D4AF37]/25 hover:border-[#D4AF37] transition-all space-y-4 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-[#121212] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-[#F3E5AB]">
              1. 100% Halal Luxury Sourcing
            </h3>
            <p className="text-xs sm:text-sm text-[#8c826e] leading-relaxed">
              Every cut of Miyazaki A5 Wagyu, Australian rack of lamb, and poultry is strictly Halal certified. We source directly from artisanal regenerative farms upholding the highest ethical standards.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 rounded-3xl bg-[#161616] border border-[#D4AF37]/25 hover:border-[#D4AF37] transition-all space-y-4 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-[#121212] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-[#F3E5AB]">
              2. Zero-Alcohol Artistry
            </h3>
            <p className="text-xs sm:text-sm text-[#8c826e] leading-relaxed">
              We have completely eliminated alcohol, replacing it with cold-smoked Kashmiri saffron elixirs, distilled Damascus rosewater fizz, and botanical mocktail pairings crafted by master mixologists.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 rounded-3xl bg-[#161616] border border-[#D4AF37]/25 hover:border-[#D4AF37] transition-all space-y-4 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-[#121212] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <HeartHandshake className="w-7 h-7" />
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-[#F3E5AB]">
              3. Transparent Fine Dining Pricing
            </h3>
            <p className="text-xs sm:text-sm text-[#8c826e] leading-relaxed">
              True luxury should be dignified and transparent. All our culinary creations are priced strictly under 10,000 PKR, guaranteeing world-class excellence without artificial inflation.
            </p>
          </div>

        </div>

      </section>

      {/* ------------------------------------------------------------------- */}
      {/* SECTION 3: THE ISLAMABAD LOCATION & SANCTUARY                       */}
      {/* ------------------------------------------------------------------- */}
      <section className="p-8 sm:p-12 rounded-3xl bg-[#141414] border border-[#D4AF37]/30 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1e1e] border border-[#D4AF37]/30">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[10px] font-bold tracking-widest text-[#D4AF37] uppercase">
              Location & Architecture
            </span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#F3E5AB]">
            An Obsidian Sanctuary in F-7 Markaz
          </h2>

          <p className="text-sm text-[#A89878] leading-relaxed">
            Positioned in the cultural epicenter of Islamabad at F-7 Markaz, Savorya's interior architecture is an homage to midnight obsidian stone, brushed champagne brass, and warm incandescent glow.
          </p>

          <p className="text-sm text-[#A89878] leading-relaxed">
            Guests are welcomed into high-ceilinged dining salons, private subterranean tasting vaults, and an elevated glass terrace gazing toward the Margalla Hills.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => onNavigate('menu')}
              className="px-6 py-3 rounded-xl bg-[#D4AF37] text-[#121212] font-bold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg"
            >
              Explore Menu
            </button>
            <button
              type="button"
              onClick={() => onNavigate('reservation')}
              className="px-6 py-3 rounded-xl bg-[#1f1f1f] border border-[#D4AF37]/40 text-[#F3E5AB] hover:border-[#D4AF37] font-bold text-xs uppercase tracking-widest"
            >
              Reserve a Table
            </button>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1000&auto=format&fit=crop"
            alt="Savorya Interior Architecture in F-7 Markaz"
            referrerPolicy="no-referrer"
            className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 text-xs text-[#F3E5AB] font-serif-luxury">
            Savorya Main Grand Salon • F-7 Markaz, Islamabad
          </div>
        </div>

      </section>

    </div>
  );
};
