import { Client } from "youtubei";
import { CachedTranscript } from "@/types/cachedTranscript";
import { CACHE_TTL } from "@/config/env";
import { redis } from "../cache/cacheRedis";

const cache: number = CACHE_TTL;

const youtube = new Client();

export async function fetchTranscript(videoId: string[]): Promise<Record<string, CachedTranscript[]>> {
  const transcripts: Record<string, CachedTranscript[]> = {};
  const videos = await Promise.all(
    videoId.map((id: string) => youtube.getVideo(id))
  )

  for (let index = 0; index < videos.length; index++) {
    const video = videos[index]
    const id = videoId[index]
    const captions = video?.captions?.languages.find((lang) => lang.code)

    if (!captions) {
      console.error("Captions tidak ditemukan");
      transcripts[id] = [];
      continue;
    }

    const rawTranscript = await captions.get()
    transcripts[id] = (rawTranscript ?? [])?.map(({ text, start, end, duration }: CachedTranscript) => ({
      text: text.trim(),
      start: start / 1000,
      end: end / 1000,
      duration: duration / 1000
    }))
  }
  return transcripts
}

export async function getCachedTranscript(videoId: string): Promise<CachedTranscript[] | null> {
  const key = `text:${videoId}`;
  const cached = await redis.get(key);
  return cached ? (cached as CachedTranscript[]) : null;
}

export async function cacheTranscript(videoId: string, text: CachedTranscript[]): Promise<void> {
  const key = `text:${videoId}`;
  await redis.set(key, text);
  await redis.expire(key, cache);
}