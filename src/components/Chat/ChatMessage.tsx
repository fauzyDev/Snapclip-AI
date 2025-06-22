"use client"

import React from 'react';
import HeroAvatar from '../ui/HeroAvatar';
import HeroButton from '../ui/HeroButton';
import Input from '../Input/Input';

type Message = {
    id: string,
    role: "user" | "ai",
    content: string
};

const ChatClient = () => {
    const [message, setMessage] = React.useState<Message[]>([]);

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

    return (
        <section className="flex flex-col h-screen w-full overflow-hidden items-center px-4 sm:px-8 lg:px-8">
            {/* Chat Container */}
            <div className="flex-grow w-full max-w-5xl mx-auto space-y-4 sm:p-3 overflow-y-auto pb-36">
                {message.length === 0 ? (
                    <div className="flex flex-col items-center justify-center mt-16 space-y-6 py-12">
                        <h2 className="text-xl sm:text-2xl font-semibold text-white text-center animate-pulse">
                            ✨ Selamat Datang di Snapclip AI...
                        </h2>
                        <div className="flex flex-wrap justify-center gap-4 mt-3">
                            <HeroButton size="md" className="hover:bg-gray-600 transition-all text-neutral-200 font-semibold">
                                📽️ Buat Klip
                            </HeroButton>
                            <HeroButton size="md" className="hover:bg-gray-600 transition-all text-neutral-200 font-semibold">
                                🎞️ Ringkas Video
                            </HeroButton>
                            <HeroButton size="md" className="hover:bg-gray-600 transition-all text-neutral-200 font-semibold">
                                💬 Tanya AI
                            </HeroButton>
                            <HeroButton size="md" className="hover:bg-gray-600 transition-all text-neutral-200 font-semibold">
                                🔍 Cari Topik
                            </HeroButton>
                        </div>
                    </div>
                ) : (
                    message.map((msg) => (
                        <ul key={msg.id} className="space-y-6 mb-4">
                            {/* USER */}
                            {msg.role === "user" ? (
                                <li className="w-full max-w-2xl mx-auto flex justify-end gap-x-3 items-end pt-8">
                                    <div className="w-fit max-w-full text-end space-y-3">
                                        <div className="border border-gray-400 shadow-md bg-neutral-600 rounded-2xl p-3 break-words">
                                            <p className="text-md text-neutral-200">{msg.content}</p>
                                        </div>
                                    </div>
                                    <HeroAvatar
                                        size="sm"
                                        showFallback
                                        src="https://images.unsplash.com/broken"
                                        className="text-white bg-neutral-700 inline-block rounded-full flex-shrink-0"
                                    />
                                </li>
                            ) : (
                                <li className="w-full max-w-2xl mx-auto flex gap-x-3 items-start mt-4">
                                    <HeroAvatar
                                        size="sm"
                                        className="inline-block rounded-full flex-shrink-0"
                                        src="https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg"
                                        alt="Avatar"
                                    />
                                    <div className="w-fit max-w-full border border-gray-500 rounded-2xl p-3 space-y-3 shadow-md bg-neutral-700 break-words">
                                        <h3 className="font-medium text-gray-200">Snapclip AI</h3>
                                        <p className="whitespace-pre-line text-md text-neutral-200">{msg.content}</p>
                                    </div>
                                </li>
                            )}
                        </ul>
                    ))
                )}
            </div>

            {/* Input Chat */}
            <div className="fixed bottom-0 w-full px-4 sm:px-8 lg:px-8 pb-2 z-30">
                <div className="w-full max-w-2xl mx-auto rounded-2xl shadow-lg bg-neutral-800 p-4 sm:p-2">
                    <Input onSubmit={sendMessage} />
                </div>
            </div>
        </section>
    );
}

export default ChatClient;