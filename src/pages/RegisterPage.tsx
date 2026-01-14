import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ username: '', fullName: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/user/register', formData);
      alert("Registration successful! Please login.");
      navigate('/login');
    } catch (err) {
      alert("Registration failed. Email or Username might be taken.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-xl shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center text-blue-600">Join SocialVibe</h2>
        <input type="text" placeholder="Full Name" className="w-full p-2 border rounded" onChange={e => setFormData({...formData, fullName: e.target.value})} />
        <input type="text" placeholder="Username" className="w-full p-2 border rounded" onChange={e => setFormData({...formData, username: e.target.value})} />
        <input type="email" placeholder="Email" className="w-full p-2 border rounded" onChange={e => setFormData({...formData, email: e.target.value})} />
        <input type="password" placeholder="Password" className="w-full p-2 border rounded" onChange={e => setFormData({...formData, password: e.target.value})} />
        <button className="w-full bg-blue-600 text-white p-2 rounded font-bold">Sign Up</button>
        <p className="text-center text-sm">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
      </form>
    </div>
  );
};
export default RegisterPage;