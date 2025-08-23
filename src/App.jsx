import { useState, useEffect } from "react";
import SearchForm from "./components/SearchForm.jsx";
import WeatherDisplay from "./components/WeatherDisplay.jsx";
// CSS-файл більше не потрібен!

function App() {
	const [city, setCity] = useState("Chernivtsi");
	const [weatherData, setWeatherData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!city) return;
		async function fetchWeather() {
			setLoading(true);
			setError(null);
			setWeatherData(null);
			try {
				const geoResponse = await fetch(
					`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=uk&format=json`
				);
				const geoData = await geoResponse.json();
				if (!geoData.results || geoData.results.length === 0) {
					throw new Error("Місто не знайдено. Спробуйте іншу назву.");
				}
				const { latitude, longitude, name } = geoData.results[0];
				const weatherResponse = await fetch(
					`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
				);
				const weatherData = await weatherResponse.json();
				setWeatherData({
					city: name,
					temperature: weatherData.current_weather.temperature,
					windspeed: weatherData.current_weather.windspeed,
				});
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}
		fetchWeather();
	}, [city]);

	function handleSearch(searchCity) {
		setCity(searchCity);
	}

	return (
		// 'w-full' - width 100%, 'max-w-md' - max-width medium, 'mx-auto' - margin auto по осі X
		// 'bg-white' - білий фон, 'rounded-xl' - заокруглені кути, 'shadow-lg' - велика тінь
		<div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden my-12">
			<header className="p-8 text-white text-center bg-gradient-to-r from-blue-500 to-indigo-600">
				<h1 className="text-4xl font-bold">React Погода</h1>
				<SearchForm onSearch={handleSearch} />
			</header>
			<main className="p-8 text-center">
				<WeatherDisplay
					weatherData={weatherData}
					loading={loading}
					error={error}
				/>
			</main>
		</div>
	);
}

export default App;
