import { CachedVideo } from "@/types/cache.video";
import { YouTubeSearchItem } from "@/types/yt.search.item";
import { YOUTUBE_API } from "@/config/env";
import { CACHE_TTL } from "@/config/env";
import { redis } from "./cache.redis";

const apiKey = YOUTUBE_API;

// ✅ Masukkan channelId dan nama channel yang lo mau
export const CHANNELS = [
  { id: "UCXMB8OiiSnq2B4xLgUtTYhw", name: "Timothy Ronald" },
  { id: "UCe9_rJjMmQS5C_LobUZ_pHg", name: "Academy Crypto" },
];

// Fungsi caching dengan TTL (waktu hidup cache dalam detik)
const cache = CACHE_TTL;

export async function getCachedVideos(prompt: string): Promise<CachedVideo[] | null> {
  const key = `videos:${prompt.toLowerCase()}`;
  const cached = await redis.get(key);
  return cached ? (cached as CachedVideo[]) : null;
} 

export async function cacheVideos(prompt: string, videos: CachedVideo[]) {
  const key = `videos:${prompt.toLowerCase()}`;
  await redis.set(key, videos);
  await redis.expire(key, cache);
}

// 🔧 Fungsi ambil video berdasarkan prompt dan channel
export async function fetchVideosByPromptAndChannel(prompt: string, channelId: string) {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&type=video&maxResults=5&q=${encodeURIComponent(prompt)}`;
  const res = await fetch(url);
  const data = await res.json();

  if (!data.items) return [];

  return data.items.map((item: YouTubeSearchItem) => ({
    channelId,
    videoId: item.id.videoId,
    title: item.snippet.title,
    publishedAt: item.snippet.publishedAt,
    thumbnail: item.snippet.thumbnails?.medium?.url,
    channelTitle: item.snippet.channelTitle,
  }));
}
