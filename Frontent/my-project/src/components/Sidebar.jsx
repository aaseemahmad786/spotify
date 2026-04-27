import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Library, PlusSquare, Heart, Music } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-black p-6 flex flex-col gap-8 h-full hidden md:flex">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 bg-[#1db954] rounded-full flex items-center justify-center">
          <Music className="text-black" size={24} fill="currentColor" />
        </div>
        <span className="text-2xl font-bold text-white tracking-tighter">Spotify</span>
      </div>

      <nav className="flex flex-col gap-4">
        <NavLink to="/" className={({isActive}) => `flex items-center gap-4 transition-colors hover:text-white ${isActive ? 'text-white' : 'text-gray-400'}`}>
          <Home size={24} />
          <span className="font-semibold text-sm">Home</span>
        </NavLink>
        <NavLink to="/search" className={({isActive}) => `flex items-center gap-4 transition-colors hover:text-white ${isActive ? 'text-white' : 'text-gray-400'}`}>
          <Search size={24} />
          <span className="font-semibold text-sm">Search</span>
        </NavLink>
        <NavLink to="/library" className={({isActive}) => `flex items-center gap-4 transition-colors hover:text-white ${isActive ? 'text-white' : 'text-gray-400'}`}>
          <Library size={24} />
          <span className="font-semibold text-sm">Your Library</span>
        </NavLink>
      </nav>

      <div className="mt-4 flex flex-col gap-4">
        <NavLink to="/playlist" className={({isActive}) => `flex items-center gap-4 transition-colors hover:text-white ${isActive ? 'text-white' : 'text-gray-400'}`}>
          <div className="bg-gray-400 p-1 rounded-sm hover:bg-white transition-colors">
            <PlusSquare size={16} className="text-black" />
          </div>
          <span className="font-semibold text-sm">Create Playlist</span>
        </NavLink>
        <NavLink to="/liked" className={({isActive}) => `flex items-center gap-4 transition-colors hover:text-white ${isActive ? 'text-white' : 'text-gray-400'}`}>
          <div className="bg-gradient-to-br from-indigo-700 to-blue-300 p-1 rounded-sm hover:from-indigo-600 hover:to-blue-200 transition-colors">
            <Heart size={16} className="text-white fill-current" />
          </div>
          <span className="font-semibold text-sm">Liked Songs</span>
        </NavLink>
      </div>

      <div className="mt-auto border-t border-gray-800 pt-6">
        <div className="text-xs text-gray-400 hover:underline cursor-pointer">Cookies</div>
        <div className="text-xs text-gray-400 hover:underline cursor-pointer mt-2">Privacy Policy</div>
      </div>
    </div>
  );
};

export default Sidebar;
