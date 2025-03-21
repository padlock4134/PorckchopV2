import React from 'react';
import { Link } from 'react-router-dom';

interface TrialNotificationProps {
  trialEndDate: string;
  daysRemaining: number;
  onDismiss: () => void;
}

const TrialNotification: React.FC<TrialNotificationProps> = ({
  trialEndDate,
  daysRemaining,
  onDismiss,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getNotificationStyle = () => {
    if (daysRemaining <= 1) {
      return 'bg-red-50 border-red-200 text-red-800';
    } else if (daysRemaining <= 3) {
      return 'bg-yellow-50 border-yellow-200 text-yellow-800';
    }
    return 'bg-blue-50 border-blue-200 text-blue-800';
  };

  const getMessage = () => {
    if (daysRemaining <= 0) {
      return 'Your free trial has ended. Subscribe now to continue enjoying all features!';
    } else if (daysRemaining === 1) {
      return 'Last day of your free trial! Subscribe now to keep cooking like a pro.';
    } else {
      return `${daysRemaining} days left in your free trial. Don't miss out on our premium features!`;
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 max-w-md rounded-lg border p-4 shadow-lg ${getNotificationStyle()}`}
      role="alert"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {daysRemaining <= 1 ? (
            <svg
              className="h-5 w-5 text-red-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5 text-blue-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">{getMessage()}</p>
          <p className="mt-1 text-sm">
            Trial ends on {formatDate(trialEndDate)}
          </p>
          <div className="mt-3 flex space-x-4">
            <Link
              to="/pricing"
              className="rounded-md bg-white px-3 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              View Plans
            </Link>
            <button
              onClick={onDismiss}
              className="text-sm font-medium hover:underline"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrialNotification; 