/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Gothic but dreamy color palette
        'deep-void': '#0F0F1A',
        'shadow-veil': '#1A1A2B',
        'midnight-aura': '#2C2C3A',
        'lunar-glow': '#F0F0F5',
        'astral-gold': '#B89C6F',
        'amethyst-dream': '#7F58AF',
        'emerald-whisper': '#4E8D7F',
        'sapphire-haze': '#3F5F7F',
        'whisper-green': '#6FCF97',
        'amber-glow': '#F2C94C',
        'crimson-stain': '#EB5757',
      },
      fontFamily: {
        'cinzel': ['Cinzel', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'card-flip': 'cardFlip 0.8s ease-in-out',
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(184, 156, 111, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(184, 156, 111, 0.8)' },
        },
        cardFlip: {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(180deg)' },
          '100%': { transform: 'rotateY(0deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
