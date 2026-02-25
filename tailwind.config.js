/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        alive: "#4ade80",
        dead: "#0a0a0a",
        grid: "#1a1a2e",
        primary: "#16213e",
        accent: "#0f3460",
        highlight: "#e94560",
      },
    },
  },
  plugins: [],
};
