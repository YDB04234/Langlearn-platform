import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import { useProgressStore } from '../stores/progressStore';
import Card from '../components/common/Card';
import { ProgressBar, CircularProgress } from '../components/common/ProgressBar';
import { languageConfig } from '../data/mockData';
import { 
  BookOpen, Mic, Headphones, PenTool, Lock, ChevronRight, 
  Play, Target, Flame, TrendingUp
} from 'lucide-react';
import { Language, Course } from '../types';

const levelOrder = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export default function LearningHub() {
  const [searchParams] = useSearchParams();
  const { user, isAuthenticated } = useAuthStore();
  const { courses, getCoursesByLanguage } = useProgressStore();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    (searchParams.get('lang') as Language) || user?.currentLanguage || 'english'
  );
  const [selectedLevel, setSelectedLevel] = useState<string>(user?.currentLevel || 'A1');

  const languageCourses = getCoursesByLanguage(selectedLanguage);
  const filteredCourses = languageCourses.filter(c => c.level === selectedLevel);

  const modules = [
    { 
      icon: BookOpen, 
      title: '单词记忆', 
      desc: '智能闪卡 + 记忆曲线',
      color: 'from-blue-500 to-blue-600',
      path: `/module/vocabulary?lang=${selectedLanguage}`
    },
    { 
      icon: PenTool, 
      title: '语法练习', 
      desc: '交互式练习题库',
      color: 'from-purple-500 to-purple-600',
      path: `/module/grammar?lang=${selectedLanguage}`
    },
    { 
      icon: Mic, 
      title: '口语跟读', 
      desc: 'AI 发音评测',
      color: 'from-pink-500 to-pink-600',
      path: `/module/speaking?lang=${selectedLanguage}`
    },
    { 
      icon: Headphones, 
      title: '听力训练', 
      desc: '场景化听力练习',
      color: 'from-green-500 to-green-600',
      path: `/module/listening?lang=${selectedLanguage}`
    },
  ];

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-primary-english/10 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="text-primary-english" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">开始你的学习之旅</h2>
          <p className="text-gray-600 mb-6">登录后即可访问完整的学习内容和进度追踪功能</p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-english text-white rounded-xl font-semibold hover:bg-primary-english/90 transition-colors"
          >
            登录学习
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">学习中心</h1>
          <p className="text-gray-600">选择语言和难度，开启学习之旅</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-xl">
            <Flame className="text-amber-500" size={20} />
            <span className="font-bold text-amber-700">{user?.streak} 天</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-xl">
            <Target className="text-blue-500" size={20} />
            <span className="font-bold text-blue-700">Lv.{user?.level}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="lg:w-64 flex-shrink-0">
          <h3 className="font-semibold text-gray-900 mb-4">选择语言</h3>
          <div className="space-y-2">
            {(['english', 'japanese', 'korean'] as Language[]).map((lang) => {
              const config = languageConfig[lang];
              return (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    selectedLanguage === lang
                      ? 'bg-gradient-to-r from-primary-english/10 to-primary-korean/10 border-2 border-primary-english'
                      : 'hover:bg-gray-50 border-2 border-transparent'
                  }`}
                >
                  <span className="text-2xl">{config.flag}</span>
                  <span className="font-medium text-gray-900">{config.name}</span>
                </button>
              );
            })}
          </div>
        </Card>

        <div className="flex-1 space-y-6">
          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">选择难度等级</h3>
            <div className="flex flex-wrap gap-2">
              {levelOrder.map((level) => {
                const levelCourses = languageConfig[selectedLanguage] 
                  ? getCoursesByLanguage(selectedLanguage).filter(c => c.level === level)
                  : [];
                const hasCourses = levelCourses.length > 0;
                
                return (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    disabled={!hasCourses}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                      selectedLevel === level
                        ? 'bg-gradient-to-r from-primary-english to-blue-600 text-white shadow-lg'
                        : hasCourses
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {level}
                    {!hasCourses && <Lock size={14} className="inline ml-2" />}
                  </button>
                );
              })}
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Link to={`/learn/${selectedLanguage}/${course.id}`}>
                  <Card hover className="relative overflow-hidden group">
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(135deg, ${course.color}10, transparent)` }}
                    />
                    <div className="relative">
                      <div className="flex items-start gap-4 mb-4">
                        <div 
                          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                          style={{ backgroundColor: `${course.color}20` }}
                        >
                          {course.language === 'english' && '🇬🇧'}
                          {course.language === 'japanese' && '🇯🇵'}
                          {course.language === 'korean' && '🇰🇷'}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-primary-english/10 text-primary-english text-xs font-semibold rounded-full">
                              {course.level}
                            </span>
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full capitalize">
                              {course.category}
                            </span>
                          </div>
                          <h4 className="text-lg font-bold text-gray-900">{course.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">学习进度</span>
                          <span className="font-semibold text-gray-900">
                            {course.completedLessons}/{course.totalLessons} 课时
                          </span>
                        </div>
                        <ProgressBar 
                          value={course.completedLessons} 
                          max={course.totalLessons}
                          color={`from-${course.color} to-blue-500`}
                        />
                      </div>

                      {course.isLocked ? (
                        <div className="mt-4 flex items-center justify-center gap-2 py-2 bg-gray-100 rounded-xl text-gray-500">
                          <Lock size={16} />
                          <span className="text-sm font-medium">完成前置课程解锁</span>
                        </div>
                      ) : (
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            {course.totalLessons - course.completedLessons} 课时待完成
                          </span>
                          <div className="flex items-center gap-1 text-primary-english font-medium">
                            <span>继续学习</span>
                            <ChevronRight size={16} />
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">学习模块</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map(({ icon: Icon, title, desc, color, path }) => (
            <motion.div
              key={title}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Link to={path}>
                <Card hover className="text-center relative overflow-hidden">
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity`} 
                  />
                  <div className="relative">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <Icon className="text-white" size={24} />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
                    <p className="text-sm text-gray-600">{desc}</p>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <Card className="bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary-english/10 flex items-center justify-center">
              <TrendingUp className="text-primary-english" size={24} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">本周学习统计</h4>
              <p className="text-sm text-gray-600">持续学习，效果更好</p>
            </div>
          </div>
          <Link
            to="/profile"
            className="px-4 py-2 bg-primary-english text-white rounded-xl font-medium hover:bg-primary-english/90 transition-colors"
          >
            查看详情
          </Link>
        </div>
      </Card>
    </div>
  );
}
