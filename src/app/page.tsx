import React from "react";
import { ArrowRight } from "lucide-react";
import HeroButton from "@/components/ui/HeroButton";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex flex-col font-sans">
      {/* Hero Section */}
      <section className="relative px-6 py-24 overflow-hidden">
        {/* Animated Gradient Blobs */}
        <div className="absolute top-[-60px] left-[-80px] w-80 h-80 bg-pink-500 opacity-30 rounded-full blur-3xl animate-pulse-fast"></div>
        <div className="absolute bottom-[-60px] right-[-80px] w-96 h-96 bg-blue-500 opacity-30 rounded-full blur-3xl animate-pulse-slow"></div>

        <div className="relative text-center z-10">
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
            🎬 Ringkas & Klip Video YouTube dengan AI
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto text-gray-300 mb-10">
            Gak sempat nonton full? Ekstrak bagian penting & klip menarik dari YouTube cuma dalam hitungan detik. Powered by LLM.
          </p>
          <HeroButton className="text-lg px-8 py-4 bg-pink-600 hover:bg-pink-700 transition shadow-lg hover:scale-105 duration-300">
            🚀 Login untuk Mulai
          </HeroButton>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-[#1e1b2e] px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-white tracking-wide">
          🔍 Cara Kerjanya
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: "🎯",
              title: "Pilih Video / Channel",
              desc: "Masukkan link video atau pilih dari channel yang tersedia.",
            },
            {
              icon: "💬",
              title: "Tanyakan Apa Saja",
              desc: "Contoh: 'Apa isi video ini?' atau '3 poin pentingnya apa?'",
            },
            {
              icon: "📹",
              title: "Dapatkan Klip + Ringkasan",
              desc: "Tonton bagian penting saja, lengkap dengan narasi dari LLM.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="text-center bg-[#2c254a] rounded-2xl p-8 shadow-xl transform transition hover:scale-105 hover:shadow-2xl duration-300"
            >
              <div className="text-5xl mb-4 animate-bounce">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                {item.title}
              </h3>
              <p className="text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Section */}
      <section className="bg-gradient-to-r from-[#2c3e50] to-[#4ca1af] px-6 py-20">
        <div className="text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
            🎉 Yuk Coba Sekarang!
          </h3>
          <HeroButton className="text-lg px-6 py-4 flex items-center gap-2 bg-white text-black font-semibold shadow-lg hover:scale-105 transition">
            Mulai Sekarang <ArrowRight className="w-4 h-4" />
          </HeroButton>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="bg-[#1e1b2e] text-center py-8 border-t border-gray-700 text-sm text-gray-400">
        <p className="mb-2">🚀 Powered by Next.js, Gemini API, Supabase & Redis</p>
        <Footer />
      </footer>
    </div>
  );
}
