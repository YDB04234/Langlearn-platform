import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Language, Level } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, nickname: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  setCurrentLanguage: (language: Language) => void;
  setCurrentLevel: (level: Level) => void;
  addXP: (amount: number) => void;
  updateStreak: () => void;
}

const defaultUser: User = {
  id: 'user-1',
  email: 'demo@linguaflow.com',
  nickname: '语言爱好者',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  role: 'user',
  preferredLanguages: ['english', 'japanese'],
  currentLanguage: 'english',
  currentLevel: 'A2',
  createdAt: '2024-01-15',
  streak: 7,
  totalXP: 1250,
  level: 5,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (email && password) {
          set({ 
            user: { ...defaultUser, email }, 
            isAuthenticated: true, 
            isLoading: false 
          });
          return true;
        }
        set({ isLoading: false });
        return false;
      },

      register: async (email: string, nickname: string, password: string) => {
        set({ isLoading: true });
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (email && nickname && password) {
          const newUser: User = {
            ...defaultUser,
            id: `user-${Date.now()}`,
            email,
            nickname,
            createdAt: new Date().toISOString(),
            streak: 0,
            totalXP: 0,
            level: 1,
          };
          set({ user: newUser, isAuthenticated: true, isLoading: false });
          return true;
        }
        set({ isLoading: false });
        return false;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateUser: (updates) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...updates } });
        }
      },

      setCurrentLanguage: (language) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, currentLanguage: language } });
        }
      },

      setCurrentLevel: (level) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, currentLevel: level } });
        }
      },

      addXP: (amount) => {
        const { user } = get();
        if (user) {
          const newXP = user.totalXP + amount;
          const newLevel = Math.floor(newXP / 500) + 1;
          set({ user: { ...user, totalXP: newXP, level: newLevel } });
        }
      },

      updateStreak: () => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, streak: user.streak + 1 } });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
