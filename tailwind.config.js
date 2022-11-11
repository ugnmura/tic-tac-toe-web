/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        green: "#002500",
        artichoke: "#929982",
        lavender: "#f8e5ee",
        eggplant: "#553E4E",
        purple: "#1C0118",
      },
      keyframes: {
        spawn: {
          "0%": {
            transform: "scale(200%)",
            opacity: "0%"
          },
          "100%": {
            transform: "scale(100%)",
            opacity: "100%"
          },
        },
      },
      animation: {
        spawn: "spawn 0.5s cubic-bezier(1, 0.3, 0.7, 0)",
      },
    },
  },
  plugins: [],
};
