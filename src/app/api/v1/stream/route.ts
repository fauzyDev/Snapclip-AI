import { fetchVideosByPromptAndChannel } from '@/libs/youtube/yt.fetch';
import { fetchTranscript } from '@/libs/youtube/yt.transcript';
import { getCachedVideos } from "@/libs/youtube/yt.fetch";
import { cacheVideos } from "@/libs/youtube/yt.fetch";
import { getCachedTranscript } from '@/libs/youtube/yt.transcript';
import { cacheTranscript } from '@/libs/youtube/yt.transcript';
import { CHANNELS } from '@/libs/youtube/yt.fetch';
import { main } from '@/libs/openai/stream';

export const runtime = 'edge'

export async function POST(req: Request) {
    console.log("EDGE RUNTIME?", "EdgeRuntime" in globalThis);

    const encoder = new TextEncoder();

    try {
        const { message } = await req.json();
        if (!message) {
            return new Response("Message required", { status: 400 });
        }

        // Ambil video & transcript (boleh ga di-stream duluan)
        const cached = await getCachedVideos(message);
        const isCached = Boolean(cached)

        const results = cached ?? await Promise.all(CHANNELS.map(({ id }) => fetchVideosByPromptAndChannel(message, id)));
        const videos = results.flat();

        if (!isCached) await cacheVideos(message, videos);
        if (videos.length === 0) return new Response("No video found", { status: 404 });

        const rawTranscript = await Promise.all(
            videos.map(async (video) => {
                const cached = await getCachedTranscript(video.videoId);
                if (cached) return cached;
                
                const transcript = await fetchTranscript(video.videoId);
                await cacheTranscript(video.videoId, transcript);
                return transcript;
            })
        );
        const transcript = rawTranscript.flat();

        // 🔥 Bikin streaming response dari LLM
        const llmStream = await main(message, transcript); // ini stream dari OpenAI

        const stream = new ReadableStream({
            async start(controller) {
                for await (const chunk of llmStream) {
                    const text = chunk.choices?.[0]?.delta?.content || '';
                    controller.enqueue(encoder.encode(text));
                }
                controller.close();
            },
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Cache-Control': 'no-cache',
                'X-Content-Type-Options': 'nosniff',
                'x-runtime': 'edge'
            },
        })
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}