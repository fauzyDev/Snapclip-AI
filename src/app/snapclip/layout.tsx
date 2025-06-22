import React from 'react'
import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import SidebarWrapper from "@/components/Sidebar/SidebarWrapper";

export const metadata: Metadata = {
    title: "Home - SnapClip AI",
    description: "Bikin klip dari video YouTube dengan AI",
};

export default function LayoutSnapclip({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="h-screen overflow-hidden bg-neutral-900 flex">
            {/* Sidebar */}
            <SidebarWrapper />
            <div className="flex flex-col flex-grow ml-0 md:ml-48 w-full">
                {/* Header */}
                <Header />
                <main className="flex-grow flex items-center justify-center">
                    {children}
                </main>
            </div>
        </div>
    )
}