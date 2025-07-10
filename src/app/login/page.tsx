import React from 'react'
import type { Metadata } from "next";
import Auth from '@/components/Auth/Auth';

export const metadata: Metadata = {
    title: "Login - SnapClip AI",
    description: "Bikin klip dari video YouTube dengan AI",
};

export default function page() {
  return <Auth />
}