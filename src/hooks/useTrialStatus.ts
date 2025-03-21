import { useState, useEffect } from 'react';

interface TrialStatus {
  isInTrial: boolean;
  daysRemaining: number;
  trialEndDate: string | null;
  showNotification: boolean;
  dismissNotification: () => void;
}

export const useTrialStatus = (
  subscriptionStatus: 'trial' | 'active' | 'canceled' | 'expired',
  trialEndDate: string | null
): TrialStatus => {
  const [showNotification, setShowNotification] = useState(false);

  const calculateDaysRemaining = (endDate: string): number => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const isInTrial = subscriptionStatus === 'trial' && trialEndDate !== null;
  const daysRemaining = trialEndDate ? calculateDaysRemaining(trialEndDate) : 0;

  useEffect(() => {
    if (!isInTrial) {
      setShowNotification(false);
      return;
    }

    // Show notification when trial is about to end
    if (daysRemaining <= 3) {
      const hasBeenDismissed = localStorage.getItem(
        `trial_notification_dismissed_${trialEndDate}`
      );
      if (!hasBeenDismissed) {
        setShowNotification(true);
      }
    }
  }, [isInTrial, daysRemaining, trialEndDate]);

  const dismissNotification = () => {
    setShowNotification(false);
    if (trialEndDate) {
      localStorage.setItem(
        `trial_notification_dismissed_${trialEndDate}`,
        'true'
      );
    }
  };

  return {
    isInTrial,
    daysRemaining,
    trialEndDate,
    showNotification,
    dismissNotification,
  };
};

export default useTrialStatus; 