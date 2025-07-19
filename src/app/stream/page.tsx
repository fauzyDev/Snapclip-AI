"use client";

export default function Page() {
    const send = async () => {
        const message = "bitcoin"; // bebas, ini 1 input doang

        try {
            // STEP 1: Fetch video + transcript (dari prompt)
            const transcriptRes = await fetch("/api/v1/transcript", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message }), // kirim prompt doang
            });

            const transcriptJson = await transcriptRes.json();
            const transcriptData = transcriptJson.transcript || "";

            if (!transcriptData) {
                console.error("❌ Gagal ambil transcript");
                return;
            }

            // STEP 2: Kirim ke LLM stream API
            const res = await fetch("/api/v1/answer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message, transcript: transcriptData }),
            });

            if (!res.ok) {
                const errText = await res.text();
                console.error(`❌ LLM server error (${res.status}):`, errText);
                return;
            }

            // STEP 3: Handle stream response dari LLM
            const reader = res.body?.getReader();
            const decoder = new TextDecoder();

            if (!reader) throw new Error("❌ Streaming tidak didukung");

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                console.log("🟢 LLM chunk:", chunk);
                // Bisa lo tampilkan ke UI di sini
            }

        } catch (err) {
            console.error("🔥 Error:", err);
        }
    };

    return (
        <button onClick={send} className="hover:cursor-pointer bg-blue-500 p-2 text-white rounded-md">
            Send Prompt
        </button>
    );
}