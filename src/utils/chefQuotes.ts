interface ChefQuote {
  quote: string;
  author: string;
  role: string;
}

export const chefQuotes: ChefQuote[] = [
  // Bourdain Quotes
  {
    quote: "Good food is very often, even most often, simple food.",
    author: "Anthony Bourdain",
    role: "Chef & Cultural Explorer"
  },
  {
    quote: "Context and memory play powerful roles in all the truly great meals in one's life.",
    author: "Anthony Bourdain",
    role: "Chef & Cultural Explorer"
  },
  {
    quote: "Skills can be taught. Character you either have or you don't have.",
    author: "Anthony Bourdain",
    role: "Chef & Cultural Explorer"
  },
  {
    quote: "Your body is not a temple, it's an amusement park. Enjoy the ride.",
    author: "Anthony Bourdain",
    role: "Chef & Cultural Explorer"
  },
  // Other Great Chefs
  {
    quote: "In cooking, as in all the arts, simplicity is the sign of perfection.",
    author: "Julia Child",
    role: "Legendary Chef & Author"
  },
  {
    quote: "The key to great cooking is not about the best recipe but about great ingredients.",
    author: "David Chang",
    role: "Chef & Restaurateur"
  },
  {
    quote: "Food is not just eating energy. It's an experience.",
    author: "Bobby Flay",
    role: "Chef & Television Personality"
  },
  {
    quote: "The secret of good cooking is, first, having the right ingredients.",
    author: "Alice Waters",
    role: "Chef & Food Activist"
  }
];

// Function to generate a random but consistent number for a given date
const getConsistentRandomNumber = (date: Date): number => {
  // Create a string from the date that only changes once per day
  const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  let hash = 0;
  
  // Simple string hashing
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  // Ensure positive number
  return Math.abs(hash);
};

export const getDailyChefQuote = (): ChefQuote => {
  // For now, just return the first Bourdain quote
  return chefQuotes[0];
}; 