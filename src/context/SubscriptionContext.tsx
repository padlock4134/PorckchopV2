import React, { createContext, useContext, useState, useEffect } from 'react';

interface SubscriptionContextType {
  isSubscribed: boolean;
  trialEndDate: string | null;
  daysRemaining: number | null;
  showTrialNotification: boolean;
  dismissTrialNotification: () => void;
  setSubscriptionStatus: (status: boolean) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(
  undefined
);

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

interface SubscriptionProviderProps {
  children: React.ReactNode;
}

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({
  children,
}) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [trialEndDate, setTrialEndDate] = useState<string | null>(null);
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
  const [showTrialNotification, setShowTrialNotification] = useState(true);

  useEffect(() => {
    // In a real app, this would be fetched from your backend
    const mockTrialEndDate = new Date();
    mockTrialEndDate.setDate(mockTrialEndDate.getDate() + 7); // 7-day trial
    setTrialEndDate(mockTrialEndDate.toISOString());

    const calculateDaysRemaining = () => {
      const now = new Date();
      const end = new Date(mockTrialEndDate);
      const diffTime = end.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysRemaining(diffDays);
    };

    calculateDaysRemaining();
    const interval = setInterval(calculateDaysRemaining, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(interval);
  }, []);

  const dismissTrialNotification = () => {
    setShowTrialNotification(false);
  };

  const setSubscriptionStatus = (status: boolean) => {
    setIsSubscribed(status);
    if (status) {
      setTrialEndDate(null);
      setDaysRemaining(null);
      setShowTrialNotification(false);
    }
  };

  return (
    <SubscriptionContext.Provider
      value={{
        isSubscribed,
        trialEndDate,
        daysRemaining,
        showTrialNotification,
        dismissTrialNotification,
        setSubscriptionStatus,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}; 