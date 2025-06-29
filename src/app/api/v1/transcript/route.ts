import { NextResponse, NextRequest } from 'next/server'
import { fetchTranscript } from "@/libs/youtube/yt.transcript";

export async function POST(req: NextRequest) {
  const { videoId } = await req.json();
  const transcript = await fetchTranscript(videoId);
  return NextResponse.json({ transcript });
}
