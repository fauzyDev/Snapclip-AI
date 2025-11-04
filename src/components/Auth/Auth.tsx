"use client";

import React from 'react';
import HeroInput from '../ui/HeroInput';
import HeroInputOtp from '../ui/HeroInputOtp';
import HeroButton from '../ui/HeroButton';
import { useRouter } from 'next/navigation';
import { BASE_URL } from '@/config/env';
import { FcGoogle } from "react-icons/fc";
import { supabase } from '@/libs/supabase/client';

export default function Auth() {
  const [email, setEmail] = React.useState<string>("");
  const [token, setToken] = React.useState<string>("");
  const [verify, setVerify] = React.useState<boolean>(false);
  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
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
      <div className="w-full max-w-md bg-neutral-800 border border-neutral-800 rounded-2xl p-8 space-y-6 shadow-xl">
        {verify ? (
          <>
            <h2 className="text-2xl font-bold text-center">Verifikasi Email</h2>

            <form onSubmit={handleEmailVerify} className="space-y-4">
              <div className="flex flex-col space-y-1 items-center">
                <label htmlFor="email" className="text-sm font-medium mb-3">Masukkan OTP</label>
                <HeroInputOtp
                  id="token"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  length={6}
                  required
                  value={token}
                  onValueChange={setToken}
                  size="md"
                  color="default"
                  variant="faded"
                  radius="md"
                  placeholder="Masukkan OTP"
                />
              </div>
              <HeroButton
                type="submit"
                size="md"
                variant="solid"
                color="primary"
                className="w-full hover:bg-blue-700 text-white py-2 cursor-pointer rounded-lg font-semibold transition-all">Verify OTP
              </HeroButton>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center">Masuk</h2>

            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="flex flex-col space-y-1">
                <HeroInput
                  id="email"
                  label="Email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="md"
                  variant="faded"
                  placeholder="Masukkan Email"
                />
              </div>
              <HeroButton
                type="submit"
                size="md"
                variant="solid"
                color="primary"
                className="w-full hover:bg-blue-700 p-2 cursor-pointer rounded-lg font-semibold transition-all">Kirim OTP
              </HeroButton>
            </form>

            <div className="flex items-center gap-4">
              <div className="grow h-px bg-neutral-600" />
              <span className="text-sm text-neutral-400">ATAU</span>
              <div className="grow h-px bg-neutral-600" />
            </div>

            <HeroButton
              onPress={handleGoogleLogin}
              size="md"
              variant="solid"
              className="w-full flex items-center justify-center gap-2 bg-white hover:bg-neutral-300 cursor-pointer text-black font-semibold p-2 rounded-lg transition"
            >
              <FcGoogle className="text-xl" />
              Masuk dengan Google
            </HeroButton>
          </>
        )}
      </div>
    </div>
  )
}