import React from "react";
import HeroButton from "../ui/HeroButton";
import { Menu } from "lucide-react";

export default function Header({ onMenuClick }: { onMenuClick?: () => void }) {
    return (
        <nav className="bg-linear-to-r from-neutral-900 via-neutral-800 to-neutral-900 shadow-md">
            <div className="flex items-center justify-between px-4 py-2">
                <div className="md:hidden">
                    <HeroButton
                        size="sm"
                        onPress={onMenuClick}>
                        <Menu />
                    </HeroButton>
                </div>
                <div className="mx-auto text-center">
                    <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-white">
                        Snapclip AI
                    </h1>
                    <h3 className="text-sm text-neutral-400 animate-fade-in">
                        Your AI-powered video clip for the web
                    </h3>
                </div>
                <div className="w-6 md:hidden" /> {/* spacer biar title tetap center */}
            </div>
        </nav>
    );
}