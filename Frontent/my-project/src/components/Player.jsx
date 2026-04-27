import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { 
  Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, 
  Volume2, Mic2, ListMusic, MonitorSpeaker, Maximize2, Music 
} from 'lucide-react';

const Player = () => {
  const {
    currentSong,
    isPlaying,
    progress,
    currentTime,
    duration,
    volume,
    togglePlay,
    handleSeek,
    handleVolumeChange
  } = usePlayer();

  if (!currentSong) return null; // Only show player if a song is loaded for a cleaner UI

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl h-24 bg-[#181818]/80 backdrop-blur-xl border border-white/10 rounded-2xl px-6 flex items-center justify-between z-50 shadow-2xl shadow-black/50">
      {/* Current Song Info */}
      <div className="flex items-center gap-4 w-[30%]">
        <div className="relative w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden shadow-lg group cursor-pointer">
          <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-black flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
            <Music size={28} className="text-indigo-400/50" />
          </div>
          {isPlaying && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-1 bg-white h-1/2 animate-[bounce_1s_infinite]"></div>
              <div className="w-1 bg-white h-2/3 animate-[bounce_1s_infinite_0.2s]"></div>
              <div className="w-1 bg-white h-3/4 animate-[bounce_1s_infinite_0.4s]"></div>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <div className="text-sm font-bold text-white hover:underline cursor-pointer truncate max-w-[200px]">
            {currentSong.title}
          </div>
          <div className="text-xs text-gray-400 hover:text-white hover:underline cursor-pointer truncate max-w-[200px] transition-colors mt-0.5">
            {currentSong.artist?.username || 'Unknown Artist'}
          </div>
        </div>
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center gap-2 max-w-[40%] w-full">
        <div className="flex items-center gap-6">
          <Shuffle size={18} className="text-gray-400 hover:text-white hover:scale-110 cursor-pointer transition-all" />
          <SkipBack size={22} fill="currentColor" className="text-gray-400 hover:text-white hover:scale-110 cursor-pointer transition-all" />
          <button 
            onClick={togglePlay}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-white/20"
          >
            {isPlaying ? (
              <Pause fill="black" size={20} className="text-black" />
            ) : (
              <Play fill="black" size={20} className="ml-1 text-black" />
            )}
          </button>
          <SkipForward size={22} fill="currentColor" className="text-gray-400 hover:text-white hover:scale-110 cursor-pointer transition-all" />
          <Repeat size={18} className="text-gray-400 hover:text-white hover:scale-110 cursor-pointer transition-all" />
        </div>
        
        <div className="flex items-center gap-3 w-full max-w-md group">
          <span className="text-[11px] font-medium text-gray-400 min-w-[35px] text-right">{currentTime}</span>
          <div className="flex-1 h-1.5 bg-gray-700/50 rounded-full cursor-pointer relative flex items-center overflow-hidden">
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={progress || 0} 
              onChange={handleSeek}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div 
              className="h-full bg-white group-hover:bg-[#1db954] rounded-full pointer-events-none transition-colors relative" 
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"></div>
            </div>
          </div>
          <span className="text-[11px] font-medium text-gray-400 min-w-[35px]">{duration}</span>
        </div>
      </div>

      {/* Volume & Misc Controls */}
      <div className="flex items-center gap-4 w-[30%] justify-end">
        <Mic2 size={18} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
        <ListMusic size={18} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
        <MonitorSpeaker size={18} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
        <div className="flex items-center gap-2 w-28 group">
          <Volume2 size={18} className="text-gray-400 group-hover:text-white transition-colors" />
          <div className="flex-1 h-1.5 bg-gray-700/50 rounded-full relative cursor-pointer flex items-center overflow-hidden">
             <input 
              type="range" 
              min="0" 
              max="100" 
              value={volume} 
              onChange={handleVolumeChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div 
              className="h-full bg-white group-hover:bg-[#1db954] rounded-full pointer-events-none transition-colors relative" 
              style={{ width: `${volume}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"></div>
            </div>
          </div>
        </div>
        <Maximize2 size={18} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
      </div>
    </div>
  );
};

export default Player;
