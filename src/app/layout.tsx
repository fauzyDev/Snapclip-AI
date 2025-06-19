import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import Header from "@/components/Header/Header";
import SidebarWrapper from "@/components/Sidebar/SidebarWrapper";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SnapClip AI - Next Gen Video Clipper",
  description: "Bikin klip dari video YouTube dengan AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased dark`} suppressHydrationWarning={true}>
        <Providers>
          <div className="min-h-screen bg-neutral-900 flex">
            {/* Sidebar */}
            <SidebarWrapper />
            <div className="flex flex-col flex-grow ml-0 md:ml-48 w-full">
              {/* Header */}
              <Header />
              <main className="flex-grow flex items-center justify-center relative px-4 pt-4">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
