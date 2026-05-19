import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import { useProgressStore } from '../stores/progressStore';
import Card from '../components/common/Card';
import { CircularProgress, ProgressBar } from '../components/common/ProgressBar';
import { languageConfig } from '../data/mockData';
import { 
  Zap, Target, TrendingUp, BookOpen, Mic, Headphones, PenTool, GraduationCap,
  ArrowRight, Play, Star, Users, Flame
} from 'lucide-react';
import { Language } from '../types';

export default function Home() {
  const { isAuthenticated, user } = useAuthStore();
  const { getOverallProgress, getTodayStats } = useProgressStore();
  const navigate = useNavigate();

  const overallProgress = getOverallProgress();
  const todayStats = getTodayStats();

  const learningModules = [
    { icon: BookOpen, title: '单词记忆', desc: '智能闪卡强化记忆', color: 'from-blue-400 to-blue-600', path: '/module/vocabulary' },
    { icon: PenTool, title: '语法练习', desc: '交互式练习题库', color: 'from-purple-400 to-purple-600', path: '/module/grammar' },
    { icon: Mic, title: '口语跟读', desc: 'AI发音评测', color: 'from-pink-400 to-pink-600', path: '/module/speaking' },
    { icon: Headphones, title: '听力训练', desc: '场景化听力练习', color: 'from-green-400 to-green-600', path: '/module/listening' },
  ];

  const languages: { key: Language; config: typeof languageConfig.english }[] = [
    { key: 'english', config: languageConfig.english },
    { key: 'japanese', config: languageConfig.japanese },
    { key: 'korean', config: languageConfig.korean },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 md:space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-english/10 rounded-full mb-6">
              <Zap className="text-primary-english" size={16} />
              <span className="text-sm font-medium text-primary-english">AI驱动的个性化学习</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
              <span className="bg-gradient-to-r from-primary-english via-primary-japanese to-primary-korean bg-clip-text text-transparent">
                沉浸式语言学习体验
              </span>
            </h1>
            <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8 px-2">
              支持英语、日语、韩语等多语种学习，通过智能路径规划和互动式训练，
              让语言学习变得简单有趣
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-2">
              {isAuthenticated ? (
                <Link
                  to="/learn"
                  className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-primary-english to-blue-600 text-white rounded-xl md:rounded-2xl font-semibold text-base md:text-lg hover:shadow-xl hover:shadow-primary-english/30 transition-all"
                >
                  继续学习
                  <ArrowRight size={18} className="md:w-5 md:h-5" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-primary-english to-blue-600 text-white rounded-xl md:rounded-2xl font-semibold text-base md:text-lg hover:shadow-xl hover:shadow-primary-english/30 transition-all"
                  >
                    免费开始学习
                    <ArrowRight size={18} className="md:w-5 md:h-5" />
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl md:rounded-2xl font-semibold text-base md:text-lg hover:border-primary-english hover:text-primary-english transition-all"
                  >
                    已有账号登录
                  </Link>
                </>
              )}
            </div>
          </motion.div>

          {isAuthenticated && (
            <motion.div variants={itemVariants}>
              <Card className="overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-english/5 via-primary-japanese/5 to-primary-korean/5" />
          <div className="relative flex flex-col gap-6">
            <div className="flex items-center gap-6">
              <CircularProgress value={overallProgress} size={80} className="md:w-24 md:h-24" />
              <div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">总体进度</h3>
                <p className="text-sm md:text-base text-gray-600">已完成 {overallProgress}% 的课程内容</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm md:text-base text-gray-600">今日学习</span>
                <span className="font-semibold text-gray-900">{todayStats.studyTime} 分钟</span>
              </div>
              <ProgressBar value={todayStats.studyTime} max={60} color="from-green-400 to-green-600" />
              <div className="flex items-center justify-between">
                <span className="text-sm md:text-base text-gray-600">学习单词</span>
                <span className="font-semibold text-gray-900">{todayStats.wordsLearned} 个</span>
              </div>
              <ProgressBar value={todayStats.wordsLearned} max={30} color="from-blue-400 to-blue-600" />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <Flame className="text-white md:w-8 md:h-8" size={24} />
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">{user?.streak}</p>
                <p className="text-sm md:text-base text-gray-600">天连续学习</p>
              </div>
            </div>
          </div>
        </Card>
            </motion.div>
          )}

          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-4 md:mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">选择学习语言</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {languages.map(({ key, config }) => (
                <motion.div
                  key={key}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link to={isAuthenticated ? `/learn?lang=${key}` : '/register'}>
                    <Card hover className="relative overflow-hidden group">
                      <div 
                        className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity"
                        style={{ backgroundColor: config.color }}
                      />
                      <div className="relative">
                        <div 
                          className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 text-2xl md:text-3xl"
                          style={{ backgroundColor: `${config.color}20` }}
                        >
                          {config.flag}
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">{config.name}</h3>
                        <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">{config.nativeName}</p>
                        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                          <Users size={14} className="md:w-4 md:h-4" />
                          <span>1.2k+ 学员</span>
                          <Star size={14} className="ml-2 text-amber-500 fill-amber-500" />
                          <span>4.9</span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-4 md:mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">互动学习模块</h2>
              <Link to="/learn" className="text-primary-english font-medium flex items-center gap-1 hover:gap-2 transition-all">
                查看全部 <ArrowRight size={14} className="md:w-4 md:h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {learningModules.map(({ icon: Icon, title, desc, color, path }) => (
                <motion.div
                  key={title}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link to={isAuthenticated ? path : '/register'}>
                    <Card hover className="text-center">
                      <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg`}>
                        <Icon className="text-white md:w-7 md:h-7" size={20} />
                      </div>
                      <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-1 md:mb-2">{title}</h3>
                      <p className="text-xs md:text-sm text-gray-600 hidden sm:block">{desc}</p>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-r from-primary-english to-blue-600 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSI1IiBjeT0iNSIgcj0iNSIvPjxjaXJjbGUgY3g9IjM1IiBjeT0iNSIgcj0iNSIvPjxjaXJjbGUgY3g9IjE1IiBjeT0iMTUiIHI9IjUiLz48Y2lyY2xlIGN4PSIzNSIgeT0iMzUiIHI9IjUiLz48Y2lyY2xlIGN4PSI1IiBjeT0iNDUiIHI9IjUiLz48Y2lyY2xlIGN4PSIzNSIgeT0iNDUiIHI9IjUiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
              <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full mb-3 md:mb-4">
                    <GraduationCap className="md:w-4 md:h-4" size={14} />
                    <span className="text-xs md:text-sm font-medium">个性化学习路径</span>
                  </div>
                  <h3 className="text-xl md:text-3xl font-bold mb-2 md:mb-3">开启你的语言学习之旅</h3>
                  <p className="text-white/80 text-sm md:text-lg mb-4 md:mb-6">
                    通过AI能力评估，为你定制专属学习路径，让学习更高效
                  </p>
                  <Link
                    to={isAuthenticated ? '/learn' : '/register'}
                    className="inline-flex items-center justify-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-white text-primary-english rounded-lg md:rounded-xl font-semibold text-sm md:text-base hover:bg-white/90 transition-colors"
                  >
                    <Play size={18} className="md:w-5 md:h-5" />
                    {isAuthenticated ? '开始学习' : '立即注册'}
                  </Link>
                </div>
                <div className="flex gap-2 md:gap-4">
                  <div className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-lg md:rounded-xl lg:rounded-2xl bg-white/20 flex items-center justify-center text-xl md:text-3xl lg:text-4xl">
                    🇬🇧
                  </div>
                  <div className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-lg md:rounded-xl lg:rounded-2xl bg-white/20 flex items-center justify-center text-xl md:text-3xl lg:text-4xl">
                    🇯🇵
                  </div>
                  <div className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-lg md:rounded-xl lg:rounded-2xl bg-white/20 flex items-center justify-center text-xl md:text-3xl lg:text-4xl">
                    🇰🇷
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            <Card className="text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Target className="text-blue-600 md:w-6 md:h-6" size={20} />
              </div>
              <h4 className="text-base md:text-lg font-bold text-gray-900 mb-1 md:mb-2">智能学习路径</h4>
              <p className="text-xs md:text-sm text-gray-600">AI分析你的学习习惯，定制最优学习计划</p>
            </Card>
            <Card className="text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-green-100 flex items-center justify-center mx-auto mb-3 md:mb-4">
                <TrendingUp className="text-green-600 md:w-6 md:h-6" size={20} />
              </div>
              <h4 className="text-base md:text-lg font-bold text-gray-900 mb-1 md:mb-2">实时进度追踪</h4>
              <p className="text-xs md:text-sm text-gray-600">可视化学习数据，见证每一天的进步</p>
            </Card>
            <Card className="text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-amber-100 flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Star className="text-amber-600 md:w-6 md:h-6" size={20} />
              </div>
              <h4 className="text-base md:text-lg font-bold text-gray-900 mb-1 md:mb-2">成就激励系统</h4>
              <p className="text-xs md:text-sm text-gray-600">丰富的成就徽章和排行榜，学习更有动力</p>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
