let countries = null;

function countyInitialization() {
	let setup = {
		usa: new Country(usControled, "usaCardList", "allies"),
		china: new Country(chinaControled, "chinaCardList", "allies"),
		uk: new Country(ukControled, "ukCardList", "allies"),
		ussr: new Country(ussrControled, "ussrCardList", "allies"),
		germany: new Country(germanControled, "germanyCardList", "axis"),
		italy: new Country(italyControled, "italyCardList", "axis"),
		japan: new Country(japanControled, "japanCardList", "axis")
	};

	let clone = JSON.parse(JSON.stringify(setup));

	return clone;
}

let countryOrder = ["usa", "china", "uk", "ussr", "germany", "italy", "japan"];

function setupCards() {
	if (!countries) {
		countries = countyInitialization();
	}

	for (let countryName in countries) {
		let country = countries[countryName];
		let divId = country.id;

		country.productionOil = 0;
		country.productionIron = 0;
		country.productionOsr = 0;

		let baseElement = document.getElementById(divId);
		let productionHeader = document.getElementById(divId + "Production");
		baseElement.innerHTML = "";
		productionHeader.innerHTML = "";

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

			country.productionOil += territoryOil;
			country.productionIron += territoryIron;
			country.productionOsr += territoryOSR;

			let listItem = document.createElement("li");
			listItem.setAttribute("draggable", true);
			listItem.setAttribute("id", divId + territory.id);

			let newTerritory = document.createElement("div");
			newTerritory.setAttribute("draggable", true);
			newTerritory.classList.add("card")
			newTerritory.classList.add(territory.owner);

			if (territory.isEmbattled) {
				newTerritory.classList.add("contestedGradient");
			}
			else {
				newTerritory.classList.remove("contestedGradient");
			}

			newTerritory.addEventListener("dragstart", function(event) {
				let oldControled = territory.countryControlled;
				let terId = territoryId;
				
				if(navigator){
					navigator.vibrate(100);
				}

				event.dataTransfer.setData("text/plain", JSON.stringify({ oldControled: oldControled, territoryId: terId }));
			});

			let headerDiv = document.createElement("div");
			headerDiv.classList.add("relative");

			let embattledDiv = document.createElement("div");
			embattledDiv.classList.add("absoluteRight");

			let embattledLabel = document.createElement("label");
			embattledLabel.classList.add("fight");
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
				countries[value].territories[territoryId] = territory;
				delete countries[oldControled].territories[territoryId];
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
			listItem.appendChild(newTerritory);
			baseElement.appendChild(listItem);
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
		oilSpan.innerHTML = ":" + country.productionOil;
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
		ironSpan.innerHTML = ":" + country.productionIron;
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
		osrSpan.innerHTML = ":" + country.productionOsr;
		osrDiv.appendChild(osrSpan);
		productionDiv.appendChild(osrDiv);

		productionHeader.appendChild(productionDiv);
	}
	saveGameState();
	displayCurrentProduction();
}

function createControledSelectList(newTerritory, allianceName, territory) {
	let countryControlled = territory.countryControlled;
	let owner = territory.owner;

	let controledDiv = document.createElement("div");
	controledDiv.classList.add("spacing");
	let controledLabel = document.createElement("lable");
	controledLabel.innerText = SILHOUETTE + PAIRED_ARROW + SILHOUETTE;
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
