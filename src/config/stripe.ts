interface StripeConfig {
  publishableKey: string;
  testCards: {
    success: string;
    decline: string;
    insufficient: string;
    error: string;
  };
  testCustomers: {
    trial: string;
    active: string;
    canceled: string;
    expired: string;
  };
  testSubscriptions: {
    trial: string;
    active: string;
    canceled: string;
    expired: string;
  };
}

const config: StripeConfig = {
  publishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_test_key',
  testCards: {
    success: '4242424242424242', // Always succeeds
    decline: '4000000000000002', // Always is declined
    insufficient: '4000000000009995', // Insufficient funds failure
    error: '4000000000000069', // Causes processing error
  },
  testCustomers: {
    trial: 'cus_test_trial',
    active: 'cus_test_active',
    canceled: 'cus_test_canceled',
    expired: 'cus_test_expired',
  },
  testSubscriptions: {
    trial: 'sub_test_trial',
    active: 'sub_test_active',
    canceled: 'sub_test_canceled',
    expired: 'sub_test_expired',
  },
};

export const isTestMode = process.env.NODE_ENV === 'development';

export const getTestCard = (scenario: keyof StripeConfig['testCards']) => {
  return config.testCards[scenario];
};

export const getTestCustomer = (scenario: keyof StripeConfig['testCustomers']) => {
  return config.testCustomers[scenario];
};

export const getTestSubscription = (scenario: keyof StripeConfig['testSubscriptions']) => {
  return config.testSubscriptions[scenario];
};

export const getPublishableKey = () => {
  return config.publishableKey;
};

export const getTestData = (
  scenario: 'trial' | 'active' | 'canceled' | 'expired'
) => {
  const now = new Date();
  const trialEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
  const currentPeriodEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

  const mockData = {
    trial: {
      status: 'trial',
      trialEnd: trialEnd.toISOString(),
      currentPeriodEnd: currentPeriodEnd.toISOString(),
      cancelAtPeriodEnd: false,
    },
    active: {
      status: 'active',
      trialEnd: null,
      currentPeriodEnd: currentPeriodEnd.toISOString(),
      cancelAtPeriodEnd: false,
    },
    canceled: {
      status: 'active',
      trialEnd: null,
      currentPeriodEnd: currentPeriodEnd.toISOString(),
      cancelAtPeriodEnd: true,
    },
    expired: {
      status: 'expired',
      trialEnd: null,
      currentPeriodEnd: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      cancelAtPeriodEnd: false,
    },
  };

  return mockData[scenario];
};

export default config; 