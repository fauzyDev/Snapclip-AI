import { Client } from "youtubei";
import { XMLParser } from "fast-xml-parser";
import { cachedTranscript } from "@/types/cache.transcript";
import { CACHE_TTL } from "@/config/env";
import { redis } from "../cache/cache.redis";

const cache: number = CACHE_TTL;

const youtube = new Client();

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  textNodeName: '#text',
  allowBooleanAttributes: true,
  parseTagValue: true
});

function formatTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const parts = [
    hrs > 0 ? String(hrs).padStart(2, '0') : null,
    String(mins).padStart(2, '0'),
    String(secs).padStart(2, '0')
  ].filter(Boolean);

  return parts.join(':');
}

export async function fetchTranscript(videoId: string) {
  const videos = await youtube.getVideo(videoId);
  const caption = videos?.captions?.languages.find((lang) => lang.code);
  if (!caption || !caption.url) {
    console.error("Transcript tidak tersedia");
    return;
  }

  const res = await fetch(caption.url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/113.0.0.0 Safari/537.36'
    }
  });
  const xmlData = await res.text();

  const parsed = parser.parse(xmlData);
  const text = parsed.transcript?.text;

  if (!text) {
    console.error("Gagal ambil text dari transcript");
    return;
  }

  const transcriptArray = Array.isArray(text) ? text : [text];

  return transcriptArray.map((line) => ({
    text: line['#text'] || '',
    start: parseFloat(line['@_start']),
    duration: parseFloat(line['@_dur']),
    time: formatTime(parseFloat(line['@_start']))
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