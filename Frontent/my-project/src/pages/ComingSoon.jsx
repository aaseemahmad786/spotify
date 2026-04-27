import React from 'react';
import { Hammer, Music, Sparkles } from 'lucide-react';

const ComingSoon = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center gap-6 bg-gradient-to-b from-white/5 to-transparent rounded-3xl border border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1db954]/10 blur-[100px] rounded-full pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-[#1db954] shadow-inner relative z-10">
        <Hammer size={40} className="animate-pulse" />
      </div>
      <div className="relative z-10">
        <h1 className="text-4xl font-extrabold text-white mb-3 tracking-tight flex items-center justify-center gap-2">
          {title} <Sparkles size={24} className="text-yellow-400" />
        </h1>
        <p className="text-gray-400 max-w-md mx-auto text-lg">
          We're currently building this feature. Check back soon for an amazing experience!
        </p>
      </div>
      
      <div className="mt-8 flex items-center gap-4 text-white/20 relative z-10">
        <Music size={24} />
        <div className="w-2 h-2 bg-white/20 rounded-full"></div>
        <Music size={24} />
        <div className="w-2 h-2 bg-white/20 rounded-full"></div>
        <Music size={24} />
      </div>
    </div>
  );
};

export default ComingSoon;
