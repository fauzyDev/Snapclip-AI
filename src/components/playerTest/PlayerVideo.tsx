import React from 'react'
import ReactPlayer from 'react-player'

type PlayerVideo = {
  videoId?: string
  start?: number
}

export default function PlayerVideo({ videoId, start }: PlayerVideo) {
  const playerRef = React.useRef<any>(null);

  // jangan render kalau datanya belum siap
  if (!videoId || start === undefined) {
    return null;
  }
  console.log("🎥 [Player props masuk] videoId:", videoId, "start:", start);

  return (
    <ReactPlayer
      key={`${videoId}-${start}`}
      ref={playerRef as any}
      style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}
      src={`https://www.youtube.com/watch?v=${videoId}`}
      config={{
        youtube: {
          start: start
        }
      }}
      controls
      onReady={() => {
        console.log("✅ [Player ready] start:", start, "instance:", playerRef.current);
      }}
      onPlay={() => {
        const current = playerRef.current?.getCurrentTime?.();
        console.log("▶️ [User klik Play] start param:", start, "actual:", current);
      }}
    />
  )     
}