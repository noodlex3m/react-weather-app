import { useState } from "react";

function SearchForm(props) {
	const [inputCity, setInputCity] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		if (!inputCity.trim()) return;
		props.onSearch(inputCity);
		setInputCity("");
	}
	return (
		<form onSubmit={handleSubmit}>
			<input
				value={inputCity}
				onChange={(e) => setInputCity(e.target.value)}
				placeholder="Введіть назву міста"
			/>
			<button type="submit">Пошук</button>
		</form>
	);
}
export default SearchForm;
