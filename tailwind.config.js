/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          100: "rgb(18, 18, 18)",
          200: "rgb(51, 51, 51)",
          300: "rgba(24,28,33,255)",
          400: "#0b0f13",
        },
        light: {
          100: "#167BF7",
          200: "#051933",
        },
        button: "#6759ec",
        hover: "#1d2030",
        label_d: "#e863d7",
        label_b: "#0057fd",
        label_c: "#ffc95f",
      },
    },
  },
  plugins: [],
};
