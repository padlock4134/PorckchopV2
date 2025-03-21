import Papa from 'papaparse';

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  preparation?: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  cookingTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  imageUrl: string;
  ingredients: (string | Ingredient)[];
  instructions: string[];
  requiredCookware: string[];
  proteinTags: string[];
  veggieTags: string[];
  herbTags: string[];
  steps: string[];
  prepTime?: number;
  totalTime?: number;
  cuisine?: string;
  tags?: string[];
  equipment?: string[];
  nutritionInfo?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
}

// Keep our mock recipes as fallback
export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Classic Pork Chops',
    description: 'Juicy, tender pork chops with a perfect sear and delicious seasoning.',
    ingredients: [
      'pork-chop',
      'garlic',
      'rosemary',
      'black-pepper',
      'salt'
    ],
    instructions: [
      'Season pork chops',
      'Heat skillet',
      'Cook 4-5 minutes per side'
    ],
    cookingTime: 20,
    servings: 4,
    difficulty: 'medium',
    imageUrl: 'https://example.com/porkchop.jpg',
    requiredCookware: ['skillet', 'tongs'],
    proteinTags: ['pork'],
    veggieTags: [],
    herbTags: ['rosemary', 'garlic'],
    steps: [
      'Season pork chops',
      'Heat skillet',
      'Cook 4-5 minutes per side'
    ]
  }
];

export const parseCSVRecipes = async (): Promise<Recipe[]> => {
  try {
    console.log('Fetching recipe data...');
    const response = await fetch('/data/csv/recipes_rows.csv');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvData = await response.text();
    console.log('CSV data loaded, parsing...');
    
    const { data } = Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true
    });

    console.log('Parsed CSV data:', data.length, 'rows found');

    const validRecipes = data
      .filter((row: any): row is Recipe => {
        const isValid = row && 
               typeof row.id === 'string' &&
               typeof row.name === 'string' &&
               typeof row.description === 'string' &&
               typeof row.image_url === 'string' &&
               typeof row.ingredients === 'string' &&
               typeof row.steps === 'string' &&
               typeof row.cook_time === 'string' &&
               typeof row.prep_time === 'string' &&
               typeof row.servings === 'string' &&
               typeof row.required_cookware === 'string' &&
               typeof row.protein_tags === 'string' &&
               typeof row.veggie_tags === 'string' &&
               typeof row.herb_tags === 'string';

        if (!isValid) {
          console.warn('Invalid recipe row:', row);
        }
        return isValid;
      })
      .map((row: any): Recipe | null => {
        try {
          return {
            id: row.id,
            title: row.name,
            description: row.description,
            imageUrl: row.image_url,
            ingredients: JSON.parse(row.ingredients),
            instructions: JSON.parse(row.steps),
            cookingTime: parseInt(row.cook_time),
            servings: parseInt(row.servings),
            difficulty: 'medium', // Default difficulty
            requiredCookware: JSON.parse(row.required_cookware),
            proteinTags: JSON.parse(row.protein_tags),
            veggieTags: JSON.parse(row.veggie_tags),
            herbTags: JSON.parse(row.herb_tags),
            steps: JSON.parse(row.steps),
            prepTime: row.prep_time ? parseInt(row.prep_time) : undefined,
            totalTime: row.cook_time ? parseInt(row.cook_time) + (row.prep_time ? parseInt(row.prep_time) : 0) : undefined,
            cuisine: row.cuisine,
            tags: row.tags ? JSON.parse(row.tags) : undefined,
            equipment: row.equipment ? JSON.parse(row.equipment) : undefined,
            nutritionInfo: row.calories || row.protein || row.carbs || row.fat ? {
              calories: row.calories ? parseInt(row.calories) : undefined,
              protein: row.protein ? parseInt(row.protein) : undefined,
              carbs: row.carbs ? parseInt(row.carbs) : undefined,
              fat: row.fat ? parseInt(row.fat) : undefined
            } : undefined
          };
        } catch (e) {
          console.warn('Failed to parse recipe:', row);
          return null;
        }
      })
      .filter((recipe): recipe is Recipe => recipe !== null);

    console.log('Successfully loaded', validRecipes.length, 'recipes');
    return validRecipes;
  } catch (error) {
    console.error('Error loading recipes:', error);
    console.log('Falling back to mock recipes');
    return mockRecipes;
  }
};

export const normalizeIngredient = (ingredient: string | unknown): string => {
  if (typeof ingredient !== 'string') {
    console.warn('Received non-string ingredient:', ingredient);
    return '';
  }
  
  return ingredient.toLowerCase()
    .replace(/[0-9]+/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .split(' ')
    .filter(word => !['cup', 'cups', 'tablespoon', 'tablespoons', 'teaspoon', 'teaspoons', 
                      'pound', 'pounds', 'oz', 'ounce', 'ounces', 'lb', 'lbs', 'g', 'gram', 
                      'grams', 'ml', 'milliliter', 'milliliters', 'large', 'medium', 'small', 
                      'fresh', 'dried', 'piece', 'pieces', 'inch', 'inches'].includes(word))
    .join(' ');
}; 