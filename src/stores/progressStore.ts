import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Course, Lesson, LearningProgress, Language } from '../types';
import { mockCourses, mockLessons, mockLearningProgress } from '../data/mockData';

interface ProgressState {
  courses: Course[];
  lessons: Lesson[];
  progress: LearningProgress | null;
  currentCourse: Course | null;
  currentLesson: Lesson | null;
  
  setCurrentCourse: (course: Course) => void;
  setCurrentLesson: (lesson: Lesson) => void;
  completeLesson: (lessonId: string, score: number) => void;
  updateProgress: (updates: Partial<LearningProgress>) => void;
  unlockCourse: (courseId: string) => void;
  getLessonsByCourse: (courseId: string) => Lesson[];
  getCoursesByLanguage: (language: Language) => Course[];
  getOverallProgress: () => number;
  getTodayStats: () => { studyTime: number; wordsLearned: number; lessonsCompleted: number };
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      courses: mockCourses,
      lessons: mockLessons,
      progress: mockLearningProgress,
      currentCourse: null,
      currentLesson: null,

      setCurrentCourse: (course) => {
        set({ currentCourse: course });
      },

      setCurrentLesson: (lesson) => {
        set({ currentLesson: lesson });
      },

      completeLesson: (lessonId, score) => {
        const { lessons, courses, progress } = get();
        
        const updatedLessons = lessons.map(lesson => 
          lesson.id === lessonId 
            ? { ...lesson, isCompleted: true, score } 
            : lesson
        );

        const lesson = lessons.find(l => l.id === lessonId);
        const course = courses.find(c => c.id === lesson?.courseId);
        
        let updatedCourses = courses;
        if (course) {
          const courseLessons = updatedLessons.filter(l => l.courseId === course.id);
          const completedCount = courseLessons.filter(l => l.isCompleted).length;
          updatedCourses = courses.map(c => 
            c.id === course.id 
              ? { ...c, completedLessons: completedCount } 
              : c
          );
        }

        set({ 
          lessons: updatedLessons, 
          courses: updatedCourses 
        });
      },

      updateProgress: (updates) => {
        const { progress } = get();
        if (progress) {
          set({ progress: { ...progress, ...updates } });
        }
      },

      unlockCourse: (courseId) => {
        const { courses } = get();
        set({
          courses: courses.map(course => 
            course.id === courseId 
              ? { ...course, isLocked: false } 
              : course
          ),
        });
      },

      getLessonsByCourse: (courseId) => {
        return get().lessons.filter(lesson => lesson.courseId === courseId);
      },

      getCoursesByLanguage: (language) => {
        return get().courses.filter(course => course.language === language);
      },

      getOverallProgress: () => {
        const { courses } = get();
        const totalLessons = courses.reduce((acc, c) => acc + c.totalLessons, 0);
        const completedLessons = courses.reduce((acc, c) => acc + c.completedLessons, 0);
        return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
      },

      getTodayStats: () => {
        const { lessons, progress } = get();
        const todayLessons = lessons.filter(l => l.isCompleted).slice(-3);
        return {
          studyTime: progress?.weeklyProgress.slice(-1)[0]?.studyTime || 0,
          wordsLearned: progress?.weeklyProgress.slice(-1)[0]?.wordsLearned || 0,
          lessonsCompleted: todayLessons.length,
        };
      },
    }),
    {
      name: 'progress-storage',
    }
  )
);
