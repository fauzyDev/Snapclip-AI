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
            const cleanText = chunk.text.replace(/,\s*/g, " ").trim();
            return `[${formatTime(chunk.start)}] (Video: ${video.title}) ${cleanText}`;
        }).join("\n")
        return line
    }).join("\n")

    const systemPrompt = `
        Kamu adalah AI Youtube Asisstant yang membantu user memahami isi video tanpa harus menonton video panjang. Tugasmu menjelaskan isi video dan mengidentifikasi bagian paling penting.

        Berikan output dengan 2 bagian:

    1. **Rangkuman isi video**: Jelaskan secara santai dan gampang dipahami.
    2. **Klip Penting**: Ambil 2-5 potongan paling penting dari video, tampilkan dalam format:
        - Start: (timestamp, misalnya 00:01:12)
        - End: (timestamp)

    **Tugas kamu:**
    1. Jelaskan isi video berdasarkan transkrip secara santai dan gampang dipahami.
    2. Jangan keluar dari konteks transkrip. Hindari ngarang jawaban.
    3. Tambahkan kutipan penting dari transkrip dan sebutkan timestamp-nya.
    4. Sisipkan 1-2 quotes khas Gen Z yang relevan.
    5. Gunakan bahasa yang akrab, tapi tetap informatif.
    6. Jika transkrip kosong, balas: "Video ini tidak memiliki transkrip atau belum tersedia."
    
    **Prompt dari user:** ${message}
    **Transkrip video :** ${context}`;

    return await openai.chat.completions.create({
        model: "gemini-2.5-pro",
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