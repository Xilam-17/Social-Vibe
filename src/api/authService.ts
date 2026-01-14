import api from './axios';
import type { RegisterPayload } from '../types';

export const login = async (username: string, password: string) => {
    const response = await api.post('/user/login', { username, password });
    if (response.data.data) {
        localStorage.setItem('token', response.data.data); 
        localStorage.setItem('username', username);
    }
    return response.data;
};

export const register = async (userData: RegisterPayload) => {
    const response = await api.post('/user/register', userData);
    return response.data;
};