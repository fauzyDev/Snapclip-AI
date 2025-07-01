import React from 'react'
import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import SidebarWrapper from "@/components/Sidebar/SidebarWrapper";
// import Auth from '../session';

export const metadata: Metadata = {
    title: "Home - SnapClip AI",
    description: "Bikin klip dari video YouTube dengan AI",
};

export default function LayoutSnapclip({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="h-screen overflow-hidden bg-neutral-800 flex">
            {/* <Auth /> */}
            {/* Sidebar */}
            <SidebarWrapper />
            <div className="flex flex-col flex-grow w-full ml-0 md:ml-56">
                {/* Header */}
                <Header />
                {/* Main content (scrollable wrapper) */}
                <main className="flex-grow flex w-full overflow-hidden">
                    {children}
                </main>
            </div>
        </div>
    )
}