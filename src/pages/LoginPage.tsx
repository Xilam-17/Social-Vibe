import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authService';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/'); 
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 className="mb-6 text-3xl font-bold text-center text-blue-600">Social Vibe</h2>
        {error && <p className="mb-4 text-sm text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full p-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;