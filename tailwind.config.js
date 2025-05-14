/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // Disable dark mode
  theme: {
    extend: {
      colors: {
        primary: "#2f855a", // deep green
        secondary: "#68d391", // light green
        background: "#ffffff", // white
      },
      spacing: {
        "72": "18rem",
        "84": "21rem",
      },
      borderRadius: {
        xl: "1rem",
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
