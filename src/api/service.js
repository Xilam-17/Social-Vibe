import api from './axios';

export const PostService = {
    getFeed: (page = 0, size = 10) => api.get(`/posts/feed?page=${page}&size=${size}`),
    
    createPost: (formData) => api.post('/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),

    toggleLike: (postId) => api.post(`/posts/${postId}/like`)
};

export const AuthService = {
    login: (credentials) => api.post('/user/login', credentials),
    register: (userData) => api.post('/user/register', userData)
};

export const NotificationService = {
    getNotifications: () => api.get('/notifications'),
    getUnreadCount: () => api.get('/notifications/unread-count')
};