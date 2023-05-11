/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        8: "repeat(8, minmax(0, 1fr))",
        10: "repeat(10, minmax(0, 1fr))",
      },
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
  plugins: [],
};
