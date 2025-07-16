import { NextResponse, NextRequest } from 'next/server'
import { fetchTranscript } from "@/libs/youtube/yt.transcript";
import { getCachedTranscript, cacheTranscript } from "@/libs/youtube/yt.transcript";

export async function POST(req: NextRequest) {
  const { videoId } = await req.json();

  // ✅ Coba ambil dari cache dulu
  const cached = await getCachedTranscript(videoId);
  if (cached) {
    console.log("✅ Ambil dari Redis cache");
    return NextResponse.json({ transcript: cached });
  }

  // ❌ Kalau belum ada, fetch baru
  const transcript = await fetchTranscript(videoId);

  // ❌ Kalau gagal
  if (!transcript) {
    return NextResponse.json({ error: "Transcript tidak ditemukan" }, { status: 404 });
  }

  // ✅ Simpan ke cache
  await cacheTranscript(videoId, transcript ?? []);

  return NextResponse.json({ transcript });
}