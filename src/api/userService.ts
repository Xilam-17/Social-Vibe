import api from './axios';

export const toggleFollow = async (userId: number) => {
    return await api.post(`/users/${userId}/follow`);
};

export const getSuggestedUsers = async () => {
    return await api.get('/users/suggested');
};