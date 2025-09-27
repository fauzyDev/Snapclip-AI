import React from 'react'
import ReactPlayer from 'react-player'

type PlayerVideo = {
  videoId: string
  start: number
}

export default function PlayerVideo({ videoId, start }: PlayerVideo) {
  return (
    <div>
      <ReactPlayer
        style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}
        src={`https://www.youtube.com/watch?v=${videoId}`}
        config={{
          youtube: {
            start: start
          }
        }}
        controls={true}
      />
    </div>
  )
}