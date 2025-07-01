/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
            sans: ["var(--font-geist-sans)", "sans-serif"],
            mono: ["var(--font-geist-mono)", "monospace"],
        },
      colors: {
        purple: {
          100: "#E9D8FD",
          600: "#6B46C1",
        },
        gray: {
          50: "#F7FAFC",
          100: "#EDF2F7",
          300: "#CBD5E0",
          400: "#A0AEC0",
          700: "#4A5568",
        },
        green: {
          500: "#48BB78",
        },
        blue: {
          500: "#4299E1",
        },
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
        lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};