/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F05219',
        secondary: {
          purple: '#271F30',
          gray: '#80F85',
          white: '#FFFFFF',
          taupe: '#453F3C',
        },
      },
    },
  },
  plugins: [],
}
