export interface CookingTip {
  title: string;
  content: string;
  icon: string;
  category: 'Safety' | 'Preparation' | 'Cutting' | 'Cooking' | 'Storage' | 'Equipment' | 'Technique' | 'General';
}

export const cookingTips: CookingTip[] = [
  // Safety Tips
  {
    title: "Knife Safety",
    content: "Always keep your fingers tucked under when cutting - this creates a 'claw grip' that protects your fingertips while maintaining control.",
    icon: "🔪",
    category: "Safety"
  },
  {
    title: "Hand Washing",
    content: "Wash your hands for at least 20 seconds before and after handling raw ingredients, especially meat.",
    icon: "🧼",
    category: "Safety"
  },
  {
    title: "Cross Contamination",
    content: "Use separate cutting boards for raw meat and vegetables to prevent cross-contamination.",
    icon: "⚠️",
    category: "Safety"
  },
  {
    title: "Temperature Safety",
    content: "Keep your refrigerator below 40°F (4°C) to prevent bacterial growth in perishable foods.",
    icon: "🌡️",
    category: "Safety"
  },
  {
    title: "Fire Safety",
    content: "Never leave cooking food unattended, and keep a fire extinguisher in your kitchen.",
    icon: "🔥",
    category: "Safety"
  },
  {
    title: "Clean As You Go",
    content: "Clean up spills immediately to prevent slips and maintain a safe workspace.",
    icon: "🧹",
    category: "Safety"
  },
  {
    title: "Oil Safety",
    content: "Never add water to hot oil - it can cause dangerous splattering. Always pat ingredients dry before adding to hot oil.",
    icon: "🛢️",
    category: "Safety"
  },
  {
    title: "Hot Pan Safety",
    content: "Always use oven mitts or pot holders when handling hot pans, and keep handles turned inward on the stove.",
    icon: "🧤",
    category: "Safety"
  },
  {
    title: "Food Allergies",
    content: "Always check ingredient labels and inform guests of potential allergens in your dishes.",
    icon: "⚠️",
    category: "Safety"
  },
  {
    title: "Sharp Knives",
    content: "A sharp knife is safer than a dull one - it requires less force and is less likely to slip.",
    icon: "⚡",
    category: "Safety"
  },

  // Preparation Tips
  {
    title: "Mise en Place",
    content: "Prepare and organize all ingredients before starting to cook - this makes the cooking process smoother and safer.",
    icon: "📋",
    category: "Preparation"
  },
  {
    title: "Ingredient Temperature",
    content: "Let ingredients come to room temperature before cooking for more even results.",
    icon: "🌡️",
    category: "Preparation"
  },
  {
    title: "Washing Produce",
    content: "Always wash fruits and vegetables under running water before cutting or cooking.",
    icon: "🥬",
    category: "Preparation"
  },
  {
    title: "Meat Preparation",
    content: "Pat meat dry with paper towels before seasoning and cooking for better browning.",
    icon: "🥩",
    category: "Preparation"
  },
  {
    title: "Herb Storage",
    content: "Store fresh herbs in a glass of water in the refrigerator to keep them fresh longer.",
    icon: "🌿",
    category: "Preparation"
  },
  {
    title: "Garlic Prep",
    content: "Crush garlic cloves with the flat side of a knife before mincing to release more flavor.",
    icon: "🧄",
    category: "Preparation"
  },
  {
    title: "Onion Prep",
    content: "Chill onions in the refrigerator for 30 minutes before cutting to reduce tears.",
    icon: "🧅",
    category: "Preparation"
  },
  {
    title: "Egg Separation",
    content: "Use an empty water bottle to easily separate egg yolks from whites - squeeze the bottle over the yolk to suck it up.",
    icon: "🥚",
    category: "Preparation"
  },
  {
    title: "Butter Softening",
    content: "Cut butter into small cubes to speed up the softening process when baking.",
    icon: "🧈",
    category: "Preparation"
  },
  {
    title: "Spice Storage",
    content: "Store spices in a cool, dark place and replace them every 6-12 months for maximum flavor.",
    icon: "🌶️",
    category: "Preparation"
  },

  // Cutting Tips
  {
    title: "Proper Cutting Board",
    content: "Use a damp paper towel under your cutting board to prevent it from slipping while you work.",
    icon: "🪑",
    category: "Cutting"
  },
  {
    title: "Knife Sharpening",
    content: "Sharpen your knives regularly using a whetstone or honing steel for best results.",
    icon: "⚡",
    category: "Cutting"
  },
  {
    title: "Julienne Cut",
    content: "For perfect julienne cuts, first slice the ingredient into thin planks, then stack and cut into matchsticks.",
    icon: "🥕",
    category: "Cutting"
  },
  {
    title: "Dice Technique",
    content: "For consistent dicing, first cut the ingredient into strips, then rotate 90 degrees and cut into cubes.",
    icon: "🎲",
    category: "Cutting"
  },
  {
    title: "Herb Cutting",
    content: "Stack herbs like basil or mint leaves and roll them before cutting for a fine chiffonade.",
    icon: "🌿",
    category: "Cutting"
  },
  {
    title: "Tomato Cutting",
    content: "Use a serrated knife for cutting tomatoes to prevent crushing and maintain clean edges.",
    icon: "🍅",
    category: "Cutting"
  },
  {
    title: "Onion Cutting",
    content: "Leave the root end intact when cutting onions to minimize tears and keep the layers together.",
    icon: "🧅",
    category: "Cutting"
  },
  {
    title: "Garlic Cutting",
    content: "Use a garlic press for quick mincing, or smash with the flat side of a knife for more flavor.",
    icon: "🧄",
    category: "Cutting"
  },
  {
    title: "Meat Cutting",
    content: "Cut meat against the grain for tenderness, and use a sharp knife to maintain clean cuts.",
    icon: "🥩",
    category: "Cutting"
  },
  {
    title: "Fruit Cutting",
    content: "Use a sharp paring knife for precise fruit cutting and always cut away from yourself.",
    icon: "🍎",
    category: "Cutting"
  },

  // Cooking Tips
  {
    title: "Pan Temperature",
    content: "Heat your pan before adding oil to prevent food from sticking and ensure even cooking.",
    icon: "🔥",
    category: "Cooking"
  },
  {
    title: "Seasoning",
    content: "Season food in layers - add some salt during cooking and adjust at the end for perfect seasoning.",
    icon: "🧂",
    category: "Cooking"
  },
  {
    title: "Resting Meat",
    content: "Let meat rest for 5-10 minutes after cooking to allow juices to redistribute.",
    icon: "🥩",
    category: "Cooking"
  },
  {
    title: "Pasta Water",
    content: "Salt pasta water generously - it should taste like the sea for properly seasoned pasta.",
    icon: "🍝",
    category: "Cooking"
  },
  {
    title: "Rice Cooking",
    content: "Let rice rest for 10 minutes after cooking, then fluff with a fork for perfect texture.",
    icon: "🍚",
    category: "Cooking"
  },
  {
    title: "Egg Cooking",
    content: "For perfect scrambled eggs, cook them slowly over low heat and stir constantly.",
    icon: "🥚",
    category: "Cooking"
  },
  {
    title: "Vegetable Cooking",
    content: "Cook vegetables until they're just tender-crisp to maintain nutrients and texture.",
    icon: "🥬",
    category: "Cooking"
  },
  {
    title: "Sauce Thickening",
    content: "Mix cornstarch with cold water before adding to hot liquids to prevent lumps.",
    icon: "🥣",
    category: "Cooking"
  },
  {
    title: "Baking Temperature",
    content: "Always preheat your oven for at least 15 minutes before baking for consistent results.",
    icon: "🔥",
    category: "Cooking"
  },
  {
    title: "Stir-Frying",
    content: "Keep ingredients moving in the pan and cook over high heat for proper stir-frying.",
    icon: "🥘",
    category: "Cooking"
  },

  // Storage Tips
  {
    title: "Herb Storage",
    content: "Store fresh herbs in a glass of water in the refrigerator to keep them fresh longer.",
    icon: "🌿",
    category: "Storage"
  },
  {
    title: "Produce Storage",
    content: "Store fruits and vegetables separately - some fruits release ethylene gas that can spoil vegetables.",
    icon: "🥬",
    category: "Storage"
  },
  {
    title: "Meat Storage",
    content: "Store raw meat on the bottom shelf of the refrigerator to prevent cross-contamination.",
    icon: "🥩",
    category: "Storage"
  },
  {
    title: "Spice Storage",
    content: "Keep spices in airtight containers away from heat and light for maximum freshness.",
    icon: "🌶️",
    category: "Storage"
  },
  {
    title: "Oil Storage",
    content: "Store cooking oils in a cool, dark place to prevent rancidity.",
    icon: "🛢️",
    category: "Storage"
  },
  {
    title: "Egg Storage",
    content: "Store eggs in their original carton on a refrigerator shelf, not in the door.",
    icon: "🥚",
    category: "Storage"
  },
  {
    title: "Cheese Storage",
    content: "Wrap cheese in wax paper or parchment paper, then in plastic wrap for optimal storage.",
    icon: "🧀",
    category: "Storage"
  },
  {
    title: "Bread Storage",
    content: "Store bread at room temperature in a bread box or paper bag to maintain freshness.",
    icon: "🍞",
    category: "Storage"
  },
  {
    title: "Freezer Storage",
    content: "Label and date all items stored in the freezer for better organization.",
    icon: "❄️",
    category: "Storage"
  },
  {
    title: "Leftover Storage",
    content: "Cool hot food quickly before refrigerating to prevent bacterial growth.",
    icon: "🍱",
    category: "Storage"
  },

  // Equipment Tips
  {
    title: "Knife Maintenance",
    content: "Regularly hone your knives with a steel and sharpen them with a whetstone when needed.",
    icon: "🔪",
    category: "Equipment"
  },
  {
    title: "Pan Care",
    content: "Never use metal utensils on non-stick pans to prevent scratching the coating.",
    icon: "🍳",
    category: "Equipment"
  },
  {
    title: "Cast Iron Care",
    content: "Season cast iron pans regularly with oil and avoid using soap when cleaning.",
    icon: "🥘",
    category: "Equipment"
  },
  {
    title: "Blender Care",
    content: "Clean your blender immediately after use by filling with warm water and a drop of soap, then blending.",
    icon: "🧃",
    category: "Equipment"
  },
  {
    title: "Oven Care",
    content: "Clean your oven regularly to prevent smoke and maintain consistent temperatures.",
    icon: "🔥",
    category: "Equipment"
  },
  {
    title: "Food Processor",
    content: "Keep your food processor blade sharp by avoiding hard ingredients and cleaning properly.",
    icon: "⚡",
    category: "Equipment"
  },
  {
    title: "Stand Mixer",
    content: "Start mixing on low speed to prevent ingredients from splattering.",
    icon: "🥣",
    category: "Equipment"
  },
  {
    title: "Grill Care",
    content: "Clean your grill grates while they're still warm for easier maintenance.",
    icon: "🔥",
    category: "Equipment"
  },
  {
    title: "Thermometer Care",
    content: "Calibrate your food thermometer regularly for accurate temperature readings.",
    icon: "🌡️",
    category: "Equipment"
  },
  {
    title: "Cutting Board Care",
    content: "Oil wooden cutting boards regularly with food-safe mineral oil to prevent cracking.",
    icon: "🪑",
    category: "Equipment"
  },

  // Technique Tips
  {
    title: "Deglazing",
    content: "Use wine, broth, or water to deglaze your pan after cooking meat for flavorful sauces.",
    icon: "🍷",
    category: "Technique"
  },
  {
    title: "Braising",
    content: "Brown meat before braising to develop deep flavor in the final dish.",
    icon: "🥘",
    category: "Technique"
  },
  {
    title: "Sautéing",
    content: "Keep ingredients moving in the pan and maintain high heat for proper sautéing.",
    icon: "🍳",
    category: "Technique"
  },
  {
    title: "Roasting",
    content: "Use a rack when roasting meat to allow air circulation and even cooking.",
    icon: "🔥",
    category: "Technique"
  },
  {
    title: "Steaming",
    content: "Don't let vegetables touch the water when steaming - use a steamer basket.",
    icon: "🥬",
    category: "Technique"
  },
  {
    title: "Poaching",
    content: "Keep poaching liquid at a gentle simmer, not a boil, for tender results.",
    icon: "🥚",
    category: "Technique"
  },
  {
    title: "Grilling",
    content: "Oil your grill grates before heating to prevent food from sticking.",
    icon: "🔥",
    category: "Technique"
  },
  {
    title: "Baking",
    content: "Rotate pans halfway through baking for even browning.",
    icon: "🍪",
    category: "Technique"
  },
  {
    title: "Frying",
    content: "Maintain consistent oil temperature when deep frying for crispy results.",
    icon: "🍗",
    category: "Technique"
  },
  {
    title: "Sous Vide",
    content: "Always vacuum seal food properly before sous vide cooking.",
    icon: "🥩",
    category: "Technique"
  },

  // General Tips
  {
    title: "Taste Testing",
    content: "Taste your food throughout the cooking process to ensure proper seasoning.",
    icon: "👅",
    category: "General"
  },
  {
    title: "Recipe Reading",
    content: "Read through the entire recipe before starting to cook.",
    icon: "📖",
    category: "General"
  },
  {
    title: "Ingredient Substitution",
    content: "Know common ingredient substitutions for when you're missing something.",
    icon: "🔄",
    category: "General"
  },
  {
    title: "Time Management",
    content: "Start with the longest-cooking items first when preparing multiple dishes.",
    icon: "⏰",
    category: "General"
  },
  {
    title: "Clean Kitchen",
    content: "Clean as you go to maintain an organized workspace.",
    icon: "🧹",
    category: "General"
  },
  {
    title: "Temperature Control",
    content: "Learn to control heat levels on your stove for different cooking methods.",
    icon: "🌡️",
    category: "General"
  },
  {
    title: "Flavor Building",
    content: "Layer flavors by adding ingredients at the right time during cooking.",
    icon: "👨‍🍳",
    category: "General"
  },
  {
    title: "Portion Control",
    content: "Use a kitchen scale for accurate measurements and consistent results.",
    icon: "⚖️",
    category: "General"
  },
  {
    title: "Recipe Notes",
    content: "Keep notes on successful recipes and what you'd change next time.",
    icon: "📝",
    category: "General"
  },
  {
    title: "Kitchen Organization",
    content: "Keep frequently used items within easy reach in your kitchen.",
    icon: "🏠",
    category: "General"
  }
]; 