/**
 * @file types.ts
 * @description Centralized TypeScript definitions for the Savorya fine-dining multi-page application.
 * All interfaces, types, and navigation models are thoroughly documented line-by-line.
 */

// Navigation Page Identifiers for the Multi-Page Application
export type PageId = 'home' | 'about' | 'menu' | 'specials' | 'experiences' | 'reservation' | 'contact';

// Category identifier type representing all menu classifications (Halal & Zero-Alcohol)
export type MenuCategoryId = 'all' | 'starters' | 'entrees' | 'signatures' | 'desserts' | 'beverages';

// Category interface for navigation tabs and filtering
export interface MenuCategory {
  // Unique identifier for the category
  id: MenuCategoryId;
  // Human-readable display label
  name: string;
  // Short description of the culinary section
  description: string;
  // Icon name identifier for rendering Lucide icons
  iconName: string;
}

// Dietary and culinary tag types
export type DietaryTag = 'Chef Signature' | 'Gluten-Free' | 'Vegetarian' | 'Vegan' | 'Halal' | 'Nut-Free' | 'Dairy-Free' | 'Artisanal Pairing';

// Individual dish / menu item interface
export interface MenuItem {
  // Unique item ID
  id: string;
  // Dish display title
  name: string;
  // Category this dish belongs to
  categoryId: MenuCategoryId;
  // Price in PKR currency (strictly under 10,000 PKR)
  price: number;
  // Original price if discounted in PKR (optional)
  originalPrice?: number;
  // Detailed culinary description
  description: string;
  // High-resolution unique photography URL
  image: string;
  // List of dietary and highlight tags
  tags: DietaryTag[];
  // Estimated prep and plating time in minutes
  prepTimeMinutes: number;
  // Calories or nutritional highlight
  calories?: number;
  // Key culinary ingredients list
  ingredients: string[];
  // Known allergen notices
  allergens: string[];
  // Recommended non-alcoholic mocktail or botanical elixir pairing
  beveragePairing?: string;
  // Chef's secret note or flavor profile
  chefNote?: string;
  // Guest satisfaction rating out of 5.0
  rating: number;
  // Number of reviews submitted
  reviewCount: number;
  // Boolean flag if it is currently featured in Chef's Specials
  isChefSpecial?: boolean;
  // Boolean flag if it is a patron favorite
  isBestSeller?: boolean;
}

// Shopping cart order line item interface
export interface CartItem {
  // The full menu item reference
  item: MenuItem;
  // Quantity of this dish ordered
  quantity: number;
  // Custom preparation or dietary instructions from guest
  specialInstructions?: string;
}

// Table reservation seating zone options
export type SeatingZone = 'Main Dining Hall' | 'The Amber Cellar Vault' | 'Chef\'s Counter' | 'Margalla Skyline Terrace' | 'Private Imperial VIP Suite';

// Special celebration occasion options
export type DiningOccasion = 'Casual Luxury' | 'Romantic Anniversary' | 'Birthday Celebration' | 'Corporate Business Dinner' | 'Private Family Banquet';

// Table booking reservation record interface
export interface Reservation {
  // Unique reservation reference token
  id: string;
  // Guest primary full name
  fullName: string;
  // Guest contact email address
  email: string;
  // Guest phone number for SMS confirmation
  phone: string;
  // Reservation calendar date (YYYY-MM-DD)
  date: string;
  // Reserved dining time slot (e.g. 19:30)
  timeSlot: string;
  // Number of guests in the dining party (1 - 12)
  guestCount: number;
  // Selected ambiance and seating zone
  seatingZone: SeatingZone;
  // Dining occasion or celebration purpose
  occasion: DiningOccasion;
  // Specific dietary restrictions or concierge requests
  specialRequests?: string;
  // System-generated reservation confirmation alphanumeric code
  confirmationCode: string;
  // Timestamp when the reservation was created
  createdAt: string;
}

// Culinary testimonial and critic review interface
export interface Testimonial {
  // Unique testimonial ID
  id: string;
  // Reviewer full name or critic title
  author: string;
  // Reviewer credentials or publication (e.g. Michelin Guide, Epicurean Gazette)
  role: string;
  // Quoted feedback text
  quote: string;
  // Star rating score (1 to 5)
  rating: number;
  // Reviewer portrait or critic logo URL
  avatar: string;
  // Date or year of the review
  date: string;
}

// Limited-time luxury promotion / seasonal tasting event interface
export interface SpecialOffer {
  // Unique offer ID
  id: string;
  // Promotion title
  title: string;
  // Short luxury subtitle
  subtitle: string;
  // Highlight percentage or fixed saving text in PKR
  discountText: string;
  // Coupon promo code to apply in cart
  code: string;
  // Full offer description
  description: string;
  // Valid expiration date text
  validUntil: string;
  // High-res unique imagery of the tasting experience
  image: string;
  // Included items or features in this promotion
  highlights: string[];
}

// Ephemeral toast notification state interface
export interface ToastNotification {
  // Unique ID for auto-dismiss timer tracking
  id: string;
  // Toast primary heading
  title: string;
  // Toast explanatory message
  message: string;
  // Visual style variant
  type: 'success' | 'gold' | 'info';
}

// Order fulfillment type
export type OrderType = 'Dine-In Table Service' | 'Curated Takeaway' | 'Chauffeured Delivery';
