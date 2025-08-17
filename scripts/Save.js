function saveGameState() {
	let savedData = JSON.stringify(countries);
	localStorage.setItem("countrySetup", savedData);
	localStorage.setItem("version", version);
	
	localStorage.setItem("axisUnits", JSON.stringify(axisUnits));
	localStorage.setItem("allyUnits", JSON.stringify(allyUnits));
}

let version = 5;