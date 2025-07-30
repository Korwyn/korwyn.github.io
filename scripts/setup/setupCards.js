let countrySetup = {
	german: {
		territories: germanControled,
		id: "germanyCardList"
	}
};

for (let countryName in countrySetup){
	let country = countrySetup[countryName]
	let divId = country.id;
	
	let territories = country.territories
	
	for (let territoryId in territories){
		let territory = territories[territoryId];
		let baseElement = document.getElementById(divId);
		
		let newTerritory = document.createElement("div");
		newTerritory.innerHTML = territory.name;
		
		baseElement.appendChild(newTerritory);
	}
}