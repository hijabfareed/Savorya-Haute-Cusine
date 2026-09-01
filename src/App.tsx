/**
 * @file App.tsx
 * @description Multi-Page Web Application for Savorya Fine-Dining Restaurant in Islamabad.
 * Implements dedicated multi-page routing across Home, About Us, Gastronomic Menu,
 * Chef's Specials, Dining Atmospheres, Table Reservation, and Contact & Location pages.
 * Handles interactive state hooks, cart drawers, dish detail inspection, and reservation passes.
 * Fully documented line-by-line for educational clarity.
 */

// Import React core library and essential lifecycle/state hooks
import React, { useState, useCallback } from 'react';

// Import TypeScript interface definitions
import { 
  MenuItem, 
  CartItem, 
  Reservation, 
  SpecialOffer, 
  ToastNotification,
  OrderType,
  PageId
} from './types';

// Import restaurant dataset
import { MENU_ITEMS } from './data/restaurantData';

// Import luxury UI shell components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Import dedicated multi-page view components
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { MenuPage } from './pages/MenuPage';
import { SpecialsPage } from './pages/SpecialsPage';
import { ExperiencesPage } from './pages/ExperiencesPage';
import { ReservationPage } from './pages/ReservationPage';
import { ContactPage } from './pages/ContactPage';

// Import Modal dialogs and Toast overlays
import { DishDetailModal } from './components/DishDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { ReservationModal } from './components/ReservationModal';
import { ReservationSuccessModal } from './components/ReservationSuccessModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { ToastContainer } from './components/Toast';

// Import motion for smooth page transitions
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // ---------------------------------------------------------------------------
  // REACT STATE HOOKS: Multi-Page Navigation State
  // ---------------------------------------------------------------------------
  // State storing the currently active page ('home' | 'about' | 'menu' | 'specials' | 'experiences' | 'reservation' | 'contact')
  const [currentPage, setCurrentPage] = useState<PageId>('home');

  // ---------------------------------------------------------------------------
  // REACT STATE HOOKS: Shopping Cart & Order Line Items
  // ---------------------------------------------------------------------------
  // State storing the list of dishes added to the user's order cart
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // State controlling whether the Cart Drawer slide-out is currently open
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // ---------------------------------------------------------------------------
  // REACT STATE HOOKS: Selected Dish for Detail Inspection Modal
  // ---------------------------------------------------------------------------
  // State holding the currently selected MenuItem to display inside DishDetailModal (null if closed)
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  // ---------------------------------------------------------------------------
  // REACT STATE HOOKS: Table Reservation Modals & Records
  // ---------------------------------------------------------------------------
  // State controlling whether the standalone quick reservation modal is open
  const [isReservationModalOpen, setIsReservationModalOpen] = useState<boolean>(false);
  
  // State storing preselected experience or package title when opening reservation modal
  const [selectedExperienceName, setSelectedExperienceName] = useState<string | undefined>(undefined);
  
  // State storing the confirmed reservation object to render ReservationSuccessModal
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  // ---------------------------------------------------------------------------
  // REACT STATE HOOKS: Order Submission & Success Receipt
  // ---------------------------------------------------------------------------
  // State storing completed order details to display the OrderSuccessModal
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderType: OrderType;
    tableNumber?: string;
    subtotal: number;
    tax: number;
    tip: number;
    discount: number;
    total: number;
    appliedPromo?: string;
  } | null>(null);

  // ---------------------------------------------------------------------------
  // REACT STATE HOOKS: Ephemeral Toast Notifications
  // ---------------------------------------------------------------------------
  // State array containing currently displayed toast notices
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // ---------------------------------------------------------------------------
  // HELPER FUNCTION: Add a toast message with automatic dismissal after 4 seconds
  // ---------------------------------------------------------------------------
  const addToast = useCallback((title: string, message: string, type: 'success' | 'gold' | 'info' = 'gold') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4200);
  }, []);

  // Handler to manually dismiss toast by user
  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // ---------------------------------------------------------------------------
  // PAGE NAVIGATION HANDLER
  // ---------------------------------------------------------------------------
  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ---------------------------------------------------------------------------
  // CART ACTIONS: Add, Update Quantity, Remove & Clear
  // ---------------------------------------------------------------------------
  // Add single dish immediately to cart (e.g. from quick button)
  const handleAddToCartQuick = (dish: MenuItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((ci) => ci.item.id === dish.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prevItems, { item: dish, quantity: 1 }];
    });

    addToast(
      'Dish Added to Order',
      `${dish.name} (PKR ${dish.price.toLocaleString()}) added to your Savorya order.`,
      'gold'
    );
  };

  // Add dish with specific quantity and custom culinary instructions
  const handleAddToCartWithNotes = (dish: MenuItem, quantity: number, notes?: string) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((ci) => ci.item.id === dish.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        if (notes) updated[existingIndex].specialInstructions = notes;
        return updated;
      }
      return [...prevItems, { item: dish, quantity, specialInstructions: notes }];
    });

    addToast(
      'Custom Order Added',
      `${quantity}x ${dish.name} added to your order with chef notes.`,
      'gold'
    );
  };

  // Adjust quantity of an existing item in cart
  const handleUpdateCartQuantity = (dishId: string, delta: number) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.item.id === dishId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  // Remove item completely from cart
  const handleRemoveFromCart = (dishId: string) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.item.id !== dishId));
    addToast('Item Removed', 'Dish removed from your active order.', 'info');
  };

  // Clear all items from cart
  const handleClearCart = () => {
    setCartItems([]);
    addToast('Order Cleared', 'All dishes have been removed from your cart.', 'info');
  };

  // ---------------------------------------------------------------------------
  // ORDER CHECKOUT COMPLETION HANDLER
  // ---------------------------------------------------------------------------
  const handleOrderCheckout = (details: {
    orderType: OrderType;
    tableNumber?: string;
    subtotal: number;
    tax: number;
    tip: number;
    discount: number;
    total: number;
    appliedPromo?: string;
  }) => {
    setConfirmedOrder(details);
    setCartItems([]);
    addToast(
      'Order Transmitted to Kitchen',
      `Chef Sara has received your order ticket (PKR ${details.total.toLocaleString()}).`,
      'success'
    );
  };

  // ---------------------------------------------------------------------------
  // TABLE RESERVATION HANDLERS
  // ---------------------------------------------------------------------------
  const handleOpenReservationWithExperience = (experienceTitle?: string) => {
    setSelectedExperienceName(experienceTitle);
    setIsReservationModalOpen(true);
  };

  const handleReservationSuccess = (res: Reservation) => {
    setConfirmedReservation(res);
    addToast(
      'Table Confirmed at Savorya',
      `Reservation ${res.confirmationCode} confirmed for ${res.guestCount} guests on ${res.date}.`,
      'success'
    );
  };

  // ---------------------------------------------------------------------------
  // SPECIAL OFFERS & PROMO HANDLERS
  // ---------------------------------------------------------------------------
  const handleClaimOffer = (offer: SpecialOffer) => {
    handleOpenReservationWithExperience(`Package: ${offer.title} (Promo: ${offer.code})`);
  };

  const handleCopyCode = (code: string) => {
    addToast('Privilege Code Copied', `Privilege code '${code}' copied to clipboard.`, 'gold');
  };

  // Newsletter subscription handler
  const handleSubscribeNewsletter = (email: string) => {
    addToast(
      'Enrolled in Savorya Epicurean Club',
      `Exclusive tasting notices will be sent to ${email}.`,
      'success'
    );
  };

  // Calculate total count of items in order cart
  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div id="savorya-app-root" className="min-h-screen bg-[#121212] text-[#F3E5AB] flex flex-col font-sans selection:bg-[#D4AF37] selection:text-[#121212]">
      
      {/* Top Luxury Multi-Page Navbar (Zero user avatar icon per user requirements) */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Multi-Page View Container with smooth cross-fade animation */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          
          {/* Page 1: Home Page */}
          {currentPage === 'home' && (
            <motion.div
              key="home-page"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
            >
              <HomePage
                menuItems={MENU_ITEMS}
                onNavigate={handleNavigate}
                onSelectDish={(dish) => setSelectedDish(dish)}
                onAddToCart={handleAddToCartQuick}
              />
            </motion.div>
          )}

          {/* Page 2: About Page */}
          {currentPage === 'about' && (
            <motion.div
              key="about-page"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
            >
              <AboutPage
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}

          {/* Page 3: Menu Page */}
          {currentPage === 'menu' && (
            <motion.div
              key="menu-page"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
            >
              <MenuPage
                items={MENU_ITEMS}
                onSelectDish={(dish) => setSelectedDish(dish)}
                onAddToCart={handleAddToCartQuick}
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}

          {/* Page 4: Specials & Offers Page */}
          {currentPage === 'specials' && (
            <motion.div
              key="specials-page"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
            >
              <SpecialsPage
                items={MENU_ITEMS}
                onClaimOffer={handleClaimOffer}
                onCopyCode={handleCopyCode}
                onSelectDish={(dish) => setSelectedDish(dish)}
                onAddToCart={handleAddToCartQuick}
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}

          {/* Page 5: Atmospheres & Experiences Page */}
          {currentPage === 'experiences' && (
            <motion.div
              key="experiences-page"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
            >
              <ExperiencesPage
                onSelectExperience={(expName) => handleOpenReservationWithExperience(expName)}
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}

          {/* Page 6: Table Reservation Page */}
          {currentPage === 'reservation' && (
            <motion.div
              key="reservation-page"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
            >
              <ReservationPage
                onReserveSuccess={handleReservationSuccess}
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}

          {/* Page 7: Contact & Location Page */}
          {currentPage === 'contact' && (
            <motion.div
              key="contact-page"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
            >
              <ContactPage
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Opulent Footer with F-7 Markaz address, phone hotline, and Instagram @hf.stack */}
      <Footer
        onNavigate={handleNavigate}
        onSubscribeNewsletter={handleSubscribeNewsletter}
      />

      {/* ----------------------------------------------------------------------- */}
      {/* INTERACTIVE MODALS & SLIDE-OUT DRAWERS                                   */}
      {/* ----------------------------------------------------------------------- */}

      {/* Dish Detail Inspection Modal */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onAddToCartWithNotes={handleAddToCartWithNotes}
      />

      {/* Order Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onCheckout={handleOrderCheckout}
      />

      {/* Quick Table Reservation Modal */}
      <ReservationModal
        isOpen={isReservationModalOpen}
        onClose={() => {
          setIsReservationModalOpen(false);
          setSelectedExperienceName(undefined);
        }}
        onReserveSuccess={handleReservationSuccess}
        initialOccasion={selectedExperienceName}
      />

      {/* Table Reservation Confirmation Slip Modal */}
      <ReservationSuccessModal
        reservation={confirmedReservation}
        onClose={() => setConfirmedReservation(null)}
      />

      {/* Transmitted Order Receipt Modal */}
      <OrderSuccessModal
        orderDetails={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
      />

      {/* Ephemeral Toast Notifications Container */}
      <ToastContainer
        toasts={toasts}
        onDismiss={handleDismissToast}
      />

    </div>
  );
}
