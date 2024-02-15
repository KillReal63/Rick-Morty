/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "rgb(32, 35, 41)",
        character: "rgb(60, 62, 68)",
        text_gray: "rgb(158, 158, 158)",
      },
    },
  },
  plugins: [],
};
