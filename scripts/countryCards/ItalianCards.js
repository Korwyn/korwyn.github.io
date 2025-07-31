let italyControled = {};

function italyDefault() {
	//id, name, countryControlled, stressValue, baseProduction, embattledProduction, isEmbattled
	let italyDefaults = {
		i1: new Territory("I1", "Libya", "italy", 3, { oil: 2, iron: 1 }, { oil: 1, iron: 1 }, false),
		i2: new Territory("I2", "Sicily", "italy", 1, {}, {}, false),
		i3: new Territory("I3", "Sardinia", "italy", 1, {}, {}, false),
		i4: new Territory("I4", "Balkans", "italy", 4, { oil: 1, iron: 2, osr: 3 }, { iron: 2, osr: 3 }, false),
		i5: new Territory("I5", "Italy", "italy", 6, { iron: 1, osr: 3 }, { osr: 3 }, false)
	};

	return italyDefaults;
}

function setItalyDefault(){
	italyControled = italyDefault();
}

setItalyDefault();