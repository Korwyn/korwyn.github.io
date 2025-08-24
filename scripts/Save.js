function saveGameState() {
	let savedData = JSON.stringify(countries);
	localStorage.setItem("countrySetup", savedData);
}


let version = 1;

