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
	document.getElementById("diceRadio2").checked = true;

	calcProduction();
	calculateRemainingResources();
}

let storedVersion = localStorage.getItem("version");

if (storedVersion != version) {
	resetState();
}