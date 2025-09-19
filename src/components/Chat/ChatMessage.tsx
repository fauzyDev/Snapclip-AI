"use client"

import React from 'react';
import HeroButton from '../ui/HeroButton';
import Input from '../Input/Input';
import HeroAvatar from '../ui/HeroAvatar';
import HeroSkeleton from '../ui/HeroSkeleton';
import useInitChannels from '@/hooks/useInitChannels';
import ReactPlayer from 'react-player';
import { Message } from '@/types/message';
import { Clip } from '@/types/clipVideo';
import { useChannelStore } from '@/store/useChannelStore';

const ChatClient = () => {
    useInitChannels();

    const [message, setMessage] = React.useState<Message[]>([]);
    const [clips, setClips] = React.useState<Clip[]>([]);
    const bottomRef = React.useRef<HTMLDivElement>(null);
    const channel = useChannelStore((s) => s.channels);

    const sendMessage = async (input: string) => {
        try {
            const aiMessageId = crypto.randomUUID();

            setMessage(prev => [...prev, { id: crypto.randomUUID(), role: 'user', content: input }, { id: aiMessageId, role: 'ai', content: '', isLoading: true }])

            // STEP 1: Fetch video + transcript (dari promn  pt)
            const transcriptRes = await fetch("/api/v1/transcript", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message: input, channels: channel }), // kirim 
            });
            const { transcript } = await transcriptRes.json();

            if (!transcript) {
                console.error("Error: Transcript Not Found");
                return;
            }

            // STEP 2: Kirim ke LLM stream API
            const response = await fetch('/api/v1/stream', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: input, transcript }),
            });

            const data = response.body?.getReader();
            if (!data) {
                throw new Error("Streaming not supported");
            }
            const decoder = new TextDecoder();

            let buffer = "";
            let summaryBuffer = "";
            let foundClips = false;

            while (true) {
                const { value, done } = await data.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n")
                buffer = lines.pop() || "";

                for (const line of lines) {
                    if (!line.trim().startsWith("data:")) continue;

                    const datas = line.replace("data:", "").trim()

                    if (datas === "[DONE]") {
                        try {
                            // cari array JSON di summaryBuffer
                            const startIdx = summaryBuffer.indexOf("[");
                            const endIdx = summaryBuffer.lastIndexOf("]");
                            if (startIdx !== -1 && endIdx !== -1) {
                                const jsonBlock = summaryBuffer.slice(startIdx, endIdx + 1).trim();

                                const clips = JSON.parse(jsonBlock);
                                setClips(prev => [...prev, ...clips]);
                            } else {
                                console.warn("⚠️ JSON array gak ketemu di summaryBuffer");
                            }
                        } catch (err) {
                            console.error("Error:", err);
                        }
                        return;
                    }
                    const parsed = JSON.parse(datas);

                    if (parsed.type === "summary") {
                        const text = parsed.data;
                        summaryBuffer += text;

                        if (!foundClips) {
                            if (text.includes("Klip Penting")) {
                                const cutoffIdx = text.indexOf("[") !== -1 ? text.indexOf("[") : text.length;
                                const cleanText = text.slice(0, cutoffIdx);

                                setMessage(prev => prev.map(msg =>
                                    msg.id === aiMessageId
                                        ? { ...msg, content: (msg.content ?? "") + cleanText, isLoading: false }
                                        : msg
                                ));

                                foundClips = true;
                            } else {
                                setMessage(prev => prev.map(msg => msg.id === aiMessageId ? { ...msg, content: (msg.content ?? "") + text, isLoading: false } : msg))
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Error", error)
        }
    }

    React.useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [message]);

    function cleanLLMContent(content: string): string {
        return content
            .replace(/\*\*(.*?)\*\*/g, '$1')          // Bold
            .replace(/\*(.*?)\*/g, '$1')              // Italic
            .replace(/^\*\s+/gm, '')                  // Bullet list
            .replace(/^-+\s+/gm, '')                  // Dash list
            .replace(/`([^`]+)`/g, '$1')              // Inline code
            .replace(/#{1,6}\s+(.*)/g, '$1')          // Markdown heading
            .replace(/^\d+\.\s+/gm, match => `\n${match}`) // Numbered list newline
            .replace(/[^\p{L}\p{N}\p{P}\p{Z}\n\r\t ]+/gu, '') // 💥 Remove non-standard chars
    }

    function toSeconds(time?: string, videoDuration?: number): number {
        if (!time) return 0;

        const parts = time.split(":").map(Number);
        const rev = parts.reverse();

        const seconds =
            (rev[0] || 0) +
            (rev[1] || 0) * 60 +
            (rev[2] || 0) * 3600;

        // clamp biar ga keluar dari durasi video
        if (videoDuration) {
            return Math.min(seconds, videoDuration - 1); // -1 biar gak persis di ujung
        }

        return seconds;
    }

    return (
        <section className="flex flex-col flex-grow w-full h-full">
            {/* Chat Container */}
            <div className={`flex-grow ${message.length > 0 ? "overflow-y-auto" : ""} pt-16 pb-[110px]`}>
                <div className="w-full flex justify-center">
                    <div className="w-full max-w-2xl space-y-4 px-2 sm:px-4 md:px-6 lg:px-0">
                        {message.length === 0 ? (
                            <div className="flex flex-col items-center justify-center mt-24 space-y-6 py-8 px-4 text-center">
                                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white animate-pulse">
                                    ✨ Selamat Datang di Snapclip AI...
                                </h2>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {["📽️ Buat Klip", "🎞️ Ringkas Video", "💬 Tanya AI", "🔍 Cari Topik"].map((label) => (
                                        <HeroButton
                                            key={label}
                                            size="md"
                                            className="hover:bg-gray-600 transition-all text-neutral-200 font-semibold"
                                        >
                                            {label}
                                        </HeroButton>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            message.map((msg) => (
                                <ul key={msg.id} className="space-y-6 mb-6">
                                    {msg.role === "user" ? (
                                        <li className="w-full flex justify-end px-2 sm:px-1">
                                            <div className="flex items-end gap-2 sm:gap-3 max-w-full">
                                                {/* Bubble */}
                                                <div className="ml-auto space-y-3 bg-blue-700 border border-blue-500 rounded-2xl shadow-md p-3 break-words max-w-[90%] sm:max-w-[70%] md:max-w-[80%]">
                                                    <p className="text-sm sm:text-base text-neutral-200">{msg.content}</p>
                                                </div>
                                                {/* Avatar User */}
                                                <HeroAvatar
                                                    size="sm"
                                                    src="https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg"
                                                    className="flex-shrink-0"
                                                />
                                            </div>
                                        </li>
                                    ) : (
                                        <li className="w-full flex justify-start px-2 sm:px-2">
                                            <div className="flex items-start gap-2 sm:gap-3 w-full max-w-full">
                                                {/* Avatar Bot */}
                                                <HeroAvatar
                                                    size="sm"
                                                    src="https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg"
                                                    className="flex-shrink-0"
                                                />
                                                {/* Bubble */}
                                                {msg.role === "ai" && msg.isLoading ? (
                                                    <div className="max-w-[300px] w-full flex items-center gap-3">
                                                        <div className="w-full flex flex-col gap-2">
                                                            {["w-2/5", "w-3/5", "w-4/6", "w-5/5"].map((width, index) => (
                                                                <HeroSkeleton key={index} className={`h-3 ${width} rounded-lg`} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="bg-gray-700/60 border border-gray-600 rounded-2xl p-3 shadow-md break-words max-w-[90%] sm:max-w-[70%] md:max-w-[80%]">
                                                        <h3 className="font-medium text-gray-200">Snapclip AI</h3>
                                                        <div className="whitespace-pre-line text-sm sm:text-base text-neutral-200">
                                                            {cleanLLMContent(msg.content)}
                                                            <div className="mt-4 space-y-4">
                                                                {clips.map((clip, i) => (
                                                                    <div key={i} className="space-y-2 p-4 rounded-xl bg-gray-800">
                                                                        <h3 className="text-lg font-semibold text-white">{clip.title}</h3>
                                                                        <p className="text-sm text-gray-300 italic">
                                                                            {clip.quote || "No quote available"}
                                                                        </p>
                                                                        <ReactPlayer
                                                                            style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}
                                                                            src={`https://www.youtube.com/watch?v=${clip.videoId}`}
                                                                            config={{
                                                                                youtube:{
                                                                                    start: 700
                                                                                }
                                                                            }}
                                                                            controls
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            ))
                        )}

                        {/* Spacer biar bubble terakhir gak ketiban input */}
                        <div ref={bottomRef} className="h-24 scroll-mt-8" />
                    </div>
                </div>
            </div>

            {/* Input Chat */}
            <div
                className={`fixed bottom-0 left-0 right-0 z-30 px-2 sm:px-4 lg:px-8 transition-all duration-300 ${message.length === 0 ? "bottom-36" : "bottom-0"
                    } md:left-56`}
            >
                <div className="w-full max-w-2xl mx-auto rounded-2xl bg-[#1f1f1f] border border-neutral-600 shadow-inner sm:p-2 p-2">
                    <Input onSubmit={sendMessage} />
                    {message.length !== 0 && (
                        <p className="text-neutral-200 text-xs sm:text-sm text-center mt-1 px-2">
                            This app is not affiliated with YouTube. All video content belongs to their respective owners.
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default ChatClient;