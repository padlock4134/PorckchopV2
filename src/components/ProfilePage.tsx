import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { calculateChefLevel, getChefLevelColor } from '../utils/chefLevel';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Passionate home cook and food enthusiast',
    preferences: {
      cuisine: 'All cuisines',
      dietaryRestrictions: 'None',
      cookingLevel: 'Intermediate'
    }
  });

  const chefLevel = calculateChefLevel(user?.recipesCreated || 0);
  const levelColor = getChefLevelColor(chefLevel.level);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement profile update logic
    setIsEditing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white shadow rounded-lg">
        {/* Profile Header */}
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-16 w-16 rounded-full"
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-porkchop-100 flex items-center justify-center">
                  <span className="text-2xl text-porkchop-600">
                    {user?.name?.charAt(0)}
                  </span>
                </div>
              )}
              <div className="ml-4">
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
                  <span className={`text-sm px-2 py-0.5 rounded-full ${levelColor}`}>
                    Level {chefLevel.level}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{user?.email}</p>
                <div className="mt-1">
                  <span className="text-sm font-medium text-gray-700">{chefLevel.title}</span>
                  <div className="mt-1 relative w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full bg-porkchop-500"
                      style={{ width: `${chefLevel.progress}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {Math.floor(chefLevel.progress)}% to level {chefLevel.level + 1}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-porkchop-600 hover:bg-porkchop-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-porkchop-500"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-4 py-5 sm:px-6">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-porkchop-500 focus:ring-porkchop-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-porkchop-500 focus:ring-porkchop-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <textarea
                  name="bio"
                  id="bio"
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-porkchop-500 focus:ring-porkchop-500 sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700">
                    Preferred Cuisine
                  </label>
                  <select
                    id="cuisine"
                    name="cuisine"
                    value={formData.preferences.cuisine}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preferences: { ...formData.preferences, cuisine: e.target.value }
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-porkchop-500 focus:ring-porkchop-500 sm:text-sm"
                  >
                    <option>All cuisines</option>
                    <option>Asian</option>
                    <option>European</option>
                    <option>American</option>
                    <option>Mediterranean</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="dietary" className="block text-sm font-medium text-gray-700">
                    Dietary Restrictions
                  </label>
                  <select
                    id="dietary"
                    name="dietary"
                    value={formData.preferences.dietaryRestrictions}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preferences: { ...formData.preferences, dietaryRestrictions: e.target.value }
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-porkchop-500 focus:ring-porkchop-500 sm:text-sm"
                  >
                    <option>None</option>
                    <option>Vegetarian</option>
                    <option>Vegan</option>
                    <option>Gluten-free</option>
                    <option>Dairy-free</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                    Cooking Level
                  </label>
                  <select
                    id="level"
                    name="level"
                    value={formData.preferences.cookingLevel}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preferences: { ...formData.preferences, cookingLevel: e.target.value }
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-porkchop-500 focus:ring-porkchop-500 sm:text-sm"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Professional</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-porkchop-600 hover:bg-porkchop-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-porkchop-500"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">About</h3>
                <p className="mt-1 text-sm text-gray-500">{formData.bio}</p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Preferred Cuisine</h4>
                  <p className="mt-1 text-sm text-gray-900">{formData.preferences.cuisine}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Dietary Restrictions</h4>
                  <p className="mt-1 text-sm text-gray-900">
                    {formData.preferences.dietaryRestrictions}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Cooking Level</h4>
                  <p className="mt-1 text-sm text-gray-900">{formData.preferences.cookingLevel}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">Stats</h3>
                <dl className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="bg-porkchop-50 px-4 py-5 shadow rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-porkchop-500 truncate">
                      Recipes Created
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                      {user?.recipesCreated || 0}
                    </dd>
                  </div>
                  <div className="bg-porkchop-50 px-4 py-5 shadow rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-porkchop-500 truncate">
                      Recipes Saved
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">48</dd>
                  </div>
                  <div className="bg-porkchop-50 px-4 py-5 shadow rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-porkchop-500 truncate">
                      Comments Made
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">24</dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 