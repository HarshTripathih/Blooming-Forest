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
    theme: {
      screens: {
        'xxs': '320px',
        // => @media (min-width: 320px) { ... }
      
        'xs': '360px',
        // => @media (min-width: 360px) { ... }
      
        'xsm': '480px',
        // => @media (min-width: 480px) { ... }
      
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
      
        'md': '768px',
        // => @media (min-width: 768px) { ... }
      
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
      
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
      
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      }
      
    },
    extend: {
      animation: {
        'fade-in-up': 'fadeInUp 1s ease-out both',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
    },
  },
  plugins: [],
}

