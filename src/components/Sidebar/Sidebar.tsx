"use client";

import React from "react";
import Link from "next/link";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
} from "@heroui/react";
import HeroButton from "../ui/HeroButton";
import HeroAvatar from "../ui/HeroAvatar";
import HeroUser from "../ui/HeroUser";
import { Settings } from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (val: boolean) => void }) {
    return (
        <>
            {/* Sidebar - Desktop */}
            <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-56 bg-neutral-800 border-r border-neutral-700 shadow-[2px_0_6px_rgba(0,0,0,0.4)] z-30 text-white">
                {/* Bagian Atas - Logo dan Pengaturan (sticky / gak ikut scroll) */}
                <div className="p-4 border-b border-neutral-700 shrink-0 bg-neutral-800 z-40">
                    <div className="flex items-center space-x-3 mb-4">
                        <HeroAvatar
                            size="sm"
                            src="https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg"
                        />
                        <h2 className="text-xl font-bold">Snapclip</h2>
                    </div>
                </div>

                {/* Scrollable Chat List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-900">
                    <HeroButton as={Link} size="sm" href="/snapclip/settings" className="w-full bg-neutral-700 hover:bg-neutral-700/70 px-3 py-2 rounded-lg">
                        <Settings size={16} /> New Chat
                    </HeroButton>
                    <h3 className="text-neutral-300 text-base font-semibold top-0 bg-neutral-800 pb-2">
                        Riwayat
                    </h3>
                    <ul className="space-y-2 pr-1">
                        {[...Array(40)].map((_, i) => (
                            <li
                                key={i}
                                className="hover:bg-neutral-700/70 px-3 py-2 rounded-lg transition-all cursor-pointer"
                            >
                                Chat {i + 1}
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            {/* Sidebar - Mobile Drawer */}
            <Drawer isOpen={isOpen} placement="left" onOpenChange={setIsOpen}>
                <DrawerContent className="bg-neutral-900 text-white">
                    {(onClose) => (
                        <>
                            <DrawerHeader className="border-b border-neutral-700">
                                <div className="flex items-center space-x-3">
                                    <HeroAvatar
                                        size="sm"
                                        src="https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg"
                                    />
                                    <h2 className="text-xl font-bold">Snapclip</h2>
                                </div>
                            </DrawerHeader>
                            <DrawerBody className="overflow-y-auto max-h-[70vh] p-4 space-y-2">
                                {[...Array(20)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="hover:bg-neutral-800 px-3 py-2 rounded-lg transition-all cursor-pointer"
                                    >
                                        Chat {i + 1}
                                    </div>
                                ))}
                            </DrawerBody>
                            <DrawerFooter className="border-t border-neutral-700">
                                <HeroButton onPress={onClose}>Tutup</HeroButton>
                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </>

    );
}
