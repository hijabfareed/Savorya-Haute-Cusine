/**
 * @file Toast.tsx
 * @description Luxury toast notifications stack for Savorya.
 * Displays ephemeral feedback for cart additions, promo codes, and newsletter subscriptions.
 */

// Import React and hooks
import React from 'react';
// Import icons from lucide-react
import { CheckCircle2, Sparkles, Info, X } from 'lucide-react';
// Import types
import { ToastNotification } from '../types';
// Import animations from motion
import { motion, AnimatePresence } from 'motion/react';

// Props interface for ToastContainer
export interface ToastContainerProps {
  // List of active toast notifications
  toasts: ToastNotification[];
  // Handler to dismiss a specific toast
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onDismiss,
}) => {
  return (
    // Fixed container at bottom right
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto p-4 rounded-2xl bg-[#181818]/95 border border-[#D4AF37]/50 shadow-2xl backdrop-blur-md flex items-start gap-3 text-xs"
          >
            {/* Icon variant */}
            <div className="p-2 rounded-xl bg-[#222222] text-[#D4AF37] shrink-0 border border-[#D4AF37]/25">
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              ) : toast.type === 'gold' ? (
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              ) : (
                <Info className="w-4 h-4 text-[#D4AF37]" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="font-serif-luxury font-bold text-[#F3E5AB]">
                {toast.title}
              </h4>
              <p className="text-[#A89878] mt-0.5 leading-relaxed">
                {toast.message}
              </p>
            </div>

            {/* Dismiss button */}
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              className="text-[#8c826e] hover:text-[#F3E5AB] p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
