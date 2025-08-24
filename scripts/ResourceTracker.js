let currentResourceRow = document.getElementById("currentResourceRow");
let oilBidRow = document.getElementById("oilBidRow");
let stressRow = document.getElementById("stressRow");
let repairsRow = document.getElementById("repairsRow");
let raidsRow = document.getElementById("raidsRow");
let tradesRow = document.getElementById("tradesRow");
let otherResourceRow = document.getElementById("otherResourceRow");
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
let prodRow = document.getElementById("productionRow");
let confirmTurnButton = document.getElementById("confirmTurn");
let resourceLog = document.getElementById("resourceLog");
let resourceTable = document.getElementById("resourceTable");
let resourceTrackerForm = document.getElementById("resourceTrackerForm");

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
};

resourceTrackerForm.addEventListener("change", function(event) {
	let target = event.target;

	if (target.name == "showOwners") {
		hideTableColumns(target);
	}
	else if (target.name == "economicCollapse") {
		setEconomicCollapse(target);
	}
	else {
		trackerFormChange(target);
	}

	saveGameState();
});

confirmTurnButton.addEventListener("click", function() {
	if (confirm("Confirm resources and advance to the next turn?")) {
		for (let countryName in countries) {
			let country = countries[countryName];

			country.tracker.startedWith = new Production({ oil: country.currentOil, iron: country.currentIron, osr: country.currentOsr });
			country.tracker.remaining = new Production({ oil: country.remainingOil, iron: country.remainingIron, osr: country.remainingOsr });
			country.tracker.producing = new Production({ oil: country.productionOil, iron: country.productionIron, osr: country.productionOsr });
			country.tracker.economicCollapse = country.economicCollapse;

			country.currentOil = country.remainingOil + (country.economicCollapse ? 0 : country.productionOil);
			country.currentIron = country.remainingIron + (country.economicCollapse ? 0 : country.productionIron);
			country.currentOsr = country.remainingOsr + (country.economicCollapse ? 0 : country.productionOsr);

			country.tracker.endedWith = new Production({ oil: country.currentOil, iron: country.currentIron, osr: country.currentOsr });

			country.trackerLog.push(country.tracker);
			country.tracker = new Tracker();
		}

		calcProduction();
		calculateRemainingResources();
		saveGameState();
		displayResourceLog();
	}
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
		currentResourceBlankCell.classList.add(countryName + "Show");
		currentResourceRow.appendChild(currentResourceBlankCell);

		if (countryName != "china") {
			let oilTd = document.createElement("td");
			oilTd.classList.add(countryName + "Show");

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
		ironTd.classList.add(countryName + "Show");
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
		osrTd.classList.add(countryName + "Show");

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
		tripleResourceInput(otherResourceRow, countryName, "other", country);

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
	oilBidBlankCell.classList.add(countryName + "Show");
	rowToAppend.appendChild(oilBidBlankCell);

	if (countryName != "china") {
		let oilBidCell = document.createElement("td");
		oilBidCell.classList.add(countryName + "Show");
		let oilBidInput = document.createElement("input");
		oilBidInput.setAttribute("name", "resource");
		oilBidInput.setAttribute("countryName", countryName);
		oilBidInput.setAttribute("resourceType", "oil");
		oilBidInput.setAttribute("trackingType", trackingType);
		oilBidInput.setAttribute("type", "text");
		oilBidInput.setAttribute("inputmode", "numeric");
		oilBidInput.value = oil || "";
		inputChangeControls(oilBidCell, oilBidInput, trackerFormChange);
		rowToAppend.appendChild(oilBidCell);
	}

	let blankIronCell = document.createElement("td");
	blankIronCell.classList.add(countryName + "Show");
	rowToAppend.appendChild(blankIronCell);

	let blankOsrCell = document.createElement("td");
	blankOsrCell.classList.add(countryName + "Show");
	rowToAppend.appendChild(blankOsrCell);
}

function tripleResourceInput(rowToAppend, countryName, trackingType, country) {
	let blankCell = document.createElement("td");
	blankCell.classList.add(countryName + "Show");
	rowToAppend.appendChild(blankCell);

	let oil = country.tracker[trackingType].oil;
	let iron = country.tracker[trackingType].iron;
	let osr = country.tracker[trackingType].osr;

	oil = (oil == 0 ? "" : oil);
	iron = (iron == 0 ? "" : iron);
	osr = (osr == 0 ? "" : osr);

	if (countryName != "china") {
		let oilCell = document.createElement("td");
		oilCell.classList.add(countryName + "Show");
		let oilInput = document.createElement("input");
		oilInput.setAttribute("name", "resource");
		oilInput.setAttribute("countryName", countryName);
		oilInput.setAttribute("resourceType", "oil");
		oilInput.setAttribute("trackingType", trackingType);
		oilInput.setAttribute("type", "text");
		oilInput.setAttribute("inputmode", "numeric");
		oilInput.value = oil || "";

		inputChangeControls(oilCell, oilInput, trackerFormChange);
		rowToAppend.appendChild(oilCell);
	}

	let ironCell = document.createElement("td");
	ironCell.classList.add(countryName + "Show");
	let ironInput = document.createElement("input");
	ironInput.setAttribute("name", "resource");
	ironInput.setAttribute("countryName", countryName);
	ironInput.setAttribute("resourceType", "iron");
	ironInput.setAttribute("trackingType", trackingType);
	ironInput.setAttribute("type", "text");
	ironInput.setAttribute("inputmode", "numeric");
	ironInput.value = iron || "";
	inputChangeControls(ironCell, ironInput, trackerFormChange);
	rowToAppend.appendChild(ironCell);

	let osrCell = document.createElement("td");
	osrCell.classList.add(countryName + "Show");
	let osrInput = document.createElement("input");
	osrInput.setAttribute("name", "resource");
	osrInput.setAttribute("countryName", countryName);
	osrInput.setAttribute("resourceType", "osr");
	osrInput.setAttribute("trackingType", trackingType);
	osrInput.setAttribute("type", "text");
	osrInput.setAttribute("inputmode", "numeric");
	osrInput.value = osr || "";
	inputChangeControls(osrCell, osrInput, trackerFormChange);
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
	indicatorCell.classList.add(countryName + "Show");
	if (countryName != "china") {
		let minusCell = document.createElement("div");
		minusCell.classList.add("minusDiv");
		minusCell.classList.add("bigger");
		minusCell.classList.add("bold");
		minusCell.textContent = "-";
		indicatorCell.appendChild(minusCell);

		let plusCell = document.createElement("div");
		plusCell.classList.add("plusDiv");
		plusCell.classList.add("bigger");
		plusCell.classList.add("bold");
		plusCell.textContent = "+";
		indicatorCell.appendChild(plusCell);
	}

	rowToAppend.appendChild(indicatorCell);

	if (countryName != "china") {
		let oilCell = document.createElement("td");
		oilCell.classList.add(countryName + "Show");
		oilCell.classList.add("backgroundTwo");

		let oilMinusDiv = document.createElement("div");
		let oilInputMinusLabel = document.createElement("label");

		let oilInputMinus = document.createElement("input");
		oilInputMinus.setAttribute("type", "radio");
		oilInputMinus.setAttribute("value", 2);
		oilInputMinus.setAttribute("id", countryName + "oil" + "tradingWith");
		oilInputMinus.setAttribute("name", "minus" + countryName);
		oilInputMinus.setAttribute("countryName", countryName);
		oilInputMinus.setAttribute("resourceType", "oil");
		oilInputMinus.setAttribute("trackingType", "tradingWith");
		oilInputMinus.checked = (withOil == 2 ? true : false);

		oilInputMinusLabel.appendChild(oilInputMinus);
		let oilInputMinusSpan = document.createElement("span");
		oilInputMinusLabel.appendChild(oilInputMinusSpan);
		oilMinusDiv.appendChild(oilInputMinusLabel);
		oilCell.appendChild(oilMinusDiv);

		let oilPlusDiv = document.createElement("div");
		let oilInputPlusLabel = document.createElement("label");
		oilInputPlusLabel.classList.add("labelPlus");

		let oilInputPlus = document.createElement("input");
		oilInputPlus.setAttribute("type", "radio");
		oilInputPlus.setAttribute("value", -2);
		oilInputPlus.setAttribute("id", countryName + "oil" + "tradingFor");
		oilInputPlus.setAttribute("name", "plus" + countryName);
		oilInputPlus.setAttribute("countryName", countryName);
		oilInputPlus.setAttribute("resourceType", "oil");
		oilInputPlus.setAttribute("trackingType", "tradingFor");
		oilInputPlus.checked = (forOil == -2 ? true : false);
		oilInputPlusLabel.appendChild(oilInputPlus);

		let ironInputMinusSpan = document.createElement("span");
		oilInputPlusLabel.appendChild(ironInputMinusSpan);
		oilPlusDiv.appendChild(oilInputPlusLabel);
		oilCell.appendChild(oilPlusDiv);
		rowToAppend.appendChild(oilCell);
	}

	let ironCell = document.createElement("td");
	ironCell.classList.add(countryName + "Show");

	if (countryName != "china") {
		ironCell.classList.add("backgroundThree");
		let ironMinusDiv = document.createElement("div");
		let ironInputMinusLabel = document.createElement("label");

		let ironInputMinus = document.createElement("input");
		ironInputMinus.setAttribute("type", "radio");
		ironInputMinus.setAttribute("value", 3);
		ironInputMinus.setAttribute("id", countryName + "iron" + "tradingWith");
		ironInputMinus.setAttribute("name", "minus" + countryName);
		ironInputMinus.setAttribute("countryName", countryName);
		ironInputMinus.setAttribute("resourceType", "iron");
		ironInputMinus.setAttribute("trackingType", "tradingWith");
		ironInputMinus.checked = (withIron == 3 ? true : false);
		ironInputMinusLabel.appendChild(ironInputMinus);

		let ironInputMinusSpan = document.createElement("span");
		ironInputMinusLabel.appendChild(ironInputMinusSpan);
		ironMinusDiv.appendChild(ironInputMinusLabel);
		ironCell.appendChild(ironMinusDiv);

		let ironPlusDiv = document.createElement("div");
		let ironInputPlusLabel = document.createElement("label");
		ironInputPlusLabel.classList.add("labelPlus");

		let ironInputPlus = document.createElement("input");
		ironInputPlus.setAttribute("type", "radio");
		ironInputPlus.setAttribute("value", -3);
		ironInputPlus.setAttribute("id", countryName + "iron" + "tradingFor");
		ironInputPlus.setAttribute("name", "plus" + countryName);
		ironInputPlus.setAttribute("countryName", countryName);
		ironInputPlus.setAttribute("resourceType", "iron");
		ironInputPlus.setAttribute("trackingType", "tradingFor");
		ironInputPlus.checked = (forIron == -3 ? true : false);
		ironInputPlusLabel.appendChild(ironInputPlus);

		let ironInputPlusSpan = document.createElement("span");
		ironInputPlusLabel.appendChild(ironInputPlusSpan);
		ironPlusDiv.appendChild(ironInputPlusLabel);
		ironCell.appendChild(ironPlusDiv);
	}
	rowToAppend.appendChild(ironCell);

	let osrCell = document.createElement("td");
	osrCell.classList.add(countryName + "Show");

	if (countryName != "china") {
		osrCell.classList.add("backgroundFive");
		let osrMinusDiv = document.createElement("div");
		let osrInputMinusLabel = document.createElement("label");

		let osrInputMinus = document.createElement("input");
		osrInputMinus.setAttribute("type", "radio");
		osrInputMinus.setAttribute("value", 5);
		osrInputMinus.setAttribute("id", countryName + "osr" + "tradingWith");
		osrInputMinus.setAttribute("name", "minus" + countryName);
		osrInputMinus.setAttribute("countryName", countryName);
		osrInputMinus.setAttribute("resourceType", "osr");
		osrInputMinus.setAttribute("trackingType", "tradingWith");
		osrInputMinus.checked = (withOsr == 5 ? true : false);
		osrInputMinusLabel.appendChild(osrInputMinus);

		let osrInputMinusSpan = document.createElement("span");
		osrInputMinusLabel.appendChild(osrInputMinusSpan);

		osrMinusDiv.appendChild(osrInputMinusLabel);

		osrCell.appendChild(osrMinusDiv);

		let osrPlusDiv = document.createElement("div");
		let osrInputPlusLabel = document.createElement("label");
		osrInputPlusLabel.classList.add("labelPlus");

		let osrInputPlus = document.createElement("input");
		osrInputPlus.setAttribute("type", "radio");
		osrInputPlus.setAttribute("value", -5);
		osrInputPlus.setAttribute("id", countryName + "osr" + "tradingFor");
		osrInputPlus.setAttribute("name", "plus" + countryName);
		osrInputPlus.setAttribute("countryName", countryName);
		osrInputPlus.setAttribute("resourceType", "osr");
		osrInputPlus.setAttribute("trackingType", "tradingFor");
		osrInputPlus.checked = (forOsr == -5 ? true : false);
		osrInputPlusLabel.appendChild(osrInputPlus);

		let osrInputPlusSpan = document.createElement("span");
		osrInputPlusLabel.appendChild(osrInputPlusSpan);

		osrPlusDiv.appendChild(osrInputPlusLabel);

		osrCell.appendChild(osrPlusDiv);
	}

	rowToAppend.appendChild(osrCell);
}

function allBlankInputs(rowToAppend, countryName) {
	let blankCell = document.createElement("td");
	blankCell.classList.add(countryName + "Show");
	rowToAppend.appendChild(blankCell);

	if (countryName != "china") {
		let oilCell = document.createElement("td");
		oilCell.classList.add(countryName + "Show");
		let oilSpan = document.createElement("span");
		oilCell.appendChild(oilSpan);
		rowToAppend.appendChild(oilCell);
	}

	let ironCell = document.createElement("td");
	ironCell.classList.add(countryName + "Show");
	let ironSpan = document.createElement("span");
	ironCell.appendChild(ironSpan);
	rowToAppend.appendChild(ironCell);

	let osrCell = document.createElement("td");
	osrCell.classList.add(countryName + "Show");
	let osrSpan = document.createElement("span");
	osrCell.appendChild(osrSpan);
	rowToAppend.appendChild(osrCell);
}

function unitInput(unit, countryName, unitType, country) {
	let rowToAppend = unit.row;

	let oilCost = country.tracker.unitList[unitType].productionCost.oil;
	let ironCost = country.tracker.unitList[unitType].productionCost.iron;
	let osrCost = country.tracker.unitList[unitType].productionCost.osr;

	let qty = country.tracker.unitList[unitType].qty;

	let buildNumberCell = document.createElement("td");
	buildNumberCell.classList.add(countryName + "Show");

	if (countryName != "china" || oilCost == 0) {
		let buildNumberInput = document.createElement("input");
		buildNumberInput.setAttribute("name", "resource");
		buildNumberInput.setAttribute("trackingType", unitType);
		buildNumberInput.setAttribute("countryName", countryName);
		buildNumberInput.setAttribute("resourceType", "qty");
		buildNumberInput.setAttribute("type", "text");
		buildNumberInput.setAttribute("inputmode", "numeric");
		buildNumberInput.setAttribute("min", 0);
		buildNumberInput.setAttribute("max", 99);
		buildNumberInput.value = (qty ? qty : "");
		inputChangeControls(buildNumberCell, buildNumberInput, trackerFormChange);
	}
	rowToAppend.appendChild(buildNumberCell);

	if (countryName != "china") {
		let oilCell = document.createElement("td");
		oilCell.classList.add(countryName + "Show");
		let oilSpan = document.createElement("span");
		oilSpan.textContent = oilCost ? oilCost : "";
		oilCell.appendChild(oilSpan);
		rowToAppend.appendChild(oilCell);
	}

	let ironCell = document.createElement("td");
	ironCell.classList.add(countryName + "Show");

	if (countryName != "china" || oilCost == 0) {
		let ironSpan = document.createElement("span");
		ironSpan.textContent = ironCost ? ironCost : "";
		ironCell.appendChild(ironSpan);
	}
	rowToAppend.appendChild(ironCell);

	let osrCell = document.createElement("td");
	osrCell.classList.add(countryName + "Show");

	if (countryName != "china" || oilCost == 0) {
		let osrSpan = document.createElement("span");
		osrSpan.textContent = osrCost ? osrCost : "";
		osrCell.appendChild(osrSpan);
	}
	rowToAppend.appendChild(osrCell);
}

function setEconomicCollapse(target) {
	let countryName = target.getAttribute("countryName");

	let value = target.checked;
	countries[countryName].economicCollapse = value;

	displayCurrentProduction();
}

function hideTableColumns(target) {
	let value = target.value;

	resourceTable.classList = [];
	resourceTable.classList.add("marginCenter");

	if (value != "allShow") {
		resourceTable.classList.add("collapse");
		resourceTable.classList.add(value);
	}

	localStorage.setItem("individualCol", value);
}

function trackerFormChange(target) {
	target = validateInput(target);

	let value = target.value;

	let countryName = target.getAttribute("countryName");
	let resourceType = target.getAttribute("resourceType");
	let trackingType = target.getAttribute("trackingType");

	if (trackingType == "tradingFor" || trackingType == "tradingWith") {
		let valueTradingWith = countries[countryName].tracker.tradingWith[resourceType];
		let valueTradingFor = countries[countryName].tracker.tradingFor[resourceType];

		let partnerValue = (trackingType == "tradingFor" ? valueTradingWith : valueTradingFor);
		let isEqualValues = parseInt(value) + parseInt(partnerValue);

		if (!isEqualValues) {
			document.getElementById(countryName + resourceType + "tradingFor").checked = false;
			document.getElementById(countryName + resourceType + "tradingWith").checked = false;
			countries[countryName].tracker.tradingWith = new Production();
			countries[countryName].tracker.tradingFor = new Production();
		}
		else {
			countries[countryName].tracker[trackingType] = new Production();
			countries[countryName].tracker[trackingType][resourceType] = value;
		}
	}
	else if (resourceType == "qty") {
		countries[countryName].tracker.unitList[trackingType][resourceType] = value;
	}
	else {
		countries[countryName].tracker[trackingType][resourceType] = value;
	}

	saveGameState();
	calculateRemainingResources();
}

function validateInput(target) {
	let value = target.value;
	let trackingType = target.getAttribute("trackingType");

	isNum = isNumeric(value);

	if (!isNum) {
		target.value = "";
	}
	else if (value == 0) {
		target.value = "";
	}
	else if (value < 0 && trackingType != "other" && trackingType != "tradingFor") {
		target.value = "";
	}
	else if (value > 99) {
		target.value = 99;
	}
	else if (value <= -10) {
		target.value = -9;
	}

	return target;
}

function isNumeric(str) {
	let isNum = true;

	if (typeof str != "string") {// we only process strings!
		isNum = false;
	}
	else if (isNaN(str) && isNaN(parseFloat(str))) {
		isNum = false;
	}

	return isNum;
}

function createLabelTds() {
	clearRows();

	let currentResourceTd = document.createElement("td");
	currentResourceTd.classList.add("allShow");
	currentResourceTd.appendChild(document.createTextNode("Current"));

	let oilBidTd = document.createElement("td");
	oilBidTd.classList.add("allShow");
	oilBidTd.appendChild(document.createTextNode("Oil Bids"));

	let stressTd = document.createElement("td");
	stressTd.classList.add("allShow");
	stressTd.appendChild(document.createTextNode("Civil Unrest"));

	let repairsTd = document.createElement("td");
	repairsTd.classList.add("allShow");
	repairsTd.appendChild(document.createTextNode("Repairs"));

	let raidsTd = document.createElement("td");
	raidsTd.classList.add("allShow");
	raidsTd.appendChild(document.createTextNode("Raids"));

	let tradesTd = document.createElement("td");
	tradesTd.classList.add("allShow");
	tradesTd.appendChild(document.createTextNode("Trades"));

	let otherResourceTd = document.createElement("td");
	otherResourceTd.classList.add("allShow");
	otherResourceTd.appendChild(document.createTextNode("Other"));

	let buildsTd = document.createElement("td");
	buildsTd.classList.add("allShow");
	buildsTd.appendChild(document.createTextNode("Builds"));

	let goodsTd = document.createElement("td");
	goodsTd.classList.add("allShow");
	goodsTd.appendChild(document.createTextNode("Goods 5*"));

	let infantryTd = document.createElement("td");
	infantryTd.classList.add("allShow");
	infantryTd.appendChild(document.createTextNode("Infantry"));

	let artilleryTd = document.createElement("td");
	artilleryTd.classList.add("allShow");
	artilleryTd.appendChild(document.createTextNode("Artillery"));

	let tanksTd = document.createElement("td");
	tanksTd.classList.add("allShow");
	tanksTd.appendChild(document.createTextNode("Tanks"));

	let fightersTd = document.createElement("td");
	fightersTd.classList.add("allShow");
	fightersTd.appendChild(document.createTextNode("Fighters"));

	let bombersTd = document.createElement("td");
	bombersTd.classList.add("allShow");
	bombersTd.appendChild(document.createTextNode("Bombers"));

	let submarinesTd = document.createElement("td");
	submarinesTd.classList.add("allShow");
	submarinesTd.appendChild(document.createTextNode("Submarines"));

	let cruisersTd = document.createElement("td");
	cruisersTd.classList.add("allShow");
	cruisersTd.appendChild(document.createTextNode("Cruisers"));

	let carriersTd = document.createElement("td");
	carriersTd.classList.add("allShow");
	carriersTd.appendChild(document.createTextNode("Carriers"));

	let battleshipsTd = document.createElement("td");
	battleshipsTd.classList.add("allShow");
	battleshipsTd.appendChild(document.createTextNode("Battleships"));

	let remainingTd = document.createElement("td");
	remainingTd.classList.add("allShow");
	remainingTd.appendChild(document.createTextNode("Remaining"));

	currentResourceRow.appendChild(currentResourceTd);
	oilBidRow.appendChild(oilBidTd);
	stressRow.appendChild(stressTd);
	repairsRow.appendChild(repairsTd);
	raidsRow.appendChild(raidsTd);
	tradesRow.appendChild(tradesTd);
	otherResourceRow.appendChild(otherResourceTd);
	buildsRow.appendChild(buildsTd);
	goodsRow.appendChild(goodsTd);
	infantryRow.appendChild(infantryTd);
	artilleryRow.appendChild(artilleryTd);
	tanksRow.appendChild(tanksTd);
	fightersRow.appendChild(fightersTd);
	bombersRow.appendChild(bombersTd);
	submarinesRow.appendChild(submarinesTd);
	cruisersRow.appendChild(cruisersTd);
	carriersRow.appendChild(carriersTd);
	battleshipsRow.appendChild(battleshipsTd);
	remainingRow.appendChild(remainingTd);
}

function clearRows() {
	currentResourceRow.innerHTML = "";
	oilBidRow.innerHTML = "";
	stressRow.innerHTML = "";
	repairsRow.innerHTML = "";
	raidsRow.innerHTML = "";
	tradesRow.innerHTML = "";
	otherResourceRow.innerHTML = "";
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

	let remainingTd = document.createElement("td");
	remainingTd.classList.add("allShow");
	remainingTd.appendChild(document.createTextNode("Remaining"));

	remainingRow.appendChild(remainingTd);

	for (let countryName in countries) {
		let country = countries[countryName];

		let oilRemaining = country.currentOil;
		let ironRemaining = country.currentIron;
		let osrRemaining = country.currentOsr;

		for (let trackerName in country.tracker) {
			let tracker = country.tracker[trackerName];

			let trackerOil = 0;
			let trackerIron = 0;
			let trackerOsr = 0;

			if (trackerName == "unitList") {
				for (let unitTypeName in tracker) {
					let unitType = tracker[unitTypeName];

					let qty = unitType.qty;

					trackerOil = qty * unitType.productionCost.oil;
					trackerIron = qty * unitType.productionCost.iron;
					trackerOsr = qty * unitType.productionCost.osr;

					oilRemaining -= trackerOil;
					ironRemaining -= trackerIron;
					osrRemaining -= trackerOsr;
				}
			}

			else {
				trackerOil = (tracker.oil ? tracker.oil : 0);
				trackerIron = (tracker.iron ? tracker.iron : 0);
				trackerOsr = (tracker.osr ? tracker.osr : 0);

				oilRemaining -= trackerOil;
				ironRemaining -= trackerIron;
				osrRemaining -= trackerOsr;
			}
		}

		let blankCell = document.createElement("td");
		blankCell.classList.add(countryName + "Show");
		remainingRow.appendChild(blankCell);

		if (countryName != "china") {
			let oilCell = document.createElement("td");
			oilCell.classList.add(countryName + "Show");
			let oilSpan = document.createElement("span");

			if (oilRemaining && oilRemaining < 0) {
				oilSpan.classList.add("negative");
			}

			oilSpan.textContent = oilRemaining;
			oilCell.appendChild(oilSpan);
			remainingRow.appendChild(oilCell);
		}

		let ironCell = document.createElement("td");
		ironCell.classList.add(countryName + "Show");
		let ironSpan = document.createElement("span");

		if (ironRemaining && ironRemaining < 0) {
			ironSpan.classList.add("negative");
		}

		ironSpan.textContent = ironRemaining;
		ironCell.appendChild(ironSpan);
		remainingRow.appendChild(ironCell);

		let osrCell = document.createElement("td");
		osrCell.classList.add(countryName + "Show");
		let osrSpan = document.createElement("span");

		if (osrRemaining && osrRemaining < 0) {
			osrSpan.classList.add("negative");
		}

		osrSpan.textContent = osrRemaining;
		osrCell.appendChild(osrSpan);
		remainingRow.appendChild(osrCell);

		country.remainingOil = oilRemaining;
		country.remainingIron = ironRemaining;
		country.remainingOsr = osrRemaining;
	}
}

function inputChangeControls(parentEl, inputEl, callbackFunction) {
	let containControlDiv = document.createElement("div");
	containControlDiv.classList.add("relative");
	containControlDiv.classList.add("inputControlDiv");

	let containerPlus = document.createElement("div");
	containerPlus.classList.add("inputControl");
	containerPlus.classList.add("plusControl");
	let plusControlImg = document.createElement("img");
	plusControlImg.setAttribute("src", "icons/arrow-right.svg");
	containerPlus.appendChild(plusControlImg);
	containControlDiv.appendChild(containerPlus);

	containControlDiv.appendChild(inputEl);

	let containerMinus = document.createElement("div");
	containerMinus.classList.add("inputControl");
	containerMinus.classList.add("minusControl");
	let minusControlImg = document.createElement("img");
	minusControlImg.setAttribute("src", "icons/arrow-left.svg");
	containerMinus.appendChild(minusControlImg);
	containControlDiv.appendChild(containerMinus);

	parentEl.appendChild(containControlDiv);

	containerMinus.addEventListener("click", function() {
		let value = inputEl.value;

		if (!value) {
			value = 0;
		}

		inputEl.value = --value;

		callbackFunction(inputEl);
	});

	containerPlus.addEventListener("click", function() {
		let value = inputEl.value;

		if (!value) {
			value = 0;
		}

		inputEl.value = ++value;

		callbackFunction(inputEl);
	});
}


function displayCurrentProduction() {
	prodRow.innerHTML = "";

	let productionTd = document.createElement("td");
	productionTd.classList.add("allShow");
	productionTd.appendChild(document.createTextNode("Production"));

	prodRow.appendChild(productionTd);

	for (let countryName in countries) {
		let country = countries[countryName];

		let oilRemaining = country.productionOil;
		let ironRemaining = country.productionIron;
		let osrRemaining = country.productionOsr;

		let econCollapseCell = document.createElement("td");
		econCollapseCell.classList.add(countryName + "Show");

		let econCollapseLabel = document.createElement("label");
		econCollapseLabel.classList.add("econCollapsseLabel");

		let econCollapseDiv = document.createElement("div");
		econCollapseDiv.classList.add("bigger");
		econCollapseDiv.innerText = FIRE;
		econCollapseLabel.appendChild(econCollapseDiv);

		let econCollapseCheckbox = document.createElement("input");
		econCollapseCheckbox.classList.add("noMargin");
		econCollapseCheckbox.setAttribute("type", "checkbox");
		econCollapseCheckbox.setAttribute("name", "economicCollapse");
		econCollapseCheckbox.setAttribute("countryName", countryName);

		if (country.economicCollapse) {
			econCollapseCheckbox.checked = true;
			econCollapseCell.classList.add("collapseGradient");
		}

		econCollapseLabel.appendChild(econCollapseCheckbox);

		econCollapseCell.appendChild(econCollapseLabel);

		prodRow.appendChild(econCollapseCell);

		if (countryName != "china") {
			let oilCell = document.createElement("td");
			oilCell.classList.add(countryName + "Show");
			if (!country.economicCollapse) {
				let oilSpan = document.createElement("span");
				oilSpan.textContent = oilRemaining;
				oilCell.appendChild(oilSpan);
			}
			else {
				oilCell.classList.add("collapseGradient");
			}
			prodRow.appendChild(oilCell);
		}

		let ironCell = document.createElement("td");
		ironCell.classList.add(countryName + "Show");

		if (!country.economicCollapse) {
			let ironSpan = document.createElement("span");
			ironSpan.textContent = ironRemaining;
			ironCell.appendChild(ironSpan);
		}
		else {
			ironCell.classList.add("collapseGradient");
		}
		prodRow.appendChild(ironCell);

		let osrCell = document.createElement("td");
		osrCell.classList.add(countryName + "Show");

		if (!country.economicCollapse) {
			let osrSpan = document.createElement("span");
			osrSpan.textContent = osrRemaining;
			osrCell.appendChild(osrSpan);
		}
		else {
			osrCell.classList.add("collapseGradient");
		}
		prodRow.appendChild(osrCell);
	}
}

function displayResourceLog() {
	resourceLog.innerHTML = "";

	let logLength = countries.usa.trackerLog.length

	for (let i = (logLength - 1); i >= 0; i--) {
		let row = document.createElement("tr");

		let header = document.createElement("td");
		header.classList.add("valignTop");
		header.classList.add("allShow");

		let turnSpan = document.createElement("span");
		turnSpan.classList.add("bold");
		turnSpan.classList.add("bigger");
		turnSpan.textContent = "Turn " + (i + 1);
		header.appendChild(turnSpan);
		row.appendChild(header);
		resourceLog.appendChild(row);

		for (let j = 0; j < countryOrder.length; j++) {
			let countryName = countryOrder[j];

			let countryCell = document.createElement("td");
			countryCell.classList.add(countryName + "Show");
			countryCell.setAttribute("colspan", countryName == "china" ? 3 : 4);

			let tracker = countries[countryName].trackerLog[i];

			let startedWithSpan = document.createElement("p");
			startedWithSpan.classList.add("smaller");

			let startedWithLog = "Starting: ";

			if (tracker.startedWith.oil) {
				startedWithLog += "[" + tracker.startedWith.oil + NOBREAKSPACE + "Oil] ";
			}

			if (tracker.startedWith.iron) {
				startedWithLog += "[" + tracker.startedWith.iron + NOBREAKSPACE + "Iron] ";
			}

			if (tracker.startedWith.osr) {
				startedWithLog += "[" + tracker.startedWith.osr + NOBREAKSPACE + "Osr] ";
			}

			startedWithSpan.innerText = startedWithLog;

			countryCell.appendChild(startedWithSpan);

			if (tracker.bidding.oil) {
				let biddingSpan = document.createElement("p");
				biddingSpan.classList.add("smaller");
				biddingSpan.innerText = "Used " + tracker.bidding.oil + NOBREAKSPACE + "Oil on bidding"

				countryCell.appendChild(biddingSpan);
			}

			if (tracker.stress.oil || tracker.stress.iron || tracker.stress.osr) {
				let stressSpan = document.createElement("p");
				stressSpan.classList.add("smaller");

				let stressLog = "Civil Unrest caused a loss of: ";

				if (tracker.stress.oil) {
					stressLog += "[" + tracker.stress.oil + NOBREAKSPACE + "Oil] ";
				}

				if (tracker.stress.iron) {
					stressLog += "[" + tracker.stress.iron + NOBREAKSPACE + "Iron] ";
				}

				if (tracker.stress.osr) {
					stressLog += "[" + tracker.stress.osr + NOBREAKSPACE + "Osr] ";
				}

				stressSpan.innerText = stressLog;

				countryCell.appendChild(stressSpan);
			}

			if (tracker.raids.oil || tracker.raids.iron || tracker.raids.osr) {
				let raidsSpan = document.createElement("p");
				raidsSpan.classList.add("smaller");

				let raidsLog = "Lost due to raids: ";

				if (tracker.raids.oil) {
					raidsLog += "[" + tracker.raids.oil + NOBREAKSPACE + "Oil] ";
				}

				if (tracker.raids.iron) {
					raidsLog += "[" + tracker.raids.iron + NOBREAKSPACE + "Iron] ";
				}

				if (tracker.raids.osr) {
					raidsLog += "[" + tracker.raids.osr + NOBREAKSPACE + "Osr] ";
				}

				raidsSpan.innerText = raidsLog;

				countryCell.appendChild(raidsSpan);
			}

			if (tracker.repairs.oil || tracker.repairs.iron || tracker.repairs.osr) {
				let repairsSpan = document.createElement("p");
				repairsSpan.classList.add("smaller");

				let repairsLog = "Lost due to repairs: ";

				if (tracker.repairs.oil) {
					repairsLog += "[" + tracker.repairs.oil + NOBREAKSPACE + "Oil] ";
				}

				if (tracker.repairs.iron) {
					repairsLog += "[" + tracker.repairs.iron + NOBREAKSPACE + "Iron] ";
				}

				if (tracker.repairs.osr) {
					repairsLog += "[" + tracker.repairs.osr + NOBREAKSPACE + "Osr] ";
				}

				repairsSpan.innerText = repairsLog;

				countryCell.appendChild(repairsSpan);
			}

			if ((tracker.tradingFor.oil || tracker.tradingFor.iron || tracker.tradingFor.osr) ||
				tracker.tradingWith.oil || tracker.tradingWith.iron || tracker.tradingWith.osr) {

				let tradesSpan = document.createElement("p");
				tradesSpan.classList.add("smaller");

				let tradeLog = "Traded ";

				if (tracker.tradingWith.oil) {
					tradeLog += tracker.tradingWith.oil + NOBREAKSPACE + "Oil";
				}

				if (tracker.tradingWith.iron) {
					tradeLog += tracker.tradingWith.iron + NOBREAKSPACE + "Iron";
				}

				if (tracker.tradingWith.osr) {
					tradeLog += tracker.tradingWith.osr + NOBREAKSPACE + "Osr";
				}

				tradeLog += " for "

				if (tracker.tradingFor.oil) {
					tradeLog += Math.abs(tracker.tradingFor.oil) + NOBREAKSPACE + "Oil";
				}

				if (tracker.tradingFor.iron) {
					tradeLog += Math.abs(tracker.tradingFor.iron) + NOBREAKSPACE + "Iron";
				}

				if (tracker.tradingFor.osr) {
					tradeLog += Math.abs(tracker.tradingFor.osr) + NOBREAKSPACE + "Osr";
				}

				tradesSpan.innerText = tradeLog;

				countryCell.appendChild(tradesSpan);
			}

			if (tracker.goods.oil || tracker.goods.iron || tracker.goods.osr) {
				let goodsSpan = document.createElement("p");
				goodsSpan.classList.add("smaller");

				let goodsLog = "Spent on Consumer Goods: ";

				if (tracker.goods.oil) {
					goodsLog += "[" + tracker.goods.oil + NOBREAKSPACE + "Oil] ";
				}

				if (tracker.goods.iron) {
					goodsLog += "[" + tracker.goods.iron + NOBREAKSPACE + "Iron] ";
				}

				if (tracker.goods.osr) {
					goodsLog += "[" + tracker.goods.osr + NOBREAKSPACE + "Osr] ";
				}

				goodsSpan.innerText = goodsLog;

				countryCell.appendChild(goodsSpan);
			}

			if (tracker.unitList.infantry.qty) {
				let infantry = tracker.unitList.infantry;
				let infantrySpan = document.createElement("p");
				infantrySpan.classList.add("smaller");

				let infantryLog = infantry.qty + NOBREAKSPACE + "Infantry";
				infantryLog += " for a total of ";
				infantryLog += "[" + infantry.productionCost.osr * infantry.qty + NOBREAKSPACE + "Osr]";

				infantrySpan.innerText = infantryLog;

				countryCell.appendChild(infantrySpan);
			}

			if (tracker.unitList.artillery.qty) {
				let artillery = tracker.unitList.artillery;
				let artillerySpan = document.createElement("p");
				artillerySpan.classList.add("smaller");

				let artilleryLog = artillery.qty + NOBREAKSPACE + "Artillery";
				artilleryLog += " for a total of ";
				artilleryLog += "[" + artillery.productionCost.iron * artillery.qty + NOBREAKSPACE + "Iron] ";
				artilleryLog += "[" + artillery.productionCost.osr * artillery.qty + NOBREAKSPACE + "Osr] ";

				artillerySpan.innerText = artilleryLog;

				countryCell.appendChild(artillerySpan);
			}

			if (tracker.unitList.tank.qty) {
				let tank = tracker.unitList.tank;
				let tankSpan = document.createElement("p");
				tankSpan.classList.add("smaller");

				let tankLog = tank.qty + NOBREAKSPACE + "Tank" + (tank.qty == 1 ? "" : "s");
				tankLog += " for a total of ";
				tankLog += "[" + tank.productionCost.oil * tank.qty + NOBREAKSPACE + "Oil] ";
				tankLog += "[" + tank.productionCost.iron * tank.qty + NOBREAKSPACE + "Iron] ";
				tankLog += "[" + tank.productionCost.osr * tank.qty + NOBREAKSPACE + "Osr] ";

				tankSpan.innerText = tankLog;

				countryCell.appendChild(tankSpan);
			}

			if (tracker.unitList.fighter.qty) {
				let fighter = tracker.unitList.fighter;
				let fighterSpan = document.createElement("p");
				fighterSpan.classList.add("smaller");

				let fighterLog = fighter.qty + NOBREAKSPACE + "Fighter" + (fighter.qty == 1 ? "" : "s");
				fighterLog += " for a total of ";
				fighterLog += "[" + fighter.productionCost.oil * fighter.qty + NOBREAKSPACE + "Oil] ";
				fighterLog += "[" + fighter.productionCost.iron * fighter.qty + NOBREAKSPACE + "Iron] ";
				fighterLog += "[" + fighter.productionCost.osr * fighter.qty + NOBREAKSPACE + "Osr] ";

				fighterSpan.innerText = fighterLog;

				countryCell.appendChild(fighterSpan);
			}

			if (tracker.unitList.bomber.qty) {
				let bomber = tracker.unitList.bomber;
				let bomberSpan = document.createElement("p");
				bomberSpan.classList.add("smaller");

				let bomberLog = tracker.unitList.bomber.qty + NOBREAKSPACE + "Bomber" + (tracker.unitList.bomber.qty == 1 ? "" : "s");
				bomberLog += " for a total of ";
				bomberLog += "[" + bomber.productionCost.oil * bomber.qty + NOBREAKSPACE + "Oil] ";
				bomberLog += "[" + bomber.productionCost.iron * bomber.qty + NOBREAKSPACE + "Iron] ";
				bomberLog += "[" + bomber.productionCost.osr * bomber.qty + NOBREAKSPACE + "Osr] ";

				bomberSpan.innerText = bomberLog;

				countryCell.appendChild(bomberSpan);
			}

			if (tracker.unitList.submarine.qty) {
				let submarine = tracker.unitList.submarine;
				let submarineSpan = document.createElement("p");
				submarineSpan.classList.add("smaller");

				let submarineLog = submarine.qty + NOBREAKSPACE + "Submarine" + (submarine.qty == 1 ? "" : "s");;
				submarineLog += " for a total of ";
				submarineLog += "[" + submarine.productionCost.oil * submarine.qty + NOBREAKSPACE + "Oil] ";
				submarineLog += "[" + submarine.productionCost.iron * submarine.qty + NOBREAKSPACE + "Iron] ";
				submarineLog += "[" + submarine.productionCost.osr * submarine.qty + NOBREAKSPACE + "Osr] ";

				submarineSpan.innerText = submarineLog;

				countryCell.appendChild(submarineSpan);
			}

			if (tracker.unitList.cruiser.qty) {
				let cruiser = tracker.unitList.cruiser;
				let cruiserSpan = document.createElement("p");
				cruiserSpan.classList.add("smaller");

				let cruiserLog = cruiser.qty + NOBREAKSPACE + "Cruiser" + (cruiser.qty == 1 ? "" : "s");
				cruiserLog += " for a total of ";
				cruiserLog += "[" + cruiser.productionCost.oil * cruiser.qty + NOBREAKSPACE + "Oil] ";
				cruiserLog += "[" + cruiser.productionCost.iron * cruiser.qty + NOBREAKSPACE + "Iron] ";
				cruiserLog += "[" + cruiser.productionCost.osr * cruiser.qty + NOBREAKSPACE + "Osr] ";

				cruiserSpan.innerText = cruiserLog;

				countryCell.appendChild(cruiserSpan);
			}

			if (tracker.unitList.carrier.qty) {
				let carrier = tracker.unitList.carrier;
				let carrierSpan = document.createElement("p");
				carrierSpan.classList.add("smaller");

				let carrierLog = carrier.qty + NOBREAKSPACE + "Carrier" + (carrier.qty == 1 ? "" : "s");
				carrierLog += " for a total of ";
				carrierLog += "[" + carrier.productionCost.oil * carrier.qty + NOBREAKSPACE + "Oil] ";
				carrierLog += "[" + carrier.productionCost.iron * carrier.qty + NOBREAKSPACE + "Iron] ";
				carrierLog += "[" + carrier.productionCost.osr * carrier.qty + NOBREAKSPACE + "Osr] ";

				carrierSpan.innerText = carrierLog;

				countryCell.appendChild(carrierSpan);
			}

			if (tracker.unitList.battleship.qty) {
				let battleship = tracker.unitList.battleship;
				let battleshipSpan = document.createElement("p");
				battleshipSpan.classList.add("smaller");

				let battleshipLog = battleship.qty + NOBREAKSPACE + "Battleship" + (battleship.qty == 1 ? "" : "s");
				battleshipLog += " for a total of ";
				battleshipLog += "[" + battleship.productionCost.oil * battleship.qty + NOBREAKSPACE + "Oil] ";
				battleshipLog += "[" + battleship.productionCost.iron * battleship.qty + NOBREAKSPACE + "Iron] ";
				battleshipLog += "[" + battleship.productionCost.osr * battleship.qty + NOBREAKSPACE + "Osr] ";

				battleshipSpan.innerText = battleshipLog;

				countryCell.appendChild(battleshipSpan);
			}

			if (tracker.other.oil || tracker.other.iron || tracker.other.osr) {
				let othersSpan = document.createElement("p");
				othersSpan.classList.add("smaller");

				let repairsLog = "Other Resources: ";

				if (tracker.other.oil) {
					repairsLog += "[" + tracker.other.oil + NOBREAKSPACE + "Oil] ";
				}

				if (tracker.other.iron) {
					repairsLog += "[" + tracker.other.iron + NOBREAKSPACE + "Iron] ";
				}

				if (tracker.other.osr) {
					repairsLog += "[" + tracker.other.osr + NOBREAKSPACE + "Osr] ";
				}

				othersSpan.innerText = repairsLog;

				countryCell.appendChild(othersSpan);
			}

			let remainingSpan = document.createElement("p");
			remainingSpan.classList.add("smaller");

			let remainingLog = "Remaining: ";

			if (tracker.remaining.oil) {
				remainingLog += "[" + tracker.remaining.oil + NOBREAKSPACE + "Oil] ";
			}

			if (tracker.remaining.iron) {
				remainingLog += "[" + tracker.remaining.iron + NOBREAKSPACE + "Iron] ";
			}

			if (tracker.remaining.osr) {
				remainingLog += "[" + tracker.remaining.osr + NOBREAKSPACE + "Osr] ";
			}

			remainingSpan.innerText = remainingLog;

			countryCell.appendChild(remainingSpan);

			let producingSpan = document.createElement("p");
			producingSpan.classList.add("smaller");

			let producingLog = "";

			if (tracker.economicCollapse) {
				producingLog += "Economic Collapse! No production";
			}

			else {
				producingLog += " Producing: ";

				if (tracker.producing.oil) {
					producingLog += "[" + tracker.producing.oil + NOBREAKSPACE + "Oil] ";
				}

				if (tracker.producing.iron) {
					producingLog += "[" + tracker.producing.iron + NOBREAKSPACE + "Iron] ";
				}

				if (tracker.producing.osr) {
					producingLog += "[" + tracker.producing.osr + NOBREAKSPACE + "Osr] ";
				}
			}

			producingSpan.innerText = producingLog;

			countryCell.appendChild(producingSpan);

			let endedWithSpan = document.createElement("p");
			endedWithSpan.classList.add("smaller");

			let endedWithLog = "Ending: ";

			if (tracker.startedWith.oil) {
				endedWithLog += "[" + tracker.endedWith.oil + NOBREAKSPACE + "Oil] ";
			}

			if (tracker.startedWith.iron) {
				endedWithLog += "[" + tracker.endedWith.iron + NOBREAKSPACE + "Iron] ";
			}

			if (tracker.startedWith.osr) {
				endedWithLog += "[" + tracker.endedWith.osr + NOBREAKSPACE + "Osr] ";
			}

			endedWithSpan.innerText = endedWithLog;

			countryCell.appendChild(endedWithSpan);

			row.appendChild(countryCell);
		}
	}
}


function loadResourceTrackerFromStorage() {
	calcProduction();
	calculateRemainingResources();
	displayResourceLog();

	let individualCol = localStorage.getItem("individualCol");
	if (individualCol == "undefined" || !individualCol) {
		individualCol = "allShow"
	}

	let elements = document.getElementsByName("showOwners");

	for (let i = 0; i < elements.length; i++) {
		let element = elements[i];

		if (element.value == individualCol) {
			element.checked = true;
			break;
		}
	}
	hideTableColumns({ value: individualCol });
}

function saveResourceTrackerToStorage() {
}

function resetResourceTracerTab() {
}