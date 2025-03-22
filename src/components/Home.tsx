import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
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
        {/* Hero Section */}
        <div className="max-w-4xl">
          <h1 className="text-6xl font-serif font-bold text-gray-900 mb-4">
            Welcome to
            <br />
            <span className="text-gray-600">PorkChop</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your personal AI-powered cooking companion. Create recipes,
            get personalized recommendations, and join a community of
            food enthusiasts.
          </p>
          <Link
            to="/create-recipe"
            className="inline-block px-8 py-3 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Create Recipe
          </Link>
        </div>

        {/* Features Section */}
        <div className="mt-32">
          <h2 className="text-center text-gray-500 text-sm font-medium tracking-wide uppercase mb-3">
            FEATURES
          </h2>
          <h3 className="text-center text-4xl font-serif font-bold text-gray-900 mb-4">
            Everything you need to cook better
          </h3>
          <p className="text-center text-xl text-gray-600 mb-12">
            From recipe creation to meal planning, PorkChop has you covered.
          </p>

          {/* Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {navigationCards.map((card) => (
              <Link
                key={card.title}
                to={card.path}
                className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`${card.color} p-6 rounded-t-lg`}>
                  <span className="text-2xl">🍳</span>
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
        </div>
      </div>
    </div>
  );
};

export default Home; 