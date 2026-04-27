import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ChevronLeft, ChevronRight, User, LogOut, Upload as UploadIcon } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="h-16 flex items-center justify-between px-6 bg-transparent sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="w-8 h-8 bg-black/70 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer">
          <ChevronLeft size={24} />
        </button>
        <button onClick={() => navigate(1)} className="w-8 h-8 bg-black/70 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer">
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="flex items-center gap-4">
        {user?.role === 'artist' && (
          <Link 
            to="/upload" 
            className="hidden md:flex items-center gap-2 bg-white text-black font-bold py-2 px-4 rounded-full hover:scale-105 transition-transform text-sm"
          >
            <UploadIcon size={18} />
            Upload Music
          </Link>
        )}
        
        <div className="group relative">
          <button className="flex items-center gap-2 bg-black/70 hover:bg-[#282828] transition-colors p-1 pr-3 rounded-full cursor-pointer">
            <div className="w-7 h-7 bg-[#333] rounded-full flex items-center justify-center">
              <User size={18} className="text-gray-300" />
            </div>
            <span className="text-sm font-bold text-white hidden sm:block">{user?.username}</span>
          </button>
          
          <div className="absolute right-0 top-full pt-2 w-48 hidden group-hover:block z-50">
            <div className="bg-[#282828] rounded shadow-xl border border-white/10 p-1">
              <div className="px-3 py-2 text-xs text-gray-400 border-b border-white/10 mb-1 uppercase font-bold">Role: {user?.role}</div>
              <button 
                onClick={logout}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white rounded transition-colors cursor-pointer"
              >
                <LogOut size={16} />
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
