import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { motion } from 'framer-motion';
import { 
  Home, BookOpen, Users, Award, Settings, LogOut 
} from 'lucide-react';
import { languageConfig } from '../../data/mockData';

export default function Sidebar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const location = useLocation();

  const mainNavItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/learn', label: '学习中心', icon: BookOpen },
    { path: '/community', label: '社区', icon: Users },
    { path: '/achievements', label: '成就中心', icon: Award },
  ];

  const isActive = (path: string) => location.pathname === path;

  if (!isAuthenticated) return null;

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-100 h-[calc(100vh-4rem)] sticky top-16">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-primary-english/5 to-primary-korean/5">
          <img
            src={user?.avatar}
            alt={user?.nickname}
            className="w-12 h-12 rounded-full ring-2 ring-white shadow-md"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{user?.nickname}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs px-2 py-0.5 bg-primary-english/10 text-primary-english rounded-full font-medium">
                Lv.{user?.level}
              </span>
              <span className="text-xs text-gray-500">
                {languageConfig[user?.currentLanguage || 'english'].flag}
              </span>
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          导航
        </p>
        {mainNavItems.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
              isActive(path)
                ? 'bg-gradient-to-r from-primary-english to-primary-korean text-white shadow-lg shadow-primary-english/20'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon size={20} />
            <span className="font-medium">{label}</span>
            {isActive(path) && (
              <motion.div
                layoutId="sidebar-active"
                className="absolute inset-0 bg-gradient-to-r from-primary-english to-primary-korean rounded-xl -z-10"
                transition={{ type: 'spring', duration: 0.5 }}
              />
            )}
          </Link>
        ))}

        <div className="pt-6 mt-6 border-t border-gray-100">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            个人
          </p>
          <Link
            to="/profile"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
              isActive('/profile')
                ? 'bg-primary-english text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Settings size={20} />
            <span className="font-medium">设置</span>
          </Link>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🔥</span>
            <span className="text-sm font-semibold text-amber-700">学习连续</span>
          </div>
          <p className="text-2xl font-bold text-amber-600">{user?.streak} 天</p>
          <p className="text-xs text-amber-600/70 mt-1">保持学习节奏!</p>
        </div>
      </div>
    </aside>
  );
}
