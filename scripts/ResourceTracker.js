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

let remainingRow = document.getElementById("remainingRow");
let productionRow = document.getElementById("productionRow");

let confirmTurnButton = document.getElementById("confirmTurn");
let resourceLog = document.getElementById("resourceLog");

let units = {
	infantry: {
		row: infantryRow
	},
	artillery: {
		row: artilleryRow
	},
	tank: {
		row: tanksRow
	},
	fighter: {
		row: fightersRow
	},
	bomber: {
		row: bombersRow
	},
	submarine: {
		row: submarinesRow
	},
	cruiser: {
		row: cruisersRow
	},
	carrier: {
		row: carriersRow
	},
	battleship: {
		row: battleshipsRow
	}
}

confirmTurnButton.addEventListener("click", function() {
	for (let countryName in countries) {
		let country = countries[countryName];

		country.currentOil = country.remainingOil + country.productionOil;
		country.currentIron = country.remainingIron + country.productionIron;
		country.currentOsr = country.remainingOsr + country.productionOsr;

		country.trackerLog.push(country.tracker);
		country.tracker = new Tracker();
	}

	calcProduction();
	calculateRemainingResources();
	saveGameState();
	displayResourceLog();
});

function calcProduction() {
	createLabelTds();

	for (let i = 0; i < countryOrder.length; i++) {
		let countryName = countryOrder[i];
		let country = countries[countryName];

		if (country.currentOil === null) {
			country.currentOil = country.productionOil;
		}

		let currentOil = country.currentOil;

		if (country.currentIron === null) {
			country.currentIron = country.productionIron;
		}

		let currentIron = country.currentIron;

		if (country.currentOsr === null) {
			country.currentOsr = country.productionOsr;
		}

		let currentOsr = country.currentOsr;

		let currentResourceBlankCell = document.createElement("td");
		currentResourceRow.appendChild(currentResourceBlankCell);

		if (countryName != "china") {
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
		}

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

		allBlankInputs(buildsRow, countryName);

		for (let unitType in units) {
			let unit = units[unitType];

			unitInput(unit, countryName, unitType, country);
		}

		allBlankInputs(remainingRow, countryName);
	}
}

function oilBidding(rowToAppend, countryName, trackingType, country) {
	let oil = country.tracker[trackingType].oil;
	oil = (oil == 0 ? "" : oil);

	let oilBidBlankCell = document.createElement("td");
	rowToAppend.appendChild(oilBidBlankCell);

	if (countryName != "china") {
		let oilBidCell = document.createElement("td");
		let oilBidInput = document.createElement("input");
		oilBidInput.setAttribute("countryName", countryName);
		oilBidInput.setAttribute("resourceType", "oil");
		oilBidInput.setAttribute("trackingType", trackingType);
		oilBidInput.setAttribute("type", "number");
		oilBidInput.setAttribute("min", 0);
		oilBidInput.setAttribute("max", 99);
		oilBidInput.value = oil || "";
		oilBidCell.appendChild(oilBidInput);
		rowToAppend.appendChild(oilBidCell);
	}

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


	if (countryName != "china") {
		let oilCell = document.createElement("td");
		let oilInput = document.createElement("input");
		oilInput.setAttribute("countryName", countryName);
		oilInput.setAttribute("resourceType", "oil");
		oilInput.setAttribute("trackingType", trackingType);
		oilInput.setAttribute("type", "number");
		oilInput.setAttribute("min", 0);
		oilInput.setAttribute("max", 99);
		oilInput.value = oil || "";
		oilCell.appendChild(oilInput);
		rowToAppend.appendChild(oilCell);
	}

	let ironCell = document.createElement("td");
	let ironInput = document.createElement("input");
	ironInput.setAttribute("countryName", countryName);
	ironInput.setAttribute("resourceType", "iron");
	ironInput.setAttribute("trackingType", trackingType);
	ironInput.setAttribute("type", "number");
	ironInput.setAttribute("min", 0);
	ironInput.setAttribute("max", 99);
	ironInput.value = iron || "";
	ironCell.appendChild(ironInput);
	rowToAppend.appendChild(ironCell);

	let osrCell = document.createElement("td");
	let osrInput = document.createElement("input");
	osrInput.setAttribute("countryName", countryName);
	osrInput.setAttribute("resourceType", "osr");
	osrInput.setAttribute("trackingType", trackingType);
	osrInput.setAttribute("type", "number");
	osrInput.setAttribute("min", 0);
	osrInput.setAttribute("max", 99);
	osrInput.value = osr || "";
	osrCell.appendChild(osrInput);
	rowToAppend.appendChild(osrCell);
}

function tradeResourceInput(rowToAppend, countryName, country) {
	let forOil = country.tracker.tradingFor.oil || 0;
	let forIron = country.tracker.tradingFor.iron || 0;
	let forOsr = country.tracker.tradingFor.osr || 0;

	let withOil = country.tracker.tradingWith.oil || 0;
	let withIron = country.tracker.tradingWith.iron || 0;
	let withOsr = country.tracker.tradingWith.osr || 0;

	let indicatorCell = document.createElement("td");
	if (countryName != "china") {
		let minusCell = document.createElement("div");
		minusCell.classList.add("minusDiv");
		minusCell.textContent = "-";
		indicatorCell.appendChild(minusCell);

		let plusCell = document.createElement("div");
		plusCell.classList.add("plusDiv");
		plusCell.textContent = "+";
		indicatorCell.appendChild(plusCell);
	}

	rowToAppend.appendChild(indicatorCell);

	if (countryName != "china") {
		let oilCell = document.createElement("td");

		let oilMinusDiv = document.createElement("div");

		let oilInputMinus = document.createElement("input");
		oilInputMinus.setAttribute("type", "radio");
		oilInputMinus.setAttribute("value", 2);
		oilInputMinus.setAttribute("name", "minus" + countryName);
		oilInputMinus.setAttribute("countryName", countryName);
		oilInputMinus.setAttribute("resourceType", "oil");
		oilInputMinus.setAttribute("trackingType", "tradingWith");
		oilInputMinus.checked = (withOil == 2 ? true : false);

		oilMinusDiv.appendChild(oilInputMinus);

		oilCell.appendChild(oilMinusDiv);

		let oilPlusDiv = document.createElement("div");

		let oilInputPlus = document.createElement("input");
		oilInputPlus.setAttribute("type", "radio");
		oilInputPlus.setAttribute("value", -2);
		oilInputPlus.setAttribute("name", "plus" + countryName);
		oilInputPlus.setAttribute("countryName", countryName);
		oilInputPlus.setAttribute("resourceType", "oil");
		oilInputPlus.setAttribute("trackingType", "tradingFor");
		oilInputPlus.checked = (forOil == -2 ? true : false);
		oilPlusDiv.appendChild(oilInputPlus);

		oilCell.appendChild(oilPlusDiv);

		rowToAppend.appendChild(oilCell);
	}

	let ironCell = document.createElement("td");

	if (countryName != "china") {
		let ironMinusDiv = document.createElement("div");

		let ironInputMinus = document.createElement("input");
		ironInputMinus.setAttribute("type", "radio");
		ironInputMinus.setAttribute("value", 3);
		ironInputMinus.setAttribute("name", "minus" + countryName);
		ironInputMinus.setAttribute("countryName", countryName);
		ironInputMinus.setAttribute("resourceType", "iron");
		ironInputMinus.setAttribute("trackingType", "tradingWith");
		ironInputMinus.checked = (withIron == 3 ? true : false);
		ironMinusDiv.appendChild(ironInputMinus);

		ironCell.appendChild(ironMinusDiv);

		let ironPlusDiv = document.createElement("div");

		let ironInputPlus = document.createElement("input");
		ironInputPlus.setAttribute("type", "radio");
		ironInputPlus.setAttribute("value", -3);
		ironInputPlus.setAttribute("name", "plus" + countryName);
		ironInputPlus.setAttribute("countryName", countryName);
		ironInputPlus.setAttribute("resourceType", "iron");
		ironInputPlus.setAttribute("trackingType", "tradingFor");
		ironInputPlus.checked = (forIron == -3 ? true : false);
		ironPlusDiv.appendChild(ironInputPlus);

		ironCell.appendChild(ironPlusDiv);
	}
	rowToAppend.appendChild(ironCell);

	let osrCell = document.createElement("td");

	if (countryName != "china") {
		let osrMinusDiv = document.createElement("div");

		let osrInputMinus = document.createElement("input");
		osrInputMinus.setAttribute("type", "radio");
		osrInputMinus.setAttribute("value", 5);
		osrInputMinus.setAttribute("name", "minus" + countryName);
		osrInputMinus.setAttribute("countryName", countryName);
		osrInputMinus.setAttribute("resourceType", "osr");
		osrInputMinus.setAttribute("trackingType", "tradingWith");
		osrInputMinus.checked = (withOsr == 5 ? true : false);
		osrMinusDiv.appendChild(osrInputMinus);

		osrCell.appendChild(osrMinusDiv);

		let osrPlusDiv = document.createElement("div");

		let osrInputPlus = document.createElement("input");
		osrInputPlus.setAttribute("type", "radio");
		osrInputPlus.setAttribute("value", -5);
		osrInputPlus.setAttribute("name", "plus" + countryName);
		osrInputPlus.setAttribute("countryName", countryName);
		osrInputPlus.setAttribute("resourceType", "osr");
		osrInputPlus.setAttribute("trackingType", "tradingFor");
		osrInputPlus.checked = (forOsr == -5 ? true : false);
		osrPlusDiv.appendChild(osrInputPlus);

		osrCell.appendChild(osrPlusDiv);
	}

	rowToAppend.appendChild(osrCell);
}

function allBlankInputs(rowToAppend, countryName) {
	let blankCell = document.createElement("td");
	rowToAppend.appendChild(blankCell);

	if (countryName != "china") {
		let oilCell = document.createElement("td");
		let oilSpan = document.createElement("span");
		oilCell.appendChild(oilSpan);
		rowToAppend.appendChild(oilCell);
	}

	let ironCell = document.createElement("td");
	let ironSpan = document.createElement("span");
	ironCell.appendChild(ironSpan);
	rowToAppend.appendChild(ironCell);

	let osrCell = document.createElement("td");
	let osrSpan = document.createElement("span");
	osrCell.appendChild(osrSpan);
	rowToAppend.appendChild(osrCell);
}

function unitInput(unit, countryName, unitType, country) {
	let rowToAppend = unit.row;

	let oilCost = country.tracker[unitType].oil;
	let ironCost = country.tracker[unitType].iron;
	let osrCost = country.tracker[unitType].osr;

	let qty = country.tracker[unitType].qty;

	let buildNumberCell = document.createElement("td");

	if (countryName != "china" || oilCost == 0) {
		let buildNumberInput = document.createElement("input");
		buildNumberInput.setAttribute("trackingType", unitType);
		buildNumberInput.setAttribute("countryName", countryName);
		buildNumberInput.setAttribute("resourceType", "qty");
		buildNumberInput.setAttribute("type", "number");
		buildNumberInput.setAttribute("min", 0);
		buildNumberInput.setAttribute("max", 99);
		buildNumberInput.value = (qty ? qty : "");
		buildNumberCell.appendChild(buildNumberInput);
	}
	rowToAppend.appendChild(buildNumberCell);

	if (countryName != "china") {
		let oilCell = document.createElement("td");
		let oilSpan = document.createElement("span");
		oilSpan.textContent = oilCost ? oilCost : "";
		oilCell.appendChild(oilSpan);
		rowToAppend.appendChild(oilCell);
	}

	let ironCell = document.createElement("td");

	if (countryName != "china" || oilCost == 0) {
		let ironSpan = document.createElement("span");
		ironSpan.textContent = ironCost ? ironCost : "";
		ironCell.appendChild(ironSpan);
	}
	rowToAppend.appendChild(ironCell);

	let osrCell = document.createElement("td");

	if (countryName != "china" || oilCost == 0) {
		let osrSpan = document.createElement("span");
		osrSpan.textContent = osrCost ? osrCost : "";
		osrCell.appendChild(osrSpan);
	}
	rowToAppend.appendChild(osrCell);
}

let resourceTrackerForm = document.getElementById("resourceTrackerForm");

resourceTrackerForm.addEventListener("change", function(event) {
	let target = event.target;

	let value = target.value;

	let countryName = target.getAttribute("countryName");
	let resourceType = target.getAttribute("resourceType");
	let trackingType = target.getAttribute("trackingType");

	if (trackingType == "tradingFor" || trackingType == "tradingWith") {
		countries[countryName].tracker[trackingType] = new Production();
	}

	countries[countryName].tracker[trackingType][resourceType] = value;

	saveGameState();
	calculateRemainingResources();
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
	goodsRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Goods 5*"));
	infantryRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Infantry"));
	artilleryRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Artillery"));
	tanksRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Tanks"));
	fightersRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Fighters"));
	bombersRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Bombers"));
	submarinesRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Submarines"));
	cruisersRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Cruisers"));
	carriersRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Carriers"));
	battleshipsRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Battleships"));
	remainingRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Remaining"));
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
	artilleryRow.innerHTML = "";
	tanksRow.innerHTML = "";
	fightersRow.innerHTML = "";
	bombersRow.innerHTML = "";
	submarinesRow.innerHTML = "";
	cruisersRow.innerHTML = "";
	carriersRow.innerHTML = "";
	battleshipsRow.innerHTML = "";
	remainingRow.innerHTML = "";
}

function calculateRemainingResources() {
	remainingRow.innerHTML = "";
	remainingRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Remaining"));

	for (let countryName in countries) {
		let country = countries[countryName];

		let oilRemaining = country.currentOil;
		let ironRemaining = country.currentIron;
		let osrRemaining = country.currentOsr;

		for (let trackerName in country.tracker) {
			tracker = country.tracker[trackerName];

			let qty = 1;

			if (tracker.qty !== null && tracker.qty !== undefined) {
				qty = tracker.qty;
			}

			let trackerOil = qty * (tracker.oil ? tracker.oil : 0);
			let trackerIron = qty * (tracker.iron ? tracker.iron : 0);
			let trackerOsr = qty * (tracker.osr ? tracker.osr : 0);

			oilRemaining -= trackerOil;
			ironRemaining -= trackerIron;
			osrRemaining -= trackerOsr;
		}

		let blankCell = document.createElement("td");
		remainingRow.appendChild(blankCell);

		if (countryName != "china") {
			let oilCell = document.createElement("td");
			let oilSpan = document.createElement("span");
			oilSpan.textContent = oilRemaining;
			oilCell.appendChild(oilSpan);
			remainingRow.appendChild(oilCell);
		}

		let ironCell = document.createElement("td");
		let ironSpan = document.createElement("span");
		ironSpan.textContent = ironRemaining;
		ironCell.appendChild(ironSpan);
		remainingRow.appendChild(ironCell);

		let osrCell = document.createElement("td");
		let osrSpan = document.createElement("span");
		osrSpan.textContent = osrRemaining;
		osrCell.appendChild(osrSpan);
		remainingRow.appendChild(osrCell);

		country.remainingOil = oilRemaining;
		country.remainingIron = ironRemaining;
		country.remainingOsr = osrRemaining;
	}
}

function displayCurrentProduction() {
	productionRow.innerHTML = "";
	productionRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Production"));

	for (let countryName in countries) {
		let country = countries[countryName];

		let oilRemaining = country.productionOil;
		let ironRemaining = country.productionIron;
		let osrRemaining = country.productionOsr;

		let blankCell = document.createElement("td");
		productionRow.appendChild(blankCell);

		if (countryName != "china") {
			let oilCell = document.createElement("td");
			let oilSpan = document.createElement("span");
			oilSpan.textContent = oilRemaining;
			oilCell.appendChild(oilSpan);
			productionRow.appendChild(oilCell);
		}

		let ironCell = document.createElement("td");
		let ironSpan = document.createElement("span");
		ironSpan.textContent = ironRemaining;
		ironCell.appendChild(ironSpan);
		productionRow.appendChild(ironCell);

		let osrCell = document.createElement("td");
		let osrSpan = document.createElement("span");
		osrSpan.textContent = osrRemaining;
		osrCell.appendChild(osrSpan);
		productionRow.appendChild(osrCell);
	}
}

function displayResourceLog() {
	resourceLog.innerHTML = "";

	let logLength = countries.usa.trackerLog.length

	for (let i = (logLength - 1); i >= 0; i--) {
		let row = document.createElement("tr");

		let header = document.createElement("th");

		let turnSpan = document.createElement("span");
		turnSpan.textContent = "Turn " + (i + 1);
		header.appendChild(turnSpan);
		row.appendChild(header);
		resourceLog.appendChild(row);
	}
}