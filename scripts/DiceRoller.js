let diceSelection = document.getElementById("diceRollerNumberForm");
let resultEls = document.getElementsByClassName("resultRoll");
let yellowResultRoll = document.getElementById("yellowResultRoll");
let blueResultRoll = document.getElementById("blueResultRoll");
let greenResultRoll = document.getElementById("greenResultRoll");
let redResultRoll = document.getElementById("redResultRoll");
let whiteResultRoll = document.getElementById("whiteResultRoll");
let blackResultRoll = document.getElementById("blackResultRoll");
let yellowPrior1 = document.getElementById("yellowPrior1");
let bluePrior1 = document.getElementById("bluePrior1");
let greenPrior1 = document.getElementById("greenPrior1");
let redPrior1 = document.getElementById("redPrior1");
let whitePrior1 = document.getElementById("whitePrior1");
let blackPrior1 = document.getElementById("blackPrior1");
let yellowPrior2 = document.getElementById("yellowPrior2");
let bluePrior2 = document.getElementById("bluePrior2");
let greenPrior2 = document.getElementById("greenPrior2");
let redPrior2 = document.getElementById("redPrior2");
let whitePrior2 = document.getElementById("whitePrior2");
let blackPrior2 = document.getElementById("blackPrior2");
let rollDiceButton = document.getElementById("rollDice");
let landCombatDiceCalc = document.getElementById("landCombatDiceCalc");
let seaCombatDiceCalc = document.getElementById("seaCombatDiceCalc");
let axisLandDice = document.getElementById("axisLandDice");
let allyLandDice = document.getElementById("allyLandDice");
let axisNavalDice = document.getElementById("axisNavalDice");
let allyNavalDice = document.getElementById("allyNavalDice");
let axisPort = document.getElementById("axisPort");
let allyPort = document.getElementById("allyPort");
let combatHelperForm = document.getElementById("combatHelperForm");
let axisLandAirDiceRemaining = document.getElementById("axisLandAirDiceRemaining");
let axisLandDiceRemaining = document.getElementById("axisLandDiceRemaining");
let allyLandDiceRemaining = document.getElementById("allyLandDiceRemaining");
let allyLandAirDiceRemaining = document.getElementById("allyLandAirDiceRemaining");

let sidesDice = {};

combatHelperForm.addEventListener("change", function(event) {
	let target = event.target;

	if (target.type == "text") {
		changeInputs(target);
	}
});

allyPort.addEventListener("click", function() {
	localStorage.setItem("allyPortChecked", allyPort.checked);

	unitCounter();
});

axisPort.addEventListener("click", function() {
	localStorage.setItem("axisPortChecked", axisPort.checked);

	unitCounter();
});

let numDiceToRoll = 0;

diceSelection.addEventListener("change", function(event) {
	target = event.target;

	numDiceToRoll = target.value;

	localStorage.setItem("numDiceToRoll", numDiceToRoll);

	navigator.vibrate(200);
});

let logArray = [];
let results = [];

rollDiceButton.addEventListener("click", function() {
	clearResultEls();

	if (numDiceToRoll && !rollDiceButton.disabled) {
		rollDiceButton.disabled = true;

		if (results.length) {
			logArray = prepend(results, logArray);
			appendLogRolls();
		}

		results = [];

		setTimeout(function() {
			rollTheDice(numDiceToRoll);
		}, 600);
	}
});

function appendLogRolls() {
	if (logArray.length == 3) {
		logArray.pop();
	}

	if (logArray.length >= 1) {
		let priorResults = logArray[0];

		for (let i = 0; i < priorResults.length; i++) {
			appendPrior1(priorResults[i]);
		}
	}

	if (logArray.length == 2) {
		let priorResults = logArray[1];

		for (let i = 0; i < priorResults.length; i++) {
			appendPrior2(priorResults[i]);
		}
	}
}

function prepend(value, array) {
	var newArray = array.slice();
	newArray.unshift(value);
	return newArray;
}

function rollTheDice(rollingNumber) {
	if (rollingNumber > 0) {
		let resultRoll = randomIntFromInterval(1, 12);
		results.push(resultRoll);

		appendRoll(resultRoll);

		setTimeout(function() {
			rollTheDice(rollingNumber - 1);
		}, 480);
	}
	else {
		rollDiceButton.disabled = false;
		storeResults();
	}
}

function clearResultEls() {
	for (let i = 0; i < resultEls.length; i++) {
		element = resultEls[i];
		element.innerHTML = "";
	}
}

function storeResults() {
	let resultJson = JSON.stringify(results);
	localStorage.setItem("resultRolls", resultJson);
	let logJson = JSON.stringify(logArray);
	localStorage.setItem("logArray", logJson);
}

function loadResults() {
	clearResultEls();
	let loadResults = localStorage.getItem("resultRolls");
	let logResults = localStorage.getItem("logArray");

	if (loadResults) {
		results = JSON.parse(loadResults);

		for (let i = 0; i < results.length; i++) {
			appendRoll(results[i]);
		}
	}
	
	if(logResults){
		logArray = JSON.parse(logResults);
		appendLogRolls();
	}
}

function appendRoll(resultRoll) {
	let newDiv = document.createElement("div");

	let divToApend = {};

	if (resultRoll < 1) {
		alert("???? something went wrong in the die roll");
	}

	if (resultRoll < 5) {
		divToApend = yellowResultRoll;
	}
	else if (resultRoll < 8) {
		divToApend = blueResultRoll;
	}
	else if (resultRoll < 10) {
		divToApend = greenResultRoll;
	}
	else if (resultRoll == 10) {
		divToApend = redResultRoll;
	}
	else if (resultRoll == 11) {
		divToApend = whiteResultRoll;
	}
	else if (resultRoll == 12) {
		divToApend = blackResultRoll;
	}
	else if (resultRoll > 12) {
		alert("???? something went wrong in the die roll");
	}

	divToApend.appendChild(newDiv);
}

function appendPrior1(resultRoll) {
	let newDiv = document.createElement("div");

	let divToApend = {};

	if (resultRoll < 1) {
		alert("???? something went wrong in the die roll");
	}

	if (resultRoll < 5) {
		divToApend = yellowPrior1;
	}
	else if (resultRoll < 8) {
		divToApend = bluePrior1;
	}
	else if (resultRoll < 10) {
		divToApend = greenPrior1;
	}
	else if (resultRoll == 10) {
		divToApend = redPrior1;
	}
	else if (resultRoll == 11) {
		divToApend = whitePrior1;
	}
	else if (resultRoll == 12) {
		divToApend = blackPrior1;
	}
	else if (resultRoll > 12) {
		alert("???? something went wrong in the die roll");
	}

	divToApend.appendChild(newDiv);
}

function appendPrior2(resultRoll) {
	let newDiv = document.createElement("div");

	let divToApend = {};

	if (resultRoll < 1) {
		alert("???? something went wrong in the die roll");
	}

	if (resultRoll < 5) {
		divToApend = yellowPrior2;
	}
	else if (resultRoll < 8) {
		divToApend = bluePrior2;
	}
	else if (resultRoll < 10) {
		divToApend = greenPrior2;
	}
	else if (resultRoll == 10) {
		divToApend = redPrior2;
	}
	else if (resultRoll == 11) {
		divToApend = whitePrior2;
	}
	else if (resultRoll == 12) {
		divToApend = blackPrior2;
	}
	else if (resultRoll > 12) {
		alert("???? something went wrong in the die roll");
	}

	divToApend.appendChild(newDiv);
}

function randomIntFromInterval(min, max) { // min and max included 
	let randomNum = Math.random(); // 0-1
	let minMax = randomNum * (max - min + 1) + min; // give interval desired
	let wholeNumber = Math.floor(minMax);// remove decimal places
	return wholeNumber;
}

let unitList = defaultUnitList();
let axisUnits = defaultUnitList();
let allyUnits = defaultUnitList();

function setupLandBattleCalc(tableEl, mode) {
	tableEl.innerHTML = "";

	for (let unitId in unitList) {
		let unit = unitList[unitId];

		let battleModes = unit.battleModes;

		let axisNameCell = document.createElement("td");
		let nameAxisDiv = document.createElement("div");
		nameAxisDiv.innerText = unit.name;
		axisNameCell.appendChild(nameAxisDiv);

		let allyNameCell = document.createElement("td");
		let nameAllyDiv = document.createElement("div");
		nameAllyDiv.innerText = unit.name;
		allyNameCell.appendChild(nameAllyDiv);

		let modeNumber = 0;

		for (let i = 0; i < battleModes.length; i++) {
			let battleMode = battleModes[i];

			if (battleMode.modesAvailable[mode]) {
				let modeRow = document.createElement("tr");
				modeRow.classList.add(unitId);

				if (modeNumber == 0) {
					modeRow.appendChild(axisNameCell);
				}

				let axisModeCell = document.createElement("td");

				let modeAxisDiv = document.createElement("div");
				let textAxisSpan = document.createElement("span");
				textAxisSpan.innerText = battleMode.name;

				modeAxisDiv.appendChild(textAxisSpan);
				axisModeCell.appendChild(modeAxisDiv);
				modeRow.appendChild(axisModeCell);

				let axisQtyCell = document.createElement("td");

				let unitAxisInput = document.createElement("input");
				unitAxisInput.setAttribute("name", "axis");
				unitAxisInput.setAttribute("modeNum", i);
				unitAxisInput.setAttribute("unitId", unitId);
				unitAxisInput.setAttribute("type", "text");
				unitAxisInput.setAttribute("inputmode", "numeric");
				unitAxisInput.value = axisUnits[unitId].battleModes[i].qty ? axisUnits[unitId].battleModes[i].qty : "";
				inputChangeControls(axisQtyCell, unitAxisInput, changeInputs);

				modeRow.appendChild(axisQtyCell);

				modeAxisDefenseCell = document.createElement("td");

				for (let j = 0; j < battleMode.defenseValue; j++) {
					let defenseMarker = document.createElement("div");
					defenseMarker.classList.add("hitpoint");
					defenseMarker.classList.add("axis");
					defenseMarker.classList.add(battleMode.name);
					defenseMarker.classList.add(unitId);
					modeAxisDefenseCell.appendChild(defenseMarker);
				}

				modeRow.appendChild(modeAxisDefenseCell);

				let combatDice = document.createElement("td");
				combatDice.innerText = battleMode.combatDice;
				modeRow.appendChild(combatDice);

				let airDice = document.createElement("td");
				airDice.innerText = battleMode.airDice;
				modeRow.appendChild(airDice);

				modeAllyDefenseCell = document.createElement("td");

				for (let j = 0; j < battleMode.defenseValue; j++) {
					let defenseMarker = document.createElement("div");
					defenseMarker.classList.add("hitpoint");
					defenseMarker.classList.add("ally");
					defenseMarker.classList.add(battleMode.name);
					defenseMarker.classList.add(unitId);
					modeAllyDefenseCell.appendChild(defenseMarker);
				}

				modeRow.appendChild(modeAllyDefenseCell);

				let allyQtyCell = document.createElement("td");

				let unitAllyInput = document.createElement("input");
				unitAllyInput.setAttribute("name", "ally");
				unitAllyInput.setAttribute("modeNum", i);
				unitAllyInput.setAttribute("unitId", unitId);
				unitAllyInput.setAttribute("type", "text");
				unitAllyInput.setAttribute("inputmode", "numeric");
				unitAllyInput.value = allyUnits[unitId].battleModes[i].qty ? allyUnits[unitId].battleModes[i].qty : "";
				inputChangeControls(allyQtyCell, unitAllyInput, changeInputs);

				modeRow.appendChild(allyQtyCell);

				let allyModeCell = document.createElement("td");

				let modeAllyDiv = document.createElement("div");
				let textAllySpan = document.createElement("span");
				textAllySpan.innerText = battleMode.name;

				modeAllyDiv.appendChild(textAllySpan);
				allyModeCell.appendChild(modeAllyDiv);
				modeRow.appendChild(allyModeCell);

				if (modeNumber == 0) {
					modeRow.appendChild(allyNameCell);
				}

				modeNumber++;
				tableEl.appendChild(modeRow);
			}
		}

		axisNameCell.setAttribute("rowspan", modeNumber);
		allyNameCell.setAttribute("rowspan", modeNumber);
	}
}

function changeInputs(target) {
	validateInput(target);
	let value = target.value;
	let name = target.getAttribute("name");
	let modeNumber = target.getAttribute("modeNum");
	let unitId = target.getAttribute("unitId");

	let force = {};

	if (name == "ally") {
		force = allyUnits;
	}
	else {
		force = axisUnits;
	}

	force[unitId].battleModes[modeNumber].qty = value;

	unitCounter();

	localStorage.setItem("axisUnits", JSON.stringify(axisUnits));
	localStorage.setItem("allyUnits", JSON.stringify(allyUnits));
}

function unitCounter() {
	let axisTypeCounter = sideCount(axisUnits, axisLandDice, axisNavalDice, axisPort);
	let allyTypeCounter = sideCount(allyUnits, allyLandDice, allyNavalDice, allyPort);

	sidesDice.axis = axisTypeCounter;
	sidesDice.ally = allyTypeCounter;

	landCombatDiceCalc.classList = [];

	if (axisTypeCounter.landTypes >= allyTypeCounter.landTypes) {
		landCombatDiceCalc.classList.add("axisAdvantage");
	}

	if (allyTypeCounter.landTypes >= axisTypeCounter.landTypes) {
		landCombatDiceCalc.classList.add("allyAdvantage");
	}

	seaCombatDiceCalc.classList = [];

	if (axisTypeCounter.navalTypes >= allyTypeCounter.navalTypes) {
		seaCombatDiceCalc.classList.add("axisAdvantage");
	}

	if (allyTypeCounter.navalTypes >= axisTypeCounter.navalTypes) {
		seaCombatDiceCalc.classList.add("allyAdvantage");
	}

	diceRemainingSpans();
}

function diceRemainingSpans() {
	sidesDice.axis.sideLandAirDice = sidesDice.axis.sideLandAirDice > 30 ? 30 : sidesDice.axis.sideLandAirDice;
	sidesDice.axis.sideLandGroundDice = sidesDice.axis.sideLandGroundDice > 30 ? 30 : sidesDice.axis.sideLandGroundDice;
	sidesDice.ally.sideLandAirDice = sidesDice.ally.sideLandAirDice > 30 ? 30 : sidesDice.ally.sideLandAirDice;
	sidesDice.ally.sideLandGroundDice = sidesDice.ally.sideLandGroundDice > 30 ? 30 : sidesDice.ally.sideLandGroundDice;

	axisLandAirDiceRemaining.innerText = sidesDice.axis.sideLandAirDice;
	axisLandDiceRemaining.innerText = sidesDice.axis.sideLandGroundDice;
	allyLandDiceRemaining.innerText = sidesDice.ally.sideLandAirDice;
	allyLandAirDiceRemaining.innerText = sidesDice.ally.sideLandGroundDice;
}

function sideCount(sideUnits, landDiceEl, navalDiceEl, port,) {
	let sideNavalAirDice = 0;
	let sideNavalSurfaceDice = 0;
	let sideLandAirDice = 0;
	let sideLandGroundDice = 0;
	let sideNavalTypes = 0;
	let sideLandTypes = 0;

	for (let sideUnitName in sideUnits) {
		let sideUnit = sideUnits[sideUnitName];

		let battleModes = sideUnit.battleModes;

		let atleastOneUnitType = false;

		for (let i = 0; i < battleModes.length; i++) {
			let battleMode = battleModes[i];

			let qty = battleMode.qty || 0;

			if (qty) {
				atleastOneUnitType = true;
			}

			if (battleMode.modesAvailable["land"]) {
				sideLandGroundDice += qty * battleMode.combatDice;
				sideLandAirDice += qty * battleMode.airDice;
			}

			if (battleMode.modesAvailable["naval"]) {
				sideNavalSurfaceDice += qty * battleMode.combatDice;
				sideNavalAirDice += qty * battleMode.airDice;
			}
		}

		if (atleastOneUnitType) {
			if (sideUnit.type == "land") {
				sideLandTypes++;
			}
			if (sideUnit.type == "naval") {
				sideNavalTypes++;
			}
		}
	}

	if (port.checked) {
		sideNavalSurfaceDice += 2;
	}

	landDiceEl.innerText = " - Land: " + sideLandGroundDice + "/30 | Air: " + sideLandAirDice + "/30";
	navalDiceEl.innerText = " - Sea: " + sideNavalSurfaceDice + "/30 | Air: " + sideNavalAirDice + "/30";

	airDice = sideLandGroundDice

	let typeCounts = {
		landTypes: sideLandTypes,
		navalTypes: sideNavalTypes,
		sideLandGroundDice: sideLandGroundDice,
		sideLandAirDice: sideLandAirDice,
		sideNavalSurfaceDice: sideNavalSurfaceDice,
		sideNavalAirDice: sideNavalAirDice
	}

	return typeCounts;
}
