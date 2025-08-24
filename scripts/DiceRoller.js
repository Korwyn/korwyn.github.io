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
let axisNavalAirDiceRemaining = document.getElementById("axisNavalAirDiceRemaining");
let axisNavalDiceRemaining = document.getElementById("axisNavalDiceRemaining");
let allyNavalDiceRemaining = document.getElementById("allyNavalDiceRemaining");
let allyNavalAirDiceRemaining = document.getElementById("allyNavalAirDiceRemaining");
let allyLandAirRoller = document.getElementById("allyLandAirRoller");
let allyLandRoller = document.getElementById("allyLandRoller");
let axisLandRoller = document.getElementById("axisLandRoller");
let axisLandAirRoller = document.getElementById("axisLandAirRoller");
let allyNavalAirRoller = document.getElementById("allyNavalAirRoller");
let allyNavalSurfaceRoller = document.getElementById("allyNavalSurfaceRoller");
let axisNavalSurfaceRoller = document.getElementById("axisNavalSurfaceRoller");
let axisNavalAirRoller = document.getElementById("axisNavalAirRoller");
let clearDice = document.getElementById("clearDice");

let MAX_COMBAT_DICE = 30;
let MAX_BATCH_ROLL = 10;

let unitList = defaultUnitList();
let axisUnits = defaultUnitList();
let allyUnits = defaultUnitList();
let logArray = [];
let results = [];
let sidesDice = {};
let numDiceToRoll = 0;

let rollSections = {
	partOne: {
		yellow: yellowResultRoll,
		blue: blueResultRoll,
		green: greenResultRoll,
		red: redResultRoll,
		black: blackResultRoll,
		white: whiteResultRoll
	},
	partTwo: {
		yellow: yellowPrior1,
		blue: bluePrior1,
		green: greenPrior1,
		red: redPrior1,
		black: blackPrior1,
		white: whitePrior1
	},
	partThree: {
		yellow: yellowPrior2,
		blue: bluePrior2,
		green: greenPrior2,
		red: redPrior2,
		black: blackPrior2,
		white: whitePrior2
	}
};

clearDice.addEventListener('click', function() {
	if (!rollDiceButton.disabled) {
		if(confirm("Clear all dice information")){
			clearDiceRollerInfo();
		}
	}
});

allyLandAirRoller.addEventListener('click', function(event) {
	event.preventDefault();

	if (!rollDiceButton.disabled) {
		let diceToRoll = 0;

		if (sidesDice.ally.sideLandAirDice > MAX_BATCH_ROLL) {
			sidesDice.ally.sideLandAirDice -= MAX_BATCH_ROLL;
			diceToRoll = MAX_BATCH_ROLL;
		}
		else {
			diceToRoll = sidesDice.ally.sideLandAirDice;
			sidesDice.ally.sideLandAirDice = 0;
		}

		setDiceAndRoll(diceToRoll, event.target);
	}
});

allyLandRoller.addEventListener('click', function(event) {
	event.preventDefault();

	if (!rollDiceButton.disabled) {
		let diceToRoll = 0;

		if (sidesDice.ally.sideLandGroundDice > MAX_BATCH_ROLL) {
			sidesDice.ally.sideLandGroundDice -= MAX_BATCH_ROLL;
			diceToRoll = MAX_BATCH_ROLL;
		}
		else {
			diceToRoll = sidesDice.ally.sideLandGroundDice;
			sidesDice.ally.sideLandGroundDice = 0;
		}

		setDiceAndRoll(diceToRoll, event.target);
	}
});

axisLandRoller.addEventListener('click', function(event) {
	event.preventDefault();

	if (!rollDiceButton.disabled) {
		let diceToRoll = 0;

		if (sidesDice.axis.sideLandGroundDice > MAX_BATCH_ROLL) {
			sidesDice.axis.sideLandGroundDice -= MAX_BATCH_ROLL;
			diceToRoll = MAX_BATCH_ROLL;
		}
		else {
			diceToRoll = sidesDice.axis.sideLandGroundDice;
			sidesDice.axis.sideLandGroundDice = 0;
		}

		setDiceAndRoll(diceToRoll, event.target);
	}
});

axisLandAirRoller.addEventListener('click', function(event) {
	event.preventDefault();

	if (!rollDiceButton.disabled) {
		let diceToRoll = 0;

		if (sidesDice.axis.sideLandAirDice > MAX_BATCH_ROLL) {
			sidesDice.axis.sideLandAirDice -= MAX_BATCH_ROLL;
			diceToRoll = MAX_BATCH_ROLL;
		}
		else {
			diceToRoll = sidesDice.axis.sideLandAirDice;
			sidesDice.axis.sideLandAirDice = 0;
		}

		setDiceAndRoll(diceToRoll, event.target);
	}
});

allyNavalAirRoller.addEventListener('click', function(event) {
	event.preventDefault();

	if (!rollDiceButton.disabled) {
		let diceToRoll = 0;

		if (sidesDice.ally.sideNavalAirDice > MAX_BATCH_ROLL) {
			sidesDice.ally.sideNavalAirDice -= MAX_BATCH_ROLL;
			diceToRoll = MAX_BATCH_ROLL;
		}
		else {
			diceToRoll = sidesDice.ally.sideNavalAirDice;
			sidesDice.ally.sideNavalAirDice = 0;
		}

		setDiceAndRoll(diceToRoll, event.target);
	}
});

allyNavalSurfaceRoller.addEventListener('click', function(event) {
	event.preventDefault();

	if (!rollDiceButton.disabled) {
		let diceToRoll = 0;

		if (sidesDice.ally.sideNavalSurfaceDice > MAX_BATCH_ROLL) {
			sidesDice.ally.sideNavalSurfaceDice -= MAX_BATCH_ROLL;
			diceToRoll = MAX_BATCH_ROLL;
		}
		else {
			diceToRoll = sidesDice.ally.sideNavalSurfaceDice;
			sidesDice.ally.sideNavalSurfaceDice = 0;
		}

		setDiceAndRoll(diceToRoll, event.target);
	}
});

axisNavalSurfaceRoller.addEventListener('click', function(event) {
	event.preventDefault();

	if (!rollDiceButton.disabled) {
		let diceToRoll = 0;

		if (sidesDice.axis.sideNavalSurfaceDice > MAX_BATCH_ROLL) {
			sidesDice.axis.sideNavalSurfaceDice -= MAX_BATCH_ROLL;
			diceToRoll = MAX_BATCH_ROLL;
		}
		else {
			diceToRoll = sidesDice.axis.sideNavalSurfaceDice;
			sidesDice.axis.sideNavalSurfaceDice = 0;
		}

		setDiceAndRoll(diceToRoll, event.target);
	}
});

axisNavalAirRoller.addEventListener('click', function(event) {
	event.preventDefault();

	if (!rollDiceButton.disabled) {
		let diceToRoll = 0;

		if (sidesDice.axis.sideNavalAirDice > MAX_BATCH_ROLL) {
			sidesDice.axis.sideNavalAirDice -= MAX_BATCH_ROLL;
			diceToRoll = MAX_BATCH_ROLL;
		}
		else {
			diceToRoll = sidesDice.axis.sideNavalAirDice;
			sidesDice.axis.sideNavalAirDice = 0;
		}

		setDiceAndRoll(diceToRoll, event.target);
	}
});

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

diceSelection.addEventListener("change", function(event) {
	target = event.target;

	numDiceToRoll = target.value;

	localStorage.setItem("numDiceToRoll", numDiceToRoll);

	navigator.vibrate(200);
});

rollDiceButton.addEventListener("click", function() {
	rollDice();
});

function clearDiceRollerInfo() {
	numDiceToRoll = 2;//set Default

	logArray = [];
	results = [];
	localStorage.setItem("numDiceToRoll", numDiceToRoll);
	localStorage.setItem("resultRolls", JSON.stringify([]));
	localStorage.setItem("logArray", JSON.stringify([]));
	document.getElementById("diceRadio2").checked = true;

	axisUnits = defaultUnitList();
	allyUnits = defaultUnitList();
	localStorage.setItem("axisUnits", JSON.stringify(axisUnits));
	localStorage.setItem("allyUnits", JSON.stringify(allyUnits));

	localStorage.setItem("allyPortChecked", false);
	localStorage.setItem("axisPortChecked", false);
	allyPort.checked = false;
	axisPort.checked = false;

	setupLandBattleCalc(landCombatDiceCalc, "land");
	setupLandBattleCalc(seaCombatDiceCalc, "naval");
	clearResultEls();
	unitCounter();
}

function setDiceAndRoll(numDiceToRollSetup, target) {
	if (numDiceToRollSetup > 0) {
		window.scrollTo(0, 60);
		let diceIdElName = "diceRadio" + numDiceToRollSetup;
		document.getElementById(diceIdElName).checked = true;
		numDiceToRoll = numDiceToRollSetup;
		diceRemainingSpans();
		lastAutoRollClicked(target.id);
		rollDice();
	}
}

function rollDice() {
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
}

function appendLogRolls() {
	if (logArray.length == 3) {
		logArray.pop();
	}

	if (logArray.length >= 1) {
		let priorResults = logArray[0];

		for (let i = 0; i < priorResults.length; i++) {
			appendRoll(priorResults[i], rollSections.partTwo);
		}
	}

	if (logArray.length == 2) {
		let priorResults = logArray[1];

		for (let i = 0; i < priorResults.length; i++) {
			appendRoll(priorResults[i], rollSections.partThree);
		}
	}
}

function lastAutoRollClicked(classToAppend) {
	combatHelperForm.classList.add(classToAppend);
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

		appendRoll(resultRoll, rollSections.partOne);

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
			appendRoll(results[i], rollSections.partOne);
		}
	}

	if (logResults) {
		logArray = JSON.parse(logResults);
		appendLogRolls();
	}
}

function appendRoll(resultRoll, section) {
	let newDiv = document.createElement("div");

	let divToApend = {};

	if (resultRoll < 1) {
		alert("???? something went wrong in the die roll");
	}
	else if (resultRoll < 5) {
		divToApend = section.yellow;
	}
	else if (resultRoll < 8) {
		divToApend = section.blue;
	}
	else if (resultRoll < 10) {
		divToApend = section.green;
	}
	else if (resultRoll == 10) {
		divToApend = section.red;
	}
	else if (resultRoll == 11) {
		divToApend = section.black;
	}
	else if (resultRoll == 12) {
		divToApend = section.white;
	}
	else {
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
	combatHelperForm.classList = [];

	sidesDice.axis.sideLandAirDice = sidesDice.axis.sideLandAirDice > MAX_COMBAT_DICE ? MAX_COMBAT_DICE : sidesDice.axis.sideLandAirDice;
	sidesDice.axis.sideLandGroundDice = sidesDice.axis.sideLandGroundDice > MAX_COMBAT_DICE ? MAX_COMBAT_DICE : sidesDice.axis.sideLandGroundDice;
	sidesDice.ally.sideLandAirDice = sidesDice.ally.sideLandAirDice > MAX_COMBAT_DICE ? MAX_COMBAT_DICE : sidesDice.ally.sideLandAirDice;
	sidesDice.ally.sideLandGroundDice = sidesDice.ally.sideLandGroundDice > MAX_COMBAT_DICE ? MAX_COMBAT_DICE : sidesDice.ally.sideLandGroundDice;
	sidesDice.axis.sideNavalAirDice = sidesDice.axis.sideNavalAirDice > MAX_COMBAT_DICE ? MAX_COMBAT_DICE : sidesDice.axis.sideNavalAirDice;
	sidesDice.axis.sideNavalSurfaceDice = sidesDice.axis.sideNavalSurfaceDice > MAX_COMBAT_DICE ? MAX_COMBAT_DICE : sidesDice.axis.sideNavalSurfaceDice;
	sidesDice.ally.sideNavalAirDice = sidesDice.ally.sideNavalAirDice > MAX_COMBAT_DICE ? MAX_COMBAT_DICE : sidesDice.ally.sideNavalAirDice;
	sidesDice.ally.sideNavalSurfaceDice = sidesDice.ally.sideNavalSurfaceDice > MAX_COMBAT_DICE ? MAX_COMBAT_DICE : sidesDice.ally.sideNavalSurfaceDice;

	axisLandAirDiceRemaining.innerText = sidesDice.axis.sideLandAirDice;
	axisLandDiceRemaining.innerText = sidesDice.axis.sideLandGroundDice;
	allyLandDiceRemaining.innerText = sidesDice.ally.sideLandGroundDice;
	allyLandAirDiceRemaining.innerText = sidesDice.ally.sideLandAirDice;
	axisNavalAirDiceRemaining.innerText = sidesDice.axis.sideNavalAirDice;
	axisNavalDiceRemaining.innerText = sidesDice.axis.sideNavalSurfaceDice;
	allyNavalDiceRemaining.innerText = sidesDice.ally.sideNavalSurfaceDice;
	allyNavalAirDiceRemaining.innerText = sidesDice.ally.sideNavalAirDice;
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

	landDiceEl.innerText = " - Land: " + sideLandGroundDice + "/" + MAX_COMBAT_DICE + " | Air: " + sideLandAirDice + "/" + MAX_COMBAT_DICE;
	navalDiceEl.innerText = " - Sea: " + sideNavalSurfaceDice + "/" + MAX_COMBAT_DICE + " | Air: " + sideNavalAirDice + "/" + MAX_COMBAT_DICE;

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
