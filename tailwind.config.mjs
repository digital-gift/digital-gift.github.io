/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        deep_teal: '#287A74',
        muted_teal: '#55A9A0',
        mint_green: '#AEEED3',
        pale_yellow: '#FFF8B0',
        brand: {
          deep: '#287A74',
          muted: '#55A9A0',
          mint: '#AEEED3',
          yellow: '#FFF8B0',
          darkBg: '#0B1C1A',
          darkSurface: '#122B28',
          darkCard: '#163834',
          darkBorder: '#1F4D47',
          darkMuted: '#245A53',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      keyframes: {
        wobble: {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '20%': { transform: 'rotate(-3deg) scale(1.02)' },
          '40%': { transform: 'rotate(3deg) scale(1.02)' },
          '60%': { transform: 'rotate(-2deg) scale(1.01)' },
          '80%': { transform: 'rotate(2deg) scale(1.01)' },
        },
        gentlePulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
        floatUp: {
          '0%': { transform: 'translateY(15px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        lidFly: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '50%': { transform: 'translateY(-140px) rotate(-25deg) scale(1.1)', opacity: '0.9' },
          '100%': { transform: 'translateY(-220px) rotate(-45deg) scale(0.7)', opacity: '0' },
        },
        cardReveal: {
          '0%': { transform: 'translateY(60px) scale(0.7)', opacity: '0' },
          '60%': { transform: 'translateY(-10px) scale(1.03)', opacity: '1' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
      },
      animation: {
        wobble: 'wobble 2.5s ease-in-out infinite',
        gentlePulse: 'gentlePulse 2s ease-in-out infinite',
        floatUp: 'floatUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        lidFly: 'lidFly 1s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        cardReveal: 'cardReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
};
