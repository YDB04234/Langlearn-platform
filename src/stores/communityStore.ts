import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CommunityPost } from '../types';
import { mockCommunityPosts } from '../data/mockData';

interface CommunityState {
  posts: CommunityPost[];
  isLoading: boolean;
  
  addPost: (content: string, tags: string[]) => void;
  likePost: (postId: string) => void;
  getPostsByTag: (tag: string) => CommunityPost[];
  getRecentPosts: () => CommunityPost[];
}

export const useCommunityStore = create<CommunityState>()(
  persist(
    (set, get) => ({
      posts: mockCommunityPosts,
      isLoading: false,

      addPost: (content, tags) => {
        const newPost: CommunityPost = {
          id: `post-${Date.now()}`,
          userId: 'user-1',
          userName: '语言爱好者',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
          content,
          likes: 0,
          comments: 0,
          createdAt: new Date().toISOString().split('T')[0],
          tags,
          isLiked: false,
        };
        set({ posts: [newPost, ...get().posts] });
      },

      likePost: (postId) => {
        set({
          posts: get().posts.map(post => 
            post.id === postId 
              ? { 
                  ...post, 
                  likes: post.isLiked ? post.likes - 1 : post.likes + 1,
                  isLiked: !post.isLiked,
                } 
              : post
          ),
        });
      },

      getPostsByTag: (tag) => {
        return get().posts.filter(post => post.tags.includes(tag));
      },

      getRecentPosts: () => {
        return [...get().posts].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      },
    }),
    {
      name: 'community-storage',
    }
  )
);
