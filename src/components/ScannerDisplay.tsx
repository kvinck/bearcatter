import React from 'react';
import { Monitor } from 'lucide-react';

export function ScannerDisplay() {
  return (
    <div className="bg-black p-3 rounded-lg text-green-400 font-mono">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm">Scanner Display</h3>
        <Monitor className="w-4 h-4" />
      </div>
      <div className="border border-green-400 p-2 h-20 flex items-center justify-center">
        <p className="text-lg">162.550 MHz</p>
      </div>
    </div>
  );
}