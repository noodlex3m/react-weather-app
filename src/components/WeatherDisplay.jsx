function WeatherDisplay(props) {
	const { weatherData, loading, error } = props;
	if (loading) {
		return <p>Завантаження...</p>;
	}
	if (error) {
		return <p className="error-message">{error}</p>;
	}
	if (!weatherData) {
		return null;
	}
	return (
		<div className="weather-display">
			<h2>Погода в місті {weatherData.city}</h2>
			<p className="temperature">{weatherData.temperature}</p>
			<p>Швидкість вітру: {weatherData.windspeed}</p>
		</div>
	);
}

export default WeatherDisplay;
