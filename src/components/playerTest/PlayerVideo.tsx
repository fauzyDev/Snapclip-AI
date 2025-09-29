import React from 'react'
import ReactPlayer from 'react-player'

type PlayerVideo = {
  videoId?: string
  start?: number
}

export default function PlayerVideo({ videoId, start }: PlayerVideo) {
  const playerRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (playerRef.current && start !== undefined) {
      const timer = setTimeout(() => {
        // true biar selalu lompat walau out of buffer
        playerRef.current?.seekTo(start, "seconds");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [start, videoId]);

  return (
    <ReactPlayer
      ref={playerRef as any}
      style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}
      src={`https://www.youtube.com/watch?v=${videoId}`}
      config={{
        youtube: {
          start: start
        }
      }}
      controls
    />
  )
}