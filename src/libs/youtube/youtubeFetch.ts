import { CachedVideo } from "@/types/cachedVideo";
import { FetchPrompt } from "@/types/youtubeFetchPrompt";
import { YouTubeSearchItem } from "@/types/youtubeSearchItems";
import { YOUTUBE_API } from "@/config/env";
import { CACHE_TTL } from "@/config/env";
import { redis } from "../cache/cacheRedis";

// API Key dari Youtube
const apiKey: string = YOUTUBE_API;

// TTL (Time To Live) untuk cache, dalam detik  
const cache: number = CACHE_TTL;

/**
 * Mengambil daftar video yang sudah disimpan di cache berdasarkan prompt.
 *
 * Fungsi ini mencari key dengan format `videos:{prompt}` di Redis.
 * Jika data ditemukan, dikembalikan sebagai array `CachedVideo[]`.
 *
 * @async
 * @function getCachedVideos
 * @param {string} prompt - Kata kunci pencarian video yang digunakan sebagai key cache.
 * @returns {Promise<CachedVideo[] | null>} Array video dari cache, atau `null` jika tidak ditemukan.
 */
export async function getCachedVideos(prompt: string): Promise<CachedVideo[] | null> {
  const key = `videos:${prompt.toLowerCase()}`;
  const cached = await redis.get(key);
  return cached ? (cached as CachedVideo[]) : null;
}

/**
 * Menyimpan daftar video ke cache Redis dengan TTL (Time To Live).
 *
 * Fungsi ini menyimpan data video dengan key berbasis `prompt`
 * dan secara otomatis menghapusnya setelah waktu TTL habis.
 *
 * @async
 * @function cacheVideos
 * @param {string} prompt - Kata kunci pencarian yang menjadi key cache.
 * @param {CachedVideo[]} videos - Daftar video yang akan disimpan di cache.
 * @returns {Promise<void>}
 *
 * @example
 * await cacheVideos("cara belajar coding", videoList);
 * console.log("Data video berhasil disimpan ke cache!");
 */
export async function cacheVideos(prompt: string, videos: CachedVideo[]): Promise<void> {
  const key = `videos:${prompt.toLowerCase()}`;
  await redis.set(key, videos);
  await redis.expire(key, cache);
}

/**
 * Mengambil daftar video dari YouTube API berdasarkan prompt dan channel ID.
 *
 * Fungsi ini menggunakan endpoint:
 * `https://www.googleapis.com/youtube/v3/search`
 * untuk mencari video dari channel tertentu yang relevan dengan prompt.
 *
 * @async
 * @function fetchVideosByPromptAndChannel
 * @param {string} prompt - Kata kunci pencarian video (misal: "cara investasi saham").
 * @param {string} channelId - ID channel YouTube tempat pencarian dilakukan.
 * @returns {Promise<FetchPrompt[]>} Daftar video yang ditemukan dari channel terkait.
 *
 * @throws {Error} Jika `channelId` kosong atau request ke YouTube API gagal.
 *
 * @example
 * const videos = await fetchVideosByPromptAndChannel("bitcoin", "UCxxxx");
 * console.log(videos);
 */
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