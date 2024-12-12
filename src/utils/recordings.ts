import type { System, Recording } from '../types/scanner';

export function getAllRecordings(systems: System[]): Array<Recording & {
  systemName: string;
  departmentName: string;
  channelName: string;
  frequency: string;
}> {
  const recordings: Array<Recording & {
    systemName: string;
    departmentName: string;
    channelName: string;
    frequency: string;
  }> = [];

  systems.forEach(system => {
    system.departments.forEach(department => {
      department.channels.forEach(channel => {
        channel.recordings.forEach(recording => {
          recordings.push({
            ...recording,
            systemName: system.name,
            departmentName: department.name,
            channelName: channel.name,
            frequency: channel.frequency
          });
        });
      });
    });
  });

  return recordings;
}

export function getFilteredRecordings(
  systems: System[],
  type: 'system' | 'department' | 'channel',
  id: string
): Array<Recording & {
  systemName: string;
  departmentName: string;
  channelName: string;
  frequency: string;
}> {
  const recordings = getAllRecordings(systems);
  
  switch (type) {
    case 'system':
      return recordings.filter(r => 
        systems.find(s => s.id === id)?.name === r.systemName
      );
    case 'department':
      return recordings.filter(r => {
        for (const system of systems) {
          if (system.departments.find(d => d.id === id)?.name === r.departmentName) {
            return true;
          }
        }
        return false;
      });
    case 'channel':
      return recordings.filter(r => {
        for (const system of systems) {
          for (const dept of system.departments) {
            if (dept.channels.find(c => c.id === id)?.name === r.channelName) {
              return true;
            }
          }
        }
        return false;
      });
    default:
      return recordings;
  }
}