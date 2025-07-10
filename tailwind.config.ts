/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e3a8a', // Deep blue for headers
        secondary: '#6b7280', // Gray for text
        accent: '#10b981', // Green for buttons
        error: '#ef4444', // Red for errors
      },
    },
  },
  plugins: [],
}