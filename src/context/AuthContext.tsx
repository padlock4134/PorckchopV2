import React, { createContext, useContext, useState, useEffect } from 'react';
import { usersTable, type User as AirtableUser } from '../services/airtable';
import { FieldSet } from 'airtable';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  recipesCreated: number;
  subscriptionTier: 'rare' | 'el_dente';
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    website?: string;
    youtube?: string;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          // Verify user exists in Airtable
          const records = await usersTable.select({
            filterByFormula: `{Email} = '${parsedUser.email}'`
          }).firstPage();
          
          if (records.length > 0) {
            setUser(parsedUser);
          } else {
            // User not found in Airtable, clear local storage
            localStorage.removeItem('user');
          }
        }
      } catch (err) {
        console.error('Error checking auth:', err);
        setError('Failed to load user session');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Find user in Airtable
      const records = await usersTable.select({
        filterByFormula: `{Email} = '${email}'`
      }).firstPage();
      
      if (records.length === 0) {
        throw new Error('User not found');
      }

      const airtableUser = records[0].fields as unknown as AirtableUser;
      
      // Convert Airtable user to our User type
      const user: User = {
        id: records[0].id, // Use the record ID from Airtable
        email: airtableUser.Email,
        firstName: airtableUser['First Name'],
        lastName: airtableUser['Last Name'],
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(`${airtableUser['First Name']} ${airtableUser['Last Name']}`)}`,
        recipesCreated: 0, // We'll update this later
        subscriptionTier: airtableUser['Subscription Tier'].toLowerCase() as 'rare' | 'el_dente',
        socialLinks: {
          instagram: '',
          facebook: '',
          twitter: '',
          website: '',
          youtube: ''
        }
      };

      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Check if user already exists
      const existingRecords = await usersTable.select({
        filterByFormula: `{Email} = '${email}'`
      }).firstPage();
      
      if (existingRecords.length > 0) {
        throw new Error('User already exists');
      }

      const now = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

      console.log('Creating user with data:', {
        Email: email,
        'First Name': firstName,
        'Last Name': lastName,
        'Subscription Tier': 'Rare',
        'Subscription Status': 'Active',
        'Created At': now,
        'Last Updated': now
      });

      // Create new user in Airtable
      const record = await usersTable.create({
        Email: email,
        'First Name': firstName,
        'Last Name': lastName,
        'Subscription Tier': 'Rare',
        'Subscription Status': 'Active',
        'Created At': now,
        'Last Updated': now
      });

      console.log('Created record:', record);

      const airtableUser = record.fields as unknown as AirtableUser;
      
      // Convert Airtable user to our User type
      const user: User = {
        id: record.id, // Use the record ID from Airtable
        email: airtableUser.Email,
        firstName: airtableUser['First Name'],
        lastName: airtableUser['Last Name'],
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(`${airtableUser['First Name']} ${airtableUser['Last Name']}`)}`,
        recipesCreated: 0,
        subscriptionTier: airtableUser['Subscription Tier'].toLowerCase() as 'rare' | 'el_dente',
        socialLinks: {
          instagram: '',
          facebook: '',
          twitter: '',
          website: '',
          youtube: ''
        }
      };

      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
      console.error('Signup error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setUser(null);
      localStorage.removeItem('user');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!user?.id) {
        console.error('Current user:', user);
        throw new Error('No user logged in or invalid user ID');
      }
      
      console.log('Current user data:', user);
      console.log('Updating profile for user:', user.id);
      
      // Update user in Airtable
      const updateFields: Record<string, any> = {
        'Last Updated': new Date().toISOString().split('T')[0]
      };

      if (updates.firstName) updateFields['First Name'] = updates.firstName;
      if (updates.lastName) updateFields['Last Name'] = updates.lastName;

      console.log('Updating fields:', updateFields);
      
      try {
        await usersTable.update(user.id, updateFields);
        console.log('Successfully updated user in Airtable');
      } catch (updateError) {
        console.error('Airtable update error:', updateError);
        throw updateError;
      }
      
      const updatedUser = {
        ...user,
        ...updates,
        avatar: (updates.firstName || updates.lastName)
          ? `https://ui-avatars.com/api/?name=${encodeURIComponent(`${updates.firstName || user.firstName} ${updates.lastName || user.lastName}`)}`
          : user.avatar
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (err) {
      console.error('Profile update error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    error,
    login,
    signup,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider }; 