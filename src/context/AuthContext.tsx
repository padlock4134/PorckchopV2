import React, { createContext, useContext, useState, useEffect } from 'react';

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
          // Handle migration of existing users
          if (parsedUser.name && !parsedUser.firstName) {
            const names = parsedUser.name.split(' ');
            parsedUser.firstName = names[0];
            parsedUser.lastName = names.slice(1).join(' ') || '';
            delete parsedUser.name;
            localStorage.setItem('user', JSON.stringify(parsedUser));
          }
          setUser(parsedUser);
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
      
      // For development: accept any credentials
      const names = email.split('@')[0].split('.');
      const mockUser: User = {
        id: 'user_1',
        email: email,
        firstName: names[0] || '',
        lastName: names[1] || '',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(names.join(' '))}`,
        recipesCreated: 0,
        subscriptionTier: 'el_dente' as const,
        socialLinks: {
          instagram: '',
          facebook: '',
          twitter: '',
          website: '',
          youtube: ''
        }
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
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
      
      // For development: create a mock user
      const mockUser: User = {
        id: 'user_1',
        email: email,
        firstName: firstName,
        lastName: lastName,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(`${firstName} ${lastName}`)}`,
        recipesCreated: 0,
        subscriptionTier: 'el_dente' as const,
        socialLinks: {
          instagram: '',
          facebook: '',
          twitter: '',
          website: '',
          youtube: ''
        }
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (err) {
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
      
      if (!user) throw new Error('No user logged in');
      
      const updatedUser = {
        ...user,
        ...updates,
        // Update avatar if name is being changed
        avatar: (updates.firstName || updates.lastName)
          ? `https://ui-avatars.com/api/?name=${encodeURIComponent(`${updates.firstName || user.firstName} ${updates.lastName || user.lastName}`)}`
          : user.avatar
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (err) {
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