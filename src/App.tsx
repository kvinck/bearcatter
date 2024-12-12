import React from 'react';
import { SideMenu } from './components/SideMenu';
import { RecordingsTable } from './components/RecordingsTable';
import { ScannerControls } from './components/ScannerControls';
import { getAllRecordings, getFilteredRecordings } from './utils/recordings';
import { mockSystems } from './data/mockData';
import type { Recording } from './types/scanner';

function App() {
  const [selectedFilter, setSelectedFilter] = React.useState<{
    type: 'system' | 'department' | 'channel';
    id: string;
    label: string;
  } | null>(null);

  const recordings = selectedFilter
    ? getFilteredRecordings(mockSystems, selectedFilter.type, selectedFilter.id)
    : getAllRecordings(mockSystems);

  const handlePlay = (recording: Recording) => {
    console.log('Playing recording:', recording.id);
    // TODO: Implement audio playback
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Radio Scanner Control</h1>
          {selectedFilter && (
            <div className="mt-2 text-sm text-gray-600">
              Filtering by {selectedFilter.type}: {selectedFilter.label}
            </div>
          )}
        </header>
        
        <div className="grid grid-cols-12 gap-4">
          {/* Main content area */}
          <div className="col-span-9">
            <div className="mb-4 flex justify-between items-center">
              <div className="text-gray-600">
                Showing {recordings.length} recording{recordings.length !== 1 ? 's' : ''}
              </div>
              {selectedFilter && (
                <button
                  onClick={() => setSelectedFilter(null)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear filter
                </button>
              )}
            </div>
            <RecordingsTable recordings={recordings} onPlay={handlePlay} />
          </div>
          
          {/* Right sidebar */}
          <div className="col-span-3 space-y-4">
            <ScannerControls />
            <SideMenu
              systems={mockSystems}
              onSelect={(type, id, label) => setSelectedFilter({ type, id, label })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;