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
				className="text-black bg-white border rounded px-2 py-1"
				value={inputCity}
				onChange={(e) => setInputCity(e.target.value)}
				placeholder="Введіть назву міста"
			/>
			<button
				type="submit"
				className="ml-2 px-4 py-1 bg-blue-500 text-white rounded border border-blue-700 hover:border-blue-900 transition-colors duration-200"
			>
				Пошук
			</button>
		</form>
	);
}
export default SearchForm;
