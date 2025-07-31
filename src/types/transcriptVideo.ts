export type TranscriptPerVideo = {
  videoId: string;
  title: string;
  caption: {
    text: string;
    start: number;
  }[];
};