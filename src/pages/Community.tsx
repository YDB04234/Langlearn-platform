import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import { useCommunityStore } from '../stores/communityStore';
import Card from '../components/common/Card';
import { 
  Heart, MessageCircle, Send, TrendingUp, Clock, 
  Filter, Search, Users, ThumbsUp
} from 'lucide-react';

export default function Community() {
  const { isAuthenticated, user } = useAuthStore();
  const { posts, likePost, addPost } = useCommunityStore();
  const [newPost, setNewPost] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const popularTags = ['日语', '韩语', '英语', '学习方法', '学习打卡', '口语练习'];

  const filteredPosts = posts.filter(post => {
    if (selectedTag && !post.tags.includes(selectedTag)) return false;
    if (searchQuery && !post.content.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleSubmitPost = () => {
    if (newPost.trim() && isAuthenticated) {
      addPost(newPost.trim(), []);
      setNewPost('');
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return '今天';
    if (days === 1) return '昨天';
    if (days < 7) return `${days}天前`;
    return dateStr;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">学习社区</h1>
          <p className="text-gray-600">与志同道合的学习者交流经验</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl">
            <Users className="text-gray-500" size={18} />
            <span className="font-medium text-gray-700">1.2k+ 成员</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">热门话题</h3>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedTag === tag
                      ? 'bg-primary-english text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">活跃用户</h3>
            <div className="space-y-4">
              {[
                { name: '日语小白', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sakura', streak: 45 },
                { name: '韩语追梦人', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jungkook', streak: 30 },
                { name: '英语达人', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma', streak: 28 },
              ].map((u) => (
                <div key={u.name} className="flex items-center gap-3">
                  <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{u.name}</p>
                    <p className="text-xs text-gray-500">🔥 {u.streak}天连续</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {isAuthenticated && (
            <Card>
              <div className="flex gap-4">
                <img 
                  src={user?.avatar} 
                  alt={user?.nickname} 
                  className="w-12 h-12 rounded-full" 
                />
                <div className="flex-1">
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="分享你的学习心得..."
                    className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-primary-english focus:border-transparent transition-all"
                    rows={3}
                  />
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex gap-2">
                      {popularTags.slice(0, 3).map((tag) => (
                        <button
                          key={tag}
                          className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600 hover:bg-gray-200"
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={handleSubmitPost}
                      disabled={!newPost.trim()}
                      className="flex items-center gap-2 px-4 py-2 bg-primary-english text-white rounded-xl font-medium hover:bg-primary-english/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send size={16} />
                      发布
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索帖子..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-english focus:border-transparent"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50">
              <Filter size={18} />
              <span>筛选</span>
            </button>
          </div>

          <div className="space-y-4">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card>
                  <div className="flex gap-4">
                    <img 
                      src={post.userAvatar} 
                      alt={post.userName} 
                      className="w-12 h-12 rounded-full" 
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-gray-900">{post.userName}</span>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock size={12} />
                          {formatDate(post.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3">{post.content}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                              selectedTag === tag
                                ? 'bg-primary-english text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center gap-6 pt-3 border-t border-gray-100">
                        <button
                          onClick={() => likePost(post.id)}
                          className={`flex items-center gap-2 transition-colors ${
                            post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                          }`}
                        >
                          <Heart 
                            size={18} 
                            className={post.isLiked ? 'fill-current' : ''} 
                          />
                          <span className="font-medium">{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-500 hover:text-primary-english transition-colors">
                          <MessageCircle size={18} />
                          <span className="font-medium">{post.comments}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-500 hover:text-primary-english transition-colors ml-auto">
                          <ThumbsUp size={18} />
                          <span>分享</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
