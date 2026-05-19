import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { 
  Home, BookOpen, Users, Award, User
} from 'lucide-react';

export default function BottomNav() {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  const navItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/learn', label: '学习', icon: BookOpen },
    { path: '/community', label: '社区', icon: Users },
    { path: '/achievements', label: '成就', icon: Award },
  ];

  // 只在已登录时显示个人中心
  if (isAuthenticated) {
    navItems.push({ path: '/profile', label: '我的', icon: User });
  }

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 px-2 py-2">
      <div className="flex items-center justify-around">
        {navItems.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
              isActive(path)
                ? 'text-primary-english'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Icon size={22} />
            <span className="text-xs font-medium">{label}</span>
          </Link>
        ))}
      </div>
      {/* 安全区域 */}
      <div className="h-safe-area-bottom" />
    </nav>
  );
}
