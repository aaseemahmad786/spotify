import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Music, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ usernameOrEmail: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const isEmail = formData.usernameOrEmail.includes('@');
      const body = {
        [isEmail ? 'email' : 'username']: formData.usernameOrEmail,
        password: formData.password
      };

      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      login(data.user);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#121212] rounded-xl p-8 border border-white/10 shadow-2xl">
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-[#1db954] rounded-full flex items-center justify-center">
            <Music className="text-black" size={32} fill="currentColor" />
          </div>
          <h1 className="text-3xl font-bold text-white text-center">Log in to Spotify</h1>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-300 uppercase">Username or Email</label>
            <input
              type="text"
              required
              className="bg-[#2a2a2a] border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-[#1db954] transition-colors"
              placeholder="Username or Email"
              value={formData.usernameOrEmail}
              onChange={(e) => setFormData({ ...formData, usernameOrEmail: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-300 uppercase">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full bg-[#2a2a2a] border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-[#1db954] transition-colors pr-10"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#1db954] text-black font-bold py-3 rounded-full mt-4 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#1db954] hover:underline font-bold">
              Sign up for Spotify
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
