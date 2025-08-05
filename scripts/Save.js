function saveGameState() {
	let savedData = JSON.stringify(countries);
	localStorage.setItem("countrySetup", savedData);
	localStorage.setItem("version", version);
}

let version = 2;