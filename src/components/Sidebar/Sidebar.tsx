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
            <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-56 bg-neutral-800 shadow-lg z-40 text-white">
                {/* Bagian Atas - Logo dan Pengaturan (tidak scroll) */}
                <div className="p-4">
                    <div className="flex space-x-3 mb-4">
                        <HeroAvatar size="sm" src="https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg" />
                        <h2 className="text-xl font-bold">Snapclip</h2>
                    </div>
                    <div className="flex flex-col gap-5">
                        <HeroUser
                            avatarProps={{ src: "https://i.pravatar.cc/150?u=a04258114e29026702d" }}
                            description="Account"
                            name="Jane Doe"
                            className="flex flex-row items-center gap-3"
                        />
                        <HeroButton as={Link} size="md" href="/snapclip/settings" variant="solid">
                            <Settings size={24} /> Pengaturan
                        </HeroButton>
                    </div>
                </div>

                {/* Bagian Bawah - Riwayat (scrollable) */}
                <div className="flex-1 px-4 pb-8 flex flex-col min-h-0">
                    {/* Judul tetap nempel */}
                    <h3 className="text-neutral-300 text-base mt-2 font-semibold flex-shrink-0">Riwayat</h3>

                    {/* List scrollable */}
                    <div className="flex-1 overflow-y-auto mt-2">
                        <ul className="space-y-2 pr-1">
                            {[...Array(200)].map((_, i) => (
                                <li key={i} className="text-neutral-300">Chat {i + 1}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </aside>

            {/* Sidebar - Mobile Drawer */}
            <Drawer isOpen={isOpen} placement="left" onOpenChange={setIsOpen}>
                <DrawerContent>
                    {(onClose) => (
                        <>
                            <DrawerHeader>Menu</DrawerHeader>
                            <DrawerBody>
                                <p>Konten navigasi sidebar...</p>
                            </DrawerBody>
                            <DrawerFooter>
                                <HeroButton onPress={onClose}>Tutup</HeroButton>
                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </>
    );
}
