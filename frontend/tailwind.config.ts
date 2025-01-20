import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        primary: {
          100: "#ccddd1",
          200: "#99baa4",
          300: "#669876",
          400: "#337549",
          500: "#00531b",
          600: "#004216",
          700: "#003210",
          800: "#00210b",
          900: "#001105"
        },

        secondary: {
          100: "#f7fbf8",
          200: "#eff8f2",
          300: "#e7f4eb",
          400: "#dff1e5",
          500: "#d7edde",
          600: "#acbeb2",
          700: "#818e85",
          800: "#565f59",
          900: "#2b2f2c"
        },
        
        tertiary: {
          100: "#f3f8f6",
          200: "#e6f1ed",
          300: "#dae9e3",
          400: "#cde2da",
          500: "#c1dbd1",
          600: "#9aafa7",
          700: "#74837d",
          800: "#4d5854",
          900: "#272c2a"
        },

        accent: {
          100: "#effaf2",
          200: "#dff5e6",
          300: "#ceefd9",
          400: "#beeacd",
          500: "#aee5c0",
          600: "#8bb79a",
          700: "#688973",
          800: "#465c4d",
          900: "#232e26"
},
      },
    },
  },
  plugins: [],
} satisfies Config;
