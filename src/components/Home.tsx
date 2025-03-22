import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSavedRecipes } from '../context/SavedRecipesContext';
import { calculateChefLevel, getChefLevelColor } from '../utils/chefLevel';
import { getDailyChefQuote } from '../utils/chefQuotes';
import LiveActivity from './LiveActivity';

const Home: React.FC = () => {
  const { user } = useAuth();
  const { savedRecipes } = useSavedRecipes();
  const chefLevel = calculateChefLevel(user?.recipesCreated || 0);
  const levelColor = getChefLevelColor(chefLevel.level);
  const chefQuote = getDailyChefQuote();

  const getMedalEmoji = (level: number) => {
    if (level >= 18) return '👑'; // Legendary
    if (level >= 15) return '🏆'; // Elite
    if (level >= 12) return '🥇'; // Master
    if (level >= 9) return '🥈'; // Executive
    if (level >= 6) return '🥉'; // Senior
    if (level >= 3) return '🎖️'; // Junior
    return '🍳'; // Beginner
  };

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
          <div className="flex items-start space-x-8">
            {/* Left Section - Medal and Level */}
            <div className="flex-shrink-0">
              <div className={`w-24 h-24 rounded-full ${levelColor} flex items-center justify-center`}>
                <span className="text-4xl">{getMedalEmoji(chefLevel.level)}</span>
              </div>
              <div className="text-base text-gray-600 text-center mt-2">
                {chefLevel.title}
                <div className="text-sm text-gray-500">Level {chefLevel.level}</div>
              </div>
            </div>

            {/* Middle Section - Welcome Text */}
            <div className="flex-1 text-center">
              <h1 className="text-5xl font-serif font-bold text-gray-900 mb-3">
                Welcome Back, {user?.firstName || 'there'}!
              </h1>
              <p className="text-2xl text-gray-600 mb-6">
                Ready to create something delicious today?
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-xl text-gray-700 italic mb-2">"{chefQuote.quote}"</p>
                <div className="flex items-center justify-center space-x-2">
                  <p className="text-lg font-semibold text-gray-800">{chefQuote.author}</p>
                  <span className="text-gray-400">•</span>
                  <p className="text-gray-600">{chefQuote.role}</p>
                </div>
              </div>
            </div>

            {/* Right Section - Kitchen Photo */}
            <div className="flex-shrink-0">
              <div className="border-2 border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <img 
                  src="/images/1920s Kitchen.png.webp" 
                  alt="1920s Kitchen" 
                  className="w-[400px] h-[220px] object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link to="/create-recipe" className="group h-full">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md h-full flex flex-col">
              <div className="bg-gray-600 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium text-white">What's in My Fridge</h3>
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200">🧊</span>
                </div>
              </div>
              <div className="p-6 flex-grow">
                <p className="text-gray-600">Create recipes with ingredients you have</p>
              </div>
            </div>
          </Link>

          <Link to="/my-cookbook" className="group h-full">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md h-full flex flex-col">
              <div className="bg-pink-500 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium text-white">My Cookbook</h3>
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200">📚</span>
                </div>
              </div>
              <div className="p-6 flex-grow">
                <p className="text-gray-600">Access your saved recipes</p>
              </div>
            </div>
          </Link>

          <Link to="/butcher-shop" className="group h-full">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md h-full flex flex-col">
              <div className="bg-red-500 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium text-white">Butcher Shop</h3>
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200">🥩</span>
                </div>
              </div>
              <div className="p-6 flex-grow">
                <p className="text-gray-600">Connect with local vendors</p>
                <span className="text-sm text-gray-500">Coming Soon →</span>
              </div>
            </div>
          </Link>

          <Link to="/chefs-corner" className="group h-full">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md h-full flex flex-col">
              <div className="bg-blue-500 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium text-white">Chef's Corner</h3>
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200">👨‍🍳</span>
                </div>
              </div>
              <div className="p-6 flex-grow">
                <p className="text-gray-600">Join the cooking community</p>
              </div>
            </div>
          </Link>
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
        <LiveActivity />
      </div>
    </div>
  );
};

export default Home; 