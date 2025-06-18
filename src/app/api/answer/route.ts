import { NextResponse, NextRequest } from 'next/server'
import { fetchVideosByPromptAndChannel } from '@/libs/yt.fetch';
import { fetchTranscript } from '@/libs/yt.transcript';
import { getCachedVideos } from "@/libs/yt.fetch";
import { cacheVideos } from "@/libs/yt.fetch";
import { getCachedTranscript } from '@/libs/yt.transcript';
import { cacheTranscript } from '@/libs/yt.transcript';
import { CHANNELS } from '@/libs/yt.fetch';
import { main } from '@/libs/llm';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message)
      return NextResponse.json({ error: "Message required" }, { status: 400 });

    // Cek apakah data video sudah ada di cache
    const cached = await getCachedVideos(message);
    const isCached = Boolean(cached)

    // Ambil semua video dari semua channel
    const results = cached ?? await Promise.all(
      CHANNELS.map(async ({ id }) => fetchVideosByPromptAndChannel(message, id))
    );
    const videos = results.flat();

    // Cache hasilnya
    if (!isCached) await cacheVideos(message, videos);
    if (videos.length === 0)
      return NextResponse.json({ error: "No video found" }, { status: 404 });

    // Ambil transkrip dari video
    const rawTranscript = await Promise.all(
      videos.map(async (video) => {
        // cek apakah data transcript sudah ada di cache
        const cached = await getCachedTranscript(video.videoId)
        if (cached) {
          return cached
        }

        // ambil data transcript
        const transcript = await fetchTranscript(video.videoId);
        await cacheTranscript(video.videoId, transcript);
        return transcript
      })
    );
    const transcript = rawTranscript.flat()

    // Kirim ke LLM (Gemini)
    const content = await main(message, transcript);

    return NextResponse.json({ status: 200, data: content, video: videos, cached: isCached, message: "Success" });
  } catch (error) {
    return NextResponse.json({ status: 500, error, message: "Internal Server Error" });
  }
}
