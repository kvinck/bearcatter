export interface Recording {
  id: string;
  title: string;
  timestamp: string;
  duration: string;
  audioUrl: string;
  transcript: string;
}

export interface Channel {
  id: string;
  name: string;
  frequency: string;
  recordings: Recording[];
}

export interface Department {
  id: string;
  name: string;
  channels: Channel[];
}

export interface System {
  id: string;
  name: string;
  departments: Department[];
}