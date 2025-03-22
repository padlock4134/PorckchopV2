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

interface TutorialCategory {
  name: string;
  color: string;
  series: {
    basic: Tutorial[];
    intermediate: Tutorial[];
    advanced: Tutorial[];
  };
}

interface Tutorial {
  title: string;
  description: string;
  emoji: string;
  color: string;
}

export const tutorialCategories: TutorialCategory[] = [
  {
    name: 'Cooking Methods',
    color: 'orange',
    series: {
      basic: [
        {
          title: 'Pan Frying & Sautéing',
          description: 'Master the fundamentals of pan cooking techniques.',
          emoji: '🍳',
          color: 'orange'
        },
        {
          title: 'Boiling & Simmering',
          description: 'Learn proper water-based cooking methods.',
          emoji: '🥘',
          color: 'orange'
        }
      ],
      intermediate: [
        {
          title: 'Braising & Stewing',
          description: 'Perfect slow-cooking methods for tender results.',
          emoji: '🍖',
          color: 'orange'
        },
        {
          title: 'Roasting & Baking',
          description: 'Master dry heat cooking techniques.',
          emoji: '🔥',
          color: 'orange'
        }
      ],
      advanced: [
        {
          title: 'Sous Vide Cooking',
          description: 'Learn precision temperature cooking.',
          emoji: '🌡️',
          color: 'orange'
        },
        {
          title: 'Smoking & Grilling',
          description: 'Master outdoor and smoke cooking techniques.',
          emoji: '🌫️',
          color: 'orange'
        }
      ]
    }
  },
  {
    name: 'Food Safety',
    color: 'blue',
    series: {
      basic: [
        {
          title: 'Temperature Control: The Danger Zone',
          description: 'Understanding safe temperature ranges and proper thermometer usage.',
          emoji: '🌡️',
          color: 'blue'
        },
        {
          title: 'Cross-Contamination Prevention',
          description: 'Learn how to prevent foodborne illness through proper handling.',
          emoji: '⚠️',
          color: 'blue'
        }
      ],
      intermediate: [
        {
          title: 'Proper Hand Washing & Sanitization',
          description: 'Master the WHO hand washing technique and kitchen sanitization.',
          emoji: '🧼',
          color: 'blue'
        },
        {
          title: 'Ingredient Storage & Shelf Life',
          description: 'Learn proper storage techniques for different types of ingredients.',
          emoji: '📦',
          color: 'blue'
        }
      ],
      advanced: [
        {
          title: 'Allergen Management',
          description: 'Prevent cross-contact and handle food allergies safely.',
          emoji: '⚠️',
          color: 'blue'
        },
        {
          title: 'Emergency Response',
          description: 'Learn first aid basics and kitchen emergency procedures.',
          emoji: '🚨',
          color: 'blue'
        }
      ]
    }
  },
  {
    name: 'Knife Skills',
    color: 'porkchop',
    series: {
      basic: [
        {
          title: 'How to Hold a Knife Like a Pro',
          description: 'Master the fundamental grip techniques used by professional chefs.',
          emoji: '🔪',
          color: 'porkchop'
        },
        {
          title: 'Basic Cuts: Dice, Slice, Chop',
          description: 'Learn the essential cutting techniques every home chef needs.',
          emoji: '✂️',
          color: 'porkchop'
        }
      ],
      intermediate: [
        {
          title: 'Julienne & Batonnet: Perfect Matchsticks',
          description: 'Create uniform matchstick cuts for stir-fries and salads.',
          emoji: '🥕',
          color: 'porkchop'
        },
        {
          title: 'Chiffonade: Beautiful Herbs & Greens',
          description: 'Master the art of cutting herbs and leafy greens into ribbons.',
          emoji: '🌿',
          color: 'porkchop'
        }
      ],
      advanced: [
        {
          title: 'Tourné: The Art of the Turned Cut',
          description: 'Learn the classic French technique for cutting vegetables into football shapes.',
          emoji: '🥔',
          color: 'porkchop'
        },
        {
          title: 'Speed Slicing: Professional Efficiency',
          description: 'Increase your cutting speed while maintaining precision and safety.',
          emoji: '⚡',
          color: 'porkchop'
        }
      ]
    }
  },
  {
    name: 'Prep & Storage',
    color: 'green',
    series: {
      basic: [
        {
          title: 'Proper Produce Washing',
          description: 'Learn the correct way to wash and prepare different types of produce.',
          emoji: '🥬',
          color: 'green'
        },
        {
          title: 'Freezing Techniques',
          description: 'Master the art of freezing ingredients while maintaining quality.',
          emoji: '🧊',
          color: 'green'
        }
      ],
      intermediate: [
        {
          title: 'Meat Preparation & Storage',
          description: 'Proper techniques for handling and storing different cuts of meat.',
          emoji: '🥩',
          color: 'green'
        },
        {
          title: 'Wine & Ingredient Pairing',
          description: 'Learn how to pair ingredients with wines for optimal flavor.',
          emoji: '🍷',
          color: 'green'
        }
      ],
      advanced: [
        {
          title: 'Dry Aging & Curing',
          description: 'Advanced techniques for aging and curing meats at home.',
          emoji: '🍖',
          color: 'green'
        },
        {
          title: 'Herb & Spice Preservation',
          description: 'Methods for preserving and storing fresh herbs and spices.',
          emoji: '🌿',
          color: 'green'
        }
      ]
    }
  },
  {
    name: 'Seasoning & Rubs',
    color: 'purple',
    series: {
      basic: [
        {
          title: 'Salt & Pepper Fundamentals',
          description: 'Master the art of basic seasoning with salt and pepper.',
          emoji: '🧂',
          color: 'purple'
        },
        {
          title: 'Herb & Spice Basics',
          description: 'Learn to use common herbs and spices effectively.',
          emoji: '🌶️',
          color: 'purple'
        }
      ],
      intermediate: [
        {
          title: 'Meat Rubs & Marinades',
          description: 'Create flavorful rubs and marinades for different cuts of meat.',
          emoji: '🥩',
          color: 'purple'
        },
        {
          title: 'Herb Blends & Mixes',
          description: 'Learn to create custom herb blends for different cuisines.',
          emoji: '🌿',
          color: 'purple'
        }
      ],
      advanced: [
        {
          title: 'Complex Spice Blends',
          description: 'Create sophisticated spice blends from around the world.',
          emoji: '🔥',
          color: 'purple'
        },
        {
          title: 'Advanced Seasoning Techniques',
          description: 'Master advanced seasoning methods for professional results.',
          emoji: '⚡',
          color: 'purple'
        }
      ]
    }
  }
];

// Helper function to find tutorials by category
export function findTutorialsByCategory(categoryName: string): TutorialCategory | undefined {
  return tutorialCategories.find(
    category => category.name.toLowerCase() === categoryName.toLowerCase()
  );
}

// Helper function to find tutorials by difficulty level
export function findTutorialsByDifficulty(difficulty: 'basic' | 'intermediate' | 'advanced'): Tutorial[] {
  return tutorialCategories.flatMap(category => category.series[difficulty]);
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  rewards: {
    points: number;
    badges?: string[];
  };
  requirements: string[];
  tips: string[];
  emoji: string;
  color: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'cooking' | 'social' | 'learning' | 'special';
  points: number;
  requirements: string[];
  badge: {
    name: string;
    emoji: string;
    color: string;
  };
}

interface CommunityFeature {
  name: string;
  description: string;
  benefits: string[];
  howTo: string[];
  emoji: string;
  color: string;
}

export const chefCornerChallenges: Challenge[] = [
  {
    id: 'weekly-knife-skills',
    title: 'Weekly Knife Skills Challenge',
    description: 'Master a new knife technique each week and share your progress.',
    difficulty: 'intermediate',
    duration: '7 days',
    rewards: {
      points: 500,
      badges: ['Knife Master']
    },
    requirements: [
      'Complete the assigned knife technique tutorial',
      'Share a photo of your practice results',
      'Get feedback from other chefs'
    ],
    tips: [
      'Practice daily for best results',
      'Record your progress with photos',
      'Ask for tips from experienced chefs'
    ],
    emoji: '🔪',
    color: 'porkchop'
  },
  {
    id: 'safety-first',
    title: 'Food Safety Certification',
    description: 'Complete all food safety tutorials and pass the certification quiz.',
    difficulty: 'beginner',
    duration: '14 days',
    rewards: {
      points: 1000,
      badges: ['Safety Expert']
    },
    requirements: [
      'Complete all food safety tutorials',
      'Pass the certification quiz with 90% or higher',
      'Share your certification badge'
    ],
    tips: [
      'Take notes during tutorials',
      'Practice safety techniques in your kitchen',
      'Review before the quiz'
    ],
    emoji: '⚠️',
    color: 'blue'
  }
];

export const chefCornerAchievements: Achievement[] = [
  {
    id: 'tutorial-master',
    title: 'Tutorial Master',
    description: 'Complete all tutorials in a category',
    category: 'learning',
    points: 2000,
    requirements: [
      'Complete all basic tutorials',
      'Complete all intermediate tutorials',
      'Complete all advanced tutorials'
    ],
    badge: {
      name: 'Tutorial Master',
      emoji: '🎓',
      color: 'purple'
    }
  },
  {
    id: 'community-helper',
    title: 'Community Helper',
    description: 'Help other chefs by providing constructive feedback',
    category: 'social',
    points: 1000,
    requirements: [
      'Provide feedback on 10 tutorial submissions',
      'Get positive ratings from other chefs',
      'Share helpful tips in the community'
    ],
    badge: {
      name: 'Community Helper',
      emoji: '🤝',
      color: 'green'
    }
  },
  {
    id: 'challenge-champion',
    title: 'Challenge Champion',
    description: 'Win three consecutive weekly challenges',
    category: 'cooking',
    points: 3000,
    requirements: [
      'Win three challenges in a row',
      'Share your winning submissions',
      'Help others with their submissions'
    ],
    badge: {
      name: 'Challenge Champion',
      emoji: '🏆',
      color: 'gold'
    }
  }
];

export const communityFeatures: CommunityFeature[] = [
  {
    name: 'Chef Profiles',
    description: 'Create and customize your chef profile to showcase your skills and achievements.',
    benefits: [
      'Display your cooking journey',
      'Share your favorite recipes',
      'Connect with other chefs'
    ],
    howTo: [
      'Complete your profile information',
      'Add your cooking photos',
      'Share your achievements'
    ],
    emoji: '👨‍🍳',
    color: 'porkchop'
  },
  {
    name: 'Cooking Groups',
    description: 'Join or create cooking groups based on interests, cuisines, or skill levels.',
    benefits: [
      'Learn from like-minded chefs',
      'Share experiences and tips',
      'Organize cooking events'
    ],
    howTo: [
      'Browse existing groups',
      'Create your own group',
      'Invite other chefs to join'
    ],
    emoji: '👥',
    color: 'blue'
  },
  {
    name: 'Photo Sharing',
    description: 'Share your cooking journey with photos of your dishes and techniques.',
    benefits: [
      'Get feedback from other chefs',
      'Document your progress',
      'Inspire others'
    ],
    howTo: [
      'Upload high-quality photos',
      'Add descriptions and tips',
      'Engage with other posts'
    ],
    emoji: '📸',
    color: 'green'
  }
];

// Helper function to find challenges by difficulty
export function findChallengesByDifficulty(difficulty: Challenge['difficulty']): Challenge[] {
  return chefCornerChallenges.filter(challenge => challenge.difficulty === difficulty);
}

// Helper function to find achievements by category
export function findAchievementsByCategory(category: Achievement['category']): Achievement[] {
  return chefCornerAchievements.filter(achievement => achievement.category === category);
}

// Helper function to find community features by name
export function findCommunityFeature(name: string): CommunityFeature | undefined {
  return communityFeatures.find(feature => 
    feature.name.toLowerCase() === name.toLowerCase()
  );
} 