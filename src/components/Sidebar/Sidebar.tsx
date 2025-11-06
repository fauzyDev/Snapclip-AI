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
import { SquarePlus } from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (val: boolean) => void }) {
    return (
        <>
            {/* Sidebar - Desktop */}
            <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-56 bg-neutral-900 border-r border-neutral-800 text-white z-30">
                {/* Bagian Atas - Logo */}
                <div className="p-4 border-b border-neutral-800 shrink-0 bg-neutral-900">
                    <div className="flex items-center space-x-3">
                        <HeroAvatar
                            size="sm"
                            src="https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg"
                        />
                        <h2 className="text-xl font-bold">Snapclip</h2>
                    </div>
                </div>

                {/* Scrollable Area */}
                <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
                    {/* Tombol Chat Baru */}
                    <HeroButton
                        as={Link}
                        size="sm"
                        href="/snapclip/settings"
                        className="w-full bg-transparent hover:bg-neutral-700 px-3 py-2 rounded-lg flex items-center gap-2 justify-center">
                        <SquarePlus size={20} /> <span className="text-sm">Chat Baru</span>
                    </HeroButton>

                    {/* Label Riwayat */}
                    <span className="text-neutral-400 text-sm font-semibold block pt-2">
                        Riwayat
                    </span>

                    {/* List Chat */}
                    <ul className="space-y-1 pr-1">
                        {[...Array(40)].map((_, i) => (
                            <li
                                key={i}
                                className="px-3 py-2 rounded-lg cursor-pointer transition-all hover:bg-neutral-700 hover:text-white text-neutral-300">
                                Chat {i + 1}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Bagian Bawah - User Profile */}
                <div className="shrink-0 p-4 border-t border-neutral-800 bg-neutral-900 flex items-center gap-3 cursor-pointer hover:bg-neutral-800 transition-all">
                    <HeroAvatar
                        size="sm"
                        src="https://api.dicebear.com/9.x/thumbs/svg?seed=SnapUser"
                    />
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">Bebok</span>
                        <span className="text-xs text-neutral-400">Free plan</span>
                    </div>
                </div>
            </aside>

            {/* Sidebar - Mobile Drawer */}
            <Drawer isOpen={isOpen} placement="left" onOpenChange={setIsOpen}>
                <DrawerContent className="bg-neutral-900 text-white">
                    {(onClose) => (
                        <>
                            <DrawerHeader className="border-b border-neutral-800">
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

                            <DrawerFooter className="border-t border-neutral-800">
                                <HeroButton onPress={onClose}>Tutup</HeroButton>
                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </>
    );
}
