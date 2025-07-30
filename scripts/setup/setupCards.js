let countrySetup = {
	germany: {
		territories: germanControled,
		id: "germanyCardList",
		oil: 0,
		iron: 0,
		osr: 0
	},
	usa: {
		territories: usControled,
		id: "usaCardList",
		oil: 0,
		iron: 0,
		osr: 0
	}
};

function setupCards() {
	for (let countryName in countrySetup) {
		let country = countrySetup[countryName]
		let divId = country.id;

		country.oil = 0;
		country.iron = 0;
		country.osr = 0;

		let baseElement = document.getElementById(divId);
		baseElement.innerHTML = "";

		let territories = country.territories;

		for (let territoryId in territories) {
			let territory = territories[territoryId];

			if (territory.isEmbattled) {
				country.oil += territory.embattledProduction.oil;
				country.iron += territory.embattledProduction.iron;
				country.osr += territory.embattledProduction.osr;
			}
			else {
				country.oil += territory.production.oil;
				country.iron += territory.production.iron;
				country.osr += territory.production.osr;
			}

			let newTerritory = document.createElement("div");
			newTerritory.setAttribute("class", "card " + territory.id);

			let nameDiv = document.createElement("div");
			nameDiv.innerHTML = territory.id + " - " + territory.name;
			newTerritory.appendChild(nameDiv);

			let embattledLabel = document.createElement("label");
			embattledLabel.textContent = "Embattled:"

			let embattledCheckbox = document.createElement("input");
			embattledCheckbox.type = "checkbox";
			embattledCheckbox.checked = territory.isEmbattled;
			embattledLabel.appendChild(embattledCheckbox);

			newTerritory.appendChild(embattledLabel);

			embattledCheckbox.addEventListener("change", (event) => {
				let isChecked = event.target.checked;
				territory.isEmbattled = isChecked;
				setupCards();
			})

			let controledDiv  = document.createElement("div"); 
			let controledLabel = document.createElement("lable");
			controledLabel.innerText= "Controller: ";
			controledDiv.appendChild(controledLabel);
			
			let controlledSelect = document.createElement("select");

			let optionUsa = document.createElement("option");
			optionUsa.value = "usa";
			optionUsa.textContent = "United States";
			controlledSelect.appendChild(optionUsa);

			let optionGerman = document.createElement("option");
			optionGerman.value = "germany";
			optionGerman.textContent = "German";
			controlledSelect.appendChild(optionGerman);

			controlledSelect.value = territory.countryControlled;

			controlledSelect.addEventListener("change", (event) => {
				let target = event.target;
				let value = target.value;
				let oldControled = territory.countryControlled;
				territory.isEmbattled = false;
				territory.countryControlled = value;
				countrySetup[value].territories[territoryId] = territory;
				delete countrySetup[oldControled].territories[territoryId];
				setupCards();
			});
			controledDiv.appendChild(controlledSelect);
			newTerritory.appendChild(controledDiv);

			baseElement.appendChild(newTerritory);
		}

		let productionDiv = document.createElement("div");
		let oilSpan = document.createElement("span");
		oilSpan.innerHTML = " Oil: " + country.oil;
		productionDiv.appendChild(oilSpan);

		let ironSpan = document.createElement("span");
		ironSpan.innerHTML = " Iron: " + country.iron;
		productionDiv.appendChild(ironSpan);

		let osrSpan = document.createElement("span");
		osrSpan.innerHTML = " Osr: " + country.osr;
		productionDiv.appendChild(osrSpan);

		baseElement.prepend(productionDiv);
	}
}

setupCards();