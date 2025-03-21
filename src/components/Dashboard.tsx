import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { name: 'Total Recipes', value: '48' },
    { name: 'Favorite Recipes', value: '12' },
    { name: 'Recipes Created', value: '8' },
    { name: 'Recipe Collections', value: '4' },
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

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome section */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-4">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-16 w-16 rounded-full"
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-porkchop-100 flex items-center justify-center">
                  <span className="text-2xl text-porkchop-600">
                    {user?.name?.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {user?.name}!
                </h1>
                <p className="text-gray-500">
                  Here's what's cooking in your kitchen
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="bg-white shadow rounded-lg p-6 hover:bg-porkchop-50 transition-colors duration-200"
              >
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {stat.name}
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-porkchop-600">
                  {stat.value}
                </dd>
              </div>
            ))}
          </div>

          {/* Recent Activity and Quick Actions */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Recent Activity */}
            <div className="bg-white shadow rounded-lg">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Recent Activity
                </h2>
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
                            <div>
                              <span className="h-8 w-8 rounded-full bg-porkchop-100 flex items-center justify-center ring-8 ring-white">
                                {activity.type === 'created' ? '📝' : activity.type === 'favorited' ? '⭐' : '💬'}
                              </span>
                            </div>
                            <div className="min-w-0 flex-1 flex justify-between space-x-4">
                              <div>
                                <p className="text-sm text-gray-500">
                                  {activity.type === 'created'
                                    ? 'Created a new recipe'
                                    : activity.type === 'favorited'
                                    ? 'Added to favorites'
                                    : 'Left a comment on'}{' '}
                                  <Link
                                    to={`/recipe/${activity.recipe}`}
                                    className="font-medium text-gray-900"
                                  >
                                    {activity.recipe}
                                  </Link>
                                </p>
                              </div>
                              <div className="text-sm text-gray-500">
                                <time dateTime={activity.date}>
                                  {activity.date}
                                </time>
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

            {/* Quick Actions */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Link
                  to="/create-recipe"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-porkchop-600 hover:bg-porkchop-700"
                >
                  Create Recipe
                </Link>
                <Link
                  to="/recipes"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-porkchop-700 bg-porkchop-100 hover:bg-porkchop-200"
                >
                  Browse Recipes
                </Link>
                <Link
                  to="/collections"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-porkchop-700 bg-porkchop-100 hover:bg-porkchop-200"
                >
                  My Collections
                </Link>
                <Link
                  to="/favorites"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-porkchop-700 bg-porkchop-100 hover:bg-porkchop-200"
                >
                  Favorites
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 