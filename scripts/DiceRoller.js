let diceSelection = document.getElementById("diceRollerNumberForm");

let numDiceToRoll = 0;

diceSelection.addEventListener("change", function(event) {
	target = event.target;

	numDiceToRoll = target.value;

	localStorage.setItem("numDiceToRoll", numDiceToRoll);
});

let resultEls = document.getElementsByClassName("resultRoll");
let yellowResultRoll = document.getElementById("yellowResultRoll");
let blueResultRoll = document.getElementById("blueResultRoll");
let greenResultRoll = document.getElementById("greenResultRoll");
let redResultRoll = document.getElementById("redResultRoll");
let whiteResultRoll = document.getElementById("whiteResultRoll");
let blackResultRoll = document.getElementById("blackResultRoll");
let rollDiceButton = document.getElementById("rollDice");

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
