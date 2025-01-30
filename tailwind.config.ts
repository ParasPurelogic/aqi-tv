import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4BA9FF",
        para: "#677580",
        dark_para: "#D0D2D7",
        title: "#31343D",
        dark_title: "#F9FAFF",
        dark_bg: "#24292E",
        error: "#f96d6d",
      },
      spacing: {
        body: "var(--body-padding)",
        maxContainer: "1250px",
        superMax: "1400px",
        ultraMax: "1650px",
      },
      screens: {
        "xs": "360px",
      },
    },
  },
  plugins: [],
}
export default config