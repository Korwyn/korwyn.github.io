let diceSelection = document.getElementById("diceRollerNumberForm");
let resultEls = document.getElementsByClassName("resultRoll");
let yellowResultRoll = document.getElementById("yellowResultRoll");
let blueResultRoll = document.getElementById("blueResultRoll");
let greenResultRoll = document.getElementById("greenResultRoll");
let redResultRoll = document.getElementById("redResultRoll");
let whiteResultRoll = document.getElementById("whiteResultRoll");
let blackResultRoll = document.getElementById("blackResultRoll");
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

combatHelperForm.addEventListener("change", function(event){
	let target = event.target;
	
	if(target.type=="text"){
		changeInputs(target);
	}
});

allyPort.addEventListener("click", function(){
	localStorage.setItem("allyPortChecked", allyPort.checked);
	
	unitCounter();
});

axisPort.addEventListener("click", function(){
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

let results = [];

rollDiceButton.addEventListener("click", function() {
	if (numDiceToRoll && !rollDiceButton.disabled) {
		rollDiceButton.disabled = true;
		results = [];

		clearResultEls();

		setTimeout(function() {
			rollTheDice(numDiceToRoll);
		}, 600);
	}
});

function rollTheDice(rollingNumber) {
	if (rollingNumber > 0) {
		let resultRoll = randomIntFromInterval(1, 12);
		results.push(resultRoll);

		appendRoll(resultRoll)

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
}

function loadResults() {
	clearResultEls();
	let loadResults = localStorage.getItem("resultRolls");

	if (loadResults) {
		results = JSON.parse(loadResults);

		for (let i = 0; i < results.length; i++) {
			appendRoll(results[i]);
		}
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

function unitCounter(){
	let axisTypeCounter = sideCount(axisUnits, axisLandDice, axisNavalDice, axisPort);
	let allyTypeCounter = sideCount(allyUnits, allyLandDice, allyNavalDice, allyPort);

	landCombatDiceCalc.classList = [];

	if (axisTypeCounter.landTypes >= allyTypeCounter.landTypes){
		landCombatDiceCalc.classList.add("axisAdvantage");
	}

	if (allyTypeCounter.landTypes >= axisTypeCounter.landTypes){
		landCombatDiceCalc.classList.add("allyAdvantage");
	}

	seaCombatDiceCalc.classList = [];

	if (axisTypeCounter.navalTypes >= allyTypeCounter.navalTypes){
		seaCombatDiceCalc.classList.add("axisAdvantage");
	}

	if (allyTypeCounter.navalTypes >= axisTypeCounter.navalTypes){
		seaCombatDiceCalc.classList.add("allyAdvantage");
	}
}

function sideCount(sideUnits, landDiceEl, navalDiceEl, port) {
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

	if(port.checked){
		sideNavalSurfaceDice += 2;
	}

	landDiceEl.innerText = " - Ground: " + sideLandGroundDice + "/30 | Air: " + sideLandAirDice + "/30";
	navalDiceEl.innerText = " - Surface: " + sideNavalSurfaceDice + "/30 | Air: " + sideNavalAirDice + "/30";

	let typeCounts = {
		landTypes: sideLandTypes,
		navalTypes: sideNavalTypes
	}

	return typeCounts;
}
