import {
  NextResponse,
  NextRequest
} from 'next/server'
import {
  fetchVideosByPromptAndChannel,
  getCachedVideos,
  cacheVideos,
} from '@/libs/youtube/yt.fetch';
import {
  fetchTranscript,
  getCachedTranscript,
  cacheTranscript
} from "@/libs/youtube/yt.transcript";
import { CachedVideo } from '@/types/cache.video';

export async function POST(req: NextRequest) {
  const { message, channels } = await req.json();

  // Cek apakah data video sudah ada di cache
  const cached = await getCachedVideos(message);
  const isCached = Boolean(cached)

  // Ambil semua video dari semua channel
  const results = cached ?? await Promise.all(
    channels.map(async ({ id }: { id: string }) => fetchVideosByPromptAndChannel(message, id))
  );
  const videos: CachedVideo[] = results.flat();

  // Cache hasilnya
  if (!isCached) {
    await cacheVideos(message, videos);
  }

  if (videos.length === 0) {
    return NextResponse.json({ status: 404, message: "Tidak ada video" })
  }

  // Ambil transkrip dari video
  const rawTranscript = await Promise.all(
    videos.map(async (video) => {
      // cek apakah data transcript sudah ada di cache
      const cached = await getCachedTranscript(video.videoId)
      if (cached) {
        return cached;
      }

      // ambil data transcript
      const transcript = await fetchTranscript([video.videoId]);
      const obj = Object.values(transcript).flat()
      await cacheTranscript(video.videoId, obj);
      return obj
    })
  );

  const transcript = videos.map((video, index) => ({
    ...video,
    url: `https://www.youtube.com/watch?v=${video.videoId}`,
    caption: rawTranscript[index]
  }))

  if (transcript.length === 0) {
    return NextResponse.json({ status: 404, message: "Transcript tidak ditemukan" });
  }
  return NextResponse.json({ transcript });
}