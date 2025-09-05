/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // ✅ scan ไฟล์ใน src
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6366f1", // indigo-500
          dark: "#4f46e5"
        }
      }
    }
  },
  plugins: []
};
