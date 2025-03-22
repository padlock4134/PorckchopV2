import Airtable from 'airtable';

// Initialize Airtable
const base = new Airtable({
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY
}).base(import.meta.env.VITE_AIRTABLE_BASE_ID);

// Type definitions
export interface User {
  id: string;
  Email: string;
  'First Name': string;
  'Last Name': string;
  'Subscription Tier': string;
  'Subscription Status': string;
  'Created At': string;
  'Last Updated': string;
}

export interface Subscription {
  id: string;
  userId: string;
  tier: 'Rare' | 'El Dente';
  status: 'Active' | 'Inactive';
  startDate: string;
  endDate: string;
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  createdAt: string;
  lastUpdated: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  createdBy: string;
  createdAt: string;
  lastUpdated: string;
  isPublic: boolean;
  imageUrl?: string; // Optional field for recipe images
}

// Table references
const usersTable = base('Users');
const subscriptionsTable = base('Subscriptions');
const recipesTable = base('Recipes');

// Test function to verify Airtable connection
export const testAirtableConnection = async (): Promise<boolean> => {
  try {
    // Try to fetch one record from each table
    await Promise.all([
      usersTable.select({ maxRecords: 1 }).firstPage(),
      subscriptionsTable.select({ maxRecords: 1 }).firstPage(),
      recipesTable.select({ maxRecords: 1 }).firstPage()
    ]);
    return true;
  } catch (error) {
    console.error('Airtable connection error:', error);
    return false;
  }
};

// Export table references
export {
  usersTable,
  subscriptionsTable,
  recipesTable
}; 