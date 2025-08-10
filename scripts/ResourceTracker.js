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

		country.tracker.startedWith = new Production({ oil: country.currentOil, iron: country.currentIron, osr: country.currentOsr });
		country.tracker.producing = new Production({ oil: country.productionOil, iron: country.productionIron, osr: country.productionOsr });

		country.currentOil = country.remainingOil + country.productionOil;
		country.currentIron = country.remainingIron + country.productionIron;
		country.currentOsr = country.remainingOsr + country.productionOsr;

		country.tracker.endedWith = new Production({ oil: country.currentOil, iron: country.currentIron, osr: country.currentOsr });

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
		oilBidInput.setAttribute("name", "resource");
		oilBidInput.setAttribute("countryName", countryName);
		oilBidInput.setAttribute("resourceType", "oil");
		oilBidInput.setAttribute("trackingType", trackingType);
		oilBidInput.setAttribute("type", "text");
		oilBidInput.setAttribute("inputmode", "numeric");
		oilBidInput.value = oil || "";
		inputChangeControls(oilBidCell, oilBidInput);
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
		oilInput.setAttribute("name", "resource");
		oilInput.setAttribute("countryName", countryName);
		oilInput.setAttribute("resourceType", "oil");
		oilInput.setAttribute("trackingType", trackingType);
		oilInput.setAttribute("type", "text");
		oilInput.setAttribute("inputmode", "numeric");
		oilInput.value = oil || "";

		inputChangeControls(oilCell, oilInput);
		rowToAppend.appendChild(oilCell);
	}

	let ironCell = document.createElement("td");
	let ironInput = document.createElement("input");
	ironInput.setAttribute("name", "resource");
	ironInput.setAttribute("countryName", countryName);
	ironInput.setAttribute("resourceType", "iron");
	ironInput.setAttribute("trackingType", trackingType);
	ironInput.setAttribute("type", "text");
	ironInput.setAttribute("inputmode", "numeric");
	ironInput.value = iron || "";
	inputChangeControls(ironCell, ironInput);
	rowToAppend.appendChild(ironCell);

	let osrCell = document.createElement("td");
	let osrInput = document.createElement("input");
	osrInput.setAttribute("name", "resource");
	osrInput.setAttribute("countryName", countryName);
	osrInput.setAttribute("resourceType", "osr");
	osrInput.setAttribute("trackingType", trackingType);
	osrInput.setAttribute("type", "text");
	osrInput.setAttribute("inputmode", "numeric");
	osrInput.value = osr || "";
	inputChangeControls(osrCell, osrInput);
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
		oilCell.classList.add("backgroundTwo");

		let oilMinusDiv = document.createElement("div");

		let oilInputMinus = document.createElement("input");
		oilInputMinus.setAttribute("type", "radio");
		oilInputMinus.setAttribute("value", 2);
		oilInputMinus.setAttribute("id", countryName+"oil"+"tradingWith");
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
		oilInputPlus.setAttribute("id", countryName+"oil"+"tradingFor");
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
		ironCell.classList.add("backgroundThree");
		let ironMinusDiv = document.createElement("div");

		let ironInputMinus = document.createElement("input");
		ironInputMinus.setAttribute("type", "radio");
		ironInputMinus.setAttribute("value", 3);
		ironInputMinus.setAttribute("id", countryName+"iron"+"tradingWith");
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
		ironInputPlus.setAttribute("id", countryName+"iron"+"tradingFor");
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
		osrCell.classList.add("backgroundFive");
		let osrMinusDiv = document.createElement("div");

		let osrInputMinus = document.createElement("input");
		osrInputMinus.setAttribute("type", "radio");
		osrInputMinus.setAttribute("value", 5);
		osrInputMinus.setAttribute("id", countryName+"osr"+"tradingWith");
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
		osrInputPlus.setAttribute("id", countryName+"osr"+"tradingFor");
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
		buildNumberInput.setAttribute("name", "resource");
		buildNumberInput.setAttribute("trackingType", unitType);
		buildNumberInput.setAttribute("countryName", countryName);
		buildNumberInput.setAttribute("resourceType", "qty");
		buildNumberInput.setAttribute("type", "text");
		buildNumberInput.setAttribute("inputmode", "numeric");
		buildNumberInput.setAttribute("min", 0);
		buildNumberInput.setAttribute("max", 99);
		buildNumberInput.value = (qty ? qty : "");
		inputChangeControls(buildNumberCell, buildNumberInput);
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

	trackerFormChange(target);
});

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
		
		if(!isEqualValues){
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
	else{
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
	else if (value == 0){
		target.value = "";
	}
	else if (value < 0 && trackingType != "goods" && trackingType != "tradingFor") {
		target.value = "";
	}
	else if (value > 99) {
		target.value = 99;
	}
	else if (value <= -10) {
		target.value = -9;
	}

	return target;
};

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

	currentResourceRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Current"));
	oilBidRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Oil Bids"));
	stressRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Civil Unrest"));
	repairsRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Repairs"));
	raidsRow.appendChild(document.createElement("td")).appendChild(document.createTextNode("Raids"));
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

			if (oilRemaining && oilRemaining < 0) {
				oilSpan.classList.add("negative");
			}

			oilSpan.textContent = oilRemaining;
			oilCell.appendChild(oilSpan);
			remainingRow.appendChild(oilCell);
		}

		let ironCell = document.createElement("td");
		let ironSpan = document.createElement("span");

		if (ironRemaining && ironRemaining < 0) {
			ironSpan.classList.add("negative");
		}

		ironSpan.textContent = ironRemaining;
		ironCell.appendChild(ironSpan);
		remainingRow.appendChild(ironCell);

		let osrCell = document.createElement("td");
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

function inputChangeControls(parentEl, inputEl) {

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

		trackerFormChange(inputEl);
	});

	containerPlus.addEventListener("click", function() {
		let value = inputEl.value;

		if (!value) {
			value = 0;
		}

		inputEl.value = ++value;

		trackerFormChange(inputEl);
	});
};


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

		let header = document.createElement("td");
		header.classList.add("valignTop");

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
			countryCell.setAttribute("colspan", countryName == "china" ? 3 : 4);

			let tracker = countries[countryName].trackerLog[i];

			if (tracker.startedWith.oil || tracker.startedWith.iron || tracker.startedWith.osr) {
				let startedWithSpan = document.createElement("span");

				let startedWithLog = "Starting: ";

				if (tracker.startedWith.oil) {
					startedWithLog += "[" + tracker.startedWith.oil + NOBREAKSPACE + "Oil] "
				}

				if (tracker.startedWith.iron) {
					startedWithLog += "[" + tracker.startedWith.iron + NOBREAKSPACE + "Iron] "
				}

				if (tracker.startedWith.osr) {
					startedWithLog += "[" + tracker.startedWith.osr + NOBREAKSPACE + "Osr] "
				}

				startedWithSpan.innerText = startedWithLog;

				countryCell.appendChild(startedWithSpan);
				countryCell.appendChild(document.createElement("br"));
			}

			if (tracker.bidding.oil) {
				let biddingSpan = document.createElement("span");
				biddingSpan.innerText = "Used " + tracker.bidding.oil + NOBREAKSPACE + "Oil on oil bidding"

				countryCell.appendChild(biddingSpan);
				countryCell.appendChild(document.createElement("br"));
			}

			if (tracker.stress.oil || tracker.stress.iron || tracker.stress.osr) {
				let stressSpan = document.createElement("span");

				let stressLog = "Civil Unrest caused a loss of: ";

				if (tracker.stress.oil) {
					stressLog += "[" + tracker.stress.oil + NOBREAKSPACE + "Oil] "
				}

				if (tracker.stress.iron) {
					stressLog += "[" + tracker.stress.iron + NOBREAKSPACE + "Iron] "
				}

				if (tracker.stress.osr) {
					stressLog += "[" + tracker.stress.osr + NOBREAKSPACE + "Osr] "
				}

				stressSpan.innerText = stressLog;

				countryCell.appendChild(stressSpan);
				countryCell.appendChild(document.createElement("br"));
			}

			if (tracker.raids.oil || tracker.raids.iron || tracker.raids.osr) {
				let raidsSpan = document.createElement("span");

				let raidsLog = "Lost due to raids: ";

				if (tracker.raids.oil) {
					raidsLog += "[" + tracker.raids.oil + NOBREAKSPACE + "Oil] "
				}

				if (tracker.raids.iron) {
					raidsLog += "[" + tracker.raids.iron + NOBREAKSPACE + "Iron] "
				}

				if (tracker.raids.osr) {
					raidsLog += "[" + tracker.raids.osr + NOBREAKSPACE + "Osr] "
				}

				raidsSpan.innerText = raidsLog;

				countryCell.appendChild(raidsSpan);
				countryCell.appendChild(document.createElement("br"));
			}

			if (tracker.repairs.oil || tracker.repairs.iron || tracker.repairs.osr) {
				let repairsSpan = document.createElement("span");

				let repairsLog = "Lost due to repairs: ";

				if (tracker.repairs.oil) {
					repairsLog += "[" + tracker.repairs.oil + NOBREAKSPACE + "Oil] "
				}

				if (tracker.repairs.iron) {
					repairsLog += "[" + tracker.repairs.iron + NOBREAKSPACE + "Iron] "
				}

				if (tracker.repairs.osr) {
					repairsLog += "[" + tracker.repairs.osr + NOBREAKSPACE + "Osr] "
				}

				repairsSpan.innerText = repairsLog;

				countryCell.appendChild(repairsSpan);
				countryCell.appendChild(document.createElement("br"));
			}

			if ((tracker.tradingFor.oil || tracker.tradingFor.iron || tracker.tradingFor.osr) &&
				tracker.tradingWith.oil || tracker.tradingWith.iron || tracker.tradingWith.osr) {

				let tradesSpan = document.createElement("span");

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
				countryCell.appendChild(document.createElement("br"));
			}

			if (tracker.goods.oil || tracker.goods.iron || tracker.goods.osr) {
				let goodsSpan = document.createElement("span");

				let goodsLog = "Spent on Consumer Goods: ";

				if (tracker.goods.oil) {
					goodsLog += "[" + tracker.goods.oil + NOBREAKSPACE + "Oil] "
				}

				if (tracker.goods.iron) {
					goodsLog += "[" + tracker.goods.iron + NOBREAKSPACE + "Iron] "
				}

				if (tracker.goods.osr) {
					goodsLog += "[" + tracker.goods.osr + NOBREAKSPACE + "Osr] "
				}

				goodsSpan.innerText = goodsLog;

				countryCell.appendChild(goodsSpan);
				countryCell.appendChild(document.createElement("br"));
			}

			if (tracker.infantry.qty) {
				let infantrySpan = document.createElement("span");

				let infantryLog = tracker.infantry.qty + NOBREAKSPACE + "Infantry";
				infantryLog += " for a total of ";
				infantryLog += "[" + tracker.infantry.osr * tracker.infantry.qty + NOBREAKSPACE + "Osr]";

				infantrySpan.innerText = infantryLog;

				countryCell.appendChild(infantrySpan);
				countryCell.appendChild(document.createElement("br"));
			}

			if (tracker.artillery.qty) {
				let artillerySpan = document.createElement("span");

				let artilleryLog = tracker.artillery.qty + NOBREAKSPACE + "Artillery";
				artilleryLog += " for a total of ";
				artilleryLog += "[" + tracker.artillery.iron * tracker.artillery.qty + NOBREAKSPACE + "Iron]";
				artilleryLog += "[" + tracker.artillery.osr * tracker.artillery.qty + NOBREAKSPACE + "Osr]";

				artillerySpan.innerText = artilleryLog;

				countryCell.appendChild(artillerySpan);
				countryCell.appendChild(document.createElement("br"));
			}

			if (tracker.tank.qty) {
				let tankSpan = document.createElement("span");

				let tankLog = tracker.tank.qty + NOBREAKSPACE + "Tanks";
				tankLog += " for a total of ";
				tankLog += "[" + tracker.tank.oil * tracker.tank.qty + NOBREAKSPACE + "Oil]";
				tankLog += "[" + tracker.tank.iron * tracker.tank.qty + NOBREAKSPACE + "Iron]";
				tankLog += "[" + tracker.tank.osr * tracker.tank.qty + NOBREAKSPACE + "Osr]";

				tankSpan.innerText = tankLog;

				countryCell.appendChild(tankSpan);
				countryCell.appendChild(document.createElement("br"));
			}

			if (tracker.fighter.qty) {
				let fighterSpan = document.createElement("span");

				let fighterLog = tracker.fighter.qty + NOBREAKSPACE + "Fighters";
				fighterLog += " for a total of ";
				fighterLog += "[" + tracker.fighter.oil * tracker.fighter.qty + NOBREAKSPACE + "Oil]";
				fighterLog += "[" + tracker.fighter.iron * tracker.fighter.qty + NOBREAKSPACE + "Iron]";
				fighterLog += "[" + tracker.fighter.osr * tracker.fighter.qty + NOBREAKSPACE + "Osr]";

				fighterSpan.innerText = fighterLog;

				countryCell.appendChild(fighterSpan);
				countryCell.appendChild(document.createElement("br"));
			}

			if (tracker.bomber.qty) {
				let bomberSpan = document.createElement("span");

				let bomberLog = tracker.bomber.qty + NOBREAKSPACE + "Bombers";
				bomberLog += " for a total of ";
				bomberLog += "[" + tracker.bomber.oil * tracker.bomber.qty + NOBREAKSPACE + "Oil]";
				bomberLog += "[" + tracker.bomber.iron * tracker.bomber.qty + NOBREAKSPACE + "Iron]";
				bomberLog += "[" + tracker.bomber.osr * tracker.bomber.qty + NOBREAKSPACE + "Osr]";

				bomberSpan.innerText = bomberLog;

				countryCell.appendChild(bomberSpan);
				countryCell.appendChild(document.createElement("br"));
			}

			if (tracker.submarine.qty) {
				let submarineSpan = document.createElement("span");

				let submarineLog = tracker.submarine.qty + NOBREAKSPACE + "Submarines";
				submarineLog += " for a total of ";
				submarineLog += "[" + tracker.submarine.oil * tracker.submarine.qty + NOBREAKSPACE + "Oil]";
				submarineLog += "[" + tracker.submarine.iron * tracker.submarine.qty + NOBREAKSPACE + "Iron]";
				submarineLog += "[" + tracker.submarine.osr * tracker.submarine.qty + NOBREAKSPACE + "Osr]";

				submarineSpan.innerText = submarineLog;

				countryCell.appendChild(submarineSpan);
				countryCell.appendChild(document.createElement("br"));
			}

			if (tracker.cruiser.qty) {
				let cruiserSpan = document.createElement("span");

				let cruiserLog = tracker.cruiser.qty + NOBREAKSPACE + "Cruisers";
				cruiserLog += " for a total of ";
				cruiserLog += "[" + tracker.cruiser.oil * tracker.cruiser.qty + NOBREAKSPACE + "Oil]";
				cruiserLog += "[" + tracker.cruiser.iron * tracker.cruiser.qty + NOBREAKSPACE + "Iron]";
				cruiserLog += "[" + tracker.cruiser.osr * tracker.cruiser.qty + NOBREAKSPACE + "Osr]";

				cruiserSpan.innerText = cruiserLog;

				countryCell.appendChild(cruiserSpan);
				countryCell.appendChild(document.createElement("br"));
			}

			if (tracker.carrier.qty) {
				let carrierSpan = document.createElement("span");

				let carrierLog = tracker.carrier.qty + NOBREAKSPACE + "Carriers";
				carrierLog += " for a total of ";
				carrierLog += "[" + tracker.carrier.oil * tracker.carrier.qty + NOBREAKSPACE + "Oil]";
				carrierLog += "[" + tracker.carrier.iron * tracker.carrier.qty + NOBREAKSPACE + "Iron]";
				carrierLog += "[" + tracker.carrier.osr * tracker.carrier.qty + NOBREAKSPACE + "Osr]";

				carrierSpan.innerText = carrierLog;

				countryCell.appendChild(carrierSpan);
				countryCell.appendChild(document.createElement("br"));
			}

			if (tracker.battleship.qty) {
				let battleshipSpan = document.createElement("span");

				let battleshipLog = tracker.battleship.qty + NOBREAKSPACE + "Battleships";
				battleshipLog += " for a total of ";
				battleshipLog += "[" + tracker.battleship.oil * tracker.battleship.qty + NOBREAKSPACE + "Oil]";
				battleshipLog += "[" + tracker.battleship.iron * tracker.battleship.qty + NOBREAKSPACE + "Iron]";
				battleshipLog += "[" + tracker.battleship.osr * tracker.battleship.qty + NOBREAKSPACE + "Osr]";

				battleshipSpan.innerText = battleshipLog;

				countryCell.appendChild(battleshipSpan);
				countryCell.appendChild(document.createElement("br"));
			}

			if (tracker.producing.oil || tracker.producing.iron || tracker.producing.osr) {
				let producingSpan = document.createElement("span");

				let producingLog = "Producing: ";

				if (tracker.producing.oil) {
					producingLog += "[" + tracker.producing.oil + NOBREAKSPACE + "Oil] "
				}

				if (tracker.producing.iron) {
					producingLog += "[" + tracker.producing.iron + NOBREAKSPACE + "Iron] "
				}

				if (tracker.producing.osr) {
					producingLog += "[" + tracker.producing.osr + NOBREAKSPACE + "Osr] "
				}

				producingSpan.innerText = producingLog;

				countryCell.appendChild(producingSpan);
				countryCell.appendChild(document.createElement("br"));
			}

			if (tracker.endedWith.oil || tracker.endedWith.iron || tracker.endedWith.osr) {
				let endedWithSpan = document.createElement("span");

				let endedWithLog = "Ending: ";

				if (tracker.startedWith.oil) {
					endedWithLog += "[" + tracker.endedWith.oil + NOBREAKSPACE + "Oil] "
				}

				if (tracker.startedWith.iron) {
					endedWithLog += "[" + tracker.endedWith.iron + NOBREAKSPACE + "Iron] "
				}

				if (tracker.startedWith.osr) {
					endedWithLog += "[" + tracker.endedWith.osr + NOBREAKSPACE + "Osr] "
				}

				endedWithSpan.innerText = endedWithLog;

				countryCell.appendChild(endedWithSpan);
				countryCell.appendChild(document.createElement("br"));
			}

			row.appendChild(countryCell);
		}
	}
}