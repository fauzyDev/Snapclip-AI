import OpenAI from "openai";
import { GEMINI_API } from "@/config/env";

const GeminiApi: string = GEMINI_API;

const openai = new OpenAI({
  apiKey: GeminiApi,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export const main = async (message: string, transcripts: { text: string; start: number }[]) => {
  const context = transcripts.map(
    (chunk) => `[${formatTime(chunk.start)}] ${chunk.text}`
  ).join("\n");

  return await openai.chat.completions.create({
    model: "gemini-2.0-flash",
    stream: true,
    messages: [
      {
        role: "system", content:
          `Kamu adalah AI yang membantu user memahami isi video YouTube.

      Tugas kamu:
      1. Jelaskan dengan Santai isi video berdasarkan transkrip.
      2. Buat user merasa gak perlu nonton video panjang.
      3. Sertakan kutipan penting, berikan juga qoutes Khas Gen Z dan timestamp-nya.
      4. Gaya santai, tapi informatif. Jangan ngarang, harus berdasarkan transkrip!
      5. Jika videonya tidak ada transkrip atau kosong tolong balas dengan video tersebut tidak tersedia, atau video tidak memiliki transkrip.

      Prompt dari user: "${message}"

      Transkrip: ${context}`
      },
      { role: "user", content: message }
    ]
  });
}

function formatTime(seconds: number) {
  const date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().slice(11, 8);
}