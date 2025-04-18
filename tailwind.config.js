export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      inconsolata: ['Inconsolata', 'monospace'],
      backgroundImage: {
        'gradient-text': 'linear-gradient(to bottom, hsl(7, 86%, 67%), hsl(0, 0%, 100%))',
      },
      colors: {
        neutral: {
          0: "hsl(0, 0%, 100%)",
          300: "hsl(252, 6%, 83%)",
          500: "hsl(245, 15%, 58%)",
          700: "hsl(245, 19%, 35%)",
          900: "hsl(248, 70%, 10%)",
        },
        orange: {
          500: "hsl(7, 88%, 67%)",
          700: "hsl(7, 71%, 60%)",
        }
      }
    },
  },
}
