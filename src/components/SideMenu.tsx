import React from 'react';
import { Radio, ChevronRight } from 'lucide-react';
import type { System } from '../types/scanner';

interface SideMenuProps {
  systems: System[];
  onSelect: (type: 'system' | 'department' | 'channel', id: string, label: string) => void;
}

export function SideMenu({ systems, onSelect }: SideMenuProps) {
  const [expandedSystem, setExpandedSystem] = React.useState<string | null>(null);
  const [expandedDepartment, setExpandedDepartment] = React.useState<string | null>(null);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 h-[calc(100vh-2rem)]">
      <div className="flex items-center gap-2 mb-4">
        <Radio className="w-5 h-5 text-blue-500" />
        <h2 className="text-xl font-semibold">Navigation</h2>
      </div>
      
      <div className="space-y-2 overflow-y-auto h-[calc(100%-4rem)]">
        {systems.map((system) => (
          <div key={system.id} className="border rounded-lg">
            <button
              className="w-full p-2 text-left hover:bg-gray-50 flex items-center justify-between"
              onClick={() => {
                setExpandedSystem(expandedSystem === system.id ? null : system.id);
                onSelect('system', system.id, system.name);
              }}
            >
              <span className="font-medium">{system.name}</span>
              <ChevronRight className={`w-4 h-4 transition-transform ${
                expandedSystem === system.id ? 'rotate-90' : ''
              }`} />
            </button>
            
            {expandedSystem === system.id && (
              <div className="pl-2">
                {system.departments.map((dept) => (
                  <div key={dept.id} className="border-l">
                    <button
                      className="w-full p-2 text-left hover:bg-gray-50 flex items-center justify-between"
                      onClick={() => {
                        setExpandedDepartment(expandedDepartment === dept.id ? null : dept.id);
                        onSelect('department', dept.id, dept.name);
                      }}
                    >
                      <span>{dept.name}</span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${
                        expandedDepartment === dept.id ? 'rotate-90' : ''
                      }`} />
                    </button>
                    
                    {expandedDepartment === dept.id && (
                      <div className="pl-2">
                        {dept.channels.map((channel) => (
                          <button
                            key={channel.id}
                            className="w-full p-2 text-left hover:bg-gray-50 text-sm flex items-center justify-between group"
                            onClick={() => onSelect('channel', channel.id, channel.name)}
                          >
                            <span>{channel.name}</span>
                            <span className="text-gray-500 group-hover:text-gray-700">
                              {channel.frequency}
                            </span>
                          </button>
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