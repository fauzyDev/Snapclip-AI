import OpenAI from "openai";
import { GEMINI_API } from "@/config/env";
import { TranscriptPerVideo } from "@/types/transcriptVideo";

const GeminiApi: string = GEMINI_API;

const openai = new OpenAI({
    apiKey: GeminiApi,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export const main = async (message: string, transcripts: TranscriptPerVideo[]) => {
    const context = transcripts.map((video) => {
        const line = video.caption.map((chunk) => {
            `[${formatTime(chunk.start)}] (Video: ${video.title}) ${chunk.text}`
        }).join("\n")
        return line
    }).join("\n")

    const systemPrompt = `
        Kamu adalah AI Youtube Asisstant yang membantu user memahami isi video tanpa harus menonton video panjang.
    
    **Tugas kamu:**
    1. Jelaskan isi video berdasarkan transkrip secara santai dan gampang dipahami.
    2. Jangan keluar dari konteks transkrip. Hindari ngarang jawaban.
    3. Tambahkan kutipan penting dari transkrip dan sebutkan timestamp-nya.
    4. Sisipkan 1-2 quotes khas Gen Z yang relevan.
    5. Jika transkrip kosong, balas: "Video ini tidak memiliki transkrip atau belum tersedia."
    
    **Prompt dari user:** ${message}
    **Transkrip:** ${context}`;

    return await openai.chat.completions.create({
        model: "gemini-2.0-flash",
        stream: true,
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message }
        ]
    });
}

function formatTime(seconds: number) {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
}