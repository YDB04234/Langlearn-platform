import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { motion } from 'framer-motion';
import { 
  Home, BookOpen, User, Users, Award, Menu, X 
} from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/learn', label: '学习', icon: BookOpen },
    { path: '/community', label: '社区', icon: Users },
    { path: '/achievements', label: '成就', icon: Award },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-english to-primary-korean flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-english via-primary-japanese to-primary-korean bg-clip-text text-transparent">
              LinguaFlow
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`relative px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                  isActive(path)
                    ? 'text-primary-english bg-primary-english/10'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon size={18} />
                <span className="font-medium">{label}</span>
                {isActive(path) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-primary-english/10 rounded-lg -z-10"
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-50 transition-all"
                >
                  <img
                    src={user?.avatar}
                    alt={user?.nickname}
                    className="w-8 h-8 rounded-full ring-2 ring-primary-english/20"
                  />
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">{user?.nickname}</p>
                    <p className="text-xs text-gray-500">Lv.{user?.level}</p>
                  </div>
                </Link>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10">
                  <span className="text-sm font-bold text-amber-600">⭐</span>
                  <span className="text-sm font-bold text-amber-600">{user?.totalXP}</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-600 font-medium hover:text-gray-900 transition-colors"
                >
                  登录
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-primary-english text-white rounded-xl font-medium hover:bg-primary-english/90 transition-colors"
                >
                  注册
                </Link>
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 border-t border-gray-100"
          >
            <nav className="flex flex-col gap-2">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${
                    isActive(path)
                      ? 'bg-primary-english/10 text-primary-english'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{label}</span>
                </Link>
              ))}
              {!isAuthenticated && (
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-100">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 text-center text-gray-600 font-medium rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    登录
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 text-center bg-primary-english text-white rounded-xl font-medium hover:bg-primary-english/90 transition-colors"
                  >
                    注册
                  </Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
}
