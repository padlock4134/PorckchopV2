interface CookingTip {
  id: string;
  title: string;
  description: string;
  category: 'technique' | 'safety' | 'measurement' | 'substitution' | 'timing';
}

interface CommonProblem {
  problem: string;
  solutions: string[];
  relatedTips: string[];
}

interface IngredientSubstitution {
  ingredient: string;
  substitutes: Array<{
    name: string;
    ratio: string;
    notes?: string;
  }>;
}

interface CookingTechnique {
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tips: string[];
  commonMistakes: string[];
}

export const cookingTips: CookingTip[] = [
  {
    id: 'mise-en-place',
    title: 'Mise en Place',
    description: 'Prepare and organize all ingredients before starting to cook. This helps prevent mistakes and makes cooking smoother.',
    category: 'technique'
  },
  {
    id: 'knife-safety',
    title: 'Knife Safety',
    description: 'Always cut away from yourself and keep your fingers tucked while chopping.',
    category: 'safety'
  },
  {
    id: 'measurement-conversion',
    title: 'Measurement Conversion',
    description: 'For dry ingredients, 1 tablespoon equals 3 teaspoons. For liquids, 1 cup equals 240ml.',
    category: 'measurement'
  },
  {
    id: 'salt-timing',
    title: 'Salt Timing',
    description: 'Season throughout cooking, not just at the end. This builds layers of flavor.',
    category: 'timing'
  }
];

export const commonProblems: CommonProblem[] = [
  {
    problem: 'Sauce is too thin',
    solutions: [
      'Simmer to reduce liquid',
      'Add a cornstarch slurry',
      'Make a roux with butter and flour'
    ],
    relatedTips: ['measurement-conversion']
  },
  {
    problem: 'Food is sticking to the pan',
    solutions: [
      'Ensure pan is properly preheated',
      'Use enough oil or fat',
      'Don\'t move food too soon - let it release naturally'
    ],
    relatedTips: ['mise-en-place']
  }
];

export const ingredientSubstitutions: IngredientSubstitution[] = [
  {
    ingredient: 'buttermilk',
    substitutes: [
      {
        name: 'milk + lemon juice',
        ratio: '1 cup milk + 1 tablespoon lemon juice',
        notes: 'Let stand for 5 minutes before using'
      },
      {
        name: 'yogurt',
        ratio: '1:1',
        notes: 'Thin with milk if needed'
      }
    ]
  },
  {
    ingredient: 'eggs',
    substitutes: [
      {
        name: 'mashed banana',
        ratio: '1 egg = 1/4 cup mashed banana',
        notes: 'Best for sweet recipes'
      },
      {
        name: 'ground flaxseed',
        ratio: '1 egg = 1 tbsp ground flaxseed + 3 tbsp water',
        notes: 'Let stand for 5 minutes to thicken'
      }
    ]
  }
];

export const cookingTechniques: CookingTechnique[] = [
  {
    name: 'Sautéing',
    description: 'Cooking food quickly in a small amount of fat over high heat',
    difficulty: 'beginner',
    tips: [
      'Use a pan large enough to avoid overcrowding',
      'Pat ingredients dry before adding to pan',
      'Keep food moving to prevent burning',
      'Heat pan before adding oil',
      'Listen for the sizzle - it indicates proper temperature'
    ],
    commonMistakes: [
      'Adding too much food to the pan',
      'Not preheating the pan properly',
      'Using too low heat',
      'Moving food too frequently',
      'Using the wrong type of oil'
    ]
  },
  {
    name: 'Braising',
    description: 'Searing meat then cooking slowly in liquid',
    difficulty: 'intermediate',
    tips: [
      'Brown meat well for better flavor',
      'Don\'t completely submerge in liquid',
      'Keep lid tight during slow cooking',
      'Choose tough cuts of meat - they become tender',
      'Add vegetables later to prevent overcooking'
    ],
    commonMistakes: [
      'Skipping the browning step',
      'Using too much liquid',
      'Opening the lid too often',
      'Cooking at too high temperature',
      'Not seasoning before browning'
    ]
  },
  {
    name: 'Roasting',
    description: 'Cooking food in an oven with dry heat',
    difficulty: 'beginner',
    tips: [
      'Preheat oven thoroughly',
      'Use a roasting rack for even cooking',
      'Baste occasionally for moisture',
      'Let meat rest after cooking',
      'Use a meat thermometer for accuracy'
    ],
    commonMistakes: [
      'Opening oven door too frequently',
      'Not using a meat thermometer',
      'Overcrowding the pan',
      'Not letting meat come to room temperature',
      'Forgetting to season'
    ]
  }
];

interface RecipeGuideline {
  aspect: string;
  guidelines: string[];
  examples: string[];
}

export const recipeGuidelines: RecipeGuideline[] = [
  {
    aspect: 'Title',
    guidelines: [
      'Be specific but concise',
      'Include main ingredients or cooking method',
      'Make it appealing'
    ],
    examples: [
      'Crispy Pan-Seared Salmon',
      'One-Pot Chicken Alfredo',
      'Quick 30-Minute Vegetable Stir-Fry'
    ]
  },
  {
    aspect: 'Description',
    guidelines: [
      'Highlight key flavors and textures',
      'Mention cooking time and difficulty',
      'Include serving suggestions'
    ],
    examples: [
      'A tender, flaky salmon fillet with crispy skin, served with roasted vegetables',
      'A comforting pasta dish that comes together in just 30 minutes'
    ]
  }
];

interface TimingGuideline {
  category: string;
  items: Array<{
    item: string;
    time: string;
    temperature?: string;
    tips: string[];
  }>;
}

export const timingGuidelines: TimingGuideline[] = [
  {
    category: 'Meat',
    items: [
      {
        item: 'Chicken Breast',
        time: '20-25 minutes',
        temperature: '165°F (74°C)',
        tips: [
          'Let rest 5-10 minutes before cutting',
          'Check thickest part for temperature',
          'Pound to even thickness for better results'
        ]
      },
      {
        item: 'Pork Chops',
        time: '12-15 minutes',
        temperature: '145°F (63°C)',
        tips: [
          'Pink center is safe at proper temperature',
          'Brine for 30 minutes before cooking',
          'Rest for 3-5 minutes'
        ]
      }
    ]
  },
  {
    category: 'Vegetables',
    items: [
      {
        item: 'Broccoli',
        time: '8-10 minutes',
        tips: [
          'Should be bright green',
          'Test with fork for tenderness',
          'Cut florets to similar size'
        ]
      },
      {
        item: 'Carrots',
        time: '10-12 minutes',
        tips: [
          'Cut uniformly for even cooking',
          'Can be slightly firm in center',
          'Add herbs in last 2 minutes'
        ]
      }
    ]
  }
];

interface FlavorCombination {
  ingredient: string;
  pairsWith: string[];
  avoidWith: string[];
  seasonalPairings: {
    spring?: string[];
    summer?: string[];
    fall?: string[];
    winter?: string[];
  };
}

export const flavorCombinations: FlavorCombination[] = [
  {
    ingredient: 'Tomato',
    pairsWith: ['basil', 'garlic', 'olive oil', 'mozzarella', 'onion'],
    avoidWith: ['vanilla', 'chocolate', 'cinnamon'],
    seasonalPairings: {
      summer: ['fresh herbs', 'cucumber', 'watermelon'],
      winter: ['roasted garlic', 'heavy cream', 'root vegetables']
    }
  },
  {
    ingredient: 'Chicken',
    pairsWith: ['lemon', 'garlic', 'rosemary', 'thyme', 'sage'],
    avoidWith: ['fish sauce', 'anchovy', 'blue cheese'],
    seasonalPairings: {
      spring: ['asparagus', 'peas', 'lemon'],
      summer: ['basil', 'tomatoes', 'grilled vegetables'],
      fall: ['mushrooms', 'root vegetables', 'sage'],
      winter: ['root vegetables', 'heavy cream sauces', 'dried herbs']
    }
  }
];

interface CookingMethod {
  method: string;
  bestFor: string[];
  equipment: string[];
  tips: string[];
  temperature?: {
    low: string;
    medium: string;
    high: string;
  };
}

export const cookingMethods: CookingMethod[] = [
  {
    method: 'Pan Frying',
    bestFor: ['thin cuts of meat', 'fish fillets', 'eggs', 'vegetables'],
    equipment: ['heavy-bottomed skillet', 'spatula', 'tongs'],
    tips: [
      'Use medium-high heat',
      'Add oil when pan is hot',
      'Don\'t overcrowd the pan'
    ],
    temperature: {
      low: '250-300°F',
      medium: '300-350°F',
      high: '350-400°F'
    }
  },
  {
    method: 'Steaming',
    bestFor: ['vegetables', 'fish', 'dumplings', 'rice'],
    equipment: ['steamer basket', 'pot with lid', 'thermometer'],
    tips: [
      'Use just enough water',
      'Don\'t let water touch food',
      'Keep lid on tight'
    ]
  }
];

// Helper functions
export function findTimingGuide(item: string): any {
  return timingGuidelines
    .flatMap(cat => cat.items)
    .find(i => i.item.toLowerCase().includes(item.toLowerCase()));
}

export function getFlavorPairings(ingredient: string): FlavorCombination | undefined {
  return flavorCombinations.find(
    fc => fc.ingredient.toLowerCase() === ingredient.toLowerCase()
  );
}

export function getBestCookingMethod(food: string): CookingMethod | undefined {
  return cookingMethods.find(
    method => method.bestFor.some(item => 
      food.toLowerCase().includes(item.toLowerCase())
    )
  );
}

export function getSeasonalPairings(ingredient: string, season: keyof FlavorCombination['seasonalPairings']): string[] {
  const combo = getFlavorPairings(ingredient);
  return combo?.seasonalPairings[season] || [];
}

export function findTipsByCategory(category: CookingTip['category']): CookingTip[] {
  return cookingTips.filter(tip => tip.category === category);
}

export function findSubstitutesForIngredient(ingredient: string): IngredientSubstitution | undefined {
  return ingredientSubstitutions.find(
    sub => sub.ingredient.toLowerCase() === ingredient.toLowerCase()
  );
}

export function getTechniqueByDifficulty(difficulty: CookingTechnique['difficulty']): CookingTechnique[] {
  return cookingTechniques.filter(technique => technique.difficulty === difficulty);
}

export function findSolutionsForProblem(problem: string): CommonProblem | undefined {
  return commonProblems.find(
    p => p.problem.toLowerCase().includes(problem.toLowerCase())
  );
}

export function getRecipeGuidelines(aspect: string): RecipeGuideline | undefined {
  return recipeGuidelines.find(
    g => g.aspect.toLowerCase() === aspect.toLowerCase()
  );
} 