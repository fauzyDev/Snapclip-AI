export interface TranscriptPerVideo {
  videoId: string;
  title: string;
  caption: {
    text: string;
    start: number;
  }[];
};