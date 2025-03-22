import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { parseCSVRecipes, normalizeIngredient, type Recipe as ImportedRecipe, type Ingredient as ImportedIngredient } from '../utils/recipeData';
import { useChefFreddie } from '../context/ChefFreddieContext';
import { useSavedRecipes } from '../context/SavedRecipesContext';
import { Popover } from '@headlessui/react';
import type { Recipe, Ingredient } from '../utils/recipeData';
import TipOfTheDay from './TipOfTheDay';

interface SelectedItems {
  proteins: string[];
  vegetables: string[];
  herbsAndSpices: string[];
  cookware: string[];
}

interface MatchedRecipe extends Recipe {
  matchPercentage: number;
}

type RecipeState = {
  matchedRecipes: MatchedRecipe[];
  isLoading: boolean;
  error: string | null;
};

type RecipeAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_MATCHED_RECIPES'; payload: MatchedRecipe[] };

const recipeReducer = (state: RecipeState, action: RecipeAction): RecipeState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_MATCHED_RECIPES':
      return { ...state, matchedRecipes: action.payload };
    default:
      return state;
  }
};

const CreateRecipe: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({
    proteins: [],
    vegetables: [],
    herbsAndSpices: [],
    cookware: [],
  });
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({});
  const [state, dispatch] = useReducer(recipeReducer, {
    matchedRecipes: [],
    isLoading: false,
    error: null
  });
  const { 
    showChefFreddie, 
    setCurrentRecipe, 
    setRecommendedRecipe, 
    currentRecipe 
  } = useChefFreddie();
  const { addToSaved, isRecipeSaved, removeFromSaved } = useSavedRecipes();

  const { isLoading, error, matchedRecipes } = state;

  const ingredients = {
    proteins: [
      { id: 'beef', name: 'Beef', category: 'Meat' },
      { id: 'chicken', name: 'Chicken', category: 'Meat' },
      { id: 'pork', name: 'Pork', category: 'Meat' },
      { id: 'duck', name: 'Duck', category: 'Meat' },
      { id: 'fish', name: 'Fish', category: 'Seafood' },
      { id: 'shellfish', name: 'Shellfish', category: 'Seafood' },
      { id: 'lobster', name: 'Lobster', category: 'Seafood' },
      { id: 'squid', name: 'Squid', category: 'Seafood' },
      { id: 'tofu', name: 'Tofu', category: 'Non-Meat' },
      { id: 'beans', name: 'Beans', category: 'Non-Meat' },
      { id: 'cheese', name: 'Cheese', category: 'Non-Meat' },
      { id: 'eggs', name: 'Eggs', category: 'Non-Meat' }
    ],
    vegetables: [
      { id: 'onion', name: 'Onion', category: 'Alliums' },
      { id: 'garlic', name: 'Garlic', category: 'Alliums' },
      { id: 'bell-peppers', name: 'Bell Peppers', category: 'Alliums' },
      { id: 'carrots', name: 'Carrots', category: 'Root Vegetables' },
      { id: 'potatoes', name: 'Potatoes', category: 'Root Vegetables' },
      { id: 'tomatoes', name: 'Tomatoes', category: 'Root Vegetables' },
      { id: 'broccoli', name: 'Broccoli', category: 'Leafy Greens' },
      { id: 'spinach', name: 'Spinach', category: 'Leafy Greens' }
    ],
    herbsAndSpices: [
      { id: 'salt', name: 'Salt', category: 'Basic' },
      { id: 'black-pepper', name: 'Black Pepper', category: 'Basic' },
      { id: 'garlic-powder', name: 'Garlic Powder', category: 'Basic' },
      { id: 'onion-powder', name: 'Onion Powder', category: 'Basic' },
      { id: 'basil', name: 'Basil', category: 'Herbs' },
      { id: 'oregano', name: 'Oregano', category: 'Herbs' },
      { id: 'thyme', name: 'Thyme', category: 'Herbs' },
      { id: 'parsley', name: 'Parsley', category: 'Herbs' }
    ],
    cookware: [
      { id: 'skillet', name: 'Skillet/Frying Pan', category: 'Pots/Pans' },
      { id: 'pot', name: 'Pot', category: 'Pots/Pans' },
      { id: 'knife', name: 'Chef\'s Knife', category: 'Utensils/Knives' },
      { id: 'spatula', name: 'Spatula', category: 'Utensils/Knives' },
      { id: 'tongs', name: 'Tongs', category: 'Utensils/Knives' },
      { id: 'cutting-board', name: 'Cutting Board', category: 'Other' },
      { id: 'mixing-bowls', name: 'Mixing Bowls', category: 'Other' },
      { id: 'measuring-cups', name: 'Measuring Cups', category: 'Other' }
    ]
  };

  const steps = [
    {
      title: 'Select Proteins',
      description: 'What proteins do you have?',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ),
    },
    {
      title: 'Select Vegetables',
      description: 'What vegetables do you have?',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
    },
    {
      title: 'Herbs & Spices',
      description: 'What seasonings do you have?',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
    {
      title: 'Cookware',
      description: 'What cooking equipment do you have?',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
    },
  ];

  const toggleItem = (category: keyof SelectedItems, itemId: string) => {
    setSelectedItems(prev => {
      const items = prev[category];
      const newItems = items.includes(itemId)
        ? items.filter(id => id !== itemId)
        : [...items, itemId];
      return { ...prev, [category]: newItems };
    });
  };

  const getItemsByCategory = (items: typeof ingredients.proteins) => {
    const categories: { [key: string]: typeof items } = {};
    items.forEach(item => {
      if (!categories[item.category]) {
        categories[item.category] = [];
      }
      categories[item.category].push(item);
    });
    return categories;
  };

  const renderItems = (category: keyof typeof ingredients) => {
    const items = ingredients[category];
    const categorizedItems = getItemsByCategory(items);
    const categoryEntries = Object.entries(categorizedItems);
    
    // For cookware, vegetables, and proteins, always show 3 columns
    if (category === 'cookware' || category === 'vegetables' || category === 'proteins') {
      return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-porkchop-50 px-4 py-2 border-b border-porkchop-100">
            <h3 className="text-lg font-medium text-porkchop-900">{steps[currentStep].title}</h3>
                </div>
                <div className="p-4">
            <div className="grid grid-cols-3 gap-6">
              {categoryEntries.map(([categoryName, categoryItems]) => (
                <div key={categoryName} className="bg-gray-50 rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-white px-4 py-2 border-b border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700">{categoryName}</h4>
                  </div>
                  <div className="p-4">
                    <div className="space-y-2">
                      {categoryItems.slice(0, 5).map(item => (
                        <button
                          key={item.id}
                          onClick={() => toggleItem(category, item.id)}
                          className={`
                            ${selectedItems[category].includes(item.id)
                              ? 'bg-porkchop-100 border-porkchop-500 text-porkchop-700'
                              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                            } 
                            w-full px-4 py-3 border rounded-md text-left transition-all duration-200 flex items-center
                            hover:shadow-sm transform hover:-translate-y-0.5
                          `}
                        >
                          <div className="flex-1">
                            <span className="text-sm font-medium block">{item.name}</span>
                          </div>
                          <div className={`
                            w-4 h-4 rounded-full border-2 ml-2 flex items-center justify-center
                            ${selectedItems[category].includes(item.id)
                              ? 'border-porkchop-500 bg-porkchop-500'
                              : 'border-gray-300 bg-white'
                            }
                          `}>
                            {selectedItems[category].includes(item.id) && (
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // For other categories, keep the existing layout logic
    const getRowLayout = () => {
      const totalCategories = categoryEntries.length;
      if (totalCategories <= 2) {
        return { firstRow: categoryEntries, secondRow: [] };
      } else if (totalCategories <= 4) {
        return {
          firstRow: categoryEntries.slice(0, 2),
          secondRow: categoryEntries.slice(2)
        };
      } else {
        return {
          firstRow: categoryEntries.slice(0, 2),
          secondRow: categoryEntries.slice(2, 5)
        };
      }
    };

    const { firstRow, secondRow } = getRowLayout();

      return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-porkchop-50 px-4 py-2 border-b border-porkchop-100">
          <h3 className="text-lg font-medium text-porkchop-900">{steps[currentStep].title}</h3>
                </div>
                <div className="p-4">
      <div className="space-y-6">
            {/* First row - always 2 columns */}
            <div className="grid grid-cols-2 gap-6">
          {firstRow.map(([categoryName, categoryItems]) => (
                <div key={categoryName} className="bg-gray-50 rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-white px-4 py-2 border-b border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700">{categoryName}</h4>
              </div>
              <div className="p-4">
                    <div className="space-y-2">
                      {categoryItems.slice(0, 5).map(item => (
                    <button
                      key={item.id}
                      onClick={() => toggleItem(category, item.id)}
                      className={`
                        ${selectedItems[category].includes(item.id)
                          ? 'bg-porkchop-100 border-porkchop-500 text-porkchop-700'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        } 
                            w-full px-4 py-3 border rounded-md text-left transition-all duration-200 flex items-center
                        hover:shadow-sm transform hover:-translate-y-0.5
                      `}
                    >
                      <div className="flex-1">
                        <span className="text-sm font-medium block">{item.name}</span>
                      </div>
                      <div className={`
                        w-4 h-4 rounded-full border-2 ml-2 flex items-center justify-center
                        ${selectedItems[category].includes(item.id)
                          ? 'border-porkchop-500 bg-porkchop-500'
                          : 'border-gray-300 bg-white'
                        }
                      `}>
                        {selectedItems[category].includes(item.id) && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

            {/* Second row - 2 or 3 columns depending on content */}
        {secondRow.length > 0 && (
              <div className={`grid gap-6 ${secondRow.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {secondRow.map(([categoryName, categoryItems]) => (
                  <div key={categoryName} className="bg-gray-50 rounded-lg shadow-sm overflow-hidden">
                    <div className="bg-white px-4 py-2 border-b border-gray-200">
                      <h4 className="text-sm font-medium text-gray-700">{categoryName}</h4>
                </div>
                <div className="p-4">
                      <div className="space-y-2">
                        {categoryItems.slice(0, 5).map(item => (
                      <button
                        key={item.id}
                        onClick={() => toggleItem(category, item.id)}
                        className={`
                          ${selectedItems[category].includes(item.id)
                            ? 'bg-porkchop-100 border-porkchop-500 text-porkchop-700'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                          } 
                              w-full px-4 py-3 border rounded-md text-left transition-all duration-200 flex items-center
                          hover:shadow-sm transform hover:-translate-y-0.5
                        `}
                      >
                        <div className="flex-1">
                          <span className="text-sm font-medium block">{item.name}</span>
                        </div>
                        <div className={`
                          w-4 h-4 rounded-full border-2 ml-2 flex items-center justify-center
                          ${selectedItems[category].includes(item.id)
                            ? 'border-porkchop-500 bg-porkchop-500'
                            : 'border-gray-300 bg-white'
                          }
                        `}>
                          {selectedItems[category].includes(item.id) && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        dispatch({ type: 'SET_ERROR', payload: null });
      const loadedRecipes = await parseCSVRecipes();
      setRecipes(loadedRecipes);
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load recipes. Please try again.' });
        console.error('Error loading recipes:', err);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadRecipes();
  }, []);

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        dispatch({ type: 'SET_ERROR', payload: null });

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const matches = recipes
          .map(recipe => {
            const proteinMatches = recipe.proteinTags.filter(tag => 
              selectedItems.proteins.includes(tag)
            ).length;
            const veggieMatches = recipe.veggieTags.filter(tag => 
              selectedItems.vegetables.includes(tag)
            ).length;
            const herbMatches = recipe.herbTags.filter(tag => 
              selectedItems.herbsAndSpices.includes(tag)
            ).length;
            const cookwareMatches = recipe.requiredCookware.filter(tag => 
              selectedItems.cookware.includes(tag)
            ).length;

            const totalMatches = proteinMatches + veggieMatches + herbMatches + cookwareMatches;
            const totalTags = recipe.proteinTags.length + recipe.veggieTags.length + 
                             recipe.herbTags.length + recipe.requiredCookware.length;

            return {
              ...recipe,
              matchPercentage: (totalMatches / totalTags) * 100
            };
          })
          .filter(recipe => recipe.matchPercentage > 0)
          .sort((a, b) => b.matchPercentage - a.matchPercentage);

        dispatch({ type: 'SET_MATCHED_RECIPES', payload: matches });
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to find matching recipes. Please try again.' });
        console.error('Error finding matching recipes:', err);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    }
  };

  const canProceed = () => {
    const currentCategory = Object.keys(selectedItems)[currentStep] as keyof SelectedItems;
    return selectedItems[currentCategory].length > 0;
  };

  const toggleCard = (recipeId: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [recipeId]: !prev[recipeId]
    }));
  };

  const getIngredientKey = (ingredient: string | Ingredient, index: number): string => {
    return `${index}-${typeof ingredient === 'string' ? ingredient : ingredient.name}`;
  };

  const renderIngredientName = (ingredient: string | Ingredient): string => {
    return typeof ingredient === 'string' ? ingredient : ingredient.name;
  };

  const renderIngredient = (ingredient: string | Ingredient) => {
    if (typeof ingredient === 'string') {
      return ingredient;
    }
    return `${ingredient.amount} ${ingredient.unit} ${ingredient.name}${ingredient.preparation ? `, ${ingredient.preparation}` : ''}`;
  };

  const isIngredientMissing = (ingredient: string | Ingredient) => {
    if (typeof ingredient === 'string') {
      // Check if the ingredient is in any of the selected categories
      return !(
        selectedItems.proteins.includes(ingredient) ||
        selectedItems.vegetables.includes(ingredient) ||
        selectedItems.herbsAndSpices.includes(ingredient)
      );
    }
    // For Ingredient objects, check the name
    return !(
      selectedItems.proteins.includes(ingredient.name) ||
      selectedItems.vegetables.includes(ingredient.name) ||
      selectedItems.herbsAndSpices.includes(ingredient.name)
    );
  };

  const updateMatchedRecipes = useCallback((recipes: MatchedRecipe[]) => {
    dispatch({ type: 'SET_MATCHED_RECIPES', payload: recipes });
  }, []);

  const findMatchingRecipes = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const matches = recipes
        .map(recipe => {
          const proteinMatches = recipe.proteinTags.filter(tag => 
            selectedItems.proteins.includes(tag)
          ).length;
          const veggieMatches = recipe.veggieTags.filter(tag => 
            selectedItems.vegetables.includes(tag)
          ).length;
          const herbMatches = recipe.herbTags.filter(tag => 
            selectedItems.herbsAndSpices.includes(tag)
          ).length;
          const cookwareMatches = recipe.requiredCookware.filter(tag => 
            selectedItems.cookware.includes(tag)
          ).length;

          const totalMatches = proteinMatches + veggieMatches + herbMatches + cookwareMatches;
          const totalTags = recipe.proteinTags.length + recipe.veggieTags.length + 
                           recipe.herbTags.length + recipe.requiredCookware.length;

      return {
            ...recipe,
            matchPercentage: (totalMatches / totalTags) * 100
          };
        })
        .filter(recipe => recipe.matchPercentage > 0)
      .sort((a, b) => b.matchPercentage - a.matchPercentage);

      dispatch({ type: 'SET_MATCHED_RECIPES', payload: matches });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to find matching recipes. Please try again.' });
      console.error('Error finding matching recipes:', err);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const renderMatchedRecipes = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Matching Recipes</h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {matchedRecipes.map((matchedRecipe) => (
          <div 
            key={matchedRecipe.id} 
            className={`relative transition-all duration-300 ${
              currentRecipe?.id === matchedRecipe.id ? 'transform -translate-y-4 shadow-xl ring-2 ring-porkchop-500' : ''
            }`}
            style={{ perspective: '1000px', minHeight: '600px' }}
          >
            <div 
              className="w-full h-full transition-transform duration-500 transform-gpu preserve-3d"
              style={{ 
                transform: flippedCards[matchedRecipe.id] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Front of card */}
              <div 
                className="bg-white overflow-hidden shadow rounded-lg absolute w-full h-full backface-hidden border-2 border-porkchop-200"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={`/data/images/recipe stock photos/${matchedRecipe.title}.png`}
                    alt={matchedRecipe.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-recipe.png';
                    }}
                  />
                  <div className="absolute top-0 right-0 m-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-porkchop-100 text-porkchop-800 shadow-sm">
                      {Math.round(matchedRecipe.matchPercentage)}% Match
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-900">{matchedRecipe.title}</h4>
                      <p className="mt-1 text-sm text-gray-500">{matchedRecipe.description}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      {matchedRecipe.cookingTime} mins • {matchedRecipe.servings} servings • {matchedRecipe.difficulty}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveRecipe(matchedRecipe)}
                        className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                          isRecipeSaved(matchedRecipe.id)
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                            : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                        }`}
                      >
                        {isRecipeSaved(matchedRecipe.id) ? 'Unarchive' : 'Archive'}
                      </button>
                      <button
                        onClick={() => toggleCard(matchedRecipe.id)}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        View Instructions
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h5 className="font-medium text-gray-900 mb-2">Required Ingredients:</h5>
                    <div className="flex flex-wrap gap-2">
                      {matchedRecipe.ingredients.map((ingredient, index) => (
                        <span 
                          key={getIngredientKey(ingredient, index)}
                          className={`px-2 py-1 rounded-full text-sm ${
                            isIngredientMissing(ingredient)
                              ? 'bg-red-100 text-red-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {renderIngredient(ingredient)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Back of card */}
              <div 
                className="bg-white overflow-hidden shadow rounded-lg absolute w-full h-full backface-hidden border-2 border-porkchop-200"
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <div className="p-6 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-semibold text-gray-900">{matchedRecipe.title} Instructions</h4>
                    <button
                      onClick={() => toggleCard(matchedRecipe.id)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto">
                    <ol className="space-y-4">
                      {matchedRecipe.steps?.map((step, index) => (
                        <li key={index} className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-porkchop-100 text-porkchop-600 flex items-center justify-center font-semibold">
                            {index + 1}
                          </div>
                          <p className="text-gray-600 flex-1">{step}</p>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200">
                      <button
                      onClick={() => handleRecipeSelect(matchedRecipe)}
                      className={`w-full px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                        currentRecipe?.id === matchedRecipe.id
                            ? 'bg-porkchop-600 text-white hover:bg-porkchop-700'
                            : 'bg-porkchop-100 text-porkchop-700 hover:bg-porkchop-200'
                        }`}
                      >
                      {currentRecipe?.id === matchedRecipe.id ? 'Selected' : 'Select Recipe'}
                      </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const handleRecipeSelect = (recipe: Recipe) => {
    if (currentRecipe?.id === recipe.id) {
      setCurrentRecipe(null);
      setRecommendedRecipe(null);
    } else {
      setCurrentRecipe(recipe);
      setRecommendedRecipe(recipe);
      showChefFreddie();
    }
  };

  const handleSaveRecipe = async (recipe: Recipe) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
    if (isRecipeSaved(recipe.id)) {
        await removeFromSaved(recipe.id);
    } else {
        await addToSaved(recipe);
      }
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to save recipe. Please try again.' });
      console.error('Error saving recipe:', err);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const clearAllSelections = () => {
    setSelectedItems({
      proteins: [],
      vegetables: [],
      herbsAndSpices: [],
      cookware: [],
    });
    dispatch({ type: 'SET_MATCHED_RECIPES', payload: [] });
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  const renderIngredientSelection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-semibold text-gray-900">Select Your Ingredients</h2>
          <Popover className="relative">
            <Popover.Button className="text-gray-400 hover:text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Popover.Button>
          </Popover>
        </div>
        <button
          onClick={clearAllSelections}
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Proteins */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-2 mb-3">
            <h3 className="text-lg font-medium text-gray-900">Proteins</h3>
            <Popover className="relative">
              <Popover.Button className="text-gray-400 hover:text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-48 p-2 mt-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg">
                Select the proteins you have available. This helps us find recipes that match your ingredients.
              </Popover.Panel>
            </Popover>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {ingredients.proteins.map((protein) => (
              <label
                key={protein.id}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedItems.proteins.includes(protein.id)}
                  onChange={() => toggleItem('proteins', protein.id)}
                  className="h-4 w-4 text-porkchop-600 focus:ring-porkchop-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">{protein.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Vegetables */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-2 mb-3">
            <h3 className="text-lg font-medium text-gray-900">Vegetables</h3>
            <Popover className="relative">
              <Popover.Button className="text-gray-400 hover:text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-48 p-2 mt-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg">
                Choose the vegetables you have. Fresh, frozen, or canned all work!
              </Popover.Panel>
            </Popover>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {ingredients.vegetables.map((vegetable) => (
              <label
                key={vegetable.id}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedItems.vegetables.includes(vegetable.id)}
                  onChange={() => toggleItem('vegetables', vegetable.id)}
                  className="h-4 w-4 text-porkchop-600 focus:ring-porkchop-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">{vegetable.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Herbs & Spices */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-2 mb-3">
            <h3 className="text-lg font-medium text-gray-900">Herbs & Spices</h3>
            <Popover className="relative">
              <Popover.Button className="text-gray-400 hover:text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-48 p-2 mt-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg">
                Select your available herbs and spices. Don't worry if you're missing some - we'll find recipes that work with what you have.
              </Popover.Panel>
            </Popover>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {ingredients.herbsAndSpices.map((herb) => (
              <label
                key={herb.id}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedItems.herbsAndSpices.includes(herb.id)}
                  onChange={() => toggleItem('herbsAndSpices', herb.id)}
                  className="h-4 w-4 text-porkchop-600 focus:ring-porkchop-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">{herb.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Cookware */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-2 mb-3">
            <h3 className="text-lg font-medium text-gray-900">Cookware</h3>
            <Popover className="relative">
              <Popover.Button className="text-gray-400 hover:text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-48 p-2 mt-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg">
                Tell us what cooking equipment you have available. This helps us find recipes you can actually make.
              </Popover.Panel>
            </Popover>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {ingredients.cookware.map((item) => (
              <label
                key={item.id}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedItems.cookware.includes(item.id)}
                  onChange={() => toggleItem('cookware', item.id)}
                  className="h-4 w-4 text-porkchop-600 focus:ring-porkchop-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">{item.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Popover className="relative">
          <Popover.Button>
            <button
              onClick={findMatchingRecipes}
              disabled={isLoading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-porkchop-600 hover:bg-porkchop-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-porkchop-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Finding Recipes...
                </>
              ) : (
                'Find Matching Recipes'
              )}
            </button>
          </Popover.Button>
          <Popover.Panel className="absolute z-10 w-64 p-2 mt-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg">
            Click here to find recipes that match your selected ingredients. We'll show you the best matches first!
          </Popover.Panel>
        </Popover>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="space-y-8">
        {/* Progress bar */}
        <nav aria-label="Progress">
          <ol className="flex items-center">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className={`${
                  index !== steps.length - 1 ? 'flex-1' : ''
                } relative`}
              >
                <div className="flex items-center">
                  <button
                    onClick={() => setCurrentStep(index)}
                    className={`${
                      currentStep >= index
                        ? 'bg-porkchop-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    } h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-200`}
                    disabled={index > currentStep}
                  >
                    {step.icon}
                  </button>
                  <div
                    className={`hidden sm:block w-full ${
                      index === steps.length - 1 ? 'hidden' : ''
                    }`}
                  >
                    <div
                      className={`h-0.5 ${
                        currentStep > index ? 'bg-porkchop-600' : 'bg-gray-200'
                      }`}
                    />
                  </div>
                </div>
                <div className="hidden sm:block absolute -bottom-8 w-32 text-center left-1/2 -translate-x-1/2">
                  <span className="text-sm font-medium">{step.title}</span>
                </div>
              </li>
            ))}
          </ol>
        </nav>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
            <button
              onClick={() => dispatch({ type: 'SET_ERROR', payload: null })}
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
            >
              <span className="sr-only">Dismiss</span>
              <svg className="fill-current h-4 w-4" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1 1 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
              </svg>
            </button>
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-porkchop-600"></div>
            <span className="ml-3 text-gray-600">Finding matching recipes...</span>
          </div>
        )}

        {/* Card content */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {matchedRecipes.length > 0 ? 'Suggested Recipes' : steps[currentStep].title}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {matchedRecipes.length > 0 
                ? 'Based on your available ingredients and cookware'
                : steps[currentStep].description}
            </p>
          </div>

          {matchedRecipes.length > 0 ? (
            renderMatchedRecipes()
          ) : (
            <div className="space-y-6">
              {currentStep === 0 && renderItems('proteins')}
              {currentStep === 1 && renderItems('vegetables')}
              {currentStep === 2 && renderItems('herbsAndSpices')}
              {currentStep === 3 && renderItems('cookware')}
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={() => {
                if (matchedRecipes.length > 0) {
                  dispatch({ type: 'SET_MATCHED_RECIPES', payload: [] });
                } else {
                  setCurrentStep(currentStep - 1);
                }
              }}
              disabled={currentStep === 0 && matchedRecipes.length === 0}
              className={`${
                currentStep === 0 && matchedRecipes.length === 0 ? 'invisible' : ''
              } inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-porkchop-500`}
            >
              {matchedRecipes.length > 0 ? 'Select Different Items' : 'Previous'}
            </button>
            {matchedRecipes.length === 0 && (
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceed()}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                  canProceed()
                    ? 'bg-porkchop-600 hover:bg-porkchop-700'
                    : 'bg-gray-300 cursor-not-allowed'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-porkchop-500`}
              >
                {currentStep === steps.length - 1 ? 'Find Recipes' : 'Next'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipe; 