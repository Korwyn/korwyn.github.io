let reset = document.getElementById("reset");
reset.addEventListener("click", function() {
	if (confirm("Reset Game State?")) {
		resetState();
	}
});

function resetState() {
	countries = null;
	setupCards();
	navigator.vibrate(200);
	document.getElementById("tabTerritory").click();

	numDiceToRollSetup = 2;//set Default
	localStorage.setItem("numDiceToRoll", numDiceToRollSetup);
	localStorage.setItem("resultRolls", JSON.stringify([]));
	document.getElementById("diceRadio2").checked = true;

	let individualCol = "allShow";

	localStorage.setItem("individualCol", individualCol);

	let elements = document.getElementsByName("showOwners");

	for (let i = 0; i < elements.length; i++) {
		let element = elements[i];

		if (element.value == individualCol) {
			element.checked = true;
			break;
		}
	}
	hideTableColumns({ value: individualCol });

	clearResultEls();
	calcProduction();
	calculateRemainingResources();
	displayResourceLog();
}

let storedVersion = localStorage.getItem("version");

if (storedVersion != version) {
	resetState();
}