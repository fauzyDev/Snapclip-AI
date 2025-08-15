"use client"

import React from 'react';
import HeroButton from '../ui/HeroButton';
import Input from '../Input/Input';
import HeroAvatar from '../ui/HeroAvatar';
import HeroSkeleton from '../ui/HeroSkeleton';
import { Message } from '@/types/message';
import { useChannelStore } from '@/store/useChannelStore';

const ChatClient = () => {
    const [message, setMessage] = React.useState<Message[]>([]);
    const bottomRef = React.useRef<HTMLDivElement>(null);
    const channel = useChannelStore((s) => s.channels)

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
                console.error("❌ Gagal ambil transcript");
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
            let result = '';

            while (true) {
                const { value, done } = await data.read();
                if (done) break;
                result += decoder.decode(value, { stream: true });
                setMessage(prev => prev.map(msg => msg.id === aiMessageId ? { ...msg, content: msg.content + result, isLoading: false } : msg));
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

    return (
        <section className="flex flex-col flex-grow w-full">
            {/* Chat Container */}
            <div className={`flex-grow ${message.length > 0 ? "overflow-y-auto" : ""} pt-16 pb-[110px]`}>
                <div className="w-full flex justify-center">
                    <div className="w-full max-w-2xl space-y-4 px-2 sm:px-0">
                        {message.length === 0 ? (
                            <div className="flex flex-col items-center justify-center mt-32 space-y-6 py-12">
                                <h2 className="text-xl sm:text-2xl font-semibold text-white text-center animate-pulse">
                                    ✨ Selamat Datang di Snapclip AI...
                                </h2>
                                <div className="flex flex-wrap justify-center gap-4 mt-3">
                                    {["📽️ Buat Klip", "🎞️ Ringkas Video", "💬 Tanya AI", "🔍 Cari Topik"].map((label) => (
                                        <HeroButton
                                            key={label}
                                            size="md"
                                            className="hover:bg-gray-600 transition-all text-neutral-200 font-semibold">
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
                                                <div className="ml-auto space-y-3 bg-blue-700 border border-blue-500 rounded-2xl shadow-md p-3 break-words max-w-[85%]">
                                                    <p className="text-md text-neutral-200">{msg.content}</p>
                                                </div>
                                                {/* Avatar User */}
                                                <HeroAvatar
                                                    size="sm"
                                                    src="https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg"
                                                    className="flex-shrink-0" />
                                            </div>
                                        </li>
                                    ) : (
                                        <li className="w-full flex justify-start px-2 sm:px-2">
                                            <div className="flex items-start gap-2 sm:gap-3 w-full max-w-full">
                                                {/* Avatar Bot */}
                                                <HeroAvatar
                                                    size="sm"
                                                    src="https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg"
                                                    className="flex-shrink-0" />
                                                {/* Bubble */}
                                                {msg.role === "ai" && msg.isLoading ? (
                                                    <div className="max-w-[300px] w-full flex items-center gap-3">
                                                        <div className="w-full flex flex-col gap-2">
                                                            <HeroSkeleton className="h-3 w-2/5 rounded-lg" />
                                                            <HeroSkeleton className="h-3 w-3/5 rounded-lg" />
                                                            <HeroSkeleton className="h-3 w-4/5 rounded-lg" />
                                                            <HeroSkeleton className="h-3 w-6/5 rounded-lg" />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="bg-gray-700/60 border border-gray-600 rounded-2xl p-3 shadow-md break-words max-w-[85%]">
                                                        <h3 className="font-medium text-gray-200">Snapclip AI</h3>
                                                        <p className="whitespace-pre-line text-md text-neutral-200">
                                                            {cleanLLMContent(msg.content)}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            ))
                        )}

                        {/* Spacer biar bubble terakhir gak ketiban input */}
                        <div ref={bottomRef} className="h-28 scroll-mt-8" />
                    </div>
                </div>
            </div>

            {/* Input Chat (fixed di bawah) */}
            <div className={`fixed bottom-0 left-0 right-0 z-30 px-2 sm:px-4 lg:px-8 transition-all duration-300 ${message.length === 0 ? "bottom-36" : "bottom-0"} md:left-56`}>
                <div className="w-full max-w-2xl mx-auto rounded-2xl bg-[#1f1f1f] border border-neutral-600 shadow-inner sm:p-2 p-2">
                    <Input onSubmit={sendMessage} />
                    {message.length !== 0 && (
                        <p className="text-neutral-200 text-sm text-center mt-1">
                            This app is not affiliated with YouTube. All video content belongs to their respective owners.
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default ChatClient;