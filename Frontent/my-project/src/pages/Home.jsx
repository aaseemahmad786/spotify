import React, { useEffect, useState } from 'react';
import { Play, Pause, Music, Mic2, Search, Sparkles, TrendingUp } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const { playSong, currentSong, isPlaying } = usePlayer();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('https://spotify-eqgk.onrender.com/api/music');
        const data = await response.json();
        setSongs(data);
        setFilteredSongs(data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredSongs(songs);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      setFilteredSongs(songs.filter(song => 
        song.title.toLowerCase().includes(lowerQuery) || 
        (song.artist?.username || '').toLowerCase().includes(lowerQuery)
      ));
    }
  }, [searchQuery, songs]);

  const featuredSong = songs.length > 0 ? songs[0] : null;

  return (
    <div className="space-y-10 relative z-10 pb-10">
      {/* Top Header & Search */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-extrabold mb-2 bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent tracking-tight">
            Discover
          </h1>
          <p className="text-gray-400 text-sm font-medium flex items-center gap-2">
            <Sparkles size={16} className="text-[#1db954]" /> Your personalized music universe
          </p>
        </div>

        <div className="relative group w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400 group-focus-within:text-white transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search artists, songs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#1db954]/50 focus:bg-white/10 transition-all backdrop-blur-md shadow-xl"
          />
        </div>
      </header>

      {loading ? (
        <div className="space-y-8">
          <div className="h-64 bg-white/5 rounded-3xl animate-pulse"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-white/5 p-4 rounded-2xl animate-pulse">
                <div className="aspect-square bg-white/10 rounded-xl mb-4"></div>
                <div className="h-4 bg-white/10 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-white/10 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      ) : songs.length > 0 ? (
        <>
          {/* Featured Hero Section */}
          {!searchQuery && featuredSong && (
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1db954]/20 via-[#181818] to-black border border-white/5 shadow-2xl group cursor-pointer transition-transform duration-500 hover:scale-[1.01]"
                     onClick={() => playSong(featuredSong)}>
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#1db954]/20 blur-[100px] rounded-full pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center md:items-end gap-8">
                <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 shadow-2xl shadow-black/50 rounded-2xl overflow-hidden relative group-hover:shadow-[#1db954]/20 transition-all duration-500">
                  <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center">
                     <Music size={80} className="text-white/20" />
                  </div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                
                <div className="flex-1 text-center md:text-left z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold uppercase tracking-widest text-[#1db954] mb-4">
                    <TrendingUp size={14} /> Featured Track
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tighter drop-shadow-lg">
                    {featuredSong.title}
                  </h2>
                  <p className="text-gray-300 text-lg md:text-xl font-medium mb-8 flex items-center justify-center md:justify-start gap-2">
                    <Mic2 size={20} className="text-gray-400" />
                    {featuredSong.artist?.username || 'Unknown Artist'}
                  </p>
                  
                  <div className="flex items-center justify-center md:justify-start gap-4">
                    <button 
                      onClick={(e) => { e.stopPropagation(); playSong(featuredSong); }}
                      className="bg-[#1db954] text-black font-extrabold py-3 px-8 rounded-full flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#1db954]/30"
                    >
                      {currentSong?._id === featuredSong._id && isPlaying ? (
                        <><Pause fill="black" size={20} /> Pause</>
                      ) : (
                        <><Play fill="black" size={20} className="ml-0.5" /> Play Now</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Grid Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold tracking-tight">
                {searchQuery ? `Search Results (${filteredSongs.length})` : 'All Tracks'}
              </h2>
            </div>
            
            {filteredSongs.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredSongs.map((song) => {
                  const isThisSongPlaying = currentSong?._id === song._id && isPlaying;
                  return (
                    <div 
                      key={song._id} 
                      className="bg-white/5 hover:bg-white/10 border border-white/0 hover:border-white/10 p-4 rounded-2xl transition-all duration-300 group cursor-pointer backdrop-blur-sm shadow-xl"
                      onClick={() => playSong(song)}
                    >
                      <div className="relative aspect-square mb-4 shadow-lg shadow-black/50 overflow-hidden rounded-xl">
                        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black group-hover:scale-105 transition-transform duration-700 flex items-center justify-center">
                          <Music size={50} className="text-white/10" />
                        </div>
                        
                        {/* Glassmorphism Play Button Overlay */}
                        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px] ${isThisSongPlaying ? 'opacity-100' : ''}`}>
                          <button 
                            className={`w-14 h-14 bg-[#1db954] rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-[#1ed760] ${isThisSongPlaying ? 'scale-100' : 'scale-90 group-hover:scale-100'}`}
                          >
                            {isThisSongPlaying ? (
                              <Pause fill="black" size={28} className="text-black" />
                            ) : (
                              <Play fill="black" size={28} className="ml-1 text-black" />
                            )}
                          </button>
                        </div>
                        
                        {/* Audio Visualizer Indicator */}
                        {isThisSongPlaying && (
                          <div className="absolute top-3 right-3 flex items-end gap-1 h-4">
                            <div className="w-1 bg-[#1db954] h-full animate-[bounce_1s_infinite]"></div>
                            <div className="w-1 bg-[#1db954] h-2/3 animate-[bounce_1s_infinite_0.2s]"></div>
                            <div className="w-1 bg-[#1db954] h-4/5 animate-[bounce_1s_infinite_0.4s]"></div>
                          </div>
                        )}
                      </div>
                      
                      <h3 className="font-bold text-white text-base truncate mb-1 group-hover:text-[#1db954] transition-colors">
                        {song.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                        <Mic2 size={12} />
                        <span className="truncate">{song.artist?.username || 'Unknown Artist'}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 text-gray-400">
                <Search size={48} className="mx-auto mb-4 opacity-20" />
                <p>No tracks found for "{searchQuery}"</p>
              </div>
            )}
          </section>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center gap-6 bg-gradient-to-b from-white/5 to-transparent rounded-3xl border border-white/5">
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-gray-500 shadow-inner">
            <Music size={48} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">It's a little quiet here...</h2>
            <p className="text-gray-400 max-w-sm mx-auto">Upload the first track and start building your ultimate music collection.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
