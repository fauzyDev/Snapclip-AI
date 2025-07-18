import { Client } from "youtubei";
import { cachedTranscript } from "@/types/cache.transcript";
import { CACHE_TTL } from "@/config/env";
import { redis } from "../cache/cache.redis";

const cache: number = CACHE_TTL;

const youtube = new Client();

export async function fetchTranscript(videoId: string[]): Promise<Record<string, cachedTranscript[]>> {
  const transcripts: Record<string, cachedTranscript[]> = {};
  const videos = await Promise.all(
    videoId.map((id: string) => youtube.getVideo(id))
  )

  for (let index = 0; index < videos.length; index++) {
    const video = videos[index]
    const id = videoId[index]
    let captions = video?.captions?.languages.find((lang) => lang.code === 'id')

    if (!captions) {
      console.error("Captions tidak ditemukan untuk videoId");
      transcripts[id] = [];
      continue;
    }

    const rawTranscript = await captions.get('id')
    transcripts[id] = (rawTranscript ?? [])?.map(({ text, start, duration }: cachedTranscript) => ({
      text,
      start,
      duration
    }))
  }
  return transcripts
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