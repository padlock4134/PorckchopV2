import React, { useState } from 'react';
import { useSavedRecipes } from '../context/SavedRecipesContext';

interface CollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CollectionModal: React.FC<CollectionModalProps> = ({ isOpen, onClose }) => {
  const { collections, createCollection } = useSavedRecipes();
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionDescription, setNewCollectionDescription] = useState('');

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCollectionName.trim()) {
      createCollection(newCollectionName.trim(), newCollectionDescription.trim());
      setNewCollectionName('');
      setNewCollectionDescription('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full">
        <h2 className="text-xl font-semibold mb-4">Manage Collections</h2>
        
        {/* Create new collection form */}
        <form onSubmit={handleCreateCollection} className="mb-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Collection Name
            </label>
            <input
              type="text"
              id="name"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-porkchop-500"
              placeholder="Enter collection name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description (optional)
            </label>
            <textarea
              id="description"
              value={newCollectionDescription}
              onChange={(e) => setNewCollectionDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-porkchop-500"
              placeholder="Enter collection description"
              rows={3}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-porkchop-600 text-white py-2 px-4 rounded-md hover:bg-porkchop-700 focus:outline-none focus:ring-2 focus:ring-porkchop-500"
          >
            Create Collection
          </button>
        </form>

        {/* List existing collections */}
        <div className="max-h-60 overflow-y-auto">
          <h3 className="text-lg font-medium mb-2">Your Collections</h3>
          {collections.map(collection => (
            <div
              key={collection.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md mb-2"
            >
              <div>
                <h4 className="font-medium">{collection.name}</h4>
                <p className="text-sm text-gray-600">{collection.description}</p>
                <p className="text-xs text-gray-500">{collection.recipeIds.length} recipes</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Close
        </button>
      </div>
    </div>
  );
}; 