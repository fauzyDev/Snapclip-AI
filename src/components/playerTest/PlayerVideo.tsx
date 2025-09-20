import React from 'react'
import ReactPlayer from 'react-player'

type PlayerVideo = {
  videoId: string
  start: number
  playerKey?: string
}

export default function PlayerVideo({ videoId, start, playerKey }: PlayerVideo) {
  const playerRef = React.useRef<any>(null)

  return (
    <div>
      <h2>Test</h2>
      <ReactPlayer
        ref={playerRef}
        key={playerKey}
        style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}
        src={`https://www.youtube.com/watch?v=${videoId}`}
        config={{
          youtube: {
            start,
          },
        }}
        controls
        onReady={() => {
          if (playerRef.current) {
            console.log("SeekTo", start)
            playerRef.current.seekTo(start, 'seconds')
          }
        }}
      />
    </div>
  )
}