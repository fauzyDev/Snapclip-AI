export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
export const GEMINI_API = process.env.GEMINI_API!;
export const YOUTUBE_API = process.env.YOUTUBE_API!;
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
export const CACHE_TTL = Number(process.env.CACHE_TTL) || 60 * 60 * 24 * 7!;