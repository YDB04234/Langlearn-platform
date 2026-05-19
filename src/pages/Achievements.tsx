import { motion } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import { useAchievementStore } from '../stores/achievementStore';
import Card from '../components/common/Card';
import { ProgressBar } from '../components/common/ProgressBar';
import { 
  Trophy, Star, Flame, Zap, Target, Award, 
  Lock, CheckCircle2, Crown, Medal
} from 'lucide-react';

export default function Achievements() {
  const { isAuthenticated, user } = useAuthStore();
  const { achievements, userAchievements, getUnlockedAchievements, getLockedAchievements } = useAchievementStore();

  const unlockedAchievements = getUnlockedAchievements();
  const lockedAchievements = getLockedAchievements();

  const categoryIcons = {
    learning: BookOpen,
    streak: Flame,
    skill: Zap,
    rare: Crown,
  };

  const unlockedCount = unlockedAchievements.length;
  const totalCount = achievements.length;
  const progress = Math.round((unlockedCount / totalCount) * 100);

  const leaderboard = [
    { rank: 1, name: '语言大师', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Master', xp: 12580, streak: 89 },
    { rank: 2, name: '日语达人', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sakura', xp: 9870, streak: 45 },
    { rank: 3, name: '韩语追梦人', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jungkook', xp: 8540, streak: 42 },
    { rank: 4, name: user?.nickname || '你', avatar: user?.avatar || '', xp: user?.totalXP || 0, streak: user?.streak || 0, isCurrentUser: true },
    { rank: 5, name: '英语爱好者', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma', xp: 6230, streak: 28 },
  ];

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <Trophy className="text-accent" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">成就中心</h2>
          <p className="text-gray-600 mb-6">登录后解锁成就系统，激励你的学习之旅</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">成就中心</h1>
          <p className="text-gray-600">收集徽章，解锁成就，成为学习达人</p>
        </div>
        <div className="flex items-center gap-4">
          <Card className="px-6 py-3 flex items-center gap-4">
            <Trophy className="text-accent" size={24} />
            <div>
              <p className="text-2xl font-bold text-gray-900">{unlockedCount}</p>
              <p className="text-sm text-gray-500">已解锁成就</p>
            </div>
          </Card>
          <Card className="px-6 py-3 flex items-center gap-4">
            <Star className="text-blue-500" size={24} />
            <div>
              <p className="text-2xl font-bold text-gray-900">{user?.totalXP}</p>
              <p className="text-sm text-gray-500">总经验值</p>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">成就进度</h3>
              <span className="text-sm text-gray-500">{unlockedCount}/{totalCount} 已解锁</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-accent to-amber-500 rounded-full"
              />
            </div>
            <div className="mt-2 text-right text-sm text-gray-500">{progress}% 完成</div>
          </Card>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="text-accent" />
              已解锁成就
            </h3>
            {unlockedAchievements.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {unlockedAchievements.map((achievement) => {
                  const Icon = categoryIcons[achievement.category];
                  return (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-accent/30">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-amber-500 flex items-center justify-center text-2xl shadow-lg">
                            {achievement.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold text-gray-900">{achievement.title}</h4>
                              <CheckCircle2 className="text-accent" size={16} />
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent/20 text-accent text-xs font-medium rounded-full">
                              <Icon size={12} />
                              {achievement.category === 'learning' && '学习'}
                              {achievement.category === 'streak' && '连续'}
                              {achievement.category === 'skill' && '技能'}
                              {achievement.category === 'rare' && '稀有'}
                            </span>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <Card className="text-center py-8">
                <Medal className="mx-auto text-gray-300 mb-3" size={48} />
                <p className="text-gray-500">还没有解锁任何成就，开始学习吧！</p>
              </Card>
            )}
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Lock className="text-gray-400" />
              待解锁成就
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {lockedAchievements.slice(0, 4).map((achievement) => {
                const Icon = categoryIcons[achievement.category];
                const progressValue = achievement.progress || 0;
                const progressPercent = Math.round((progressValue / achievement.requirement.value) * 100);
                
                return (
                  <Card key={achievement.id} className="opacity-75">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-2xl grayscale">
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1">{achievement.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>{progressValue}/{achievement.requirement.value}</span>
                            <span>{progressPercent}%</span>
                          </div>
                          <ProgressBar 
                            value={progressValue} 
                            max={achievement.requirement.value}
                            size="sm"
                            color="from-gray-300 to-gray-400"
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Trophy className="text-accent" />
              排行榜
            </h3>
            <div className="space-y-3">
              {leaderboard.map((user, index) => (
                <div
                  key={user.rank}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                    user.isCurrentUser 
                      ? 'bg-primary-english/10 border-2 border-primary-english/30' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    index === 0 ? 'bg-accent text-white' :
                    index === 1 ? 'bg-gray-300 text-white' :
                    index === 2 ? 'bg-amber-600 text-white' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {user.rank}
                  </div>
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500">🔥 {user.streak}天</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{user.xp.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">XP</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-primary-english to-blue-600 text-white">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                <Target className="text-white" size={32} />
              </div>
              <h4 className="text-xl font-bold mb-2">下一个目标</h4>
              <p className="text-white/80 mb-4">完成10节课解锁"学习达人"成就</p>
              <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                <div className="w-1/2 h-full bg-white rounded-full" />
              </div>
              <p className="mt-2 text-sm text-white/80">5/10 课程完成</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function BookOpen({ size, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  );
}
