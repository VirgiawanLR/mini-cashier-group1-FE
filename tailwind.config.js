/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      letterSpacing: {
        tightest: "-8.5%",
      },
      colors: {
        primary: "#2EC4B6",
        tertiary: "#FFBF69",
        light: "#CBF3F0",
        secondary: "#FF9F1C",
        dark: "#0F534C",
        red: "#E64040",
        lighter: "#E8F4F3",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/images/cart-icon.png')",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
};
