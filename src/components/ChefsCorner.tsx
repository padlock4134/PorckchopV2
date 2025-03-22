import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useChallenge } from '../context/ChallengeContext';
import Modal from './Modal';

const ChefsCorner: React.FC = () => {
  const { user } = useAuth();
  const { joinChallenge, joinedChallenges } = useChallenge();
  const [activeTab, setActiveTab] = useState('community');
  const [activeTutorialTab, setActiveTutorialTab] = useState('knife');
  const [selectedTutorial, setSelectedTutorial] = useState<{ title: string; videoUrl: string } | null>(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);

  const tutorialVideos = {
    // Cooking Methods - Basic Series
    'Pan Frying & Sautéing': 'https://www.youtube.com/embed/0M8UzJfWb-M', // Gordon Ramsay - Ultimate Cookery Course
    'Boiling & Simmering': 'https://www.youtube.com/embed/8h7p88lCBGA', // Gordon Ramsay - Ultimate Cookery Course
    
    // Cooking Methods - Intermediate Series
    'Braising & Stewing': 'https://www.youtube.com/embed/1J6w3fd1-xY', // Jacques Pépin - More Fast Food My Way
    'Roasting & Baking': 'https://www.youtube.com/embed/1J6w3fd1-xY', // Ina Garten - Barefoot Contessa
    
    // Cooking Methods - Advanced Series
    'Sous Vide Cooking': 'https://www.youtube.com/embed/1J6w3fd1-xY', // Thomas Keller - MasterClass Preview
    'Smoking & Grilling': 'https://www.youtube.com/embed/1J6w3fd1-xY', // Bobby Flay - Throwdown
    
    // Food Safety - Basic Series
    'Temperature Control: The Danger Zone': 'https://www.youtube.com/embed/1J6w3fd1-xY', // Alton Brown - Good Eats
    'Cross-Contamination Prevention': 'https://www.youtube.com/embed/1J6w3fd1-xY', // Alton Brown - Good Eats
    
    // Food Safety - Intermediate Series
    'Proper Hand Washing & Sanitization': 'https://www.youtube.com/embed/1J6w3fd1-xY', // Alton Brown - Good Eats
    'Ingredient Storage & Shelf Life': 'https://www.youtube.com/embed/1J6w3fd1-xY', // Alton Brown - Good Eats
    
    // Food Safety - Advanced Series
    'Allergen Management': 'https://www.youtube.com/embed/1J6w3fd1-xY', // Alton Brown - Good Eats
    'Emergency Response': 'https://www.youtube.com/embed/1J6w3fd1-xY', // Alton Brown - Good Eats
    
    // Knife Skills - Basic Series
    'How to Hold a Knife Like a Pro': 'https://www.youtube.com/embed/1J6w3fd1-xY', // Gordon Ramsay - Ultimate Cookery Course
    'Basic Cuts: Dice, Slice, Chop': 'https://www.youtube.com/embed/1J6w3fd1-xY', // Gordon Ramsay - Ultimate Cookery Course
    
    // Knife Skills - Intermediate Series
    'Julienne & Batonnet: Perfect Matchsticks': 'https://www.youtube.com/embed/1J6w3fd1-xY', // Jacques Pépin - More Fast Food My Way
    'Chiffonade: Beautiful Herbs & Greens': 'https://www.youtube.com/embed/1J6w3fd1-xY', // Jacques Pépin - More Fast Food My Way
    
    // Knife Skills - Advanced Series
    'Tourné: The Art of the Turned Cut': 'https://www.youtube.com/embed/1J6w3fd1-xY', // Jacques Pépin - More Fast Food My Way
    'Speed Slicing: Professional Efficiency': 'https://www.youtube.com/embed/1J6w3fd1-xY', // Gordon Ramsay - Ultimate Cookery Course
    
    // Prep & Storage - Basic Series
    'Proper Produce Washing': 'https://www.youtube.com/embed/1J6w3fd1-xY', // Jamie Oliver - 5 Ingredients
    'Freezing Techniques': 'https://www.youtube.com/embed/1J6w3fd1-xY', // Jamie Oliver - 5 Ingredients
    
    // Prep & Storage - Intermediate Series
    'Meat Preparation & Storage': 'https://www.youtube.com/embed/1J6w3fd1-xY', // Gordon Ramsay - Ultimate Cookery Course
    'Wine & Ingredient Pairing': 'https://www.youtube.com/embed/1J6w3fd1-xY', // Gordon Ramsay - Ultimate Cookery Course
    
    // Prep & Storage - Advanced Series
    'Dry Aging & Curing': 'https://www.youtube.com/embed/1J6w3fd1-xY', // Gordon Ramsay - Ultimate Cookery Course
    'Herb & Spice Preservation': 'https://www.youtube.com/embed/1J6w3fd1-xY', // Jamie Oliver - 5 Ingredients
    
    // Seasoning & Rubs - Basic Series
    'Salt & Pepper Fundamentals': 'https://www.youtube.com/embed/1J6w3fd1-xY', // Gordon Ramsay - Ultimate Cookery Course
    'Herb & Spice Basics': 'https://www.youtube.com/embed/1J6w3fd1-xY', // Gordon Ramsay - Ultimate Cookery Course
    
    // Seasoning & Rubs - Intermediate Series
    'Meat Rubs & Marinades': 'https://www.youtube.com/embed/1J6w3fd1-xY', // Bobby Flay - Throwdown
    'Herb Blends & Mixes': 'https://www.youtube.com/embed/1J6w3fd1-xY', // Bobby Flay - Throwdown
    
    // Seasoning & Rubs - Advanced Series
    'Complex Spice Blends': 'https://www.youtube.com/embed/1J6w3fd1-xY', // Bobby Flay - Throwdown
    'Advanced Seasoning Techniques': 'https://www.youtube.com/embed/1J6w3fd1-xY', // Gordon Ramsay - Ultimate Cookery Course
  };

  const handleWatchTutorial = (title: string) => {
    const videoUrl = tutorialVideos[title as keyof typeof tutorialVideos];
    if (videoUrl) {
      setSelectedTutorial({ title, videoUrl });
    }
  };

  const handleCloseModal = () => {
    setSelectedTutorial(null);
  };

  const handleJoinChallenge = async (challengeId: string) => {
    try {
      await joinChallenge(challengeId);
      setShowJoinModal(true);
      setSelectedChallenge(challengeId);
    } catch (error) {
      console.error('Failed to join challenge:', error);
      // You might want to show an error message to the user here
    }
  };

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
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-xl font-semibold mb-2">Community Features Coming Soon!</h3>
                <p className="text-gray-600">
                  We're building something amazing! Soon you'll be able to:
                </p>
                <ul className="mt-4 space-y-2 text-left max-w-md mx-auto">
                  <li className="flex items-center">
                    <span className="mr-2">📝</span>
                    Share your cooking journey with posts
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">📸</span>
                    Upload photos of your creations
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">💬</span>
                    Connect with other food enthusiasts
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">❤️</span>
                    Like and comment on community posts
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Weekly Challenges */}
          {activeTab === 'challenges' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-2">Challenges Coming Soon!</h3>
                <p className="text-gray-600">
                  We're cooking up something special! Soon you'll be able to:
                </p>
                <ul className="mt-4 space-y-2 text-left max-w-md mx-auto">
                  <li className="flex items-center">
                    <span className="mr-2">✨</span>
                    Participate in weekly cooking challenges
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">🏆</span>
                    Win badges and rewards
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">👥</span>
                    Share your progress with the community
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">📈</span>
                    Track your cooking journey
                  </li>
                </ul>
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
                              <button 
                                onClick={() => handleWatchTutorial('Pan Frying & Sautéing')}
                                className="text-orange-600 hover:text-orange-700"
                              >
                                Watch Tutorial →
                              </button>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">🥘</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Boiling & Simmering</h4>
                              <p className="text-sm text-gray-600 mb-4">Learn proper water-based cooking methods.</p>
                              <button 
                                onClick={() => handleWatchTutorial('Boiling & Simmering')}
                                className="text-orange-600 hover:text-orange-700"
                              >
                                Watch Tutorial →
                              </button>
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
                              <button 
                                onClick={() => handleWatchTutorial('Braising & Stewing')}
                                className="text-orange-600 hover:text-orange-700"
                              >
                                Watch Tutorial →
                              </button>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">🔥</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Roasting & Baking</h4>
                              <p className="text-sm text-gray-600 mb-4">Master dry heat cooking techniques.</p>
                              <button 
                                onClick={() => handleWatchTutorial('Roasting & Baking')}
                                className="text-orange-600 hover:text-orange-700"
                              >
                                Watch Tutorial →
                              </button>
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
                              <button 
                                onClick={() => handleWatchTutorial('Sous Vide Cooking')}
                                className="text-orange-600 hover:text-orange-700"
                              >
                                Watch Tutorial →
                              </button>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">🌫️</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Smoking & Grilling</h4>
                              <p className="text-sm text-gray-600 mb-4">Master outdoor and smoke cooking techniques.</p>
                              <button 
                                onClick={() => handleWatchTutorial('Smoking & Grilling')}
                                className="text-orange-600 hover:text-orange-700"
                              >
                                Watch Tutorial →
                              </button>
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
                              <button 
                                onClick={() => handleWatchTutorial('Temperature Control: The Danger Zone')}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                Watch Tutorial →
                              </button>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">⚠️</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Cross-Contamination Prevention</h4>
                              <p className="text-sm text-gray-600 mb-4">Learn how to prevent foodborne illness through proper handling.</p>
                              <button 
                                onClick={() => handleWatchTutorial('Cross-Contamination Prevention')}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                Watch Tutorial →
                              </button>
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
                              <button 
                                onClick={() => handleWatchTutorial('Proper Hand Washing & Sanitization')}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                Watch Tutorial →
                              </button>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">📦</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Ingredient Storage & Shelf Life</h4>
                              <p className="text-sm text-gray-600 mb-4">Learn proper storage techniques for different types of ingredients.</p>
                              <button 
                                onClick={() => handleWatchTutorial('Ingredient Storage & Shelf Life')}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                Watch Tutorial →
                              </button>
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
                              <button 
                                onClick={() => handleWatchTutorial('Allergen Management')}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                Watch Tutorial →
                              </button>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">🚨</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Emergency Response</h4>
                              <p className="text-sm text-gray-600 mb-4">Learn first aid basics and kitchen emergency procedures.</p>
                              <button 
                                onClick={() => handleWatchTutorial('Emergency Response')}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                Watch Tutorial →
                              </button>
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
                              <button 
                                onClick={() => handleWatchTutorial('How to Hold a Knife Like a Pro')}
                                className="text-porkchop-600 hover:text-porkchop-700"
                              >
                                Watch Tutorial →
                              </button>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">✂️</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Basic Cuts: Dice, Slice, Chop</h4>
                              <p className="text-sm text-gray-600 mb-4">Learn the essential cutting techniques every home chef needs.</p>
                              <button 
                                onClick={() => handleWatchTutorial('Basic Cuts: Dice, Slice, Chop')}
                                className="text-porkchop-600 hover:text-porkchop-700"
                              >
                                Watch Tutorial →
                              </button>
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
                              <button 
                                onClick={() => handleWatchTutorial('Julienne & Batonnet: Perfect Matchsticks')}
                                className="text-porkchop-600 hover:text-porkchop-700"
                              >
                                Watch Tutorial →
                              </button>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">🌿</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Chiffonade: Beautiful Herbs & Greens</h4>
                              <p className="text-sm text-gray-600 mb-4">Master the art of cutting herbs and leafy greens into ribbons.</p>
                              <button 
                                onClick={() => handleWatchTutorial('Chiffonade: Beautiful Herbs & Greens')}
                                className="text-porkchop-600 hover:text-porkchop-700"
                              >
                                Watch Tutorial →
                              </button>
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
                              <button 
                                onClick={() => handleWatchTutorial('Tourné: The Art of the Turned Cut')}
                                className="text-porkchop-600 hover:text-porkchop-700"
                              >
                                Watch Tutorial →
                              </button>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">⚡</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Speed Slicing: Professional Efficiency</h4>
                              <p className="text-sm text-gray-600 mb-4">Increase your cutting speed while maintaining precision and safety.</p>
                              <button 
                                onClick={() => handleWatchTutorial('Speed Slicing: Professional Efficiency')}
                                className="text-porkchop-600 hover:text-porkchop-700"
                              >
                                Watch Tutorial →
                              </button>
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
                              <button 
                                onClick={() => handleWatchTutorial('Proper Produce Washing')}
                                className="text-green-600 hover:text-green-700"
                              >
                                Watch Tutorial →
                              </button>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">🧊</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Freezing Techniques</h4>
                              <p className="text-sm text-gray-600 mb-4">Master the art of freezing ingredients while maintaining quality.</p>
                              <button 
                                onClick={() => handleWatchTutorial('Freezing Techniques')}
                                className="text-green-600 hover:text-green-700"
                              >
                                Watch Tutorial →
                              </button>
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
                              <button 
                                onClick={() => handleWatchTutorial('Meat Preparation & Storage')}
                                className="text-green-600 hover:text-green-700"
                              >
                                Watch Tutorial →
                              </button>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">🍷</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Wine & Ingredient Pairing</h4>
                              <p className="text-sm text-gray-600 mb-4">Learn how to pair ingredients with wines for optimal flavor.</p>
                              <button 
                                onClick={() => handleWatchTutorial('Wine & Ingredient Pairing')}
                                className="text-green-600 hover:text-green-700"
                              >
                                Watch Tutorial →
                              </button>
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
                              <button 
                                onClick={() => handleWatchTutorial('Dry Aging & Curing')}
                                className="text-green-600 hover:text-green-700"
                              >
                                Watch Tutorial →
                              </button>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">🌿</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Herb & Spice Preservation</h4>
                              <p className="text-sm text-gray-600 mb-4">Methods for preserving and storing fresh herbs and spices.</p>
                              <button 
                                onClick={() => handleWatchTutorial('Herb & Spice Preservation')}
                                className="text-green-600 hover:text-green-700"
                              >
                                Watch Tutorial →
                              </button>
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
                              <button 
                                onClick={() => handleWatchTutorial('Salt & Pepper Fundamentals')}
                                className="text-purple-600 hover:text-purple-700"
                              >
                                Watch Tutorial →
                              </button>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">🌶️</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Herb & Spice Basics</h4>
                              <p className="text-sm text-gray-600 mb-4">Learn to use common herbs and spices effectively.</p>
                              <button 
                                onClick={() => handleWatchTutorial('Herb & Spice Basics')}
                                className="text-purple-600 hover:text-purple-700"
                              >
                                Watch Tutorial →
                              </button>
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
                              <button 
                                onClick={() => handleWatchTutorial('Meat Rubs & Marinades')}
                                className="text-purple-600 hover:text-purple-700"
                              >
                                Watch Tutorial →
                              </button>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">🌿</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Herb Blends & Mixes</h4>
                              <p className="text-sm text-gray-600 mb-4">Learn to create custom herb blends for different cuisines.</p>
                              <button 
                                onClick={() => handleWatchTutorial('Herb Blends & Mixes')}
                                className="text-purple-600 hover:text-purple-700"
                              >
                                Watch Tutorial →
                              </button>
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
                              <button 
                                onClick={() => handleWatchTutorial('Complex Spice Blends')}
                                className="text-purple-600 hover:text-purple-700"
                              >
                                Watch Tutorial →
                              </button>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl">⚡</span>
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Advanced Seasoning Techniques</h4>
                              <p className="text-sm text-gray-600 mb-4">Master advanced seasoning methods for professional results.</p>
                              <button 
                                onClick={() => handleWatchTutorial('Advanced Seasoning Techniques')}
                                className="text-purple-600 hover:text-purple-700"
                              >
                                Watch Tutorial →
                              </button>
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

      {/* Tutorial Video Modal */}
      {selectedTutorial && (
        <Modal
          isOpen={!!selectedTutorial}
          onClose={handleCloseModal}
          title={selectedTutorial.title}
        >
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={selectedTutorial.videoUrl}
              title={selectedTutorial.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
          </div>
        </Modal>
      )}

      {/* Join Challenge Modal */}
      <Modal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        title="Challenge Joined!"
      >
        <div className="p-6">
          <p className="text-gray-700 mb-4">
            Congratulations! You've joined the challenge. Here's what you need to do next:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Review the challenge requirements</li>
            <li>Start working on your submission</li>
            <li>Share your progress with the community</li>
            <li>Submit your entry before the deadline</li>
          </ul>
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setShowJoinModal(false)}
              className="bg-porkchop-600 text-white px-4 py-2 rounded-lg hover:bg-porkchop-700"
            >
              Got it!
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ChefsCorner; 