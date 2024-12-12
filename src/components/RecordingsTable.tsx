import React from 'react';
import { Play, ChevronUp, ChevronDown } from 'lucide-react';
import type { Recording } from '../types/scanner';
import { useSort, type SortConfig } from '../hooks/useSort';
import { formatDateTime } from '../utils/dateFormat';

interface RecordingsTableProps {
  recordings: Array<Recording & {
    systemName: string;
    departmentName: string;
    channelName: string;
    frequency: string;
  }>;
  onPlay: (recording: Recording) => void;
}

type SortableRecording = RecordingsTableProps['recordings'][0];

interface ColumnHeader {
  key: keyof SortableRecording;
  label: string;
}

const columns: ColumnHeader[] = [
  { key: 'timestamp', label: 'Date/Time' },
  { key: 'systemName', label: 'System' },
  { key: 'departmentName', label: 'Department' },
  { key: 'channelName', label: 'Channel' },
  { key: 'frequency', label: 'Frequency' },
  { key: 'duration', label: 'Duration' },
  { key: 'transcript', label: 'Transcript' },
];

function SortIndicator({ sortConfig, columnKey }: { 
  sortConfig?: SortConfig<SortableRecording>;
  columnKey: keyof SortableRecording;
}) {
  if (!sortConfig || sortConfig.key !== columnKey) return null;
  
  return sortConfig.direction === 'asc' 
    ? <ChevronUp className="w-4 h-4 inline-block ml-1" />
    : <ChevronDown className="w-4 h-4 inline-block ml-1" />;
}

export function RecordingsTable({ recordings, onPlay }: RecordingsTableProps) {
  const { items: sortedRecordings, sortConfig, requestSort } = useSort(recordings, {
    key: 'timestamp',
    direction: 'desc'
  });

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
              {columns.map(({ key, label }) => (
                <th
                  key={key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort(key)}
                >
                  <span className="flex items-center">
                    {label}
                    <SortIndicator sortConfig={sortConfig} columnKey={key} />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedRecordings.map((recording) => (
              <tr key={recording.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onPlay(recording)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Play className="w-5 h-5" />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatDateTime(recording.timestamp)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{recording.systemName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{recording.departmentName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{recording.channelName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{recording.frequency}</td>
                <td className="px-6 py-4 whitespace-nowrap">{recording.duration}</td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-900 max-w-lg truncate">{recording.transcript}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}