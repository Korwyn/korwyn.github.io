let italyControled = {};

function italyDefault() {
	//id, name, countryControlled, stressValue, baseProduction, embattledProduction, isEmbattled
	let italyDefaults = {
		t1: new Territory("T1", "Libya", "italy", 3, { oil: 2, iron: 1 }, { oil: 1, iron: 1 }, false),
		t2: new Territory("T2", "Sicily", "italy", 1, {}, {}, false),
		t3: new Territory("T3", "Sardinia", "italy", 1, {}, {}, false),
		t4: new Territory("T4", "Balkans", "italy", 4, { oil: 1, iron: 2, osr: 3 }, { iron: 2, osr: 3 }, false),
		t5: new Territory("T5", "Italy", "italy", 6, { iron: 1, osr: 3 }, { osr: 3 }, false)
	};

	return italyDefaults;
}

function setItalyDefault(){
	italyControled = italyDefault();
}

setItalyDefault();