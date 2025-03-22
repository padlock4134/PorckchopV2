import React from 'react';
import { useAuth } from '../context/AuthContext';

const Subscription: React.FC = () => {
  const { user } = useAuth();

  const plans = [
    {
      name: 'Free',
      price: '$0',
      features: [
        'Basic recipe creation',
        'Access to community recipes',
        'Basic cooking tips',
        'Standard support'
      ],
      buttonText: 'Current Plan',
      buttonStyle: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
      isCurrent: true
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: '/month',
      features: [
        'Advanced recipe creation',
        'Priority access to new features',
        'Exclusive cooking tips',
        'Priority support',
        'Ad-free experience',
        'Custom recipe collections'
      ],
      buttonText: 'Upgrade to Pro',
      buttonStyle: 'bg-porkchop-600 text-white hover:bg-porkchop-700',
      isCurrent: false
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'Everything in Pro',
        'Custom integrations',
        'Dedicated support',
        'Team collaboration',
        'Advanced analytics',
        'API access'
      ],
      buttonText: 'Contact Sales',
      buttonStyle: 'bg-gray-900 text-white hover:bg-gray-800',
      isCurrent: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose your plan
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Select the perfect plan for your cooking journey
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200 bg-white"
            >
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                  {plan.period && (
                    <span className="text-base font-medium text-gray-500">{plan.period}</span>
                  )}
                </p>
                <button
                  className={`mt-8 block w-full py-2 px-4 border border-transparent rounded-md text-center text-sm font-medium ${plan.buttonStyle}`}
                >
                  {plan.buttonText}
                </button>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h4 className="text-sm font-medium text-gray-900 tracking-wide uppercase">
                  What's included
                </h4>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex space-x-3">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscription; 