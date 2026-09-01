/**
 * @file HomePage.tsx
 * @description Dedicated Home Page for Savorya fine-dining restaurant.
 * Features luxury hero showcase, culinary philosophy teaser, signature dishes preview,
 * atmosphere highlights, verified reviews, and interactive navigation to other dedicated pages.
 * Documented line-by-line for clear educational structure.
 */

// Import React library
import React from 'react';
// Import icons from lucide-react
import { 
  Sparkles, 
  Crown, 
  ArrowRight, 
  Clock, 
  Star, 
  Plus, 
  Info, 
  Compass, 
  Utensils, 
  Award,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
// Import types and data
import { PageId, MenuItem, SpecialOffer } from '../types';
import { RESTAURANT_INFO, TESTIMONIALS, SPECIAL_OFFERS, MENU_ITEMS } from '../data/restaurantData';
// Import motion animations
import { motion } from 'motion/react';

// Props interface for HomePage
export interface HomePageProps {
  // Handler to change active page view
  onNavigate: (page: PageId) => void;
  // List of menu items to showcase
  menuItems?: MenuItem[];
  // Handler to inspect dish in modal
  onSelectDish: (dish: MenuItem) => void;
  // Handler to add dish to cart
  onAddToCart: (dish: MenuItem, e?: React.MouseEvent) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  menuItems = MENU_ITEMS,
  onSelectDish,
  onAddToCart,
}) => {
  // Filter top 4 signature chef specials for homepage showcase
  const itemsList = menuItems || MENU_ITEMS;
  const featuredDishes = itemsList.filter((d) => d.isChefSpecial || d.isBestSeller).slice(0, 4);

  return (
    <div id="home-page-view" className="space-y-24 pb-20">
      
      {/* ------------------------------------------------------------------- */}
      {/* HERO SECTION                                                       */}
      {/* ------------------------------------------------------------------- */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* Background Dark Obsidian Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1920&auto=format&fit=crop"
            alt="Savorya Fine Dining Ambiance"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.25] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/80 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Hero Content Box */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          
          {/* Main Title Heading & Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-3 sm:space-y-4"
          >
            <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F3E5AB] leading-[1.15]">
              Culinary Artistry at <br />
              <span className="text-[#F3E5AB]">
                Savorya
              </span>
            </h1>
            <p className="font-cormorant text-2xl sm:text-3xl md:text-4xl text-[#D4AF37] italic font-light max-w-2xl mx-auto tracking-wide">
              "Where Haute Cuisine Meets Pure Gold Artistry"
            </p>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 pt-4"
          >
            {/* Primary CTA: Explore Gastronomic Menu */}
            <button
              id="hero-explore-menu-btn"
              type="button"
              onClick={() => onNavigate('menu')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#D4AF37] hover:bg-[#E5C582] text-[#0d0d0d] font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-[#D4AF37]/25 flex items-center justify-center gap-2.5 active:scale-95 transition-all duration-300 hover:scale-[1.02]"
            >
              <span>Explore Gastronomic Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary CTA: Reserve a Table */}
            <button
              id="hero-reserve-table-btn"
              type="button"
              onClick={() => onNavigate('reservation')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent border border-[#D4AF37] text-[#F3E5AB] hover:text-[#0d0d0d] hover:bg-[#D4AF37] font-semibold text-xs uppercase tracking-[0.2em] backdrop-blur-sm active:scale-95 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <span>Reserve a Table</span>
            </button>
          </motion.div>

        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* CULINARY PHILOSOPHY & ABOUT TEASER                                  */}
      {/* ------------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#161616] border border-[#D4AF37]/30 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Photo Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl">
              <img
                src="/assets/chef-sara.jpg"
                alt="Executive Chef Sara preparing gourmet dishes at Savorya"
                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#121212]/90 border border-[#D4AF37]/30 backdrop-blur-md">
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block">
                  Master Culinary Director
                </span>
                <h4 className="font-serif-luxury text-base font-bold text-[#F3E5AB]">
                  Executive Chef Sara
                </h4>
              </div>
            </div>
          </div>

          {/* Text Description Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1e1e1e] border border-[#D4AF37]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase">
                The Heritage of Savorya
              </span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#F3E5AB] leading-snug">
              A Symphony of Flavor, Precision & Imperial Splendor
            </h2>

            <p className="text-sm text-[#A89878] leading-relaxed">
              Nestled in the heart of F-7 Markaz, Islamabad, Savorya is crafted as a sanctuary for those who seek culinary perfection. Each plate is treated as a master canvas, uniting classical French techniques with organic local herbs and prized international ingredients.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#E5D7B7]">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#121212] border border-[#D4AF37]/20">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>100% Certified Halal Prime Meats</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#121212] border border-[#D4AF37]/20">
                <Crown className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>24-Karat Edible Gold Leaf Accents</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#121212] border border-[#D4AF37]/20">
                <Utensils className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Tableside Smoked Botanical Elixirs</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#121212] border border-[#D4AF37]/20">
                <Award className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Subterranean Cellar & VIP Dining Suites</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-widest hover:text-[#F3E5AB] transition-colors group"
              >
                <span>Read Our Full Story & Culinary Philosophy</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* FEATURED CHEF SPECIALS SHOWCASE                                     */}
      {/* ------------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header with Navigation Link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D4AF37]/20 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1e1e] border border-[#D4AF37]/30 mb-2">
              <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[10px] font-bold tracking-widest text-[#D4AF37] uppercase">
                Masterpiece Creations
              </span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#F3E5AB]">
              Featured Chef Highlights
            </h2>
            <p className="text-xs sm:text-sm text-[#A89878] mt-1 font-cormorant text-base">
              Handpicked culinary creations celebrating rare ingredients and theatrical plating.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('menu')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1c1c1c] border border-[#D4AF37]/40 text-xs font-bold text-[#D4AF37] uppercase tracking-wider hover:bg-[#D4AF37] hover:text-[#121212] transition-all shrink-0"
          >
            <span>View Full Menu ({menuItems.length} Dishes)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Grid of Featured Dishes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDishes.map((dish) => (
            <div
              key={dish.id}
              className="group rounded-3xl bg-[#161616] border border-[#D4AF37]/25 hover:border-[#D4AF37] shadow-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Dish Photo */}
              <div className="relative h-52 overflow-hidden cursor-pointer" onClick={() => onSelectDish(dish)}>
                <img
                  src={dish.image}
                  alt={dish.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-transparent opacity-80" />
                
                {/* Price Tag Pill */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#121212]/90 border border-[#D4AF37]/50 text-xs font-bold text-[#D4AF37] shadow-lg">
                  PKR {dish.price.toLocaleString()}
                </div>

                {/* Rating Badge */}
                <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full bg-[#121212]/90 border border-[#D4AF37]/30 text-[10px] text-[#F3E5AB] flex items-center gap-1">
                  <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                  <span>{dish.rating} ({dish.reviewCount})</span>
                </div>
              </div>

              {/* Dish Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3
                    onClick={() => onSelectDish(dish)}
                    className="font-serif-luxury text-lg font-bold text-[#F3E5AB] group-hover:text-[#D4AF37] transition-colors cursor-pointer"
                  >
                    {dish.name}
                  </h3>
                  <p className="text-xs text-[#8c826e] line-clamp-2 mt-1.5 leading-relaxed">
                    {dish.description}
                  </p>
                </div>

                {/* Dietary Tag */}
                <div className="flex flex-wrap gap-1.5">
                  {dish.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-[#1f1f1f] text-[10px] text-[#A89878] border border-[#D4AF37]/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Card Action Buttons */}
                <div className="pt-3 border-t border-[#D4AF37]/15 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectDish(dish)}
                    className="flex-1 py-2.5 rounded-xl bg-[#202020] hover:bg-[#2a2a2a] text-[#F3E5AB] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Info className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Learn More</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => onAddToCart(dish, e)}
                    className="p-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#C5A059] text-[#121212] font-bold text-xs flex items-center justify-center transition-colors shadow-md"
                    title="Add to Order"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* View All Menu Banner */}
        <div className="text-center pt-4">
          <button
            type="button"
            onClick={() => onNavigate('menu')}
            className="px-8 py-3.5 rounded-full bg-[#181818] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#121212] font-bold text-xs uppercase tracking-widest transition-all shadow-lg"
          >
            Explore Complete Gastronomic Repertoire →
          </button>
        </div>

      </section>

      {/* ------------------------------------------------------------------- */}
      {/* BESPOKE ATMOSPHERES PREVIEW                                         */}
      {/* ------------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1e1e] border border-[#D4AF37]/30">
            <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[10px] font-bold tracking-widest text-[#D4AF37] uppercase">
              Sanctuary of Elegance
            </span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#F3E5AB]">
            Five Unique Dining Atmospheres
          </h2>
          <p className="text-xs sm:text-sm text-[#A89878]">
            From the intimate subterranean Amber Vault to the panoramic Margalla Skyline Terrace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => onNavigate('experiences')}
            className="group relative h-80 rounded-3xl overflow-hidden border border-[#D4AF37]/30 cursor-pointer shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop"
              alt="Main Dining Hall at Savorya"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Atmosphere I</span>
              <h3 className="font-serif-luxury text-xl font-bold text-[#F3E5AB]">The Grand Crystal Dining Hall</h3>
              <p className="text-xs text-[#A89878]">Cathedral ceilings and nightly Steinway Grand piano recitals.</p>
            </div>
          </div>

          <div
            onClick={() => onNavigate('experiences')}
            className="group relative h-80 rounded-3xl overflow-hidden border border-[#D4AF37]/30 cursor-pointer shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop"
              alt="Chef's Flame Counter at Savorya"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Atmosphere II</span>
              <h3 className="font-serif-luxury text-xl font-bold text-[#F3E5AB]">Chef’s Live Gastronomic Counter</h3>
              <p className="text-xs text-[#A89878]">Interactive Binchotan charcoal and 24K gold tableside theater.</p>
            </div>
          </div>

          <div
            onClick={() => onNavigate('experiences')}
            className="group relative h-80 rounded-3xl overflow-hidden border border-[#D4AF37]/30 cursor-pointer shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?q=80&w=800&auto=format&fit=crop"
              alt="Margalla Skyline Terrace at Savorya"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Atmosphere III</span>
              <h3 className="font-serif-luxury text-xl font-bold text-[#F3E5AB]">Margalla Skyline Terrace</h3>
              <p className="text-xs text-[#A89878]">Panoramic hill vistas and heated glass starlight pavilion.</p>
            </div>
          </div>
        </div>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => onNavigate('experiences')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-widest hover:text-[#F3E5AB] transition-colors"
          >
            <span>Explore All 5 Private Dining Atmospheres</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* CRITIC REVIEWS & PATRON TESTIMONIALS                                */}
      {/* ------------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1e1e] border border-[#D4AF37]/30">
            <Star className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[10px] font-bold tracking-widest text-[#D4AF37] uppercase">
              Critic Acclaim
            </span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#F3E5AB]">
            Words from Epicureans
          </h2>
          <p className="text-xs sm:text-sm text-[#A89878]">
            Celebrated by international food critics and distinguished guests across Islamabad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-6 rounded-3xl bg-[#161616] border border-[#D4AF37]/25 shadow-xl flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex gap-1 text-[#D4AF37]">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#E5D7B7] italic font-cormorant text-lg leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#D4AF37]/15">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full object-cover border border-[#D4AF37]/40"
                />
                <div>
                  <h4 className="font-serif-luxury text-sm font-bold text-[#F3E5AB]">
                    {testimonial.author}
                  </h4>
                  <span className="text-[10px] text-[#A89878] block">
                    {testimonial.role} • {testimonial.date}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* CALL TO ACTION: DIRECT TABLE BOOKING BANNER                         */}
      {/* ------------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-[#181818] via-[#1a1a1a] to-[#141414] border border-[#D4AF37]/40 shadow-2xl text-center space-y-6 relative overflow-hidden">
          
          <div className="w-16 h-16 rounded-full bg-[#121212] border-2 border-[#D4AF37] mx-auto flex items-center justify-center shadow-xl shadow-[#D4AF37]/10">
            <Crown className="w-8 h-8 text-[#D4AF37]" />
          </div>

          <div className="max-w-2xl mx-auto space-y-2">
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#F3E5AB]">
              Begin Your Epicurean Journey at Savorya
            </h2>
            <p className="text-xs sm:text-sm text-[#A89878] font-cormorant text-lg">
              Table reservations are recommended 24 hours in advance for prime evening dinner seatings in F-7 Markaz.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('reservation')}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#121212] font-bold text-xs uppercase tracking-widest hover:brightness-110 shadow-xl shadow-[#D4AF37]/20 active:scale-95 transition-all"
            >
              Book Table Online Now
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 rounded-xl bg-[#141414] border border-[#D4AF37]/40 text-[#F3E5AB] hover:bg-[#D4AF37]/10 font-bold text-xs uppercase tracking-widest active:scale-95 transition-all"
            >
              Contact Concierge Desk
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
