import React from "react";
import ButtonAuth from "./session";
import { ArrowRight } from "lucide-react";
import HeroButton from "@/components/ui/HeroButton";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern bg-size-[60px_60px]" />
      <div className="absolute inset-0 bg-linear-to-br from-transparent via-purple-500/10 to-transparent" />

      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-linear-to-r from-purple-400 to-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" />
      <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-linear-to-r from-cyan-400 to-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-delayed" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-linear-to-r from-pink-400 to-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-slow" />

      {/* Hero Section */}
      <section className="relative px-6 py-32 flex items-center justify-center min-h-screen">
        <div className="text-center space-y-8 max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            AI-Powered Video Intelligence
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-none tracking-tight">
            <span className="block bg-linear-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              Smart YouTube
            </span>
            <span className="block bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
              Clips & Insights
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ekstrak momen penting dari video YouTube dalam hitungan detik.
            <span className="text-transparent bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text font-semibold"> Powered by AI</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            {/* Check Session */}
            <ButtonAuth />
            {/* Check Session */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Bagaimana Cara Kerjanya?
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tiga langkah sederhana untuk mendapatkan insight video yang Anda butuhkan
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            {
              icon: "🎯",
              title: "Input Video",
              desc: "Paste link YouTube atau pilih dari channel favorit Anda",
              gradient: "from-purple-500 to-pink-500",
              delay: "0ms"
            },
            {
              icon: "🤖",
              title: "AI Processing",
              desc: "AI menganalisis konten dan mengidentifikasi bagian penting",
              gradient: "from-cyan-500 to-blue-500",
              delay: "200ms"
            },
            {
              icon: "⚡",
              title: "Instant Results",
              desc: "Dapatkan klip cerdas dan ringkasan dalam sekali klik",
              gradient: "from-pink-500 to-red-500",
              delay: "400ms"
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group relative p-8 rounded-3xl bg-linear-to-br from-white/5 to-white/2 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105"
              style={{ animationDelay: item.delay }}
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-linear-to-br ${item.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`} />

              {/* Icon */}
              <div className="relative">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br ${item.gradient} mb-6 shadow-lg`}>
                  <span className="text-2xl">{item.icon}</span>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {item.desc}
                </p>
              </div>

              {/* Step Number */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-sm font-bold text-white/60">
                {i + 1}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Glass Card */}
          <div className="relative p-12 rounded-3xl bg-linear-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
            <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 to-pink-500/10 rounded-3xl" />

            <div className="relative z-10">
              <h3 className="text-4xl sm:text-5xl font-bold mb-6">
                <span className="bg-linear-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Siap untuk Mencoba?
                </span>
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Bergabung dengan ribuan creator yang sudah menggunakan AI untuk mengoptimalkan konten mereka
              </p>

              <HeroButton className="group relative px-10 py-5 bg-linear-to-r from-white to-gray-100 text-black font-bold text-xl rounded-2xl shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-105">
                <span className="flex items-center gap-3">
                  Mulai Gratis Sekarang
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </HeroButton>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 mb-4 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Powered by Next.js • Gemini AI • Supabase • Redis
          </p>
          <Footer />
        </div>
      </footer>
    </div>
  );
}
