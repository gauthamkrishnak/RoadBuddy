/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#080c14',
          card: '#0f172a',
          cardHover: '#131e36',
          border: '#1e293b',
          borderLight: '#334155',
        },
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          blue: '#3b82f6',
          cyan: '#06b6d4',
          accent: '#38bdf8',
        },
        sos: {
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          glow: 'rgba(225, 29, 72, 0.4)',
        },
        navy: {
          50: '#f0f4f9',
          100: '#e1e9f3',
          200: '#c3d3e7',
          300: '#a4bdcb',
          400: '#6991bc',
          500: '#2563eb',
          600: '#1d4ed8',
          700: '#1e3a8a',
          800: '#0f172a',
          900: '#090d16',
          950: '#04070d',
        },
      },
      boxShadow: {
        'glow-blue': '0 0 25px -5px rgba(59, 130, 246, 0.35)',
        'glow-indigo': '0 0 25px -5px rgba(99, 102, 241, 0.35)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.35)',
        'glow-sos': '0 0 30px -5px rgba(225, 29, 72, 0.5)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
    },
  },
  plugins: [],
}
