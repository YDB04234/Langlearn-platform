import { motion } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import { useProgressStore } from '../stores/progressStore';
import { useAchievementStore } from '../stores/achievementStore';
import Card from '../components/common/Card';
import { CircularProgress } from '../components/common/ProgressBar';
import { languageConfig } from '../data/mockData';
import { 
  User, Mail, Calendar, Settings, Bell, Shield,
  LogOut, ChevronRight, Flame, Star, BookOpen,
  TrendingUp, Target, Award
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export default function Profile() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { progress } = useProgressStore();
  const { getUnlockedAchievements } = useAchievementStore();

  const unlockedAchievements = getUnlockedAchievements();
  const config = languageConfig[user?.currentLanguage || 'english'];

  const radarData = [
    { subject: '词汇', score: progress?.vocabularyMastered || 0, fullMark: 200 },
    { subject: '语法', score: progress?.grammarMastered || 0, fullMark: 50 },
    { subject: '口语', score: progress?.speakingAccuracy || 0, fullMark: 100 },
    { subject: '听力', score: progress?.listeningAccuracy || 0, fullMark: 100 },
  ];

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <User className="text-gray-400" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">个人中心</h2>
          <p className="text-gray-600 mb-6">登录后查看你的学习数据和个人设置</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.nickname}
                className="w-24 h-24 rounded-2xl ring-4 ring-primary-english/20"
              />
              <div 
                className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-sm font-bold text-white"
                style={{ backgroundColor: config.color }}
              >
                Lv.{user.level}
              </div>
            </div>
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{user.nickname}</h1>
              <p className="text-gray-600 flex items-center gap-2 justify-center sm:justify-start">
                <Mail size={14} />
                {user.email}
              </p>
              <div className="flex items-center gap-4 mt-3 justify-center sm:justify-start">
                <span className="flex items-center gap-1 px-3 py-1 bg-primary-english/10 text-primary-english rounded-full text-sm font-medium">
                  {config.flag} {config.name}
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <Calendar size={14} />
                  加入于 {new Date(user.createdAt).toLocaleDateString('zh-CN')}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
                <Settings size={20} className="text-gray-600" />
              </button>
              <button className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
                <Bell size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </Card>

        <Card>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50">
              <Flame className="mx-auto text-amber-500 mb-2" size={28} />
              <p className="text-2xl font-bold text-gray-900">{user.streak}</p>
              <p className="text-sm text-gray-600">连续天数</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
              <Star className="mx-auto text-blue-500 mb-2" size={28} />
              <p className="text-2xl font-bold text-gray-900">{user.totalXP}</p>
              <p className="text-sm text-gray-600">总经验值</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50">
              <BookOpen className="mx-auto text-green-500 mb-2" size={28} />
              <p className="text-2xl font-bold text-gray-900">5</p>
              <p className="text-sm text-gray-600">完成课程</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50">
              <Award className="mx-auto text-purple-500 mb-2" size={28} />
              <p className="text-2xl font-bold text-gray-900">{unlockedAchievements.length}</p>
              <p className="text-sm text-gray-600">成就徽章</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="text-primary-english" />
              本周学习趋势
            </h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progress?.weeklyProgress || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)' 
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="studyTime" 
                  stroke="#1E3A5F" 
                  strokeWidth={3}
                  dot={{ fill: '#1E3A5F', strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: '#1E3A5F' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Target className="text-purple-500" />
              能力雷达图
            </h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" stroke="#6b7280" fontSize={12} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#6b7280" fontSize={10} />
                <Radar
                  name="能力"
                  dataKey="score"
                  stroke="#1E3A5F"
                  fill="#1E3A5F"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-lg font-bold text-gray-900 mb-4">学习数据统计</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-gray-50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <BookOpen className="text-blue-600" size={20} />
              </div>
              <span className="text-gray-600">词汇掌握</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{progress?.vocabularyMastered || 0}</p>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${Math.min((progress?.vocabularyMastered || 0) / 2, 100)}%` }}
              />
            </div>
          </div>
          <div className="p-4 rounded-xl bg-gray-50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Star className="text-purple-600" size={20} />
              </div>
              <span className="text-gray-600">语法掌握</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{progress?.grammarMastered || 0}</p>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-500 rounded-full"
                style={{ width: `${Math.min((progress?.grammarMastered || 0) * 2, 100)}%` }}
              />
            </div>
          </div>
          <div className="p-4 rounded-xl bg-gray-50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center">
                <Target className="text-pink-600" size={20} />
              </div>
              <span className="text-gray-600">口语准确度</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{progress?.speakingAccuracy || 0}%</p>
            <CircularProgress 
              value={progress?.speakingAccuracy || 0} 
              size={60} 
              strokeWidth={4}
              className="mt-2"
            />
          </div>
          <div className="p-4 rounded-xl bg-gray-50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <TrendingUp className="text-green-600" size={20} />
              </div>
              <span className="text-gray-600">听力准确度</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{progress?.listeningAccuracy || 0}%</p>
            <CircularProgress 
              value={progress?.listeningAccuracy || 0} 
              size={60} 
              strokeWidth={4}
              color="text-green-500"
              className="mt-2"
            />
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-bold text-gray-900 mb-4">账号设置</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <User className="text-gray-400" size={20} />
              <span className="font-medium text-gray-900">个人信息</span>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </button>
          <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <Shield className="text-gray-400" size={20} />
              <span className="font-medium text-gray-900">隐私设置</span>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </button>
          <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <Bell className="text-gray-400" size={20} />
              <span className="font-medium text-gray-900">通知设置</span>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </button>
          <button 
            onClick={logout}
            className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-red-50 transition-colors text-red-600"
          >
            <div className="flex items-center gap-3">
              <LogOut size={20} />
              <span className="font-medium">退出登录</span>
            </div>
            <ChevronRight size={20} />
          </button>
        </div>
      </Card>
    </div>
  );
}
