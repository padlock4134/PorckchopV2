import React from 'react';
import { useSubscription } from '../context/SubscriptionContext';
import SubscriptionManagement from './SubscriptionManagement';

const SubscriptionManagementWrapper: React.FC = () => {
  const { isSubscribed, trialEndDate } = useSubscription();

  // Mock data for demonstration - in a real app, this would come from your backend
  const mockSubscription = {
    id: 'sub_123',
    status: isSubscribed ? 'active' : (trialEndDate ? 'trial' : 'expired') as 'active' | 'trial' | 'expired',
    currentPeriodEnd: trialEndDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    trialEnd: trialEndDate,
    cancelAtPeriodEnd: false
  };

  const mockPaymentMethod = {
    id: 'pm_123',
    brand: 'visa',
    last4: '4242',
    expMonth: 12,
    expYear: 2024
  };

  const mockCustomerId = 'cus_123';

  return (
    <SubscriptionManagement
      subscription={mockSubscription}
      paymentMethod={mockPaymentMethod}
      customerId={mockCustomerId}
    />
  );
};

export default SubscriptionManagementWrapper; 