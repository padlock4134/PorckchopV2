import React from 'react';
import { useAuth } from '../context/AuthContext';

const ChefsMarket: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Chef's Market</h1>
        <p className="text-xl text-gray-600">Discover, share, and connect with fellow chefs</p>
      </div>

      {/* Featured Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Trending Recipes */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-porkchop-500 to-porkchop-600 p-6">
            <h2 className="text-2xl font-semibold text-white">Trending Recipes</h2>
            <p className="text-white/80">See what's cooking in the community</p>
          </div>
          <div className="p-6">
            <p className="text-gray-600 text-center">Coming soon!</p>
          </div>
        </div>

        {/* Seasonal Highlights */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-6">
            <h2 className="text-2xl font-semibold text-white">Seasonal Highlights</h2>
            <p className="text-white/80">Fresh ingredients and seasonal recipes</p>
          </div>
          <div className="p-6">
            <p className="text-gray-600 text-center">Coming soon!</p>
          </div>
        </div>
      </div>

      {/* Community Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Follow Chefs */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Follow Chefs</h3>
          <p className="text-gray-600 mb-4">
            Connect with talented chefs and get inspired by their creations.
          </p>
          <button className="text-porkchop-600 font-medium hover:text-porkchop-700">
            Coming Soon →
          </button>
        </div>

        {/* Recipe Collections */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Recipe Collections</h3>
          <p className="text-gray-600 mb-4">
            Discover curated collections for every occasion and taste.
          </p>
          <button className="text-porkchop-600 font-medium hover:text-porkchop-700">
            Coming Soon →
          </button>
        </div>

        {/* Cooking Challenges */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Cooking Challenges</h3>
          <p className="text-gray-600 mb-4">
            Join community challenges and showcase your skills.
          </p>
          <button className="text-porkchop-600 font-medium hover:text-porkchop-700">
            Coming Soon →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChefsMarket; 