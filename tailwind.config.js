// tailwind.config.js
import {heroui} from "@heroui/react";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulseSlow 5s ease-in-out infinite',
        'pulse-fast': 'pulseFast 3s ease-in-out infinite',
      },
      keyframes: {
        pulseSlow: {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '0.3',
          },
          '50%': {
            transform: 'scale(1.2)',
            opacity: '0.5',
          },
        },
        pulseFast: {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '0.3',
          },
          '50%': {
            transform: 'scale(1.4)',
            opacity: '0.5',
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()]
}

export default config;