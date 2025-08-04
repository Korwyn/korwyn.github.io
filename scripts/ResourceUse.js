
currentResourceRow = document.getElementById("currentResourceRow");
oilBidRow = document.getElementById("oilBidRow");
stressRow = document.getElementById("stressRow");
repairsRow = document.getElementById("repairsRow");
raidsRow = document.getElementById("raidsRow");
tradesRow = document.getElementById("tradesRow");
buildsRow = document.getElementById("buildsRow");

function calcProduction(){
	for (let i = 0; i < countryOrder.length; i++){
		countryName = countryOrder[i];
		country = countries[countryName];

		if (!country.currentOil){
			country.currentOil = country.productionOil;
		}

		let currentOil = country.currentOil;

		if (!country.currentIron){
			country.currentIron = country.productionIron;
		}

		let currentIron = country.currentIron;
		
		if (!country.currentOsr){
			country.currentOsr = country.productionOsr;
		}

		let currentOsr = country.currentOsr;
		
		let oilTd = document.createElement("td");

		let oilDiv = document.createElement("div");
		oilDiv.classList.add("center");
		let imgOil = document.createElement("img");
		imgOil.classList.add("icon");
		imgOil.src = "icons/oil.svg";
		oilDiv.appendChild(imgOil);

		let oilSpan = document.createElement("div");
		oilSpan.innerHTML = currentOil;
		oilDiv.appendChild(oilSpan);

		oilTd.appendChild(oilDiv);
		currentResourceRow.appendChild(oilTd);
		
		let ironTd = document.createElement("td");
		ironTd.classList.add("center");

		let ironDiv = document.createElement("div");
		ironDiv.classList.add("center");
		let imgIron = document.createElement("img");
		imgIron.classList.add("icon");
		imgIron.src = "icons/iron.svg";
		ironDiv.appendChild(imgIron);

		let ironSpan = document.createElement("div");
		ironSpan.innerHTML = currentIron;
		ironDiv.appendChild(ironSpan);
		ironTd.appendChild(ironDiv);
		
		currentResourceRow.appendChild(ironTd);

		let osrTd = document.createElement("td");

		let osrDiv = document.createElement("div");
		osrDiv.classList.add("center");
		let imgOSR = document.createElement("img");
		imgOSR.classList.add("icon");
		imgOSR.src = "icons/osr.svg";
		osrDiv.appendChild(imgOSR);

		let osrSpan = document.createElement("div");
		osrSpan.innerHTML = currentOsr;
		osrDiv.appendChild(osrSpan);
		osrTd.appendChild(osrDiv);

		currentResourceRow.appendChild(osrTd);

		let oilBidCell = document.createElement("td");
		let oilBidInput = document.createElement("input");
		oilBidCell.appendChild(oilBidInput);
		
		oilBidRow.appendChild(oilBidCell);
		
		let blankIronCell = document.createElement("td");
		oilBidRow.appendChild(blankIronCell);

		let blankOsrCell = document.createElement("td");
		oilBidRow.appendChild(blankOsrCell);

		let stressOilCell = document.createElement("td");
		let stressOilInput = document.createElement("input");
		stressOilCell.appendChild(stressOilInput);
		stressRow.appendChild(stressOilCell);

		let stressIronCell = document.createElement("td");
		let stressIronInput = document.createElement("input");
		stressIronCell.appendChild(stressIronInput);
		stressRow.appendChild(stressIronCell);

		let stressOsrCell = document.createElement("td");
		let stressOsrInput = document.createElement("input");
		stressOsrCell.appendChild(stressOsrInput);
		stressRow.appendChild(stressOsrCell);

		let repairsOilCell = document.createElement("td");
		let repairsOilInput = document.createElement("input");
		repairsOilCell.appendChild(repairsOilInput);
		repairsRow.appendChild(repairsOilCell);

		let repairsIronCell = document.createElement("td");
		let repairsIronInput = document.createElement("input");
		repairsIronCell.appendChild(repairsIronInput);
		repairsRow.appendChild(repairsIronCell);

		let repairsOsrCell = document.createElement("td");
		let repairsOsrInput = document.createElement("input");
		repairsOsrCell.appendChild(repairsOsrInput);
		repairsRow.appendChild(repairsOsrCell);

		let raidsOilCell = document.createElement("td");
		let raidsOilInput = document.createElement("input");
		raidsOilCell.appendChild(raidsOilInput);
		raidsRow.appendChild(raidsOilCell);

		let raidsIronCell = document.createElement("td");
		let raidsIronInput = document.createElement("input");
		raidsIronCell.appendChild(raidsIronInput);
		raidsRow.appendChild(raidsIronCell);

		let raidsOsrCell = document.createElement("td");
		let raidsOsrInput = document.createElement("input");
		raidsOsrCell.appendChild(raidsOsrInput);
		raidsRow.appendChild(raidsOsrCell);

		let tradesOilCell = document.createElement("td");
		let tradesOilInput = document.createElement("input");
		tradesOilCell.appendChild(tradesOilInput);
		tradesRow.appendChild(tradesOilCell);

		let tradesIronCell = document.createElement("td");
		let tradesIronInput = document.createElement("input");
		tradesIronCell.appendChild(tradesIronInput);
		tradesRow.appendChild(tradesIronCell);

		let tradesOsrCell = document.createElement("td");
		let tradesOsrInput = document.createElement("input");
		tradesOsrCell.appendChild(tradesOsrInput);
		tradesRow.appendChild(tradesOsrCell);

		let buildsOilCell = document.createElement("td");
		let buildsOilInput = document.createElement("input");
		buildsOilCell.appendChild(buildsOilInput);
		buildsRow.appendChild(buildsOilCell);

		let buildsIronCell = document.createElement("td");
		let buildsIronInput = document.createElement("input");
		buildsIronCell.appendChild(buildsIronInput);
		buildsRow.appendChild(buildsIronCell);

		let buildsOsrCell = document.createElement("td");
		let buildsOsrInput = document.createElement("input");
		buildsOsrCell.appendChild(buildsOsrInput);
		buildsRow.appendChild(buildsOsrCell);
	}
}