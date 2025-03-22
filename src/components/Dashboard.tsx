import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import ChefFreddieLogo from './ChefFreddieLogo';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      name: "What's in My Kitchen?",
      description: 'Create a recipe using ingredients you have',
      icon: '📝',
      link: '/create-recipe',
      bgColor: 'bg-gray-600'
    },
    {
      name: 'My Cookbook',
      description: 'Access your saved recipes and collections',
      icon: '📚',
      link: '/my-cookbook',
      bgColor: 'bg-pink-500'
    },
    {
      name: 'Butcher Shop',
      description: 'Connect with local meat suppliers',
      icon: '🥩',
      link: '/butcher-shop',
      bgColor: 'bg-red-500'
    },
    {
      name: "Chef's Market",
      description: 'Discover and share with the community',
      icon: '👨‍🍳',
      link: '/chefs-market',
      bgColor: 'bg-blue-500'
    }
  ];

  const stats = [
    { name: 'Total Recipes', value: '4' },
    { name: 'Favorite Recipes', value: '2' },
    { name: 'Recipes Created', value: '0' },
    { name: 'Recipe Collections', value: '4' }
  ];

  const recentActivity = [
    {
      type: 'favorited',
      recipe: 'Clam Chowder',
      time: 'Just now'
    },
    {
      type: 'favorited',
      recipe: 'Paella Valenciana',
      time: 'Just now'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Message */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12">
            <ChefFreddieLogo />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name || 'paddyadukonis'}!</h1>
            <p className="text-gray-600">
              I notice you haven't created any recipes yet. Would you like to start by telling me what's in your kitchen?
            </p>
            <p className="text-gray-600">
              I see you have 4 saved recipes in your cookbook.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickActions.map((action) => (
          <Link
            key={action.name}
            to={action.link}
            className="block bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className={`${action.bgColor} p-4`}>
              <span className="text-2xl">{action.icon}</span>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">{action.name}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
              {action.name === 'Butcher Shop' && (
                <span className="text-sm text-gray-500">Coming Soon →</span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow p-6">
            <h4 className="text-sm font-medium text-gray-500">{stat.name}</h4>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-yellow-400">⭐</span>
              <span className="text-gray-600">Favorited {activity.recipe}</span>
              <span className="text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 