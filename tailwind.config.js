/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        heartbeat: {
          "primary": "#e96d7b",
          "secondary": "#88dbdd",
          "highlight": "#e03245",
          "primary-content": "#ffffff",
          "base-100": "rgb(243 244 246)",
          "--rounded-btn": "2rem",
        }
      },
      "valentine"
    ]
  }
}

