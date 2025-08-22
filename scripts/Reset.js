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
	
	clearDiceRollerInfo();
	calcProduction();
	calculateRemainingResources();
	displayResourceLog();
	resetOrdersTab();
}

let storedVersion = localStorage.getItem("version");

if (storedVersion != version) {
	resetState();
}