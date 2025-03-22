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
    },
    socialLinks: {
      instagram: user?.socialLinks?.instagram || '',
      facebook: user?.socialLinks?.facebook || '',
      twitter: user?.socialLinks?.twitter || '',
      website: user?.socialLinks?.website || '',
      youtube: user?.socialLinks?.youtube || ''
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

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Social Links</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
                      Instagram
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        instagram.com/
                      </span>
                      <input
                        type="text"
                        name="instagram"
                        id="instagram"
                        value={formData.socialLinks.instagram}
                        onChange={(e) => setFormData({
                          ...formData,
                          socialLinks: { ...formData.socialLinks, instagram: e.target.value }
                        })}
                        className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-porkchop-500 focus:ring-porkchop-500 sm:text-sm"
                        placeholder="username"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="facebook" className="block text-sm font-medium text-gray-700">
                      Facebook
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        facebook.com/
                      </span>
                      <input
                        type="text"
                        name="facebook"
                        id="facebook"
                        value={formData.socialLinks.facebook}
                        onChange={(e) => setFormData({
                          ...formData,
                          socialLinks: { ...formData.socialLinks, facebook: e.target.value }
                        })}
                        className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-porkchop-500 focus:ring-porkchop-500 sm:text-sm"
                        placeholder="username"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
                      Twitter
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        twitter.com/
                      </span>
                      <input
                        type="text"
                        name="twitter"
                        id="twitter"
                        value={formData.socialLinks.twitter}
                        onChange={(e) => setFormData({
                          ...formData,
                          socialLinks: { ...formData.socialLinks, twitter: e.target.value }
                        })}
                        className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-porkchop-500 focus:ring-porkchop-500 sm:text-sm"
                        placeholder="username"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      id="website"
                      value={formData.socialLinks.website}
                      onChange={(e) => setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, website: e.target.value }
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-porkchop-500 focus:ring-porkchop-500 sm:text-sm"
                      placeholder="https://your-website.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="youtube" className="block text-sm font-medium text-gray-700">
                      YouTube
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        youtube.com/
                      </span>
                      <input
                        type="text"
                        name="youtube"
                        id="youtube"
                        value={formData.socialLinks.youtube}
                        onChange={(e) => setFormData({
                          ...formData,
                          socialLinks: { ...formData.socialLinks, youtube: e.target.value }
                        })}
                        className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-porkchop-500 focus:ring-porkchop-500 sm:text-sm"
                        placeholder="channel"
                      />
                    </div>
                  </div>
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

              {/* Social Links Display */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Social Links</h3>
                <div className="flex flex-wrap gap-4">
                  {formData.socialLinks.instagram && (
                    <a
                      href={`https://instagram.com/${formData.socialLinks.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-600 hover:text-porkchop-600"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.012-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      <span>Instagram</span>
                    </a>
                  )}
                  {formData.socialLinks.facebook && (
                    <a
                      href={`https://facebook.com/${formData.socialLinks.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-600 hover:text-porkchop-600"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span>Facebook</span>
                    </a>
                  )}
                  {formData.socialLinks.twitter && (
                    <a
                      href={`https://twitter.com/${formData.socialLinks.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-600 hover:text-porkchop-600"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                      <span>Twitter</span>
                    </a>
                  )}
                  {formData.socialLinks.website && (
                    <a
                      href={formData.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-600 hover:text-porkchop-600"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1 17.898c-3.175-.59-4-1.857-4-4.898 0-2.018.638-3.167 1.438-4.898 1.6-2.2 3.562-3.102 5.562-3.102 2 0 3.962.902 5.562 3.102.8 1.731 1.438 2.88 1.438 4.898 0 3.041-.825 4.308-4 4.898v-2.008c2.175-.59 3-1.857 3-4.89 0-1.018-.638-2.167-1.438-3.898-1.6-2.2-3.562-3.102-5.562-3.102-2 0-3.962.902-5.562 3.102-.8 1.731-1.438 2.88-1.438 3.898 0 3.033.825 4.3 3 4.89v2.008z"/>
                      </svg>
                      <span>Website</span>
                    </a>
                  )}
                  {formData.socialLinks.youtube && (
                    <a
                      href={`https://youtube.com/${formData.socialLinks.youtube}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-600 hover:text-porkchop-600"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      <span>YouTube</span>
                    </a>
                  )}
                  {!Object.values(formData.socialLinks).some(link => link) && (
                    <div className="space-y-4">
                      <p className="text-sm text-gray-500">No social links added yet</p>
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center space-x-2 text-gray-400">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.012-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                          <span>Instagram</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                          <span>Facebook</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                          </svg>
                          <span>Twitter</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1 17.898c-3.175-.59-4-1.857-4-4.898 0-2.018.638-3.167 1.438-4.898 1.6-2.2 3.562-3.102 5.562-3.102 2 0 3.962.902 5.562 3.102.8 1.731 1.438 2.88 1.438 4.898 0 3.041-.825 4.308-4 4.898v-2.008c2.175-.59 3-1.857 3-4.89 0-1.018-.638-2.167-1.438-3.898-1.6-2.2-3.562-3.102-5.562-3.102-2 0-3.962.902-5.562 3.102-.8 1.731-1.438 2.88-1.438 3.898 0 3.033.825 4.3 3 4.89v2.008z"/>
                          </svg>
                          <span>Website</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                          <span>YouTube</span>
                        </div>
                      </div>
                    </div>
                  )}
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