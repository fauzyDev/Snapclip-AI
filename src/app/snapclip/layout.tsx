import React from 'react'
import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import SidebarWrapper from "@/components/Sidebar/SidebarWrapper";
import ReactPlayer from "react-player";

export const metadata: Metadata = {
    title: "Home - SnapClip AI",
    description: "Bikin klip dari video YouTube dengan AI",
};

export default function LayoutSnapclip({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="h-screen overflow-hidden bg-neutral-800 flex">
            {/* Sidebar */}
            <SidebarWrapper />
            <div className="flex flex-col grow w-full ml-0 md:ml-56">
                {/* Header */}
                <Header />

                {/* YouTube iframe preloader */}
                <div className="hidden">
                    <ReactPlayer src='https://www.youtube.com/watch?v=XnNaOO5B_QE' style={{ opacity: 0, pointerEvents: "none" }} />
                </div>

                {/* Main content (scrollable wrapper) */}
                <main className="grow flex w-full overflow-hidden">
                    {children}
                </main>
            </div>
        </div>
    )
}