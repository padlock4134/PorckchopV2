import React from 'react';

const ChefsCorner: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Chef's Corner</h1>
        <p className="text-xl text-gray-600">
          Join our community of food enthusiasts. Coming soon!
        </p>
      </div>

      {/* Coming Soon Banner */}
      <div className="mt-12 bg-gradient-to-r from-pink-100 to-pink-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Coming Soon!</h2>
        <p className="text-gray-700 mb-6">
          We're working on building an amazing community space for chefs like you to share recipes,
          tips, and culinary experiences.
        </p>
        <button
          className="bg-gray-600 text-white px-6 py-2 rounded-full font-medium hover:bg-gray-700 transition-colors"
          onClick={() => alert('Feature coming soon!')}
        >
          Get Notified
        </button>
      </div>

      {/* Feature Previews */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Recipe Sharing</h3>
          <p className="text-gray-600">
            Share your favorite recipes and cooking techniques with the community.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Cooking Challenges</h3>
          <p className="text-gray-600">
            Participate in weekly cooking challenges and showcase your skills.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Chef Profiles</h3>
          <p className="text-gray-600">
            Create your chef profile and connect with other cooking enthusiasts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChefsCorner; 