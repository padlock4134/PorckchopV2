import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSavedRecipes } from '../context/SavedRecipesContext';

const Home: React.FC = () => {
  const { user } = useAuth();
  const { savedRecipes } = useSavedRecipes();
  const navigationCards = [
    {
      title: "What's in My Fridge",
      description: "Create recipes with ingredients you have",
      path: "/create-recipe",
      color: "bg-gray-600"
    },
    {
      title: "My Cookbook",
      description: "Access your saved recipes",
      path: "/my-cookbook",
      color: "bg-pink-500"
    },
    {
      title: "Butcher Shop",
      description: "Connect with local vendors",
      path: "/butcher-shop",
      color: "bg-red-500"
    },
    {
      title: "Chef's Corner",
      description: "Join the cooking community",
      path: "/chefs-corner",
      color: "bg-blue-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Card */}
        <div className="bg-white rounded-lg shadow-sm mb-12 p-8">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Welcome back, {user?.name || 'there'}!
          </h1>
          <p className="text-xl text-gray-600">
            Ready to create something delicious today?
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {navigationCards.map((card) => (
            <Link
              key={card.title}
              to={card.path}
              className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`${card.color} p-6 rounded-t-lg`}>
                {card.title === "What's in My Fridge" && (
                  <span className="text-2xl">❄️</span>
                )}
                {card.title === "My Cookbook" && (
                  <span className="text-2xl">📚</span>
                )}
                {card.title === "Butcher Shop" && (
                  <span className="text-2xl">🥩</span>
                )}
                {card.title === "Chef's Corner" && (
                  <span className="text-2xl">👨‍🍳</span>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600">{card.description}</p>
                {card.title === 'Butcher Shop' && (
                  <span className="text-sm text-gray-500">Coming Soon →</span>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-3xl font-bold text-gray-900 mb-2">{savedRecipes.length}</div>
            <div className="text-gray-600">Saved Recipes</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-3xl font-bold text-gray-900 mb-2">0</div>
            <div className="text-gray-600">Collections</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-3xl font-bold text-gray-900 mb-2">0</div>
            <div className="text-gray-600">Favorites</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-3xl font-bold text-gray-900 mb-2">0</div>
            <div className="text-gray-600">Shared Recipes</div>
          </div>
        </div>

        {/* Live Activity Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Live Activity</h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                    <span className="text-2xl">👩‍🍳</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">Chef Sarah</p>
                  <p className="text-gray-600">Just created a new recipe: Mediterranean Pasta</p>
                </div>
                <div className="text-sm text-gray-500">2m ago</div>
              </div>
            </div>
            <div className="border-t border-gray-100 p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-2xl">👨‍🍳</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">Chef Mike</p>
                  <p className="text-gray-600">Added a new collection: Quick Weeknight Dinners</p>
                </div>
                <div className="text-sm text-gray-500">5m ago</div>
              </div>
            </div>
            <div className="border-t border-gray-100 p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-2xl">👩‍🍳</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">Chef Emma</p>
                  <p className="text-gray-600">Shared a recipe: Homemade Pizza Dough</p>
                </div>
                <div className="text-sm text-gray-500">8m ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 