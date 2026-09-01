/**
 * @file ChefSpecialsSection.tsx
 * @description Curated spotlight section celebrating Savorya's most iconic Michelin-starred creations.
 * Features dark obsidian card styling, gold metallic borders, rating stars, and instant order triggers.
 */

// Import React library
import React from 'react';
// Import icons from lucide-react
import { 
  Crown, 
  Star, 
  Plus, 
  Sparkles, 
  Wine, 
  Clock, 
  Flame,
  Info
} from 'lucide-react';
// Import types and data
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data/restaurantData';
// Import animation primitives from motion
import { motion } from 'motion/react';

// Props interface for ChefSpecialsSection
export interface ChefSpecialsSectionProps {
  // Full list of dishes to filter chef specials from
  items?: MenuItem[];
  // Handler function when user clicks to view detailed modal of a dish
  onSelectDish: (dish: MenuItem) => void;
  // Handler function to immediately add an item into the order cart
  onAddToCart: (dish: MenuItem, e: React.MouseEvent) => void;
}

export const ChefSpecialsSection: React.FC<ChefSpecialsSectionProps> = ({
  items = MENU_ITEMS,
  onSelectDish,
  onAddToCart,
}) => {
  // Filter for dishes marked as chef specials
  const list = items || MENU_ITEMS;
  const specialDishes = list.filter((dish) => dish.isChefSpecial);

  return (
    // Section wrapper with dark luxury ambiance
    <section
      id="specials"
      className="py-24 bg-[#121212] relative overflow-hidden"
    >
      {/* Background radial gold glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c1c1c] border border-[#D4AF37]/40 mb-4 shadow-lg">
            <Crown className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-semibold tracking-[0.2em] text-[#F3E5AB] uppercase">
              Culinary Masterpieces
            </span>
          </div>

          {/* Section Main Title */}
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#F3E5AB] leading-tight">
            Chef Sara’s <span className="text-[#D4AF37] italic">Signatures</span>
          </h2>

          {/* Section Subtitle */}
          <p className="mt-4 text-base sm:text-lg text-[#C5A059] font-cormorant leading-relaxed">
            Exquisite culinary creations that define the essence of Savorya — sculpted with rare ingredients, vintage reductions, and tableside theatrical finishes.
          </p>
        </div>

        {/* Grid of Chef's Special Dish Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialDishes.map((dish, index) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group rounded-2xl bg-[#181818] border border-[#D4AF37]/25 hover:border-[#D4AF37]/80 transition-all duration-300 shadow-xl flex flex-col overflow-hidden hover:shadow-2xl hover:shadow-[#D4AF37]/10"
            >
              {/* Card Image Wrapper with Dark Overlay & Zoom Effect */}
              <div 
                className="relative h-64 overflow-hidden cursor-pointer"
                onClick={() => onSelectDish(dish)}
              >
                <img
                  src={dish.image}
                  alt={dish.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Gradient dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-[#121212]/40" />

                {/* Top Badge: Chef Selection */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#121212]/90 border border-[#D4AF37]/50 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  <span className="text-[10px] font-bold tracking-widest text-[#F3E5AB] uppercase">
                    Signature Creation
                  </span>
                </div>

                {/* Top Right: Rating Score */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#121212]/90 border border-[#D4AF37]/40 backdrop-blur-md flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                  <span className="text-xs font-bold text-[#F3E5AB]">{dish.rating.toFixed(1)}</span>
                </div>

                {/* Quick Info Button Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#121212]/40 backdrop-blur-[2px]">
                  <span className="px-4 py-2 rounded-full bg-[#1a1a1a] border border-[#D4AF37] text-xs font-semibold text-[#F3E5AB] flex items-center gap-1.5 shadow-xl">
                    <Info className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>View Ingredients & Pairings</span>
                  </span>
                </div>
              </div>

              {/* Card Body Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                
                <div>
                  {/* Dish Title & Price Header */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 
                      onClick={() => onSelectDish(dish)}
                      className="font-serif-luxury text-xl font-bold text-[#F3E5AB] group-hover:text-[#D4AF37] transition-colors cursor-pointer"
                    >
                      {dish.name}
                    </h3>
                    <div className="text-right">
                      <span className="font-serif-luxury text-xl font-bold text-[#D4AF37]">
                        PKR {dish.price.toLocaleString()}
                      </span>
                      {dish.originalPrice && (
                        <span className="block text-xs text-[#8c826e] line-through -mt-1">
                          PKR {dish.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Culinary Description */}
                  <p className="text-xs sm:text-sm text-[#A89878] line-clamp-2 leading-relaxed mb-4">
                    {dish.description}
                  </p>

                  {/* Beverage Pairing Highlight */}
                  {dish.beveragePairing && (
                    <div className="p-2.5 rounded-lg bg-[#141414] border border-[#D4AF37]/15 mb-4 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span className="text-[11px] text-[#C5A059] truncate">
                        <strong className="text-[#F3E5AB] font-medium">Artisanal Pairing:</strong> {dish.beveragePairing}
                      </span>
                    </div>
                  )}

                  {/* Dietary & Preparation Tag Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {dish.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#222222] text-[#C5A059] border border-[#D4AF37]/20"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#222222] text-[#8c826e] flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {dish.prepTimeMinutes} mins
                    </span>
                  </div>
                </div>

                {/* Action Buttons Row */}
                <div className="pt-4 border-t border-[#D4AF37]/15 flex items-center gap-3">
                  
                  {/* View Full Story / Details Button */}
                  <button
                    type="button"
                    onClick={() => onSelectDish(dish)}
                    className="flex-1 py-2.5 rounded-lg bg-[#202020] hover:bg-[#282828] border border-[#D4AF37]/30 text-xs font-semibold text-[#F3E5AB] hover:text-[#D4AF37] transition-all"
                  >
                    View Details
                  </button>

                  {/* Add to Cart Order Button */}
                  <button
                    type="button"
                    onClick={(e) => onAddToCart(dish, e)}
                    title={`Add ${dish.name} to order`}
                    className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#C5A059] hover:brightness-110 text-[#121212] font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#121212] stroke-[3]" />
                    <span>Order</span>
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
