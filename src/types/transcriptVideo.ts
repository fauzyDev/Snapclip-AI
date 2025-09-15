export interface TranscriptPerVideo {
  videoId: string;
  title: string;
  duration: number;
  caption: {
    text: string;
    start: number;
  }[];
};