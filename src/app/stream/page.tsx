"use client"

import React from 'react'

export default function page() {

    const send = async () => {
        const res = await fetch("/api/v1/answer", {
            method: "POST",
            body: JSON.stringify({ message: "cara investasi" }),
        });
        const reader = res.body?.getReader();
        if (!reader) {
            throw new Error("Streaming not supported: res.body is null");
        }
        const decoder = new TextDecoder();

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            console.log("streaming api:", decoder.decode(value));
        }
    }

    return (
        <button onClick={send}>send</button>
    )
}
