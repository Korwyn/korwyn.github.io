let currentResourceRow = document.getElementById("currentResourceRow");
let oilBidRow = document.getElementById("oilBidRow");
let stressRow = document.getElementById("stressRow");
let repairsRow = document.getElementById("repairsRow");
let raidsRow = document.getElementById("raidsRow");
let tradesRow = document.getElementById("tradesRow");
let buildsRow = document.getElementById("buildsRow");

let goodsRow = document.getElementById("goodsRow");
let infantryRow = document.getElementById("infantryRow");
let artilleryRow = document.getElementById("artilleryRow");
let tanksRow = document.getElementById("tanksRow");
let fightersRow = document.getElementById("fightersRow");
let bombersRow = document.getElementById("bombersRow");
let submarinesRow = document.getElementById("submarinesRow");
let cruisersRow = document.getElementById("cruisersRow");
let carriersRow = document.getElementById("carriersRow");
let battleshipsRow = document.getElementById("battleshipsRow");

let totalRow = document.getElementById("totalRow");

let units = {
	infantry: {
		cost: new Production({ osr: 2 }),
		row: infantryRow
	},
	artillery: {
		cost: new Production({ iron: 2, osr: 1 }),
		row: artileryRow
	},
	tank: {
		cost: new Production({ oil: 1, iron: 2, osr: 1 }),
		row: tanksRow
	},
	fighter: {
		cost: new Production({ oil: 2, iron: 1, osr: 1 }),
		row: fightersRow
	},
	bomber: {
		cost: new Production({ oil: 2, iron: 2, osr: 1 }),
		row: bombersRow
	},
	submarine: {
		cost: new Production({ oil: 1, iron: 2, osr: 1 }),
		row: submarinesRow
	},
	cruiser: {
		cost: new Production({ oil: 2, iron: 3, osr: 2 }),
		row: cruisersRow
	},
	carrier: {
		cost: new Production({ oil: 4, iron: 3, osr: 3 }),
		row: carriersRow
	},
	battleShip: {
		cost: new Production({ oil: 3, iron: 4, osr: 3 }),
		row: battleshipsRow
	}
}

function calcProduction() {
	createLabelTds();

	for (let i = 0; i < countryOrder.length; i++) {
		countryName = countryOrder[i];
		country = countries[countryName];

		if (!country.currentOil) {
			country.currentOil = country.productionOil;
		}

		let currentOil = country.currentOil;

		if (!country.currentIron) {
			country.currentIron = country.productionIron;
		}

		let currentIron = country.currentIron;

		if (!country.currentOsr) {
			country.currentOsr = country.productionOsr;
		}

		let currentOsr = country.currentOsr;

		let currentResourceBlankCell = document.createElement("td");
		currentResourceRow.appendChild(currentResourceBlankCell);

		let oilTd = document.createElement("td");

		let oilDiv = document.createElement("div");
		oilDiv.classList.add("center");
		let imgOil = document.createElement("img");
		imgOil.classList.add("icon");
		imgOil.src = "icons/oil.svg";
		oilDiv.appendChild(imgOil);

		let oilSpan = document.createElement("div");
		oilSpan.innerHTML = currentOil;
		oilDiv.appendChild(oilSpan);

		oilTd.appendChild(oilDiv);
		currentResourceRow.appendChild(oilTd);

		let ironTd = document.createElement("td");
		ironTd.classList.add("center");

		let ironDiv = document.createElement("div");
		ironDiv.classList.add("center");
		let imgIron = document.createElement("img");
		imgIron.classList.add("icon");
		imgIron.src = "icons/iron.svg";
		ironDiv.appendChild(imgIron);

		let ironSpan = document.createElement("div");
		ironSpan.innerHTML = currentIron;
		ironDiv.appendChild(ironSpan);
		ironTd.appendChild(ironDiv);

		currentResourceRow.appendChild(ironTd);

		let osrTd = document.createElement("td");

		let osrDiv = document.createElement("div");
		osrDiv.classList.add("center");
		let imgOSR = document.createElement("img");
		imgOSR.classList.add("icon");
		imgOSR.src = "icons/osr.svg";
		osrDiv.appendChild(imgOSR);

		let osrSpan = document.createElement("div");
		osrSpan.innerHTML = currentOsr;
		osrDiv.appendChild(osrSpan);
		osrTd.appendChild(osrDiv);

		currentResourceRow.appendChild(osrTd);

		oilBidding(oilBidRow, countryName, "bidding", country);
		tripleResourceInput(stressRow, countryName, "stress", country);
		tripleResourceInput(repairsRow, countryName, "repairs", country);
		tripleResourceInput(raidsRow, countryName, "raids", country);
		tripleResourceInput(goodsRow, countryName, "goods", country);
		tradeResourceInput(tradesRow, countryName, country);
		allBlankInputs(buildsRow, country);

		for (unitType in units) {
			unit = units[unitType];

			unitInput(unit, country);
		}

		allBlankInputs(totalRow, country);
	}

	function oilBidding(rowToAppend, countryName, trackingType, country) {
		let oil = country.tracker[trackingType].oil;
		oil = (oil == 0 ? "" : oil);

		let oilBidBlankCell = document.createElement("td");
		rowToAppend.appendChild(oilBidBlankCell);

		let oilBidCell = document.createElement("td");
		let oilBidInput = document.createElement("input");
		oilBidInput.setAttribute("countryName", countryName);
		oilBidInput.setAttribute("resourceType", "oil");
		oilBidInput.setAttribute("trackingType", trackingType);
		oilBidInput.value = oil || "";
		oilBidCell.appendChild(oilBidInput);

		rowToAppend.appendChild(oilBidCell);

		let blankIronCell = document.createElement("td");
		rowToAppend.appendChild(blankIronCell);

		let blankOsrCell = document.createElement("td");
		rowToAppend.appendChild(blankOsrCell);
	}

	function tripleResourceInput(rowToAppend, countryName, trackingType, country) {
		let blankCell = document.createElement("td");
		rowToAppend.appendChild(blankCell);

		let oil = country.tracker[trackingType].oil;
		let iron = country.tracker[trackingType].iron;
		let osr = country.tracker[trackingType].osr;

		oil = (oil == 0 ? "" : oil);
		iron = (iron == 0 ? "" : iron);
		osr = (osr == 0 ? "" : osr);

		let oilCell = document.createElement("td");
		let oilInput = document.createElement("input");
		oilInput.setAttribute("countryName", countryName);
		oilInput.setAttribute("resourceType", "oil");
		oilInput.setAttribute("trackingType", trackingType);
		oilInput.value = oil || "";
		oilCell.appendChild(oilInput);
		rowToAppend.appendChild(oilCell);

		let ironCell = document.createElement("td");
		let ironInput = document.createElement("input");
		ironInput.setAttribute("countryName", countryName);
		ironInput.setAttribute("resourceType", "iron");
		ironInput.setAttribute("trackingType", trackingType);
		ironInput.value = iron || "";
		ironCell.appendChild(ironInput);
		rowToAppend.appendChild(ironCell);

		let osrCell = document.createElement("td");
		let osrInput = document.createElement("input");
		osrInput.setAttribute("countryName", countryName);
		osrInput.setAttribute("resourceType", "osr");
		osrInput.setAttribute("trackingType", trackingType);
		osrInput.value = osr || "";
		osrCell.appendChild(osrInput);
		rowToAppend.appendChild(osrCell);
	}

	function tradeResourceInput(rowToAppend, countryName) {
		let indicatorCell = document.createElement("td");

		let minusCell = document.createElement("div");
		minusCell.classList.add("minusDiv");
		minusCell.textContent = "-";
		indicatorCell.appendChild(minusCell);

		let plusCell = document.createElement("div");
		plusCell.classList.add("plusDiv");
		plusCell.textContent = "+";
		indicatorCell.appendChild(plusCell);

		rowToAppend.appendChild(indicatorCell);

		let oilCell = document.createElement("td");

		let oilMinusDiv = document.createElement("div");

		let oilInputMinus = document.createElement("input");
		oilInputMinus.setAttribute("type", "radio");
		oilInputMinus.setAttribute("value", 2);
		oilInputMinus.setAttribute("name", "minus" + countryName);
		oilMinusDiv.appendChild(oilInputMinus);

		oilCell.appendChild(oilMinusDiv);

		let ironCell = document.createElement("td");

		let oilPlusDiv = document.createElement("div");

		let oilInputPlus = document.createElement("input");
		oilInputPlus.setAttribute("type", "radio");
		oilInputPlus.setAttribute("value", 2);
		oilInputPlus.setAttribute("name", "plus" + countryName);
		oilPlusDiv.appendChild(oilInputPlus);

		oilCell.appendChild(oilPlusDiv);

		rowToAppend.appendChild(oilCell);

		let ironMinusDiv = document.createElement("div");

		let ironInputMinus = document.createElement("input");
		ironInputMinus.setAttribute("type", "radio");
		ironInputMinus.setAttribute("value", 3);
		ironInputMinus.setAttribute("name", "minus" + countryName);
		ironMinusDiv.appendChild(ironInputMinus);

		ironCell.appendChild(ironMinusDiv);

		let ironPlusDiv = document.createElement("div");

		let ironInputPlus = document.createElement("input");
		ironInputPlus.setAttribute("type", "radio");
		ironInputPlus.setAttribute("value", 3);
		ironInputPlus.setAttribute("name", "plus" + countryName);
		ironPlusDiv.appendChild(ironInputPlus);

		ironCell.appendChild(ironPlusDiv);

		rowToAppend.appendChild(ironCell);

		let osrCell = document.createElement("td");

		let osrMinusDiv = document.createElement("div");

		let osrInputMinus = document.createElement("input");
		osrInputMinus.setAttribute("type", "radio");
		osrInputMinus.setAttribute("name", "minus" + countryName);
		osrInputMinus.setAttribute("value", 5);
		osrMinusDiv.appendChild(osrInputMinus);

		osrCell.appendChild(osrMinusDiv);

		let osrPlusDiv = document.createElement("div");

		let osrInputPlus = document.createElement("input");
		osrInputPlus.setAttribute("type", "radio");
		osrInputPlus.setAttribute("value", 5);
		osrInputPlus.setAttribute("name", "plus" + countryName);
		osrPlusDiv.appendChild(osrInputPlus);

		osrCell.appendChild(osrPlusDiv);

		rowToAppend.appendChild(osrCell);
	}

	function allBlankInputs(rowToAppend, countryName) {
		let blankCell = document.createElement("td");
		rowToAppend.appendChild(blankCell);

		let oilCell = document.createElement("td");
		let oilSpan = document.createElement("span");
		oilCell.appendChild(oilSpan);
		rowToAppend.appendChild(oilCell);

		let ironCell = document.createElement("td");
		let ironSpan = document.createElement("span");
		ironCell.appendChild(ironSpan);
		rowToAppend.appendChild(ironCell);

		let osrCell = document.createElement("td");
		let osrSpan = document.createElement("span");
		osrCell.appendChild(osrSpan);
		rowToAppend.appendChild(osrCell);
	}

	function unitInput(unit, country) {
		let rowToAppend = unit.row;

		let oilCost = unit.cost.oil;
		let ironCost = unit.cost.iron;
		let osrCost = unit.cost.osr;

		let buildNumberCell = document.createElement("td");
		let buildNumberInput = document.createElement("input");
		buildNumberCell.appendChild(buildNumberInput);
		rowToAppend.appendChild(buildNumberCell);

		let oilCell = document.createElement("td");
		let oilSpan = document.createElement("span");
		oilSpan.textContent = oilCost ? oilCost : "";
		oilCell.appendChild(oilSpan);
		rowToAppend.appendChild(oilCell);

		let ironCell = document.createElement("td");
		let ironSpan = document.createElement("span");
		ironSpan.textContent = ironCost ? ironCost : "";
		ironCell.appendChild(ironSpan);
		rowToAppend.appendChild(ironCell);

		let osrCell = document.createElement("td");
		let osrSpan = document.createElement("span");
		osrSpan.textContent = osrCost ? osrCost : "";
		osrCell.appendChild(osrSpan);
		rowToAppend.appendChild(osrCell);
	}

	let resourceTrackerForm = document.getElementById("resourceTrackerForm");

	resourceTrackerForm.addEventListener("change", function(event) {
		let target = event.target;

		let value = target.value;

		let countryName = target.getAttribute("countryName");
		let resourceType = target.getAttribute("resourceType");
		let trackingType = target.getAttribute("trackingType");

		let country = countries[countryName];

		country.tracker[trackingType][resourceType] = value;

		saveGameState();
	});


	function createLabelTds() {
		clearRows();

		currentResourceRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Current"));
		oilBidRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Oil Bids"));
		stressRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Stress"));
		repairsRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Repairs"));
		raidsRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Raid"));
		tradesRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Trades"));
		buildsRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Builds"));
		goodsRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Goods"));
		infantryRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Infantry"));
		artilleryRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Artillery"));
		tanksRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Tanks"));
		fightersRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Fighters"));
		bombersRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Bombers"));
		submarinesRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Submarines"));
		cruisersRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Cruisers"));
		carriersRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Carriers"));
		battleshipsRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Battleships"));
		totalRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Total"));
	}

	function clearRows() {
		currentResourceRow.innerHTML = "";
		oilBidRow.innerHTML = "";
		stressRow.innerHTML = "";
		repairsRow.innerHTML = "";
		raidsRow.innerHTML = "";
		tradesRow.innerHTML = "";
		buildsRow.innerHTML = "";
		goodsRow.innerHTML = "";
		infantryRow.innerHTML = "";
		artileryRow.innerHTML = "";
		tanksRow.innerHTML = "";
		fightersRow.innerHTML = "";
		bombersRow.innerHTML = "";
		submarinesRow.innerHTML = "";
		cruisersRow.innerHTML = "";
		carriersRow.innerHTML = "";
		battleshipsRow.innerHTML = "";
		totalRow.innerHTML = "";
	}
}