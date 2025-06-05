/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./script.js"],
  theme: {
    extend: {
      colors: {
        pinkish: {
          DEFAULT: "#fbcfe8",
          light: "#fde7f3",
          dark: "#f472b6",
        },
        orangesh: {
          DEFAULT: "#fb923c",
          light: "#fed7aa",
          dark: "#c2410c",
        },
        backgroundGradientStart: "#fff0f6",
        backgroundGradientEnd: "#ffe4e6",
      },
      backgroundImage: {
        "pink-orange-gradient":
          "linear-gradient(135deg, #fff0f6 0%, #ffe4e6 100%)",
      },
      borderRadius: {
        custom: "12px",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
