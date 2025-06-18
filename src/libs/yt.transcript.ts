import { YoutubeTranscript } from "youtube-transcript";
import { cachedTranscript } from "@/types/cache.transcript";
import { CACHE_TTL } from "@/config/env";
import { redis } from "./cache.redis";

const cache = CACHE_TTL;

export async function fetchTranscript(videoId: string) {
  const transcript = await YoutubeTranscript.fetchTranscript(videoId);
  return transcript.map((chunk) => ({
    text: chunk.text,
    start: chunk.offset / 1500,
  }));
}

export async function getCachedTranscript(videoId: string): Promise<cachedTranscript[] | null> {
  const key = `text:${videoId}`;
  const cached = await redis.get(key);
  return cached ? (cached as cachedTranscript[]) : null; 
}

export async function cacheTranscript(videoId: string, text: cachedTranscript[]) {
  const key = `text:${videoId}`;
  await redis.set(key, text);
  await redis.expire(key, cache);
}
