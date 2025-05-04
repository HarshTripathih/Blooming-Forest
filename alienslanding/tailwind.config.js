const { Bokor } = require('next/font/google');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xxs': '320px',
        // => @media (min-width: 320px) { ... }
      
        'xs': '360px',
        // => @media (min-width: 360px) { ... }
      
        'xsm': '480px',
        // => @media (min-width: 480px) { ... }
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s ease-out both',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      scale: {
        '200': '2',
      },
      fontFamily: {
        nostalgic: ['"The Nostalgic"', 'sans-serif'],
        belkinregular: ['"Belkin Regular"', 'sans-serif'],
        belkinlight: ['"Belkin Light"', 'sans-serif'],
        waterfallregular: ['"Waterfall Regular"', 'sans-serif'],
        bokor: ["var(--font-bokor)"],
      },
    },
  },
  plugins: [],
}

