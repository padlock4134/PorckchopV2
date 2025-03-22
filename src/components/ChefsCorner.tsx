import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ChefsCorner: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('community');
  const [activeTutorialTab, setActiveTutorialTab] = useState('knife');

  const tabs = [
    { id: 'community', label: 'Community' },
    { id: 'challenges', label: 'Challenges' },
    { id: 'tutorials', label: 'Tutorials' },
    { id: 'achievements', label: 'Achievements' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Chef's Corner</h1>
        <p className="text-xl text-gray-600">Join the community, share your passion, and grow as a chef!</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-porkchop-500 text-porkchop-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Community Feed */}
          {activeTab === 'community' && (
            <div className="space-y-6">
              {/* Create Post */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {user?.avatar ? (
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.avatar}
                        alt={user.name}
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-porkchop-100 flex items-center justify-center">
                        <span className="text-lg font-medium text-porkchop-600">
                          {user?.name?.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <textarea
                      placeholder="Share your cooking journey..."
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-porkchop-500 focus:ring-porkchop-500"
                      rows={3}
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="bg-porkchop-600 text-white px-4 py-2 rounded-lg hover:bg-porkchop-700">
                    Post
                  </button>
                </div>
              </div>

              {/* Community Posts */}
              <div className="space-y-6">
                {/* Sample Post */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center">
                        <span className="text-lg font-medium text-pink-600">S</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Sarah Chen</h3>
                      <p className="text-sm text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Just perfected my grandmother's dumpling recipe! The secret was in the dough consistency. 
                    Anyone else have family recipes they're trying to master?
                  </p>
                  <div className="flex items-center space-x-4 text-gray-500">
                    <button className="flex items-center space-x-1 hover:text-porkchop-600">
                      <span>❤️</span>
                      <span>24</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-porkchop-600">
                      <span>💬</span>
                      <span>8</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-porkchop-600">
                      <span>🔄</span>
                      <span>3</span>
                    </button>
                  </div>
                </div>

                {/* Another Sample Post */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-lg font-medium text-blue-600">M</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Mike Rodriguez</h3>
                      <p className="text-sm text-gray-500">5 hours ago</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
                      alt="Homemade pasta"
                      className="rounded-lg w-full h-64 object-cover"
                    />
                  </div>
                  <p className="text-gray-700 mb-4">
                    Fresh homemade pasta is a game-changer! Here's my go-to recipe for perfect al dente pasta every time.
                  </p>
                  <div className="flex items-center space-x-4 text-gray-500">
                    <button className="flex items-center space-x-1 hover:text-porkchop-600">
                      <span>❤️</span>
                      <span>42</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-porkchop-600">
                      <span>💬</span>
                      <span>15</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-porkchop-600">
                      <span>🔄</span>
                      <span>7</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Weekly Challenges */}
          {activeTab === 'challenges' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Weekly Challenge</h2>
                <div className="bg-porkchop-50 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Perfect Your Pasta</h3>
                  <p className="text-gray-600 mb-4">
                    This week's challenge is all about pasta! Create a dish featuring homemade pasta or a unique pasta recipe.
                    Share your creation and win points towards your chef level.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Ends in 5 days
                    </div>
                    <button className="bg-porkchop-600 text-white px-4 py-2 rounded-lg hover:bg-porkchop-700">
                      Join Challenge
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-medium text-gray-900 mb-4">Previous Winners</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                      <span className="text-2xl">🥇</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Emma Thompson</h4>
                      <p className="text-sm text-gray-500">Perfect Carbonara</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-2xl">🥈</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">David Chen</h4>
                      <p className="text-sm text-gray-500">Homemade Ravioli</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tutorials */}
          {activeTab === 'tutorials' && (
            <div className="space-y-6">
              {/* Tutorials Folder */}
              <div className="bg-white rounded-lg shadow-sm">
                {/* Tabs */}
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setActiveTutorialTab('methods')}
                    className={`
                      relative px-6 py-3 text-sm font-medium
                      ${activeTutorialTab === 'methods'
                        ? 'text-orange-600 bg-white border-b-2 border-orange-500'
                        : 'text-gray-500 hover:text-gray-700 bg-gray-50'
                      }
                      transition-all duration-200
                      rounded-t-lg
                      ${activeTutorialTab === 'methods' ? 'shadow-sm' : ''}
                    `}
                  >
                    <div className="absolute inset-0 bg-white rounded-t-lg transform -translate-y-1"></div>
                    <span className="relative">Cooking Methods</span>
                  </button>
                  <button
                    onClick={() => setActiveTutorialTab('safety')}
                    className={`
                      relative px-6 py-3 text-sm font-medium
                      ${activeTutorialTab === 'safety'
                        ? 'text-blue-600 bg-white border-b-2 border-blue-500'
                        : 'text-gray-500 hover:text-gray-700 bg-gray-50'
                      }
                      transition-all duration-200
                      rounded-t-lg
                      ${activeTutorialTab === 'safety' ? 'shadow-sm' : ''}
                    `}
                  >
                    <div className="absolute inset-0 bg-white rounded-t-lg transform -translate-y-1"></div>
                    <span className="relative">Food Safety</span>
                  </button>
                  <button
                    onClick={() => setActiveTutorialTab('knife')}
                    className={`
                      relative px-6 py-3 text-sm font-medium
                      ${activeTutorialTab === 'knife'
                        ? 'text-porkchop-600 bg-white border-b-2 border-porkchop-500'
                        : 'text-gray-500 hover:text-gray-700 bg-gray-50'
                      }
                      transition-all duration-200
                      rounded-t-lg
                      ${activeTutorialTab === 'knife' ? 'shadow-sm' : ''}
                    `}
                  >
                    <div className="absolute inset-0 bg-white rounded-t-lg transform -translate-y-1"></div>
                    <span className="relative">Knife Skills</span>
                  </button>
                  <button
                    onClick={() => setActiveTutorialTab('prep')}
                    className={`
                      relative px-6 py-3 text-sm font-medium
                      ${activeTutorialTab === 'prep'
                        ? 'text-green-600 bg-white border-b-2 border-green-500'
                        : 'text-gray-500 hover:text-gray-700 bg-gray-50'
                      }
                      transition-all duration-200
                      rounded-t-lg
                      ${activeTutorialTab === 'prep' ? 'shadow-sm' : ''}
                    `}
                  >
                    <div className="absolute inset-0 bg-white rounded-t-lg transform -translate-y-1"></div>
                    <span className="relative">Prep & Storage</span>
                  </button>
                  <button
                    onClick={() => setActiveTutorialTab('seasoning')}
                    className={`
                      relative px-6 py-3 text-sm font-medium
                      ${activeTutorialTab === 'seasoning'
                        ? 'text-purple-600 bg-white border-b-2 border-purple-500'
                        : 'text-gray-500 hover:text-gray-700 bg-gray-50'
                      }
                      transition-all duration-200
                      rounded-t-lg
                      ${activeTutorialTab === 'seasoning' ? 'shadow-sm' : ''}
                    `}
                  >
                    <div className="absolute inset-0 bg-white rounded-t-lg transform -translate-y-1"></div>
                    <span className="relative">Seasoning & Rubs</span>
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Cooking Methods Content */}
                  {activeTutorialTab === 'methods' && (
                    <div className="space-y-8">
                      {/* Basic Series */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Series</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">🍳</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Pan Frying & Sautéing</h4>
                              <p className="text-sm text-gray-600 mb-4">Master the fundamentals of pan cooking techniques.</p>
                              <button className="text-orange-600 hover:text-orange-700">Watch Tutorial →</button>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">🥘</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Boiling & Simmering</h4>
                              <p className="text-sm text-gray-600 mb-4">Learn proper water-based cooking methods.</p>
                              <button className="text-orange-600 hover:text-orange-700">Watch Tutorial →</button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Intermediate Series */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Intermediate Series</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">🍖</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Braising & Stewing</h4>
                              <p className="text-sm text-gray-600 mb-4">Perfect slow-cooking methods for tender results.</p>
                              <button className="text-orange-600 hover:text-orange-700">Watch Tutorial →</button>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">🔥</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Roasting & Baking</h4>
                              <p className="text-sm text-gray-600 mb-4">Master dry heat cooking techniques.</p>
                              <button className="text-orange-600 hover:text-orange-700">Watch Tutorial →</button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Advanced Series */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Advanced Series</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">🌡️</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Sous Vide Cooking</h4>
                              <p className="text-sm text-gray-600 mb-4">Learn precision temperature cooking.</p>
                              <button className="text-orange-600 hover:text-orange-700">Watch Tutorial →</button>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">🌫️</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Smoking & Grilling</h4>
                              <p className="text-sm text-gray-600 mb-4">Master outdoor and smoke cooking techniques.</p>
                              <button className="text-orange-600 hover:text-orange-700">Watch Tutorial →</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Food Safety Content */}
                  {activeTutorialTab === 'safety' && (
                    <div className="space-y-8">
                      {/* Basic Series */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Series</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">🌡️</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Temperature Control: The Danger Zone</h4>
                              <p className="text-sm text-gray-600 mb-4">Understanding safe temperature ranges and proper thermometer usage.</p>
                              <button className="text-blue-600 hover:text-blue-700">Watch Tutorial →</button>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">⚠️</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Cross-Contamination Prevention</h4>
                              <p className="text-sm text-gray-600 mb-4">Learn how to prevent foodborne illness through proper handling.</p>
                              <button className="text-blue-600 hover:text-blue-700">Watch Tutorial →</button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Intermediate Series */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Intermediate Series</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">🧼</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Proper Hand Washing & Sanitization</h4>
                              <p className="text-sm text-gray-600 mb-4">Master the WHO hand washing technique and kitchen sanitization.</p>
                              <button className="text-blue-600 hover:text-blue-700">Watch Tutorial →</button>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">📦</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Ingredient Storage & Shelf Life</h4>
                              <p className="text-sm text-gray-600 mb-4">Learn proper storage techniques for different types of ingredients.</p>
                              <button className="text-blue-600 hover:text-blue-700">Watch Tutorial →</button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Advanced Series */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Advanced Series</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">⚠️</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Allergen Management</h4>
                              <p className="text-sm text-gray-600 mb-4">Prevent cross-contact and handle food allergies safely.</p>
                              <button className="text-blue-600 hover:text-blue-700">Watch Tutorial →</button>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">🚨</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Emergency Response</h4>
                              <p className="text-sm text-gray-600 mb-4">Learn first aid basics and kitchen emergency procedures.</p>
                              <button className="text-blue-600 hover:text-blue-700">Watch Tutorial →</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Knife Skills Content */}
                  {activeTutorialTab === 'knife' && (
                    <div className="space-y-8">
                      {/* Basic Series */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Series</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">🔪</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">How to Hold a Knife Like a Pro</h4>
                              <p className="text-sm text-gray-600 mb-4">Master the fundamental grip techniques used by professional chefs.</p>
                              <button className="text-porkchop-600 hover:text-porkchop-700">Watch Tutorial →</button>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">✂️</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Basic Cuts: Dice, Slice, Chop</h4>
                              <p className="text-sm text-gray-600 mb-4">Learn the essential cutting techniques every home chef needs.</p>
                              <button className="text-porkchop-600 hover:text-porkchop-700">Watch Tutorial →</button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Intermediate Series */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Intermediate Series</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">🥕</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Julienne & Batonnet: Perfect Matchsticks</h4>
                              <p className="text-sm text-gray-600 mb-4">Create uniform matchstick cuts for stir-fries and salads.</p>
                              <button className="text-porkchop-600 hover:text-porkchop-700">Watch Tutorial →</button>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">🌿</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Chiffonade: Beautiful Herbs & Greens</h4>
                              <p className="text-sm text-gray-600 mb-4">Master the art of cutting herbs and leafy greens into ribbons.</p>
                              <button className="text-porkchop-600 hover:text-porkchop-700">Watch Tutorial →</button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Advanced Series */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Advanced Series</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">🥔</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Tourné: The Art of the Turned Cut</h4>
                              <p className="text-sm text-gray-600 mb-4">Learn the classic French technique for cutting vegetables into football shapes.</p>
                              <button className="text-porkchop-600 hover:text-porkchop-700">Watch Tutorial →</button>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">⚡</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Speed Slicing: Professional Efficiency</h4>
                              <p className="text-sm text-gray-600 mb-4">Increase your cutting speed while maintaining precision and safety.</p>
                              <button className="text-porkchop-600 hover:text-porkchop-700">Watch Tutorial →</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Prep & Storage Content */}
                  {activeTutorialTab === 'prep' && (
                    <div className="space-y-8">
                      {/* Basic Series */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Series</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">🥬</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Proper Produce Washing</h4>
                              <p className="text-sm text-gray-600 mb-4">Learn the correct way to wash and prepare different types of produce.</p>
                              <button className="text-green-600 hover:text-green-700">Watch Tutorial →</button>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">🧊</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Freezing Techniques</h4>
                              <p className="text-sm text-gray-600 mb-4">Master the art of freezing ingredients while maintaining quality.</p>
                              <button className="text-green-600 hover:text-green-700">Watch Tutorial →</button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Intermediate Series */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Intermediate Series</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">🥩</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Meat Preparation & Storage</h4>
                              <p className="text-sm text-gray-600 mb-4">Proper techniques for handling and storing different cuts of meat.</p>
                              <button className="text-green-600 hover:text-green-700">Watch Tutorial →</button>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">🍷</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Wine & Ingredient Pairing</h4>
                              <p className="text-sm text-gray-600 mb-4">Learn how to pair ingredients with wines for optimal flavor.</p>
                              <button className="text-green-600 hover:text-green-700">Watch Tutorial →</button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Advanced Series */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Advanced Series</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">🍖</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Dry Aging & Curing</h4>
                              <p className="text-sm text-gray-600 mb-4">Advanced techniques for aging and curing meats at home.</p>
                              <button className="text-green-600 hover:text-green-700">Watch Tutorial →</button>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">🌿</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Herb & Spice Preservation</h4>
                              <p className="text-sm text-gray-600 mb-4">Methods for preserving and storing fresh herbs and spices.</p>
                              <button className="text-green-600 hover:text-green-700">Watch Tutorial →</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Seasoning & Rubs Content */}
                  {activeTutorialTab === 'seasoning' && (
                    <div className="space-y-8">
                      {/* Basic Series */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Series</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">🧂</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Salt & Pepper Fundamentals</h4>
                              <p className="text-sm text-gray-600 mb-4">Master the art of basic seasoning with salt and pepper.</p>
                              <button className="text-purple-600 hover:text-purple-700">Watch Tutorial →</button>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">🌶️</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Herb & Spice Basics</h4>
                              <p className="text-sm text-gray-600 mb-4">Learn to use common herbs and spices effectively.</p>
                              <button className="text-purple-600 hover:text-purple-700">Watch Tutorial →</button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Intermediate Series */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Intermediate Series</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">🥩</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Meat Rubs & Marinades</h4>
                              <p className="text-sm text-gray-600 mb-4">Create flavorful rubs and marinades for different cuts of meat.</p>
                              <button className="text-purple-600 hover:text-purple-700">Watch Tutorial →</button>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">🌿</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Herb Blends & Mixes</h4>
                              <p className="text-sm text-gray-600 mb-4">Learn to create custom herb blends for different cuisines.</p>
                              <button className="text-purple-600 hover:text-purple-700">Watch Tutorial →</button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Advanced Series */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Advanced Series</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">🔥</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Complex Spice Blends</h4>
                              <p className="text-sm text-gray-600 mb-4">Create sophisticated spice blends from around the world.</p>
                              <button className="text-purple-600 hover:text-purple-700">Watch Tutorial →</button>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">⚡</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Advanced Seasoning Techniques</h4>
                              <p className="text-sm text-gray-600 mb-4">Master advanced seasoning methods for professional results.</p>
                              <button className="text-purple-600 hover:text-purple-700">Watch Tutorial →</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Achievements */}
          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Your Achievements</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-3xl mb-2">👨‍🍳</div>
                    <h3 className="font-medium text-gray-900">Line Cook</h3>
                    <p className="text-sm text-gray-600">Level 3</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-3xl mb-2">📚</div>
                    <h3 className="font-medium text-gray-900">Recipe Master</h3>
                    <p className="text-sm text-gray-600">10 recipes created</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-3xl mb-2">🏆</div>
                    <h3 className="font-medium text-gray-900">Challenge Winner</h3>
                    <p className="text-sm text-gray-600">1 challenge won</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Trending Topics */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-medium text-gray-900 mb-4">Trending Topics</h3>
            <div className="space-y-3">
              <button className="flex items-center justify-between w-full text-left hover:text-porkchop-600">
                <span>#HomemadePasta</span>
                <span className="text-sm text-gray-500">128 posts</span>
              </button>
              <button className="flex items-center justify-between w-full text-left hover:text-porkchop-600">
                <span>#KitchenHacks</span>
                <span className="text-sm text-gray-500">96 posts</span>
              </button>
              <button className="flex items-center justify-between w-full text-left hover:text-porkchop-600">
                <span>#FamilyRecipes</span>
                <span className="text-sm text-gray-500">84 posts</span>
              </button>
            </div>
          </div>

          {/* Suggested Chefs */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-medium text-gray-900 mb-4">Suggested Chefs</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-lg font-medium text-green-600">J</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Julia Chen</h4>
                  <p className="text-sm text-gray-500">Pastry Expert</p>
                </div>
                <button className="text-porkchop-600 hover:text-porkchop-700">Follow</button>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-lg font-medium text-purple-600">M</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Marcus Rodriguez</h4>
                  <p className="text-sm text-gray-500">BBQ Master</p>
                </div>
                <button className="text-porkchop-600 hover:text-porkchop-700">Follow</button>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-medium text-gray-900 mb-4">Quick Tips</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-porkchop-600">💡</span>
                <p className="text-sm text-gray-600">
                  Always let your meat rest after cooking to lock in juices.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-porkchop-600">💡</span>
                <p className="text-sm text-gray-600">
                  Keep your knives sharp - a dull knife is more dangerous than a sharp one.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-porkchop-600">💡</span>
                <p className="text-sm text-gray-600">
                  Season your food in layers for maximum flavor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefsCorner; 