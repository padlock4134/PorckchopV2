interface ChefLevelInfo {
  level: number;
  title: string;
  nextLevelRecipes: number;
  progress: number;
}

const CHEF_TITLES = [
  'Prep Cook',
  'Line Cook',
  'Sous Chef',
  'Chef de Partie',
  'Junior Chef',
  'Senior Chef',
  'Executive Chef',
  'Master Chef',
  'Elite Chef',
  'Legendary Chef'
];

export const calculateChefLevel = (recipesCreated: number): ChefLevelInfo => {
  // Level calculation formula:
  // Level 1: 0-2 recipes
  // Level 2: 3-5 recipes
  // Level 3: 6-9 recipes
  // Level 4: 10-14 recipes
  // And so on with increasing difficulty
  
  let level = 1;
  let recipesNeeded = 3;
  let accumulatedRecipes = 0;
  
  while (recipesCreated >= recipesNeeded + accumulatedRecipes && level < 20) {
    level++;
    accumulatedRecipes += recipesNeeded;
    recipesNeeded = Math.floor(2 + level * 1.5);
  }

  const recipesForNextLevel = recipesNeeded + accumulatedRecipes;
  const progress = ((recipesCreated - accumulatedRecipes) / recipesNeeded) * 100;

  return {
    level,
    title: CHEF_TITLES[Math.min(Math.floor((level - 1) / 2), CHEF_TITLES.length - 1)],
    nextLevelRecipes: recipesForNextLevel,
    progress: Math.min(Math.max(progress, 0), 100)
  };
};

export const getChefLevelColor = (level: number): string => {
  if (level >= 18) return 'text-purple-600 bg-purple-100'; // Legendary
  if (level >= 15) return 'text-indigo-600 bg-indigo-100'; // Elite
  if (level >= 12) return 'text-blue-600 bg-blue-100'; // Master
  if (level >= 9) return 'text-green-600 bg-green-100'; // Executive
  if (level >= 6) return 'text-yellow-600 bg-yellow-100'; // Senior
  if (level >= 3) return 'text-orange-600 bg-orange-100'; // Junior
  return 'text-gray-600 bg-gray-100'; // Beginner
}; 