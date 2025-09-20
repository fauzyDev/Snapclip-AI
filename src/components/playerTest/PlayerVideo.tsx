import React from 'react'
import ReactPlayer from 'react-player'

export default function PlayerVideo({ videoId, start }: { videoId: string; start: number }) {
  return (
    <div>
      <h2>Test</h2>
      <ReactPlayer
        style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}
        src={`https://www.youtube.com/watch?v=${videoId}`}
        config={{
          youtube: {
            start,
          },
        }}
        controls
      />
    </div>
  )
}
