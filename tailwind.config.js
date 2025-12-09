/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        eco: {
          green: '#556B2F', // Earthy Matt Green (Dark Olive Green)
          darkBlue: '#1f2937', // Dark Gray
          beige: '#f0fdf4', // Soft Mint White
          gold: '#E6C288', // Warm Sand (Replacing Sky Blue)
          white: '#FFFFFF',
          lightGreen: '#dcfce7' // Light Green
        }
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        sans: ['"Source Sans 3"', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // If you don't have typography plugin installed, you can remove this line, 
    // but the blog post page uses 'prose' class which usually requires it.
    // For this build, we will rely on standard classes or you must install @tailwindcss/typography
  ],
}