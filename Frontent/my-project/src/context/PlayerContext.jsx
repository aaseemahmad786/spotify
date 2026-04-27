import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  
  const audioRef = useRef(null);

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.uri;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.error("Error playing audio", e));
    }
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!currentSong || !audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.error("Error playing audio", e));
    }
  };

  const playSong = (song) => {
    if (currentSong?._id === song._id) {
      togglePlay();
    } else {
      setCurrentSong(song);
    }
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const onEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  const handleSeek = (e) => {
    if (!audioRef.current || !duration) return;
    const seekTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setProgress(e.target.value);
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value / 100);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <PlayerContext.Provider value={{
      currentSong,
      isPlaying,
      progress,
      currentTime: formatTime(currentTime),
      duration: formatTime(duration),
      volume: volume * 100,
      playSong,
      togglePlay,
      handleSeek,
      handleVolumeChange
    }}>
      {children}
      <audio 
        ref={audioRef}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
      />
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
