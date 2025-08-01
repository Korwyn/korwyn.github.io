let countrySetup = {
	germany: {
		territories: germanControled,
		id: "germanyCardList",
		allianceName: "axis",
		oil: 0,
		iron: 0,
		osr: 0
	},
	italy: {
		territories: italyControled,
		id: "italyCardList",
		allianceName: "axis",
		oil: 0,
		iron: 0,
		osr: 0
	},
	japan: {
		territories: japanControled,
		id: "japanCardList",
		allianceName: "axis",
		oil: 0,
		iron: 0,
		osr: 0
	},
	usa: {
		territories: usControled,
		id: "usaCardList",
		allianceName: "allies",
		oil: 0,
		iron: 0,
		osr: 0
	},
	china: {
		territories: chinaControled,
		id: "chinaCardList",
		allianceName: "allies",
		oil: 0,
		iron: 0,
		osr: 0
	},
	ussr: {
		territories: ussrControled,
		id: "ussrCardList",
		allianceName: "allies",
		oil: 0,
		iron: 0,
		osr: 0
	},
	uk: {
		territories: ukControled,
		id: "ukCardList",
		allianceName: "allies",
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

			let territoryOil = 0;
			let territoryIron = 0;
			let territoryOSR = 0;

			if (territory.isEmbattled) {
				territoryOil = territory.embattledProduction.oil;
				territoryIron = territory.embattledProduction.iron;
				territoryOSR = territory.embattledProduction.osr;
			}
			else {
				territoryOil = territory.production.oil;
				territoryIron = territory.production.iron;
				territoryOSR = territory.production.osr;
			}

			country.oil += territoryOil;
			country.iron += territoryIron;
			country.osr += territoryOSR;

			let newTerritory = document.createElement("div");
			newTerritory.classList.add("card")
			newTerritory.classList.add(territory.owner);

			if (territory.isEmbattled) {
				newTerritory.classList.add("contestedGradient");
			}
			else {
				newTerritory.classList.remove("contestedGradient");
			}

			let headerDiv = document.createElement("div");
			headerDiv.classList.add("relative");

			let embattledDiv = document.createElement("div");
			embattledDiv.classList.add("absoluteRight");

			let embattledLabel = document.createElement("label");
			embattledLabel.textContent = FIGHTING;

			let embattledCheckbox = document.createElement("input");
			embattledCheckbox.classList.add("checkboxPosition");
			embattledCheckbox.type = "checkbox";
			embattledCheckbox.checked = territory.isEmbattled;
			embattledLabel.appendChild(embattledCheckbox);

			embattledDiv.appendChild(embattledLabel);

			headerDiv.appendChild(embattledDiv);

			embattledCheckbox.addEventListener("change", (event) => {
				let isChecked = event.target.checked;
				territory.isEmbattled = isChecked;

				if (territory.isEmbattled) {
					newTerritory.classList.add("contestedGradient");
				}
				else {
					newTerritory.classList.remove("contestedGradient");
				}
				setupCards();
			});

			let idDiv = document.createElement("div");
			idDiv.classList.add("bold");
			idDiv.innerHTML = territory.id;
			headerDiv.appendChild(idDiv);

			newTerritory.appendChild(headerDiv);

			let nameDiv = document.createElement("div");
			nameDiv.classList.add("spacing");
			nameDiv.innerHTML = territory.name;
			newTerritory.appendChild(nameDiv);

			let controlledSelect = createControledSelectList(newTerritory, country.allianceName, territory);
			controlledSelect.value = territory.countryControlled;

			controlledSelect.addEventListener("change", (event) => {
				let value = event.target.value;
				let oldControled = territory.countryControlled;
				territory.isEmbattled = false;
				territory.countryControlled = value;
				countrySetup[value].territories[territoryId] = territory;
				delete countrySetup[oldControled].territories[territoryId];
				setupCards();
			});

			let productionDiv = document.createElement("div");
			let oilDiv = document.createElement("div");
			oilDiv.classList.add("inlineBlock");
			oilDiv.classList.add("third");
			if (territoryOil) {
				let imgOil = document.createElement("img");
				imgOil.classList.add("icon");
				imgOil.src = "icons/oil.svg";
				oilDiv.appendChild(imgOil);

				let oilSpan = document.createElement("span");
				oilSpan.innerHTML = ":" + territoryOil;
				oilDiv.appendChild(oilSpan);
			}
			productionDiv.appendChild(oilDiv);

			let ironDiv = document.createElement("div");
			ironDiv.classList.add("inlineBlock");
			ironDiv.classList.add("third");

			if (territoryIron) {
				let imgIron = document.createElement("img");
				imgIron.classList.add("icon");
				imgIron.src = "icons/iron.svg";
				ironDiv.appendChild(imgIron);

				let ironSpan = document.createElement("span");
				ironSpan.innerHTML = ":" + territoryIron;
				ironDiv.appendChild(ironSpan);
			}
			productionDiv.appendChild(ironDiv);

			let osrDiv = document.createElement("div");
			osrDiv.classList.add("inlineBlock");
			osrDiv.classList.add("third");

			if (territoryOSR) {
				let imgOSR = document.createElement("img");
				imgOSR.classList.add("icon");
				imgOSR.src = "icons/osr.svg";
				osrDiv.appendChild(imgOSR);

				let osrSpan = document.createElement("span");
				osrSpan.innerHTML = ":" + territoryOSR;
				osrDiv.appendChild(osrSpan);
			}

			if (!territoryOSR && !territoryIron && !territoryOil) {
				let imgOSR = document.createElement("img");
				imgOSR.classList.add("icon");
				imgOSR.src = "icons/transparent.png";
				osrDiv.appendChild(imgOSR);
			}

			productionDiv.appendChild(osrDiv);
			newTerritory.appendChild(productionDiv);
			baseElement.appendChild(newTerritory);
		}

		let productionDiv = document.createElement("div");

		let oilDiv = document.createElement("div");
		oilDiv.classList.add("inlineBlock");
		oilDiv.classList.add("third");
		let imgOil = document.createElement("img");
		imgOil.classList.add("icon");
		imgOil.src = "icons/oil.svg";
		oilDiv.appendChild(imgOil);

		let oilSpan = document.createElement("span");
		oilSpan.innerHTML = ":" + country.oil;
		oilDiv.appendChild(oilSpan);
		productionDiv.appendChild(oilDiv);

		let ironDiv = document.createElement("div");
		ironDiv.classList.add("inlineBlock");
		ironDiv.classList.add("third");
		let imgIron = document.createElement("img");
		imgIron.classList.add("icon");
		imgIron.src = "icons/iron.svg";
		ironDiv.appendChild(imgIron);

		let ironSpan = document.createElement("span");
		ironSpan.innerHTML = ":" + country.iron;
		ironDiv.appendChild(ironSpan);
		productionDiv.appendChild(ironDiv);

		let osrDiv = document.createElement("div");
		osrDiv.classList.add("inlineBlock");
		osrDiv.classList.add("third");
		let imgOSR = document.createElement("img");
		imgOSR.classList.add("icon");
		imgOSR.src = "icons/osr.svg";
		osrDiv.appendChild(imgOSR);

		let osrSpan = document.createElement("span");
		osrSpan.innerHTML = ":" + country.osr;
		osrDiv.appendChild(osrSpan);
		productionDiv.appendChild(osrDiv);

		baseElement.prepend(productionDiv);
	}
}

function createControledSelectList(newTerritory, allianceName, territory) {
	let countryControlled = territory.countryControlled;
	let owner = territory.owner;

	let controledDiv = document.createElement("div");
	controledDiv.classList.add("spacing");
	let controledLabel = document.createElement("lable");
	controledLabel.innerText = "Control: ";
	controledDiv.appendChild(controledLabel);

	let controlledSelect = document.createElement("select");

	if ((allianceName == "axis" && owner == countryControlled) || owner == "china" || countryControlled == "china") {
		let optionChina = document.createElement("option");
		optionChina.value = "china";
		optionChina.textContent = "China";
		controlledSelect.appendChild(optionChina);
	}

	if ((allianceName == "allies" && owner == countryControlled) || owner == "germany" || countryControlled == "germany") {
		let optionGerman = document.createElement("option");
		optionGerman.value = "germany";
		optionGerman.textContent = "Germany";
		controlledSelect.appendChild(optionGerman);
	}

	if ((allianceName == "allies" && owner == countryControlled) || owner == "italy" || countryControlled == "italy") {
		let optionItaly = document.createElement("option");
		optionItaly.value = "italy";
		optionItaly.textContent = "Italy";
		controlledSelect.appendChild(optionItaly);
	}

	if ((allianceName == "allies" && owner == countryControlled) || owner == "japan" || countryControlled == "japan") {
		let optionJapan = document.createElement("option");
		optionJapan.value = "japan";
		optionJapan.textContent = "Japan";
		controlledSelect.appendChild(optionJapan);
	}
	
	if ((allianceName == "axis" && owner == countryControlled) || owner == "uk" || countryControlled == "uk") {
		let optionUk = document.createElement("option");
		optionUk.value = "uk";
		optionUk.textContent = "United Kingdom";
		controlledSelect.appendChild(optionUk);
	}

	if ((allianceName == "axis" && owner == countryControlled) || owner == "usa" || countryControlled == "usa") {
		let optionUsa = document.createElement("option");
		optionUsa.value = "usa";
		optionUsa.textContent = "United States";
		controlledSelect.appendChild(optionUsa);
	}

	if ((allianceName == "axis" && owner == countryControlled) || owner == "ussr" || countryControlled == "ussr") {
		let optionUssr = document.createElement("option");
		optionUssr.value = "ussr";
		optionUssr.textContent = "USSR";
		controlledSelect.appendChild(optionUssr);
	}

	controledDiv.appendChild(controlledSelect);

	newTerritory.appendChild(controledDiv);

	return controlledSelect;
}

setupCards();