"use client"

import React from 'react';
import { Avatar } from "@heroui/react";
import { Button } from "@heroui/react";
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
        <section className="flex flex-col min-h-screen w-full items-center px-4 sm:px-8 lg:px-8">
            {/* Chat Container */}
            <div className="max-w-5xl flex flex-col w-full justify-center space-y-4 sm:p-3 h-full overflow-y-auto relative z-10">
                {message.length === 0 ? (
                    <div className="flex flex-col items-center justify-center mt-16 space-y-6 py-12">
                        <h2 className="text-xl sm:text-2xl font-semibold text-white text-center animate-pulse">
                            ✨ Selamat Datang di Snapclip AI...
                        </h2>
                        <div className="flex flex-wrap justify-center gap-4 mt-3">
                            <Button size="md" className="hover:bg-gray-600 transition-all text-neutral-200 font-semibold">📽️ Buat Klip</Button>
                            <Button size="md" className="hover:bg-gray-600 transition-all text-neutral-200 font-semibold">🎞️ Ringkas Video</Button>
                            <Button size="md" className="hover:bg-gray-600 transition-all text-neutral-200 font-semibold">💬 Tanya AI</Button>
                            <Button size="md" className="hover:bg-gray-600 transition-all text-neutral-200 font-semibold">🔍 Cari Topik</Button>
                        </div>
                    </div>
                ) : (
                    message.map((msg) => (
                        <ul key={msg.id} className="space-y-6 mb-4">
                            {/* USER */}
                            {msg.role === "user" ? (
                                <li className="flex justify-end gap-x-3 items-end pt-8">
                                    <div className="max-w-sm text-end space-y-3">
                                        <div className="inline-block border border-gray-400 shadow-md bg-gray-700 rounded-2xl p-4 break-words">
                                            <p className="text-base text-neutral-200">{msg.content}</p>
                                        </div>
                                    </div>
                                    <Avatar
                                        size="sm"
                                        showFallback
                                        src="https://images.unsplash.com/broken"
                                        className="text-white bg-neutral-700 inline-block w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0"
                                    />
                                </li>
                            ) : (
                                <li className="flex gap-x-3 items-start">
                                    <Avatar
                                        size="sm"
                                        className="inline-block w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0"
                                        src="https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg"
                                        alt="Avatar"
                                    />
                                    <div className="max-w-lg border border-gray-500 rounded-2xl p-4 space-y-3 shadow-md bg-neutral-700 break-words">
                                        <h2 className="font-medium text-gray-200">Snapclip AI</h2>
                                        <p className="text-base text-neutral-200">{msg.content}</p>
                                    </div>
                                </li>
                            )}
                        </ul>
                    ))
                )}
            </div>

            {/* Input Chat */}
            <div className="w-full max-w-2xl rounded-2xl shadow-lg bg-neutral-800 sticky bottom-0 p-4 sm:p-2 z-20">
                <Input onSubmit={sendMessage} />
            </div>
        </section>
    );
}

export default ChatClient;