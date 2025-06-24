"use client"

import React from 'react';
import HeroButton from '../ui/HeroButton';
import Input from '../Input/Input';

type Message = {
    id: string,
    role: "user" | "ai",
    content: string
};

const ChatClient = () => {
    const [message, setMessage] = React.useState<Message[]>([]);
    const bottomRef = React.useRef<HTMLDivElement>(null);

    const sendMessage = async (input: string) => {
        const response = await fetch('/api/answer', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: input }),
        });

        const data = await response.json();
        console.log(data)
        setMessage(prev => [...prev, { id: crypto.randomUUID(), role: 'user', content: input }, { id: crypto.randomUUID(), role: "ai", content: data.data.content }]);
    }

    React.useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [message]);

    return (
        <section className="flex flex-col h-screen w-full overflow-hidden items-center px-4 sm:px-8 lg:px-8">
            {/* Chat Container */}
            <div className="flex-grow w-full max-w-5xl mx-auto space-y-4 sm:p-3 overflow-y-auto pt-16 pb-32">
                {message.length === 0 ? (
                    <div className="flex flex-col items-center justify-center mt-32 space-y-6 py-12">
                        <h2 className="text-xl sm:text-2xl font-semibold text-white text-center animate-pulse">
                            ✨ Selamat Datang di Snapclip AI...
                        </h2>
                        <div className="flex flex-wrap justify-center gap-4 mt-3">
                            <HeroButton
                                size="md"
                                className="hover:bg-gray-600 transition-all text-neutral-200 font-semibold"
                            >
                                📽️ Buat Klip
                            </HeroButton>
                            <HeroButton
                                size="md"
                                className="hover:bg-gray-600 transition-all text-neutral-200 font-semibold"
                            >
                                🎞️ Ringkas Video
                            </HeroButton>
                            <HeroButton
                                size="md"
                                className="hover:bg-gray-600 transition-all text-neutral-200 font-semibold"
                            >
                                💬 Tanya AI
                            </HeroButton>
                            <HeroButton
                                size="md"
                                className="hover:bg-gray-600 transition-all text-neutral-200 font-semibold"
                            >
                                🔍 Cari Topik
                            </HeroButton>
                        </div>
                    </div>
                ) : (
                    message.map((msg) => (
                        <ul key={msg.id} className="space-y-6 mb-4">
                            {/* USER */}
                            {msg.role === 'user' ? (
                                <li className="w-full max-w-2xl mx-auto flex justify-end gap-x-2 items-end pt-18">
                                    <div className="w-fit max-w-full text-end space-y-3">
                                        <div className="border border-gray-400 shadow-md bg-gray-800 rounded-2xl p-3 break-words">
                                            <p className="text-md text-neutral-200">{msg.content}</p>
                                        </div>
                                    </div>
                                </li>
                            ) : (
                                <li className="w-full max-w-2xl mx-auto flex justify-start items-start gap-x-2">
                                    <div className="w-fit max-w-full rounded-2xl p-3 space-y-3 shadow-md bg-transparent break-words">
                                        <h3 className="font-medium text-gray-200">Snapclip AI</h3>
                                        <p className="whitespace-pre-line text-md text-neutral-200">
                                            {msg.content}
                                        </p>
                                    </div>
                                </li>
                            )}
                        </ul>
                    ))
                )}

                {/* ✅ DUMMY SPACER AGAR BUBBLE TERAKHIR TIDAK KETUTUP INPUT */}
                <div ref={bottomRef} className="h-36 scroll-mt-16" />
            </div>

            {/* Input Chat (Tetap di bawah layar) */}
            <div className={`fixed w-full md:ml-56 px-4 sm:px-8 lg:px-8 z-30 transition-all duration-300 ${message.length === 0 ? "bottom-36" : "bottom-0"}`}>
                <div className="w-full max-w-2xl md:ml-40 rounded-2xl shadow-lg bg-neutral-800 sm:p-2">
                    <Input onSubmit={sendMessage} />
                    {message.length === 0 ? "" : (<p className="text-neutral-200 text-sm text-center mt-4">
                        This app is not affiliated with YouTube. All video content belongs to their respective owners.
                    </p>)}
                </div>
            </div>
        </section>
    );
}

export default ChatClient;