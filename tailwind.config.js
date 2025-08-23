/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}", // <-- Цей рядок каже: "шукай класи в усіх .jsx файлах всередині папки src"
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
