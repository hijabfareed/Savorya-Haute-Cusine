/**
 * @file MenuSection.tsx
 * @description Interactive fine-dining menu browser for Savorya.
 * Features category tabs, keyword search, dietary filter pills, price sorting, and dish cards.
 */

// Import React and hooks
import React, { useState, useMemo } from 'react';
// Import icons from lucide-react
import { 
  Search, 
  Sparkles, 
  Crown, 
  UtensilsCrossed, 
  Flame, 
  Cake, 
  Wine, 
  Star, 
  Plus, 
  Clock, 
  Filter, 
  SlidersHorizontal,
  XCircle
} from 'lucide-react';
// Import types and data
import { MenuItem, MenuCategoryId, DietaryTag } from '../types';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/restaurantData';
// Import animation primitives from motion
import { motion, AnimatePresence } from 'motion/react';

// Props interface for MenuSection component
export interface MenuSectionProps {
  // All dishes data list
  items?: MenuItem[];
  // Handler when user clicks on a dish to open its details modal
  onSelectDish: (dish: MenuItem) => void;
  // Handler when user adds dish to cart
  onAddToCart: (dish: MenuItem, e: React.MouseEvent) => void;
}

// Available dietary filters
const DIETARY_FILTERS: DietaryTag[] = [
  'Chef Signature',
  'Gluten-Free',
  'Vegetarian',
  'Artisanal Pairing',
  'Halal'
];

export const MenuSection: React.FC<MenuSectionProps> = ({
  items = MENU_ITEMS,
  onSelectDish,
  onAddToCart,
}) => {
  // State for selected category tab ('all', 'starters', 'entrees', etc.)
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoryId>('all');
  
  // State for search query text
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // State for active dietary filter tag (null if none selected)
  const [activeDietaryFilter, setActiveDietaryFilter] = useState<DietaryTag | null>(null);
  
  // State for sort order ('featured' | 'price-asc' | 'price-desc' | 'rating')
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Helper mapping icon names to actual Lucide components
  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'Crown': return <Crown className="w-4 h-4" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-4 h-4" />;
      case 'Flame': return <Flame className="w-4 h-4" />;
      case 'Cake': return <Cake className="w-4 h-4" />;
      case 'Wine': return <Wine className="w-4 h-4" />;
      default: return <UtensilsCrossed className="w-4 h-4" />;
    }
  };

  // Filtered and sorted menu items using useMemo for computational efficiency
  const filteredDishes = useMemo(() => {
    const list = items || MENU_ITEMS;
    return list
      .filter((dish) => {
        // Match category filter
        if (selectedCategory !== 'all' && dish.categoryId !== selectedCategory) {
          return false;
        }

        // Match search query against name, description, and ingredients
        if (searchQuery.trim() !== '') {
          const query = searchQuery.toLowerCase();
          const matchName = dish.name.toLowerCase().includes(query);
          const matchDesc = dish.description.toLowerCase().includes(query);
          const matchIngredients = dish.ingredients.some((ing) => ing.toLowerCase().includes(query));
          if (!matchName && !matchDesc && !matchIngredients) {
            return false;
          }
        }

        // Match dietary tag filter
        if (activeDietaryFilter && !dish.tags.includes(activeDietaryFilter)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        // Apply sorting criteria
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // 'featured' keeps natural curated order
      });
  }, [items, selectedCategory, searchQuery, activeDietaryFilter, sortBy]);

  // Handler to clear all active search and filter constraints
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setActiveDietaryFilter(null);
    setSortBy('featured');
  };

  return (
    // Section wrapper with dark fine-dining background
    <section
      id="menu"
      className="py-24 bg-[#141414] relative border-t border-[#D4AF37]/20"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          
          {/* Section Tag Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c1c1c] border border-[#D4AF37]/35 mb-4 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase">
              Gastronomic Repertoire
            </span>
          </div>

          {/* Main Title */}
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#F3E5AB]">
            The <span className="text-[#D4AF37] italic">Savorya</span> Menu
          </h2>

          {/* Subtitle */}
          <p className="mt-3 text-sm sm:text-base text-[#A89878] font-cormorant text-lg">
            Every creation is prepared to order using pristine artisanal ingredients, French reduction techniques, and Japanese charcoal finishing.
          </p>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 gap-2.5 no-scrollbar mb-8">
          {MENU_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`category-btn-${cat.id}`}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#121212] shadow-lg shadow-[#D4AF37]/20 scale-105'
                    : 'bg-[#1c1c1c] text-[#C5A059] border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 hover:text-[#F3E5AB]'
                }`}
              >
                {renderCategoryIcon(cat.iconName)}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Search, Dietary Tags & Price Sorting Toolbar */}
        <div className="bg-[#191919] p-4 sm:p-5 rounded-2xl border border-[#D4AF37]/20 shadow-xl mb-10">
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
            
            {/* Search Input Box */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="menu-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes, truffles, wagyu..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#121212] border border-[#D4AF37]/30 text-xs text-[#F3E5AB] placeholder-[#7d7565] focus:outline-none focus:border-[#D4AF37] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A89878] hover:text-[#F3E5AB]"
                >
                  <XCircle className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dietary Tags Pill Filters */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              <span className="text-[11px] uppercase tracking-wider text-[#8c826e] font-semibold flex items-center gap-1 shrink-0">
                <Filter className="w-3 h-3 text-[#D4AF37]" /> Filter:
              </span>
              {DIETARY_FILTERS.map((tag) => {
                const isActive = activeDietaryFilter === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setActiveDietaryFilter(isActive ? null : tag)}
                    className={`px-3 py-1 rounded-lg text-xs tracking-tight whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-[#D4AF37] text-[#121212] font-bold shadow-md'
                        : 'bg-[#222222] text-[#A89878] hover:text-[#F3E5AB] border border-[#D4AF37]/15'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#D4AF37]" />
              <select
                id="menu-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#121212] border border-[#D4AF37]/30 text-xs text-[#F3E5AB] py-2 px-3 rounded-xl focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="featured">Curated Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

          </div>

          {/* Filter Status summary / Reset prompt if filtered */}
          {(searchQuery || activeDietaryFilter || selectedCategory !== 'all') && (
            <div className="mt-3 pt-3 border-t border-[#D4AF37]/15 flex items-center justify-between text-xs text-[#A89878]">
              <span>
                Showing <strong className="text-[#F3E5AB]">{filteredDishes.length}</strong> matching delicacies
              </span>
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-[#D4AF37] hover:underline font-semibold"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Menu Dishes Grid */}
        {filteredDishes.length === 0 ? (
          <div className="py-20 text-center rounded-2xl bg-[#191919] border border-[#D4AF37]/20 p-8">
            <UtensilsCrossed className="w-12 h-12 text-[#D4AF37]/40 mx-auto mb-4" />
            <h3 className="font-serif-luxury text-xl font-bold text-[#F3E5AB]">No culinary creations found</h3>
            <p className="text-xs text-[#A89878] mt-2 max-w-md mx-auto">
              We could not find any dishes matching your current filter criteria. Try clearing search keywords or selecting another category.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-5 px-5 py-2 rounded-full bg-[#D4AF37] text-[#121212] font-bold text-xs uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredDishes.map((dish) => (
                <motion.div
                  key={dish.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="group rounded-2xl bg-[#1a1a1a] border border-[#D4AF37]/20 hover:border-[#D4AF37]/70 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:shadow-[#D4AF37]/5"
                >
                  {/* Dish Visual Header */}
                  <div 
                    className="relative h-52 overflow-hidden cursor-pointer"
                    onClick={() => onSelectDish(dish)}
                  >
                    <img
                      src={dish.image}
                      alt={dish.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-80" />

                    {/* Left Tag Badge */}
                    {dish.tags[0] && (
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#121212]/90 border border-[#D4AF37]/40 text-[10px] font-bold text-[#F3E5AB] uppercase tracking-wider backdrop-blur-sm">
                        {dish.tags[0]}
                      </span>
                    )}

                    {/* Right Rating */}
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#121212]/90 border border-[#D4AF37]/40 text-[11px] font-bold text-[#D4AF37] flex items-center gap-1 backdrop-blur-sm">
                      <Star className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
                      <span>{dish.rating.toFixed(1)}</span>
                    </div>

                    {/* Quick Preparation time indicator */}
                    <div className="absolute bottom-2 right-3 text-[10px] text-[#A89878] flex items-center gap-1 bg-[#121212]/70 px-2 py-0.5 rounded backdrop-blur-sm">
                      <Clock className="w-2.5 h-2.5 text-[#D4AF37]" />
                      <span>{dish.prepTimeMinutes}m</span>
                    </div>
                  </div>

                  {/* Dish Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    
                    <div>
                      {/* Name & Price */}
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 
                          onClick={() => onSelectDish(dish)}
                          className="font-serif-luxury text-lg font-bold text-[#F3E5AB] group-hover:text-[#D4AF37] transition-colors cursor-pointer"
                        >
                          {dish.name}
                        </h3>
                        <span className="font-serif-luxury text-lg font-bold text-[#D4AF37]">
                          ${dish.price}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-[#A89878] line-clamp-2 leading-relaxed mb-3">
                        {dish.description}
                      </p>

                      {/* Ingredients preview */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {dish.ingredients.slice(0, 3).map((ing) => (
                          <span
                            key={ing}
                            className="text-[10px] text-[#8c826e] bg-[#141414] px-2 py-0.5 rounded border border-[#D4AF37]/10"
                          >
                            {ing}
                          </span>
                        ))}
                        {dish.ingredients.length > 3 && (
                          <span className="text-[10px] text-[#D4AF37]/80 px-1 py-0.5">
                            +{dish.ingredients.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 border-t border-[#D4AF37]/15 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => onSelectDish(dish)}
                        className="text-xs font-semibold text-[#C5A059] hover:text-[#F3E5AB] transition-colors"
                      >
                        Explore Recipe →
                      </button>

                      <button
                        type="button"
                        onClick={(e) => onAddToCart(dish, e)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#252525] hover:bg-[#D4AF37] hover:text-[#121212] border border-[#D4AF37]/35 text-[#F3E5AB] font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Add</span>
                      </button>
                    </div>

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
};
