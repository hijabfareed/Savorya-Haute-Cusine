/**
 * @file TestimonialsSection.tsx
 * @description Gastronomic reviews and Michelin critic praise for Savorya.
 * Elegant dark obsidian cards with gold quotes, star ratings, and inspector credentials.
 */

// Import React library
import React from 'react';
// Import icons from lucide-react
import { Star, Quote, Sparkles, Award } from 'lucide-react';
// Import dataset and types
import { TESTIMONIALS } from '../data/restaurantData';
// Import animations from motion
import { motion } from 'motion/react';

export const TestimonialsSection: React.FC = () => {
  return (
    // Section wrapper with dark obsidian background
    <section
      id="testimonials"
      className="py-24 bg-[#121212] relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c1c1c] border border-[#D4AF37]/35 mb-4 shadow-lg">
            <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase">
              Critical Acclaim
            </span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#F3E5AB]">
            Voices of <span className="text-[#D4AF37] italic">Connoisseurs</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#A89878] font-cormorant text-lg">
            Reflections from international Michelin inspectors, esteemed culinary writers, and our cherished private dining patrons.
          </p>
        </div>

        {/* 3-Column Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="rounded-3xl bg-[#181818] border border-[#D4AF37]/25 hover:border-[#D4AF37]/70 transition-all duration-300 p-7 shadow-xl flex flex-col justify-between hover:shadow-2xl hover:shadow-[#D4AF37]/5"
            >
              <div>
                {/* Top Quote Icon & 5-Star Rating */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-2 rounded-xl bg-[#202020] border border-[#D4AF37]/30 text-[#D4AF37]">
                    <Quote className="w-4 h-4" />
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-sm text-[#E5D7B7] italic leading-relaxed font-cormorant text-lg">
                  "{review.quote}"
                </p>
              </div>

              {/* Reviewer Profile Footer */}
              <div className="mt-8 pt-5 border-t border-[#D4AF37]/15 flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.author}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full object-cover border border-[#D4AF37]/50"
                />
                <div>
                  <h4 className="font-serif-luxury text-sm font-bold text-[#F3E5AB]">
                    {review.author}
                  </h4>
                  <p className="text-[11px] text-[#C5A059]">
                    {review.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Michelin Guide Distinction Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#181818] via-[#1c1c1c] to-[#181818] border border-[#D4AF37]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#121212] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shrink-0 shadow-lg">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-lg font-bold text-[#F3E5AB]">
                Official 2025/2026 Michelin Guide Distinction
              </h3>
              <p className="text-xs text-[#A89878] mt-0.5">
                Rated Exceptional Cuisine Worth a Special Journey — 3 Stars Awarded to Chef Sara.
              </p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="inline-block px-4 py-2 rounded-full bg-[#121212] border border-[#D4AF37]/50 text-xs font-bold tracking-widest text-[#D4AF37] uppercase">
              Rated 4.97 / 5.00 Worldwide
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
