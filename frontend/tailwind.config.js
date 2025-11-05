/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#52B788',      // Snapsuuq Green
        'primary-dark': '#3D8B63', // Darker green for hovers
        'primary-light': '#95D5B2', // Light green
        accent: '#FFB020',        // Snapsuuq Orange
        secondary: '#f3f4f6',
      }
    },
  },
  plugins: [],
}

