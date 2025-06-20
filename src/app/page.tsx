"use client"

import React from "react";
import { Button } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* Hero Section */}
      <section className="text-center px-6 py-20 bg-gradient-to-b from-white to-slate-100">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          🎬 Ringkas & Klip Video YouTube dengan AI
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-gray-600 mb-8">
          Gunakan AI untuk mengekstrak klip dan ringkasan dari video YouTube favoritmu. Hemat waktu dan temukan bagian penting hanya dalam hitungan detik.
        </p>
        <Button className="text-lg px-6 py-4">Login untuk Mulai</Button>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-white px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">Cara Kerjanya</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-xl font-medium mb-2">Pilih Video / Channel</h3>
            <p className="text-gray-600">Masukkan link video atau pilih dari channel tertentu yang sudah disediakan.</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-xl font-medium mb-2">Tanyakan Apa Saja</h3>
            <p className="text-gray-600">Misalnya: Apa isi video ini? atau Apa saja 3 poin pentingnya?</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">📹</div>
            <h3 className="text-xl font-medium mb-2">Dapatkan Klip + Ringkasan</h3>
            <p className="text-gray-600">Lihat klip relevan langsung dari video, lengkap dengan ringkasan dari LLM.</p>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="text-center">
          <Button className="text-lg px-6 py-4 flex items-center gap-2">
            Mulai Sekarang <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="bg-white text-center py-8 border-t">
        <p className="text-gray-600">🚀 Powered by Next.js, Gemini API, Supabase & Redis</p>
        <Footer />
      </footer>
    </div>
  );
}
