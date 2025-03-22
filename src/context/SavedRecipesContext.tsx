import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import type { Recipe } from '../utils/recipeData';

interface Collection {
  id: string;
  name: string;
  description: string;
  recipeIds: string[];
  createdAt: string;
  updatedAt: string;
}

interface SavedRecipesContextType {
  savedRecipes: Recipe[];
  collections: Collection[];
  addToSaved: (recipe: Recipe) => void;
  removeFromSaved: (recipeId: string) => void;
  createCollection: (name: string, description: string) => void;
  updateCollection: (id: string, updates: Partial<Collection>) => void;
  deleteCollection: (id: string) => void;
  addToCollection: (collectionId: string, recipeId: string) => void;
  removeFromCollection: (collectionId: string, recipeId: string) => void;
  isRecipeSaved: (recipeId: string) => boolean;
  getRecipeCollections: (recipeId: string) => Collection[];
  addRecipe: (recipe: Recipe) => void;
  removeRecipe: (id: string) => void;
}

const SavedRecipesContext = createContext<SavedRecipesContextType | undefined>(undefined);

export const useSavedRecipes = () => {
  const context = useContext(SavedRecipesContext);
  if (!context) {
    throw new Error('useSavedRecipes must be used within a SavedRecipesProvider');
  }
  return context;
};

export const SavedRecipesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [collections, setCollections] = useState<Collection[]>([
    {
      id: 'favorites',
      name: 'Favorites',
      description: 'Your most loved recipes',
      recipeIds: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ]);

  // Load saved data from localStorage on mount
  useEffect(() => {
    if (user) {
      const savedData = localStorage.getItem(`savedRecipes_${user.id}`);
      const collectionsData = localStorage.getItem(`collections_${user.id}`);
      
      if (savedData) {
        const parsedRecipes = JSON.parse(savedData);
        setSavedRecipes(parsedRecipes);
      }
      
      if (collectionsData) {
        setCollections(JSON.parse(collectionsData));
      }
    }
  }, [user]);

  // Save data to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`savedRecipes_${user.id}`, JSON.stringify(savedRecipes));
      localStorage.setItem(`collections_${user.id}`, JSON.stringify(collections));
    }
  }, [user, savedRecipes, collections]);

  const addToSaved = (recipe: Recipe) => {
    setSavedRecipes(prev => {
      if (prev.some(r => r.id === recipe.id)) return prev;
      return [...prev, recipe];
    });
  };

  const removeFromSaved = (recipeId: string) => {
    setSavedRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));
    // Also remove from all collections
    setCollections(prev => 
      prev.map(collection => ({
        ...collection,
        recipeIds: collection.recipeIds.filter(id => id !== recipeId),
        updatedAt: new Date().toISOString()
      }))
    );
  };

  const createCollection = (name: string, description: string) => {
    const newCollection: Collection = {
      id: `collection_${Date.now()}`,
      name,
      description,
      recipeIds: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setCollections(prev => [...prev, newCollection]);
  };

  const updateCollection = (id: string, updates: Partial<Collection>) => {
    setCollections(prev => 
      prev.map(collection => 
        collection.id === id 
          ? { 
              ...collection, 
              ...updates, 
              updatedAt: new Date().toISOString() 
            }
          : collection
      )
    );
  };

  const deleteCollection = (id: string) => {
    if (id === 'favorites') return; // Prevent deletion of favorites
    setCollections(prev => prev.filter(collection => collection.id !== id));
  };

  const addToCollection = (collectionId: string, recipeId: string) => {
    setCollections(prev => 
      prev.map(collection => 
        collection.id === collectionId && !collection.recipeIds.includes(recipeId)
          ? {
              ...collection,
              recipeIds: [...collection.recipeIds, recipeId],
              updatedAt: new Date().toISOString()
            }
          : collection
      )
    );
  };

  const removeFromCollection = (collectionId: string, recipeId: string) => {
    setCollections(prev => 
      prev.map(collection => 
        collection.id === collectionId
          ? {
              ...collection,
              recipeIds: collection.recipeIds.filter(id => id !== recipeId),
              updatedAt: new Date().toISOString()
            }
          : collection
      )
    );
  };

  const isRecipeSaved = (recipeId: string) => {
    return savedRecipes.some(recipe => recipe.id === recipeId);
  };

  const getRecipeCollections = (recipeId: string) => {
    return collections.filter(collection => 
      collection.recipeIds.includes(recipeId)
    );
  };

  const addRecipe = (recipe: Recipe) => {
    setSavedRecipes(prev => [...prev, recipe]);
  };

  const removeRecipe = (id: string) => {
    setSavedRecipes(prev => prev.filter(recipe => recipe.id !== id));
  };

  const value = {
    savedRecipes,
    collections,
    addToSaved,
    removeFromSaved,
    createCollection,
    updateCollection,
    deleteCollection,
    addToCollection,
    removeFromCollection,
    isRecipeSaved,
    getRecipeCollections,
    addRecipe,
    removeRecipe
  };

  return (
    <SavedRecipesContext.Provider value={value}>
      {children}
    </SavedRecipesContext.Provider>
  );
}; 