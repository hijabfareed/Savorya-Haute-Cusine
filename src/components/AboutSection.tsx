/**
 * @file AboutSection.tsx
 * @description Narrative section presenting Savorya's heritage, Master Chef philosophy, and culinary artistry.
 * Rich dark obsidian surfaces paired with refined gold accents and photography grids.
 */

// Import React library
import React from 'react';
// Import icons from lucide-react
import { 
  Sparkles, 
  Flame, 
  Wine, 
  Award, 
  Leaf, 
  CheckCircle2,
  Calendar
} from 'lucide-react';
// Import animations from motion
import { motion } from 'motion/react';

// Props interface for AboutSection
export interface AboutSectionProps {
  // Handler to open table reservation modal
  onOpenReservation: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenReservation }) => {
  return (
    // Section wrapper with dark charcoal background
    <section
      id="about"
      className="py-24 bg-[#141414] relative overflow-hidden border-t border-b border-[#D4AF37]/15"
    >
      {/* Subtle Background Glow Accent */}
      <div className="absolute -right-40 top-1/3 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Responsive Grid Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Story, Philosophy & Accolades (7 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col"
          >
            {/* Section Tagline Badge */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1 rounded-full bg-[#1e1e1e] border border-[#D4AF37]/30 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[11px] font-semibold tracking-[0.2em] text-[#D4AF37] uppercase">
                The Heritage of Savorya
              </span>
            </div>

            {/* Main Section Heading */}
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#F3E5AB] leading-tight">
              A Culinary Symphony of <br />
              <span className="text-[#D4AF37] italic">Pure Passion & Precision</span>
            </h2>

            {/* Narrative Body Paragraph 1 */}
            <p className="mt-6 text-sm sm:text-base text-[#D4AF37]/80 leading-relaxed font-cormorant text-lg">
              Founded under the vision of Executive Chef Sara, <strong className="text-[#F3E5AB] font-semibold">Savorya</strong> was born from a singular obsession: to elevate the dinner table into an extraordinary multi-sensory theater of fine art.
            </p>

            {/* Narrative Body Paragraph 2 */}
            <p className="mt-3 text-sm sm:text-base text-[#A89878] leading-relaxed">
              Every evening, we curate limited seasonal tasting experiences sourced from boutique biodynamic farms, Japanese seafood auctions in Toyosu, and century-old French vineyards. Our dishes balance centuries of classical French technique with avant-garde modern alchemy.
            </p>

            {/* Four Core Culinary Pillars */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Pillar 1: Rare Sourcing */}
              <div className="p-4 rounded-xl bg-[#1a1a1a] border border-[#D4AF37]/20 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#252525] text-[#D4AF37] mt-0.5">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif-luxury text-base font-semibold text-[#F3E5AB]">Binchotan Mastery</h3>
                  <p className="text-xs text-[#A89878] mt-1">High-heat smokeless grilling over Japanese white oak charcoal.</p>
                </div>
              </div>

              {/* Pillar 2: Master Cellar */}
              <div className="p-4 rounded-xl bg-[#1a1a1a] border border-[#D4AF37]/20 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#252525] text-[#D4AF37] mt-0.5">
                  <Wine className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif-luxury text-base font-semibold text-[#F3E5AB]">Sommelier Vault</h3>
                  <p className="text-xs text-[#A89878] mt-1">Over 4,000 vintage grand crus and biodynamic natural wines.</p>
                </div>
              </div>

              {/* Pillar 3: Michelin Standard */}
              <div className="p-4 rounded-xl bg-[#1a1a1a] border border-[#D4AF37]/20 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#252525] text-[#D4AF37] mt-0.5">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif-luxury text-base font-semibold text-[#F3E5AB]">Michelin Standards</h3>
                  <p className="text-xs text-[#A89878] mt-1">Uncompromising hospitality, silver service, and bespoke plating.</p>
                </div>
              </div>

              {/* Pillar 4: Ethical & Organic */}
              <div className="p-4 rounded-xl bg-[#1a1a1a] border border-[#D4AF37]/20 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#252525] text-[#D4AF37] mt-0.5">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif-luxury text-base font-semibold text-[#F3E5AB]">100% Ethical Origins</h3>
                  <p className="text-xs text-[#A89878] mt-1">Direct-trade micro farms, wild line-caught fisheries, zero-waste.</p>
                </div>
              </div>
            </div>

            {/* Chef Quote Card */}
            <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-[#1b1b1b] to-[#161616] border-l-4 border-[#D4AF37] shadow-lg">
              <p className="italic text-sm text-[#F3E5AB]/90 font-cormorant text-lg">
                "Dining at Savorya is not simply about sustenance; it is a sacred pause in time where every texture, aroma, and vintage creates an indelible memory."
              </p>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold tracking-wider text-[#D4AF37] uppercase">Sara</span>
                  <span className="text-xs text-[#8c826e] ml-2">— Executive Chef & Co-Founder</span>
                </div>
                <button
                  type="button"
                  onClick={onOpenReservation}
                  className="inline-flex items-center gap-1 text-xs text-[#D4AF37] hover:text-[#F3E5AB] font-semibold transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Reserve Table</span>
                </button>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Visual Imagery Grid with Gold Borders (5 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            {/* Grid of Fine Dining Atmosphere Imagery */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* Photo 1: Plating Detail */}
              <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl relative group">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop"
                  alt="Savorya restaurant interior chandeliers"
                  referrerPolicy="no-referrer"
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-70" />
                <span className="absolute bottom-3 left-3 text-[11px] font-semibold text-[#F3E5AB] uppercase tracking-wider">
                  The Grand Hall
                </span>
              </div>

              {/* Photo 2: Executive Chef in Action */}
              <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl relative group mt-6">
                <img
                  src="/assets/chef-sara-action.jpg"
                  alt="Executive Chef Sara crafting dishes at Savorya"
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-70" />
                <span className="absolute bottom-3 left-3 text-[11px] font-semibold text-[#F3E5AB] uppercase tracking-wider">
                  Artisan Line
                </span>
              </div>

              {/* Photo 3: Wine Cellar Vault */}
              <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl relative group -mt-6">
                <img
                  src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop"
                  alt="Subterranean Grand Cru wine cellar vault"
                  referrerPolicy="no-referrer"
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-70" />
                <span className="absolute bottom-3 left-3 text-[11px] font-semibold text-[#F3E5AB] uppercase tracking-wider">
                  Private Cellar
                </span>
              </div>

              {/* Photo 4: Golden Caviar & Scallop Plating */}
              <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl relative group">
                <img
                  src="https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=800&auto=format&fit=crop"
                  alt="Gourmet scallop dish with saffron foam"
                  referrerPolicy="no-referrer"
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-70" />
                <span className="absolute bottom-3 left-3 text-[11px] font-semibold text-[#F3E5AB] uppercase tracking-wider">
                  Gold Plating
                </span>
              </div>
            </div>

            {/* Central Floating Luxury Seal */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-full bg-[#121212] border-2 border-[#D4AF37] shadow-2xl flex flex-col items-center justify-center text-center w-24 h-24">
              <span className="text-[10px] text-[#C5A059] uppercase tracking-widest font-bold">EST.</span>
              <span className="font-serif-luxury text-lg font-extrabold text-[#D4AF37]">2014</span>
              <span className="text-[9px] text-[#A69980] tracking-tight">Savorya</span>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
