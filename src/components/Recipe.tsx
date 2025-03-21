import React from 'react';
import { withSubscriptionCheck } from '../hoc/withSubscriptionCheck';

interface RecipeProps {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  imageUrl?: string;
}

const Recipe: React.FC<RecipeProps> = ({
  title,
  description,
  ingredients,
  instructions,
  cookingTime,
  servings,
  difficulty,
  imageUrl,
}) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}
      <h1 className="text-3xl font-bold text-porkchop-900 mb-4">{title}</h1>
      <p className="text-gray-600 mb-6">{description}</p>

      <div className="flex justify-between mb-6">
        <div className="text-center">
          <span className="block text-sm text-gray-500">Time</span>
          <span className="block font-semibold">{cookingTime} mins</span>
        </div>
        <div className="text-center">
          <span className="block text-sm text-gray-500">Servings</span>
          <span className="block font-semibold">{servings}</span>
        </div>
        <div className="text-center">
          <span className="block text-sm text-gray-500">Difficulty</span>
          <span className="block font-semibold capitalize">{difficulty}</span>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-porkchop-800 mb-3">
          Ingredients
        </h2>
        <ul className="list-disc list-inside space-y-2">
          {ingredients.map((ingredient, index) => (
            <li key={index} className="text-gray-700">
              {ingredient}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-porkchop-800 mb-3">
          Instructions
        </h2>
        <ol className="list-decimal list-inside space-y-4">
          {instructions.map((instruction, index) => (
            <li key={index} className="text-gray-700">
              {instruction}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default withSubscriptionCheck(Recipe); 