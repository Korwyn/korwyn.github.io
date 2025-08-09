let reset = document.getElementById("reset");
reset.addEventListener("click", function() {
	if (confirm("Reset Game State?")) {
		resetState();
	}
});

function resetState() {
	countries = null;
	setupCards();
	document.getElementById("tabTerritory").click();

	numDiceToRollSetup = 2;//set Default
	localStorage.setItem("numDiceToRoll", numDiceToRollSetup);
	localStorage.setItem("resultRolls", JSON.stringify([]));
	document.getElementById("diceRadio2").checked = true;
	
	clearResultEls();
	calcProduction();
	calculateRemainingResources();
	//displayLog();
}

let storedVersion = localStorage.getItem("version");

if (storedVersion != version) {
	resetState();
}