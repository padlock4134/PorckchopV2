import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Initialize Stripe with your publishable key
// TODO: Move this to environment variables
const stripePromise = loadStripe('YOUR_PUBLISHABLE_KEY');

export interface SubscriptionTier {
  id: string;
  name: 'Rare' | 'Al Dente';
  price: number;
  features: string[];
  trialDays: number;
}

export const subscriptionTiers: SubscriptionTier[] = [
  {
    id: 'rare-tier',
    name: 'Rare',
    price: 0,
    features: [
      'Basic recipe access',
      'Save favorite recipes',
      'Track cooking progress',
    ],
    trialDays: 7,
  },
  {
    id: 'al-dente-tier',
    name: 'Al Dente',
    price: 9.99,
    features: [
      'All Rare features',
      'Chef Freddie AI assistant',
      'Advanced recipe filtering',
      'Premium recipe collection',
      'Priority support',
    ],
    trialDays: 7,
  },
];

export const createSubscription = async (
  customerId: string,
  tierId: string,
  paymentMethodId: string
) => {
  try {
    // TODO: Implement server-side API call to create subscription
    const response = await fetch('/api/create-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId,
        tierId,
        paymentMethodId,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
};

export const cancelSubscription = async (subscriptionId: string) => {
  try {
    // TODO: Implement server-side API call to cancel subscription
    const response = await fetch('/api/cancel-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subscriptionId,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw error;
  }
};

export const updatePaymentMethod = async (
  customerId: string,
  paymentMethodId: string
) => {
  try {
    // TODO: Implement server-side API call to update payment method
    const response = await fetch('/api/update-payment-method', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId,
        paymentMethodId,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating payment method:', error);
    throw error;
  }
};

export { stripePromise, Elements }; 