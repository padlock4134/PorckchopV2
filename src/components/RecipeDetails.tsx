import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface RecipeFormData {
  title: string;
  description: string;
  cookingTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

const RecipeDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState<RecipeFormData>({
    title: '',
    description: '',
    cookingTime: 30,
    servings: 4,
    difficulty: 'medium',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement recipe creation with selected ingredients and details
    console.log('Recipe details:', formData);
    console.log('Selected ingredients:', location.state?.selectedItems);
    navigate('/recipes');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Recipe Details</h2>
          <p className="mt-1 text-sm text-gray-500">
            Add the final details to your recipe
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-porkchop-500 focus:ring-porkchop-500 sm:text-sm"
              placeholder="Recipe name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-porkchop-500 focus:ring-porkchop-500 sm:text-sm"
              placeholder="Brief description of your recipe"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cooking Time (minutes)
              </label>
              <input
                type="number"
                value={formData.cookingTime}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    cookingTime: parseInt(e.target.value),
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-porkchop-500 focus:ring-porkchop-500 sm:text-sm"
                required
                min={1}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Servings
              </label>
              <input
                type="number"
                value={formData.servings}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    servings: parseInt(e.target.value),
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-porkchop-500 focus:ring-porkchop-500 sm:text-sm"
                required
                min={1}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Difficulty
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    difficulty: e.target.value as 'easy' | 'medium' | 'hard',
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-porkchop-500 focus:ring-porkchop-500 sm:text-sm"
                required
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-porkchop-500"
            >
              Back
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-porkchop-600 hover:bg-porkchop-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-porkchop-500"
            >
              Create Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeDetails; 