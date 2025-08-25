import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    
    if (!publishableKey) {
      console.warn('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable');
      return Promise.resolve(null);
    }
    
    stripePromise = loadStripe(publishableKey);
  }
  
  return stripePromise;
};

// Stripe pricing configuration
export const STRIPE_CONFIG = {
  PREMIUM_PRICE_ID: 'price_premium_monthly', // Replace with actual Stripe price ID
  PREMIUM_AMOUNT: 800, // $8.00 in cents
  CURRENCY: 'usd',
} as const;
