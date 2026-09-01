/**
 * @file Navbar.tsx
 * @description Luxury multi-page navigation bar for Savorya restaurant in Islamabad.
 * Features brand logo, multi-page routing tabs, cart drawer trigger with counter, and reservation CTA.
 * Note: User profile/avatar icon has been completely omitted per strict instructions.
 */

// Import React and necessary hooks for state and lifecycle management
import React, { useState, useEffect } from 'react';
// Import icons from lucide-react for interactive UI indicators
import { 
  Crown, 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Calendar, 
  Sparkles,
  PhoneCall
} from 'lucide-react';
// Import types
import { PageId } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';
// Import animations from motion/react
import { motion, AnimatePresence } from 'motion/react';

// Props interface definition for Navbar component
export interface NavbarProps {
  // Current active page identifier
  currentPage: PageId;
  // Handler function to change the active page
  onNavigate: (page: PageId) => void;
  // Total count of distinct or accumulated items in cart
  cartCount: number;
  // Handler function to toggle the cart drawer open state
  onOpenCart: () => void;
}

// Multi-page navigation links array with clean, concise labels that do not wrap
const NAV_PAGES: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'menu', label: 'Menu' },
  { id: 'specials', label: 'Specials' },
  { id: 'experiences', label: 'Experiences' },
  { id: 'reservation', label: 'Reservation' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  onOpenCart,
}) => {
  // State for tracking whether page has scrolled down to apply blur background
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  // State for tracking mobile menu drawer toggle open/close
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Effect hook to listen to window scroll events and update background opacity
  useEffect(() => {
    // Scroll event listener callback function
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Helper function to navigate and close mobile drawer
  const handlePageSelect = (page: PageId) => {
    setIsMobileMenuOpen(false);
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#121212]/95 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-2xl py-3.5'
          : 'bg-gradient-to-b from-[#121212]/90 via-[#121212]/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Title with Gold Crown Icon */}
          <button
            id="brand-logo-btn"
            type="button"
            onClick={() => handlePageSelect('home')}
            className="flex items-center gap-3 group focus:outline-none text-left"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#222222] to-[#141414] border border-[#D4AF37]/50 flex items-center justify-center shadow-lg group-hover:border-[#D4AF37] transition-all duration-300 group-hover:scale-105">
              <Crown className="w-5 h-5 text-[#D4AF37]" />
            </div>
            
            <div className="flex flex-col">
              <span className="font-['Cormorant_Garamond',serif] font-bold text-2xl tracking-[0.24em] text-[#F3E5AB] group-hover:text-[#D4AF37] transition-colors duration-300 leading-none">
                SAVORYA
              </span>
              <span className="text-[9px] tracking-[0.38em] text-[#C5A059] uppercase font-semibold mt-1">
                Haute Cuisine
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links (Multi-Page Tabs) */}
          <nav id="desktop-nav-menu" className="hidden lg:flex items-center gap-5 xl:gap-8 whitespace-nowrap">
            {NAV_PAGES.map((page) => {
              const isActive = currentPage === page.id;
              return (
                <button
                  key={page.id}
                  id={`nav-tab-${page.id}`}
                  type="button"
                  onClick={() => handlePageSelect(page.id)}
                  className={`text-sm tracking-wider transition-all duration-200 relative py-1 focus:outline-none whitespace-nowrap ${
                    isActive
                      ? 'text-[#D4AF37] font-bold'
                      : 'text-[#E5D7B7]/80 hover:text-[#F3E5AB]'
                  }`}
                >
                  {page.label}
                  {isActive && (
                    <motion.div
                      layoutId="activePageIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#C5A059] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Buttons (Zero user avatar per mandate) */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Direct Phone Concierge Hotline - Icon Only with direct tel: redirection */}
            <a
              id="navbar-phone-btn"
              href={`tel:${RESTAURANT_INFO.phone}`}
              aria-label={`Call Concierge Hotline: ${RESTAURANT_INFO.phone}`}
              title={`Call Concierge: ${RESTAURANT_INFO.phone}`}
              className="p-2.5 rounded-full bg-[#1a1a1a] border border-[#D4AF37]/30 text-[#D4AF37] hover:text-[#F3E5AB] hover:border-[#D4AF37] hover:bg-[#252525] transition-all duration-200 focus:outline-none flex items-center justify-center shadow-md"
            >
              <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
            </a>

            {/* Cart Button with Dynamic Badge Counter */}
            <button
              id="navbar-cart-btn"
              type="button"
              onClick={onOpenCart}
              aria-label={`View order cart with ${cartCount} items`}
              className="relative p-2.5 rounded-full bg-[#1a1a1a] border border-[#D4AF37]/30 text-[#F3E5AB] hover:border-[#D4AF37] hover:bg-[#252525] transition-all duration-200 focus:outline-none flex items-center justify-center shadow-md"
            >
              <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#121212] font-bold text-[11px] flex items-center justify-center shadow-md"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Book Table Primary CTA Button */}
            <button
              id="navbar-reserve-cta-btn"
              type="button"
              onClick={() => handlePageSelect('reservation')}
              className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#B38E30] text-[#121212] font-bold text-xs tracking-wider uppercase hover:brightness-110 shadow-lg shadow-[#D4AF37]/15 transition-all duration-300 hover:scale-[1.02] active:scale-95 whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5 text-[#121212]" />
              <span>Book Table</span>
            </button>

            {/* Mobile Hamburger Drawer Toggle Button */}
            <button
              id="navbar-mobile-toggle-btn"
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation drawer"
              className="lg:hidden p-2.5 rounded-lg bg-[#1a1a1a] border border-[#D4AF37]/30 text-[#F3E5AB] hover:text-[#D4AF37] focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <MenuIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu Layer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-[#161616] border-b border-[#D4AF37]/25 px-4 pt-3 pb-6 shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              {NAV_PAGES.map((page) => {
                const isActive = currentPage === page.id;
                return (
                  <button
                    key={page.id}
                    id={`mobile-nav-tab-${page.id}`}
                    type="button"
                    onClick={() => handlePageSelect(page.id)}
                    className={`w-full px-3 py-2.5 rounded-lg text-sm text-left transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-[#1f1f1f] text-[#D4AF37] font-bold border-l-2 border-[#D4AF37]'
                        : 'text-[#E5D7B7] hover:text-[#D4AF37] hover:bg-[#1f1f1f]'
                    }`}
                  >
                    <span>{page.label}</span>
                    <Sparkles className="w-3 h-3 text-[#D4AF37]/40" />
                  </button>
                );
              })}

              {/* Mobile Table Reservation CTA */}
              <div className="pt-3 border-t border-[#D4AF37]/20 flex flex-col gap-2">
                <button
                  id="mobile-menu-reserve-btn"
                  type="button"
                  onClick={() => handlePageSelect('reservation')}
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#121212] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
                >
                  <Calendar className="w-4 h-4 text-[#121212]" />
                  <span>Reserve Table at Savorya</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
