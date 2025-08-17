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

		let appendedRows = 0;

		for (let i = 0; i < battleModes.length; i++) {
			let battleMode = battleModes[i];

			if (battleMode.modesAvailable[mode]) {
				let modeRow = document.createElement("tr");
				modeRow.classList.add(unitId);

				if (appendedRows == 0) {
					modeRow.appendChild(axisNameCell);
				}

				let axisModeCell = document.createElement("td");

				let modeAxisDiv = document.createElement("div");
				let textAxisSpan = document.createElement("span");
				textAxisSpan.innerText = battleMode.name;

				modeAxisDiv.appendChild(textAxisSpan);
				axisModeCell.appendChild(modeAxisDiv);
				modeRow.appendChild(axisModeCell);

				modeAxisDefenseCell = document.createElement("td");

				for (let j = 0; j < battleMode.defenseValue; j++) {
					let defenseMarker = document.createElement("div");
					defenseMarker.classList.add("hitpoint");
					defenseMarker.classList.add("axis");
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
					defenseMarker.classList.add(unitId);
					modeAllyDefenseCell.appendChild(defenseMarker);
				}

				modeRow.appendChild(modeAllyDefenseCell);

				let allyModeCell = document.createElement("td");

				let modeAllyDiv = document.createElement("div");
				let textAllySpan = document.createElement("span");
				textAllySpan.innerText = battleMode.name;

				modeAllyDiv.appendChild(textAllySpan);
				allyModeCell.appendChild(modeAllyDiv);
				modeRow.appendChild(allyModeCell);

				if (appendedRows == 0) {
					modeRow.appendChild(allyNameCell);
				}

				appendedRows++;
				tableEl.appendChild(modeRow);
			}
		}

		axisNameCell.setAttribute("rowspan", appendedRows);
		allyNameCell.setAttribute("rowspan", appendedRows);
	}
}

setupLandBattleCalc(landCombatDiceCalc, "land");
setupLandBattleCalc(seaCombatDiceCalc, "naval");
