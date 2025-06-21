import React from 'react'
import { Metadata } from 'next'
import InputChannel from '@/components/Input/InputChannel'

export const metadata: Metadata = {
  title: "Settings | Snapclip AI",
  description: "settings"
}

export default function Page() {
  return <InputChannel/>
}
