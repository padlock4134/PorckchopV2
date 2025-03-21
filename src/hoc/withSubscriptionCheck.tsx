import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSubscription } from '../context/SubscriptionContext';

export const withSubscriptionCheck = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return function WithSubscriptionCheck(props: P) {
    const { isSubscribed, daysRemaining } = useSubscription();
    const hasAccess = isSubscribed || (daysRemaining !== null && daysRemaining > 0);

    if (!hasAccess) {
      return <Navigate to="/pricing" replace />;
    }

    return <WrappedComponent {...props} />;
  };
}; 