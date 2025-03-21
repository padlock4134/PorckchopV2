import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSubscription } from '../context/SubscriptionContext';
import { useAuth } from '../context/AuthContext';
import { calculateChefLevel, getChefLevelColor } from '../utils/chefLevel';
import MobileMenuButton from './MobileMenuButton';
import SearchBar from './SearchBar';

const Navigation: React.FC = () => {
  const location = useLocation();
  const { isSubscribed } = useSubscription();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Calculate chef level based on recipes created (mock data for now)
  const chefLevel = calculateChefLevel(user?.recipesCreated || 12);
  const levelColor = getChefLevelColor(chefLevel.level);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleLogout = async () => {
    try {
      await logout();
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
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/create-recipe"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/create-recipe')
                    ? 'border-porkchop-500 text-porkchop-900'
                    : 'border-transparent text-porkchop-500 hover:border-porkchop-300 hover:text-porkchop-700'
                }`}
              >
                Create Recipe
              </Link>
              {isSubscribed && (
                <Link
                  to="/subscription"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive('/subscription')
                      ? 'border-porkchop-500 text-porkchop-900'
                      : 'border-transparent text-porkchop-500 hover:border-porkchop-300 hover:text-porkchop-700'
                  }`}
                >
                  Subscription
                </Link>
              )}
              {!isSubscribed && (
                <Link
                  to="/pricing"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive('/pricing')
                      ? 'border-porkchop-500 text-porkchop-900'
                      : 'border-transparent text-porkchop-500 hover:border-porkchop-300 hover:text-porkchop-700'
                  }`}
                >
                  Pricing
                </Link>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <SearchBar className="w-64" />
            <div className="ml-3 relative">
              <div className="flex flex-col items-center">
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
                <div className="mt-1 flex items-center space-x-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${levelColor}`}>
                    Lvl {chefLevel.level}
                  </span>
                  <div className="relative w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full bg-porkchop-500"
                      style={{ width: `${chefLevel.progress}%` }}
                    />
                  </div>
                </div>
              </div>
              {isUserMenuOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">
                    {chefLevel.title}
                  </div>
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
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="p-2 rounded-md text-porkchop-500 hover:text-porkchop-900 hover:bg-porkchop-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-porkchop-500"
              onClick={toggleSearch}
            >
              <span className="sr-only">Search</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <MobileMenuButton isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      {isSearchVisible && (
        <div className="sm:hidden border-t border-gray-200 p-2">
          <SearchBar onClose={() => setIsSearchVisible(false)} />
        </div>
      )}

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <div className="px-3 py-2 flex items-center space-x-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${levelColor}`}>
                Level {chefLevel.level}
              </span>
              <span className="text-xs text-gray-500">{chefLevel.title}</span>
            </div>
            <Link
              to="/create-recipe"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive('/create-recipe')
                  ? 'bg-porkchop-50 border-porkchop-500 text-porkchop-700'
                  : 'border-transparent text-porkchop-500 hover:bg-porkchop-50 hover:border-porkchop-300 hover:text-porkchop-700'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Create Recipe
            </Link>
            {isSubscribed && (
              <Link
                to="/subscription"
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive('/subscription')
                    ? 'bg-porkchop-50 border-porkchop-500 text-porkchop-700'
                    : 'border-transparent text-porkchop-500 hover:bg-porkchop-50 hover:border-porkchop-300 hover:text-porkchop-700'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Subscription
              </Link>
            )}
            {!isSubscribed && (
              <Link
                to="/pricing"
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive('/pricing')
                    ? 'bg-porkchop-50 border-porkchop-500 text-porkchop-700'
                    : 'border-transparent text-porkchop-500 hover:bg-porkchop-50 hover:border-porkchop-300 hover:text-porkchop-700'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
            )}
            <Link
              to="/profile"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive('/profile')
                  ? 'bg-porkchop-50 border-porkchop-500 text-porkchop-700'
                  : 'border-transparent text-porkchop-500 hover:bg-porkchop-50 hover:border-porkchop-300 hover:text-porkchop-700'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Your Profile
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-porkchop-500 hover:bg-porkchop-50 hover:border-porkchop-300 hover:text-porkchop-700"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;