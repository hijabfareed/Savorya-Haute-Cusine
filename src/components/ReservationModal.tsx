/**
 * @file ReservationModal.tsx
 * @description Quick modal dialog for booking table reservations at Savorya from any page section.
 */

// Import React and hooks
import React, { useState, useEffect } from 'react';
// Import icons from lucide-react
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Sparkles, 
  User, 
  Mail, 
  Phone, 
  Crown,
  ShieldCheck
} from 'lucide-react';
// Import types and data
import { Reservation, SeatingZone, DiningOccasion } from '../types';
import { RESERVATION_TIME_SLOTS, SEATING_ZONES } from '../data/restaurantData';
// Import animations from motion
import { motion, AnimatePresence } from 'motion/react';

// Props interface for ReservationModal
export interface ReservationModalProps {
  // Boolean flag whether modal is visible
  isOpen: boolean;
  // Handler to close modal
  onClose: () => void;
  // Handler when reservation is successfully confirmed
  onReserveSuccess: (reservation: Reservation) => void;
  // Optional prefilled experience note or package title
  initialOccasion?: string;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  onReserveSuccess,
  initialOccasion,
}) => {
  // Current date string
  const todayString = new Date().toISOString().split('T')[0];

  // Local form states
  const [date, setDate] = useState<string>(todayString);
  const [timeSlot, setTimeSlot] = useState<string>('19:30');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [seatingZone, setSeatingZone] = useState<SeatingZone>('Main Dining Hall');
  const [occasion, setOccasion] = useState<DiningOccasion>('Casual Luxury');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Sync initial occasion if passed from external button
  useEffect(() => {
    if (initialOccasion) {
      setSpecialRequests(`Package inquiry: ${initialOccasion}`);
    }
  }, [initialOccasion]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!fullName.trim()) newErrors.fullName = 'Please enter guest name.';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Valid email is required.';
    if (!phone.trim()) newErrors.phone = 'Phone number is required.';
    if (!date) newErrors.date = 'Please pick a date.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const randomCode = `SV-${Math.floor(100000 + Math.random() * 900000)}`;

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

    onReserveSuccess(newReservation);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0a0a0a]/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl bg-[#181818] border border-[#D4AF37]/35 rounded-3xl shadow-2xl overflow-hidden z-10 my-6 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 bg-[#141414] border-b border-[#D4AF37]/25 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1e1e1e] border border-[#D4AF37]/40 flex items-center justify-center">
                <Crown className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-[#F3E5AB]">
                  Reserve Your Table at Savorya
                </h3>
                <p className="text-xs text-[#C5A059]">Haute Cuisine Dining • Immediate Booking Confirmation</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-[#1c1c1c] text-[#A89878] hover:text-[#F3E5AB] hover:bg-[#252525] transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
            
            {/* Date, Guests & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#E5D7B7] mb-1.5 font-medium">Date *</label>
                <input
                  type="date"
                  min={todayString}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#121212] border border-[#D4AF37]/30 text-xs text-[#F3E5AB] focus:outline-none focus:border-[#D4AF37]"
                />
                {errors.date && <p className="text-xs text-[#ff7b7b] mt-1">{errors.date}</p>}
              </div>

              <div>
                <label className="block text-xs text-[#E5D7B7] mb-1.5 font-medium">Party Size *</label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full p-3 rounded-xl bg-[#121212] border border-[#D4AF37]/30 text-xs text-[#F3E5AB] focus:outline-none focus:border-[#D4AF37]"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest (Solo)' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Time Slots */}
            <div>
              <label className="block text-xs text-[#E5D7B7] mb-2 font-medium">Seating Time *</label>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {RESERVATION_TIME_SLOTS.slice(0, 11).map((slot) => {
                  const isSelected = timeSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      className={`py-2 rounded-lg text-xs font-semibold ${
                        isSelected
                          ? 'bg-[#D4AF37] text-[#121212] font-bold'
                          : 'bg-[#121212] text-[#A89878] hover:text-[#F3E5AB] border border-[#D4AF37]/20'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Seating Area & Occasion */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#E5D7B7] mb-1.5 font-medium">Seating Zone</label>
                <select
                  value={seatingZone}
                  onChange={(e) => setSeatingZone(e.target.value as SeatingZone)}
                  className="w-full p-3 rounded-xl bg-[#121212] border border-[#D4AF37]/30 text-xs text-[#F3E5AB] focus:outline-none focus:border-[#D4AF37]"
                >
                  {SEATING_ZONES.map((zone) => (
                    <option key={zone.name} value={zone.name}>{zone.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#E5D7B7] mb-1.5 font-medium">Occasion</label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value as DiningOccasion)}
                  className="w-full p-3 rounded-xl bg-[#121212] border border-[#D4AF37]/30 text-xs text-[#F3E5AB] focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="Casual Luxury">Casual Luxury</option>
                  <option value="Romantic Anniversary">Romantic Anniversary</option>
                  <option value="Birthday Celebration">Birthday Celebration</option>
                  <option value="Business Dinner">Business Dinner</option>
                  <option value="Private Event">Private Event</option>
                </select>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs text-[#E5D7B7] mb-1 font-medium">Full Name *</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Lord / Lady / Mr. / Ms."
                  className="w-full p-3 rounded-xl bg-[#121212] border border-[#D4AF37]/30 text-xs text-[#F3E5AB] focus:outline-none focus:border-[#D4AF37]"
                />
                {errors.fullName && <p className="text-xs text-[#ff7b7b] mt-1">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#E5D7B7] mb-1 font-medium">Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="guest@domain.com"
                    className="w-full p-3 rounded-xl bg-[#121212] border border-[#D4AF37]/30 text-xs text-[#F3E5AB] focus:outline-none focus:border-[#D4AF37]"
                  />
                  {errors.email && <p className="text-xs text-[#ff7b7b] mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs text-[#E5D7B7] mb-1 font-medium">Phone *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full p-3 rounded-xl bg-[#121212] border border-[#D4AF37]/30 text-xs text-[#F3E5AB] focus:outline-none focus:border-[#D4AF37]"
                  />
                  {errors.phone && <p className="text-xs text-[#ff7b7b] mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#E5D7B7] mb-1 font-medium">Special Dietary / Sommelier Requests</label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Dietary requirements, wine preferences, or anniversary notes..."
                  className="w-full p-3 rounded-xl bg-[#121212] border border-[#D4AF37]/30 text-xs text-[#F3E5AB] focus:outline-none focus:border-[#D4AF37] resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-[#D4AF37]/20">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#B38E30] text-[#121212] font-bold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg shadow-[#D4AF37]/15 transition-all"
              >
                Confirm Table Reservation
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
