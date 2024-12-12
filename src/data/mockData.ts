import type { System } from '../types/scanner';

export const mockSystems: System[] = [
  {
    id: '1',
    name: 'Public Safety',
    departments: [
      {
        id: 'd1',
        name: 'Police Department',
        channels: [
          {
            id: 'c1',
            name: 'Dispatch',
            frequency: '460.500 MHz',
            recordings: [
              {
                id: 'r1',
                title: 'Traffic Stop - Main St',
                timestamp: '2024-03-10T15:30:00Z',
                duration: '2:30',
                audioUrl: '#',
                transcript: 'Unit 247 responding to traffic violation at Main and 5th.'
              },
              {
                id: 'r2',
                title: 'Suspicious Activity',
                timestamp: '2024-03-10T16:15:00Z',
                duration: '1:45',
                audioUrl: '#',
                transcript: 'Caller reports suspicious person behind Central Mall. Units en route.'
              }
            ]
          },
          {
            id: 'c2',
            name: 'Tactical',
            frequency: '460.750 MHz',
            recordings: [
              {
                id: 'r3',
                title: 'SWAT Operation',
                timestamp: '2024-03-10T14:00:00Z',
                duration: '5:20',
                audioUrl: '#',
                transcript: 'Team Alpha in position. Awaiting go signal.'
              }
            ]
          }
        ]
      },
      {
        id: 'd2',
        name: 'Fire Department',
        channels: [
          {
            id: 'c3',
            name: 'Fire Dispatch',
            frequency: '453.850 MHz',
            recordings: [
              {
                id: 'r4',
                title: 'Structure Fire Response',
                timestamp: '2024-03-10T13:20:00Z',
                duration: '3:15',
                audioUrl: '#',
                transcript: 'Engine 3 responding to structure fire at 1234 Oak Street.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Emergency Medical',
    departments: [
      {
        id: 'd3',
        name: 'Ambulance Service',
        channels: [
          {
            id: 'c4',
            name: 'EMS Dispatch',
            frequency: '155.340 MHz',
            recordings: [
              {
                id: 'r5',
                title: 'Medical Emergency',
                timestamp: '2024-03-10T17:45:00Z',
                duration: '2:00',
                audioUrl: '#',
                transcript: 'Medic 7 dispatched to cardiac emergency at Pine Grove Apartments.'
              },
              {
                id: 'r6',
                title: 'Vehicle Accident',
                timestamp: '2024-03-10T18:30:00Z',
                duration: '4:10',
                audioUrl: '#',
                transcript: 'Multiple units responding to multi-vehicle collision on Highway 101.'
              }
            ]
          }
        ]
      }
    ]
  }
];