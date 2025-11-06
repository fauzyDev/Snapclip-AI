"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import HeroButton from "@/components/ui/HeroButton";
import useSessionRedirect from '@/hooks/useSessionRedirect';

export default function ButtonAuth() {
    const router = useRouter();
    const { session } = useSessionRedirect();

    const handleSession = () => {
        router.push(session ? "/snapclip" : "/login")
    }

    return (
        <HeroButton onPress={handleSession} className="group relative px-8 py-4 bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 border border-purple-400/20">
            <span className="relative z-10 flex items-center gap-2">
                🚀 Mulai Sekarang
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
        </HeroButton>
    )
}
