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
        title: "#31343D",
        error: "#f96d6d",
        success: "#4FC667",
        body_bg: "#ECF0F3",
      },
      spacing: {
        body: "var(--body-padding)",
        contentHeight: "var(--page-content-height)",
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