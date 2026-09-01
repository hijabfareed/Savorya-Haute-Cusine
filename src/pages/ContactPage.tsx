/**
 * @file ContactPage.tsx
 * @description Dedicated Contact & Concierge Location Page for Savorya.
 * Displays the restaurant's F-7 Markaz Islamabad location, concierge phone number (+923026323200),
 * official Instagram (@hf.stack), operating schedule, valet parking, and interactive message form.
 * Documented line-by-line for educational structure.
 */

// Import React and state hooks
import React, { useState } from 'react';
// Import icons from lucide-react
import { 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Clock, 
  Car, 
  Shirt, 
  Crown, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
// Import types and data
import { PageId } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { FAQSection } from '../components/FAQSection';
// Import motion animations
import { motion } from 'motion/react';

// Props interface for ContactPage
export interface ContactPageProps {
  // Navigation handler
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  // Form input states
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('Table Inquiries');
  const [message, setMessage] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <div id="contact-page-view" className="pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* ------------------------------------------------------------------- */}
      {/* PAGE BANNER HEADER                                                  */}
      {/* ------------------------------------------------------------------- */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181818] border border-[#D4AF37]/40 shadow">
          <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase">
            Concierge & Location
          </span>
        </div>

        <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-bold text-[#F3E5AB]">
          Visit & Connect with <span className="text-[#D4AF37]">Savorya</span>
        </h1>

        <p className="text-sm sm:text-base text-[#A89878] font-cormorant text-xl max-w-2xl mx-auto">
          Located in the prestigious F-7 Markaz of Islamabad. Our private concierge desk is at your disposal for reservations, dietary requirements, and bespoke private events.
        </p>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* CONTACT CHANNELS & DIRECT HIGHLIGHTS                                */}
      {/* ------------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Address Card */}
        <div className="p-8 rounded-3xl bg-[#161616] border border-[#D4AF37]/25 hover:border-[#D4AF37] transition-all space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-[#121212] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-[#A89878] uppercase tracking-widest block">Sanctuary Address</span>
            <h3 className="font-serif-luxury text-lg font-bold text-[#F3E5AB]">
              {RESTAURANT_INFO.address}
            </h3>
          </div>
          <p className="text-xs text-[#8c826e] leading-relaxed">
            Situated in F-7 Markaz, Islamabad, Pakistan with dedicated private valet parking.
          </p>
        </div>

        {/* Telephone Concierge Card */}
        <div className="p-8 rounded-3xl bg-[#161616] border border-[#D4AF37]/25 hover:border-[#D4AF37] transition-all space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-[#121212] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-[#A89878] uppercase tracking-widest block">Direct Concierge Telephone</span>
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="font-serif-luxury text-lg font-bold text-[#D4AF37] hover:underline block"
            >
              {RESTAURANT_INFO.phone}
            </a>
          </div>
          <p className="text-xs text-[#8c826e] leading-relaxed">
            Available daily from 11:00 AM to 11:00 PM for private bookings and queries.
          </p>
        </div>

        {/* Official Instagram Card */}
        <div className="p-8 rounded-3xl bg-[#161616] border border-[#D4AF37]/25 hover:border-[#D4AF37] transition-all space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-[#121212] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
            <Instagram className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-[#A89878] uppercase tracking-widest block">Official Instagram</span>
            <a
              href={RESTAURANT_INFO.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif-luxury text-lg font-bold text-[#F3E5AB] hover:text-[#D4AF37] hover:underline block truncate"
            >
              @Savorya
            </a>
          </div>
          <p className="text-xs text-[#8c826e] leading-relaxed">
            Explore daily culinary stories, masterclass updates, and guest highlights.
          </p>
        </div>

      </div>

      {/* ------------------------------------------------------------------- */}
      {/* INTERACTIVE FORM & TIMINGS SECTION                                  */}
      {/* ------------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Form Column */}
        <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-[#161616] border border-[#D4AF37]/30 shadow-2xl space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif-luxury text-2xl font-bold text-[#F3E5AB] flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#D4AF37]" />
              <span>Send a Message to Our Concierge</span>
            </h2>
            <p className="text-xs text-[#8c826e]">
              Inquire about private banquets, special anniversary preparations, or corporate hosting.
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-8 rounded-2xl bg-[#121212] border border-[#D4AF37]/40 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-[#D4AF37] mx-auto" />
              <h3 className="font-serif-luxury text-lg font-bold text-[#F3E5AB]">
                Inquiry Received by Savorya Concierge
              </h3>
              <p className="text-xs text-[#8c826e]">
                Thank you, {name || 'Distinguished Guest'}. Our maitre d' will respond within 4 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#D4AF37] font-bold">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Daniyal Shah"
                    className="w-full px-4 py-3 rounded-xl bg-[#121212] border border-[#D4AF37]/30 text-xs text-[#F3E5AB] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#D4AF37] font-bold">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. guest@domain.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#121212] border border-[#D4AF37]/30 text-xs text-[#F3E5AB] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#D4AF37] font-bold">Subject of Inquiry</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#121212] border border-[#D4AF37]/30 text-xs text-[#F3E5AB] focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="Table Inquiries">Table Reservations & Seating Zones</option>
                  <option value="Private Banquet">Private VIP Suite / Corporate Banquet</option>
                  <option value="Dietary & Halal">Dietary Inquiries & Halal Certification</option>
                  <option value="Chef Masterclass">Chef Sara Culinary Masterclass</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#D4AF37] font-bold">Your Message</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Detail your requirements or inquiry here..."
                  className="w-full px-4 py-3 rounded-xl bg-[#121212] border border-[#D4AF37]/30 text-xs text-[#F3E5AB] focus:outline-none focus:border-[#D4AF37] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#121212] font-extrabold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Submit Concierge Message</span>
              </button>
            </form>
          )}

        </div>

        {/* Right Information & Timing Column */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Operating Hours Box */}
          <div className="p-8 rounded-3xl bg-[#161616] border border-[#D4AF37]/30 shadow-xl space-y-4">
            <h3 className="font-serif-luxury text-lg font-bold text-[#F3E5AB] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              <span>Service Hours</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between border-b border-[#D4AF37]/15 pb-2">
                <span className="text-[#8c826e]">Dinner Service:</span>
                <span className="text-[#F3E5AB] font-semibold">{RESTAURANT_INFO.hours.dinner}</span>
              </div>
              <div className="flex justify-between border-b border-[#D4AF37]/15 pb-2">
                <span className="text-[#8c826e]">Luncheon Service:</span>
                <span className="text-[#F3E5AB] font-semibold">{RESTAURANT_INFO.hours.lunch}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8c826e]">Mondays:</span>
                <span className="text-[#D4AF37] font-semibold">Private Masterclasses</span>
              </div>
            </div>
          </div>

          {/* Guest Etiquette & Valet Box */}
          <div className="p-8 rounded-3xl bg-[#161616] border border-[#D4AF37]/30 shadow-xl space-y-4">
            <h3 className="font-serif-luxury text-lg font-bold text-[#F3E5AB] flex items-center gap-2">
              <Crown className="w-4 h-4 text-[#D4AF37]" />
              <span>Guest Etiquette & Amenities</span>
            </h3>

            <div className="space-y-3 text-xs text-[#8c826e]">
              <div className="flex items-start gap-2.5">
                <Car className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#F3E5AB] block">Complimentary Valet Service:</strong>
                  <span>Private chauffeured valet parking available at our main entrance in F-7 Markaz.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Shirt className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#F3E5AB] block">Dress Code:</strong>
                  <span>Smart Elegant / Fine Dining Attire. Athletic wear is politely discouraged.</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ------------------------------------------------------------------- */}
      {/* FREQUENTLY ASKED QUESTIONS SECTION                                  */}
      {/* ------------------------------------------------------------------- */}
      <FAQSection onNavigate={onNavigate} />

    </div>
  );
};
