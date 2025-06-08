interface Track {
  id: string; // internal unique ID
  title: string;
  youtubeId: string;
  duration: number; // in seconds
  thumbnail: string;
  artist?: string;
  requestedBy?: string;
  addedAt: number; // timestamp
}

interface PlaylistQueue {
  currentIndex: number;
  loopMode: "none" | "one" | "all"; // future support
  tracks: Track[];
  startedAt: number; // timestamp when current song started
}

// Global state for the radio
interface StreamState {
  queue: PlaylistQueue;
  isStreaming: boolean;
  listeners: number;
}
