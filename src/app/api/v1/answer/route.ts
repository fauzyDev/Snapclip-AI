import { fetchVideosByPromptAndChannel } from '@/libs/youtube/yt.fetch';
import { fetchTranscript } from '@/libs/youtube/yt.transcript';
import { getCachedVideos } from "@/libs/youtube/yt.fetch";
import { cacheVideos } from "@/libs/youtube/yt.fetch";
import { getCachedTranscript } from '@/libs/youtube/yt.transcript';
import { cacheTranscript } from '@/libs/youtube/yt.transcript';
import { CHANNELS } from '@/libs/youtube/yt.fetch';
import { main } from '@/libs/openai/llm';

export const runtime = 'edge';

export async function POST(req: Request) {
  const encoder = new TextEncoder();

  try {
    const { message } = await req.json();
    if (!message || typeof message !== "string" || message.length >= 3000)
      return new Response("Message invalid  ", { status: 400 });

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
      return new Response("No video found", { status: 404 });

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

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of content) {
          const text = chunk.choices?.[0]?.delta?.content || "";
          controller.enqueue(encoder.encode(text))
        }
        controller.close();
      }
    })
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'X-Content-Type-Options': 'nosniff',
        'x-runtime': 'edge'
      },
    });

  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
