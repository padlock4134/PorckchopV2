import React, { useState, useRef } from 'react';
import { useSavedRecipes } from '../context/SavedRecipesContext';
import Papa from 'papaparse';
import type { Recipe } from '../utils/recipeData';

const CreateRecipeForm: React.FC = () => {
  const { addRecipe } = useSavedRecipes();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [recipe, setRecipe] = useState<Recipe>({
    id: Date.now().toString(),
    title: '',
    description: '',
    ingredients: [''],
    instructions: [''],
    steps: [''],
    cookingTime: 0,
    imageUrl: '',
    servings: 4,
    difficulty: 'medium',
    requiredCookware: [],
    proteinTags: [],
    veggieTags: [],
    herbTags: []
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      complete: (results) => {
        const csvData = results.data as any[];
        // Skip header row and process each recipe
        csvData.slice(1).forEach((row) => {
          const newRecipe: Recipe = {
            id: Date.now().toString(),
            title: row[1] || '',
            description: row[2] || '',
            ingredients: (row[3] || '').split(',').map((i: string) => i.trim()),
            instructions: (row[4] || '').split('.').filter((i: string) => i.trim()),
            steps: (row[4] || '').split('.').filter((i: string) => i.trim()),
            cookingTime: parseInt(row[5]) || 0,
            imageUrl: row[6] || '',
            servings: parseInt(row[7]) || 4,
            difficulty: (row[8]?.toLowerCase() || 'medium') as 'easy' | 'medium' | 'hard',
            requiredCookware: (row[9] || '').split(',').map((i: string) => i.trim()),
            proteinTags: (row[10] || '').split(',').map((i: string) => i.trim()),
            veggieTags: (row[13] || '').split(',').map((i: string) => i.trim()),
            herbTags: (row[14] || '').split(',').map((i: string) => i.trim())
          };
          addRecipe(newRecipe);
        });
        
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      },
      header: false,
      skipEmptyLines: true
    });
  };

  const handleAddIngredient = () => {
    setRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }));
  };

  const handleAddInstruction = () => {
    setRecipe(prev => ({
      ...prev,
      instructions: [...prev.instructions, ''],
      steps: [...prev.steps, '']
    }));
  };

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = value;
    setRecipe(prev => ({
      ...prev,
      ingredients: newIngredients
    }));
  };

  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...recipe.instructions];
    newInstructions[index] = value;
    const newSteps = [...recipe.steps];
    newSteps[index] = value;
    setRecipe(prev => ({
      ...prev,
      instructions: newInstructions,
      steps: newSteps
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter out empty ingredients and instructions
    const cleanRecipe = {
      ...recipe,
      ingredients: recipe.ingredients.filter(i => typeof i === 'string' ? i.trim() !== '' : true),
      instructions: recipe.instructions.filter(i => i.trim() !== ''),
      steps: recipe.steps.filter(s => s.trim() !== '')
    };
    addRecipe(cleanRecipe);
    // Reset form
    setRecipe({
      id: Date.now().toString(),
      title: '',
      description: '',
      ingredients: [''],
      instructions: [''],
      steps: [''],
      cookingTime: 0,
      imageUrl: '',
      servings: 4,
      difficulty: 'medium',
      requiredCookware: [],
      proteinTags: [],
      veggieTags: [],
      herbTags: []
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Import Recipes from CSV</h2>
        <input
          type="file"
          ref={fileInputRef}
          accept=".csv"
          onChange={handleFileUpload}
          className="w-full p-2 border rounded"
        />
        <p className="text-sm text-gray-500 mt-2">
          Upload your recipes_rows.csv file to import recipes in bulk
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Add Recipe Manually</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={recipe.title}
              onChange={e => setRecipe(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Recipe Title"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <textarea
              value={recipe.description}
              onChange={e => setRecipe(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Description"
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>

          <div>
            <input
              type="text"
              value={recipe.imageUrl}
              onChange={e => setRecipe(prev => ({ ...prev, imageUrl: e.target.value }))}
              placeholder="Image URL"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <input
              type="number"
              value={recipe.cookingTime}
              onChange={e => setRecipe(prev => ({ ...prev, cookingTime: parseInt(e.target.value) || 0 }))}
              placeholder="Cooking Time (minutes)"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Ingredients:</label>
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={typeof ingredient === 'string' ? ingredient : ingredient.name}
                  onChange={e => handleIngredientChange(index, e.target.value)}
                  placeholder="Enter ingredient"
                  className="flex-1 p-2 border rounded"
                />
                {index === recipe.ingredients.length - 1 && (
                  <button
                    type="button"
                    onClick={handleAddIngredient}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Instructions:</label>
            {recipe.instructions.map((instruction, index) => (
              <div key={index} className="flex gap-2">
                <textarea
                  value={instruction}
                  onChange={e => handleInstructionChange(index, e.target.value)}
                  placeholder={`Step ${index + 1}`}
                  className="flex-1 p-2 border rounded"
                  rows={2}
                />
                {index === recipe.instructions.length - 1 && (
                  <button
                    type="button"
                    onClick={handleAddInstruction}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-porkchop-500 text-white rounded hover:bg-porkchop-600"
          >
            Add Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipeForm; 