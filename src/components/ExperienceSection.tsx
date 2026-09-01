/**
 * @file ExperienceSection.tsx
 * @description Fine-dining curated experiences showcase for Savorya.
 * Highlights bespoke private dining, wine cellar masterclasses, and chef's table encounters.
 */

// Import React library
import React from 'react';
// Import icons from lucide-react
import { 
  Sparkles, 
  Wine, 
  Crown, 
  Music, 
  Users, 
  ArrowRight,
  Calendar
} from 'lucide-react';
// Import animation primitives from motion
import { motion } from 'motion/react';

// Props interface for ExperienceSection
export interface ExperienceSectionProps {
  // Handler function to launch table reservation modal with selected experience preset
  onSelectExperience: (experienceName: string) => void;
}

// Curated luxury dining experiences list
const EXPERIENCES = [
  {
    id: 'exp-1',
    title: 'The Chef’s Counter Theater',
    subtitle: 'Exclusive 8-Guest Front-Row Gastronomy',
    description: 'Sit face-to-face with Executive Chef Sara as nine avant-garde courses are crafted and flambéed right before your eyes.',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1000&auto=format&fit=crop',
    icon: Crown,
    badge: 'Ultra Exclusive',
    perk: 'Includes 9 Courses & Direct Chef Commentary',
  },
  {
    id: 'exp-2',
    title: 'Subterranean Wine Cellar Vault',
    subtitle: 'Grand Cru Flights & Private Sommelier Pairing',
    description: 'Descend into our 19th-century stone cellar surrounded by over 4,000 vintage bottles for an intimate candlelit tasting.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1000&auto=format&fit=crop',
    icon: Wine,
    badge: 'Sommelier Curated',
    perk: 'Guided by Master Sommelier',
  },
  {
    id: 'exp-3',
    title: 'Skyline Terrace Glass Pavilion',
    subtitle: 'Panoramic City Views & Acoustic Jazz',
    description: 'Enjoy heated veranda dining under crystal chandeliers with nightly live acoustic jazz and curated champagne towers.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop',
    icon: Music,
    badge: 'Scenic Ambiance',
    perk: 'Nightly Live Acoustic Performance',
  },
];

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  onSelectExperience,
}) => {
  return (
    // Section wrapper with dark obsidian aesthetic
    <section
      id="experience"
      className="py-24 bg-[#121212] relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c1c1c] border border-[#D4AF37]/35 mb-4 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase">
              Beyond Ordinary Dining
            </span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#F3E5AB]">
            Bespoke <span className="text-[#D4AF37] italic">Culinary Experiences</span>
          </h2>

          <p className="mt-4 text-base text-[#A89878] font-cormorant text-lg">
            Immerse yourself in extraordinary gastronomic rituals designed for milestone celebrations, intimate romances, and connoisseur gatherings.
          </p>
        </div>

        {/* 3-Column Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EXPERIENCES.map((exp, index) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group rounded-3xl bg-[#181818] border border-[#D4AF37]/25 hover:border-[#D4AF37]/80 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:shadow-[#D4AF37]/10"
              >
                {/* Visual Imagery Banner */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/20 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#121212]/90 border border-[#D4AF37]/50 text-[10px] font-bold text-[#F3E5AB] uppercase tracking-wider backdrop-blur-md">
                    {exp.badge}
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Header with Icon */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2.5 rounded-xl bg-[#222222] border border-[#D4AF37]/30 text-[#D4AF37]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-serif-luxury text-xl font-bold text-[#F3E5AB] group-hover:text-[#D4AF37] transition-colors">
                          {exp.title}
                        </h3>
                        <span className="text-xs text-[#C5A059] font-medium">
                          {exp.subtitle}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#A89878] leading-relaxed mt-2 font-cormorant text-base">
                      {exp.description}
                    </p>

                    {/* Key Perk */}
                    <div className="mt-4 p-3 rounded-xl bg-[#141414] border border-[#D4AF37]/15 text-xs text-[#E5D7B7] flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>{exp.perk}</span>
                    </div>
                  </div>

                  {/* Booking CTA Button */}
                  <div className="mt-6 pt-5 border-t border-[#D4AF37]/15">
                    <button
                      type="button"
                      onClick={() => onSelectExperience(exp.title)}
                      className="w-full py-3 rounded-xl bg-[#202020] hover:bg-[#D4AF37] hover:text-[#121212] border border-[#D4AF37]/30 text-xs font-bold uppercase tracking-wider text-[#F3E5AB] transition-all flex items-center justify-center gap-2 group-hover:border-[#D4AF37]"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Inquire & Reserve</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
