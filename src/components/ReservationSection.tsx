/**
 * @file ReservationSection.tsx
 * @description Dedicated luxury table reservation booking engine for Savorya.
 * Supports date, time slot, guest size, seating zone, occasion, and special dietary requests.
 */

// Import React and hooks
import React, { useState } from 'react';
// Import icons from lucide-react
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Crown, 
  Sparkles, 
  CheckCircle2, 
  Phone, 
  Mail, 
  User, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
// Import types and data
import { Reservation, SeatingZone, DiningOccasion } from '../types';
import { RESERVATION_TIME_SLOTS, SEATING_ZONES } from '../data/restaurantData';
// Import animation primitives from motion
import { motion } from 'motion/react';

// Props interface for ReservationSection
export interface ReservationSectionProps {
  // Callback function invoked when user successfully submits a booking
  onReserveSuccess: (reservation: Reservation) => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  onReserveSuccess,
}) => {
  // Get today's ISO date string (YYYY-MM-DD) for min date constraint
  const todayString = new Date().toISOString().split('T')[0];

  // Reservation form local state variables
  const [date, setDate] = useState<string>(todayString);
  const [timeSlot, setTimeSlot] = useState<string>('19:30');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [seatingZone, setSeatingZone] = useState<SeatingZone>('Main Dining Hall');
  const [occasion, setOccasion] = useState<DiningOccasion>('Casual Luxury');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  
  // Validation errors state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Perform validation
    const newErrors: { [key: string]: string } = {};
    if (!fullName.trim()) newErrors.fullName = 'Please enter your primary guest name.';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Please provide a valid email address.';
    if (!phone.trim()) newErrors.phone = 'Please provide a contact phone number.';
    if (!date) newErrors.date = 'Please select a dining date.';
    if (!timeSlot) newErrors.timeSlot = 'Please select a dining time slot.';

    // If validation errors exist, update state and abort submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear any previous errors
    setErrors({});

    // Generate bespoke confirmation token (e.g. SV-82914)
    const randomCode = `SV-${Math.floor(100000 + Math.random() * 900000)}`;

    // Construct full reservation object
    const newReservation: Reservation = {
      id: `res-${Date.now()}`,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      date,
      timeSlot,
      guestCount,
      seatingZone,
      occasion,
      specialRequests: specialRequests.trim() ? specialRequests.trim() : undefined,
      confirmationCode: randomCode,
      createdAt: new Date().toISOString(),
    };

    // Invoke success callback
    onReserveSuccess(newReservation);
  };

  return (
    // Section wrapper with dark charcoal background
    <section
      id="reservation"
      className="py-24 bg-[#141414] relative border-t border-[#D4AF37]/20"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#D4AF37]/5 rounded-full blur-[170px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c1c1c] border border-[#D4AF37]/35 mb-4 shadow-lg">
            <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase">
              Table Bookings & Private Salons
            </span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#F3E5AB]">
            Reserve Your <span className="text-[#D4AF37] italic">Table at Savorya</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#A89878] font-cormorant text-lg">
            We invite you to reserve your dining experience. For private imperial salon buyouts exceeding 12 guests, our concierge is at your service.
          </p>
        </div>

        {/* Reservation Form Card */}
        <div className="bg-[#181818] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Step 1: Date, Time & Party Size */}
            <div>
              <h3 className="text-xs uppercase tracking-widest font-bold text-[#D4AF37] mb-4 flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                <span>1. Date, Time & Party Size</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Date Input */}
                <div>
                  <label htmlFor="res-date" className="block text-xs text-[#E5D7B7] mb-2 font-medium">
                    Dining Date *
                  </label>
                  <input
                    id="res-date"
                    type="date"
                    min={todayString}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-[#121212] border border-[#D4AF37]/30 text-xs text-[#F3E5AB] focus:outline-none focus:border-[#D4AF37]"
                  />
                  {errors.date && <p className="text-xs text-[#ff7b7b] mt-1">{errors.date}</p>}
                </div>

                {/* Guest Count Selector */}
                <div>
                  <label htmlFor="res-guests" className="block text-xs text-[#E5D7B7] mb-2 font-medium">
                    Number of Guests *
                  </label>
                  <div className="flex items-center gap-2">
                    <select
                      id="res-guests"
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full p-3.5 rounded-xl bg-[#121212] border border-[#D4AF37]/30 text-xs text-[#F3E5AB] focus:outline-none focus:border-[#D4AF37]"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest (Solo Tasting)' : `Guests`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Dining Occasion */}
                <div>
                  <label htmlFor="res-occasion" className="block text-xs text-[#E5D7B7] mb-2 font-medium">
                    Occasion
                  </label>
                  <select
                    id="res-occasion"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value as DiningOccasion)}
                    className="w-full p-3.5 rounded-xl bg-[#121212] border border-[#D4AF37]/30 text-xs text-[#F3E5AB] focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Casual Luxury">Casual Luxury Dining</option>
                    <option value="Romantic Anniversary">Romantic Anniversary</option>
                    <option value="Birthday Celebration">Birthday Celebration</option>
                    <option value="Business Dinner">Executive Business Dinner</option>
                    <option value="Private Event">Milestone Private Event</option>
                  </select>
                </div>

              </div>

              {/* Time Slots Grid */}
              <div className="mt-6">
                <label className="block text-xs text-[#E5D7B7] mb-2.5 font-medium">
                  Available Seating Time *
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2">
                  {RESERVATION_TIME_SLOTS.map((slot) => {
                    const isSelected = timeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTimeSlot(slot)}
                        className={`py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                          isSelected
                            ? 'bg-[#D4AF37] text-[#121212] font-bold shadow-md scale-105'
                            : 'bg-[#121212] text-[#A89878] hover:text-[#F3E5AB] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Step 2: Seating Zone Selection */}
            <div className="pt-6 border-t border-[#D4AF37]/15">
              <h3 className="text-xs uppercase tracking-widest font-bold text-[#D4AF37] mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>2. Select Dining Atmosphere</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {SEATING_ZONES.map((zone) => {
                  const isSelected = seatingZone === zone.name;
                  return (
                    <div
                      key={zone.name}
                      onClick={() => setSeatingZone(zone.name as SeatingZone)}
                      className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border ${
                        isSelected
                          ? 'bg-[#222222] border-[#D4AF37] shadow-xl shadow-[#D4AF37]/10'
                          : 'bg-[#121212] border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <h4 className="font-serif-luxury text-sm font-bold text-[#F3E5AB]">
                          {zone.name}
                        </h4>
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#1e1e1e] text-[#D4AF37] border border-[#D4AF37]/30">
                          {zone.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[#8c826e] leading-relaxed">
                        {zone.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Contact & Special Requests */}
            <div className="pt-6 border-t border-[#D4AF37]/15">
              <h3 className="text-xs uppercase tracking-widest font-bold text-[#D4AF37] mb-4 flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>3. Primary Guest Contact & Preferences</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Full Name */}
                <div>
                  <label htmlFor="res-name" className="block text-xs text-[#E5D7B7] mb-2 font-medium">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="res-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Lord / Lady / Dr. / Mr."
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#121212] border border-[#D4AF37]/30 text-xs text-[#F3E5AB] placeholder-[#6d6453] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  {errors.fullName && <p className="text-xs text-[#ff7b7b] mt-1">{errors.fullName}</p>}
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="res-email" className="block text-xs text-[#E5D7B7] mb-2 font-medium">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="res-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="guest@domain.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#121212] border border-[#D4AF37]/30 text-xs text-[#F3E5AB] placeholder-[#6d6453] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  {errors.email && <p className="text-xs text-[#ff7b7b] mt-1">{errors.email}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="res-phone" className="block text-xs text-[#E5D7B7] mb-2 font-medium">
                    Mobile Phone (For SMS Confirmation) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="res-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#121212] border border-[#D4AF37]/30 text-xs text-[#F3E5AB] placeholder-[#6d6453] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-[#ff7b7b] mt-1">{errors.phone}</p>}
                </div>

              </div>

              {/* Special Requests Text Area */}
              <div className="mt-6">
                <label htmlFor="res-notes" className="block text-xs text-[#E5D7B7] mb-2 font-medium flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Dietary Requirements, Sommelier Preferences & Table Wishes</span>
                </label>
                <textarea
                  id="res-notes"
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Celebrating 10th anniversary, window table preferred, severe shellfish allergy for 1 guest, interest in vintage 2012 Dom Pérignon..."
                  className="w-full p-3.5 rounded-xl bg-[#121212] border border-[#D4AF37]/30 text-xs text-[#F3E5AB] placeholder-[#6d6453] focus:outline-none focus:border-[#D4AF37] resize-none"
                />
              </div>

            </div>

            {/* Bottom Submit Action & Guarantees */}
            <div className="pt-6 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              
              <div className="flex items-center gap-2 text-xs text-[#8c826e]">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Instant confirmation • Flexible cancellation up to 4 hours prior</span>
              </div>

              <button
                id="submit-reservation-btn"
                type="submit"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#B38E30] hover:brightness-110 text-[#121212] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-[#D4AF37]/20 active:scale-95 transition-all"
              >
                <CalendarIcon className="w-4 h-4 text-[#121212]" />
                <span>Confirm Savorya Table Reservation</span>
              </button>

            </div>

          </form>
        </div>

      </div>
    </section>
  );
};
