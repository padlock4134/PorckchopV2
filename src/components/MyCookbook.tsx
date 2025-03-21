import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSavedRecipes } from '../context/SavedRecipesContext';
import { motion } from 'framer-motion';
import type { Recipe } from '../utils/recipeData';

const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const { removeFromSaved, collections, addToCollection, removeFromCollection, getRecipeCollections } = useSavedRecipes();
  const [isFlipped, setIsFlipped] = useState(false);

  const handleRemove = () => {
    removeFromSaved(recipe.id);
  };

  const toggleCard = () => {
    setIsFlipped(!isFlipped);
  };

  const recipeCollections = getRecipeCollections(recipe.id);
  const isFavorite = recipeCollections.some(c => c.id === 'favorites');

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromCollection('favorites', recipe.id);
    } else {
      addToCollection('favorites', recipe.id);
    }
  };

  return (
    <div 
      className="relative"
      style={{ perspective: '1000px', minHeight: '400px' }}
    >
      <div 
        className="w-full h-full transition-transform duration-500 transform-gpu preserve-3d"
        style={{ 
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Front of card */}
        <div 
          className="bg-white rounded-lg shadow-md overflow-hidden absolute w-full h-full backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {recipe.imageUrl && (
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-48 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder-recipe.png';
              }}
            />
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900">{recipe.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{recipe.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {recipe.cookingTime} mins • {recipe.difficulty}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={toggleFavorite}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-yellow-500 hover:text-yellow-600 focus:outline-none"
                  title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  <svg 
                    className="h-5 w-5" 
                    fill={isFavorite ? "currentColor" : "none"}
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </button>
                <button
                  onClick={toggleCard}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-porkchop-600 hover:text-porkchop-700"
                >
                  View Recipe
                </button>
                <button
                  onClick={handleRemove}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div 
          className="bg-white rounded-lg shadow-md overflow-hidden absolute w-full h-full backface-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-xl font-semibold text-gray-900">{recipe.title} Instructions</h4>
              <button
                onClick={toggleCard}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="mb-6">
                <h5 className="font-medium text-gray-900 mb-2">Ingredients:</h5>
                <div className="space-y-1">
                  {recipe.ingredients.map((ingredient, index) => (
                    <div 
                      key={index}
                      className="text-sm text-gray-600"
                    >
                      {typeof ingredient === 'string' ? ingredient : ingredient.name}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-medium text-gray-900 mb-2">Instructions:</h5>
                <ol className="space-y-4">
                  {recipe.instructions.map((step, index) => (
                    <li key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-porkchop-100 text-porkchop-600 flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      <p className="text-sm text-gray-600 flex-1">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Servings: {recipe.servings}</span>
                <span>Time: {recipe.cookingTime} mins</span>
                <span className="capitalize">Difficulty: {recipe.difficulty}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyCookbook: React.FC = () => {
  const { user } = useAuth();
  const { savedRecipes, getRecipeCollections } = useSavedRecipes();
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const filteredRecipes = savedRecipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (showOnlyFavorites) {
      const recipeCollections = getRecipeCollections(recipe.id);
      return matchesSearch && recipeCollections.some(c => c.id === 'favorites');
    }
    
    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Cookbook</h1>
        <span className="text-sm text-gray-500">
          {savedRecipes.length} Saved Recipe{savedRecipes.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Search your recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-porkchop-500"
        />
        
        <div className="flex items-center justify-end">
          <button
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showOnlyFavorites 
                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <svg 
              className={`h-5 w-5 mr-2 ${showOnlyFavorites ? 'text-yellow-500' : 'text-gray-400'}`}
              fill={showOnlyFavorites ? "currentColor" : "none"}
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
            {showOnlyFavorites ? 'Show All Recipes' : 'Show Favorites Only'}
          </button>
        </div>
      </div>

      <div className="space-y-12">
        {/* All Saved Recipes */}
        {(!searchTerm || filteredRecipes.length > 0) && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {searchTerm && filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No recipes found matching "{searchTerm}"</p>
          </div>
        )}

        {/* No Favorites */}
        {showOnlyFavorites && filteredRecipes.length === 0 && !searchTerm && (
          <div className="text-center py-12">
            <p className="text-gray-500">No favorite recipes yet</p>
            <p className="text-sm text-gray-400 mt-2">Click the star on any recipe to add it to your favorites</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCookbook; 