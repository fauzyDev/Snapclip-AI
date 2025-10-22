import React from "react";
import ReactPlayer from "react-player";

interface PlayerVideoProps {
  videoId: string;
  start: number;
}

export default function PlayerVideo({ videoId, start }: PlayerVideoProps) {
  return (
    <div className="w-full aspect-video">
      <ReactPlayer
        src={`https://www.youtube.com/watch?v=${videoId}`}
        width="100%"
        height="100%"
        controls
        config={{
          youtube: {
            start: start
          }
        }}
      />
    </div>
  );
}