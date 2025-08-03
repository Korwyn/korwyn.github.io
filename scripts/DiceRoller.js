let diceSelection = document.getElementById("diceRollerNumberForm");

let numDiceToRoll = 0;

diceSelection.addEventListener("change", function(event) {
	target = event.target;

	numDiceToRoll = target.value;

	localStorage.setItem("numDiceToRoll", numDiceToRoll);
});

resultEls = document.getElementsByClassName("resultRoll");
let yellowResultRoll = document.getElementById("yellowResultRoll");
let blueResultRoll = document.getElementById("blueResultRoll");
let greenResultRoll = document.getElementById("greenResultRoll");
let redResultRoll = document.getElementById("redResultRoll");
let whiteResultRoll = document.getElementById("whiteResultRoll");
let blackResultRoll = document.getElementById("blackResultRoll");

let rollDiceButton = document.getElementById("rollDice");
rollDiceButton.addEventListener("click", function() {
	if (numDiceToRoll && !rollDiceButton.disabled) {
		for (let i = 0; i < resultEls.length; i++) {
			element = resultEls[i];
			element.innerHTML = "";
		}

		setTimeout(function() {
			rollTheDice(numDiceToRoll);
		}, 600);
	}
});

function rollTheDice(rollingNumber) {
	if (rollingNumber > 0) {
		rollDiceButton.disabled = true;
		let resultRoll = randomIntFromInterval(1, 12);

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

		setTimeout(function() {
			rollTheDice(rollingNumber - 1);
		}, 600);
	}
	else {
		rollDiceButton.disabled = false;
	}
};

function randomIntFromInterval(min, max) { // min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min);
}
