//from SetupCards.js
let countrySetup = localStorage.getItem("countrySetup");
if (countrySetup) {
	countries = JSON.parse(countrySetup);
}
setupCards();

function dragOverHandler(event) {
	event.preventDefault();
	event.dataTransfer.dropEffect = "move";
}

function dropHandler(event) {
	event.preventDefault();
	let data = JSON.parse(event.dataTransfer.getData("text/plain"));
	let value = this.id.split("CardList")[0];
	let oldControled = data.oldControled;
	let territoryId = data.territoryId;

	if (value != oldControled) {
		let territory = countries[oldControled].territories[territoryId];
		territory.isEmbattled = false;
		territory.countryControlled = value;
		countries[value].territories[territoryId] = territory;
		delete countries[oldControled].territories[territoryId];
		setupCards();
	}
}

for (let countryName in countries) {
	let country = countries[countryName];

	let baseElement = document.getElementById(country.id);

	baseElement.addEventListener('drop', dropHandler);
	baseElement.addEventListener("dragover", dragOverHandler);
}

//from TabSet.js
let activeTab = localStorage.getItem("activeTab");
if (activeTab) {
	document.getElementById(activeTab).click();
}

//from DiceRoller.js
localStorage.getItem("numDiceToRoll");
let numDiceToRollSetup = localStorage.getItem("numDiceToRoll");
if (!numDiceToRollSetup) {
	numDiceToRollSetup = 1;//set Default
}
if (numDiceToRollSetup >= 1) {
	let diceIdElName = "diceRadio" + numDiceToRollSetup;
	document.getElementById(diceIdElName).checked = true;
	numDiceToRoll = numDiceToRollSetup;
}

let axisUnitsJson = localStorage.getItem("axisUnits");
let allyUnitsJson = localStorage.getItem("allyUnits");

axisUnits = axisUnitsJson ? JSON.parse(axisUnitsJson) : defaultUnitList();
allyUnits = allyUnitsJson ? JSON.parse(allyUnitsJson) : defaultUnitList();

let allyPortChecked = localStorage.getItem("allyPortChecked");
let axisPortChecked = localStorage.getItem("axisPortChecked");

if (allyPortChecked == "true") {
	allyPort.checked = allyPortChecked;
}
if (axisPortChecked == "true") {
	axisPort.checked = axisPortChecked;
}

setupLandBattleCalc(landCombatDiceCalc, "land");
setupLandBattleCalc(seaCombatDiceCalc, "naval");
loadResults();
unitCounter();

//from ResourceTracker.js

loadResourceTrackerFromStorage()
loadOrdersTabFromStorage();