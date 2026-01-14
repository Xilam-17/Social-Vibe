import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, UserCircle } from 'lucide-react';
import { register } from '../api/authService';
import type { RegisterPayload } from '../types';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [formData, setFormData] = useState<RegisterPayload>({ username: '', fullName: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData);
      toast.success('Registration successful!');
      navigate('/login');
    } catch (err: unknown) {
      let msg = 'Registration failed. Please check your details.';
      if (typeof err === 'object' && err !== null) {
        const maybe = err as { response?: { data?: { message?: string } }; message?: string };
        msg = maybe.response?.data?.message || maybe.message || msg;
      }
      toast.error(msg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-600 px-4">
      <div className="w-full max-w-md p-10 bg-white rounded-lg shadow-2xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b-4 border-blue-600 inline-block">Registration</h2>
        
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="relative border-b-2 border-gray-300 focus-within:border-blue-600 transition-colors">
            <User className="absolute left-0 top-2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full pl-8 py-2 outline-none text-gray-700"
              onChange={e => setFormData({...formData, fullName: e.target.value})}
              required
            />
          </div>

          <div className="relative border-b-2 border-gray-300 focus-within:border-blue-600 transition-colors">
            <Mail className="absolute left-0 top-2 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full pl-8 py-2 outline-none text-gray-700"
              onChange={e => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div className="relative border-b-2 border-gray-300 focus-within:border-blue-600 transition-colors">
            <UserCircle className="absolute left-0 top-2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Create a username"
              className="w-full pl-8 py-2 outline-none text-gray-700"
              onChange={e => setFormData({...formData, username: e.target.value})}
              required
            />
          </div>

          <div className="relative border-b-2 border-gray-300 focus-within:border-blue-600 transition-colors">
            <Lock className="absolute left-0 top-2 text-gray-400" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm a password"
              className="w-full pl-8 pr-10 py-2 outline-none text-gray-700"
              onChange={e => setFormData({...formData, password: e.target.value})}
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-2 text-gray-400">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 accent-blue-600" required />
            I accept all terms & conditions
          </label>

          <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all active:scale-95 shadow-lg">
            Register Now
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-bold hover:underline">Login now</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;