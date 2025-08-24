let ordersTable = document.getElementById("ordersTable");
let oilBidInputField = document.getElementById("oilBidInputField");
let clearOrders = document.getElementById("clearOrders");

oilBidInputField.addEventListener('change', saveOrdersTabToStorage);
clearOrders.addEventListener('click', function(){
	if(confirm("Clear Orders?")){
		resetOrdersTab();
	};
});

let commandNotes = countryOrders(9);

function loadOrders() {
	ordersTable.innerHTML = "";
	for (let i = 0; i < commandNotes.length; i++) {
		let commandNoteRow = commandNotes[i];
		let divRow = document.createElement("div");
		divRow.classList.add("tr");

		for (let j = 0; j < commandNoteRow.length; j++) {
			let commandNote = commandNoteRow[j];
			
			let divCell = document.createElement("div");
			divCell.classList.add("td");

			let topDivCommand = document.createElement("div");
			topDivCommand.classList.add("topCommand");
			
			let inputCommandUnit = document.createElement("input");
			inputCommandUnit.setAttribute("placeholder", "Command")
			inputCommandUnit.value = commandNote.commandName;
			inputCommandUnit.setAttribute("type", "text");
			
			topDivCommand.appendChild(inputCommandUnit);
			divCell.appendChild(topDivCommand);

			let bottomDivMovement = document.createElement("div");
			bottomDivMovement.classList.add("bottomMovement");
			
			let inputCommandMovement = document.createElement("input");
			inputCommandMovement.setAttribute("placeholder", "Destination")
			inputCommandMovement.value = commandNote.destination;
			inputCommandMovement.setAttribute("type", "text");
			
			bottomDivMovement.appendChild(inputCommandMovement);
			divCell.appendChild(bottomDivMovement);

			inputCommandUnit.addEventListener("change", function(){
				commandNote.commandName = inputCommandUnit.value;
				saveOrdersTabToStorage();
			});
			
			inputCommandMovement.addEventListener("change", function(){
				commandNote.destination = inputCommandMovement.value;
				saveOrdersTabToStorage();
			});

			divRow.appendChild(divCell);
		}
		ordersTable.appendChild(divRow);
	}
}

function loadOrdersTabFromStorage(){
	let commandNotesJson = localStorage.getItem("commandNotes");
	let ordersOilBid = localStorage.getItem("ordersOilBid");
	
	oilBidInputField.value = ordersOilBid ? ordersOilBid : "";
	
	if(commandNotesJson){
		commandNotes = JSON.parse(commandNotesJson);
	}
	
	loadOrders();
}

function saveOrdersTabToStorage(){
	localStorage.setItem("commandNotes", JSON.stringify(commandNotes));
	localStorage.setItem("ordersOilBid", oilBidInputField.value);
}

function resetOrdersTab(){
	oilBidInputField.value = "";
	commandNotes = countryOrders(9);
	localStorage.setItem("commandNotes", JSON.stringify(commandNotes));
	localStorage.setItem("ordersOilBid", "");
	
	loadOrders();
}
