import React from 'react'
import ReactPlayer from 'react-player'

type PlayerVideo = {
  videoId: string
  start: number
}

export default function PlayerVideo({ videoId, start }: PlayerVideo) {
  const [startTime, setStartTime] = React.useState<boolean>(false)
  const playerRef = React.useRef<any>(null)

  React.useEffect(() => {
      setStartTime(false)
  }, [videoId, start])

  const handlePlayVideo = () => {
    if (start && start > 0 && playerRef.current && !startTime) {
      setTimeout(() => {
        playerRef.current.seekTo(start)
        setStartTime(false);
      }, 100)
    }
  };

  return (
    <div>
      <ReactPlayer
        ref={playerRef}
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