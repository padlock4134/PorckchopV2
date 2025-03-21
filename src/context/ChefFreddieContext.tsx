import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
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

interface RecommendedRecipeContext {
  recipe: Recipe;
  suggestedQuestions: string[];
  tips: string[];
  relatedRecipes: string[];
}

const routeContextMap: Record<string, RouteContext> = {
  '/': {
    route: '/',
    title: 'Home',
    description: 'Welcome to PorkChop! Your personal cooking companion.',
    suggestedQuestions: [
      'What can I cook today?',
      'Show me popular recipes',
      'What are the trending dishes?',
      'How do I archive a recipe?',
      'Where can I find my saved recipes?'
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
        name: 'Recipe Management',
        suggestedQuestions: [
          'How do I save recipes to my cookbook?',
          'Where are my archived recipes?',
          'How do I organize my recipes?'
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
    description: 'Create, customize, and save your own recipes.',
    suggestedQuestions: [
      'How do I start a new recipe?',
      'What makes a good recipe description?',
      'How do I add ingredients?',
      'Can I save this recipe to my cookbook?'
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
        name: 'Recipe saving',
        suggestedQuestions: [
          'How do I archive this recipe?',
          'Where do saved recipes go?',
          'Can I organize my recipes into collections?'
        ]
      }
    ]
  },
  '/my-cookbook': {
    route: '/my-cookbook',
    title: 'My Cookbook',
    description: 'Your personal collection of saved and archived recipes.',
    suggestedQuestions: [
      'How do I organize my recipes?',
      'Can I create collections?',
      'How do I unarchive a recipe?'
    ],
    features: [
      {
        name: 'Recipe collections',
        suggestedQuestions: [
          'How do I create a new collection?',
          'Can I move recipes between collections?',
          'How do I share my collections?'
        ]
      },
      {
        name: 'Recipe management',
        suggestedQuestions: [
          'How do I archive/unarchive recipes?',
          'Can I edit saved recipes?',
          'How do I find specific recipes?'
        ]
      },
      {
        name: 'Cookbook organization',
        suggestedQuestions: [
          'Tips for organizing recipes',
          'How to use recipe tags',
          'Best practices for collections'
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
  },
  '/login': {
    route: '/login',
    title: 'Login',
    description: 'Welcome back to PorkChop!',
    suggestedQuestions: [
      'How do I reset my password?',
      'What are the benefits of logging in?',
      'Having trouble logging in?'
    ],
    features: [
      {
        name: 'Account access',
        suggestedQuestions: [
          'What can I do when logged in?',
          'How to save my preferences?',
          'Access my saved recipes'
        ]
      },
      {
        name: 'Password help',
        suggestedQuestions: [
          'Forgot my password',
          'Reset my login details',
          'Account recovery options'
        ]
      }
    ]
  },
  '/signup': {
    route: '/signup',
    title: 'Sign Up',
    description: 'Join the PorkChop community!',
    suggestedQuestions: [
      'What comes with my account?',
      'How do I get started?',
      'Tell me about El Dente subscription'
    ],
    features: [
      {
        name: 'Account benefits',
        suggestedQuestions: [
          'What can I do with my account?',
          'Free vs Premium features',
          'How to save recipes'
        ]
      },
      {
        name: 'Getting started',
        suggestedQuestions: [
          'First steps after signing up',
          'Create my first recipe',
          'Explore community recipes'
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
  recommendedRecipe: Recipe | null;
  setRecommendedRecipe: (recipe: Recipe | null) => void;
  currentRoute: string;
  getContextualHelp: () => string;
  getRouteContext: () => RouteContext;
  getRecipeContext: () => RecommendedRecipeContext | null;
}

const ChefFreddieContext = createContext<ChefFreddieContextType | undefined>(undefined);

const ChefFreddieProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(isDevelopment);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [recommendedRecipe, setRecommendedRecipe] = useState<Recipe | null>(null);
  const { user } = useAuth();
  const location = useLocation();

  // Show Chef Freddie and update context when route changes
  useEffect(() => {
    const routeContext = getRouteContext();
    // Show Chef Freddie with a slight delay for smooth transition
    const timer = setTimeout(() => {
      showChefFreddie();
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname]);

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

  const getRecipeContext = (): RecommendedRecipeContext | null => {
    if (!recommendedRecipe) return null;

    return {
      recipe: recommendedRecipe,
      suggestedQuestions: [
        `What makes ${recommendedRecipe.title} special?`,
        `What are some tips for cooking ${recommendedRecipe.title}?`,
        `What sides go well with ${recommendedRecipe.title}?`,
        `How can I modify ${recommendedRecipe.title} for dietary restrictions?`
      ],
      tips: [
        `${recommendedRecipe.title} is best cooked at ${recommendedRecipe.cookingTime ? `${recommendedRecipe.cookingTime} minutes` : 'medium-high heat'}`,
        `Make sure to let ${recommendedRecipe.title} rest for optimal flavor`,
        `Fresh ingredients make a big difference in ${recommendedRecipe.title}`
      ],
      relatedRecipes: [
        'Similar recipes you might enjoy...',
        'Popular variations of this dish...',
        'Complementary dishes to try...'
      ]
    };
  };

  const getContextualHelp = (): string => {
    const routeContext = getRouteContext();
    const recipeContext = getRecipeContext();

    // Add transition messages for specific route changes
    const transitionMessages: Record<string, string> = {
      '/create-recipe': "Ready to create something delicious? I can help you build your recipe and save it to your cookbook when you're done. Need tips on recipe writing or ingredient combinations?",
      '/my-cookbook': "Welcome to your cookbook! Here you can find all your archived recipes and organize them into collections. Need help finding a specific recipe or creating a new collection?",
      '/butcher-shop': "Welcome to the Butcher Shop! I can help you learn about different cuts of meat and suggest recipes for each cut.",
      '/chefs-market': "Welcome to the Chef's Market! Looking for specific ingredients or need suggestions for substitutions?",
      '/profile': "Let's check out your cooking profile! You can manage your saved recipes, collections, and cooking preferences here.",
      '/subscription': "Interested in upgrading your cooking experience? El Dente members get access to premium features and exclusive recipes!"
    };

    // First check for custom transition message
    if (transitionMessages[location.pathname]) {
      return transitionMessages[location.pathname];
    }

    if (recipeContext) {
      return `I see you're interested in ${recipeContext.recipe.title}! This is a ${
        recipeContext.recipe.difficulty
      } difficulty recipe that takes about ${
        recipeContext.recipe.cookingTime
      } minutes to prepare. You can archive this recipe to your cookbook or start cooking right away. Would you like some cooking tips or ingredient substitutions?`;
    }

    if (currentRecipe) {
      return `I notice you're working with ${currentRecipe.title}. You can archive this recipe to your cookbook by clicking the Archive button. How can I help you perfect this dish?`;
    }

    // Authentication-specific responses
    if (location.pathname === '/login') {
      return `Welcome back to PorkChop! I'm Chef Freddie, and I'm here to help you get back to cooking. Need help logging in or recovering your account?`;
    }

    if (location.pathname === '/signup') {
      return `Welcome to PorkChop! I'm Chef Freddie, your personal cooking companion. Ready to start your culinary journey? I'll help you get set up and cooking in no time!`;
    }

    // If user is not subscribed and on subscription page
    if (location.pathname === '/subscription' && (!user?.subscriptionTier || user.subscriptionTier === 'rare')) {
      return `Welcome to the El Dente subscription page! Would you like to learn about our premium features and how they can enhance your cooking journey?`;
    }

    // Route-specific greetings
    const featureNames = routeContext.features.map(f => f.name);
    return `Welcome to ${routeContext.title}! ${routeContext.description} Feel free to ask me about ${featureNames.join(', ')}.`;
  };

  const value = {
    isVisible,
    showChefFreddie,
    hideChefFreddie,
    currentRecipe,
    setCurrentRecipe,
    recommendedRecipe,
    setRecommendedRecipe,
    currentRoute: location.pathname,
    getContextualHelp,
    getRouteContext,
    getRecipeContext
  };

  return (
    <ChefFreddieContext.Provider value={value}>
      {children}
    </ChefFreddieContext.Provider>
  );
};

const useChefFreddie = () => {
  const context = useContext(ChefFreddieContext);
  if (context === undefined) {
    throw new Error('useChefFreddie must be used within a ChefFreddieProvider');
  }
  return context;
};

export { ChefFreddieContext, ChefFreddieProvider, useChefFreddie }; 