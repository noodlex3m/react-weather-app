import { useState, useEffect } from "react";
import SearchForm from "./components/SearchForm";
import WeatherDisplay from "./components/WeatherDisplay";
import "./App.css";

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
		<div className="weather-app">
			<header>
				<h1>React Погода</h1>
				<SearchForm onSearch={handleSearch} />
			</header>
			<main>
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
