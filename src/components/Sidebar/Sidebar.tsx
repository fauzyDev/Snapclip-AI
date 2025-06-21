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

export default function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (val: boolean) => void }) {
    return (
        <>
            {/* Sidebar - Desktop */}
            <aside className="hidden md:flex flex-col justify-between fixed left-0 top-0 h-screen w-48 bg-neutral-800/40 shadow-lg z-40 p-4 pb-8 text-white">
                {/* Bagian atas: logo dan menu */}
                <div>
                    <div className="flex space-x-3">
                        <HeroAvatar size="sm" src="https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg" />
                        <h2 className="text-xl font-bold mb-4"> Snapclip</h2>
                    </div>
                    <nav className="pt-4 border-t border-neutral-600">
                        <div className="flex flex-col gap-5 mt-4">
                            <HeroUser
                                avatarProps={{ src: "https://i.pravatar.cc/150?u=a04258114e29026702d" }}
                                description="Account"
                                name="Jane Doe"
                                className="flex flex-row items-center gap-3"
                            />
                            <HeroButton as={Link} href="/snapclip/settings" variant="solid">⚙️ Pengaturan</HeroButton>
                        </div>
                        <h3 className="text-neutral-300 text-base mt-5 font-semibold"> Riwayat</h3>
                        <div className="flex flex-col mt-2">
                            <Link href="/" className="bg-transparent text-sm p-2 hover:bg-white/10 rounded-lg transition duration-200">Cara Investasi</Link>
                            <Link href="/" className="bg-transparent text-sm p-2 hover:bg-white/10 rounded-lg transition duration-200">Apa Itu Bitcoin?</Link>
                            <Link href="/" className="bg-transparent text-sm p-2 hover:bg-white/10 rounded-lg transition duration-200">Cara Mengelola uang</Link>
                        </div>
                    </nav>
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
