/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './src/components/**/*.{astro,tsx,ts}',
    './src/layouts/**/*.{astro,tsx,ts}',
    './src/pages/**/*.{astro,tsx,ts,md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': '#123A2B',
      },
      fontFamily: {
        serif: ['DM Serif Display', 'serif'],
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
