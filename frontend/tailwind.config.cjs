/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wave: {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(2deg) translateY(-1px)" },
          "100%": { transform: "rotate(0deg)" }
        },
        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
          "100%": { transform: "translateY(0px)" }
        }
      },
      animation: {
        wave: "wave 3s ease-in-out infinite",
        float: "float 4s ease-in-out infinite"
      }
    },
  },
  plugins: [],
};
