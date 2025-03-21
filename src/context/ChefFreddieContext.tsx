import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { useLocation } from 'react-router-dom';
import type { Recipe } from '../utils/recipeData';

// For development: always show Chef Freddie
const isDevelopment = true;

interface RouteFeature {
  name: string;
  suggestedQuestions: string[];
}

interface RouteContext {
  route: string;
  title: string;
  description: string;
  suggestedQuestions: string[];
  features: RouteFeature[];
}

const routeContextMap: Record<string, RouteContext> = {
  '/': {
    route: '/',
    title: 'Home',
    description: 'Welcome to PorkChop! Your personal cooking companion.',
    suggestedQuestions: [
      'What can I cook today?',
      'Show me popular recipes',
      'What are the trending dishes?'
    ],
    features: [
      {
        name: 'Recipe discovery',
        suggestedQuestions: [
          'What are the most popular recipes?',
          'Show me quick dinner ideas',
          'What can I cook with chicken?'
        ]
      },
      {
        name: 'Trending dishes',
        suggestedQuestions: [
          'What\'s trending this week?',
          'Show me seasonal recipes',
          'What are others cooking?'
        ]
      },
      {
        name: 'Quick start cooking',
        suggestedQuestions: [
          'Help me start cooking',
          'What are some easy recipes?',
          'Show me 30-minute meals'
        ]
      }
    ]
  },
  '/create-recipe': {
    route: '/create-recipe',
    title: 'Recipe Creation',
    description: 'Create and customize your own recipes.',
    suggestedQuestions: [
      'How do I start a new recipe?',
      'What makes a good recipe description?',
      'How do I add ingredients?'
    ],
    features: [
      {
        name: 'Recipe builder',
        suggestedQuestions: [
          'How do I structure my recipe?',
          'What makes a good title?',
          'Tips for writing instructions'
        ]
      },
      {
        name: 'Ingredient management',
        suggestedQuestions: [
          'How do I add ingredients?',
          'What units should I use?',
          'How to specify portions?'
        ]
      },
      {
        name: 'Cooking steps',
        suggestedQuestions: [
          'How detailed should steps be?',
          'Tips for clear instructions',
          'How to add cooking times?'
        ]
      }
    ]
  },
  '/profile': {
    route: '/profile',
    title: 'Your Profile',
    description: 'Manage your cooking preferences and saved recipes.',
    suggestedQuestions: [
      'How do I save a recipe?',
      'Where are my favorite recipes?',
      'How do I update my preferences?'
    ],
    features: [
      {
        name: 'Recipe collection',
        suggestedQuestions: [
          'How do I organize my recipes?',
          'Where are my saved recipes?',
          'How to share recipes?'
        ]
      },
      {
        name: 'Cooking preferences',
        suggestedQuestions: [
          'How do I set dietary restrictions?',
          'Update cooking skill level',
          'Change serving size preferences'
        ]
      },
      {
        name: 'Activity history',
        suggestedQuestions: [
          'View my cooking history',
          'Find recent recipes',
          'Track my progress'
        ]
      }
    ]
  },
  '/subscription': {
    route: '/subscription',
    title: 'Subscription',
    description: 'Explore premium features with El Dente.',
    suggestedQuestions: [
      'What comes with El Dente?',
      'How do I upgrade my plan?',
      'What are the premium features?'
    ],
    features: [
      {
        name: 'Premium recipes',
        suggestedQuestions: [
          'What premium recipes are available?',
          'Access exclusive content',
          'Browse chef collections'
        ]
      },
      {
        name: 'Advanced tools',
        suggestedQuestions: [
          'What advanced tools are included?',
          'How to use meal planning?',
          'Access recipe scaling'
        ]
      },
      {
        name: 'Priority support',
        suggestedQuestions: [
          'How to get chef assistance?',
          'Access live support',
          'Submit recipe reviews'
        ]
      }
    ]
  }
};

interface ChefFreddieContextType {
  isVisible: boolean;
  showChefFreddie: () => void;
  hideChefFreddie: () => void;
  currentRecipe: Recipe | null;
  setCurrentRecipe: (recipe: Recipe | null) => void;
  currentRoute: string;
  getContextualHelp: () => string;
  getRouteContext: () => RouteContext;
}

const ChefFreddieContext = createContext<ChefFreddieContextType | undefined>(undefined);

export const ChefFreddieProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(isDevelopment);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const { user } = useAuth();
  const location = useLocation();

  const showChefFreddie = () => {
    if (isDevelopment || user?.subscriptionTier === 'el_dente') {
      setIsVisible(true);
    }
  };

  const hideChefFreddie = () => {
    setIsVisible(false);
  };

  const getRouteContext = (): RouteContext => {
    const path = location.pathname;
    return routeContextMap[path] || routeContextMap['/'];
  };

  const getContextualHelp = (): string => {
    const context = getRouteContext();
    
    // If we have a current recipe, prioritize that context
    if (currentRecipe) {
      return `I see you're looking at ${currentRecipe.title}! Would you like to know about the ingredients, cooking time, or get started with the preparation?`;
    }

    // If user is not subscribed and on subscription page
    if (location.pathname === '/subscription' && (!user?.subscriptionTier || user.subscriptionTier === 'rare')) {
      return `Welcome to the El Dente subscription page! Would you like to learn about our premium features and how they can enhance your cooking journey?`;
    }

    // Route-specific greetings
    const featureNames = context.features.map(f => f.name);
    return `Welcome to ${context.title}! ${context.description} Feel free to ask me about ${featureNames.join(', ')}.`;
  };

  const value = {
    isVisible,
    showChefFreddie,
    hideChefFreddie,
    currentRecipe,
    setCurrentRecipe,
    currentRoute: location.pathname,
    getContextualHelp,
    getRouteContext
  };

  return (
    <ChefFreddieContext.Provider value={value}>
      {children}
    </ChefFreddieContext.Provider>
  );
};

export const useChefFreddie = () => {
  const context = useContext(ChefFreddieContext);
  if (context === undefined) {
    throw new Error('useChefFreddie must be used within a ChefFreddieProvider');
  }
  return context;
};

export default ChefFreddieContext; 