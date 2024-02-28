/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        darkblue: {
          "100": "#1f22a9",
          "200": "#1e22aa",
        },
        gray: {
          "100": "#818181",
          "200": "#808080",
        },
        mediumblue: "#3740fa",
        darkgray: "#999",
        dimgray: {
          "100": "#666",
          "200": "#4d4d4d",
        },
        black: "#000",
        gainsboro: "#d9d9d9",
        dodgerblue: "#007ff4",
        firebrick: "#d02222",
        darkolivegreen: "#497637",
        red: "#e40606",
        gold: "#ffcc00",
        beige: "#fffee7",
      },
    },
    fontSize: {
      'xl': '24px',
      '2xl': '32px',
      '3xl': '40px'
    }
  },
  plugins: [],
}