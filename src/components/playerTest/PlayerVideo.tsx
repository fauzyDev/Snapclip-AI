import React from 'react'
import ReactPlayer from 'react-player'

type PlayerVideo = {
  videoId?: string
  start?: number
}

export default function PlayerVideo({ videoId, start }: PlayerVideo) {
  const playerRef = React.useRef<any>(null);
  // console.log("🎥 Player render:", { videoId, start });

  // React.useEffect(() => {
  //   if (playerRef.current && start !== undefined) {
  //     const timer = setTimeout(() => {
  //       playerRef.current?.seekTo(start, "seconds");
  //     }, 500);
  //     return () => clearTimeout(timer);
  //   }
  // }, [start, videoId]);

  console.log("🎥 [Render] videoId:", videoId, "start:", start);

  React.useEffect(() => {
    console.log("✅ [Mounted] Player dengan props:", { videoId, start });
    return () => {
      console.log("❌ [Unmounted] Player dengan props:", { videoId, start });
    };
  }, [videoId, start]);

  // jangan render kalau datanya belum siap
  if (!videoId || start === undefined) {
    console.log("⏳ Player belum render, data belum siap...");
    return null;
  }

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
      onReady={() => {
        if (start) {
          playerRef.current?.seekTo(start, "seconds")
        }
      }}
      controls
    />
  )
}