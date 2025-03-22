import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';

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
  startDate: Date;
  endDate: Date;
}

interface ChallengeContextType {
  activeChallenges: Challenge[];
  joinedChallenges: string[];
  joinChallenge: (challengeId: string) => Promise<void>;
  leaveChallenge: (challengeId: string) => Promise<void>;
  submitChallengeEntry: (challengeId: string, entry: { photo: string; description: string }) => Promise<void>;
}

const ChallengeContext = createContext<ChallengeContextType | undefined>(undefined);

const sampleChallenges: Challenge[] = [
  {
    id: 'weekly-knife-skills',
    title: 'Weekly Knife Skills Challenge',
    description: 'Master your knife skills with this weekly challenge. Practice different cutting techniques and share your progress.',
    difficulty: 'beginner',
    duration: '1 week',
    rewards: {
      points: 100,
      badges: ['knife-master']
    },
    requirements: [
      'Practice at least 3 different cutting techniques',
      'Share a photo of your cuts',
      'Document your learning process'
    ],
    tips: [
      'Start with basic cuts like dicing and slicing',
      'Keep your knives sharp',
      'Practice proper knife grip'
    ],
    emoji: '🔪',
    color: 'bg-blue-500',
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 1 week from now
  },
  {
    id: 'perfect-pasta',
    title: 'Perfect Pasta Challenge',
    description: 'Create the perfect homemade pasta from scratch. Share your recipe and photos of the process.',
    difficulty: 'intermediate',
    duration: '2 weeks',
    rewards: {
      points: 200,
      badges: ['pasta-master']
    },
    requirements: [
      'Make pasta from scratch',
      'Share photos of the process',
      'Include your recipe'
    ],
    tips: [
      'Use 00 flour for best results',
      'Rest your dough properly',
      'Roll pasta sheets evenly'
    ],
    emoji: '🍝',
    color: 'bg-yellow-500',
    startDate: new Date(),
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 2 weeks from now
  }
];

export const ChallengeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [activeChallenges, setActiveChallenges] = useState<Challenge[]>(sampleChallenges);
  const [joinedChallenges, setJoinedChallenges] = useState<string[]>([]);

  const joinChallenge = async (challengeId: string) => {
    if (!user) {
      throw new Error('You must be logged in to join challenges');
    }

    // Here you would typically make an API call to join the challenge
    // For now, we'll just update the local state
    setJoinedChallenges(prev => [...prev, challengeId]);
  };

  const leaveChallenge = async (challengeId: string) => {
    if (!user) {
      throw new Error('You must be logged in to leave challenges');
    }

    // Here you would typically make an API call to leave the challenge
    // For now, we'll just update the local state
    setJoinedChallenges(prev => prev.filter(id => id !== challengeId));
  };

  const submitChallengeEntry = async (challengeId: string, entry: { photo: string; description: string }) => {
    if (!user) {
      throw new Error('You must be logged in to submit entries');
    }

    // Here you would typically make an API call to submit the entry
    // For now, we'll just log the submission
    console.log('Submitting entry for challenge:', challengeId, entry);
  };

  return (
    <ChallengeContext.Provider
      value={{
        activeChallenges,
        joinedChallenges,
        joinChallenge,
        leaveChallenge,
        submitChallengeEntry
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
};

export const useChallenge = () => {
  const context = useContext(ChallengeContext);
  if (context === undefined) {
    throw new Error('useChallenge must be used within a ChallengeProvider');
  }
  return context;
}; 