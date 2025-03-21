import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSubscription } from '../contexts/SubscriptionContext';

interface WithSubscriptionGuardProps {
  requiresSubscription?: boolean;
  allowTrial?: boolean;
}

export const withSubscriptionGuard = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  { requiresSubscription = true, allowTrial = true }: WithSubscriptionGuardProps = {}
) => {
  return function WithSubscriptionGuard(props: P) {
    const {
      status,
      isInTrial,
      isLoading,
      error,
    } = useSubscription();

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md">
            <h3 className="text-red-800 font-medium">Error</h3>
            <p className="text-red-600 mt-1">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-red-600 hover:text-red-800 font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    if (!requiresSubscription) {
      return <WrappedComponent {...props} />;
    }

    const hasAccess =
      status === 'active' || (allowTrial && isInTrial);

    if (!hasAccess) {
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
          <div className="max-w-md w-full space-y-8 text-center">
            <div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Premium Feature
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                This feature is only available to premium subscribers.
              </p>
            </div>
            <div className="mt-8">
              <Navigate
                to="/pricing"
                replace={true}
                state={{ from: window.location.pathname }}
              />
            </div>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withSubscriptionGuard; 