"use client";

import React from "react";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
} from "@heroui/react";
import { User } from "@heroui/react";

export default function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (val: boolean) => void }) {
    return (
        <>
            {/* Sidebar - Desktop */}
            <aside className="hidden md:flex flex-col justify-between fixed left-0 top-0 h-screen w-48 bg-neutral-800/40 shadow-lg z-40 p-4 pb-8 text-white">
                {/* Bagian atas: logo dan menu */}
                <div>
                    <h2 className="text-xl font-bold mb-4">📽️ Snapclip</h2>
                    <nav className="pt-4 border-t border-neutral-600">
                        <div className="flex flex-col gap-5 mt-4">
                            <User
                                avatarProps={{ src: "https://i.pravatar.cc/150?u=a04258114e29026702d" }}
                                description="Account"
                                name="Jane Doe"
                                className="flex flex-row items-center gap-3"
                            />
                            <Button className="block text-sm text-neutral-100 hover:text-white">⚙️ Pengaturan</Button>
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
                                <Button onPress={onClose}>Tutup</Button>
                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </>
    );
}
