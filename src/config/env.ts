export const GEMINI_API = process.env.GEMINI_API as string;
export const YOUTUBE_API = process.env.YOUTUBE_API as string;
export const SUPABASE_URL = process.env.SUPABASE_URL as string;
export const SUPABASE_KEY = process.env.SUPABASE_KEY as string;
export const CACHE_TTL = Number(process.env.CACHE_TTL) || 60 * 60 * 6 as number;