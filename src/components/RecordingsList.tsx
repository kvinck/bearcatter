import React from 'react';
import { ChevronRight, Radio } from 'lucide-react';
import type { System } from '../types/scanner';

interface RecordingsListProps {
  systems: System[];
}

export function RecordingsList({ systems }: RecordingsListProps) {
  const [expandedSystem, setExpandedSystem] = React.useState<string | null>(null);
  const [expandedDepartment, setExpandedDepartment] = React.useState<string | null>(null);
  const [expandedChannel, setExpandedChannel] = React.useState<string | null>(null);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <Radio className="w-5 h-5 text-blue-500" />
        <h2 className="text-xl font-semibold">Recordings</h2>
      </div>
      
      <div className="space-y-2">
        {systems.map((system) => (
          <div key={system.id} className="border rounded-lg">
            <button
              className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-50"
              onClick={() => setExpandedSystem(expandedSystem === system.id ? null : system.id)}
            >
              <span className="font-medium">{system.name}</span>
              <ChevronRight className={`w-5 h-5 transform transition-transform ${
                expandedSystem === system.id ? 'rotate-90' : ''
              }`} />
            </button>
            
            {expandedSystem === system.id && (
              <div className="pl-4">
                {system.departments.map((dept) => (
                  <div key={dept.id} className="border-l">
                    <button
                      className="w-full p-2 text-left flex items-center justify-between hover:bg-gray-50"
                      onClick={() => setExpandedDepartment(expandedDepartment === dept.id ? null : dept.id)}
                    >
                      <span>{dept.name}</span>
                      <ChevronRight className={`w-4 h-4 transform transition-transform ${
                        expandedDepartment === dept.id ? 'rotate-90' : ''
                      }`} />
                    </button>
                    
                    {expandedDepartment === dept.id && (
                      <div className="pl-4">
                        {dept.channels.map((channel) => (
                          <div key={channel.id} className="border-l">
                            <button
                              className="w-full p-2 text-left flex items-center justify-between hover:bg-gray-50"
                              onClick={() => setExpandedChannel(expandedChannel === channel.id ? null : channel.id)}
                            >
                              <span>{channel.name}</span>
                              <span className="text-sm text-gray-500">{channel.frequency}</span>
                            </button>
                            
                            {expandedChannel === channel.id && (
                              <div className="pl-4 pr-2 pb-2">
                                {channel.recordings.map((recording) => (
                                  <div
                                    key={recording.id}
                                    className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                                  >
                                    <div className="flex justify-between text-sm">
                                      <span>{recording.title}</span>
                                      <span className="text-gray-500">{recording.duration}</span>
                                    </div>
                                    <p className="text-xs text-gray-600 mt-1">{recording.transcript}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}