/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        green: "#002500",
        artichoke: "#929982",
        lavender: "#f8e5ee",
        terra: "#E07A5F",
        purple: "#1C0118",
      },
      keyframes: {
        spawn: {
          "0%": {
            transform: "scale(200%)",
            opacity: "0%",
          },
          "100%": {
            transform: "scale(100%)",
            opacity: "100%",
          },
        },
        fadein: {
          "0%": {
            opacity: "0%",
          },
          "100%": {
            opacity: "100%",
          },
        }
      },
      animation: {
        fadein: "fadein 500ms both",
        spawn: "spawn 500ms cubic-bezier(1, 0.3, 0.7, 0) both",
      },
    },
  },
  plugins: [require("tailwindcss-animation-delay")],
};
