/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "radial-gradient": 'radial-gradient(circle, var(--tw-gradient-stops))',
      },
      fontFamily: {
        kochinoor: ["Kochinoor", "sans-serif"]
      }
    },
  },
  plugins: [],
}

