/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#14b8a6",
        tertiary: "#16a34a",
        dark: "#334155",
        secondary: "#64748b",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/images/cart-icon.png')",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
};
