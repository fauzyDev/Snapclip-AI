import { NextResponse } from "next/server";
import { CHANNELS } from "@/libs/youtube/yt.fetch";
import { cacheVideos } from "@/libs/youtube/yt.fetch";
import { getCachedVideos } from "@/libs/youtube/yt.fetch";
import { fetchVideosByPromptAndChannel } from "@/libs/youtube/yt.fetch";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    if (!prompt) return NextResponse.json({ error: "Prompt is required" }, { status: 400 });

    // Cek apakah data sudah ada di cache
    const cached = await getCachedVideos(prompt);
    if (cached) return NextResponse.json({ videos: cached, cached: true });

    // Kalau belum ada di cache, ambil dari YouTube API
    const allResults = await Promise.all(
      CHANNELS.map(({ id }) => fetchVideosByPromptAndChannel(prompt, id))
    );

    const flattened = allResults.flat();

    // Cache hasilnya
    await cacheVideos(prompt, flattened);

    return NextResponse.json({ videos: flattened, cached: false });
  } catch (err) {
    console.error("Error fetching videos:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}