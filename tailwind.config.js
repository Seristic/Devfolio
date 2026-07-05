/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        rose: "#C4708A",
        plum: "#9B7BA6",
        blush: "#E8B4C8",
        champagne: "#F0E6ED",
        "rose-pale": "#F7EEF3",
        ink: "#1A1118",
        mist: "#6B5A63",
        page: "#FDFBFC",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        body: ["DM Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["DM Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { transform: "translateY(24px)", opacity: "0" }, "100%": { transform: "translateY(0)", opacity: "1" } },
      },
    },
  },
  plugins: [],
};