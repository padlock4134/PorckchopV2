import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise, updatePaymentMethod, cancelSubscription } from '../services/stripe';

interface SubscriptionInfo {
  id: string;
  status: 'trial' | 'active' | 'canceled' | 'expired';
  currentPeriodEnd: string;
  trialEnd: string | null;
  cancelAtPeriodEnd: boolean;
}

interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
}

interface SubscriptionManagementProps {
  subscription: SubscriptionInfo;
  paymentMethod: PaymentMethod;
  customerId: string;
}

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

const UpdatePaymentForm = ({
  customerId,
  onSuccess,
}: {
  customerId: string;
  onSuccess: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setProcessing(false);
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        throw error;
      }

      await updatePaymentMethod(customerId, paymentMethod.id);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to update payment method');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className={`w-full py-2 px-4 rounded-md text-white font-medium ${
          processing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {processing ? 'Updating...' : 'Update Payment Method'}
      </button>
    </form>
  );
};

const SubscriptionManagement: React.FC<SubscriptionManagementProps> = ({
  subscription,
  paymentMethod,
  customerId,
}) => {
  const [showUpdatePayment, setShowUpdatePayment] = useState(false);
  const [canceling, setCanceling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCancelSubscription = async () => {
    if (!window.confirm('Are you sure you want to cancel your subscription?')) {
      return;
    }

    setCanceling(true);
    try {
      await cancelSubscription(subscription.id);
      window.location.reload();
    } catch (err) {
      setError('Failed to cancel subscription');
    } finally {
      setCanceling(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Subscription Management
      </h2>

      <div className="space-y-6">
        {/* Subscription Status */}
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            Subscription Status
          </h3>
          <div className="mt-2 text-sm text-gray-600">
            <p>Status: {subscription.status}</p>
            {subscription.trialEnd && (
              <p>Trial ends: {formatDate(subscription.trialEnd)}</p>
            )}
            <p>
              Next billing date:{' '}
              {formatDate(subscription.currentPeriodEnd)}
            </p>
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            Payment Method
          </h3>
          <div className="mt-2 text-sm text-gray-600">
            <p>
              {paymentMethod.brand.toUpperCase()} ending in{' '}
              {paymentMethod.last4}
            </p>
            <p>
              Expires: {paymentMethod.expMonth}/{paymentMethod.expYear}
            </p>
          </div>
          <button
            onClick={() => setShowUpdatePayment(!showUpdatePayment)}
            className="mt-2 text-blue-600 hover:text-blue-800"
          >
            {showUpdatePayment ? 'Cancel Update' : 'Update Payment Method'}
          </button>
          {showUpdatePayment && (
            <Elements stripe={stripePromise}>
              <UpdatePaymentForm
                customerId={customerId}
                onSuccess={() => {
                  setShowUpdatePayment(false);
                  window.location.reload();
                }}
              />
            </Elements>
          )}
        </div>

        {/* Cancel Subscription */}
        {subscription.status === 'active' && !subscription.cancelAtPeriodEnd && (
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Cancel Subscription
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              You can cancel your subscription at any time. You'll continue
              to have access until the end of your current billing period.
            </p>
            <button
              onClick={handleCancelSubscription}
              disabled={canceling}
              className={`mt-4 py-2 px-4 rounded-md text-white font-medium ${
                canceling
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {canceling ? 'Canceling...' : 'Cancel Subscription'}
            </button>
            {error && <div className="mt-2 text-red-600 text-sm">{error}</div>}
          </div>
        )}

        {subscription.cancelAtPeriodEnd && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <p className="text-yellow-800">
              Your subscription will end on{' '}
              {formatDate(subscription.currentPeriodEnd)}. You can
              continue using all features until then.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionManagement; 