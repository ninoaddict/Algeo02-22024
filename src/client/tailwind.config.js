/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accentColor: " #2196F3",
        backColor1: "#2D283E",
        backColor2: "#564F6F",
        backColor3: "#4C495D",
        textColor: "#D1D7E0",
        headerC: "#45a29e",
        navColor: "#C5C7C7",
        descColor: "#CCCCCC",
        descColorGrad: "#666666",
        aboutColor: "rgb(220, 220, 220)",
      },
    },
  },
  plugins: [],
};
