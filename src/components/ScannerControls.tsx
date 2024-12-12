import React from 'react';
import { ScannerDisplay } from './ScannerDisplay';
import { Controls } from './Controls';

export function ScannerControls() {
  return (
    <div className="space-y-4">
      <ScannerDisplay />
      <Controls />
    </div>
  );
}