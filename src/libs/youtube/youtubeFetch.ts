import { CachedVideo } from "@/types/cachedVideo";
import { FetchPrompt } from "@/types/youtubeFetchPrompt";
import { YouTubeSearchItem } from "@/types/youtubeSearchItems";
import { YOUTUBE_API } from "@/config/env";
import { CACHE_TTL } from "@/config/env";
import { redis } from "../cache/cacheRedis";

const apiKey: string = YOUTUBE_API;

// Fungsi caching dengan TTL (waktu hidup cache dalam detik)
const cache: number = CACHE_TTL;

export async function getCachedVideos(prompt: string): Promise<CachedVideo[] | null> {
  const key = `videos:${prompt.toLowerCase()}`;
  const cached = await redis.get(key);
  return cached ? (cached as CachedVideo[]) : null;
}

export async function cacheVideos(prompt: string, videos: CachedVideo[]): Promise<void> {
  const key = `videos:${prompt.toLowerCase()}`;
  await redis.set(key, videos);
  await redis.expire(key, cache);
}

// 🔧 Fungsi ambil video berdasarkan prompt dan channel
export async function fetchVideosByPromptAndChannel(prompt: string, channelId: string): Promise<FetchPrompt[]> {
  try {

    if (!channelId) throw new Error("channelId kosong!");

    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&type=video&maxResults=5&q=${encodeURIComponent(prompt)}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      console.error("Fetch error");
      throw new Error(
        `HTTP error! status: ${res.status} - ${JSON.stringify(data)}`
      );
    }

    if (!data.items) {
      return [];
    }

    return data.items.map((item: YouTubeSearchItem) => ({
      channelId,
      videoId: item.id.videoId,
      title: item.snippet.title,
      publishedAt: item.snippet.publishedAt,
      thumbnail: item.snippet.thumbnails?.medium?.url,
      channelTitle: item.snippet.channelTitle,
    }));
  } catch (error: unknown) {
    console.error("Fetch error:", error || error);
    return [];
  }
}