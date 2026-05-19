import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Achievement, UserAchievement } from '../types';
import { mockAchievements } from '../data/mockData';

interface AchievementState {
  achievements: Achievement[];
  userAchievements: UserAchievement[];
  isLoading: boolean;
  
  checkAndUnlock: (type: string, value: number) => Achievement | null;
  getProgress: (achievementId: string) => number;
  getUnlockedAchievements: () => Achievement[];
  getLockedAchievements: () => Achievement[];
  getAchievementsByCategory: (category: string) => Achievement[];
}

export const useAchievementStore = create<AchievementState>()(
  persist(
    (set, get) => ({
      achievements: mockAchievements,
      userAchievements: [],
      isLoading: false,

      checkAndUnlock: (type, value) => {
        const { achievements, userAchievements } = get();
        const achievement = achievements.find(
          a => a.requirement.type === type && 
               a.requirement.value <= value &&
               !userAchievements.find(ua => ua.achievementId === a.id)
        );

        if (achievement) {
          const newUserAchievement: UserAchievement = {
            achievementId: achievement.id,
            userId: 'user-1',
            unlockedAt: new Date().toISOString(),
          };
          
          set({
            userAchievements: [...userAchievements, newUserAchievement],
            achievements: achievements.map(a => 
              a.id === achievement.id 
                ? { ...a, progress: a.requirement.value } 
                : a
            ),
          });
          
          return achievement;
        }
        return null;
      },

      getProgress: (achievementId) => {
        const { achievements } = get();
        const achievement = achievements.find(a => a.id === achievementId);
        return achievement?.progress || 0;
      },

      getUnlockedAchievements: () => {
        const { achievements, userAchievements } = get();
        const unlockedIds = userAchievements.map(ua => ua.achievementId);
        return achievements.filter(a => unlockedIds.includes(a.id));
      },

      getLockedAchievements: () => {
        const { achievements, userAchievements } = get();
        const unlockedIds = userAchievements.map(ua => ua.achievementId);
        return achievements.filter(a => !unlockedIds.includes(a.id));
      },

      getAchievementsByCategory: (category) => {
        return get().achievements.filter(a => a.category === category);
      },
    }),
    {
      name: 'achievement-storage',
    }
  )
);
