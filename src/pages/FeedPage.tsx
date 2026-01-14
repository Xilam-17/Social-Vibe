import React, { useEffect, useState, useCallback } from 'react';
import api from '../api/axios';
import type { PostResponse } from '../types';
import { Heart, MessageCircle, MapPin, User, Loader2 } from 'lucide-react';
import CreatePost from '../components/CreatePost';
import UserCard from '../components/UserCard';

const FeedPage = () => {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFeed = useCallback(async () => {
    try {
      const response = await api.get('/posts/feed?page=0&size=10');
      const data = response.data.data.content || response.data.data;
      setPosts(data);
    } catch (error) {
      console.error("Error fetching feed", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  const handleLike = async (postId: number) => {
    try {
      await api.post(`/posts/${postId}/like`);
      setPosts(prev => prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            liked: !post.liked,
            likeCount: post.liked ? post.likeCount - 1 : post.likeCount + 1
          };
        }
        return post;
      }));
    } catch (error) {
      console.error("Like failed", error);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen text-blue-600">
      <Loader2 className="animate-spin mb-2" size={40} />
      <p className="font-medium">Loading SocialVibe...</p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
          <CreatePost onPostCreated={fetchFeed} />

          <div className="space-y-8 mt-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                      {post.userAvatar ? 
                        <img src={`http://localhost:8080${post.userAvatar}`} className="w-full h-full rounded-full object-cover" /> : 
                        <User size={20} className="text-blue-500" />}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{post.username}</h3>
                      {post.location && (
                        <p className="text-[11px] text-gray-500 flex items-center gap-1">
                          <MapPin size={10} /> {post.location}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-100 flex items-center justify-center">
                    <img 
                      src={`http://localhost:8080${post.imageUrl}`} 
                      alt="Post content" 
                      className="w-full h-auto max-h-[500px] object-contain"
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-4 mb-3">
                      <button 
                        onClick={() => handleLike(post.id)}
                        className={`transition-transform active:scale-125 ${post.liked ? 'text-red-500' : 'text-gray-600'}`}
                      >
                        <Heart size={26} fill={post.liked ? "currentColor" : "none"} />
                      </button>
                      <button className="text-gray-600 hover:text-blue-500 transition">
                        <MessageCircle size={26} />
                      </button>
                    </div>
                    <p className="text-sm font-bold text-gray-800 mb-1">{post.likeCount} likes</p>
                    <p className="text-sm text-gray-700">
                      <span className="font-bold mr-2 text-blue-600">{post.username}</span>
                      {post.caption}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-2 uppercase font-bold tracking-wider">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-400">No posts yet. Follow people to see their updates!</p>
              </div>
            )}
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 sticky top-24">
            <h2 className="font-bold text-gray-900 mb-4">Suggested for you</h2>
            <div className="space-y-2">
              <UserCard id={2} username="java_master" isFollowingInitial={false} />
              <UserCard id={3} username="spring_expert" isFollowingInitial={false} />
              <UserCard id={4} username="react_coder" isFollowingInitial={false} />
            </div>
            <div className="mt-6 pt-6 border-t border-gray-50 text-[10px] text-gray-400">
              © 2026 SOCIALVIBE FROM JAMADA
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FeedPage;