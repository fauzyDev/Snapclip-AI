"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { BASE_URL } from '@/config/env';
import { FcGoogle } from "react-icons/fc";
import { supabase } from '@/libs/supabase/client';

export default function Login() {
  const [email, setEmail] = React.useState<string>("");
  const [token, setToken] = React.useState<string>("");
  const [verify, setVerify] = React.useState<boolean>(false);
  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        shouldCreateUser: true,
      }
    })

    if (error) {
      console.error(error.message)
    }
    setVerify(true)
  }

  const handleEmailVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data: { session }, error } = await supabase.auth.verifyOtp({
      email: email,
      token: token,
      type: "email"
    })

    if (error) {
      console.error(error.message)
    }

    if (session) {
      router.push("/snapclip")
    }
    setVerify(true)
  }

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: 'consent'
        },
        redirectTo: `${BASE_URL}/auth/callback`,
      }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white px-4">
      <div className="w-full max-w-md bg-neutral-800 border border-neutral-700 rounded-2xl p-8 space-y-6 shadow-xl">
        {verify ? (
          <>
            <h2 className="text-2xl font-bold text-center">Verifikasi Email</h2>

            <form onSubmit={handleEmailVerify} className="space-y-4">
              <div className="flex flex-col space-y-1">
                <label htmlFor="email" className="text-sm font-medium mb-3">Verify OTP</label>
                <input
                  id="token"
                  type="number"
                  required
                  value={token}
                  onChange={e => setToken(e.target.value)}
                  className="bg-neutral-700 border border-neutral-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan OTP"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 cursor-pointer rounded-lg font-semibold transition-all">Verify OTP
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center">Masuk Akun</h2>

            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="flex flex-col space-y-1">
                <label htmlFor="email" className="text-sm font-medium mb-3">Email</label>
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
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 cursor-pointer rounded-lg font-semibold transition-all">Kirim OTP
              </button>
            </form>

            <div className="flex items-center gap-4">
              <div className="flex-grow h-px bg-neutral-600" />
              <span className="text-sm text-neutral-400">ATAU</span>
              <div className="flex-grow h-px bg-neutral-600" />
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 bg-white hover:bg-neutral-400 cursor-pointer text-black font-semibold py-2 rounded-lg transition"
            >
              <FcGoogle className="text-xl" />
              Masuk dengan Google
            </button>
          </>
        )}
      </div>
    </div>
  )
}