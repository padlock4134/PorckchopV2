import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSubscription } from '../context/SubscriptionContext';
import { useAuth } from '../context/AuthContext';
import { calculateChefLevel, getChefLevelColor } from '../utils/chefLevel';
import ChefFreddieLogo from './ChefFreddieLogo';
import TipOfTheDay from './TipOfTheDay';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isSubscribed } = useSubscription();
  const { user, logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Calculate chef level based on recipes created (mock data for now)
  const chefLevel = calculateChefLevel(user?.recipesCreated || 12);
  const levelColor = getChefLevelColor(chefLevel.level);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-porkchop-900">
                PorkChop
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Tip of the Day */}
            <div className="mr-4">
              <TipOfTheDay />
            </div>
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-porkchop-500"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span className="sr-only">Open user menu</span>
                {user?.avatar ? (
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.avatar}
                    alt={user.name}
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-porkchop-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-porkchop-600">
                      {user?.name?.charAt(0)}
                    </span>
                  </div>
                )}
              </button>
              
              {isUserMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  <Link
                    to="/profile"
                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                      isActive('/profile') ? 'bg-gray-100' : ''
                    }`}
                    role="menuitem"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Your Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsUserMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;