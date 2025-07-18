import {
  NextResponse,
  NextRequest
} from 'next/server'
import {
  fetchVideosByPromptAndChannel,
  getCachedVideos,
  cacheVideos,
  CHANNELS
} from '@/libs/youtube/yt.fetch';
import {
  fetchTranscript,
  getCachedTranscript,
  cacheTranscript
} from "@/libs/youtube/yt.transcript";
import { CachedVideo } from '@/types/cache.video';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  // Cek apakah data video sudah ada di cache
  const cached = await getCachedVideos(prompt);
  const isCached = Boolean(cached)

  // Ambil semua video dari semua channel
  const results = cached ?? await Promise.all(
    CHANNELS.map(async ({ id }) => fetchVideosByPromptAndChannel(prompt, id))
  );
  const videos: CachedVideo[] = results.flat();

  // Cache hasilnya
  if (!isCached) {
    await cacheVideos(prompt, videos);
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

  const transcript = rawTranscript.flat();
  if (transcript.length === 0) {
    return NextResponse.json({ status: 404, message: "Transcript tidak ditemukan" });
  }
  return NextResponse.json({ videos, transcript });
}