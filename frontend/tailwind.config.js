/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 👈 ensures all your components are scanned
  ],
  theme: {
    extend: {
      fontFamily: {
        Geist: ['Geist', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
