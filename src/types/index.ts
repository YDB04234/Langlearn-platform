export type Language = 'english' | 'japanese' | 'korean';
export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type CourseCategory = 'daily' | 'business' | 'travel' | 'culture' | 'academic';
export type UserRole = 'guest' | 'user' | 'vip';
export type LessonType = 'vocabulary' | 'grammar' | 'speaking' | 'listening' | 'mixed';
export type AchievementCategory = 'learning' | 'streak' | 'skill' | 'rare';

export interface User {
  id: string;
  email: string;
  nickname: string;
  avatar: string;
  role: UserRole;
  preferredLanguages: Language[];
  currentLanguage: Language;
  currentLevel: Level;
  createdAt: string;
  streak: number;
  totalXP: number;
  level: number;
}

export interface Course {
  id: string;
  language: Language;
  title: string;
  description: string;
  level: Level;
  category: CourseCategory;
  totalLessons: number;
  completedLessons: number;
  isLocked: boolean;
  imageUrl: string;
  color: string;
}

export interface Word {
  id: string;
  word: string;
  pronunciation: string;
  meaning: string;
  example: string;
  exampleMeaning: string;
}

export interface GrammarPoint {
  id: string;
  title: string;
  explanation: string;
  examples: { sentence: string; translation: string }[];
}

export interface Dialogue {
  id: string;
  speaker: string;
  text: string;
  translation: string;
}

export interface Exercise {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'ordering' | 'correction';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
}

export interface LessonContent {
  words?: Word[];
  grammarPoints?: GrammarPoint[];
  dialogues?: Dialogue[];
  audioUrl?: string;
  exercises?: Exercise[];
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  type: LessonType;
  duration: number;
  content: LessonContent;
  isCompleted: boolean;
  score?: number;
}

export interface WeeklyStats {
  date: string;
  studyTime: number;
  wordsLearned: number;
  accuracy: number;
}

export interface LearningProgress {
  userId: string;
  language: Language;
  vocabularyMastered: number;
  grammarMastered: number;
  speakingAccuracy: number;
  listeningAccuracy: number;
  totalStudyTime: number;
  weeklyProgress: WeeklyStats[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  requirement: {
    type: string;
    value: number;
  };
  progress?: number;
}

export interface UserAchievement {
  achievementId: string;
  userId: string;
  unlockedAt: string;
}

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  likes: number;
  comments: number;
  createdAt: string;
  tags: string[];
  isLiked?: boolean;
}

export interface SpeakingRecord {
  id: string;
  userId: string;
  lessonId: string;
  audioUrl: string;
  score: number;
  recordedAt: string;
}

export interface Notification {
  id: string;
  type: 'achievement' | 'streak' | 'course' | 'social';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}
