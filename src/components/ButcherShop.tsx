import React from 'react';

const ButcherShop: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Butcher Shop</h1>
        <p className="text-xl text-gray-600">Connect with local butchers and specialty meat suppliers</p>
      </div>

      {/* Coming Soon Banner */}
      <div className="bg-gradient-to-r from-pink-100 to-pink-50 rounded-xl p-8 mb-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Coming Soon!</h2>
        <p className="text-gray-700 mb-6">
          We're working on partnerships with local butchers and specialty meat suppliers to bring you the finest cuts and expert advice.
        </p>
        <button
          className="bg-porkchop-500 text-white px-6 py-2 rounded-full font-medium hover:bg-porkchop-600 transition-colors"
          onClick={() => alert('Feature coming soon!')}
        >
          Get Notified
        </button>
      </div>

      {/* Feature Previews */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Local Partnerships</h3>
          <p className="text-gray-600">
            Connect with trusted local butchers and meat suppliers in your area.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Advice</h3>
          <p className="text-gray-600">
            Get professional tips and recommendations for your meat selections.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Special Orders</h3>
          <p className="text-gray-600">
            Place custom orders for special cuts and premium selections.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ButcherShop; 