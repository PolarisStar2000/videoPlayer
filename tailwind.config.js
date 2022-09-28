module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  safelist: [ "bg-rose-400", "bg-emerald-400", "bg-sky-400", "bg-stone-400"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
}