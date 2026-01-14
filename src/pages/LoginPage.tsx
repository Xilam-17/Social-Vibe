import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { login } from '../api/authService';

const LoginPage = () => {
  const [identifier, setIdentifier] = useState(''); 
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(identifier, password);
      navigate('/'); 
    } catch (err) {
      setError('Network Error or Invalid Credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-600 px-4">
      <div className="w-full max-w-md p-10 bg-white rounded-lg shadow-2xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b-4 border-blue-600 inline-block">Login</h2>
        
        {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative border-b-2 border-gray-300 focus-within:border-blue-600 transition-colors">
            <Mail className="absolute left-0 top-2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Enter your email or username"
              className="w-full pl-8 py-2 outline-none text-gray-700"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>

          <div className="relative border-b-2 border-gray-300 focus-within:border-blue-600 transition-colors">
            <Lock className="absolute left-0 top-2 text-gray-400" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm a password"
              className="w-full pl-8 pr-10 py-2 outline-none text-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-2 text-gray-400 hover:text-blue-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-500 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-blue-600" />
              Remember me
            </label>
            <button type="button" className="text-blue-600 hover:underline">Forgot password?</button>
          </div>

          <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg active:scale-95">
            Login Now
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 font-bold hover:underline">Signup now</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;