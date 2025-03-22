import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise, subscriptionTiers, SubscriptionTier } from '../services/stripe';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Libre Bodoni", serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const CheckoutForm = ({ selectedTier, onSuccess }: { selectedTier: SubscriptionTier | null, onSuccess: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !selectedTier) {
      return;
    }

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setProcessing(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message || 'An error occurred');
      setProcessing(false);
      return;
    }

    try {
      // TODO: Replace with actual customer ID from your auth system
      const customerId = 'dummy-customer-id';
      await fetch('/api/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId,
          tierId: selectedTier.id,
          paymentMethodId: paymentMethod.id,
        }),
      });

      onSuccess();
    } catch (err) {
      setError('Failed to process subscription');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </div>
      {error && (
        <div className="text-red-600 text-sm mt-2">{error}</div>
      )}
      <button
        type="submit"
        disabled={!stripe || processing}
        className={`w-full py-3 px-4 rounded-md text-white font-medium ${
          processing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {processing ? 'Processing...' : `Start ${selectedTier?.name} Plan`}
      </button>
    </form>
  );
};

const PricingPage: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handleTierSelect = (tier: SubscriptionTier) => {
    setSelectedTier(tier);
    setShowPaymentForm(true);
  };

  const handleSuccess = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose Your Cooking Adventure
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Select the perfect plan for your culinary journey
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto">
          {subscriptionTiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-lg shadow-lg divide-y divide-gray-200 ${
                selectedTier?.id === tier.id
                  ? 'ring-2 ring-blue-500'
                  : ''
              }`}
            >
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {tier.name}
                </h3>
                <p className="mt-4 text-gray-500">
                  {tier.price === 0 ? 'Free' : `$${tier.price}/month`}
                </p>
                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex">
                      <svg
                        className="flex-shrink-0 h-6 w-6 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="ml-3 text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleTierSelect(tier)}
                  className={`mt-8 w-full py-3 px-4 rounded-md text-white font-medium ${
                    selectedTier?.id === tier.id
                      ? 'bg-blue-600'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  {selectedTier?.id === tier.id
                    ? 'Selected'
                    : 'Select Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {showPaymentForm && selectedTier && (
          <div className="mt-12 max-w-lg mx-auto">
            <Elements stripe={stripePromise}>
              <CheckoutForm selectedTier={selectedTier} onSuccess={handleSuccess} />
            </Elements>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingPage; 