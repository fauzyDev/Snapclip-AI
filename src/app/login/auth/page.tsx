"use client"

import React from 'react'
import { FcGoogle } from "react-icons/fc"
import { supabase } from '@/libs/supabase/client'

export default function Login() {
  const [email, setEmail] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: "http://localhost:3000/snapclip"
      }
    })

    if (error) {
      alert("Login gagal: " + error.message)
    } else {
      alert("📩 Cek email lu buat magic link!")
    }
    setLoading(false)
  }

  const handleGoogleLogin = async () => {
     const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: 'consent'
        },
        redirectTo: "http://localhost:3000/auth/callback",
      }
    })

    if (error) {
      alert("Login gagal: " + error.message)
    } else {
      setTimeout(() => {
        alert("📩 Cek email lu buat magic link!")
      }, 2000)
      console.log(data)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white px-4">
      <div className="w-full max-w-md bg-neutral-800 border border-neutral-700 rounded-2xl p-8 space-y-6 shadow-xl">
        <h2 className="text-2xl font-bold text-center">Masuk ke akun lu</h2>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="bg-neutral-700 border border-neutral-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? "Mengirim link..." : "Lanjut dengan Email"}
          </button>
        </form>

        <div className="flex items-center gap-4">
          <div className="flex-grow h-px bg-neutral-600" />
          <span className="text-sm text-neutral-400">ATAU</span>
          <div className="flex-grow h-px bg-neutral-600" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-white hover:bg-neutral-200 text-black font-semibold py-2 rounded-lg transition"
        >
          <FcGoogle className="text-xl" />
          Masuk dengan Google
        </button>
      </div>
    </div>
  )
}

