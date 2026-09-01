/**
 * @file ReservationSuccessModal.tsx
 * @description Opulent booking confirmation receipt card modal for Savorya.
 * Displays reservation tokens, guest details, seating zone, and cancellation policy.
 */

// Import React library
import React from 'react';
// Import icons from lucide-react
import { 
  CheckCircle2, 
  Crown, 
  Calendar, 
  Clock, 
  Users, 
  Sparkles, 
  MapPin, 
  X,
  Share2,
  Download
} from 'lucide-react';
// Import types and data
import { Reservation } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';
// Import animations from motion
import { motion, AnimatePresence } from 'motion/react';

// Props interface for ReservationSuccessModal
export interface ReservationSuccessModalProps {
  // Reservation record (null if closed)
  reservation: Reservation | null;
  // Close modal handler
  onClose: () => void;
}

export const ReservationSuccessModal: React.FC<ReservationSuccessModalProps> = ({
  reservation,
  onClose,
}) => {
  if (!reservation) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0a0a0a]/90 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-xl bg-[#181818] border border-[#D4AF37]/50 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 p-6 sm:p-8"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close confirmation"
            className="absolute top-4 right-4 p-2 rounded-full bg-[#121212] text-[#A89878] hover:text-[#F3E5AB]"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Success Header with Golden Crown */}
          <div className="text-center pb-6 border-b border-[#D4AF37]/20">
            <div className="w-16 h-16 rounded-full bg-[#121212] border-2 border-[#D4AF37] mx-auto flex items-center justify-center mb-4 shadow-xl shadow-[#D4AF37]/10">
              <Crown className="w-8 h-8 text-[#D4AF37]" />
            </div>

            <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
              Table Reservation Confirmed
            </span>

            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#F3E5AB] mt-1">
              We Await Your Presence at Savorya
            </h2>

            <p className="text-xs text-[#A89878] mt-2 font-cormorant text-base">
              A bespoke dining experience has been reserved under your name. A confirmation SMS and email have been dispatched.
            </p>
          </div>

          {/* Golden Confirmation Pass Slip */}
          <div className="my-6 p-5 rounded-2xl bg-[#131313] border border-[#D4AF37]/30 space-y-4">
            
            {/* Reference Token */}
            <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/15">
              <span className="text-xs text-[#8c826e] uppercase tracking-wider">Booking Reference:</span>
              <span className="font-mono text-base font-bold text-[#D4AF37] tracking-wider">
                {reservation.confirmationCode}
              </span>
            </div>

            {/* Grid of Reservation Specs */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#8c826e] block mb-0.5">Primary Guest</span>
                <span className="text-[#F3E5AB] font-semibold">{reservation.fullName}</span>
              </div>
              <div>
                <span className="text-[#8c826e] block mb-0.5">Party Size</span>
                <span className="text-[#F3E5AB] font-semibold">{reservation.guestCount} Guests</span>
              </div>
              <div>
                <span className="text-[#8c826e] block mb-0.5">Dining Date</span>
                <span className="text-[#F3E5AB] font-semibold">{reservation.date}</span>
              </div>
              <div>
                <span className="text-[#8c826e] block mb-0.5">Seating Time</span>
                <span className="text-[#F3E5AB] font-semibold">{reservation.timeSlot}</span>
              </div>
              <div>
                <span className="text-[#8c826e] block mb-0.5">Atmosphere</span>
                <span className="text-[#D4AF37] font-semibold">{reservation.seatingZone}</span>
              </div>
              <div>
                <span className="text-[#8c826e] block mb-0.5">Occasion</span>
                <span className="text-[#F3E5AB] font-semibold">{reservation.occasion}</span>
              </div>
            </div>

            {/* Special notes if any */}
            {reservation.specialRequests && (
              <div className="pt-3 border-t border-[#D4AF37]/15 text-xs">
                <span className="text-[#8c826e] block mb-0.5">Special Sommelier / Dietary Notes:</span>
                <p className="text-[#E5D7B7] italic">"{reservation.specialRequests}"</p>
              </div>
            )}

            {/* Restaurant Address */}
            <div className="pt-3 border-t border-[#D4AF37]/15 flex items-center gap-2 text-xs text-[#A89878]">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span>{RESTAURANT_INFO.address}</span>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#121212] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#D4AF37]/10"
            >
              Done & Return to Savorya
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
