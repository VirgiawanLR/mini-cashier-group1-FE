/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#14b8a6",
        tertiary: "#16a34a",
        dark: "#334155",
        secondary: "#64748b",
      },
    },
  },
  plugins: [],
};
