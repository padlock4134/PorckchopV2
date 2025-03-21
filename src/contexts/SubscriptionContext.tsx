import React, { createContext, useContext, useState, useEffect } from 'react';
import { isTestMode, getTestData } from '../config/stripe';
import useTrialStatus from '../hooks/useTrialStatus';

interface SubscriptionContextType {
  status: 'trial' | 'active' | 'canceled' | 'expired';
  trialEndDate: string | null;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  isLoading: boolean;
  error: string | null;
  isInTrial: boolean;
  daysRemaining: number;
  showTrialNotification: boolean;
  dismissTrialNotification: () => void;
  refreshSubscription: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(
  undefined
);

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error(
      'useSubscription must be used within a SubscriptionProvider'
    );
  }
  return context;
};

interface SubscriptionProviderProps {
  children: React.ReactNode;
}

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({
  children,
}) => {
  const [subscriptionData, setSubscriptionData] = useState({
    status: 'trial' as const,
    trialEndDate: null as string | null,
    currentPeriodEnd: '',
    cancelAtPeriodEnd: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    isInTrial,
    daysRemaining,
    showNotification: showTrialNotification,
    dismissNotification: dismissTrialNotification,
  } = useTrialStatus(subscriptionData.status, subscriptionData.trialEndDate);

  const fetchSubscriptionData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (isTestMode) {
        // In test mode, use mock data
        const mockData = getTestData('trial');
        setSubscriptionData({
          status: mockData.status as 'trial',
          trialEndDate: mockData.trialEnd,
          currentPeriodEnd: mockData.currentPeriodEnd,
          cancelAtPeriodEnd: mockData.cancelAtPeriodEnd,
        });
      } else {
        // In production, fetch real subscription data
        const response = await fetch('/api/subscription', {
          credentials: 'include',
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch subscription data');
        }

        const data = await response.json();
        setSubscriptionData({
          status: data.status,
          trialEndDate: data.trialEnd,
          currentPeriodEnd: data.currentPeriodEnd,
          cancelAtPeriodEnd: data.cancelAtPeriodEnd,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  const value = {
    ...subscriptionData,
    isLoading,
    error,
    isInTrial,
    daysRemaining,
    showTrialNotification,
    dismissTrialNotification,
    refreshSubscription: fetchSubscriptionData,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export default SubscriptionProvider; 