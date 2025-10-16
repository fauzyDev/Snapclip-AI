import React from "react";
import ReactPlayer from "react-player";

interface PlayerVideoProps {
  videoId: string;
  start: number;
}

export default function PlayerVideo({ videoId, start }: PlayerVideoProps) {
  if (!videoId || start == null) return null;

  const src = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <div className="w-full aspect-video">
      <ReactPlayer
        key={`${videoId}-${start}`}
        src={src}
        controls
        config={{
          youtube: {
            start: start
          }
        }}
        width="100%"
        height="100%"
      />
    </div>
  );
}