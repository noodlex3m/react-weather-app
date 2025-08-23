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
		<div className="weather-display bg-white p-6 rounded-lg shadow-lg text-center max-w-md mx-auto mt-8">
			<h2 className="text-2xl font-bold mb-2">
				Погода в місті {weatherData.city}
			</h2>
			<p className="temperature text-4xl font-semibold mb-2">
				{weatherData.temperature}
			</p>
			<p className="text-gray-700">Швидкість вітру: {weatherData.windspeed}</p>
		</div>
	);
}

export default WeatherDisplay;
