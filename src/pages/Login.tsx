import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import Button from '../components/common/Button';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/learn');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-english/5 via-primary-japanese/5 to-primary-korean/5 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-english to-primary-korean flex items-center justify-center">
                <span className="text-white font-bold text-2xl">L</span>
              </div>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">欢迎回来</h1>
            <p className="text-gray-600">登录你的 LinguaFlow 账号</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                邮箱地址
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="demo@linguaflow.com"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-english focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                密码
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="输入密码"
                  className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-english focus:border-transparent transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary-english focus:ring-primary-english" />
                <span className="text-sm text-gray-600">记住我</span>
              </label>
              <a href="#" className="text-sm text-primary-english hover:underline">
                忘记密码？
              </a>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isLoading}
            >
              登录
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              还没有账号？{' '}
              <Link to="/register" className="text-primary-english font-semibold hover:underline">
                立即注册
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-center text-sm text-gray-500 mb-4">或使用以下方式登录</p>
            <div className="flex gap-4">
              <button className="flex-1 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <span className="text-xl">🍎</span>
              </button>
              <button className="flex-1 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <span className="text-xl">🌐</span>
              </button>
              <button className="flex-1 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <span className="text-xl">📧</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
