/**
 * @file CartDrawer.tsx
 * @description Slide-out fine dining order drawer for Savorya restaurant in Islamabad.
 * Supports line items, quantity adjustments, order fulfillment mode, promo coupons in PKR,
 * service gratuity selector, and seamless checkout dispatch.
 * Documented line-by-line for educational clarity.
 */

// Import React and hooks
import React, { useState, useMemo } from 'react';
// Import icons from lucide-react
import { 
  X, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  Tag, 
  Sparkles, 
  ArrowRight, 
  UtensilsCrossed, 
  Car, 
  Package, 
  Percent,
  Check
} from 'lucide-react';
// Import types
import { CartItem, OrderType } from '../types';
// Import animations from motion
import { motion, AnimatePresence } from 'motion/react';

// Props interface for CartDrawer
export interface CartDrawerProps {
  // Boolean flag whether drawer is open
  isOpen: boolean;
  // Drawer close handler
  onClose: () => void;
  // List of items currently in the cart
  cartItems: CartItem[];
  // Handler to update quantity of a dish in cart
  onUpdateQuantity: (dishId: string, delta: number) => void;
  // Handler to remove a dish completely from cart
  onRemoveItem: (dishId: string) => void;
  // Handler to clear cart
  onClearCart: () => void;
  // Handler to trigger order checkout completion
  onCheckout: (orderDetails: {
    orderType: OrderType;
    tableNumber?: string;
    subtotal: number;
    tax: number;
    tip: number;
    discount: number;
    total: number;
    appliedPromo?: string;
  }) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
}) => {
  // Order type fulfillment mode
  const [orderType, setOrderType] = useState<OrderType>('Dine-In Table Service');
  // Table number input for dine-in
  const [tableNumber, setTableNumber] = useState<string>('Table 7');
  // Promo code input state
  const [promoInput, setPromoInput] = useState<string>('');
  // Applied promo code state
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  // Gratuity / Tip percentage (defaults to 10%)
  const [tipPercentage, setTipPercentage] = useState<number>(10);
  // Promo error feedback
  const [promoError, setPromoError] = useState<string | null>(null);
  // Is checkout processing
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Calculate order financials in PKR with useMemo
  const { subtotal, discount, tax, tip, total } = useMemo(() => {
    // Calculate raw subtotal
    const rawSubtotal = cartItems.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);

    // Calculate discount based on active promo
    let rawDiscount = 0;
    if (appliedPromo === 'SAVORYA10') {
      rawDiscount = Math.round(rawSubtotal * 0.10);
    } else if (appliedPromo === 'SAVORYA500') {
      rawDiscount = Math.min(rawSubtotal, 500);
    } else if (appliedPromo === 'VAULT20') {
      rawDiscount = Math.round(rawSubtotal * 0.20);
    }

    const discountedSubtotal = Math.max(0, rawSubtotal - rawDiscount);
    // Standard ICT sales tax 5%
    const rawTax = Math.round(discountedSubtotal * 0.05);
    // Gratuity calculation on subtotal
    const rawTip = Math.round((discountedSubtotal * tipPercentage) / 100);
    // Final total
    const rawTotal = discountedSubtotal + rawTax + rawTip;

    return {
      subtotal: rawSubtotal,
      discount: rawDiscount,
      tax: rawTax,
      tip: rawTip,
      total: rawTotal,
    };
  }, [cartItems, appliedPromo, tipPercentage]);

  // Handle applying promo coupon
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoInput.trim().toUpperCase();

    if (cleanCode === 'SAVORYA10' || cleanCode === 'SAVORYA500' || cleanCode === 'VAULT20') {
      setAppliedPromo(cleanCode);
      setPromoError(null);
    } else {
      setPromoError('Invalid privilege code. Try SAVORYA10, SAVORYA500, or VAULT20.');
    }
  };

  // Handle checkout submission
  const handleCheckoutSubmit = () => {
    if (cartItems.length === 0) return;
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      onCheckout({
        orderType,
        tableNumber: orderType === 'Dine-In Table Service' ? tableNumber : undefined,
        subtotal,
        tax,
        tip,
        discount,
        total,
        appliedPromo: appliedPromo || undefined,
      });
      onClose();
    }, 900);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        
        {/* Backdrop Dark Glass Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0a0a0a]/80 backdrop-blur-md transition-opacity"
        />

        {/* Sliding Panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-[#161616] border-l border-[#D4AF37]/30 shadow-2xl flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="p-5 bg-[#121212] border-b border-[#D4AF37]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#1e1e1e] border border-[#D4AF37]/30 text-[#D4AF37]">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-luxury text-lg font-bold text-[#F3E5AB]">
                    Savorya Order Selection
                  </h3>
                  <span className="text-xs text-[#8c826e]">
                    {cartItems.reduce((acc, i) => acc + i.quantity, 0)} culinary dishes selected
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {cartItems.length > 0 && (
                  <button
                    type="button"
                    onClick={onClearCart}
                    className="text-[11px] text-[#A89878] hover:text-[#ff7b7b] transition-colors mr-2"
                  >
                    Clear All
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-full bg-[#1c1c1c] text-[#A89878] hover:text-[#F3E5AB]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Drawer Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              
              {/* If Cart is Empty */}
              {cartItems.length === 0 ? (
                <div className="py-20 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#1e1e1e] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]/50 mb-4">
                    <UtensilsCrossed className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif-luxury text-lg font-bold text-[#F3E5AB]">
                    Your Order is Empty
                  </h4>
                  <p className="text-xs text-[#8c826e] mt-1.5 max-w-xs">
                    Explore our repertoire of Wagyu A5, Morel Truffle Risotto, and Botanical Elixirs to curate your meal.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-6 px-6 py-2.5 rounded-full bg-[#D4AF37] text-[#121212] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-md"
                  >
                    Explore Savorya Menu
                  </button>
                </div>
              ) : (
                <>
                  {/* Order Fulfillment Mode Tabs */}
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider font-bold text-[#D4AF37] mb-2">
                      Fulfillment Experience:
                    </span>
                    <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#121212] rounded-xl border border-[#D4AF37]/20">
                      {(['Dine-In Table Service', 'Curated Takeaway', 'Chauffeured Delivery'] as OrderType[]).map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setOrderType(mode)}
                          className={`py-2 px-1 text-[10px] font-semibold rounded-lg text-center transition-all ${
                            orderType === mode
                              ? 'bg-[#D4AF37] text-[#121212] font-bold shadow'
                              : 'text-[#A89878] hover:text-[#F3E5AB]'
                          }`}
                        >
                          {mode.replace(' Service', '').replace(' Curated', '')}
                        </button>
                      ))}
                    </div>

                    {orderType === 'Dine-In Table Service' && (
                      <div className="mt-2.5 flex items-center gap-2">
                        <label className="text-xs text-[#8c826e]">Seating / Table:</label>
                        <input
                          type="text"
                          value={tableNumber}
                          onChange={(e) => setTableNumber(e.target.value)}
                          placeholder="e.g. Table 7"
                          className="flex-1 px-3 py-1.5 rounded-lg bg-[#121212] border border-[#D4AF37]/30 text-xs text-[#F3E5AB]"
                        />
                      </div>
                    )}
                  </div>

                  {/* List of Ordered Dishes */}
                  <div className="space-y-3">
                    <span className="block text-[11px] uppercase tracking-wider font-bold text-[#D4AF37]">
                      Dishes in Order:
                    </span>
                    {cartItems.map((cartItem) => (
                      <div
                        key={cartItem.item.id}
                        className="p-3.5 rounded-2xl bg-[#1a1a1a] border border-[#D4AF37]/20 flex gap-3 items-start justify-between"
                      >
                        {/* Mini Photo */}
                        <img
                          src={cartItem.item.image}
                          alt={cartItem.item.name}
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 rounded-xl object-cover border border-[#D4AF37]/30 shrink-0"
                        />

                        {/* Title & Price */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif-luxury text-sm font-bold text-[#F3E5AB] truncate">
                            {cartItem.item.name}
                          </h4>
                          <span className="text-xs text-[#D4AF37] font-semibold">
                            PKR {cartItem.item.price.toLocaleString()} each
                          </span>
                          {cartItem.specialInstructions && (
                            <p className="text-[10px] text-[#A89878] italic mt-0.5 truncate">
                              Note: {cartItem.specialInstructions}
                            </p>
                          )}
                        </div>

                        {/* Quantity controls */}
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-1.5 bg-[#121212] px-2 py-1 rounded-lg border border-[#D4AF37]/25">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(cartItem.item.id, -1)}
                              className="text-[#A89878] hover:text-[#F3E5AB] p-0.5"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-[#F3E5AB] px-1">
                              {cartItem.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(cartItem.item.id, 1)}
                              className="text-[#A89878] hover:text-[#F3E5AB] p-0.5"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(cartItem.item.id)}
                            className="text-[#ff7b7b] hover:text-[#ff9999] text-[10px] flex items-center gap-0.5"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Promo Privilege Coupon Box */}
                  <div className="p-3.5 rounded-2xl bg-[#121212] border border-[#D4AF37]/25">
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 text-[#D4AF37] absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          placeholder="Promo (SAVORYA10)"
                          className="w-full pl-8 pr-3 py-2 rounded-lg bg-[#181818] border border-[#D4AF37]/30 text-xs text-[#F3E5AB] uppercase focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-3 py-2 rounded-lg bg-[#252525] hover:bg-[#D4AF37] hover:text-[#121212] border border-[#D4AF37]/30 text-xs font-bold text-[#F3E5AB] transition-all"
                      >
                        Apply
                      </button>
                    </form>
                    {appliedPromo && (
                      <div className="mt-2 text-xs text-[#D4AF37] flex items-center gap-1 font-medium">
                        <Check className="w-3.5 h-3.5" />
                        <span>Privilege Code '{appliedPromo}' Applied!</span>
                      </div>
                    )}
                    {promoError && (
                      <p className="mt-2 text-[11px] text-[#ff7b7b]">{promoError}</p>
                    )}
                  </div>

                  {/* Gratuity Selector */}
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider font-bold text-[#D4AF37] mb-2">
                      Service Brigade Gratuity:
                    </span>
                    <div className="grid grid-cols-4 gap-2">
                      {[5, 10, 15, 20].map((pct) => (
                        <button
                          key={pct}
                          type="button"
                          onClick={() => setTipPercentage(pct)}
                          className={`py-1.5 rounded-lg text-xs font-semibold ${
                            tipPercentage === pct
                              ? 'bg-[#D4AF37] text-[#121212] font-bold shadow'
                              : 'bg-[#1a1a1a] text-[#A89878] hover:text-[#F3E5AB] border border-[#D4AF37]/20'
                          }`}
                        >
                          {pct}%
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Drawer Bottom Calculations & Checkout */}
            {cartItems.length > 0 && (
              <div className="p-5 bg-[#121212] border-t border-[#D4AF37]/25 space-y-3">
                {/* Cost Breakdown */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#8c826e]">
                    <span>Culinary Subtotal</span>
                    <span className="text-[#F3E5AB] font-semibold">PKR {subtotal.toLocaleString()}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-[#D4AF37]">
                      <span>Privilege Discount</span>
                      <span>-PKR {discount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#8c826e]">
                    <span>ICT Sales Tax (5%)</span>
                    <span className="text-[#F3E5AB]">PKR {tax.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-[#8c826e]">
                    <span>Staff Gratuity ({tipPercentage}%)</span>
                    <span className="text-[#F3E5AB]">PKR {tip.toLocaleString()}</span>
                  </div>

                  <div className="pt-2 border-t border-[#D4AF37]/20 flex justify-between items-baseline">
                    <span className="font-serif-luxury text-base font-bold text-[#F3E5AB]">Grand Total</span>
                    <span className="font-serif-luxury text-2xl font-extrabold text-[#D4AF37]">
                      PKR {total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  id="cart-checkout-btn"
                  type="button"
                  onClick={handleCheckoutSubmit}
                  disabled={isProcessing}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#B38E30] text-[#121212] font-bold text-xs uppercase tracking-widest hover:brightness-110 shadow-xl shadow-[#D4AF37]/20 flex items-center justify-center gap-2 active:scale-98 transition-all disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>Transmitting Order to Chef...</span>
                  ) : (
                    <>
                      <span>Transmit Order to Kitchen — PKR {total.toLocaleString()}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
