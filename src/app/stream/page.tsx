"use client"

import React from 'react'

export default function page() {

    const send = async () => {
        try {
            const res = await fetch("/api/v1/stream", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: "bitcoin" }),
            });

            if (!res.ok) {
                const errText = await res.text();
                console.error(`❌ Server error (${res.status}):`, errText);
                return;
            }

            const reader = res.body?.getReader();
            if (!reader) {
                throw new Error("Streaming not supported: res.body is null");
            }

            const decoder = new TextDecoder();

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value);
                console.log("🟢 streaming chunk:", chunk);
            }
        } catch (err) {
            console.error("🔥 Error saat kirim request:", err);
        }
    };

    return (
        <button onClick={send} className='hover:cursor-pointer'>send</button>
    )
}
