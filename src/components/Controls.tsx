import React from 'react';
import { Play, Pause, SkipForward, Volume2 } from 'lucide-react';

export function Controls() {
  return (
    <div className="bg-gray-800 p-3 rounded-lg">
      <h3 className="text-white text-sm mb-2">Scanner Controls</h3>
      <div className="flex gap-2 justify-center">
        <button className="bg-blue-500 hover:bg-blue-600 text-white p-1.5 rounded-full">
          <Play className="w-4 h-4" />
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full">
          <Pause className="w-4 h-4" />
        </button>
        <button className="bg-gray-600 hover:bg-gray-700 text-white p-1.5 rounded-full">
          <SkipForward className="w-4 h-4" />
        </button>
        <button className="bg-gray-600 hover:bg-gray-700 text-white p-1.5 rounded-full">
          <Volume2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}