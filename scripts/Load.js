//from SetupCards.js
let countrySetup = localStorage.getItem("countrySetup");
if (countrySetup) {
	countries = JSON.parse(countrySetup);
}
setupCards();

//from TabSet.js
let activeTab = localStorage.getItem("activeTab");
if(activeTab){
	document.getElementById(activeTab).click();
}

//from DiceRoller.js
localStorage.getItem("numDiceToRoll");
let numDiceToRollSetup = localStorage.getItem("numDiceToRoll");
if(!numDiceToRollSetup){
	numDiceToRollSetup = 2;//set Default
}
if(numDiceToRollSetup >= 2){
	let diceIdElName = "diceRadio" + numDiceToRollSetup;
	document.getElementById(diceIdElName).checked = true;
	numDiceToRoll = numDiceToRollSetup;
}
loadResults();

//from ResourceTracker.js
calcProduction();
calculateRemainingResources();
displayResourceLog();