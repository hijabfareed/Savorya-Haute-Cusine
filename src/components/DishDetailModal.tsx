/**
 * @file DishDetailModal.tsx
 * @description Comprehensive modal dialog displaying deep culinary context, ingredients, allergens,
 * zero-alcohol botanical pairings, and custom preparation instructions for a selected Savorya dish.
 * Documented line-by-line for clear educational structure.
 */

// Import React and hooks
import React, { useState, useEffect } from 'react';
// Import icons from lucide-react
import { 
  X, 
  Star, 
  Coffee, 
  Clock, 
  Flame, 
  AlertTriangle, 
  Check, 
  Sparkles, 
  Plus, 
  Minus, 
  ShoppingBag,
  MessageSquare
} from 'lucide-react';
// Import TypeScript interfaces
import { MenuItem } from '../types';
// Import animations from motion
import { motion, AnimatePresence } from 'motion/react';

// Props interface for DishDetailModal
export interface DishDetailModalProps {
  // Currently selected dish to display (null if modal is closed)
  dish: MenuItem | null;
  // Callback function to close the modal
  onClose: () => void;
  // Callback function when user adds this dish to cart with quantity and custom instructions
  onAddToCartWithNotes: (dish: MenuItem, quantity: number, notes?: string) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
  onAddToCartWithNotes,
}) => {
  // Quantity counter state (defaults to 1)
  const [quantity, setQuantity] = useState<number>(1);
  
  // Custom preparation or dietary instructions state
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  // Reset local state when a new dish is opened
  useEffect(() => {
    if (dish) {
      setQuantity(1);
      setSpecialInstructions('');
    }
  }, [dish]);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // If no dish is selected, return null to avoid rendering
  if (!dish) return null;

  // Calculate dynamic total price in PKR for the selected quantity
  const calculatedTotal = (dish.price * quantity).toLocaleString();

  // Submit handler to add to order
  const handleAddToOrder = () => {
    onAddToCartWithNotes(dish, quantity, specialInstructions.trim() ? specialInstructions.trim() : undefined);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 md:p-8">
        
        {/* Backdrop Dark Glass Blur Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0a0a0a]/85 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl bg-[#181818] border border-[#D4AF37]/35 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
        >
          {/* Close Icon Button */}
          <button
            id="modal-close-btn"
            type="button"
            onClick={onClose}
            aria-label="Close dish details"
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#121212]/80 border border-[#D4AF37]/40 text-[#F3E5AB] hover:text-[#D4AF37] hover:bg-[#1a1a1a] transition-all focus:outline-none backdrop-blur-md"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Scrollable Modal Content */}
          <div className="overflow-y-auto flex-1">
            
            {/* Top Visual Imagery Banner */}
            <div className="relative h-72 sm:h-80 w-full overflow-hidden">
              <img
                src={dish.image}
                alt={dish.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/30 to-transparent" />

              {/* Badges on Top of Photo */}
              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                <div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {dish.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-[#121212]/90 border border-[#D4AF37]/50 text-xs font-semibold text-[#F3E5AB] uppercase tracking-wider backdrop-blur-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#F3E5AB]">
                    {dish.name}
                  </h2>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-[#D4AF37]">
                    PKR {dish.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Body Info Sections */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Rating & Prep Metadata Bar */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#A89878] pb-4 border-b border-[#D4AF37]/15">
                <div className="flex items-center gap-1.5 text-[#D4AF37] font-bold">
                  <Star className="w-4 h-4 fill-[#D4AF37]" />
                  <span>{dish.rating.toFixed(2)}</span>
                  <span className="text-[#8c826e] font-normal">({dish.reviewCount} guest reviews)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                  <span>{dish.prepTimeMinutes} mins culinary prep</span>
                </div>
                {dish.calories && (
                  <div className="flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-[#D4AF37]" />
                    <span>{dish.calories} kcal</span>
                  </div>
                )}
              </div>

              {/* Full Dish Narrative Description */}
              <div>
                <h3 className="text-xs uppercase tracking-widest font-bold text-[#D4AF37] mb-2">
                  Gastronomic Narrative
                </h3>
                <p className="text-sm sm:text-base text-[#E5D7B7] leading-relaxed font-cormorant text-lg">
                  {dish.description}
                </p>
              </div>

              {/* Chef's Secret Note */}
              {dish.chefNote && (
                <div className="p-4 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#F3E5AB] uppercase tracking-wider">Chef Sara's Technique</h4>
                    <p className="text-xs text-[#A89878] mt-1 leading-relaxed italic font-cormorant text-base">
                      "{dish.chefNote}"
                    </p>
                  </div>
                </div>
              )}

              {/* Zero-Alcohol Botanical Pairing Recommendation */}
              {dish.beveragePairing && (
                <div className="p-4 rounded-2xl bg-[#1d1a15] border border-[#D4AF37]/40 flex items-start gap-3">
                  <Coffee className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#F3E5AB] uppercase tracking-wider">Artisanal Non-Alcoholic Pairing</h4>
                    <p className="text-xs text-[#D4AF37] mt-1 font-semibold">
                      {dish.beveragePairing}
                    </p>
                  </div>
                </div>
              )}

              {/* Ingredients Breakdown */}
              <div>
                <h3 className="text-xs uppercase tracking-widest font-bold text-[#D4AF37] mb-2.5">
                  Artisanal Halal Ingredients
                </h3>
                <div className="flex flex-wrap gap-2">
                  {dish.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="px-3 py-1 rounded-lg bg-[#202020] border border-[#D4AF37]/20 text-xs text-[#F3E5AB] flex items-center gap-1.5"
                    >
                      <Check className="w-3 h-3 text-[#D4AF37]" />
                      <span>{ing}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Allergens Warning Banner */}
              {dish.allergens.length > 0 && (
                <div className="p-3.5 rounded-xl bg-[#221717] border border-[#ff6b6b]/30 flex items-center gap-3">
                  <AlertTriangle className="w-4 h-4 text-[#ff9999] shrink-0" />
                  <div className="text-xs text-[#ffcccc]">
                    <span className="font-semibold">Contains Allergens:</span> {dish.allergens.join(', ')}. Please inform our service brigade of any severe dietary requirements.
                  </div>
                </div>
              )}

              {/* Custom Dietary & Culinary Instruction Text Area */}
              <div>
                <label 
                  htmlFor="special-instructions"
                  className="block text-xs uppercase tracking-widest font-bold text-[#D4AF37] mb-2 flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Special Preparation Notes (Optional)</span>
                </label>
                <textarea
                  id="special-instructions"
                  rows={2}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g. Extra sauce on side, medium rare Wagyu, celebrate anniversary..."
                  className="w-full p-3 rounded-xl bg-[#121212] border border-[#D4AF37]/30 text-xs text-[#F3E5AB] placeholder-[#7d7565] focus:outline-none focus:border-[#D4AF37] resize-none"
                />
              </div>

            </div>
          </div>

          {/* Fixed Footer Bar with Stepper & Add to Order Button */}
          <div className="p-5 bg-[#141414] border-t border-[#D4AF37]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Quantity Stepper Controls */}
            <div className="flex items-center gap-3 bg-[#1e1e1e] px-4 py-2 rounded-xl border border-[#D4AF37]/30">
              <span className="text-xs uppercase tracking-wider text-[#8c826e] font-semibold">Qty:</span>
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
                className="p-1 rounded-lg bg-[#2a2a2a] hover:bg-[#353535] text-[#F3E5AB] hover:text-[#D4AF37] transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-serif-luxury text-base font-bold text-[#F3E5AB] w-6 text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
                className="p-1 rounded-lg bg-[#2a2a2a] hover:bg-[#353535] text-[#F3E5AB] hover:text-[#D4AF37] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add to Order CTA with Calculated Total in PKR */}
            <button
              id="modal-add-to-order-btn"
              type="button"
              onClick={handleAddToOrder}
              className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#B38E30] hover:brightness-110 text-[#121212] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#D4AF37]/15 active:scale-98 transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-[#121212]" />
              <span>Add to Order — PKR {calculatedTotal}</span>
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
