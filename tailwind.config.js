/** @type {import('tailwindcss').Config} */
module.exports = {
  // The personal site only. The leaderboard in src/app/(leaderboard)/ has its own config
  // (tailwind.leaderboard.config.js), so neither stylesheet carries the other's classes.
  content: [
    './src/app/(site)/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warm off-white page ground, in place of the cool #fafafa
        paper: '#fdfdfc',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
