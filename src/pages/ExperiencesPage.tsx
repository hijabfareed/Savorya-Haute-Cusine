/**
 * @file ExperiencesPage.tsx
 * @description Dedicated Experiences & Dining Atmospheres Page for Savorya.
 * Highlights the five bespoke dining zones across the restaurant in F-7 Markaz, Islamabad,
 * allowing patrons to choose their desired ambiance and seamlessly book tables.
 * Documented line-by-line for clear educational structure.
 */

// Import React library
import React from 'react';
// Import icons from lucide-react
import { 
  Compass, 
  Crown, 
  Users, 
  Sparkles, 
  Music, 
  Flame, 
  Eye, 
  ShieldCheck, 
  Calendar, 
  ArrowRight 
} from 'lucide-react';
// Import types and data
import { PageId, SeatingZone } from '../types';
import { SEATING_ZONES } from '../data/restaurantData';
// Import motion animations
import { motion } from 'motion/react';

// Props interface for ExperiencesPage
export interface ExperiencesPageProps {
  // Navigation handler
  onNavigate: (page: PageId) => void;
  // Handler when user selects a specific seating zone to reserve
  onSelectZoneToBook: (zone: SeatingZone) => void;
}

// Detailed experience zone metadata with unique photos
const EXPERIENCES_DETAIL = [
  {
    name: 'Main Dining Hall' as SeatingZone,
    subtitle: 'Gilded Cathedral Ceilings & Steinway Concert Acoustics',
    description: 'Step into our flagship dining grand salon illuminated by hand-cut bohemian crystal chandeliers and warm gilded moldings. Featuring plush midnight-velvet banquettes and nightly classical performances on our vintage Steinway Grand, this regal setting transforms every dinner into an aristocratic celebration.',
    capacity: 'Up to 60 Guests • Tables for 2 to 8',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
    highlights: ['Austrian Crystal Chandelier Canopy', 'Nightly Steinway Grand Piano Recitals', 'Bespoke Royal Porcelain Settings', 'Personal Sommelier Concierge'],
    badge: 'Most Celebrated',
  },
  {
    name: 'The Amber Cellar Vault' as SeatingZone,
    subtitle: 'Exclusive Sommelier Cellar & Private Tasting Chamber',
    description: 'An exclusive subterranean enclave nestled within Savorya\'s private reserve vault. Surrounded by temperature-controlled artisanal botanical reserves, warm backlit timber, and intimate low-glow candelabras, this secluded chamber delivers an unparalleled multi-sensory journey paired with rare vintage zero-proof elixirs and discreet tableside service.',
    capacity: 'Up to 16 Guests • Tables for 2 to 4',
    image: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=1200&auto=format&fit=crop',
    highlights: ['Private Temperature-Controlled Reserve Cellar', 'Bespoke Sommelier Tasting & Course Pairings', 'Low-Glow Candelabra Ambiance & Velvet Seating', 'Dedicated Cellar Concierge & Discrete Privacy'],
  },
  {
    name: 'Chef’s Counter' as SeatingZone,
    subtitle: 'Front-Row Gastronomic Theater & Binchotan Charcoal',
    description: 'An exclusive ten-seat front-row culinary theater framing the master kitchen brigade. Watch Chef Sara orchestrate live tableside alchemy over white Kishu Binchotan charcoal, torching Miyazaki Wagyu with 24K gold leaf and infusing dishes with aromatic cherrywood smoke.',
    capacity: '10 Theater High-Chairs Only',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop',
    highlights: ['Direct Interactive Plating with Chef Sara', '10 Omakase Velvet High-Chairs Only', 'Live Binchotan Charcoal & Flambé Theater', 'Tableside Rare Ingredient Storytelling'],
    badge: 'Epicurean Theater',
  },
  {
    name: 'Margalla Skyline Terrace' as SeatingZone,
    subtitle: 'Panoramic Heated Glass Pavilion Under Starlight',
    description: 'Elevated above the city, our glass-enclosed starlight pavilion commands sweeping panoramic views of the illuminated Margalla ridgeline and capital skyline. Climate-controlled with underfloor warming and retractable skylights, it offers an ethereal open-sky setting for golden hour sunsets and starlit dinners.',
    capacity: 'Up to 34 Guests • Tables for 2 to 6',
    image: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?q=80&w=1200&auto=format&fit=crop',
    highlights: ['Unobstructed Margalla Hills Panorama', 'Climate-Controlled Glass Solarium', 'Golden Hour Twilight Sunset Seating', 'Heated Starlit Dining All Year Round'],
    badge: 'Scenic Skyline',
  },
  {
    name: 'Private Imperial VIP Suite' as SeatingZone,
    subtitle: 'Secluded Royal Salons with Private Butler & Entrance',
    description: 'Crafted exclusively for heads of state, executive leadership summits, and bespoke family milestones. Boasts discrete private chauffeured access, dedicated royal maitre d\' service, gold-leaf tableware, and customized 9-course degustation menus tailored to guests\' exact preferences.',
    capacity: 'Private Room • 6 to 14 Guests',
    image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?q=80&w=1200&auto=format&fit=crop',
    highlights: ['Discrete Private Entrance & Cloakroom', 'Dedicated Private Executive Chef & Butler', 'Custom Gold-Embossed Monogrammed Menus', 'Independent Acoustic & Ambient Controls'],
    badge: 'VIP Royalty',
  },
];

export const ExperiencesPage: React.FC<ExperiencesPageProps> = ({
  onNavigate,
  onSelectZoneToBook,
}) => {
  return (
    <div id="experiences-page-view" className="pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      
      {/* ------------------------------------------------------------------- */}
      {/* PAGE BANNER HEADER                                                  */}
      {/* ------------------------------------------------------------------- */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181818] border border-[#D4AF37]/40 shadow">
          <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase">
            Bespoke Dining Atmospheres
          </span>
        </div>

        <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-bold text-[#F3E5AB]">
          Immerse in <span className="text-[#D4AF37]">Sensory Opulence</span>
        </h1>

        <p className="text-sm sm:text-base text-[#A89878] font-cormorant text-xl max-w-2xl mx-auto">
          Every corner of Savorya in F-7 Markaz offers a distinct visual and acoustic environment tailored to elevate your dining celebration.
        </p>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* ATMOSPHERES LIST                                                    */}
      {/* ------------------------------------------------------------------- */}
      <div className="space-y-12">
        {EXPERIENCES_DETAIL.map((exp, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={exp.name}
              className={`p-8 sm:p-12 rounded-3xl bg-[#161616] border border-[#D4AF37]/30 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
                !isEven ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Photo Column */}
              <div className={`lg:col-span-6 relative ${!isEven ? 'lg:order-2' : ''}`}>
                <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl h-80 sm:h-96">
                  <img
                    src={exp.image}
                    alt={exp.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-transparent opacity-80" />
                  
                  {/* Badge */}
                  {exp.badge && (
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#121212]/95 border border-[#D4AF37]/60 text-xs font-bold text-[#D4AF37] shadow-xl">
                      {exp.badge}
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#F3E5AB]">
                    <span className="flex items-center gap-1.5 bg-[#121212]/80 px-3 py-1 rounded-full border border-[#D4AF37]/20">
                      <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{exp.capacity}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Text Description Column */}
              <div className={`lg:col-span-6 space-y-6 ${!isEven ? 'lg:order-1' : ''}`}>
                <div className="space-y-2">
                  <span className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-widest block">
                    Atmosphere {idx + 1}
                  </span>
                  <h2 className="font-serif-luxury text-3xl font-bold text-[#F3E5AB]">
                    {exp.name}
                  </h2>
                  <p className="text-xs text-[#C5A059] font-medium">
                    {exp.subtitle}
                  </p>
                </div>

                <p className="text-sm text-[#A89878] leading-relaxed">
                  {exp.description}
                </p>

                {/* Highlight Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {exp.highlights.map((hl, hIdx) => (
                    <div
                      key={hIdx}
                      className="p-2.5 rounded-xl bg-[#121212] border border-[#D4AF37]/20 flex items-center gap-2 text-xs text-[#E5D7B7]"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>

                {/* Booking Trigger Button */}
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectZoneToBook(exp.name);
                      onNavigate('reservation');
                    }}
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#121212] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg flex items-center gap-2 active:scale-95 transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Reserve in {exp.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
