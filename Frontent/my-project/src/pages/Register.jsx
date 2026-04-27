import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Music, User as UserIcon, Mic2 } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    password: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
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
          <h1 className="text-3xl font-bold text-white text-center">Sign up for Spotify</h1>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-300 uppercase">Username</label>
            <input
              type="text"
              required
              className="bg-[#2a2a2a] border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-[#1db954] transition-colors"
              placeholder="What should we call you?"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-300 uppercase">Email</label>
            <input
              type="email"
              required
              className="bg-[#2a2a2a] border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-[#1db954] transition-colors"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-300 uppercase">Password</label>
            <input
              type="password"
              required
              className="bg-[#2a2a2a] border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-[#1db954] transition-colors"
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <label className="text-xs font-bold text-gray-300 uppercase">I am a:</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'user' })}
                className={`flex items-center justify-center gap-2 p-3 rounded border transition-all ${
                  formData.role === 'user' 
                  ? 'border-[#1db954] bg-[#1db954]/10 text-[#1db954]' 
                  : 'border-gray-600 text-gray-400 hover:border-gray-400'
                }`}
              >
                <UserIcon size={18} />
                Listener
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'artist' })}
                className={`flex items-center justify-center gap-2 p-3 rounded border transition-all ${
                  formData.role === 'artist' 
                  ? 'border-[#1db954] bg-[#1db954]/10 text-[#1db954]' 
                  : 'border-gray-600 text-gray-400 hover:border-gray-400'
                }`}
              >
                <Mic2 size={18} />
                Artist
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#1db954] text-black font-bold py-3 rounded-full mt-4 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-gray-400 text-sm">
            Have an account?{' '}
            <Link to="/login" className="text-[#1db954] hover:underline font-bold">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
