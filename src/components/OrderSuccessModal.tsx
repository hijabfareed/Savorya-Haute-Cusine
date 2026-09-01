/**
 * @file OrderSuccessModal.tsx
 * @description Transmitted order confirmation receipt card modal for Savorya.
 * Displays order reference, kitchen prep countdown indicator, order items summary, and total paid.
 */

// Import React library
import React from 'react';
// Import icons from lucide-react
import { 
  CheckCircle2, 
  Crown, 
  Utensils, 
  Clock, 
  Sparkles, 
  X, 
  Receipt
} from 'lucide-react';
// Import types
import { OrderType } from '../types';
// Import animations from motion
import { motion, AnimatePresence } from 'motion/react';

// Props interface for OrderSuccessModal
export interface OrderSuccessModalProps {
  // Order payload details (null if modal closed)
  orderDetails: {
    orderType: OrderType;
    tableNumber?: string;
    subtotal: number;
    tax: number;
    tip: number;
    discount: number;
    total: number;
    appliedPromo?: string;
  } | null;
  // Handler to close modal
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  orderDetails,
  onClose,
}) => {
  if (!orderDetails) return null;

  // Generate random order token
  const orderReceiptId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

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
          className="relative w-full max-w-lg bg-[#181818] border border-[#D4AF37]/50 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 p-6 sm:p-8"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close receipt"
            className="absolute top-4 right-4 p-2 rounded-full bg-[#121212] text-[#A89878] hover:text-[#F3E5AB]"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center pb-6 border-b border-[#D4AF37]/20">
            <div className="w-16 h-16 rounded-full bg-[#121212] border-2 border-[#D4AF37] mx-auto flex items-center justify-center mb-4 shadow-xl shadow-[#D4AF37]/10">
              <Utensils className="w-8 h-8 text-[#D4AF37]" />
            </div>

            <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
              Order Transmitted to Kitchen
            </span>

            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#F3E5AB] mt-1">
              Bon Appétit at Savorya
            </h2>

            <p className="text-xs text-[#A89878] mt-2 font-cormorant text-base">
              Executive Chef Sara and the culinary team have received your order tickets. Preparation has commenced.
            </p>
          </div>

          {/* Receipt Slip */}
          <div className="my-6 p-5 rounded-2xl bg-[#131313] border border-[#D4AF37]/30 space-y-3 text-xs">
            
            {/* Reference Number */}
            <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/15">
              <span className="text-[#8c826e] uppercase tracking-wider">Kitchen Ticket:</span>
              <span className="font-mono text-sm font-bold text-[#D4AF37]">
                {orderReceiptId}
              </span>
            </div>

            {/* Order Details */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[#8c826e] block mb-0.5">Experience Mode:</span>
                <span className="text-[#F3E5AB] font-semibold">{orderDetails.orderType}</span>
              </div>
              {orderDetails.tableNumber && (
                <div>
                  <span className="text-[#8c826e] block mb-0.5">Assigned Seating:</span>
                  <span className="text-[#D4AF37] font-semibold">{orderDetails.tableNumber}</span>
                </div>
              )}
            </div>

            {/* Estimated time */}
            <div className="p-3 rounded-xl bg-[#1a1a1a] border border-[#D4AF37]/20 flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span className="text-[#F3E5AB]">
                Estimated preparation & plating time: <strong>20–25 minutes</strong>
              </span>
            </div>

            {/* Total Paid Summary */}
            <div className="pt-2 border-t border-[#D4AF37]/15 flex items-center justify-between text-sm">
              <span className="text-[#F3E5AB] font-bold">Total Transmitted:</span>
              <span className="font-serif-luxury text-xl font-extrabold text-[#D4AF37]">
                ${orderDetails.total.toFixed(2)}
              </span>
            </div>

          </div>

          {/* Action */}
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#121212] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#D4AF37]/15"
          >
            Acknowledge & Continue Browsing
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
