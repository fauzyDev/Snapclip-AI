import { Client } from "youtubei";
import { cachedTranscript } from "@/types/cache.transcript";
import { CACHE_TTL } from "@/config/env";
import { redis } from "../cache/cache.redis";

const cache: number = CACHE_TTL;

const youtube = new Client();

type TranscriptLine = {
  text: string;
  start: number;
  duration: number;
};

export async function fetchTranscript(videoId: string[]) {
  if (!Array.isArray(videoId) || !videoId.every(id => typeof id === "string")) {
    console.error("Invalid videoIds", { status: 400 });
  }
  const videos = await Promise.all(
    videoId.map((id: string) => youtube.getVideo(id))
  )

  for (const video of videos) {
    const captions = video?.captions?.languages.find((lang) => lang.code === 'id')

    let transcript;

    if (captions) {
      transcript = await captions.get()
    } else {
      const defaultCaption = video?.captions?.languages.find((lang) => lang.code)
      if (defaultCaption) {
        transcript = await defaultCaption.get('id')
      } else {
        console.error("Captions tidak ditemukan", Error)
        transcript = [];
      }
    }

    return transcript?.map(({ text, start, duration }: TranscriptLine) => ({
      text,
      start,
      duration
    }))
  }
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