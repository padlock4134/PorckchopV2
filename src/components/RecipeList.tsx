import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { withSubscriptionCheck } from '../hoc/withSubscriptionCheck';

interface Recipe {
  id: string;
  title: string;
  description: string;
  cookingTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  imageUrl?: string;
}

interface RecipeListProps {
  recipes: Recipe[];
}

const getDifficultyColor = (difficulty: Recipe['difficulty']) => {
  switch (difficulty) {
    case 'easy':
      return 'bg-green-100 text-green-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'hard':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search')?.toLowerCase() || '';

  const filteredRecipes = useMemo(() => {
    if (!searchTerm) return recipes;

    return recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(searchTerm) ||
        recipe.description.toLowerCase().includes(searchTerm)
    );
  }, [recipes, searchTerm]);

  if (filteredRecipes.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          No recipes found
        </h2>
        <p className="text-gray-600">
          {searchTerm
            ? `No recipes match "${searchTerm}". Try a different search term.`
            : 'No recipes available at the moment.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {filteredRecipes.map((recipe) => (
        <Link
          key={recipe.id}
          to={`/recipe/${recipe.id}`}
          className="block hover:transform hover:scale-105 transition-transform duration-200"
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {recipe.imageUrl && (
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-bold text-porkchop-900 mb-2">
                {recipe.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {recipe.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {recipe.cookingTime} mins
                </span>
                <span
                  className={`text-sm px-2 py-1 rounded-full capitalize ${getDifficultyColor(
                    recipe.difficulty
                  )}`}
                >
                  {recipe.difficulty}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default withSubscriptionCheck(RecipeList); 