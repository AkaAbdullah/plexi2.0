/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        darkPrimary: "#1f1b1b",
        darkSecondary: "#262424",
        lightPrimary: "#f2f0f0",
        lightSecondary: "#1e225c",
      },
    },
  },
  plugins: [],
};
