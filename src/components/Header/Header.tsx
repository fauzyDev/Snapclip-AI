import React from "react";
import HeroButton from "../ui/HeroButton";

export default function Header({ onMenuClick }: { onMenuClick?: () => void }) {
    return (
        <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 shadow-md">
            <div className="flex items-center justify-between px-4 py-2">
                <div className="md:hidden">
                    <HeroButton
                        className="text-white text-2xl"
                        onPress={onMenuClick}>
                        ☰
                    </HeroButton>
                </div>
                <div className="mx-auto text-center">
                    <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-white">
                        Snapclip AI
                    </h1>
                    <h3 className="text-sm sm:text-md text-neutral-400">
                        Your AI-powered video clip for the web
                    </h3>
                </div>
                <div className="w-6 md:hidden" /> {/* spacer biar title tetap center */}
            </div>
        </header>
    );
}
