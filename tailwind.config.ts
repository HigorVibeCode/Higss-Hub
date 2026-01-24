import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#071316',
        surface: '#0B1A1E',
        card: '#24343A',
        border: '#3A4B52',
        text: '#F4F6F7',
        muted: '#A8B3B8',
        accent: '#D87445',
        accentHover: '#F08B5C',
      },
      fontFamily: {
        manrope: ['var(--font-manrope)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
