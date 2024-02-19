/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "rgb(32, 35, 41)",
        character: "rgb(60, 62, 68)",
        text_gray: "rgb(158, 158, 158)",
        table_header: "rgb(0,152,121)",
        even: "rgb(243, 243, 243)",
        modal_overlay: "rgba(28, 28, 33, 0.4)",
        modal: '#FFFFFF'
      },
    },
  },
  plugins: [],
};
