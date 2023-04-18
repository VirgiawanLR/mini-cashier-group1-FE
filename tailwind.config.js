/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2EC4B6",
        tertiary: "#FFBF69",
        light: "#CBF3F0",
        secondary: "#FF9F1C",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/images/cart-icon.png')",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
};
