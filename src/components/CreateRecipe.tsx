import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { parseCSVRecipes, normalizeIngredient, type Recipe, type Ingredient } from '../utils/recipeData';
import { useChefFreddie } from '../context/ChefFreddieContext';
import { useSavedRecipes } from '../context/SavedRecipesContext';

interface SelectedItems {
  proteins: string[];
  vegetables: string[];
  herbsAndSpices: string[];
  cookware: string[];
}

interface MatchedRecipe {
  recipe: Recipe;
  matchPercentage: number;
  missingIngredients: (string | Ingredient)[];
  missingCookware: string[];
}

const CreateRecipe: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({
    proteins: [],
    vegetables: [],
    herbsAndSpices: [],
    cookware: [],
  });
  const [matchedRecipes, setMatchedRecipes] = useState<MatchedRecipe[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({});
  const { 
    showChefFreddie, 
    setCurrentRecipe, 
    setRecommendedRecipe, 
    currentRecipe 
  } = useChefFreddie();
  const { addToSaved, isRecipeSaved, removeFromSaved } = useSavedRecipes();

  const ingredients = {
    proteins: [
      { id: 'pork-chop', name: 'Pork Chop', category: 'Pork' },
      { id: 'pork-belly', name: 'Pork Belly', category: 'Pork' },
      { id: 'bacon', name: 'Bacon', category: 'Pork' },
      { id: 'ground-pork', name: 'Ground Pork', category: 'Pork' },
      { id: 'pork-tenderloin', name: 'Pork Tenderloin', category: 'Pork' },
      { id: 'ham', name: 'Ham', category: 'Pork' },
      { id: 'chicken-breast', name: 'Chicken Breast', category: 'Chicken' },
      { id: 'chicken-thigh', name: 'Chicken Thigh', category: 'Chicken' },
      { id: 'chicken-wings', name: 'Chicken Wings', category: 'Chicken' },
      { id: 'whole-chicken', name: 'Whole Chicken', category: 'Chicken' },
      { id: 'ground-chicken', name: 'Ground Chicken', category: 'Chicken' },
      { id: 'beef-steak', name: 'Beef Steak', category: 'Beef' },
      { id: 'ground-beef', name: 'Ground Beef', category: 'Beef' },
      { id: 'beef-ribs', name: 'Beef Ribs', category: 'Beef' },
      { id: 'beef-brisket', name: 'Beef Brisket', category: 'Beef' },
      { id: 'beef-roast', name: 'Beef Roast', category: 'Beef' },
      { id: 'salmon', name: 'Salmon', category: 'Fish' },
      { id: 'tuna', name: 'Tuna', category: 'Fish' },
      { id: 'cod', name: 'Cod', category: 'Fish' },
      { id: 'tilapia', name: 'Tilapia', category: 'Fish' },
      { id: 'shrimp', name: 'Shrimp', category: 'Seafood' },
      { id: 'crab', name: 'Crab', category: 'Seafood' },
      { id: 'lobster', name: 'Lobster', category: 'Seafood' },
      { id: 'scallops', name: 'Scallops', category: 'Seafood' },
      { id: 'tofu', name: 'Tofu', category: 'Plant-Based' },
      { id: 'tempeh', name: 'Tempeh', category: 'Plant-Based' },
      { id: 'seitan', name: 'Seitan', category: 'Plant-Based' },
    ],
    vegetables: [
      { id: 'onion', name: 'Onion', category: 'Aromatics' },
      { id: 'garlic', name: 'Garlic', category: 'Aromatics' },
      { id: 'shallots', name: 'Shallots', category: 'Aromatics' },
      { id: 'ginger', name: 'Ginger', category: 'Aromatics' },
      { id: 'green-onion', name: 'Green Onion', category: 'Aromatics' },
      { id: 'leeks', name: 'Leeks', category: 'Aromatics' },
      { id: 'carrot', name: 'Carrot', category: 'Root Vegetables' },
      { id: 'potato', name: 'Potato', category: 'Root Vegetables' },
      { id: 'sweet-potato', name: 'Sweet Potato', category: 'Root Vegetables' },
      { id: 'parsnip', name: 'Parsnip', category: 'Root Vegetables' },
      { id: 'turnip', name: 'Turnip', category: 'Root Vegetables' },
      { id: 'radish', name: 'Radish', category: 'Root Vegetables' },
      { id: 'tomato', name: 'Tomato', category: 'Fruits/Vegetables' },
      { id: 'cucumber', name: 'Cucumber', category: 'Fruits/Vegetables' },
      { id: 'zucchini', name: 'Zucchini', category: 'Fruits/Vegetables' },
      { id: 'eggplant', name: 'Eggplant', category: 'Fruits/Vegetables' },
      { id: 'bell-pepper', name: 'Bell Pepper', category: 'Vegetables' },
      { id: 'celery', name: 'Celery', category: 'Vegetables' },
      { id: 'corn', name: 'Corn', category: 'Vegetables' },
      { id: 'green-beans', name: 'Green Beans', category: 'Vegetables' },
      { id: 'peas', name: 'Peas', category: 'Vegetables' },
      { id: 'asparagus', name: 'Asparagus', category: 'Vegetables' },
      { id: 'spinach', name: 'Spinach', category: 'Leafy Greens' },
      { id: 'kale', name: 'Kale', category: 'Leafy Greens' },
      { id: 'lettuce', name: 'Lettuce', category: 'Leafy Greens' },
      { id: 'swiss-chard', name: 'Swiss Chard', category: 'Leafy Greens' },
      { id: 'arugula', name: 'Arugula', category: 'Leafy Greens' },
      { id: 'broccoli', name: 'Broccoli', category: 'Cruciferous' },
      { id: 'cauliflower', name: 'Cauliflower', category: 'Cruciferous' },
      { id: 'brussels-sprouts', name: 'Brussels Sprouts', category: 'Cruciferous' },
      { id: 'cabbage', name: 'Cabbage', category: 'Cruciferous' },
      { id: 'mushroom', name: 'Mushroom', category: 'Fungi' },
      { id: 'shiitake', name: 'Shiitake', category: 'Fungi' },
      { id: 'portobello', name: 'Portobello', category: 'Fungi' },
    ],
    herbsAndSpices: [
      { id: 'black-pepper', name: 'Black Pepper', category: 'Spices' },
      { id: 'white-pepper', name: 'White Pepper', category: 'Spices' },
      { id: 'cayenne', name: 'Cayenne', category: 'Spices' },
      { id: 'paprika', name: 'Paprika', category: 'Spices' },
      { id: 'cumin', name: 'Cumin', category: 'Spices' },
      { id: 'coriander', name: 'Coriander', category: 'Spices' },
      { id: 'turmeric', name: 'Turmeric', category: 'Spices' },
      { id: 'cinnamon', name: 'Cinnamon', category: 'Spices' },
      { id: 'nutmeg', name: 'Nutmeg', category: 'Spices' },
      { id: 'cardamom', name: 'Cardamom', category: 'Spices' },
      { id: 'salt', name: 'Salt', category: 'Seasonings' },
      { id: 'garlic-powder', name: 'Garlic Powder', category: 'Seasonings' },
      { id: 'onion-powder', name: 'Onion Powder', category: 'Seasonings' },
      { id: 'msg', name: 'MSG', category: 'Seasonings' },
      { id: 'basil', name: 'Basil', category: 'Herbs' },
      { id: 'thyme', name: 'Thyme', category: 'Herbs' },
      { id: 'rosemary', name: 'Rosemary', category: 'Herbs' },
      { id: 'oregano', name: 'Oregano', category: 'Herbs' },
      { id: 'sage', name: 'Sage', category: 'Herbs' },
      { id: 'mint', name: 'Mint', category: 'Herbs' },
      { id: 'parsley', name: 'Parsley', category: 'Herbs' },
      { id: 'cilantro', name: 'Cilantro', category: 'Herbs' },
      { id: 'dill', name: 'Dill', category: 'Herbs' },
      { id: 'bay-leaves', name: 'Bay Leaves', category: 'Herbs' },
      { id: 'soy-sauce', name: 'Soy Sauce', category: 'Sauces' },
      { id: 'fish-sauce', name: 'Fish Sauce', category: 'Sauces' },
      { id: 'oyster-sauce', name: 'Oyster Sauce', category: 'Sauces' },
      { id: 'worcestershire', name: 'Worcestershire', category: 'Sauces' },
      { id: 'hot-sauce', name: 'Hot Sauce', category: 'Sauces' },
      { id: 'vinegar', name: 'Vinegar', category: 'Sauces' },
    ],
    cookware: [
      { id: 'skillet', name: 'Skillet/Frying Pan', category: 'Pans' },
      { id: 'non-stick-pan', name: 'Non-stick Pan', category: 'Pans' },
      { id: 'wok', name: 'Wok', category: 'Pans' },
      { id: 'grill-pan', name: 'Grill Pan', category: 'Pans' },
      { id: 'pot', name: 'Pot', category: 'Pots' },
      { id: 'stock-pot', name: 'Stock Pot', category: 'Pots' },
      { id: 'sauce-pan', name: 'Sauce Pan', category: 'Pots' },
      { id: 'dutch-oven', name: 'Dutch Oven', category: 'Pots' },
      { id: 'pressure-cooker', name: 'Pressure Cooker', category: 'Appliances' },
      { id: 'slow-cooker', name: 'Slow Cooker', category: 'Appliances' },
      { id: 'rice-cooker', name: 'Rice Cooker', category: 'Appliances' },
      { id: 'food-processor', name: 'Food Processor', category: 'Appliances' },
      { id: 'blender', name: 'Blender', category: 'Appliances' },
      { id: 'baking-sheet', name: 'Baking Sheet', category: 'Bakeware' },
      { id: 'roasting-pan', name: 'Roasting Pan', category: 'Bakeware' },
      { id: 'casserole-dish', name: 'Casserole Dish', category: 'Bakeware' },
      { id: 'cutting-board', name: 'Cutting Board', category: 'Prep Tools' },
      { id: 'mixing-bowls', name: 'Mixing Bowls', category: 'Prep Tools' },
      { id: 'colander', name: 'Colander', category: 'Prep Tools' },
      { id: 'grater', name: 'Grater', category: 'Prep Tools' },
      { id: 'knife', name: 'Chef\'s Knife', category: 'Knives' },
      { id: 'paring-knife', name: 'Paring Knife', category: 'Knives' },
      { id: 'bread-knife', name: 'Bread Knife', category: 'Knives' },
      { id: 'tongs', name: 'Tongs', category: 'Utensils' },
      { id: 'spatula', name: 'Spatula', category: 'Utensils' },
      { id: 'wooden-spoon', name: 'Wooden Spoon', category: 'Utensils' },
      { id: 'whisk', name: 'Whisk', category: 'Utensils' },
      { id: 'ladle', name: 'Ladle', category: 'Utensils' },
      { id: 'measuring-cups', name: 'Measuring Cups', category: 'Measuring Tools' },
      { id: 'measuring-spoons', name: 'Measuring Spoons', category: 'Measuring Tools' },
      { id: 'kitchen-scale', name: 'Kitchen Scale', category: 'Measuring Tools' },
    ],
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
    
    // Special handling for vegetables category
    if (category === 'vegetables') {
      // Split categories into 3-4 layout
      const firstRow = categoryEntries.slice(0, 3);
      const secondRow = categoryEntries.slice(3, 7); // Take up to 4 items for second row

      return (
        <div className="space-y-6">
          {/* First row - 3 items */}
          <div className="grid grid-cols-3 gap-6">
            {firstRow.map(([categoryName, categoryItems]) => (
              <div key={categoryName} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-porkchop-50 px-4 py-2 border-b border-porkchop-100">
                  <h3 className="text-lg font-medium text-porkchop-900">{categoryName}</h3>
                </div>
                <div className="p-4">
                  <div className="flex flex-col space-y-2">
                    {categoryItems.map(item => (
                      <button
                        key={item.id}
                        onClick={() => toggleItem(category, item.id)}
                        className={`
                          ${selectedItems[category].includes(item.id)
                            ? 'bg-porkchop-100 border-porkchop-500 text-porkchop-700'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                          } 
                          px-4 py-3 border rounded-md text-left transition-all duration-200 flex items-center
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

          {/* Second row - 4 items */}
          {secondRow.length > 0 && (
            <div className="grid grid-cols-4 gap-6">
              {secondRow.map(([categoryName, categoryItems]) => (
                <div key={categoryName} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-porkchop-50 px-4 py-2 border-b border-porkchop-100">
                    <h3 className="text-lg font-medium text-porkchop-900">{categoryName}</h3>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-col space-y-2">
                      {categoryItems.map(item => (
                        <button
                          key={item.id}
                          onClick={() => toggleItem(category, item.id)}
                          className={`
                            ${selectedItems[category].includes(item.id)
                              ? 'bg-porkchop-100 border-porkchop-500 text-porkchop-700'
                              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                            } 
                            px-4 py-3 border rounded-md text-left transition-all duration-200 flex items-center
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
      );
    }

    // Special handling for herbs and spices category
    if (category === 'herbsAndSpices') {
      // Get categories in specific order
      const herbsAndSpicesCategories = categoryEntries.filter(([name]) => 
        name === 'Herbs' || name === 'Spices'
      );
      const seasoningsAndSauces = categoryEntries.filter(([name]) => 
        name === 'Seasonings' || name === 'Sauces'
      );

      return (
        <div className="space-y-6">
          {/* First row - Herbs and Spices */}
          <div className="grid grid-cols-2 gap-6">
            {herbsAndSpicesCategories.map(([categoryName, categoryItems]) => (
              <div key={categoryName} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-porkchop-50 px-4 py-2 border-b border-porkchop-100">
                  <h3 className="text-lg font-medium text-porkchop-900">{categoryName}</h3>
                </div>
                <div className="p-4">
                  <div className="flex flex-col space-y-2">
                    {categoryItems.map(item => (
                      <button
                        key={item.id}
                        onClick={() => toggleItem(category, item.id)}
                        className={`
                          ${selectedItems[category].includes(item.id)
                            ? 'bg-porkchop-100 border-porkchop-500 text-porkchop-700'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                          } 
                          px-4 py-3 border rounded-md text-left transition-all duration-200 flex items-center
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

          {/* Second row - Seasonings and Sauces */}
          <div className="grid grid-cols-2 gap-6">
            {seasoningsAndSauces.map(([categoryName, categoryItems]) => (
              <div key={categoryName} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-porkchop-50 px-4 py-2 border-b border-porkchop-100">
                  <h3 className="text-lg font-medium text-porkchop-900">{categoryName}</h3>
                </div>
                <div className="p-4">
                  <div className="flex flex-col space-y-2">
                    {categoryItems.map(item => (
                      <button
                        key={item.id}
                        onClick={() => toggleItem(category, item.id)}
                        className={`
                          ${selectedItems[category].includes(item.id)
                            ? 'bg-porkchop-100 border-porkchop-500 text-porkchop-700'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                          } 
                          px-4 py-3 border rounded-md text-left transition-all duration-200 flex items-center
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
      );
    }

    // Default 3-3 layout for other categories
    const firstRow = categoryEntries.slice(0, 3);
    const secondRow = categoryEntries.slice(3);

    return (
      <div className="space-y-6">
        {/* First row */}
        <div className="grid grid-cols-3 gap-6">
          {firstRow.map(([categoryName, categoryItems]) => (
            <div key={categoryName} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-porkchop-50 px-4 py-2 border-b border-porkchop-100">
                <h3 className="text-lg font-medium text-porkchop-900">{categoryName}</h3>
              </div>
              <div className="p-4">
                <div className="flex flex-col space-y-2">
                  {categoryItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => toggleItem(category, item.id)}
                      className={`
                        ${selectedItems[category].includes(item.id)
                          ? 'bg-porkchop-100 border-porkchop-500 text-porkchop-700'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        } 
                        px-4 py-3 border rounded-md text-left transition-all duration-200 flex items-center
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

        {/* Second row */}
        {secondRow.length > 0 && (
          <div className="grid grid-cols-3 gap-6">
            {secondRow.map(([categoryName, categoryItems]) => (
              <div key={categoryName} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-porkchop-50 px-4 py-2 border-b border-porkchop-100">
                  <h3 className="text-lg font-medium text-porkchop-900">{categoryName}</h3>
                </div>
                <div className="p-4">
                  <div className="flex flex-col space-y-2">
                    {categoryItems.map(item => (
                      <button
                        key={item.id}
                        onClick={() => toggleItem(category, item.id)}
                        className={`
                          ${selectedItems[category].includes(item.id)
                            ? 'bg-porkchop-100 border-porkchop-500 text-porkchop-700'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                          } 
                          px-4 py-3 border rounded-md text-left transition-all duration-200 flex items-center
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
    );
  };

  useEffect(() => {
    const loadRecipes = async () => {
      const loadedRecipes = await parseCSVRecipes();
      setRecipes(loadedRecipes);
    };
    loadRecipes();
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const matches = findMatchingRecipes();
      setMatchedRecipes(matches);
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

  const isIngredientMissing = (ingredient: string | Ingredient, missingIngredients: (string | Ingredient)[]) => {
    if (typeof ingredient === 'string') {
      return missingIngredients.some(missing => 
        typeof missing === 'string' ? missing === ingredient : missing.name === ingredient
      );
    }
    return missingIngredients.some(missing => 
      typeof missing === 'string' ? missing === ingredient.name : missing.name === ingredient.name
    );
  };

  const findMatchingRecipes = () => {
    const allSelectedIngredients = [
      ...selectedItems.proteins,
      ...selectedItems.vegetables,
      ...selectedItems.herbsAndSpices
    ];

    const matches = recipes.map(recipe => {
      // Normalize and match ingredients
      const normalizedRecipeIngredients = recipe.ingredients.map(normalizeIngredient);
      const normalizedSelectedIngredients = allSelectedIngredients.map(ing => {
        const fullName = 
          ingredients.proteins.find(i => i.id === ing)?.name ||
          ingredients.vegetables.find(i => i.id === ing)?.name ||
          ingredients.herbsAndSpices.find(i => i.id === ing)?.name ||
          ing;
        return normalizeIngredient(fullName);
      });

      const matchedIngredients = normalizedRecipeIngredients.filter(ingredient =>
        normalizedSelectedIngredients.some(selected => 
          ingredient.includes(selected) || selected.includes(ingredient)
        )
      );

      const matchedCookware = recipe.requiredCookware.filter(item =>
        selectedItems.cookware.some(selected => 
          item.toLowerCase().includes(selected) || selected.includes(item.toLowerCase())
        )
      );

      const missingIngredients = recipe.ingredients.filter(ingredient =>
        !normalizedSelectedIngredients.some(selected => 
          normalizeIngredient(ingredient).includes(selected) || 
          selected.includes(normalizeIngredient(ingredient))
        )
      );

      const missingCookware = recipe.requiredCookware.filter(item =>
        !selectedItems.cookware.some(selected => 
          item.toLowerCase().includes(selected) || selected.includes(item.toLowerCase())
        )
      );

      const ingredientPercentage = (matchedIngredients.length / recipe.ingredients.length) * 100;
      const cookwarePercentage = recipe.requiredCookware.length > 0 
        ? (matchedCookware.length / recipe.requiredCookware.length) * 100
        : 100;

      const proteinBonus = selectedItems.proteins.some(protein => 
        recipe.proteinTags.some(tag => tag.includes(protein) || protein.includes(tag))
      ) ? 10 : 0;

      const veggieBonus = selectedItems.vegetables.some(veggie => 
        recipe.veggieTags.some(tag => tag.includes(veggie) || veggie.includes(tag))
      ) ? 10 : 0;

      const herbBonus = selectedItems.herbsAndSpices.some(herb => 
        recipe.herbTags.some(tag => tag.includes(herb) || herb.includes(tag))
      ) ? 10 : 0;

      return {
        recipe,
        matchPercentage: (ingredientPercentage + cookwarePercentage) / 2 + proteinBonus + veggieBonus + herbBonus,
        missingIngredients,
        missingCookware
      };
    });

    return matches
      .filter(match => match.matchPercentage > 20)
      .sort((a, b) => b.matchPercentage - a.matchPercentage);
  };

  const renderMatchedRecipes = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Matching Recipes</h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {matchedRecipes.map(({ recipe, matchPercentage, missingIngredients, missingCookware }) => (
          <div 
            key={recipe.id} 
            className={`relative transition-all duration-300 ${
              currentRecipe?.id === recipe.id ? 'transform -translate-y-4 shadow-xl ring-2 ring-porkchop-500' : ''
            }`}
            style={{ perspective: '1000px', minHeight: '600px' }}
          >
            <div 
              className="w-full h-full transition-transform duration-500 transform-gpu preserve-3d"
              style={{ 
                transform: flippedCards[recipe.id] ? 'rotateY(180deg)' : 'rotateY(0deg)',
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
                    src={`/data/images/recipe stock photos/${recipe.title}.png`}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-recipe.png';
                    }}
                  />
                  <div className="absolute top-0 right-0 m-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-porkchop-100 text-porkchop-800 shadow-sm">
                      {Math.round(matchPercentage)}% Match
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-900">{recipe.title}</h4>
                      <p className="mt-1 text-sm text-gray-500">{recipe.description}</p>
                    </div>
                  </div>

                  {(missingIngredients.length > 0 || missingCookware.length > 0) && (
                    <div className="mt-4 space-y-3">
                      <p className="text-sm font-medium text-gray-900">Missing Items:</p>
                      {missingIngredients.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {missingIngredients.map((item, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              {typeof item === 'string' ? item : item.name}
                            </span>
                          ))}
                        </div>
                      )}
                      {missingCookware.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {missingCookware.map((item, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {item}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      {recipe.cookingTime} mins • {recipe.servings} servings • {recipe.difficulty}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveRecipe(recipe)}
                        className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                          isRecipeSaved(recipe.id)
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                            : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                        }`}
                      >
                        {isRecipeSaved(recipe.id) ? 'Unarchive' : 'Archive'}
                      </button>
                      <button
                        onClick={() => toggleCard(recipe.id)}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        View Instructions
                      </button>
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
                    <h4 className="text-xl font-semibold text-gray-900">{recipe.title} Instructions</h4>
                    <button
                      onClick={() => toggleCard(recipe.id)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto">
                    <ol className="space-y-4">
                      {recipe.instructions.map((step, index) => (
                        <li key={index} className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-porkchop-100 text-porkchop-600 flex items-center justify-center font-semibold">
                            {index + 1}
                          </div>
                          <p className="text-gray-600 flex-1">{step}</p>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Required Ingredients:</h5>
                      <div className="flex flex-wrap gap-2">
                        {recipe.ingredients.map((ingredient, index) => (
                          <span 
                            key={getIngredientKey(ingredient, index)}
                            className={`px-2 py-1 rounded-full text-sm ${
                              isIngredientMissing(ingredient, missingIngredients)
                                ? 'bg-red-100 text-red-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {renderIngredient(ingredient)}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() => handleRecipeSelect(recipe)}
                        className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                          currentRecipe?.id === recipe.id
                            ? 'bg-porkchop-600 text-white hover:bg-porkchop-700'
                            : 'bg-porkchop-100 text-porkchop-700 hover:bg-porkchop-200'
                        }`}
                      >
                        {currentRecipe?.id === recipe.id ? 'Selected' : 'Select Recipe'}
                      </button>
                    </div>
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

  const handleSaveRecipe = (recipe: Recipe) => {
    if (isRecipeSaved(recipe.id)) {
      removeFromSaved(recipe.id);
    } else {
      addToSaved(recipe);
    }
  };

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
                  setMatchedRecipes([]);
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