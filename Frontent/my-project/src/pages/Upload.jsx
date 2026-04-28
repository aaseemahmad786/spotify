import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload as UploadIcon, Music, CheckCircle2, AlertCircle, FileAudio } from 'lucide-react';

const Upload = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('audio/')) {
      setFile(selectedFile);
      setStatus({ type: '', message: '' });
    } else {
      setFile(null);
      setStatus({ type: 'error', message: 'Please select a valid audio file' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !file) {
      setStatus({ type: 'error', message: 'Title and audio file are required' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    const formData = new FormData();
    formData.append('title', title);
    formData.append('music', file);

    try {
      // Backend expects 'music' field name as per music.routes.js: router.post("/upload",upload.single("music"), ...)
      const response = await fetch('https://spotify-eqgk.onrender.com/api/music/upload', {
        method: 'POST',
        credentials: 'include',
        // Credentials include cookies (JWT token)
        body: formData,
        // Don't set Content-Type header manually for FormData, browser does it with boundary
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }

      setStatus({ type: 'success', message: 'Music uploaded successfully!' });
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="bg-[#181818] rounded-2xl p-8 border border-white/5 shadow-2xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-[#1db954] rounded-full flex items-center justify-center">
            <UploadIcon className="text-black" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Upload Your Music</h1>
            <p className="text-gray-400">Share your sound with the world</p>
          </div>
        </div>

        {status.message && (
          <div className={`flex items-center gap-3 p-4 rounded-lg mb-6 ${
            status.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
          }`}>
            {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            <span className="text-sm font-medium">{status.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-300 uppercase tracking-wider">Song Title</label>
            <input
              type="text"
              placeholder="What's the name of your track?"
              className="w-full bg-[#2a2a2a] border border-transparent focus:border-[#1db954] focus:bg-[#333] rounded-lg p-4 text-white outline-none transition-all"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-300 uppercase tracking-wider">Audio File</label>
            <div className="relative group">
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center gap-4 transition-all ${
                file ? 'border-[#1db954] bg-[#1db954]/5' : 'border-gray-700 hover:border-gray-500 bg-[#222]'
              }`}>
                {file ? (
                  <>
                    <div className="w-16 h-16 bg-[#1db954] rounded-full flex items-center justify-center shadow-lg shadow-[#1db954]/20">
                      <FileAudio className="text-black" size={32} />
                    </div>
                    <div className="text-center">
                      <p className="text-white font-bold">{file.name}</p>
                      <p className="text-gray-400 text-sm">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-[#333] rounded-full flex items-center justify-center group-hover:bg-[#444] transition-colors">
                      <Music className="text-gray-400" size={32} />
                    </div>
                    <div className="text-center">
                      <p className="text-white font-bold text-lg">Choose an audio file</p>
                      <p className="text-gray-400 text-sm">MP3, WAV, or FLAC (Max 20MB)</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading || !file || !title}
              className="w-full bg-[#1db954] text-black font-extrabold py-4 rounded-full text-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed shadow-xl shadow-[#1db954]/10"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Uploading to Spotify...
                </div>
              ) : 'Publish Song'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;
