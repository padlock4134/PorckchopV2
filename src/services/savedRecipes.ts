import Airtable from 'airtable';
import type { Recipe } from '../utils/recipeData';

const base = new Airtable({ apiKey: import.meta.env.VITE_AIRTABLE_API_KEY }).base(import.meta.env.VITE_AIRTABLE_BASE_ID);

export interface SavedRecipe {
  id: string;
  User: string[];
  Recipe: string[];
  Collection: string[];
  'Created At': string;
  'Last Updated': string;
}

export interface Collection {
  id: string;
  User: string[];
  Name: string;
  Description: string;
  'Created At': string;
  'Last Updated': string;
}

export const savedRecipesService = {
  // Get all saved recipes for a user
  getSavedRecipes: async (userId: string): Promise<SavedRecipe[]> => {
    const records = await base('SavedRecipes')
      .select({
        filterByFormula: `{User} = '${userId}'`
      })
      .firstPage();
    
    return records.map(record => record.fields as unknown as SavedRecipe);
  },

  // Save a recipe for a user
  saveRecipe: async (userId: string, recipeId: string, collectionId?: string): Promise<SavedRecipe> => {
    const now = new Date().toISOString().split('T')[0];
    const record = await base('SavedRecipes').create({
      User: [userId],
      Recipe: [recipeId],
      Collection: collectionId ? [collectionId] : [],
      'Created At': now,
      'Last Updated': now
    });
    
    return record.fields as unknown as SavedRecipe;
  },

  // Remove a saved recipe
  removeSavedRecipe: async (savedRecipeId: string): Promise<void> => {
    await base('SavedRecipes').destroy(savedRecipeId);
  },

  // Get all collections for a user
  getCollections: async (userId: string): Promise<Collection[]> => {
    const records = await base('Collections')
      .select({
        filterByFormula: `{User} = '${userId}'`
      })
      .firstPage();
    
    return records.map(record => record.fields as unknown as Collection);
  },

  // Create a new collection
  createCollection: async (userId: string, name: string, description: string): Promise<Collection> => {
    const now = new Date().toISOString().split('T')[0];
    const record = await base('Collections').create({
      User: [userId],
      Name: name,
      Description: description,
      'Created At': now,
      'Last Updated': now
    });
    
    return record.fields as unknown as Collection;
  },

  // Create or get the Favorites collection for a user
  getOrCreateFavorites: async (userId: string): Promise<Collection> => {
    // First try to find existing Favorites collection
    const records = await base('Collections')
      .select({
        filterByFormula: `AND({User} = '${userId}', {Name} = 'Favorites')`
      })
      .firstPage();

    if (records.length > 0) {
      return records[0].fields as unknown as Collection;
    }

    // If not found, create a new Favorites collection
    const now = new Date().toISOString().split('T')[0];
    const record = await base('Collections').create({
      User: [userId],
      Name: 'Favorites',
      Description: 'Your most loved recipes',
      'Created At': now,
      'Last Updated': now
    });
    
    return record.fields as unknown as Collection;
  },

  // Update a collection
  updateCollection: async (collectionId: string, updates: Partial<Collection>): Promise<Collection> => {
    const now = new Date().toISOString().split('T')[0];
    const record = await base('Collections').update(collectionId, {
      ...updates,
      'Last Updated': now
    });
    
    return record.fields as unknown as Collection;
  },

  // Delete a collection (prevent deletion of Favorites)
  deleteCollection: async (collectionId: string, name: string): Promise<void> => {
    if (name === 'Favorites') {
      throw new Error('Cannot delete the Favorites collection');
    }
    await base('Collections').destroy(collectionId);
  },

  // Add a recipe to a collection
  addToCollection: async (savedRecipeId: string, collectionId: string): Promise<SavedRecipe> => {
    const record = await base('SavedRecipes').update(savedRecipeId, {
      Collection: [collectionId],
      'Last Updated': new Date().toISOString().split('T')[0]
    });
    
    return record.fields as unknown as SavedRecipe;
  },

  // Remove a recipe from a collection
  removeFromCollection: async (savedRecipeId: string): Promise<SavedRecipe> => {
    const record = await base('SavedRecipes').update(savedRecipeId, {
      Collection: [],
      'Last Updated': new Date().toISOString().split('T')[0]
    });
    
    return record.fields as unknown as SavedRecipe;
  }
}; 