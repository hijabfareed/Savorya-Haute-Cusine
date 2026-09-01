/**
 * @file MenuPage.tsx
 * @description Dedicated Gastronomic Menu Page for Savorya.
 * Features category filtering, real-time search query, dietary filter chips,
 * price sorting, dish inspection modal trigger, and direct add-to-cart operations.
 * All prices strictly in PKR and under 10,000 PKR. Zero alcohol / Halal certified.
 * Documented line-by-line for educational clarity.
 */

// Import React library and state hooks
import React, { useState, useMemo } from 'react';
// Import icons from lucide-react
import { 
  Sparkles, 
  Search, 
  SlidersHorizontal, 
  Star, 
  Plus, 
  Info, 
  Clock, 
  Check, 
  Crown, 
  UtensilsCrossed, 
  Flame, 
  Cake, 
  Coffee,
  X
} from 'lucide-react';
// Import types and data
import { MenuItem, MenuCategoryId, DietaryTag, PageId } from '../types';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/restaurantData';
// Import motion animations
import { motion, AnimatePresence } from 'motion/react';

// Props interface for MenuPage
export interface MenuPageProps {
  // Complete list of menu items
  items?: MenuItem[];
  // Handler to inspect a dish in modal
  onSelectDish: (dish: MenuItem) => void;
  // Handler to add a dish directly to cart
  onAddToCart: (dish: MenuItem, e?: React.MouseEvent) => void;
  // Optional navigation handler
  onNavigate?: (page: PageId) => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({
  items = MENU_ITEMS,
  onSelectDish,
  onAddToCart,
  onNavigate,
}) => {
  // Active category filter state (defaults to 'all')
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoryId>('all');
  // Search query text input state
  const [searchQuery, setSearchQuery] = useState<string>('');
  // Active dietary tag filter state (null = all tags)
  const [selectedDietaryTag, setSelectedDietaryTag] = useState<DietaryTag | 'all'>('all');
  // Sort option state ('default', 'price-asc', 'price-desc', 'rating')
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating'>('default');

  // List of available dietary filter tags
  const dietaryTags: (DietaryTag | 'all')[] = [
    'all',
    'Chef Signature',
    'Halal',
    'Gluten-Free',
    'Vegetarian',
    'Vegan',
    'Artisanal Pairing',
  ];

  // Map category icon components
  const getCategoryIcon = (id: MenuCategoryId) => {
    switch (id) {
      case 'signatures':
        return <Crown className="w-4 h-4" />;
      case 'starters':
        return <UtensilsCrossed className="w-4 h-4" />;
      case 'entrees':
        return <Flame className="w-4 h-4" />;
      case 'desserts':
        return <Cake className="w-4 h-4" />;
      case 'beverages':
        return <Coffee className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  // Filter and sort dishes based on active filters with useMemo
  const filteredDishes = useMemo(() => {
    const list = items || MENU_ITEMS;
    return list
      .filter((dish) => {
        // Category match check
        const categoryMatch = selectedCategory === 'all' || dish.categoryId === selectedCategory;

        // Search query match check (dish name, description, ingredients, or pairings)
        const query = searchQuery.toLowerCase().trim();
        const searchMatch =
          !query ||
          dish.name.toLowerCase().includes(query) ||
          dish.description.toLowerCase().includes(query) ||
          dish.ingredients.some((ing) => ing.toLowerCase().includes(query)) ||
          (dish.beveragePairing && dish.beveragePairing.toLowerCase().includes(query));

        // Dietary tag match check
        const dietaryMatch =
          selectedDietaryTag === 'all' || dish.tags.includes(selectedDietaryTag as DietaryTag);

        return categoryMatch && searchMatch && dietaryMatch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [items, selectedCategory, searchQuery, selectedDietaryTag, sortBy]);

  return (
    <div id="menu-page-view" className="pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* ------------------------------------------------------------------- */}
      {/* HEADER TITLE & INTRODUCTION                                         */}
      {/* ------------------------------------------------------------------- */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181818] border border-[#D4AF37]/40 shadow">
          <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase">
            Gastronomic Repertoire
          </span>
        </div>

        <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-bold text-[#F3E5AB]">
          The Savorya <span className="text-[#D4AF37]">Menu</span>
        </h1>

        <p className="text-sm sm:text-base text-[#A89878] font-cormorant text-xl max-w-2xl mx-auto">
          Every plate is a symphony of flavor, crafted with 100% Halal certified prime ingredients and priced strictly under 10,000 PKR.
        </p>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* SEARCH, CATEGORY TABS & FILTER CONTROLS BAR                        */}
      {/* ------------------------------------------------------------------- */}
      <div className="space-y-6">
        
        {/* Search Bar & Sorting Select */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Input Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="menu-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by dish, ingredient, or pairing..."
              className="w-full pl-10 pr-10 py-3 rounded-2xl bg-[#161616] border border-[#D4AF37]/30 text-xs text-[#F3E5AB] placeholder-[#8c826e] focus:outline-none focus:border-[#D4AF37] shadow-lg"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8c826e] hover:text-[#F3E5AB]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <SlidersHorizontal className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span className="text-xs text-[#8c826e] uppercase tracking-wider hidden sm:inline">Sort By:</span>
            <select
              id="menu-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2.5 rounded-xl bg-[#161616] border border-[#D4AF37]/30 text-xs text-[#F3E5AB] focus:outline-none focus:border-[#D4AF37] shadow-lg flex-1 sm:flex-none"
            >
              <option value="default">Chef’s Curation</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

        </div>

        {/* Category Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {MENU_CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-3 rounded-2xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#121212] shadow-lg shadow-[#D4AF37]/20 scale-102'
                    : 'bg-[#161616] text-[#A89878] hover:text-[#F3E5AB] border border-[#D4AF37]/20 hover:border-[#D4AF37]/40'
                }`}
              >
                {getCategoryIcon(category.id)}
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Dietary Tag Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap pt-1">
          <span className="text-[11px] uppercase tracking-wider text-[#8c826e] mr-1">Dietary Filter:</span>
          {dietaryTags.map((tag) => {
            const isSelected = selectedDietaryTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedDietaryTag(tag)}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                  isSelected
                    ? 'bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37]'
                    : 'bg-[#141414] border border-[#D4AF37]/15 text-[#8c826e] hover:text-[#E5D7B7]'
                }`}
              >
                {tag === 'all' ? 'All Dietary' : tag}
              </button>
            );
          })}
        </div>

      </div>

      {/* ------------------------------------------------------------------- */}
      {/* DISHES GRID SECTION                                                 */}
      {/* ------------------------------------------------------------------- */}
      {filteredDishes.length === 0 ? (
        <div className="p-16 rounded-3xl bg-[#161616] border border-[#D4AF37]/25 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#1e1e1e] border border-[#D4AF37]/30 mx-auto flex items-center justify-center text-[#D4AF37]">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <h3 className="font-serif-luxury text-xl font-bold text-[#F3E5AB]">
            No Culinary Matches Found
          </h3>
          <p className="text-xs text-[#8c826e] max-w-sm mx-auto">
            Try adjusting your search query or dietary filters to view our full collection of dishes.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setSelectedDietaryTag('all');
            }}
            className="px-6 py-2.5 rounded-xl bg-[#D4AF37] text-[#121212] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDishes.map((dish) => (
            <motion.div
              key={dish.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="group rounded-3xl bg-[#161616] border border-[#D4AF37]/25 hover:border-[#D4AF37] shadow-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Photo Banner with Badges */}
              <div
                className="relative h-64 overflow-hidden cursor-pointer"
                onClick={() => onSelectDish(dish)}
              >
                <img
                  src={dish.image}
                  alt={dish.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-transparent opacity-85" />

                {/* Price Tag Pill */}
                <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-[#121212]/95 border border-[#D4AF37]/60 text-xs font-extrabold text-[#D4AF37] shadow-xl">
                  PKR {dish.price.toLocaleString()}
                </div>

                {/* Left Highlight Badge */}
                {dish.isChefSpecial && (
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#D4AF37] text-[#121212] text-[10px] font-extrabold uppercase tracking-wider shadow-lg flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    <span>Chef's Choice</span>
                  </div>
                )}

                {/* Rating & Prep Time */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#F3E5AB]">
                  <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#121212]/90 border border-[#D4AF37]/30 text-[10px]">
                    <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                    <span>{dish.rating} ({dish.reviewCount})</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-[#A89878]">
                    <Clock className="w-3 h-3 text-[#D4AF37]" />
                    <span>{dish.prepTimeMinutes} mins prep</span>
                  </div>
                </div>

              </div>

              {/* Card Details Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3
                    onClick={() => onSelectDish(dish)}
                    className="font-serif-luxury text-xl font-bold text-[#F3E5AB] group-hover:text-[#D4AF37] transition-colors cursor-pointer"
                  >
                    {dish.name}
                  </h3>
                  <p className="text-xs text-[#8c826e] line-clamp-2 mt-2 leading-relaxed">
                    {dish.description}
                  </p>
                </div>

                {/* Beverage Pairing Teaser */}
                {dish.beveragePairing && (
                  <div className="p-2.5 rounded-xl bg-[#121212] border border-[#D4AF37]/15 flex items-center gap-2 text-[11px] text-[#C5A059]">
                    <Coffee className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span className="truncate">Pairing: {dish.beveragePairing}</span>
                  </div>
                )}

                {/* Dietary Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {dish.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-md bg-[#1e1e1e] text-[10px] text-[#A89878] border border-[#D4AF37]/15"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-[#D4AF37]/15 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectDish(dish)}
                    className="flex-1 py-3 rounded-xl bg-[#202020] hover:bg-[#282828] text-[#F3E5AB] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-[#D4AF37]/20"
                  >
                    <Info className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Inspect Details</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => onAddToCart(dish, e)}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] hover:brightness-110 text-[#121212] font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-[#D4AF37]/15 active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Order</span>
                  </button>
                </div>

              </div>

            </motion.div>
          ))}
        </div>
      )}

    </div>
  );
};
