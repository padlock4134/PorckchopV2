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
    description: 'Welcome to PorkChop! I can help you discover new recipes and learn cooking techniques.',
    suggestedQuestions: [
      'What can I cook today?',
      'Show me popular recipes',
      'What are the trending dishes?',
      'How do I archive a recipe?',
      'Where can I find my saved recipes?'
    ],
    features: [
      {
        name: 'Recipe Discovery',
        suggestedQuestions: [
          'What recipes do you recommend?',
          'How do I find recipes by ingredient?',
          'What\'s trending today?'
        ]
      },
      {
        name: 'Cooking Tips',
        suggestedQuestions: [
          'What are some basic cooking tips?',
          'How do I improve my knife skills?',
          'What\'s the best way to season food?'
        ]
      }
    ]
  },
  '/create-recipe': {
    route: '/create-recipe',
    title: 'Create Recipe',
    description: "Let's create a new recipe! What ingredients do you have in your kitchen?",
    suggestedQuestions: [
      'How do I select ingredients?',
      'What cookware do I need?',
      'How do I save my recipe?',
      'Can I modify existing recipes?'
    ],
    features: [
      {
        name: 'Ingredient selection',
        suggestedQuestions: [
          'How do I add proteins?',
          'What vegetables can I use?',
          'How do I add herbs and spices?',
          'How do I remove ingredients?'
        ]
      },
      {
        name: 'Cookware selection',
        suggestedQuestions: [
          'What cookware do I need?',
          'How do I select multiple items?',
          'Can I change my cookware later?'
        ]
      },
      {
        name: 'Recipe management',
        suggestedQuestions: [
          'How do I save my recipe?',
          'Where do saved recipes go?',
          'Can I edit my recipe later?'
        ]
      }
    ]
  },
  '/my-cookbook': {
    route: '/my-cookbook',
    title: 'My Cookbook',
    description: 'Here are your saved recipes and collections. What would you like to cook today?',
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
    title: 'Profile',
    description: 'Manage your profile, preferences, and cooking history.',
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
    description: 'View and manage your subscription plan.',
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
  },
  '/butcher-shop': {
    route: '/butcher-shop',
    title: 'Butcher Shop',
    description: 'Looking for quality meat? I can help you find local suppliers and suggest cuts for your recipes.',
    suggestedQuestions: [
      'What cuts of meat are best for grilling?',
      'How do I choose the right cut for my recipe?',
      'What are the different grades of meat?',
      'How do I store meat properly?'
    ],
    features: [
      {
        name: 'Meat selection',
        suggestedQuestions: [
          'What cuts are best for slow cooking?',
          'How do I choose tender cuts?',
          'What are the most flavorful cuts?'
        ]
      },
      {
        name: 'Storage tips',
        suggestedQuestions: [
          'How long can I store meat in the freezer?',
          "What's the best way to thaw meat?",
          'How do I prevent freezer burn?'
        ]
      },
      {
        name: 'Cooking guidance',
        suggestedQuestions: [
          'What temperature should I cook different cuts to?',
          'How do I tenderize tough cuts?',
          'What are the best cooking methods for each cut?'
        ]
      }
    ]
  },
  '/chefs-corner': {
    route: '/chefs-corner',
    title: 'Chef\'s Corner',
    description: 'Welcome to the Chef\'s Corner! Here you can access our comprehensive tutorial library, join cooking challenges, and connect with other chefs.',
    suggestedQuestions: [
      'What tutorials do you recommend for beginners?',
      'Show me the knife skills tutorials',
      'Where can I learn about food safety?',
      'How do I participate in cooking challenges?',
      'How do I connect with other chefs?'
    ],
    features: [
      {
        name: 'Tutorial Library',
        suggestedQuestions: [
          'What tutorials do you recommend for beginners?',
          'Show me the knife skills tutorials',
          'Where can I learn about food safety?'
        ]
      },
      {
        name: 'Cooking Challenges',
        suggestedQuestions: [
          'What\'s the current challenge?',
          'How do I participate in challenges?',
          'What are the rewards?'
        ]
      },
      {
        name: 'Community',
        suggestedQuestions: [
          'How do I connect with other chefs?',
          'Can I share my cooking photos?',
          'How do I follow other chefs?'
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
      '/create-recipe': "Let's create something delicious! First, select your proteins from the list on the left. Then add vegetables, herbs, and spices. Finally, choose the cookware you'll need. I'll help you match your ingredients with perfect recipes!",
      '/my-cookbook': "Welcome to your cookbook! Here you can find all your archived recipes and organize them into collections. Need help finding a specific recipe or creating a new collection?",
      '/butcher-shop': "Welcome to the Butcher Shop! I can help you learn about different cuts of meat and suggest recipes for each cut.",
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