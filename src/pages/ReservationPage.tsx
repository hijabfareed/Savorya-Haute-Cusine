/**
 * @file ReservationPage.tsx
 * @description Dedicated Table Reservation Booking Page for Savorya.
 * Provides a 3-step luxury booking wizard with date, time, seating zone selection,
 * guest details, dietary/occasion preferences, and instant digital pass generation.
 * Documented line-by-line for comprehensive educational clarity.
 */

// Import React and state hooks
import React, { useState } from 'react';
// Import icons from lucide-react
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Crown, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Phone, 
  Mail, 
  User, 
  Heart, 
  MessageSquare,
  QrCode,
  Download,
  Share2
} from 'lucide-react';
// Import types and data
import { PageId, SeatingZone, DiningOccasion, Reservation } from '../types';
import { RESERVATION_TIME_SLOTS, SEATING_ZONES, RESTAURANT_INFO } from '../data/restaurantData';
// Import motion animations
import { motion } from 'motion/react';

// Props interface for ReservationPage
export interface ReservationPageProps {
  // Navigation handler
  onNavigate: (page: PageId) => void;
  // Pre-selected seating zone from experiences page if any
  preselectedZone?: SeatingZone;
  // Handler when reservation is successfully confirmed
  onReservationCreated: (reservation: Reservation) => void;
}

export const ReservationPage: React.FC<ReservationPageProps> = ({
  onNavigate,
  preselectedZone,
  onReservationCreated,
}) => {
  // Current wizard step state (1: Schedule, 2: Atmosphere, 3: Guest Info, 4: Confirmed Pass)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form Fields State
  const [guestCount, setGuestCount] = useState<number>(2);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [selectedTime, setSelectedTime] = useState<string>('19:30');
  const [selectedZone, setSelectedZone] = useState<SeatingZone>(
    preselectedZone || 'Main Dining Hall'
  );
  const [occasion, setOccasion] = useState<DiningOccasion>('Casual Luxury');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('+92 302 6323200');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  // Confirmed reservation object state
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  // Occasions list
  const occasions: DiningOccasion[] = [
    'Casual Luxury',
    'Romantic Anniversary',
    'Birthday Celebration',
    'Corporate Business Dinner',
    'Private Family Banquet',
  ];

  // Submit and generate digital pass
  const handleCompleteReservation = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate unique random confirmation code (e.g. SAV-8942)
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const code = `SAV-${randomNum}`;

    const newReservation: Reservation = {
      id: `res-${Date.now()}`,
      fullName: fullName.trim() || 'Distinguished Guest',
      email: email.trim() || 'guest@savorya.com',
      phone: phone.trim() || '+92 302 6323200',
      date: selectedDate,
      timeSlot: selectedTime,
      guestCount,
      seatingZone: selectedZone,
      occasion,
      specialRequests: specialRequests.trim(),
      confirmationCode: code,
      createdAt: new Date().toISOString(),
    };

    setConfirmedReservation(newReservation);
    onReservationCreated(newReservation);
    setCurrentStep(4);
  };

  return (
    <div id="reservation-page-view" className="pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      
      {/* ------------------------------------------------------------------- */}
      {/* PAGE BANNER HEADER                                                  */}
      {/* ------------------------------------------------------------------- */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181818] border border-[#D4AF37]/40 shadow">
          <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase">
            Online Concierge
          </span>
        </div>

        <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-[#F3E5AB]">
          Table <span className="text-[#D4AF37]">Reservation</span>
        </h1>

        <p className="text-sm sm:text-base text-[#A89878] font-cormorant text-xl">
          Reserve your table at Savorya in F-7 Markaz, Islamabad. Instant digital confirmation generated immediately.
        </p>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* STEP PROGRESS INDICATOR                                             */}
      {/* ------------------------------------------------------------------- */}
      {currentStep < 4 && (
        <div className="max-w-2xl mx-auto flex items-center justify-between relative px-4">
          <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-0.5 bg-[#252525] -z-0" />
          
          {/* Step 1 Indicator */}
          <div className="flex flex-col items-center gap-2 relative z-10">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                currentStep >= 1
                  ? 'bg-[#D4AF37] text-[#121212] shadow-lg shadow-[#D4AF37]/20 ring-4 ring-[#D4AF37]/20'
                  : 'bg-[#202020] text-[#8c826e] border border-[#D4AF37]/20'
              }`}
            >
              1
            </div>
            <span className="text-[11px] font-semibold text-[#A89878]">Date & Party</span>
          </div>

          {/* Step 2 Indicator */}
          <div className="flex flex-col items-center gap-2 relative z-10">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                currentStep >= 2
                  ? 'bg-[#D4AF37] text-[#121212] shadow-lg shadow-[#D4AF37]/20 ring-4 ring-[#D4AF37]/20'
                  : 'bg-[#202020] text-[#8c826e] border border-[#D4AF37]/20'
              }`}
            >
              2
            </div>
            <span className="text-[11px] font-semibold text-[#A89878]">Atmosphere</span>
          </div>

          {/* Step 3 Indicator */}
          <div className="flex flex-col items-center gap-2 relative z-10">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                currentStep >= 3
                  ? 'bg-[#D4AF37] text-[#121212] shadow-lg shadow-[#D4AF37]/20 ring-4 ring-[#D4AF37]/20'
                  : 'bg-[#202020] text-[#8c826e] border border-[#D4AF37]/20'
              }`}
            >
              3
            </div>
            <span className="text-[11px] font-semibold text-[#A89878]">Guest Details</span>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* WIZARD CONTAINER                                                    */}
      {/* ------------------------------------------------------------------- */}
      <div className="p-6 sm:p-10 rounded-3xl bg-[#161616] border border-[#D4AF37]/30 shadow-2xl">
        
        {/* STEP 1: PARTY, DATE & TIME */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="space-y-1 border-b border-[#D4AF37]/20 pb-4">
              <h2 className="font-serif-luxury text-2xl font-bold text-[#F3E5AB]">
                Select Date, Time & Party Size
              </h2>
              <p className="text-xs text-[#8c826e]">
                Dinner services run Tuesday through Sunday from 5:00 PM to 12:00 AM.
              </p>
            </div>

            {/* Party Size Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Number of Guests:</span>
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {[1, 2, 3, 4, 5, 6, 8, 12].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setGuestCount(num)}
                    className={`py-3 rounded-2xl text-xs font-bold border transition-all ${
                      guestCount === num
                        ? 'bg-[#D4AF37] text-[#121212] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20 scale-105'
                        : 'bg-[#121212] border-[#D4AF37]/20 text-[#E5D7B7] hover:border-[#D4AF37]/50'
                    }`}
                  >
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Reservation Date:</span>
              </label>
              <input
                type="date"
                value={selectedDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full sm:w-80 px-4 py-3 rounded-2xl bg-[#121212] border border-[#D4AF37]/30 text-xs text-[#F3E5AB] focus:outline-none focus:border-[#D4AF37] shadow-lg"
              />
            </div>

            {/* Time Slot Grid */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Preferred Seating Time Slot:</span>
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                {RESERVATION_TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`py-3 rounded-2xl text-xs font-bold border transition-all ${
                      selectedTime === slot
                        ? 'bg-[#D4AF37] text-[#121212] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20 scale-105'
                        : 'bg-[#121212] border-[#D4AF37]/20 text-[#E5D7B7] hover:border-[#D4AF37]/50'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Next Button */}
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#121212] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg flex items-center gap-2"
              >
                <span>Continue to Atmosphere Selection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: ATMOSPHERE SELECTION */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="space-y-1 border-b border-[#D4AF37]/20 pb-4">
              <h2 className="font-serif-luxury text-2xl font-bold text-[#F3E5AB]">
                Choose Dining Atmosphere & Seating Zone
              </h2>
              <p className="text-xs text-[#8c826e]">
                Select the ambient environment for your party at Savorya.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SEATING_ZONES.map((zone) => {
                const isSelected = selectedZone === zone.name;
                return (
                  <div
                    key={zone.name}
                    onClick={() => setSelectedZone(zone.name as SeatingZone)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-2.5 ${
                      isSelected
                        ? 'bg-[#1a1a1a] border-[#D4AF37] shadow-xl shadow-[#D4AF37]/15 ring-2 ring-[#D4AF37]/40'
                        : 'bg-[#121212] border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif-luxury text-base font-bold text-[#F3E5AB]">
                        {zone.name}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-bold uppercase">
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

            {/* Navigation Buttons */}
            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-6 py-3 rounded-xl bg-[#202020] text-[#F3E5AB] font-bold text-xs uppercase tracking-wider hover:bg-[#282828] flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#121212] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg flex items-center gap-2"
              >
                <span>Continue to Guest Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: GUEST INFORMATION & CONFIRMATION */}
        {currentStep === 3 && (
          <motion.form
            onSubmit={handleCompleteReservation}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="space-y-1 border-b border-[#D4AF37]/20 pb-4">
              <h2 className="font-serif-luxury text-2xl font-bold text-[#F3E5AB]">
                Primary Guest & Dining Occasion
              </h2>
              <p className="text-xs text-[#8c826e]">
                We will send your golden confirmation token via email and SMS.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Full Name:</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Daniyal Shah"
                  className="w-full px-4 py-3 rounded-2xl bg-[#121212] border border-[#D4AF37]/30 text-xs text-[#F3E5AB] placeholder-[#8c826e] focus:outline-none focus:border-[#D4AF37] shadow-lg"
                />
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>Email Address:</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. daniyal@example.com"
                  className="w-full px-4 py-3 rounded-2xl bg-[#121212] border border-[#D4AF37]/30 text-xs text-[#F3E5AB] placeholder-[#8c826e] focus:outline-none focus:border-[#D4AF37] shadow-lg"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>Contact Telephone (Pakistan):</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+92 302 6323200"
                  className="w-full px-4 py-3 rounded-2xl bg-[#121212] border border-[#D4AF37]/30 text-xs text-[#F3E5AB] placeholder-[#8c826e] focus:outline-none focus:border-[#D4AF37] shadow-lg"
                />
              </div>

              {/* Dining Occasion */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span>Dining Occasion:</span>
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value as DiningOccasion)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#121212] border border-[#D4AF37]/30 text-xs text-[#F3E5AB] focus:outline-none focus:border-[#D4AF37] shadow-lg"
                >
                  {occasions.map((occ) => (
                    <option key={occ} value={occ}>
                      {occ}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Special Requests or Dietary Notes */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span>Special Requests / Dietary Restrictions (Optional):</span>
              </label>
              <textarea
                rows={3}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Mention allergies, anniversary champagne mocktails, quiet table preference..."
                className="w-full px-4 py-3 rounded-2xl bg-[#121212] border border-[#D4AF37]/30 text-xs text-[#F3E5AB] placeholder-[#8c826e] focus:outline-none focus:border-[#D4AF37] shadow-lg resize-none"
              />
            </div>

            {/* Booking Summary Box */}
            <div className="p-4 rounded-2xl bg-[#121212] border border-[#D4AF37]/30 text-xs text-[#E5D7B7] flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[#D4AF37] font-bold">Party:</span> {guestCount} Guests •{' '}
                <span className="text-[#D4AF37] font-bold">Date:</span> {selectedDate} at {selectedTime} •{' '}
                <span className="text-[#D4AF37] font-bold">Atmosphere:</span> {selectedZone}
              </div>
              <span className="text-[10px] text-[#A89878] uppercase">Zero Booking Fees</span>
            </div>

            {/* Form Actions */}
            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 rounded-xl bg-[#202020] text-[#F3E5AB] font-bold text-xs uppercase tracking-wider hover:bg-[#282828] flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#121212] font-extrabold text-xs uppercase tracking-wider hover:brightness-110 shadow-xl shadow-[#D4AF37]/20 flex items-center gap-2 active:scale-95 transition-all"
              >
                <Crown className="w-4 h-4" />
                <span>Confirm & Generate Digital Pass</span>
              </button>
            </div>

          </motion.form>
        )}

        {/* STEP 4: DIGITAL CONFIRMATION PASS */}
        {currentStep === 4 && confirmedReservation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8 text-center"
          >
            {/* Success Icon */}
            <div className="w-16 h-16 rounded-full bg-[#121212] border-2 border-[#D4AF37] mx-auto flex items-center justify-center text-[#D4AF37] shadow-xl shadow-[#D4AF37]/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold block">
                Booking Confirmed
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#F3E5AB]">
                Your Golden Dining Pass is Ready
              </h2>
              <p className="text-xs text-[#8c826e]">
                A confirmation has been dispatched to {confirmedReservation.email}
              </p>
            </div>

            {/* Luxury Ticket Pass Box */}
            <div className="max-w-xl mx-auto rounded-3xl bg-gradient-to-b from-[#181818] to-[#121212] border-2 border-[#D4AF37]/50 shadow-2xl p-8 text-left space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-15">
                <Crown className="w-32 h-32 text-[#D4AF37]" />
              </div>

              {/* Pass Header */}
              <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4">
                <div>
                  <h3 className="font-serif-luxury text-xl font-bold text-[#D4AF37]">
                    SAVORYA FINE DINING
                  </h3>
                  <span className="text-[10px] text-[#A89878] uppercase tracking-wider block">
                    F-7 Markaz, Islamabad, Pakistan
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#8c826e] uppercase tracking-wider block">Reference Token</span>
                  <span className="font-mono text-sm font-bold text-[#F3E5AB]">
                    {confirmedReservation.confirmationCode}
                  </span>
                </div>
              </div>

              {/* Pass Body Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#8c826e] block text-[10px] uppercase">Primary Guest</span>
                  <strong className="text-[#F3E5AB] font-serif-luxury text-base">{confirmedReservation.fullName}</strong>
                </div>
                <div>
                  <span className="text-[#8c826e] block text-[10px] uppercase">Dining Atmosphere</span>
                  <strong className="text-[#D4AF37]">{confirmedReservation.seatingZone}</strong>
                </div>
                <div>
                  <span className="text-[#8c826e] block text-[10px] uppercase">Date & Time</span>
                  <span className="text-[#E5D7B7]">{confirmedReservation.date} at {confirmedReservation.timeSlot}</span>
                </div>
                <div>
                  <span className="text-[#8c826e] block text-[10px] uppercase">Party Size</span>
                  <span className="text-[#E5D7B7]">{confirmedReservation.guestCount} Guests ({confirmedReservation.occasion})</span>
                </div>
              </div>

              {/* QR Mock Representation */}
              <div className="pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#121212] border border-[#D4AF37]/40 text-[#D4AF37]">
                    <QrCode className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#A89878] uppercase block">Digital Pass ID</span>
                    <span className="text-xs font-mono text-[#D4AF37]">{confirmedReservation.id}</span>
                  </div>
                </div>
                <div className="text-right text-[10px] text-[#8c826e]">
                  Concierge: +923026323200
                </div>
              </div>

            </div>

            {/* Next Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => onNavigate('menu')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#D4AF37] text-[#121212] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg"
              >
                Pre-Order from Menu
              </button>
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#202020] text-[#F3E5AB] font-bold text-xs uppercase tracking-wider hover:bg-[#282828]"
              >
                Return to Home Page
              </button>
            </div>

          </motion.div>
        )}

      </div>

    </div>
  );
};
