/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1f77b4",
        secondary: "#ff7f0e",
        success: "#2ca02c",
        danger: "#d62728",
        warning: "#ff7f0e",
        dark: "#1a1a1a",
        light: "#f8f9fa",
      },
      boxShadow: {
        card: "0 4px 15px rgba(0, 0, 0, 0.1)",
        hover: "0 8px 25px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
}
