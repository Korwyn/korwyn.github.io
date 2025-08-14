//from SetupCards.js
let countrySetup = localStorage.getItem("countrySetup");
if (countrySetup) {
	countries = JSON.parse(countrySetup);
}
setupCards();

function dragOverHandler(event){
	event.preventDefault();
	event.dataTransfer.dropEffect = "move";
}

function dropHandler(event) {
	event.preventDefault();
	let data = JSON.parse(event.dataTransfer.getData("text/plain"));
	let value = this.id.split("CardList")[0];
	let oldControled = data.oldControled;
	let territoryId = data.territoryId;
	
	if(value != oldControled){
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
	numDiceToRollSetup = 2;//set Default
}
if (numDiceToRollSetup >= 2) {
	let diceIdElName = "diceRadio" + numDiceToRollSetup;
	document.getElementById(diceIdElName).checked = true;
	numDiceToRoll = numDiceToRollSetup;
}
loadResults();

//from ResourceTracker.js
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