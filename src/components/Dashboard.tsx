import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import ChefFreddieLogo from './ChefFreddieLogo';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [showComingSoon, setShowComingSoon] = useState<string | null>(null);

  const stats = [
    { name: 'Total Recipes', value: '48' },
    { name: 'Favorite Recipes', value: '12' },
    { name: 'Recipes Created', value: '8' },
    { name: 'Recipe Collections', value: '4' },
  ];

  const quickActions = [
    {
      name: 'Create Recipe',
      description: 'Start crafting your next culinary masterpiece',
      icon: '📝',
      link: '/create-recipe',
      color: 'bg-porkchop-500',
      isAvailable: true,
    },
    {
      name: 'My Cookbook',
      description: 'Access your saved recipes and collections',
      icon: '📚',
      link: '/my-cookbook',
      color: 'bg-pink-500',
      isAvailable: true,
    },
    {
      name: 'Butcher Shop',
      description: 'Connect with local meat suppliers',
      icon: '🥩',
      link: '/butcher-shop',
      color: 'bg-red-500',
      isAvailable: false,
    },
    {
      name: "Chef's Market",
      description: 'Discover and share with the community',
      icon: '👨‍🍳',
      link: '/chefs-market',
      color: 'bg-orange-500',
      isAvailable: false,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'created',
      recipe: 'Spicy Korean Pork Belly',
      date: '2 hours ago',
    },
    {
      id: 2,
      type: 'favorited',
      recipe: 'Classic Pork Chops',
      date: '1 day ago',
    },
    {
      id: 3,
      type: 'commented',
      recipe: 'BBQ Pulled Pork',
      date: '3 days ago',
    },
  ];

  const handleActionClick = (action: typeof quickActions[0]) => {
    if (!action.isAvailable) {
      setShowComingSoon(action.name);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome section */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16">
                <ChefFreddieLogo />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Welcome back, {user?.name || 'Chef'}!
                </h2>
                <p className="text-gray-500">Ready to cook something amazing?</p>
              </div>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {quickActions.map((action) => (
              action.isAvailable ? (
                <Link
                  key={action.name}
                  to={action.link}
                  className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className={`${action.color} p-4`}>
                    <span className="text-4xl">{action.icon}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">{action.name}</h3>
                    <p className="text-gray-500 text-sm">{action.description}</p>
                  </div>
                </Link>
              ) : (
                <button
                  key={action.name}
                  onClick={() => handleActionClick(action)}
                  className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow text-left"
                >
                  <div className={`${action.color} p-4`}>
                    <span className="text-4xl">{action.icon}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">{action.name}</h3>
                    <p className="text-gray-500 text-sm">{action.description}</p>
                    <span className="inline-block mt-2 text-xs font-medium text-porkchop-600">Coming Soon →</span>
                  </div>
                </button>
              )
            ))}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="bg-white shadow rounded-lg p-6"
              >
                <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                <dd className="mt-1 text-3xl font-semibold text-porkchop-600">{stat.value}</dd>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="flow-root">
              <ul className="-mb-8">
                {recentActivity.map((activity, activityIdx) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {activityIdx !== recentActivity.length - 1 ? (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div className="flex items-center">
                          <span className="h-8 w-8 rounded-full bg-porkchop-100 flex items-center justify-center ring-8 ring-white">
                            {activity.type === 'created' ? '📝' : activity.type === 'favorited' ? '⭐' : '💬'}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              {activity.type === 'created'
                                ? 'Created'
                                : activity.type === 'favorited'
                                ? 'Favorited'
                                : 'Commented on'}{' '}
                              <span className="font-medium text-gray-900">{activity.recipe}</span>
                            </p>
                          </div>
                          <div className="text-sm text-gray-500">
                            <time dateTime={activity.date}>{activity.date}</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Coming Soon Modal */}
      {showComingSoon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{showComingSoon}</h3>
              <p className="text-gray-600 mb-4">
                This feature is coming soon! We're working hard to bring you the best experience possible.
              </p>
              <button
                onClick={() => setShowComingSoon(null)}
                className="bg-porkchop-500 text-white px-4 py-2 rounded-md hover:bg-porkchop-600 transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 