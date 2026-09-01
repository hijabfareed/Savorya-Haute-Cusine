/**
 * @file Footer.tsx
 * @description Opulent footer component for Savorya luxury restaurant in Islamabad.
 * Features brand insignia, multi-page routing links, operational hours, newsletter subscription,
 * F-7 Markaz address, concierge phone (+923026323200), and official Instagram (@hf.stack).
 * Facebook has been completely removed per requirements.
 * Documented line-by-line for educational clarity.
 */

// Import React and hooks
import React, { useState } from 'react';
// Import icons from lucide-react
import { 
  Crown, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Instagram, 
  Award,
  Check
} from 'lucide-react';
// Import types and restaurant data
import { PageId } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

// Props interface for Footer component
export interface FooterProps {
  // Navigation handler
  onNavigate: (page: PageId) => void;
  // Callback when a user subscribes to the Savorya newsletter
  onSubscribeNewsletter: (email: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSubscribeNewsletter,
}) => {
  // Newsletter email input state
  const [email, setEmail] = useState<string>('');
  // Subscribed confirmation feedback state
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  // Form submission handler
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    onSubscribeNewsletter(email.trim());
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setIsSubscribed(false);
    }, 4000);
  };

  // Helper for page navigation + scroll to top
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="main-footer"
      className="bg-[#0e0e0e] border-t border-[#D4AF37]/30 text-[#A89878] relative overflow-hidden"
    >
      {/* Background radial gold glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        
        {/* Top Newsletter Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#141414] border border-[#D4AF37]/30 shadow-2xl mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1e1e] border border-[#D4AF37]/40 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[10px] font-bold tracking-widest text-[#D4AF37] uppercase">
                The Savorya Epicurean Club
              </span>
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#F3E5AB]">
              Receive Private Tasting Invitations
            </h3>
            <p className="text-xs sm:text-sm text-[#8c826e] mt-2 font-cormorant text-base">
              Subscribe to receive confidential notices regarding rare Miyazaki Wagyu arrivals, seasonal tasting flights, and Chef Sara masterclasses in Islamabad.
            </p>
          </div>

          <div className="lg:col-span-5">
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#0e0e0e] border border-[#D4AF37]/35 text-xs text-[#F3E5AB] placeholder-[#6d6453] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <button
                id="newsletter-subscribe-btn"
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] hover:brightness-110 text-[#121212] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/15 active:scale-95 transition-all shrink-0"
              >
                {isSubscribed ? (
                  <>
                    <Check className="w-4 h-4 text-[#121212]" />
                    <span>Enrolled</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4 text-[#121212]" />
                  </>
                )}
              </button>
            </form>
            {isSubscribed && (
              <p className="text-xs text-[#D4AF37] mt-2 flex items-center gap-1 font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>You have been enrolled in the Savorya Epicurean Club.</span>
              </p>
            )}
          </div>

        </div>

        {/* 3-Column Footer Main Navigation & Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 lg:gap-16 pb-12 border-b border-[#D4AF37]/15">
          
          {/* Column 1: Brand Insignia & Accolades */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#D4AF37]/40 flex items-center justify-center">
                <Crown className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div className="flex flex-col">
                <span className="font-['Cormorant_Garamond',serif] font-bold text-2xl tracking-[0.24em] text-[#F3E5AB] leading-none">
                  SAVORYA
                </span>
                <span className="text-[9px] tracking-[0.38em] text-[#C5A059] uppercase font-semibold mt-1">
                  Haute Cuisine
                </span>
              </div>
            </div>

            <p className="text-xs text-[#8c826e] leading-relaxed font-cormorant text-base">
              Dedicated to culinary perfection, artisanal non-alcoholic pairings, and bespoke royal hospitality.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={RESTAURANT_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Savorya Official Instagram"
                title="Follow us on Instagram"
                className="p-2.5 rounded-full bg-[#181818] border border-[#D4AF37]/30 text-[#C5A059] hover:text-[#F3E5AB] hover:border-[#D4AF37] hover:bg-[#222] transition-all duration-200"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <div className="px-3.5 py-1.5 rounded-full bg-[#181818] border border-[#D4AF37]/30 text-[10px] font-bold text-[#D4AF37] uppercase flex items-center gap-1.5 tracking-wider">
                <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Michelin Star</span>
              </div>
            </div>
          </div>

          {/* Column 2: Hours of Service */}
          <div>
            <h4 className="font-serif-luxury text-sm font-bold text-[#F3E5AB] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              <span>Service Hours</span>
            </h4>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[#F3E5AB] font-medium block">Dinner Service:</span>
                <span className="text-[#8c826e]">{RESTAURANT_INFO.hours.dinner}</span>
              </div>
              <div className="pt-1">
                <span className="text-[#F3E5AB] font-medium block">Weekend Luncheon:</span>
                <span className="text-[#8c826e]">{RESTAURANT_INFO.hours.lunch}</span>
              </div>
              <div className="pt-1">
                <span className="text-[#D4AF37] font-medium block">Private Masterclasses:</span>
                <span className="text-[#8c826e]">{RESTAURANT_INFO.hours.closed}</span>
              </div>
            </div>
          </div>

          {/* Column 3: Location & Concierge Desk */}
          <div>
            <h4 className="font-serif-luxury text-sm font-bold text-[#F3E5AB] uppercase tracking-wider mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              <span>Location & Contact</span>
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="text-[#E5D7B7]">{RESTAURANT_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-[#D4AF37] hover:underline font-bold">
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="text-[#E5D7B7] hover:text-[#D4AF37]">
                  {RESTAURANT_INFO.email}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Centered Credits */}
        <div className="pt-8 text-center text-xs text-[#8c826e] space-y-2">
          <p>© {new Date().getFullYear()} Savorya. All Rights Reserved.</p>
          <p className="text-xs text-[#A89878]">
            Designed & Developed by <strong className="text-[#F3E5AB] font-semibold">Hijab Fareed</strong> | Ezitech Software House Internship Program
          </p>
        </div>

      </div>
    </footer>
  );
};
