/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./docs/**/*.{md,vue,js}",
    "./docs/.vitepress/**/*.{vue,js}",
  ],
  darkMode: false, // Explicitly disable dark mode to prevent contrast issues
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#000000",
        "foreground-muted": "#1a1a1a", // Extremely dark gray
        muted: "#333333",
        "grid-dot": "#cccccc", // Much darker grid dots
        brick: {
          blue: "#0071e3",
          red: "#d70015", 
          yellow: "#f5c518", 
          green: "#248a3d", 
          orange: "#f38016", 
          purple: "#8e44ad", 
          white: "#ffffff",
        },
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.05em',
      },
      borderRadius: {
        '4xl': '2.5rem',
        '5xl': '3.5rem',
      },
      boxShadow: {
        'brick': '0 15px 35px -5px rgba(0, 0, 0, 0.2), 0 5px 15px rgba(0, 0, 0, 0.1)',
        'brick-hover': '0 30px 60px -10px rgba(0, 0, 0, 0.3), 0 10px 20px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
}
